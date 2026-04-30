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
      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-cosmos)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Life in the Spirit World</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            What happens when the body falls away? Two of the most thorough modern explorers of this
            question — <em>Dolores Cannon</em>, through her Quantum Healing Hypnosis Technique (QHHT),
            and <em>Dr. Michael Newton</em>, through Life Between Lives regression (documented in
            <em> Journey of Souls</em> and <em>Destiny of Souls</em>) — independently gathered thousands of
            client accounts that converge on a remarkably consistent picture of the realms between incarnations.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Crossing</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Newton's subjects describe leaving the body gently, often greeted by a guide or a
                beloved soul. There is no judgment at the threshold — only a homecoming. Cannon's
                clients, speaking from what she called the Subconscious or Higher Self, echo this:
                death is a remembering, not an ending.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Soul Groups & Cluster Families</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                In <em>Destiny of Souls</em>, Newton maps how souls travel in primary clusters of
                3–25 — kindred beings who reincarnate together across lifetimes, switching roles
                (parent, lover, rival, friend) to help one another grow. These are the "soul family"
                bonds you sometimes feel instantly with a stranger.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Council of Elders</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Newton describes a panel of advanced beings — wise, loving, never punitive — who
                meet with each soul to review the lifetime just lived and to help shape the next.
                Cannon's Higher Self sessions point to the same orchestrating intelligence: every
                hardship was chosen, every gift was earned, every contract was agreed upon before birth.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Healing & Restoration</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Souls returning from traumatic lifetimes are bathed in healing light, sometimes for
                what feels like ages of Earth time. Cannon's work emphasizes that the body itself
                can be healed in this state — many QHHT clients reported physical conditions resolving
                once the soul understood their purpose.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Soul Specializations</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <em>Destiny of Souls</em> details how older souls take on roles — Healers, Teachers,
                Designers of worlds, Watchers, Hybrids who incarnate on multiple planets. Cannon's
                "Three Waves of Volunteers" describes souls who came to Earth specifically now, from
                elsewhere, to help humanity through this great shift.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Choosing the Next Life</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Before returning, the soul previews potential lives — bodies, parents, eras, the
                lessons each path offers. Nothing is forced. The Self chooses, often selecting the
                very challenges the human personality will later resist most fiercely. The hardest
                lives are usually chosen by the bravest souls.
              </p>
            </article>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <h3 className="font-serif text-xl text-foreground">Further Study</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>📖 <em>Destiny of Souls</em> — Michael Newton (the deeper companion to <em>Journey of Souls</em>)</li>
              <li>📖 <em>The Convoluted Universe</em> series — Dolores Cannon</li>
              <li>📖 <em>Three Waves of Volunteers and the New Earth</em> — Dolores Cannon</li>
              <li>📖 <em>Between Death and Life</em> — Dolores Cannon</li>
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">
              We hold regular study circles on these texts at the center. See Events for the next gathering.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-12 text-center text-sm italic text-muted-foreground">
        New teachings are added with each cycle. Visit the center for full study circles and guided discussions.
      </p>
    </PageShell>
  );
}
