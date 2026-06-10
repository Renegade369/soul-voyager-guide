import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function buildWelcomeHtml(firstName: string, loginUrl: string): string {
  const esc = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#0A0B09;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0B09;border:1px solid rgba(212,175,55,0.3);"><tr><td style="padding:40px 32px 8px 32px;"><p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#D4AF37;">Soul True</p><h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:34px;color:#F5F0E8;">You're in.</h1></td></tr><tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;"><p>Hi ${esc(firstName)},</p><p>You just crossed a line. The Matrix keeps most people comfortable in chains. You said no.</p><p>Here's what happens now:</p><p><strong style="color:#D4AF37;">Right now (5 minutes):</strong> Go to <a href="${esc(loginUrl)}" style="color:#D4AF37;">${esc(loginUrl)}</a> and do Day 1 — the Witnessing Practice. Sit somewhere quiet. Notice the thought stream. Name it: "I'm having the thought that..." This is the first cut of the chain.</p><p><strong style="color:#D4AF37;">Tomorrow morning:</strong> Same practice. 5 minutes. Same time. Same place. The ritual is the revolution.</p><p><strong style="color:#D4AF37;">Each day for 120 days:</strong> The Morning Ritual unlocks the day's module. By day 30, you'll feel different. By day 60, you'll see different. By day 120, you'll be different.</p><p style="margin-top:32px;">The cost of staying the same:</p><ul><li>1 year from now: same patterns, same quiet despair</li><li>5 years from now: deeper entrenchment, the window closing</li><li>10 years from now: looking back wondering what could have been</li></ul><p>You chose the other path. Let's go.</p><p style="margin-top:32px;">Reply to this email anytime. I read every one.</p><p style="margin-top:32px;color:#D4AF37;">William<br/>Soul True — Let's Go Deeper.</p></td></tr><tr><td style="padding:36px 32px 40px 32px;text-align:center;"><p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,240,232,0.4);">For educational &amp; inspirational purposes only.</p></td></tr></table></body></html>`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { email, firstName, tier, loginUrl } = await req.json() as { email: string; firstName: string; tier: "free" | "digital" | "complete"; loginUrl: string; };
    if (!email || !firstName || !loginUrl) {
      return new Response(JSON.stringify({ error: "email, firstName, and loginUrl are required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
    const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") ?? "notify@soul-true.com";
    const SENDER_NAME = Deno.env.get("SENDER_NAME") ?? "Soul True";
    const html = buildWelcomeHtml(firstName, loginUrl);
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: `${SENDER_NAME} <${SENDER_EMAIL}>`, reply_to: "william@soul-true.com", to: [email], subject: "You're in. Let's begin.", html }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("resend error", resp.status, t);
      return new Response(JSON.stringify({ error: "Email failed to send" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("send-sovereign-welcome error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
