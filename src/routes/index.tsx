import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Headphones, Compass, Droplet, Eye, Orbit, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import HERO_BG from "@/assets/home-hero-mystical.png";
const PLANT_BG =
  "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778962225130.png";

const C = {
  bg: "#0A0A0A",
  gold: "#C9A84C",
  goldAlt: "#D4A017",
  text: "#F5F0E8",
  glow: "#E8821A",
  overlay: "#1A1209",
  border: "rgba(201,168,76,0.22)",
};
const fonts = {
  display: '"Cormorant Garamond", serif',
  body: '"Outfit", sans-serif',
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soul True — You Didn't Come Here to Fit In" },
      {
        name: "description",
        content:
          "A sanctuary for those done pretending — and ready to remember who they actually are. Soul blueprint, ancient wisdom, and tools for the awakening mind.",
      },
      { property: "og:title", content: "Soul True — You Didn't Come Here to Fit In" },
      {
        property: "og:description",
        content:
          "A sanctuary for those done pretending — and ready to remember who they actually are.",
      },
    ],
  }),
  component: HomePage,
});

type Section = {
  title: string;
  desc: string;
  to: string;
  hash?: string;
  icon: React.ComponentType<{ size?: number }>;
};

const sections: Section[] = [
  { title: "Readings", desc: "Discover your soul blueprint through Soul True readers", to: "/readings", icon: Sparkles },
  { title: "Meditations", desc: "Eyes-closed audio journeys for the awakening mind", to: "/meditations", icon: Headphones },
  { title: "The Challenge", desc: "A structured path to sovereign living", to: "/the-sacred-journey", icon: Compass },
  { title: "Blood Type", desc: "Your biology holds ancient wisdom", to: "/readings", hash: "blood-type", icon: Droplet },
  { title: "Energy Reader", desc: "See the light field that surrounds you", to: "/aura-reader", icon: Eye },
  { title: "Birth Chart", desc: "The sky at your first breath tells your whole story", to: "/readings", hash: "birth-chart", icon: Orbit },
  { title: "Soul Quiz", desc: "Free — discover your soul type in 5 minutes", to: "/readings", hash: "soul-quiz", icon: HelpCircle },
  { title: "The Codex", desc: "Sacred teachings and ancient knowledge restored", to: "/teachings", icon: BookOpen },
];

function HomePage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(10,11,9,0.3) 0%, rgba(10,11,9,0.6) 60%, rgba(10,11,9,1) 100%)" }} />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, rgba(232,130,26,0.18) 0%, rgba(10,10,10,0) 60%)`,
          }}
        />

        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.4em]"
            style={{ color: C.gold }}
          >
            The truth was always inside you.
          </p>
          <h1
            className="text-5xl font-light leading-[1.05] md:text-7xl"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            You Didn&apos;t Come Here to{" "}
            <em className="italic" style={{ color: C.gold }}>Fit In.</em>
          </h1>
          <p
            className="mx-auto mt-8 max-w-2xl text-lg md:text-xl"
            style={{ color: "rgba(245,240,232,0.85)", fontWeight: 300 }}
          >
            Soul True is a sanctuary for those who are done pretending — and ready to remember who they actually are.
          </p>
          <p
            className="mx-auto mt-5 max-w-2xl text-base md:text-[17px]"
            style={{ color: "rgba(245,240,232,0.7)", fontWeight: 300 }}
          >
            Explore your soul blueprint through ancient wisdom, modern science, and tools built for the awakening mind. Your truth is already here. We just help you see it.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              to="/the-sacred-journey"
              className="inline-flex items-center gap-2 rounded-md px-9 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: C.gold,
                color: C.bg,
                boxShadow: `0 0 0 0 rgba(232,130,26,0)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 36px rgba(232,130,26,0.55)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 rgba(232,130,26,0)`;
              }}
            >
              Begin Your Journey <ArrowRight size={14} />
            </Link>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.55)" }}>
              Free to explore • No account needed • Built for souls ready to wake up
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS GRID */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Explore</p>
          <h2 className="mt-3 text-3xl font-light md:text-5xl" style={{ fontFamily: fonts.display, color: C.text }}>
            Every Door Into <em className="italic" style={{ color: C.gold }}>Your Truth</em>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                to={s.to}
                hash={s.hash}
                className="group relative flex flex-col rounded-lg border p-7 transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: C.overlay,
                  borderColor: C.border,
                  boxShadow: "0 0 0 0 rgba(201,168,76,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px -12px rgba(201,168,76,0.35)`;
                  (e.currentTarget as HTMLElement).style.borderColor = C.gold;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(201,168,76,0)";
                  (e.currentTarget as HTMLElement).style.borderColor = C.border;
                }}
              >
                <span style={{ color: C.gold }}><Icon size={24} /></span>
                <h3 className="mt-5 text-2xl font-normal" style={{ fontFamily: fonts.display, color: C.text }}>{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>
                  {s.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Enter <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SACRED PLANT IMAGE — psilocybin cosmic */}
      <section className="relative w-full overflow-hidden" aria-hidden>
        <img
          src={PLANT_BG}
          alt=""
          className="block w-full"
          style={{
            opacity: 0.7,
            objectFit: "cover",
            maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>For educational & inspirational purposes only</p>
      </section>
    </div>
  );
}
