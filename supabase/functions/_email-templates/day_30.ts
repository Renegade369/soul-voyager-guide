// Soul True — Day 30 email. First month milestone.

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
const MODULE_3 = `${SITE}/sovereign/portal/modules/your-voice-amplified`;
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function day30(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "One month. The practice is yours now.";
  const previewText = "Thirty days in. Here's what you've built.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · The Sovereignty Code · Day 30</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">One month, ${name}. The practice is yours now.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">One month in.</p>
  <p>Thirty mornings. Thirty rituals. Thirty reflections. Thirty times you showed up before the day pulled you under. That's not a habit anymore — that's an architecture. A month of evidence that you can choose the practice over the noise.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What you've built.</p>
  <p>The practice is no longer something you're <em>deciding</em> to do. It's something you <em>do</em>. The body knows the rhythm. The mind knows the questions. The Companion knows your voice. You don't need willpower for this anymore — you have a track laid down, and the day rides on it.</p>
  <p>That's the quiet reward of a month. The work becomes weightless.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The honest question.</p>
  <p>Where will you be in eleven months if you stop here? Not shame. Not pressure. Just the honest question. The practice compounds. The Matrix doesn't wait. A month from now is either two months of architecture — or one month gathering dust while the old patterns walk back in through the door you stopped guarding.</p>
  <p>The 120-day window exists because that's how long this kind of rewrite needs to lock into the body. You're a quarter of the way through. The next ninety days are where the architecture becomes <em>you</em>.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">Module 3 is open.</p>
  <p><strong style="color:#F5F0E8;">Your Voice, Amplified.</strong> The inner-work arc is complete — you saw the system, you released the grip. Now the outer-work begins. The voice you've been hiding. The cost of silence. The way the world rearranges itself around someone who finally speaks.</p>
  <p>This is where the work stops being interior and starts being visible.</p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${MODULE_3}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Begin Module 3 →</a>
  </p>

  <p style="margin-top:32px;">Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> holds the streak and the milestones. Keep the seven minutes. Same time, same place.</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You're receiving this because you're enrolled in The Sovereignty Code. Reply anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `One month, ${name}. The practice is yours now.

ONE MONTH IN
Thirty mornings. Thirty rituals. Thirty reflections. Thirty times you showed up before the day pulled you under.

WHAT YOU'VE BUILT
The practice is no longer something you decide to do. It's something you do. The body knows the rhythm. The mind knows the questions.

THE HONEST QUESTION
Where will you be in eleven months if you stop here? The practice compounds. The Matrix doesn't wait. You're a quarter of the way through the 120-day window. The next ninety days are where the architecture becomes you.

MODULE 3 IS OPEN
Your Voice, Amplified. The inner-work arc is complete. The outer-work begins. The voice you've been hiding. The cost of silence.

Begin Module 3: ${MODULE_3}
Dashboard: ${DASHBOARD}

— William
Soul True. Let's Go Deeper.

For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
