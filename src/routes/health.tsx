import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/health")({
  head: () => makeRouteMeta({
    title: "Health — Sacred Journey",
    description: "Holistic health resources: nourishment, detoxification, herbal allies, and the body as a sacred vessel.",
  }),
  component: HealthPage,
});

const pillars = [
  { t: "Nourishment", d: "Whole, living foods. Real water. Honoring the body's intelligence over trends." },
  { t: "Detoxification", d: "Gentle, ongoing release of what no longer serves — physically, energetically, emotionally." },
  { t: "Movement", d: "Yoga, qi gong, and somatic practices to keep life force flowing." },
  { t: "Rest & Rhythm", d: "Sleep, stillness, and circadian alignment as foundational medicine." },
  { t: "Plant Allies", d: "Herbal traditions, adaptogens, and sacred plant wisdom." },
  { t: "Nervous System", d: "Regulation as the gateway to healing, presence, and higher perception." },
];

function HealthPage() {
  return (
    <PageShell
      eyebrow="The Vessel"
      title="Holistic Health"
      intro="The body is not separate from the spirit — it is its temple. The vessel asks to be tended with devotion."
    >
      <section className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-2xl font-light italic leading-snug text-muted-foreground md:text-3xl">
          Six quiet pillars. One steady practice of return.
        </p>
      </section>

      <div className="mt-16 grid grid-cols-1 border-t border-border md:grid-cols-2">
        {pillars.map((s, i) => {
          const isLast = i === pillars.length - 1;
          return (
            <article
              key={s.t}
              className={[
                "px-2 py-12 md:px-10 md:py-14",
                "border-b border-border",
                i % 2 === 0 ? "md:border-r" : "",
                i >= pillars.length - 2 ? "md:border-b-0" : "",
                isLast ? "border-b-0" : "",
              ].join(" ")}
            >
              <p className="font-serif text-sm font-light italic text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-2xl font-normal text-foreground md:text-3xl">{s.t}</h3>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          );
        })}
      </div>

      <section className="mt-32 border-t border-border py-20 text-center">
        <p className="font-serif text-3xl font-light italic text-foreground md:text-4xl">
          A protocol attuned to your body, your story, your spirit.
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm font-light text-muted-foreground">
          Personalized wellness consultations with our practitioners.
        </p>
        <Link
          to="/discovery"
          className="mt-10 inline-block border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
        >
          Begin Your Discovery
        </Link>
      </section>
    </PageShell>
  );
}
