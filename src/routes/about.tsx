import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => makeRouteMeta({
    title: "About William & Sacred Journey — South Florida Sanctuary",
    description: "Sacred Journey was born from William's lifelong awakening, lived experience with sacred plant medicines, recovery, and a calling to build a true sanctuary in South Florida.",
  }),
  component: AboutPage,
});

const principles = [
  { t: "Root Cause", d: "Never symptom management. We work the source — physical, emotional, energetic." },
  { t: "Holistic & Functional", d: "Mind, body, and spirit as one interconnected system. None of it lives in isolation." },
  { t: "Integrative", d: "Ancient plant wisdom and sound medicine braided with modern science and clinical insight." },
  { t: "Heart-Brain Coherence", d: "When heart and brain align, the body remembers how to heal itself." },
  { t: "Energy as Foundation", d: "Physical, emotional, and mental symptoms are downstream of energetic imbalance." },
  { t: "Soul Reconnection", d: "The deepest healing is remembering who you have always been." },
];

const credentials = [
  { t: "Reiki Level 2", d: "Certified hands-on energy healing practitioner." },
  { t: "Spooky2 Rife", d: "Frequency-based therapy in clinical use, including supportive cancer protocols." },
  { t: "BioWell 2.0", d: "Bioenergetic field assessment and energy reading." },
  { t: "Singing Bowls", d: "Trained in vibrational and sound healing practice." },
  { t: "Plant Medicine Guide", d: "Lived experience with mushrooms, DMT, 5-MeO-DMT, Ayahuasca, and Cannabis." },
  { t: "Twenty-Year Entrepreneur", d: "Two decades of building, leading, and serving people." },
];

const values = [
  { t: "Truth", d: "We honor what is real — even when it disturbs the comfortable." },
  { t: "Reverence", d: "All life is sacred. All paths, all beings, all realms." },
  { t: "Embodiment", d: "Wisdom only matters when it lives through the body." },
];

function NumberedGrid({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
      {items.map((s, i) => {
        const isLast = i === items.length - 1;
        const isOdd = items.length % 2 === 1;
        return (
          <article
            key={s.t}
            className={[
              "px-2 py-12 md:px-10 md:py-14",
              "border-b border-border",
              i % 2 === 0 ? "md:border-r" : "",
              isLast && isOdd ? "md:border-b-0" : "",
              !isLast && i === items.length - 2 && !isOdd ? "md:border-b-0" : "",
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
  );
}

function AboutPage() {
  return (
    <PageShell
      eyebrow="Our Story"
      title="A Sanctuary for Truth-Seekers"
      intro="Sacred Journey is being built in South Florida by William Roberts — entrepreneur, father, healer-in-becoming, and lifelong seeker who walked through addiction, trauma, and awakening to arrive at this work."
    >
      <section className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-2xl font-light italic leading-snug text-muted-foreground md:text-3xl">
          We live in a moment of great unveiling.
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-left text-base font-light leading-relaxed text-muted-foreground">
          Truths long hidden — about consciousness, the cosmos, the species who walk among us, and the spirit world that has always been here — are returning to the surface of human awareness. Sacred Journey exists to help souls remember who they truly are.
        </p>
      </section>

      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">William's Path</h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-6 text-base font-light leading-relaxed text-muted-foreground">
          <p>
            For 20 years, William built and ran a roofing and construction business in South Florida. Fifteen years ago, a spiritual awakening permanently shifted his values. A near-fatal motorcycle accident closed one chapter of physical labor and opened another.
          </p>
          <p>
            At the start of 2026 — after a lifetime with alcohol and cocaine — he stopped, an act of profound courage that became the foundation for everything Sacred Journey is becoming.
          </p>
          <p>
            His teachers have included sacred plant medicines — psilocybin mushrooms, DMT, 5-MeO-DMT, Ayahuasca, and Cannabis — approached always with reverence, proper set, and setting. He speaks from lived wisdom, not theory. He has sat with the dark, walked through it, and is still walking.
          </p>
        </div>
      </section>

      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">Our Healing Philosophy</h2>
          <p className="mt-6 font-serif text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
            Six principles. One unbroken thread.
          </p>
        </div>
        <div className="mt-12">
          <NumberedGrid items={principles} />
        </div>
      </section>

      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">Who We're Called to Serve</h2>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
          Souls walking through trauma, addiction, depression, and major life transitions. Burned-out entrepreneurs. People with physical health problems seeking real answers. Spiritual seekers. And especially — the quietly suffering majority who sense there is more but don't yet know how to find it.
        </p>
      </section>

      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">Credentials & Tools</h2>
        </div>
        <div className="mt-12">
          <NumberedGrid items={credentials} />
        </div>
      </section>

      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">The Vision Ahead</h2>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
          Sacred Journey is being built as a destination sanctuary in South Florida — most likely Davie, on land with horses, ceremony space, treatment rooms, a guest house, and grounds for nature immersion. A place where seekers from across the country and the world can do the deepest work of their lives, and where the most gifted healers, shamans, and teachers are hosted to bring their medicine here.
        </p>
      </section>

      <section className="mt-32 border-t border-border pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
          {values.map((v) => (
            <div key={v.t} className="text-center md:px-6">
              <p className="font-serif text-sm font-light italic text-muted-foreground">{String(values.indexOf(v) + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-serif text-3xl font-normal text-foreground">{v.t}</h3>
              <p className="mx-auto mt-5 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-32 border-t border-border py-20 text-center">
        <p className="font-serif text-3xl font-light italic text-foreground md:text-4xl">
          Heal the body. Awaken the soul. Find your people.
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
