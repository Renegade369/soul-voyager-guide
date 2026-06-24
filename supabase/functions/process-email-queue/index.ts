import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { welcomeDigital } from "../_email-templates/welcome_digital.ts";
import { welcomeComplete } from "../_email-templates/welcome_complete.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") ?? "notify@soul-true.com";
const SENDER_NAME = Deno.env.get("SENDER_NAME") ?? "Soul True";

type Renderer = (input: { firstName?: string | null; email: string; certName?: string | null; tier?: string | null }) => {
  subject: string; previewText: string; htmlBody: string; textBody: string;
};

const TEMPLATES: Record<string, Renderer> = {
  welcome_digital: welcomeDigital,
  welcome_complete: welcomeComplete,
};

async function sendViaResend(to: string, subject: string, html: string, text: string): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      reply_to: "william@soul-true.com",
      to: [to],
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const nowIso = new Date().toISOString();
    const { data: due, error } = await supabase
      .from("sovereign_email_sequence")
      .select("id, enrollment_id, email_key, tier, sovereign_enrollments!inner(email, first_name, cert_name)")
      .eq("status", "pending")
      .lte("scheduled_for", nowIso)
      .limit(100);

    if (error) {
      console.error("[process-email-queue] query error", error);
      return new Response(JSON.stringify({ error: "query failed", details: error }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    for (const row of due ?? []) {
      const enr = (row as any).sovereign_enrollments ?? {};
      const email: string | null = enr.email ?? null;
      const firstName: string | null = enr.first_name ?? null;
      const certName: string | null = enr.cert_name ?? null;
      try {
        const renderer = TEMPLATES[row.email_key as string];
        if (!renderer) {
          console.log(`[process-email-queue] would send ${row.email_key} to ${email} (tier=${row.tier})`);
          skipped++;
          continue;
        }
        if (!email) throw new Error("enrollment has no email");
        const { subject, htmlBody, textBody } = renderer({ firstName, email, certName, tier: row.tier as string });
        await sendViaResend(email, subject, htmlBody, textBody);

        const { error: uErr } = await supabase
          .from("sovereign_email_sequence")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", row.id);
        if (uErr) throw uErr;
        sent++;
      } catch (e) {
        failed++;
        console.error("[process-email-queue] send failed", row.id, e);
        await supabase
          .from("sovereign_email_sequence")
          .update({
            status: "failed",
            error_message: e instanceof Error ? e.message : String(e),
          })
          .eq("id", row.id);
      }
    }

    return new Response(JSON.stringify({ ok: true, processed: due?.length ?? 0, sent, failed, skipped }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[process-email-queue] error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
