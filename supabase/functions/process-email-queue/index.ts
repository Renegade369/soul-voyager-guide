import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { welcomeDigital } from "../_email-templates/welcome_digital.ts";
import { welcomeComplete } from "../_email-templates/welcome_complete.ts";
import { day3 } from "../_email-templates/day_3.ts";
import { day7 } from "../_email-templates/day_7.ts";
import { day14 } from "../_email-templates/day_14.ts";
import { day30 } from "../_email-templates/day_30.ts";
import { day60 } from "../_email-templates/day_60.ts";
import { day90 } from "../_email-templates/day_90.ts";
import { day97 } from "../_email-templates/day_97.ts";

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
  day_3: day3,
  day_7: day7,
  day_14: day14,
  day_30: day30,
  day_60: day60,
  day_90: day90,
  day_97: day97,
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
      .select("id, enrollment_id, email_key, tier, sovereign_enrollments!inner(email, cert_name)")
      .eq("status", "pending")
      .lte("scheduled_for", nowIso)
      .limit(100);

    if (error) {
      console.error("[process-email-queue] query error", error);
      return new Response(JSON.stringify({ error: "query failed", details: error }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch onboarding first_name for personalization, keyed by enrollment_id
    const enrollmentIds = Array.from(new Set((due ?? []).map((r: any) => r.enrollment_id).filter(Boolean)));
    const firstNameByEnrollment: Record<string, string | null> = {};
    if (enrollmentIds.length > 0) {
      const { data: onboardingRows } = await supabase
        .from("sovereign_onboarding")
        .select("enrollment_id, first_name")
        .in("enrollment_id", enrollmentIds);
      for (const o of onboardingRows ?? []) {
        if (o.enrollment_id) firstNameByEnrollment[o.enrollment_id as string] = (o.first_name as string | null) ?? null;
      }
    }

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    for (const row of due ?? []) {
      const enr = (row as any).sovereign_enrollments ?? {};
      const email: string | null = enr.email ?? null;
      const certName: string | null = enr.cert_name ?? null;
      const onboardingFirst: string | null = firstNameByEnrollment[(row as any).enrollment_id] ?? null;
      const firstName: string | null =
        (onboardingFirst && onboardingFirst.trim()) ||
        (certName ? certName.split(" ")[0] : null);
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
