// Soul True — Day 90 email. Sovereign milestone. Graduation.

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
const CERTIFICATE = `${SITE}/sovereign/certificate`;
const BOOKING = `${SITE}/book-session`;
const DASHBOARD = `${SITE}/sovereign/dashboard`;

export function day90(input: Input): { subject: string; previewText: string; htmlBody: string; textBody: string } {
  const name = esc((input.firstName || (input.certName ? input.certName.split(" ")[0] : "") || "Initiate").trim());
  const subject = "You are Sovereign. Your certificate is ready.";
  const previewText = "120 days. The full arc. Here's what you walked away with.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px;background:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(previewText)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#0A0A0A;border:1px solid rgba(201,168,76,0.3);">
<tr><td style="padding:40px 32px 8px 32px;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;">Soul True · Milestone · Sovereign</p>
  <h1 style="margin:18px 0 6px 0;font-family:Georgia,serif;font-style:italic;font-weight:300;font-size:32px;color:#F5F0E8;">You are Sovereign, ${name}.</h1>
</td></tr>
<tr><td style="padding:24px 32px 0 32px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#F5F0E8;">

  <p style="margin-top:8px;color:#C9A84C;font-style:italic;">The milestone.</p>
  <p><strong style="color:#F5F0E8;">Sovereign.</strong> You completed The Sovereignty Code. 120 days. The full arc. The inner work, the outer work, the integration. The witnessing that became seeing. The stripping that became space. The voice that became visible. The income that became earned. The freedom that became architecture.</p>
  <p>This is the milestone. You earned it the only way it can be earned — by walking it.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">Your certificate.</p>
  <p>Your Sovereign certificate is ready. Your name. Your cert number. Your date. It's yours to download, print, and keep — a marker for the version of you that finished what most people don't start.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">What you walked away with.</p>
  <ul style="padding-left:20px;">
    <li>All six modules complete — Awakening, Stripping, Voice, Brand, Income, Freedom.</li>
    <li>24 meditations, each one a key to a different door.</li>
    <li>A Morning Ritual that's now part of who you are, not what you do.</li>
    <li>The Companion — a 120-day record of your own voice in reflection.</li>
    <li>A practice you can hand to anyone who asks how you became this.</li>
  </ul>
  <p>That's the visible inventory. The invisible inventory is the one that matters: a nervous system that knows the difference between the Matrix and the truth.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The Sovereignty Call.</p>
  <p>If you haven't booked your post-completion 1-on-1 yet, the link is below. 75 minutes. Just you and William. Bring whatever the work surfaced. This is the integration session — the bridge from "I finished the program" to "this is how I live now."</p>
  <p style="text-align:center;margin-top:12px;">
    <a href="${BOOKING}" style="color:#C9A84C;text-decoration:underline;">Book your Sovereignty Call →</a>
  </p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The practice continues.</p>
  <p>The 120-day window is complete. The practice is yours now. The Morning Ritual doesn't stop. The Companion doesn't close. The questions don't end. Sovereignty isn't a destination — it's a rhythm. You have it.</p>

  <p style="margin-top:28px;color:#C9A84C;font-style:italic;">The door is always open.</p>
  <p>Let's Go Deeper.</p>

  <p style="margin-top:32px;text-align:center;">
    <a href="${CERTIFICATE}" style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-family:Georgia,serif;font-weight:bold;font-size:13px;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Download Your Certificate →</a>
  </p>

  <p style="margin-top:32px;">Your <a href="${DASHBOARD}" style="color:#C9A84C;">dashboard</a> holds every milestone you earned.</p>
  <p style="margin-top:24px;color:#C9A84C;">— William<br/><span style="color:rgba(245,240,232,0.7);font-style:italic;">Soul True. Let's Go Deeper.</span></p>
</td></tr>
<tr><td style="padding:36px 32px 40px 32px;text-align:center;">
  <p style="margin:0;font-family:Georgia,serif;font-size:11px;line-height:1.6;color:rgba(245,240,232,0.5);">
    You've earned the Sovereign milestone. It's saved to your dashboard.<br/>
    You're receiving this because you completed The Sovereignty Code. Reply anytime — William reads every one.<br/>
    For educational &amp; inspirational purposes only.
  </p>
</td></tr>
</table></body></html>`;

  const text = `You are Sovereign, ${name}.

THE MILESTONE
Sovereign. You completed The Sovereignty Code. 120 days. The full arc. The inner work, the outer work, the integration.

YOUR CERTIFICATE
Your Sovereign certificate is ready: ${CERTIFICATE}

WHAT YOU WALKED AWAY WITH
- All six modules complete
- 24 meditations
- A Morning Ritual that's part of who you are
- The Companion — a 120-day reflection record
- A practice you can hand to anyone

THE SOVEREIGNTY CALL
Book your post-completion 1-on-1 with William: ${BOOKING}

THE PRACTICE CONTINUES
The 120-day window is complete. The practice is yours now. Sovereignty isn't a destination — it's a rhythm.

THE DOOR IS ALWAYS OPEN
Let's Go Deeper.

Download your certificate: ${CERTIFICATE}
Dashboard: ${DASHBOARD}

— William
Soul True. Let's Go Deeper.

You've earned the Sovereign milestone. It's saved to your dashboard.
For educational & inspirational purposes only.`;

  return { subject, previewText, htmlBody: html, textBody: text };
}
