import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, source } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

    const RESEND_AUDIENCE_ID = Deno.env.get("RESEND_AUDIENCE_ID");

    // Add to audience if configured (best-effort)
    if (RESEND_AUDIENCE_ID) {
      fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({ email, unsubscribed: false }),
      }).catch(() => {});
    }

    const html = `
<div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8; padding: 48px 32px;">
  <p style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; margin: 0;">Soul True</p>
  <h1 style="font-style: italic; color: #E8C87A; font-size: 28px; line-height: 1.2; margin: 16px 0 24px;">
    Something in your energy has been waiting to be seen.
  </h1>
  <p style="font-size: 16px; line-height: 1.7; color: #F5F0E8;">
    Welcome. You've stepped onto the Soul True path — a sanctuary for the seekers, the rememberers, and the ones who feel that something deeper is calling.
  </p>
  <p style="font-size: 16px; line-height: 1.7; color: #F5F0E8;">
    Each week, you'll receive a soul insight: a reflection, a teaching, or a reminder of who you truly are.
  </p>
  <p style="margin-top: 32px;">
    <a href="https://soul-true.com" style="display: inline-block; background: #C9A84C; color: #0A0A0A; padding: 14px 28px; text-decoration: none; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: bold;">
      Begin Your Reading →
    </a>
  </p>
  <p style="margin-top: 48px; font-size: 11px; color: rgba(245,240,232,0.4); text-align: center;">
    With love · Soul True · For educational &amp; inspirational purposes only
  </p>
</div>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Soul True <notify@soul-true.com>",
        to: [email],
        subject: "Something in your energy has been waiting to be seen.",
        html,
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      console.error("Resend error", r.status, t);
      return new Response(JSON.stringify({ error: "Email failed", detail: t }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, source }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-welcome-email error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
