import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => makeRouteMeta({
    title: "About William & Sacred Journey — South Florida Holistic Sanctuary",
    description: "Sacred Journey was born from William's 15-year awakening, lived experience with sacred plant medicines, recovery, and a calling to build a true sanctuary in South Florida.",
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="Our Story · Built from Lived Experience"
      title="A Sanctuary for Truth-Seekers"
      intro="Sacred Journey is being built in South Florida by William Roberts — a 51-year-old entrepreneur, father, healer-in-becoming, and lifelong seeker who walked through addiction, trauma, and awakening to arrive at this work."
    >
      <div className="prose prose-stone mx-auto max-w-3xl text-foreground">
        <p className="text-lg leading-relaxed text-muted-foreground">
          We live in a moment of great unveiling. Truths long hidden — about consciousness,
          the cosmos, the species who walk among us, and the spirit world that has always
          been here — are now returning to the surface of human awareness. Sacred Journey
          exists to help souls remember who they truly are.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-foreground">William's Path</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          For 20 years, William built and ran a roofing and construction business in
          South Florida. Fifteen years ago, a spiritual awakening permanently shifted
          his values. A near-fatal motorcycle accident closed one chapter of physical
          labor and opened another. At the start of 2026 — after a lifetime with
          alcohol and cocaine — he stopped, an act of profound courage that became the
          foundation for everything Sacred Journey is becoming.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          His teachers have included sacred plant medicines — psilocybin mushrooms, DMT,
          5-MeO-DMT, Ayahuasca, and Cannabis — approached always with reverence, proper
          set, and setting. He speaks from lived wisdom, not theory. He has sat with
          the dark, walked through it, and is still walking.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-foreground">Our Healing Philosophy</h2>
        <ul className="mt-4 space-y-3 text-muted-foreground">
          <li><strong className="text-foreground">Root cause</strong> — never symptom management.</li>
          <li><strong className="text-foreground">Holistic & functional</strong> — mind, body and spirit as one interconnected system.</li>
          <li><strong className="text-foreground">Integrative</strong> — ancient plant wisdom and sound/frequency healing braided with modern science.</li>
          <li><strong className="text-foreground">Heart-brain coherence</strong> — the heart is the master organ of healing; when heart and brain align, the body remembers how to heal.</li>
          <li><strong className="text-foreground">Energy as foundation</strong> — physical, emotional, and mental symptoms are downstream of energetic imbalance.</li>
          <li><strong className="text-foreground">Soul reconnection</strong> — the deepest healing is remembering who you truly are.</li>
        </ul>

        <h2 className="mt-12 font-serif text-3xl text-foreground">Who We're Called to Serve</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Souls walking through trauma, addiction, depression, and major life transitions.
          Burned-out entrepreneurs. People with physical health problems seeking real
          answers. Spiritual seekers. And especially — the quietly suffering majority who
          sense there is more but don't yet know how to find it.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-foreground">Credentials & Tools</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { t: "Reiki Level 2", d: "Certified hands-on energy healing practitioner." },
            { t: "Spooky2 Rife", d: "Frequency-based therapy, currently in clinical use with cancer support." },
            { t: "BioWell 2.0", d: "Bioenergetic field assessment and energy reading." },
            { t: "Singing Bowls", d: "Trained in vibrational and sound healing practice." },
            { t: "Plant Medicine Guide", d: "Lived experience with mushrooms, DMT, 5-MeO-DMT, Ayahuasca, Cannabis." },
            { t: "20 Years Entrepreneur", d: "Two decades of building, leading, and serving people." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-serif text-lg text-foreground">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-3xl text-foreground">The Vision Ahead</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Sacred Journey is being built as a destination sanctuary in South Florida —
          most likely in Davie, on land with horses, ceremony space, treatment rooms,
          a guest house, and grounds for nature immersion. A place where seekers from
          across the country and the world can come to do the deepest work of their
          lives, and where the most gifted healers, shamans, and teachers are hosted
          to bring their medicine here.
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

        <div className="mt-14 rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-8 text-center">
          <p className="font-serif text-2xl text-foreground">Heal the body. Awaken the soul. Find your people.</p>
          <Link
            to="/discovery"
            className="mt-5 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-90"
          >
            Begin Your Discovery with William
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
