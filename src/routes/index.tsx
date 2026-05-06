import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FlowerOfLife,
  GeometricDivider,
  PillarSeedOfLife,
  PillarMetatronCube,
  PillarVesica,
  CardWatermark,
  ServiceCornerBracket,
  VesicaBotanical,
  OrnamentRadiating,
  OrnamentDiamond,
  OrnamentDoubleCircle,
} from "../components/SacredGeometry";
import { Reveal } from "../components/Reveal";
import heroOcean from "../assets/hero-sacred-ocean.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soul True — A Sanctuary for Holistic Wellness & Inspiration" },
      { name: "description", content: "A grounded sanctuary for holistic wellness, sacred teachings, and inspirational resources — quiet wisdom for a noisy world." },
      { property: "og:title", content: "Soul True — A Sanctuary for Holistic Wellness & Inspiration" },
      { property: "og:description", content: "Holistic wellness, sacred teachings, and inspirational resources — quiet wisdom for a noisy world." },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    Icon: PillarSeedOfLife,
    t: "Holistic Wellness",
    d: "Bodywork, breath, and somatic care — a return to wholeness, one quiet layer at a time.",
  },
  {
    Icon: PillarMetatronCube,
    t: "Sacred Teachings",
    d: "Grounded inquiry into consciousness, wisdom traditions, and the knowledge that lives beneath the noise.",
  },
  {
    Icon: PillarVesica,
    t: "Living Practice",
    d: "Daily rhythms, circle, and community — remembrance carried gently into ordinary life.",
  },
];

const services = [
  { n: "01", t: "Bodywork & Energy", d: "Therapeutic massage, craniosacral work, and Reiki — held in a quiet, devotional space.", Icon: PillarVesica },
  { n: "02", t: "Equine & Nature", d: "Horse-assisted sessions and forest walks for nervous-system regulation and remembrance.", Icon: PillarSeedOfLife },
  { n: "03", t: "Gathering & Circle", d: "Cacao, breathwork, and seasonal gatherings to mark thresholds and tend the soul.", Icon: OrnamentRadiating },
  { n: "04", t: "Teachings & Study", d: "Slow study circles in consciousness, wisdom traditions, and embodied practice.", Icon: PillarMetatronCube },
  { n: "05", t: "Kava Circle", d: "Ancient Pacific tradition — kava is shared in sacred circle as a gentle, grounding practice. Promotes deep relaxation, open heart, and community connection. Held with intention, prayer, and presence.", Icon: OrnamentDoubleCircle },
];

function Index() {
  return (
    <div>
      {/* Hero — full-bleed sacred ocean with mission statement */}
      <section className="relative isolate overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* Background image */}
        <img
          src={heroOcean}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.9)" }}
        />
        {/* Gradient overlays for text readability */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center 30%, rgba(28,27,58,0.3) 0%, rgba(28,27,58,0.75) 100%)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, rgba(28,27,58,0.95))" }} />

        {/* Sacred geometry watermark */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sacred-rotate-slow">
          <FlowerOfLife size={600} color="#D4AF64" opacity={0.08} strokeWidth={0.4} />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center md:py-32">
          <p className="text-[11px] font-light uppercase tracking-[0.32em]" style={{ color: "#D4AF64" }}>
            Soul True
          </p>

          {/* Mission statement */}
          <div className="mt-10 space-y-6">
            <h1 className="font-serif text-2xl font-light leading-relaxed md:text-3xl lg:text-4xl" style={{ color: "#F8F5F0" }}>
              At the core of every struggle — every feeling of emptiness, lost purpose, burnout, addiction, or disconnection — is one fundamental truth:{" "}
              <em className="italic" style={{ color: "#D4AF64" }}>we have drifted from our own souls.</em>
            </h1>
            <p className="font-serif text-lg font-light leading-relaxed md:text-xl" style={{ color: "rgba(248,245,240,0.82)" }}>
              This is not weakness. This is the human condition in the world we live in today.
            </p>
            <p className="font-serif text-lg font-light leading-relaxed md:text-xl" style={{ color: "rgba(248,245,240,0.82)" }}>
              Reconnecting with who you truly are at soul level is not just a healing journey — it is the most important work of your lifetime.
            </p>
            <p className="font-serif text-xl font-light italic leading-relaxed md:text-2xl" style={{ color: "#D4AF64" }}>
              Your soul is not something you find. It is where you truly live. It is home.
            </p>
            <p className="font-serif text-lg font-light leading-relaxed md:text-xl" style={{ color: "rgba(248,245,240,0.85)" }}>
              Everything changes when you do.
            </p>
          </div>

          {/* Prominent BEGIN HERE CTA */}
          <div className="mt-14">
            <Link
              to="/begin-here"
              className="group relative inline-block px-14 py-5 text-sm font-normal uppercase tracking-[0.28em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,100,0.35)]"
              style={{
                backgroundColor: "#D4AF64",
                color: "#1C1B3A",
                borderRadius: "0.25rem",
                fontSize: "14px",
                letterSpacing: "0.28em",
              }}
            >
              Begin Here
            </Link>
            <p className="mt-5 text-[11px] font-light uppercase tracking-[0.22em]" style={{ color: "rgba(248,245,240,0.5)" }}>
              Your journey home starts now
            </p>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
        <Reveal>
          <p className="text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#D4AF64" }}>Our Intention</p>
          <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
            A place to slow down,
            <br />
            <em className="italic font-light">remember</em>, and tend to what matters.
          </h2>
        </Reveal>
      </section>

      <GeometricDivider variant={0} />

      {/* Three pillars */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          {pillars.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 120} as="article">
              <article className="relative h-full overflow-hidden p-8 text-center md:p-10">
                <Icon size={36} color="#1C1B3A" opacity={0.95} strokeWidth={0.7} className="mx-auto" />
                <div
                  aria-hidden
                  className="mx-auto mt-6"
                  style={{ width: "3px", height: "32px", backgroundColor: "#D4AF64" }}
                />
                <h3 className="mt-4 font-serif text-2xl font-normal text-foreground">{t}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">{d}</p>
                <CardWatermark variant={i as 0 | 1 | 2} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <GeometricDivider variant={1} />

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <p className="text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#D4AF64" }}>Offerings</p>
            <h2 className="mt-6 font-serif text-4xl font-light text-foreground md:text-5xl">
              What we hold.
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {services.map((s, i) => {
            const isLast = i === services.length - 1;
            const isOdd = services.length % 2 === 1;
            const lastAlone = isLast && isOdd;
            const Icon = s.Icon;
            return (
              <Reveal key={s.n} delay={(i % 2) * 120} as="article">
                <article
                  className={[
                    "tile-hover group relative h-full px-2 py-12 md:px-12 md:py-16",
                    "border-b border-border",
                    !lastAlone && i % 2 === 0 ? "md:border-r" : "",
                    lastAlone ? "md:col-span-2 text-center" : "",
                    i >= services.length - (isOdd ? 1 : 2) ? "md:border-b-0" : "",
                    isLast ? "border-b-0" : "",
                  ].join(" ")}
                  style={lastAlone ? { backgroundColor: "rgba(212,175,100,0.05)" } : undefined}
                >
                  <ServiceCornerBracket variant={i} />
                  <div className={["flex items-center gap-4", lastAlone ? "justify-center" : ""].join(" ")}>
                    <Icon size={lastAlone ? 32 : 28} color="#1C1B3A" opacity={0.5} strokeWidth={0.7} />
                    <p className="font-serif text-sm font-light italic" style={{ color: "#D4AF64" }}>{s.n}</p>
                  </div>
                  <h3
                    className={[
                      "mt-5 font-serif font-normal text-foreground",
                      lastAlone ? "text-4xl md:text-5xl" : "text-3xl",
                    ].join(" ")}
                  >
                    {s.t}
                  </h3>
                  <div
                    aria-hidden
                    className={["tile-bar mt-4", lastAlone ? "mx-auto" : ""].join(" ")}
                    style={{
                      height: lastAlone ? "2px" : "1px",
                      width: lastAlone ? "80px" : "32px",
                      backgroundColor: "#D4AF64",
                    }}
                  />
                  <p
                    className={[
                      "mt-5 text-sm font-light leading-relaxed text-muted-foreground",
                      lastAlone ? "mx-auto max-w-2xl" : "max-w-sm",
                    ].join(" ")}
                  >
                    {s.d}
                  </p>
                  <Link
                    to="/services"
                    className="mt-7 inline-block text-[11px] font-normal uppercase tracking-[0.22em] underline-offset-4 hover:underline"
                    style={{ color: "#2D5A3D" }}
                  >
                    Learn more <span className="tile-arrow ml-1">→</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <GeometricDivider variant={2} />

      {/* Forest-green quote block */}
      <section className="relative isolate overflow-hidden py-16 md:py-20" style={{ backgroundColor: "#2D5A3D" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 sacred-rotate-slow"
        >
          <FlowerOfLife size={400} color="#D4AF64" opacity={0.1} strokeWidth={0.5} />
        </div>
        <Reveal>
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <p className="font-serif text-3xl font-light italic leading-snug md:text-5xl" style={{ color: "#F8F5F0" }}>
              &ldquo;Growth is not a return to who you were.
              It is a slow remembering of who you have always been.&rdquo;
            </p>
            <p className="mt-10 text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "rgba(212,175,100,0.7)" }}>
              A Founding Principle
            </p>
          </div>
        </Reveal>
      </section>

      {/* Three-step ritual */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <p className="text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#D4AF64" }}>How to Begin</p>
            <h2 className="mt-6 font-serif text-4xl font-light text-foreground md:text-5xl">
              A simple <em className="italic">arrival</em>.
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {[
            { n: "I", t: "Discover", d: "A quiet conversation to understand what you carry, and what you seek." , Icon: OrnamentRadiating },
            { n: "II", t: "Choose your path", d: "Together we shape a direction — bodywork, teachings, community, or stillness." , Icon: OrnamentDiamond },
            { n: "III", t: "Arrive", d: "Step into the sanctuary. Be held. Begin again." , Icon: OrnamentDoubleCircle },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 140}>
              <div className="relative flex flex-col items-center text-center">
                <step.Icon size={48} color="#1C1B3A" opacity={0.55} strokeWidth={0.6} />
                <p className="mt-5 font-serif text-xs font-light italic" style={{ color: "#D4AF64", letterSpacing: "0.2em" }}>{step.n}</p>
                <h3 className="mt-3 font-serif text-2xl font-normal text-foreground">{step.t}</h3>
                <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden" style={{ backgroundColor: "#1C1B3A" }}>
        <div className="mx-auto max-w-3xl px-6 text-center" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
          <Reveal>
            <h2
              className="font-serif leading-tight"
              style={{ color: "#F8F5F0", fontWeight: 300, fontSize: "clamp(2.25rem, 5vw, 3rem)" }}
            >
              You have arrived somewhere that understands.
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-base font-light leading-relaxed" style={{ color: "rgba(248,245,240,0.7)" }}>
              The most important work of your lifetime begins with a single step inward.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/begin-here"
                className="px-12 py-4 text-sm font-normal uppercase tracking-[0.24em] transition hover:shadow-[0_0_30px_rgba(212,175,100,0.3)]"
                style={{ backgroundColor: "#D4AF64", color: "#1C1B3A", borderRadius: "0.25rem" }}
              >
                Begin Here
              </Link>
              <Link
                to="/services"
                className="px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
                style={{ color: "#F8F5F0", border: "1px solid rgba(248,245,240,0.5)" }}
              >
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
