import { createFileRoute } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/teachings")({
  head: () => makeRouteMeta({
    title: "Teachings — Hidden Truths of Life",
    description: "An evolving codex on consciousness, the multiverse, intelligent species, and the spirit world.",
  }),
  component: TeachingsPage,
});

const categories = [
  {
    t: "The 3D World",
    d: "The hidden architecture of life on Earth — history rewritten, the nature of money and matter, the body as a sacred instrument.",
    items: ["Lost human history", "The veiled nature of money", "The body as antenna"],
  },
  {
    t: "Beyond the Stars",
    d: "Other planets, star systems, and the civilizations seeded across the cosmos — what the elders and the new contactees agree upon.",
    items: ["Pleiadian, Sirian & Arcturian lineages", "The Galactic federation question", "Star seeds & soul origins"],
  },
  {
    t: "Intelligent Species",
    d: "The many forms consciousness takes — benevolent, neutral, and shadow. Discernment as spiritual practice.",
    items: ["Benevolent guardians", "Tricksters & service-to-self beings", "Inter-species communication"],
  },
  {
    t: "The Spirit World",
    d: "Ancestors, guides, departed loved ones, and the realms between lives. How to listen, and how to verify.",
    items: ["Ancestral healing", "Working with guides", "Between-life realms"],
  },
];

function TeachingsPage() {
  return (
    <PageShell
      eyebrow="The Codex"
      title="Hidden Truths of Life"
      intro="A living library of teachings from the seen and unseen — offered as inquiry, not dogma. Take what resonates, leave the rest."
    >
      <div className="space-y-8">
        {categories.map((c) => (
          <article key={c.t} className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-serif text-3xl text-foreground">{c.t}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.d}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {c.items.map((i) => (
                <li key={i} className="rounded-lg border border-border/60 bg-background px-4 py-3 text-sm text-foreground">
                  {i}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-12 text-center text-sm italic text-muted-foreground">
        New teachings are added with each cycle. Visit the center for full study circles and guided discussions.
      </p>
    </PageShell>
  );
}
