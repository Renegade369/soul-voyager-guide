// Soul True — Day 3 check-in email.
// First check-in after welcome. Names what's forming and what to notice.

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
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function day3(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "Day 3. The practice is forming.";
  const previewText = "Three days in. Here's what to notice.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · The Sovereignty Code · Day 3</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">The practice is forming, ${name}.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">You've started.</p>
  <p>Three mornings. Three rituals. Your first lesson — <em>The Witnessing Practice</em> — opened. Your first reflection landed in the Companion. That's not nothing. That's the architecture beginning to set.</p>
  <p>Most people who buy a program like this never get to day 3. You did. Mark that.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What to notice this week.</p>
  <p>The Matrix gets louder in week one — not quieter. Old patterns surface. Resistance shows up dressed as "I'm too busy," "I'll start again Monday," "this isn't working." The noise feels worse because you're finally listening.</p>
  <p>That's not failure. That's the practice working. You're seeing what was always there — you just weren't looking before.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The three questions.</p>
  <p>When the noise gets loud today, sit with these — the same three from Module 1:</p>
  <ul style="padding-left:20px;">
    <li><strong style="color:#F5F0E8;">What is the Matrix doing right now?</strong> — Name the pull. The story. The hook.</li>
    <li><strong style="color:#F5F0E8;">What is mine, beneath that?</strong> — Under the noise, what's actually true for you?</li>
    <li><strong style="color:#F5F0E8;">What is one small thing I can do from that truth?</strong> — Not the big move. The next honest one.</li>
  </ul>
  <p>Bring whatever comes up into the Companion. It listens, it mirrors, it points you back to the work.</p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${REFLECTION}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Open today's reflection →</a>
  </p>

  <p style="margin-top:32px;">Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> is tracking the streak. Keep the seven minutes. Same time, same place. That's the whole technology.</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You're receiving this because you're enrolled in The Sovereignty Code. Reply to this email anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `The practice is forming, ${name}.

YOU'VE STARTED
Three mornings. Three rituals. Your first lesson — The Witnessing Practice — opened. Your first reflection landed in the Companion. That's the architecture beginning to set.

Most people who buy a program like this never get to day 3. You did. Mark that.

WHAT TO NOTICE THIS WEEK
The Matrix gets louder in week one — not quieter. Old patterns surface. Resistance shows up dressed as "I'm too busy," "I'll start again Monday," "this isn't working." The noise feels worse because you're finally listening.

That's not failure. That's the practice working.

THE THREE QUESTIONS
- What is the Matrix doing right now?
- What is mine, beneath that?
- What is one small thing I can do from that truth?

Bring whatever comes up into the Companion: ${REFLECTION}

Your dashboard: ${DASHBOARD}
Keep the seven minutes. Same time, same place.

— William
Soul True. Let's Go Deeper.

For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
