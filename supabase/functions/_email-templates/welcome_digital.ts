// Soul True — Day 1 welcome (Digital tier).
// Returns subject + preview + html/text bodies for the 24-hour "first morning" email.

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
const RITUAL = `${SITE}/sovereign/ritual`;
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function welcomeDigital(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.certName || input.firstName || "Initiate").trim());
  const subject = "Your Sovereignty Code is open. Here's where to begin.";
  const previewText = "The first 7 minutes start tomorrow morning. Here's what to do.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · The Sovereignty Code</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">The door is open, ${name}.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">
  <p>Yesterday you made a decision most people never make. You chose to stop drifting. You chose the work.</p>
  <p>One year from now, you'll either be the person who opened this email and did the practice, or the person who opened this email and didn't. The first version is someone your current self wouldn't recognize. The second is exactly who you are right now.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">Tomorrow morning.</p>
  <p>Your Morning Ritual is waiting at <a href="${RITUAL}" style="color:#C9A84C;">${RITUAL}</a>. Seven minutes. Same time, same place — that's the whole technology. Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> tracks the streak. The first lesson — Module 1.1, <em>The Witnessing Practice</em> — unlocks the moment you complete tomorrow's ritual.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The practice.</p>
  <p>Three pieces, every morning:</p>
  <ul style="padding-left:20px;">
    <li><strong style="color:#F5F0E8;">The Ritual</strong> — 7 to 10 minutes. Settle, release, anchor, breathe, close. Auto-advancing timers do the thinking for you.</li>
    <li><strong style="color:#F5F0E8;">The Three Questions</strong> — a short check-in that names where you are before the day starts naming it for you.</li>
    <li><strong style="color:#F5F0E8;">The Companion</strong> — your reflection space inside the portal. Bring what came up. It listens, mirrors, and points you back to the work.</li>
  </ul>

  <p style="margin-top:32px;text-align:center;">
    <a href="${RITUAL}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Begin your first ritual →</a>
  </p>

  <p style="margin-top:32px;">The first 120 days are the architecture. After that, you're someone else's "before."</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You're receiving this because you purchased The Sovereignty Code — Digital. Reply to this email anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `The door is open, ${name}.

Yesterday you made a decision most people never make. You chose to stop drifting. You chose the work.

One year from now, you'll either be the person who did the practice, or the person who didn't.

TOMORROW MORNING
Your Morning Ritual is waiting: ${RITUAL}
Seven minutes. Same time, same place. Your dashboard: ${DASHBOARD}
The first lesson — Module 1.1, The Witnessing Practice — unlocks when you complete tomorrow's ritual.

THE PRACTICE
- The Ritual: 7–10 min, auto-advancing.
- The Three Questions: short check-in.
- The Companion: reflection space inside the portal.

Begin your first ritual: ${RITUAL}

— William
Soul True. Let's Go Deeper.

You're receiving this because you purchased The Sovereignty Code — Digital. Reply anytime — William reads every one.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
