import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "../assets/sanctuary-hero.jpg";
import handsEarthImg from "../assets/hands-earth.jpg";
import horseHandsImg from "../assets/horse-hands.jpg";
import ceremonyFireImg from "../assets/ceremony-fire.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sacred Journey — A Sanctuary for Holistic Wellness" },
      { name: "description", content: "A grounded sanctuary for holistic healing, sacred teachings, ceremony, and the quiet unfolding of remembrance." },
      { property: "og:title", content: "Sacred Journey — A Sanctuary for Holistic Wellness" },
      { property: "og:description", content: "A grounded sanctuary for holistic healing, sacred teachings, and ceremony." },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    t: "Holistic Healing",
    d: "Bodywork, breath, somatic practice and energetic care — a return to wholeness, one quiet layer at a time.",
  },
  {
    t: "Sacred Teachings",
    d: "Grounded inquiry into consciousness, ceremony, and the timeless wisdom that lives beneath the noise.",
  },
  {
    t: "Living Practice",
    d: "Daily rhythms, circle, and community — remembrance carried gently into ordinary life.",
  },
];

function Index() {
  return (
    <div>
      {/* Hero — full-bleed cinematic forest */}
      <section className="relative isolate">
        <img
          src={heroImg}
          alt="Soft morning light streaming through tall trees in a quiet forest"
          width={1920}
          height={1080}
          className="h-[80vh] w-full object-cover md:h-[88vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background/70" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-4xl px-6 pb-20 text-center md:pb-28">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-foreground/80">
              A Sanctuary of Remembrance
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-foreground md:text-7xl">
              Quiet medicine for a noisy world.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
              Holistic wellness, sacred teachings, and ceremony — held with care, grounded in nature.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/visit"
                className="rounded-full bg-foreground px-8 py-3.5 text-sm font-medium tracking-wide text-background transition hover:bg-foreground/85"
              >
                Plan Your Visit
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-foreground/20 bg-background/60 px-8 py-3.5 text-sm font-medium tracking-wide text-foreground backdrop-blur-sm transition hover:bg-background"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Our Intention</p>
        <h2 className="mt-6 font-serif text-4xl leading-tight text-foreground md:text-5xl">
          A place to slow down, remember, and tend to what matters.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-left text-base leading-relaxed text-muted-foreground md:text-lg">
          Sacred Journey is a physical sanctuary devoted to the care of body, mind,
          and spirit. We hold space for healing in the old sense of the word —
          honest, unhurried, and rooted in the rhythms of the natural world.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-6"><div className="hairline" /></div>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">The Path</p>
          <h2 className="mt-5 font-serif text-4xl text-foreground md:text-5xl">
            Body. Mind. Spirit.
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.t}
              className="rounded-2xl bg-card p-10 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
            >
              <h3 className="font-serif text-2xl text-foreground">{p.t}</h3>
              <div className="mt-5 h-px w-10 bg-primary/60" />
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Image + text — earth */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
        <img
          src={handsEarthImg}
          alt="Hands cupping fresh soil with a small green seedling"
          width={1600}
          height={1200}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
        />
        <div className="md:pl-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Rooted</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Healing begins in the body, in the soil, in the breath.
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground">
            Our work is plain and patient. Whole foods. Real water. Movement that
            honors the body. Practices that quiet the nervous system enough for
            the deeper listening to begin.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
          >
            See our services →
          </Link>
        </div>
      </section>

      {/* Image + text — horse, reversed */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="md:order-2">
          <img
            src={horseHandsImg}
            alt="Hand resting gently on the muzzle of a calm horse"
            width={1600}
            height={1200}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
          />
        </div>
        <div className="md:order-1 md:pr-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Companions</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            The animals know. The land remembers.
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground">
            Equine sessions, forest walks, and ceremony beside fire — quiet
            invitations back into relationship with the more-than-human world.
          </p>
          <Link
            to="/teachings"
            className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
          >
            Explore the teachings →
          </Link>
        </div>
      </section>

      {/* Closing CTA — full-width image */}
      <section className="relative mt-20 isolate overflow-hidden">
        <img
          src={ceremonyFireImg}
          alt="A small ceremony fire at dusk surrounded by stones and soft linen"
          width={1600}
          height={1200}
          loading="lazy"
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-background/80">Begin</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-background md:text-6xl">
              Step into the sanctuary.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-background/85">
              Book a session, join a circle, or simply come and be quiet with us for an afternoon.
            </p>
            <Link
              to="/visit"
              className="mt-9 inline-block rounded-full bg-background px-9 py-3.5 text-sm font-medium tracking-wide text-foreground transition hover:bg-background/90"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
