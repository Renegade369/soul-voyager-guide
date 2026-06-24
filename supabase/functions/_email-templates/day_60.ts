// Soul True — Day 60 email. Halfway point. Loss-aversion frame lands here.

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
const MODULE_5 = `${SITE}/sovereign/portal/modules/your-income-activated`;
const REFLECTION = `${SITE}/sovereign/reflection`;
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function day60(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "You're halfway. The door is still open.";
  const previewText = "Sixty days in. The time horizons start to compound.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · The Sovereignty Code · Day 60 · Halfway</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">You're halfway, ${name}. The door is still open.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">You're halfway.</p>
  <p>Sixty days in. Sixty days left in the 120-day window. The practice is yours — that's no longer in question. The question now is what you do with the door that's still open.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The time horizons.</p>
  <p>Where will you be in one year if you stop here? Five years? Ten years? Sit with the question — don't answer it quickly. The Matrix doesn't wait. The practice compounds. Sixty days of architecture is enough to feel different. Six hundred days is enough to <em>be</em> different. Six thousand days is a life lived from sovereignty instead of around it.</p>
  <p>That's not pressure. That's just the arithmetic.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What you've walked away with.</p>
  <ul style="padding-left:20px;">
    <li>Modules 1–3 complete. The inner-work arc is done.</li>
    <li>The outer-work arc is open. The voice is finding its shape.</li>
    <li>A 60-day Witnessing Practice baked into the body.</li>
    <li>Two milestones earned and saved to your dashboard.</li>
    <li>A reflection record the Companion can read back to you when you need it.</li>
  </ul>
  <p>Most people don't get this far. You did.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">Module 5 is open.</p>
  <p><strong style="color:#F5F0E8;">Your Income, Activated.</strong> The wealth wound. What you're really selling when you sell anything. Pricing without apology. The reason money has felt heavier than it needs to — and the practice that lifts it.</p>
  <p>The voice you built in Module 3 is the instrument. Module 5 is where it starts paying you back.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The Companion.</p>
  <p>If you haven't talked to the Companion about the time horizons, now is the time. The reflection on what you want your life to look like in ten years is the bridge into Module 5 — it sets the price before the module sets the practice.</p>
  <p style="text-align:center;margin-top:12px;">
    <a href="${REFLECTION}" style="color:#C9A84C;text-decoration:underline;">Open the Companion →</a>
  </p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${MODULE_5}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Begin Module 5 →</a>
  </p>

  <p style="margin-top:32px;">Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> holds the streak and the milestones. Sixty days more.</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You're receiving this because you're enrolled in The Sovereignty Code. Reply anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `You're halfway, ${name}. The door is still open.

YOU'RE HALFWAY
Sixty days in. Sixty days left in the 120-day window. The practice is yours.

THE TIME HORIZONS
Where will you be in one year if you stop here? Five years? Ten years? The Matrix doesn't wait. The practice compounds. Sixty days is enough to feel different. Six hundred days is enough to be different.

WHAT YOU'VE WALKED AWAY WITH
- Modules 1-3 complete. The inner-work arc done.
- The outer-work arc started. The voice is finding its shape.
- A 60-day Witnessing Practice baked into the body.
- Two milestones earned.

MODULE 5 IS OPEN
Your Income, Activated. The wealth wound. What you're really selling. Pricing without apology.

THE COMPANION
Bring the time horizons into the Companion: ${REFLECTION}

Begin Module 5: ${MODULE_5}
Dashboard: ${DASHBOARD}

— William
Soul True. Let's Go Deeper.

For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
