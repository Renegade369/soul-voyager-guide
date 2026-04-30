import { createFileRoute } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/practitioners")({
  head: () => makeRouteMeta({
    title: "Practitioners — Sacred Journey",
    description: "Meet the healers, guides, and teachers holding space at Sacred Journey.",
  }),
  component: PractitionersPage,
});

const team = [
  { name: "William Roberts", role: "Founder · Healer at Sacred Journey", bio: "Founder of Sacred Journey, William holds the sanctuary as a place of remembrance — guiding souls through healing, ceremony, and the thinning of the veil with deep reverence and care." },
  { name: "Aria Solenne", role: "Energy Healer", bio: "20 years of study across Reiki, shamanic traditions, and quantum healing." },
  { name: "Mateo Rivers", role: "Sound Healer · Breathwork", bio: "Trained in Himalayan sound traditions and Holotropic breathwork." },
  { name: "Selene Wren", role: "Akashic Reader · Mentor", bio: "A clear channel for the records, devoted to discernment and sovereignty." },
  { name: "Dr. Iyana Cole", role: "Holistic Health · Bodywork", bio: "Naturopath bridging clinical wellness with sacred embodiment." },
];

function PractitionersPage() {
  return (
    <PageShell eyebrow="✦ The Veil Is Thinning · Our Team ✦" title="The Keepers of the Space" intro="Each practitioner brings decades of devotion to their craft. They are here, in this moment of thinning veils, to walk beside you.">
      <div className="grid gap-6 md:grid-cols-2">
        {team.map((p) => (
          <article key={p.name} className="rounded-2xl border border-border bg-card p-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--gradient-warm)] font-serif text-2xl text-primary-foreground">
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="mt-5 font-serif text-2xl text-foreground">{p.name}</h3>
            <p className="text-sm uppercase tracking-wider text-primary">{p.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
