// Soul True — Day 14 email. Awakened milestone (Module 1 complete).

interface Input {
  firstName?: string | null;
  email: string;
  certName?: string | null;
  tier?: string | null;
}

function esc(s: string): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SITE = "https://soul-true.com";
const MODULE_2 = `${SITE}/sovereign/portal/modules/stripping`;
const REFLECTION = `${SITE}/sovereign/reflection`;
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function day14(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "You are Awakened. Module 1 is complete.";
  const previewText = "Two weeks. The first milestone. Here's what you walked away with.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · Milestone · Awakened</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">You are Awakened, ${name}.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">The milestone.</p>
  <p><strong style="color:#F5F0E8;">Awakened.</strong> Module 1 is complete. You sat with the system long enough to see it clearly. You named it without shame. You stopped mistaking the noise for who you are.</p>
  <p>Most people spend a lifetime never reaching this floor. You reached it in two weeks of honest practice.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What you walked away with.</p>
  <ul style="padding-left:20px;">
    <li>A clear, working understanding of the Matrix.</li>
    <li>A daily Witnessing Practice that's already a body habit.</li>
    <li>A twice-daily check-in rhythm — morning ritual, evening reflection.</li>
    <li>An inventory of the inherited beliefs you brought into this work.</li>
    <li>A 14-day log of Matrix moments in your own words.</li>
  </ul>
  <p>That's not a head-full of ideas. That's evidence. The Awakened tier is saved to your dashboard.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The bridge.</p>
  <p>Module 2 — <em>Stripping</em> — opens tomorrow. The inner-work arc continues: the art of letting go, without force. What got named in Module 1 begins to lift in Module 2. Not by pushing — by releasing the grip.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The Companion.</p>
  <p>If you haven't talked to the Companion yet, now is the moment. Bring what you noticed across these 14 days. The reflection on Module 1 is the bridge into Module 2 — it makes the next two weeks land deeper.</p>
  <p style="text-align:center;margin-top:12px;">
    <a href="${REFLECTION}" style="color:#C9A84C;text-decoration:underline;">Open the Companion →</a>
  </p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The practice continues.</p>
  <p>The Morning Ritual doesn't stop. The 120-day window is yours. Module 2 layers on top of the rhythm you've already built — it doesn't replace it.</p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${MODULE_2}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Begin Module 2 →</a>
  </p>

  <p style="margin-top:32px;">Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> is tracking the streak and the milestones.</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You've earned the Awakened milestone. It's saved to your dashboard.<br/>
    You're receiving this because you're enrolled in The Sovereignty Code. Reply anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `You are Awakened, ${name}.

THE MILESTONE
Awakened. Module 1 is complete. You saw the system clearly and named it without shame.

WHAT YOU WALKED AWAY WITH
- A clear, working understanding of the Matrix
- A daily Witnessing Practice that's already a body habit
- A twice-daily check-in rhythm
- An inventory of inherited beliefs
- A 14-day log of Matrix moments

The Awakened tier is saved to your dashboard.

THE BRIDGE
Module 2 — Stripping — opens tomorrow. The art of letting go, without force.

THE COMPANION
If you haven't yet, bring what you noticed across these 14 days into the Companion: ${REFLECTION}

THE PRACTICE CONTINUES
The Morning Ritual doesn't stop. The 120-day window is yours.

Begin Module 2: ${MODULE_2}
Dashboard: ${DASHBOARD}

— William
Soul True. Let's Go Deeper.

You've earned the Awakened milestone. It's saved to your dashboard.
For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
