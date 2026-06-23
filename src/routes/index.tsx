import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Headphones, Compass, Droplet, Eye, Orbit, HelpCircle, ArrowRight, BookOpen, Star } from "lucide-react";
import HERO_BG from "@/assets/home-hero-mystical.png";
import { Reveal } from "@/components/Reveal";
import { EmberField } from "@/components/aesthetic/EmberField";
import { MusicToggle } from "@/components/MusicToggle";
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
  { title: "Daily Horoscope", desc: "A free oracle preview every day — your sign, your frequency", to: "/horoscope", icon: Star },
  { title: "Meditations", desc: "Eyes-closed audio journeys for the awakening mind", to: "/meditations", icon: Headphones },
  { title: "The Challenge", desc: "A structured path to sovereign living", to: "/the-sacred-journey", icon: Compass },
  { title: "Blood Type", desc: "Your biology holds ancient wisdom", to: "/readings", hash: "blood-type", icon: Droplet },
  { title: "Energy Reader", desc: "See the light field that surrounds you", to: "/aura-reader", icon: Eye },
  { title: "Birth Chart", desc: "The sky at your first breath tells your whole story", to: "/readings", hash: "birth-chart", icon: Orbit },
  { title: "Soul Quiz", desc: "Free — discover your soul type in 5 minutes", to: "/readings", hash: "soul-quiz", icon: HelpCircle },
  { title: "The Codex", desc: "Sacred teachings and ancient knowledge restored", to: "/teachings", icon: BookOpen },
];

type NewItem = { title: string; desc: string; to: string; image: string };
const whatsNew: NewItem[] = [
  {
    title: "The Book of Enoch",
    desc: "The scroll Rome couldn't silence — and why the angels still speak through it.",
    to: "/wisdom/book-of-enoch",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782244787586.png",
  },
  {
    title: "Mary Magdalene",
    desc: "The woman they tried to erase — apostle to the apostles, restored.",
    to: "/wisdom/mary-magdalene",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782244791642.png",
  },
  {
    title: "Sacred Plant Allies",
    desc: "The frequencies they tried to silence — and why they matter now.",
    to: "/wisdom/sacred-plants",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782249056192.png",
  },
];

type BeginStep = { n: string; title: string; desc: string; to: string };
const beginSteps: BeginStep[] = [
  { n: "01", title: "Discover Your Blueprint", desc: "Take the free Soul Quiz and meet yourself.", to: "/soul-quiz" },
  { n: "02", title: "Explore the Codex", desc: "Read the suppressed wisdom they didn't want you to find.", to: "/wisdom" },
  { n: "03", title: "Find Your Stillness", desc: "Try a guided meditation built for the awakening mind.", to: "/meditations" },
];


function HomePage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Parallax bg image */}
        <div
          aria-hidden
          className="hero-parallax-layer absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Static dark overlay (locked at 0.55) */}
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "rgba(0,0,0,0.55)" }} />
        {/* Gradient fade at bottom */}
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(10,11,9,0) 0%, rgba(10,11,9,0.35) 65%, rgba(10,11,9,1) 100%)" }} />
        {/* Candlelight flicker glow */}
        <div
          aria-hidden
          className="hero-flicker-layer absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 78%, rgba(232,130,26,0.32) 0%, rgba(201,168,76,0.12) 30%, rgba(10,10,10,0) 65%)`,
          }}
        />
        {/* Parallax ember starfield (tsparticles) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <EmberField density={50} />
        </div>

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
            You Didn&apos;t Come Here to<br />
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

      {/* WHAT'S NEW */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal as="div" className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Latest</p>
          <h2 className="mt-3 text-3xl font-light md:text-5xl" style={{ fontFamily: fonts.display, color: C.text }}>
            What&apos;s New at <em className="italic" style={{ color: C.gold }}>Soul True</em>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {whatsNew.map((n, i) => (
            <Reveal key={n.to} delay={i * 100}>
              <a
                href={n.to}
                className="group flex h-full flex-col overflow-hidden rounded-lg border transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-14px_rgba(201,168,76,0.45)]"
                style={{ backgroundColor: C.overlay, borderColor: C.gold }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl leading-tight" style={{ fontFamily: fonts.display, color: C.text }}>{n.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.75)" }}>{n.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEGIN HERE */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal as="div" className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Begin Here</p>
          <h2 className="mt-3 text-3xl font-light md:text-5xl" style={{ fontFamily: fonts.display, color: C.text }}>
            Not Sure Where to Start? <em className="italic" style={{ color: C.gold }}>Follow the Path.</em>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {beginSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <a
                href={s.to}
                className="group flex h-full flex-col rounded-lg border p-8 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-14px_rgba(201,168,76,0.45)]"
                style={{ backgroundColor: C.overlay, borderColor: C.gold }}
              >
                <span className="text-5xl font-light leading-none" style={{ fontFamily: fonts.display, color: C.gold, textShadow: "0 0 24px rgba(232,130,26,0.35)" }}>{s.n}</span>
                <h3 className="mt-6 text-2xl" style={{ fontFamily: fonts.display, color: C.text }}>{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.75)" }}>{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Begin <ArrowRight size={12} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTIONS GRID */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal as="div" className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Explore</p>
          <h2 className="mt-3 text-3xl font-light md:text-5xl" style={{ fontFamily: fonts.display, color: C.text }}>
            Every Door Into <em className="italic" style={{ color: C.gold }}>Your Truth</em>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <Link
                  to={s.to}
                  hash={s.hash}
                  className="group relative flex h-full flex-col rounded-lg border p-7 transition-all hover:-translate-y-1"
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
              </Reveal>
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

      {/* MEET WILLIAM */}
      <section className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <Reveal>
          <Link
            to="/meet-william"
            className="inline-block px-8 py-4 text-[11px] uppercase tracking-[0.22em] transition"
            style={{
              color: C.gold,
              border: "1px solid rgba(201,168,76,0.45)",
            }}
          >
            Meet Your Guide — William
          </Link>
        </Reveal>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>For educational & inspirational purposes only</p>
      </section>

      <MusicToggle />
    </div>
  );
}
