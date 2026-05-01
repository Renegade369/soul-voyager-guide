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
      {/* Hero — warm gradient with flower-of-life mandala watermark */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.965 0.012 80) 0%, oklch(0.93 0.018 70) 60%, oklch(0.9 0.022 65) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FlowerOfLife size={520} color="#2C2B29" opacity={0.07} strokeWidth={0.5} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <p className="text-[11px] font-light uppercase tracking-[0.32em] text-foreground/65">
            A Sanctuary of Remembrance
          </p>
          <h1 className="mx-auto mt-10 max-w-3xl font-serif text-5xl font-light leading-[1.05] text-foreground md:text-7xl">
            Quiet medicine
            <br />
            for a <em className="italic font-light">noisy</em> world.
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-base font-light leading-relaxed text-foreground/75 md:text-lg">
            Holistic wellness, sacred teachings, and ceremony — held with care, rooted in nature.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/discovery"
              className="border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
            >
              Begin Here
            </Link>
            <Link
              to="/visit"
              className="border border-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
        <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/55">Our Intention</p>
        <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
          A place to slow down,
          <br />
          <em className="italic font-light">remember</em>, and tend to what matters.
        </h2>
      </section>

      <GeometricDivider variant={0} />

      {/* Three pillars — sacred geometry icons + corner watermark */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          {pillars.map(({ Icon, t, d }, i) => (
            <article
              key={t}
              className="relative overflow-hidden border border-border bg-card p-8 text-center md:p-10"
            >
              <Icon size={36} color="#2C2B29" opacity={0.95} strokeWidth={0.7} className="mx-auto" />
              <h3 className="mt-7 font-serif text-2xl font-normal text-foreground">{t}</h3>
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
          <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/55">Offerings</p>
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
              <p className="font-serif text-sm font-light italic text-muted-foreground">{s.n}</p>
              <h3 className="mt-4 font-serif text-3xl font-normal text-foreground">{s.t}</h3>
              <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                {s.d}
              </p>
              <Link
                to="/services"
                className="mt-7 inline-block text-[11px] font-normal uppercase tracking-[0.22em] text-foreground underline-offset-4 hover:underline"
              >
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </section>

      <GeometricDivider variant={2} />

      {/* Full-width dark quote block — large mandala watermark in cream */}
      <section className="relative isolate overflow-hidden bg-foreground py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FlowerOfLife size={400} color="#F8F5F0" opacity={0.06} strokeWidth={0.5} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-serif text-3xl font-light italic leading-snug text-background md:text-5xl">
            “Healing is not a return to who you were.
            It is a slow remembering of who you have always been.”
          </p>
          <p className="mt-10 text-[11px] font-light uppercase tracking-[0.28em] text-background/60">
            A Founding Principle
          </p>
        </div>
      </section>

      {/* Closing CTA — vesica botanical at the bottom */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
            Step into the sanctuary.
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base font-light leading-relaxed text-muted-foreground">
            Book a session, join a circle, or come and be quiet with us for an afternoon.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/discovery"
              className="border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
            >
              Begin Here
            </Link>
            <Link
              to="/visit"
              className="border border-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background"
            >
              Plan Your Visit
            </Link>
          </div>
          <div
            aria-hidden
            className="pointer-events-none mx-auto mt-20 flex justify-center"
          >
            <VesicaBotanical size={280} color="#2C2B29" opacity={0.07} strokeWidth={0.5} />
          </div>
        </div>
      </section>
    </div>
  );
}
