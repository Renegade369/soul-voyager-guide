import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const esc = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Section = { label: string; body: string };

function renderHtml(title: string, name: string | undefined, sections: Section[]): string {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const sectionHtml = sections.map((s) => `
    <tr><td style="padding:24px 32px 0 32px;">
      <p style="margin:0 0 10px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">${esc(s.label)}</p>
      <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;white-space:pre-wrap;">${esc(s.body)}</p>
    </td></tr>`).join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#0A0A0A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
    <tr><td style="padding:40px 32px 8px 32px;text-align:center;">
      <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True</p>
      <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:34px;color:#F5F0E8;">${esc(title)}</h1>
      ${name ? `<p style="margin:0;font-family:Georgia,serif;font-size:14px;color:rgba(245,240,232,0.65);">${esc(name)} · ${esc(date)}</p>` : `<p style="margin:0;font-family:Georgia,serif;font-size:14px;color:rgba(245,240,232,0.65);">${esc(date)}</p>`}
    </td></tr>
    ${sectionHtml}
    <tr><td style="padding:36px 32px 40px 32px;text-align:center;">
      <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,240,232,0.4);">For educational &amp; inspirational purposes only.</p>
    </td></tr>
  </table>
</body></html>`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { email, title, name, sections } = await req.json() as { email: string; title: string; name?: string; sections: Section[] };
    if (!email || !title || !Array.isArray(sections)) {
      return new Response(JSON.stringify({ error: "email, title, and sections required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const html = renderHtml(title, name, sections);
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Soul True <readings@soul-true.com>",
        to: [email],
        subject: `${title} — Soul True`,
        html,
      }),
    });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("resend error", resp.status, t);
      return new Response(JSON.stringify({ error: "Email failed to send" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("send-reading-email error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
