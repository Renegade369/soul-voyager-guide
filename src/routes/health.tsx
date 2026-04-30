import { createFileRoute } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/health")({
  head: () => makeRouteMeta({
    title: "Health — Sacred Journey",
    description: "Holistic health resources: nutrition, detoxification, herbal allies, and the body as a sacred vessel.",
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
      eyebrow="✦ The Veil Is Thinning · The Vessel ✦"
      title="Holistic Health"
      intro="The body is not separate from the spirit — it is its temple. As the veil thins, the vessel must be tended with greater devotion than ever before."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.t} className="rounded-2xl border border-border bg-card p-6">
            <div className="h-1 w-10 rounded-full bg-primary" />
            <h3 className="mt-4 font-serif text-xl text-foreground">{p.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
          </article>
        ))}
      </div>
      <div className="mt-14 rounded-2xl border border-border bg-[image:var(--gradient-sanctuary)] p-8 text-center">
        <h2 className="font-serif text-2xl text-foreground">Personalized Wellness Consultations</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Work with our practitioners to design a holistic protocol attuned to your body, your story, and your spirit.
        </p>
      </div>
    </PageShell>
  );
}
