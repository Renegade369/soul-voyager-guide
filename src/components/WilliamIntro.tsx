const PARAGRAPHS = [
  "I didn't come to this work through a textbook. I came through fire.",
  "Childhood abuse. Addiction. Loss. I walked through all of it — and I chose to let it forge me instead of break me.",
  "That decision changed everything.",
  "I'm not here to perform spirituality. I'm here because I know what it feels like to be completely lost and find your way back to yourself. I've done the work — the real work — and I built a life that reflects it.",
  "Today I live with purpose, peace, and absolute clarity about who I am and why I'm here. That's not a tagline. That's my reality.",
  "When you sit with me, I bring everything I've walked through into the room with us. No filters. No fluff. Just truth — delivered with compassion and the kind of directness that actually moves people.",
  "My commitment to you is this — you will leave our time together feeling inspired, empowered, seen, heard, and deeply felt.",
  "I know what's possible for you — because I lived it.",
];

export function WilliamIntro() {
  return (
    <div
      className="mx-auto max-w-3xl pl-6 sm:pl-10"
      style={{ borderLeft: "1px solid rgba(201,168,76,0.45)" }}
    >
      {PARAGRAPHS.map((p, i) => (
        <p
          key={i}
          className="mb-8 last:mb-0 text-lg sm:text-xl"
          style={{
            color: "#F5F0E8",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            lineHeight: 1.75,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export function PartnerCallout() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p
        className="text-center text-base italic"
        style={{
          color: "rgba(245,240,232,0.75)",
          fontFamily: "'Cormorant Garamond', serif",
          lineHeight: 1.7,
        }}
      >
        “Kim Alfano at Higher Vibes works with souls exactly where you are right now. Reach her at{" "}
        <a
          href="mailto:HigherVibration36@gmail.com"
          style={{ color: "#C9A84C" }}
          className="underline-offset-4 hover:underline"
        >
          HigherVibration36@gmail.com
        </a>{" "}
        — tell her Soul True sent you.”
      </p>
    </section>
  );
}
