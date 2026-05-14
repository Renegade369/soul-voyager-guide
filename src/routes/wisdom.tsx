import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ScrollText, Star } from "lucide-react";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom")({
  head: () => ({
    meta: [
      { title: "Wisdom — Soul True" },
      { name: "description", content: "Matrix Origins, suppressed sacred texts, and the true story of Jeshua. Ancient teachings for the awakening mind." },
      { property: "og:title", content: "Wisdom — Soul True" },
      { property: "og:description", content: "Ancient teachings for the awakening mind." },
    ],
  }),
  component: WisdomPage,
});

const cards = [
  { to: "/wisdom/matrix-origins", icon: BookOpen, title: "Matrix Origins", desc: "How the system was built — and how to see through it with clear eyes." },
  { to: "/wisdom/suppressed-sacred-texts", icon: ScrollText, title: "Suppressed Sacred Texts", desc: "What the gatekeepers removed, hid, or rewrote — and why it matters now." },
  { to: "/wisdom/the-true-story-of-jeshua", icon: Star, title: "The True Story of Jeshua", desc: "The teacher, the man, the frequency — restored beyond institutional distortion." },
];

function WisdomPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Wisdom</p>
        <h1 className="mt-4 text-5xl font-light leading-tight md:text-6xl" style={{ fontFamily: fonts.display }}>
          Ancient Truth, <em className="italic" style={{ color: C.gold }}>Restored.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "rgba(245,240,232,0.8)", fontWeight: 300 }}>
          What was buried, edited, or dismissed is being remembered. Begin where your soul pulls you.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group flex flex-col rounded-lg border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(201,168,76,0.35)]"
                style={{ backgroundColor: C.overlay, borderColor: C.border }}
              >
                <span style={{ color: C.gold }}><Icon size={26} /></span>
                <h3 className="mt-5 text-2xl" style={{ fontFamily: fonts.display }}>{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Enter <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
