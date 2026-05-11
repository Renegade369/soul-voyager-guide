import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type Profile = {
  soul_name: string;
  soul_summary: string;
  energetic_signature: string;
  soul_gifts: string[];
  life_path_themes: string[];
  shadow_and_growth: string;
  relationships_and_connection: string;
  soul_mission: string;
  activation_message: string;
  next_step: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderHtml(profile: Profile): string {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const section = (label: string, body: string) => `
    <tr><td style="padding:28px 32px 0 32px;">
      <p style="margin:0 0 10px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">${esc(label)}</p>
      <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">${esc(body)}</p>
    </td></tr>`;
  const list = (label: string, items: string[]) => `
    <tr><td style="padding:28px 32px 0 32px;">
      <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">${esc(label)}</p>
      <ul style="margin:0;padding:0;list-style:none;">
        ${items.map((i) => `<li style="margin:0 0 10px 0;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;"><span style="color:#C9A84C;margin-right:10px;">✦</span>${esc(i)}</li>`).join("")}
      </ul>
    </td></tr>`;

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Soul Profile</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#0a0a0a;border:1px solid rgba(201,168,76,0.25);">
        <tr><td align="center" style="padding:48px 32px 16px 32px;">
          <p style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True</p>
          <p style="margin:0 0 8px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,240,232,0.55);">Your Complete Soul Profile</p>
          <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-weight:300;font-style:italic;font-size:36px;color:#E8C87A;line-height:1.2;">${esc(profile.soul_name)}</h1>
          <p style="margin:14px 0 0 0;font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,240,232,0.4);">${date}</p>
        </td></tr>

        ${section("Soul Summary", profile.soul_summary)}
        ${section("Energetic Signature", profile.energetic_signature)}
        ${list("Soul Gifts", profile.soul_gifts)}
        ${list("Life Path Themes", profile.life_path_themes)}
        ${section("Shadow & Growth", profile.shadow_and_growth)}
        ${section("Relationships & Connection", profile.relationships_and_connection)}

        <tr><td align="center" style="padding:36px 32px 0 32px;">
          <p style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">Soul Mission</p>
          <p style="margin:0;font-family:Georgia,serif;font-size:18px;line-height:1.7;color:#F5F0E8;font-weight:400;">${esc(profile.soul_mission)}</p>
        </td></tr>

        <tr><td style="padding:40px 32px 0 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(201,168,76,0.4);background:rgba(201,168,76,0.04);">
            <tr><td align="center" style="padding:32px 24px;">
              <p style="margin:0 0 14px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;">Activation</p>
              <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:20px;line-height:1.6;color:#E8C87A;">"${esc(profile.activation_message)}"</p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td align="center" style="padding:36px 32px 0 32px;">
          <p style="margin:0 0 10px 0;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,240,232,0.55);">Your Next Step</p>
          <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:rgba(245,240,232,0.85);font-style:italic;">${esc(profile.next_step)}</p>
        </td></tr>

        <tr><td align="center" style="padding:48px 32px 48px 32px;">
          <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:14px;color:#C9A84C;">With love,</p>
          <p style="margin:6px 0 0 0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True</p>
          <p style="margin:24px 0 0 0;font-family:Georgia,serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(245,240,232,0.35);">For educational &amp; inspirational purposes only</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, profile } = await req.json();
    if (!email || !profile?.soul_name) {
      return new Response(JSON.stringify({ error: "Email and profile are required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const html = renderHtml(profile as Profile);
    const subject = `Your Soul Profile is Ready — ${profile.soul_name}`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Soul True <notify@soul-true.com>",
        to: [email],
        subject,
        html,
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      console.error("Resend error", resp.status, t);
      return new Response(JSON.stringify({ error: "Failed to send email", detail: t }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-soul-profile-email error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
