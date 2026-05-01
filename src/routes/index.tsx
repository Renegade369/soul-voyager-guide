import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Flame, Mountain } from "lucide-react";

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
    Icon: Leaf,
    t: "Holistic Healing",
    d: "Bodywork, breath, and somatic care — a return to wholeness, one quiet layer at a time.",
  },
  {
    Icon: Flame,
    t: "Sacred Teachings",
    d: "Grounded inquiry into consciousness, ceremony, and the wisdom that lives beneath the noise.",
  },
  {
    Icon: Mountain,
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
      {/* Hero — warm gradient, large italic serif */}
      <section
        className="relative isolate"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.965 0.012 80) 0%, oklch(0.93 0.018 70) 60%, oklch(0.9 0.022 65) 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
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
      <section className="mx-auto max-w-3xl px-6 py-32 text-center md:py-40">
        <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/55">Our Intention</p>
        <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
          A place to slow down,
          <br />
          <em className="italic font-light">remember</em>, and tend to what matters.
        </h2>
      </section>

      <div className="mx-auto max-w-6xl px-6"><div className="hairline" /></div>

      {/* Three pillars — horizontal grid, thin icon, serif title */}
      <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="grid gap-16 md:grid-cols-3 md:gap-12">
          {pillars.map(({ Icon, t, d }) => (
            <article key={t} className="text-center md:text-left">
              <Icon strokeWidth={1} className="mx-auto h-8 w-8 text-foreground md:mx-0" />
              <h3 className="mt-7 font-serif text-2xl font-normal text-foreground">{t}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6"><div className="hairline" /></div>

      {/* Services — 2×2 numbered grid */}
      <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="mx-auto mb-20 max-w-2xl text-center">
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
                "px-2 py-12 md:px-12 md:py-16",
                "border-b border-border",
                i % 2 === 0 ? "md:border-r" : "",
                i >= services.length - 2 ? "md:border-b-0" : "",
                i === services.length - 1 ? "border-b-0" : "",
              ].join(" ")}
            >
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

      {/* Full-width dark quote block */}
      <section className="bg-foreground py-32 md:py-44">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-serif text-3xl font-light italic leading-snug text-background md:text-5xl">
            “Healing is not a return to who you were.
            It is a slow remembering of who you have always been.”
          </p>
          <p className="mt-10 text-[11px] font-light uppercase tracking-[0.28em] text-background/60">
            A Founding Principle
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center md:py-40">
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
      </section>
    </div>
  );
}
