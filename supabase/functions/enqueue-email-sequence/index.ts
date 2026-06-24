import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DAYS = [3, 7, 14, 30, 60, 90, 97, 120];

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { enrollment_id } = await req.json() as { enrollment_id: string };
    if (!enrollment_id) {
      return new Response(JSON.stringify({ error: "enrollment_id required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: enrollment, error: eErr } = await supabase
      .from("sovereign_enrollments")
      .select("id, tier, created_at, email")
      .eq("id", enrollment_id)
      .maybeSingle();

    if (eErr || !enrollment) {
      return new Response(JSON.stringify({ error: "enrollment not found", details: eErr }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tier = enrollment.tier;
    if (tier !== "digital" && tier !== "complete") {
      return new Response(JSON.stringify({ ok: true, skipped: "non-paid tier" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: existing } = await supabase
      .from("sovereign_email_sequence")
      .select("id")
      .eq("enrollment_id", enrollment_id)
      .limit(1);
    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: "already enqueued" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const base = new Date(enrollment.created_at as string).getTime();
    const welcomeKey = tier === "complete" ? "welcome_complete" : "welcome_digital";
    const rows = [
      {
        enrollment_id,
        email_key: welcomeKey,
        scheduled_for: new Date(base + 86400 * 1000).toISOString(),
        tier,
        status: "pending",
      },
      ...DAYS.map((d) => ({
        enrollment_id,
        email_key: `day_${d}`,
        scheduled_for: new Date(base + d * 86400 * 1000).toISOString(),
        tier,
        status: "pending",
      })),
    ];

    const { error: insErr } = await supabase
      .from("sovereign_email_sequence")
      .insert(rows);

    if (insErr) {
      console.error("[enqueue-email-sequence] insert error", insErr);
      return new Response(JSON.stringify({ error: "insert failed", details: insErr }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, inserted: rows.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[enqueue-email-sequence] error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
