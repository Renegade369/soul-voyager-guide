import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Eye, Droplet, HelpCircle, Orbit, Hash, Star } from "lucide-react";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/readings")({
  head: () => ({
    meta: [
      { title: "Readings — Soul True" },
      { name: "description", content: "Discover your soul blueprint through AI-powered readers. Aura, blood type, soul quiz, birth chart, numerology, and astrology." },
      { property: "og:title", content: "Readings — Soul True" },
      { property: "og:description", content: "Discover your soul blueprint through AI-powered readers." },
    ],
  }),
  component: ReadingsPage,
});

type Card = {
  id: string;
  to: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
  cta: string;
};

const cards: Card[] = [
  { id: "aura", to: "/aura-reader", icon: Eye, title: "Aura Reader", desc: "See the colors and frequencies your energy field is broadcasting right now.", cta: "Read My Aura" },
  { id: "blood-type", to: "/guide", icon: Droplet, title: "Blood Type", desc: "Your biology holds ancient wisdom — what your blood type reveals about your gifts and patterns.", cta: "Discover My Type" },
  { id: "soul-quiz", to: "/guide", icon: HelpCircle, title: "Soul Quiz", desc: "Free — discover your soul type in 5 minutes through a guided set of questions.", cta: "Take The Quiz" },
  { id: "birth-chart", to: "/guide", icon: Orbit, title: "Birth Chart", desc: "The sky at your first breath tells your whole story. Your full natal blueprint.", cta: "See My Chart" },
  { id: "numerology", to: "/numerology", icon: Hash, title: "Numerology", desc: "Your life path, expression, and soul urge numbers — the frequencies in your name and birth date.", cta: "Calculate My Numbers" },
  { id: "astrology", to: "/astrology", icon: Star, title: "Astrology", desc: "Your sun, moon, rising — and the current sky — read as a single living frequency.", cta: "Read The Sky" },
  { id: "soul-profile", to: "/soul-profile", icon: Sparkles, title: "Soul Profile (v2)", desc: "All frameworks merged into one full reading. The deepest map we offer.", cta: "Build My Profile" },
];

function ReadingsPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Readings</p>
        <h1 className="mt-4 text-5xl font-light leading-tight md:text-6xl" style={{ fontFamily: fonts.display }}>
          Your Soul, <em className="italic" style={{ color: C.gold }}>Mirrored.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "rgba(245,240,232,0.8)", fontWeight: 300 }}>
          Choose any door. Each reading is a different frequency through which your truth becomes visible.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-xs italic" style={{ color: "rgba(245,240,232,0.5)" }}>
          For educational and inspirational purposes only.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.id}
                id={c.id}
                className="flex flex-col rounded-lg border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(201,168,76,0.35)]"
                style={{ backgroundColor: C.overlay, borderColor: C.border, scrollMarginTop: "100px" }}
              >
                <span style={{ color: C.gold }}><Icon size={26} /></span>
                <h3 className="mt-5 text-2xl" style={{ fontFamily: fonts.display }}>{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>{c.desc}</p>
                <Link
                  to={c.to}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition-all hover:shadow-[0_0_24px_rgba(232,130,26,0.5)]"
                  style={{ backgroundColor: C.gold, color: C.bg }}
                >
                  {c.cta} <ArrowRight size={12} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
