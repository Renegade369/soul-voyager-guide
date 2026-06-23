import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sprout, Sun, Flame } from "lucide-react";

const C = { bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)", glow: "#E8821A" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/the-sacred-journey")({
  head: () => ({
    meta: [
      { title: "The Sacred Journey — Soul True" },
      { name: "description", content: "Three acts: the wake-up, the four pillars of a sovereign life, and the 21-day challenge. A structured path to remembering who you are." },
      { property: "og:title", content: "The Sacred Journey — Soul True" },
      { property: "og:description", content: "Three acts: wake up, reclaim the four pillars, take the 21-day challenge." },
    ],
  }),
  component: SacredJourneyPage,
});

function GoldRule() {
  return <div className="mx-auto my-20 h-px max-w-2xl" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.5 }} />;
}

function ActLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>{children}</p>;
}

function PillarCard({
  icon: Icon, num, title, body, links,
}: {
  icon: React.ComponentType<{ size?: number }>;
  num: string;
  title: string;
  body: string;
  links: { label: string; to?: string; href?: string }[];
}) {
  return (
    <div data-animate="fade-up" className="rounded-lg border p-8" style={{ backgroundColor: C.overlay, borderColor: C.border }}>
      <div className="flex items-center gap-3">
        <span style={{ color: C.gold }}><Icon size={26} /></span>
        <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>{num}</span>
      </div>
      <h3 className="mt-4 text-3xl font-light" style={{ fontFamily: fonts.display }}>{title}</h3>
      <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(245,240,232,0.78)", fontWeight: 300 }}>{body}</p>
      <div className="mt-6 flex flex-col gap-2">
        {links.map((l) =>
          l.to ? (
            <Link key={l.label} to={l.to} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] hover:underline" style={{ color: C.gold }}>
              {l.label} <ArrowRight size={12} />
            </Link>
          ) : (
            <a key={l.label} href={l.href} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] hover:underline" style={{ color: C.gold }}>
              {l.label} <ArrowRight size={12} />
            </a>
          )
        )}
      </div>
    </div>
  );
}

function SacredJourneyPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>The Sacred Journey</p>
        <h1 className="mt-4 text-5xl font-light leading-[1.05] md:text-7xl" style={{ fontFamily: fonts.display }}>
          A Path Back to <em className="italic" style={{ color: C.gold }}>Yourself.</em>
        </h1>
      </section>

      {/* ACT 1 */}
      <section className="mx-auto max-w-3xl px-6">
        <ActLabel>Act One — The Wake Up</ActLabel>
        <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl" style={{ fontFamily: fonts.display }}>
          Most People Are Living <em className="italic" style={{ color: C.gold }}>Someone Else's Life</em>
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed" style={{ color: "rgba(245,240,232,0.82)", fontWeight: 300 }}>
          <p>From the moment you were born, a system was already in place to shape what you believed, what you wanted, what you feared, and what you thought was possible. School taught you to follow instructions. Media told you what to want. Religion placed God outside you. Finance kept you working to survive, never to thrive.</p>
          <p>This is not a conspiracy. It is a design.</p>
          <p>And the first act of true freedom is simply seeing it clearly — without rage, without blame, without victimhood. Just clear eyes. And then the question: who are you when you stop performing for the system?</p>
          <p className="italic" style={{ color: C.gold }}>That question is the beginning of the Sacred Journey.</p>
        </div>
      </section>

      <GoldRule />

      {/* ACT 2 */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <ActLabel>Act Two — The Four Pillars</ActLabel>
          <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl" style={{ fontFamily: fonts.display }}>
            The Four Areas of a <em className="italic" style={{ color: C.gold }}>Sovereign Life</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "rgba(245,240,232,0.78)", fontWeight: 300 }}>
            Soul True is built around four pillars of total human flourishing. Each one has been hijacked by the system. Each one can be reclaimed — with the right tools, the right knowledge, and the right support.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <PillarCard
            icon={Heart}
            num="Pillar 1"
            title="Physical"
            body="Your body is not a machine to be optimized. It is a living field of intelligence. Ancient traditions knew this. Modern science is catching up. Understanding your body's unique blueprint is the foundation of everything."
            links={[{ label: "Explore Your Blood Type Reader", to: "/readings" }]}
          />
          <PillarCard
            icon={Sprout}
            num="Pillar 2"
            title="Mental & Emotional"
            body="Most emotional suffering comes from programming, not reality. The stories we inherited about who we are, what we deserve, and what is possible — those are not truths. They are instructions. Rewriting them is the work."
            links={[
              { label: "Read Your Aura", to: "/readings" },
              { label: "Begin a Guided Meditation", to: "/meditations" },
            ]}
          />
          <PillarCard
            icon={Sun}
            num="Pillar 3"
            title="Spiritual"
            body="You are not a body that has occasional spiritual experiences. You are a soul having a temporary human one. Every great tradition on Earth — before it was institutionalized — taught the same thing: the divine lives inside you, not above you."
            links={[
              { label: "Take the Soul Quiz", to: "/readings" },
              { label: "Read Your Birth Chart", to: "/readings" },
            ]}
          />
          <PillarCard
            icon={Flame}
            num="Pillar 4"
            title="Work, Wealth & Purpose"
            body="You were not born to trade your hours for survival. You were born with a specific set of gifts that the world needs. The convergence of new technology, sovereignty, and soul purpose is the greatest economic opportunity in human history — for those who are awake enough to see it."
            links={[
              { label: "Explore Work Tools", to: "/readings" },
              { label: "Work With Kim Alfano at Higher Vibes", href: "mailto:HigherVibration36@gmail.com" },
            ]}
          />
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-base italic" style={{ color: "rgba(245,240,232,0.7)" }}>
          Kim Alfano at Higher Vibes works with souls exactly where you are right now — ready to turn awakening into a life that actually works. Tell her Soul True sent you.
        </p>
      </section>

      <GoldRule />

      {/* ACT 3 */}
      <section className="mx-auto max-w-3xl px-6 pb-28 text-center">
        <ActLabel>Act Three — The Challenge</ActLabel>
        <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl" style={{ fontFamily: fonts.display }}>
          The 21-Day <em className="italic" style={{ color: C.gold }}>Sovereign Living</em> Challenge
        </h2>
        <div className="mt-8 space-y-5 text-left text-lg leading-relaxed" style={{ color: "rgba(245,240,232,0.82)", fontWeight: 300 }}>
          <p>The vision means nothing without action. The Challenge is the first step — a 21-day structured process designed to strip away what was never yours and rebuild from what is.</p>
          <p>One daily practice. One daily truth. One daily action. Compounding over 21 days into something that cannot be undone.</p>
        </div>
        <Link
          to="/begin-here"
          className="mt-10 inline-flex items-center gap-2 rounded-md px-9 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition-all hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(232,130,26,0.55)]"
          style={{ backgroundColor: C.gold, color: C.bg }}
        >
          Start the Challenge <ArrowRight size={14} />
        </Link>
        <p className="mt-6 text-xs italic" style={{ color: "rgba(245,240,232,0.5)" }}>
          For educational and inspirational purposes only.
        </p>
      </section>
    </div>
  );
}
