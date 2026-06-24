// Soul True — Day 7 email. First week milestone.

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
const MODULE_1 = `${SITE}/sovereign/portal/modules/awakening`;
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function day7(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "One week. The rhythm is yours.";
  const previewText = "Seven days of practice. Here's what changes next.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · The Sovereignty Code · Day 7</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">One week, ${name}. The rhythm is yours.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">One week in.</p>
  <p>Seven mornings. Seven rituals. Seven reflections in the Companion. Seven times you chose the practice over the noise. That's the work. Not the dramatic shift — the quiet repetition that builds the architecture.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What changes now.</p>
  <p>The practice stops being something you're <em>deciding</em> to do. It becomes something you <em>do</em>. The body knows the rhythm. The seven minutes find you instead of the other way around. That's the threshold — and you just crossed it.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What to notice.</p>
  <p>The Matrix is louder this week than last. Old voices get sharper. Resistance gets cleverer. People near you may feel it before you do. That's not the practice failing — that's the practice working. You're seeing the static because you finally turned the dial.</p>
  <p>Bring it into the Companion. Don't carry it alone.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">Module 1 continues.</p>
  <p>Lessons <strong style="color:#F5F0E8;">1.3</strong> and <strong style="color:#F5F0E8;">1.4</strong> are open. The Witnessing Practice stays the daily anchor — the lessons add the language for what you're already starting to see.</p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${MODULE_1}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Continue Module 1 →</a>
  </p>

  <p style="margin-top:32px;">Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> is tracking the streak. Keep the seven minutes. Same time, same place.</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You're receiving this because you're enrolled in The Sovereignty Code. Reply anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `One week, ${name}. The rhythm is yours.

ONE WEEK IN
Seven mornings. Seven rituals. Seven reflections. Seven times you chose the practice over the noise.

WHAT CHANGES NOW
The practice stops being something you decide to do. It becomes something you do. The body knows the rhythm.

WHAT TO NOTICE
The Matrix is louder this week than last. That's the practice working — you're seeing the static because you turned the dial. Bring it into the Companion.

MODULE 1 CONTINUES
Lessons 1.3 and 1.4 are open. The Witnessing Practice stays the daily anchor.

Continue Module 1: ${MODULE_1}
Dashboard: ${DASHBOARD}

— William
Soul True. Let's Go Deeper.

For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
