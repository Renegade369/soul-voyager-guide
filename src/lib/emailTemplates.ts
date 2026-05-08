/* Soul True email templates — dark luxury design */

const LOGO = `
<div style="text-align:center;padding:40px 0 20px;">
  <span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;font-weight:300;color:#C9A84C;letter-spacing:0.1em;">SOUL TRUE</span>
</div>`;

const FOOTER = `
<div style="text-align:center;padding:30px 0 40px;border-top:1px solid #2E3A35;margin-top:40px;">
  <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-style:italic;color:#C9A84C;margin:0 0 8px;">Live Your Truth.</p>
  <p style="font-family:'Outfit',Arial,sans-serif;font-size:11px;color:#5A6E64;margin:0;">soul-true.com</p>
</div>`;

const GOLD_RULE = `<div style="text-align:center;padding:20px 0;"><span style="display:inline-block;width:40px;height:1px;background:#C9A84C;opacity:0.4;"></span></div>`;

function wrap(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@300;400&display=swap');</style>
</head>
<body style="margin:0;padding:0;background-color:#0D0F0E;color:#E8EDE9;">
<div style="max-width:600px;margin:0 auto;background-color:#0D0F0E;padding:0 24px;">
${LOGO}
${content}
${FOOTER}
</div>
</body>
</html>`;
}

function heading(text: string): string {
  return `<h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:28px;font-weight:300;color:#E8EDE9;text-align:center;margin:0 0 8px;">${text}</h1>`;
}

function subheading(text: string): string {
  return `<p style="font-family:'Outfit',Arial,sans-serif;font-size:13px;color:#8A9E94;text-align:center;margin:0 0 24px;font-weight:300;">${text}</p>`;
}

function goldLabel(text: string): string {
  return `<p style="font-family:'Outfit',Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#C9A84C;text-align:center;margin:0 0 8px;">${text}</p>`;
}

function bodyText(text: string): string {
  return `<p style="font-family:'Outfit',Arial,sans-serif;font-size:14px;color:#E8EDE9;line-height:1.7;font-weight:300;margin:0 0 16px;">${text}</p>`;
}

function card(content: string): string {
  return `<div style="background-color:#141917;border:1px solid #2E3A35;border-radius:12px;padding:24px;margin:16px 0;">${content}</div>`;
}

function goldButton(text: string, href: string): string {
  return `<div style="text-align:center;margin:24px 0;">
<a href="${href}" style="display:inline-block;padding:12px 32px;background:#C9A84C;color:#0D0F0E;font-family:'Outfit',Arial,sans-serif;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.22em;text-decoration:none;border-radius:4px;">${text}</a>
</div>`;
}

/* 1. Welcome — after lead capture */
export function welcomeEmail(firstName: string): string {
  return wrap(`
    ${goldLabel("WELCOME")}
    ${heading(`Welcome, ${firstName}.`)}
    ${subheading("Your transformation has officially begun.")}
    ${GOLD_RULE}
    ${card(`
      ${bodyText("You've just taken the most important step — choosing to invest in yourself.")}
      ${bodyText("Inside the Soul True Guide, you'll find:")}
      <ul style="font-family:'Outfit',Arial,sans-serif;font-size:14px;color:#8A9E94;line-height:2;font-weight:300;padding-left:20px;margin:0 0 16px;">
        <li>A 10-Day AI Life Challenge</li>
        <li>Personalized birth chart readings</li>
        <li>Blood type personality profiles</li>
        <li>Soul Origin Quiz</li>
        <li>AI-generated guided meditations</li>
        <li>And much more</li>
      </ul>
      ${bodyText("This is not another self-help program. This is a mirror — powered by AI — that reflects your deepest truth back to you.")}
    `)}
    ${goldButton("ENTER THE GUIDE", "https://soul-true.com/guide")}
    ${bodyText('<span style="color:#5A6E64;font-size:12px;">Soul True provides educational and inspirational content only. It is not a substitute for professional advice.</span>')}
  `);
}

/* 2. Challenge Completed — all 10 days done */
export function challengeCompletedEmail(firstName: string): string {
  return wrap(`
    ${goldLabel("CHALLENGE COMPLETE")}
    ${heading(`${firstName}, You Did It.`)}
    ${subheading("All 10 days completed. You are not the same person who started.")}
    ${GOLD_RULE}
    ${card(`
      ${bodyText("Over the past 10 days, you've had real conversations with AI about your life, your vision, your beliefs, and your purpose.")}
      ${bodyText("You've built a wellness plan, mapped your gifts, and created your 90-day Soul True blueprint.")}
      ${bodyText("Now it's time to prove what you've learned.")}
    `)}
    ${goldButton("TAKE THE CERTIFICATION TEST", "https://soul-true.com/guide")}
    ${bodyText('<span style="color:#8A9E94;font-size:13px;">Pass with 70% or higher to earn your official Soul True certificate.</span>')}
  `);
}

/* 3. Certificate Earned */
export function certificateEmail(name: string, score: number): string {
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";
  return wrap(`
    ${goldLabel("CERTIFICATE EARNED")}
    ${heading(`Congratulations, ${name}.`)}
    ${subheading(`You passed with ${score}% — Grade ${grade}`)}
    ${GOLD_RULE}
    ${card(`
      ${bodyText("You've earned your official Soul True certificate. This is proof that you showed up, did the work, and invested in your own transformation.")}
      <div style="text-align:center;padding:20px 0;">
        <span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:48px;color:#C9A84C;">✦</span>
      </div>
      ${bodyText("But earning the certificate is just the beginning. Here's what to explore next:")}
    `)}
    ${card(`
      ${goldLabel("YOUR NEXT STEPS")}
      <div style="padding:8px 0;">
        ${bodyText("🌿 <strong style='color:#E8EDE9;'>Get Your Birth Chart Reading</strong> — Discover what the stars encoded in your soul at the moment of birth.")}
        ${bodyText("🩸 <strong style='color:#E8EDE9;'>Blood Type Profile</strong> — Learn how your blood type shapes your personality, diet, and purpose.")}
        ${bodyText("✨ <strong style='color:#E8EDE9;'>Soul Origin Quiz</strong> — Find out your soul type — Starseed, Earth Angel, Lightworker, and more.")}
        ${bodyText("🧘 <strong style='color:#E8EDE9;'>Personalized Meditation</strong> — AI-crafted meditation scripts designed for exactly where you are right now.")}
      </div>
    `)}
    ${goldButton("CONTINUE YOUR JOURNEY", "https://soul-true.com/guide")}
  `);
}

/* 4. Birth Chart Reading */
export function birthChartEmail(name: string, reading: string, chartSummary: { sunSign: string; moonSign: string; risingSign?: string }): string {
  // Convert markdown-ish reading to HTML paragraphs
  const readingHtml = reading
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => {
      // Handle headings
      if (p.startsWith("## ")) return `<h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:400;color:#C9A84C;margin:24px 0 8px;">${p.replace("## ", "")}</h2>`;
      if (p.startsWith("# ")) return `<h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:400;color:#C9A84C;margin:24px 0 8px;">${p.replace("# ", "")}</h2>`;
      // Bold
      const formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#E8EDE9;">$1</strong>');
      return bodyText(formatted);
    })
    .join("\n");

  return wrap(`
    ${goldLabel("YOUR BIRTH CHART")}
    ${heading(`${name}'s Soul True Birth Chart`)}
    ${subheading("Your cosmic blueprint — decoded.")}
    ${GOLD_RULE}
    ${card(`
      <div style="display:flex;justify-content:center;gap:24px;text-align:center;padding:8px 0;">
        <div>
          <p style="font-family:'Outfit',Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A9E94;margin:0 0 4px;">Sun</p>
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;color:#C9A84C;margin:0;">${chartSummary.sunSign}</p>
        </div>
        <div>
          <p style="font-family:'Outfit',Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A9E94;margin:0 0 4px;">Moon</p>
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;color:#C9A84C;margin:0;">${chartSummary.moonSign}</p>
        </div>
        ${chartSummary.risingSign ? `<div>
          <p style="font-family:'Outfit',Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A9E94;margin:0 0 4px;">Rising</p>
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;color:#C9A84C;margin:0;">${chartSummary.risingSign}</p>
        </div>` : ""}
      </div>
    `)}
    ${card(readingHtml)}
    ${goldButton("VIEW IN GUIDE", "https://soul-true.com/guide")}
    ${bodyText('<span style="color:#5A6E64;font-size:12px;">This reading is for educational and inspirational purposes only.</span>')}
  `);
}

/* 5. Blood Type Profile */
export function bloodTypeEmail(name: string, bloodType: string, rhFactor: string, profile: { title: string; soulConnection: string; personality: string[]; strengths: string[]; challenges: string[]; bestFoods: string[]; avoidFoods: string[] }): string {
  return wrap(`
    ${goldLabel("BLOOD TYPE PROFILE")}
    ${heading(`${name}'s Blood Type Profile`)}
    ${subheading(`${bloodType}${rhFactor === "positive" ? "+" : "-"} — ${profile.title}`)}
    ${GOLD_RULE}
    ${card(`
      ${goldLabel("SOUL CONNECTION")}
      ${bodyText(profile.soulConnection)}
    `)}
    ${card(`
      ${goldLabel("PERSONALITY TRAITS")}
      <ul style="font-family:'Outfit',Arial,sans-serif;font-size:14px;color:#E8EDE9;line-height:2;font-weight:300;padding-left:20px;margin:0;">
        ${profile.personality.map(t => `<li>${t}</li>`).join("")}
      </ul>
    `)}
    ${card(`
      ${goldLabel("STRENGTHS")}
      <ul style="font-family:'Outfit',Arial,sans-serif;font-size:14px;color:#1D9E75;line-height:2;font-weight:300;padding-left:20px;margin:0;">
        ${profile.strengths.map(s => `<li>${s}</li>`).join("")}
      </ul>
    `)}
    ${card(`
      ${goldLabel("CHALLENGES")}
      <ul style="font-family:'Outfit',Arial,sans-serif;font-size:14px;color:#EF9F27;line-height:2;font-weight:300;padding-left:20px;margin:0;">
        ${profile.challenges.map(c => `<li>${c}</li>`).join("")}
      </ul>
    `)}
    ${card(`
      ${goldLabel("BEST FOODS")}
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${profile.bestFoods.map(f => `<span style="display:inline-block;background:#0F2A1F;border:1px solid #1D9E7544;border-radius:8px;padding:4px 12px;font-family:'Outfit',Arial,sans-serif;font-size:12px;color:#E8EDE9;font-weight:300;">✓ ${f}</span>`).join("")}
      </div>
    `)}
    ${card(`
      ${goldLabel("FOODS TO LIMIT")}
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${profile.avoidFoods.map(f => `<span style="display:inline-block;background:#2A1515;border:1px solid #E24B4A44;border-radius:8px;padding:4px 12px;font-family:'Outfit',Arial,sans-serif;font-size:12px;color:#E8EDE9;font-weight:300;">✕ ${f}</span>`).join("")}
      </div>
    `)}
    ${goldButton("VIEW FULL PROFILE", "https://soul-true.com/guide")}
    ${bodyText('<span style="color:#5A6E64;font-size:12px;">This profile is for educational purposes only and is not medical advice.</span>')}
  `);
}

/* 6. Soul Origin Quiz Result */
export function soulQuizEmail(soulType: string, result: { title: string; origin: string; mission: string; gifts: string; challenge: string; message: string }): string {
  return wrap(`
    ${goldLabel("SOUL ORIGIN REVEALED")}
    ${heading(result.title)}
    ${subheading("Your soul's deepest truth — reflected back to you.")}
    ${GOLD_RULE}
    ${card(`
      ${goldLabel("YOUR ORIGIN")}
      ${bodyText(result.origin)}
    `)}
    ${card(`
      ${goldLabel("YOUR MISSION")}
      ${bodyText(result.mission)}
    `)}
    ${card(`
      ${goldLabel("YOUR GIFTS")}
      <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">
        ${result.gifts.split(", ").map(g => `<span style="display:inline-block;border:1px solid #C9A84C66;border-radius:20px;padding:4px 14px;font-family:'Outfit',Arial,sans-serif;font-size:12px;color:#C9A84C;font-weight:300;">${g}</span>`).join("")}
      </div>
    `)}
    ${card(`
      ${goldLabel("YOUR CHALLENGE")}
      ${bodyText(result.challenge)}
    `)}
    ${card(`
      ${goldLabel("YOUR MESSAGE")}
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;font-style:italic;color:#C9A84C;text-align:center;line-height:1.6;margin:0;">"${result.message}"</p>
    `)}
    ${goldButton("EXPLORE YOUR GUIDE", "https://soul-true.com/guide")}
  `);
}

/* 7. Personalized Meditation */
export function meditationEmail(feeling: string, pillar: string, meditation: string): string {
  // Convert markdown meditation to HTML
  const meditationHtml = meditation
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => {
      if (p.startsWith("## ")) return `<h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:400;color:#C9A84C;margin:24px 0 8px;">${p.replace("## ", "")}</h2>`;
      if (p.startsWith("# ")) return `<h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:400;color:#C9A84C;margin:24px 0 8px;">${p.replace("# ", "")}</h2>`;
      const formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#E8EDE9;">$1</strong>');
      return bodyText(formatted);
    })
    .join("\n");

  return wrap(`
    ${goldLabel("YOUR MEDITATION")}
    ${heading("Your Personalized Meditation")}
    ${subheading(`${pillar} — crafted for exactly where you are right now.`)}
    ${GOLD_RULE}
    ${card(`
      ${goldLabel("WHAT YOU SHARED")}
      ${bodyText(`<em style="color:#8A9E94;">Current feeling:</em> ${feeling}`)}
      ${bodyText(`<em style="color:#8A9E94;">Desired shift:</em> Towards clarity and alignment`)}
      ${bodyText(`<em style="color:#8A9E94;">Pillar:</em> ${pillar}`)}
    `)}
    ${card(meditationHtml)}
    ${goldButton("LISTEN IN THE GUIDE", "https://soul-true.com/guide")}
    ${bodyText('<span style="color:#5A6E64;font-size:12px;">This meditation is for educational and inspirational purposes only.</span>')}
  `);
}
