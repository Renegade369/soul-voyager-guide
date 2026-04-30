import { createFileRoute } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => makeRouteMeta({
    title: "About — Sacred Journey",
    description: "Sacred Journey is a holistic wellness center devoted to truth, healing, and the remembrance of who we truly are.",
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell eyebrow="Our Story" title="A Sanctuary for Truth-Seekers" intro="Sacred Journey was born from a calling: to create a physical home where healing, knowledge, and the sacred meet.">
      <div className="prose prose-stone mx-auto max-w-3xl text-foreground">
        <p className="text-lg leading-relaxed text-muted-foreground">
          We live in a moment of great unveiling. Truths long hidden — about consciousness,
          the cosmos, the species who walk among us, and the spirit world that has always
          been here — are now returning to the surface of human awareness.
        </p>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Sacred Journey is a grounded, beautiful, embodied space where this remembrance
          can be lived. We offer holistic healing for body and nervous system, sacred
          teachings for the seeking mind, and ceremony for the awakening soul.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { t: "Truth", d: "We honor what is real — even when it disturbs the comfortable." },
            { t: "Reverence", d: "All life is sacred. All paths, all beings, all realms." },
            { t: "Embodiment", d: "Wisdom only matters when it lives through the body." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-6 text-center">
              <h3 className="font-serif text-xl text-foreground">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
