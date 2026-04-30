import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "../assets/sanctuary-hero.jpg";
import angelHandsImg from "../assets/angel-hands-opening.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sacred Journey — Holistic Wellness & Spiritual Sanctuary" },
      { name: "description", content: "A physical sanctuary for holistic healing, sacred teachings, and the remembrance of life's hidden truths across realms." },
      { property: "og:title", content: "Sacred Journey — Holistic Wellness & Spiritual Sanctuary" },
      { property: "og:description", content: "A sanctuary for holistic healing and sacred teachings." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Warm sanctuary interior with candles, plants and soft golden light"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_var(--background)_85%)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary">
            ✦ A Sanctuary of Remembrance ✦
          </p>
          <h1 className="font-serif text-5xl leading-tight text-foreground md:text-7xl">
            Sacred Journey
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/85 md:text-xl">
            Holistic wellness, sacred teachings, and the unveiling of life's hidden truths —
            here in the 3D world, beyond the stars, and within the spirit realms.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/visit"
              className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-90"
            >
              Visit the Center
            </Link>
            <Link
              to="/teachings"
              className="rounded-full border border-border bg-background/70 px-7 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-background"
            >
              Explore the Teachings
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Our Pillars</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground">A Path of Body, Mind & Spirit</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Holistic Healing", d: "Bodywork, energy work, sound healing and breath — a return to wholeness on every level." },
            { t: "Sacred Knowledge", d: "Esoteric teachings on consciousness, the multiverse, and the species and realms beyond the veil." },
            { t: "Living Truth", d: "Practices that anchor remembrance into daily life — ceremony, community, and conscious wellness." },
          ].map((p) => (
            <article key={p.t} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <h3 className="font-serif text-2xl text-foreground">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-3xl bg-[image:var(--gradient-warm)] p-12 text-center text-primary-foreground shadow-[var(--shadow-warm)]">
          <h2 className="font-serif text-4xl">Begin Your Journey</h2>
          <p className="mx-auto mt-4 max-w-xl text-base opacity-90">
            Step into the sanctuary. Reach out to book a session, join a circle, or simply visit.
          </p>
          <Link to="/visit" className="mt-8 inline-block rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground transition hover:bg-background/90">
            Plan Your Visit
          </Link>
        </div>
      </section>
    </div>
  );
}
