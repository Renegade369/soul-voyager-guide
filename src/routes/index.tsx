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
} from "../components/SacredGeometry";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sacred Journey — A Sanctuary for Holistic Wellness" },
      { name: "description", content: "A grounded sanctuary for holistic healing, sacred teachings, and ceremony — quiet medicine for a noisy world." },
      { property: "og:title", content: "Sacred Journey — A Sanctuary for Holistic Wellness" },
      { property: "og:description", content: "Holistic healing, sacred teachings, and ceremony — quiet medicine for a noisy world." },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    Icon: PillarSeedOfLife,
    t: "Holistic Healing",
    d: "Bodywork, breath, and somatic care — a return to wholeness, one quiet layer at a time.",
  },
  {
    Icon: PillarMetatronCube,
    t: "Sacred Teachings",
    d: "Grounded inquiry into consciousness, ceremony, and the wisdom that lives beneath the noise.",
  },
  {
    Icon: PillarVesica,
    t: "Living Practice",
    d: "Daily rhythms, circle, and community — remembrance carried gently into ordinary life.",
  },
];

const services = [
  { n: "01", t: "Bodywork & Energy", d: "Therapeutic massage, craniosacral work, and Reiki — held in a quiet, devotional space." },
  { n: "02", t: "Equine & Nature", d: "Horse-assisted sessions and forest walks for nervous-system regulation and remembrance." },
  { n: "03", t: "Ceremony & Circle", d: "Cacao, breathwork, and seasonal gatherings to mark thresholds and tend the soul." },
  { n: "04", t: "Teachings & Study", d: "Slow study circles in consciousness, plant wisdom, and embodied practice." },
];

function Index() {
  return (
    <div>
      {/* Hero — deep indigo with gold sacred geometry watermark */}
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "#1C1B3A" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FlowerOfLife size={520} color="#D4AF64" opacity={0.11} strokeWidth={0.5} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <p className="text-[11px] font-light uppercase tracking-[0.32em]" style={{ color: "#D4AF64" }}>
            A Sanctuary of Remembrance
          </p>
          <h1 className="mx-auto mt-10 max-w-3xl font-serif text-5xl font-light leading-[1.05] md:text-7xl" style={{ color: "#F8F5F0" }}>
            Quiet medicine
            <br />
            for a <em className="italic font-light" style={{ color: "#D4AF64" }}>noisy</em> world.
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-base font-light leading-relaxed md:text-lg" style={{ color: "rgba(248,245,240,0.75)" }}>
            Holistic wellness, sacred teachings, and ceremony — held with care, rooted in nature.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/discovery"
              className="px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
              style={{ backgroundColor: "#D4AF64", color: "#1C1B3A", border: "1px solid #D4AF64" }}
            >
              Begin Here
            </Link>
            <Link
              to="/visit"
              className="px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
              style={{ color: "#F8F5F0", border: "1px solid rgba(248,245,240,0.5)" }}
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
        <p className="text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#D4AF64" }}>Our Intention</p>
        <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
          A place to slow down,
          <br />
          <em className="italic font-light">remember</em>, and tend to what matters.
        </h2>
      </section>

      <GeometricDivider variant={0} />

      {/* Three pillars — gold accent bar above title */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          {pillars.map(({ Icon, t, d }, i) => (
            <article
              key={t}
              className="relative overflow-hidden border border-border p-8 text-center md:p-10"
              style={{ backgroundColor: "#F8F5F0" }}
            >
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
          ))}
        </div>
      </section>

      <GeometricDivider variant={1} />

      {/* Services — 2×2 numbered grid with corner brackets */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#D4AF64" }}>Offerings</p>
          <h2 className="mt-6 font-serif text-4xl font-light text-foreground md:text-5xl">
            What we hold.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.n}
              className={[
                "relative px-2 py-12 md:px-12 md:py-16",
                "border-b border-border",
                i % 2 === 0 ? "md:border-r" : "",
                i >= services.length - 2 ? "md:border-b-0" : "",
                i === services.length - 1 ? "border-b-0" : "",
              ].join(" ")}
            >
              <ServiceCornerBracket variant={i} />
              <p className="font-serif text-sm font-light italic" style={{ color: "#D4AF64" }}>{s.n}</p>
              <h3 className="mt-4 font-serif text-3xl font-normal text-foreground">{s.t}</h3>
              <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                {s.d}
              </p>
              <Link
                to="/services"
                className="mt-7 inline-block text-[11px] font-normal uppercase tracking-[0.22em] underline-offset-4 hover:underline"
                style={{ color: "#2D5A3D" }}
              >
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </section>

      <GeometricDivider variant={2} />

      {/* Forest-green quote block */}
      <section className="relative isolate overflow-hidden py-16 md:py-20" style={{ backgroundColor: "#2D5A3D" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FlowerOfLife size={400} color="#D4AF64" opacity={0.1} strokeWidth={0.5} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-serif text-3xl font-light italic leading-snug md:text-5xl" style={{ color: "#F8F5F0" }}>
            “Healing is not a return to who you were.
            It is a slow remembering of who you have always been.”
          </p>
          <p className="mt-10 text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "rgba(212,175,100,0.7)" }}>
            A Founding Principle
          </p>
        </div>
      </section>

      {/* Closing CTA — deep indigo */}
      <section className="relative isolate overflow-hidden" style={{ backgroundColor: "#1C1B3A" }}>
        <div className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
          <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl" style={{ color: "#F8F5F0" }}>
            Step into the <em className="italic font-light" style={{ color: "#D4AF64" }}>sanctuary</em>.
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base font-light leading-relaxed" style={{ color: "rgba(248,245,240,0.7)" }}>
            Book a session, join a circle, or come and be quiet with us for an afternoon.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/discovery"
              className="px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
              style={{ backgroundColor: "#D4AF64", color: "#1C1B3A", border: "1px solid #D4AF64" }}
            >
              Begin Here
            </Link>
            <Link
              to="/visit"
              className="px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition"
              style={{ color: "#F8F5F0", border: "1px solid rgba(248,245,240,0.5)" }}
            >
              Plan Your Visit
            </Link>
          </div>
          <div
            aria-hidden
            className="pointer-events-none mx-auto mt-20 flex justify-center"
          >
            <VesicaBotanical size={280} color="#D4AF64" opacity={0.1} strokeWidth={0.5} />
          </div>
        </div>
      </section>
    </div>
  );
}
