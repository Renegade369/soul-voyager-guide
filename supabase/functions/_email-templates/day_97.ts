// Soul True — Day 97 email. Seven-day post-graduation check-in.

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
const REFLECTION = `${SITE}/sovereign/reflection`;
const BOOKING = `${SITE}/book-session`;
const BLOG = `${SITE}/blog`;

export function day97(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "One week after Sovereignty. How's the practice?";
  const previewText = "Seven days post-grad. The transition from program to life.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · Post-Sovereignty · Day 7</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">One week out, ${name}. How's the practice?</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">One week out.</p>
  <p>Seven days since graduation. The program is complete. The practice is yours now. No more scheduled lessons. No more module unlocks. Just you and the rhythm you built.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The transition.</p>
  <p>The hardest part of this work isn't the 120 days. It's the day after. When the structure is gone and the practice has to be self-generated. When no email is telling you what's next. When the Matrix notices you stopped being audited and starts testing the door again.</p>
  <p>That's sovereignty — the part nobody talks about. The quiet week after the milestone, where you find out whether the rhythm is actually yours.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What's true now.</p>
  <p>Spend ten minutes today with three questions:</p>
  <ul style="padding-left:20px;">
    <li>What stayed?</li>
    <li>What changed?</li>
    <li>What do I want to remember a year from now?</li>
  </ul>
  <p>The Companion can hold this reflection — it has your 120-day record and can read your own voice back to you when you need it.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The invitation.</p>
  <p>The Sovereignty Call is still available if you haven't booked it — <a href="${BOOKING}" style="color:#C9A84C;">grab a time with William</a>. The Companion is still here. The Journal is still open at <a href="${BLOG}" style="color:#C9A84C;">soul-true.com/blog</a>. The door doesn't close after Day 90 — it just stops knocking on yours.</p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${REFLECTION}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Talk to the Companion →</a>
  </p>

  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You're receiving this because you completed The Sovereignty Code. Reply anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `One week out, ${name}. How's the practice?

ONE WEEK OUT
Seven days since graduation. The program is complete. The practice is yours now.

THE TRANSITION
The hardest part isn't the 120 days. It's the day after — when the structure is gone and the practice has to be self-generated. That's sovereignty.

WHAT'S TRUE NOW
Spend ten minutes with three questions:
- What stayed?
- What changed?
- What do I want to remember a year from now?

The Companion can hold this reflection.

THE INVITATION
Sovereignty Call: ${BOOKING}
Companion: ${REFLECTION}
Journal: ${BLOG}

Talk to the Companion: ${REFLECTION}

— William
Soul True. Let's Go Deeper.

For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
