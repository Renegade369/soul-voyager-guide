// Branded CTA shown at the bottom of every full reader result.
const C = { gold: "#C9A84C", text: "#F5F0E8", deep: "#1A1209", muted: "rgba(245,240,232,0.7)" };

export function KimAlfanoCard() {
  return (
    <section
      className="mt-14 rounded-none border p-7"
      style={{ borderColor: `${C.gold}55`, background: C.deep, fontFamily: '"Outfit", sans-serif' }}
    >
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
        Continue the work
      </p>
      <p className="mt-4 leading-relaxed" style={{ color: C.text, fontSize: 16 }}>
        <span className="font-serif italic" style={{ color: C.gold, fontFamily: '"Cormorant Garamond", serif' }}>
          Kim Alfano at Higher Vibes
        </span>{" "}
        works with souls exactly where you are right now — ready to move, ready to align, ready to build the life that matches who you're becoming.
      </p>
      <a
        href="mailto:highervibrations36@gmail.com?subject=Soul%20True%20sent%20me"
        className="mt-5 inline-block text-[11px] uppercase tracking-[0.22em] underline-offset-4 hover:underline"
        style={{ color: C.gold }}
      >
        ✉ highervibrations36@gmail.com — tell her Soul True sent you
      </a>
    </section>
  );
}
