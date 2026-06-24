import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
      .select("id, enrollment_id, email_key, tier, sovereign_enrollments!inner(email)")
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
    for (const row of due ?? []) {
      try {
        // Placeholder: real template dispatch lands later.
        const email = (row as any).sovereign_enrollments?.email ?? "unknown";
        console.log(`[process-email-queue] would send ${row.email_key} to ${email} (tier=${row.tier})`);

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

    return new Response(JSON.stringify({ ok: true, processed: due?.length ?? 0, sent, failed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[process-email-queue] error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
