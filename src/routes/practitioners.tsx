import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/practitioners")({
  head: () => makeRouteMeta({
    title: "Practitioners & Visiting Masters — Sacred Journey",
    description: "Meet William and the network of healers, shamans, sound masters, and visiting luminaries holding space at Sacred Journey in South Florida.",
  }),
  component: PractitionersPage,
});

const founder = {
  name: "William Roberts",
  role: "Founder · Healer · Plant Medicine Guide",
  bio: "Founder of Sacred Journey. 51 years old, born in 1974, rooted in Broward County, Florida. Twenty-year entrepreneur, fifteen-year spiritual seeker, Reiki Level 2 practitioner, BioWell and Spooky2 Rife operator, and lived-experience guide for plant medicine and recovery. William stopped drinking and using cocaine at the start of 2026 — and he holds this work as his life's purpose. He speaks from what he has walked, not what he has read.",
};

const network = [
  { t: "Energy Healers", d: "A vetted network of advanced Reiki, Quantum, Pranic, and Theta practitioners across South Florida and beyond." },
  { t: "Sound & Frequency Masters", d: "World-class sound healers and frequency medicine practitioners brought into the sanctuary for sessions and ceremonies." },
  { t: "Bodywork Therapists", d: "Massage and somatic practitioners trained to work with trauma stored in the body — somatic, therapeutic, Lomi Lomi." },
  { t: "Yoga & Breathwork Facilitators", d: "Trauma-informed teachers oriented toward spiritual embodiment and nervous system safety." },
  { t: "Mediums & Intuitive Readers", d: "Vetted, gifted channels, medical intuitives, and spiritual communicators we trust to hold the work with integrity." },
  { t: "Holistic Health Practitioners", d: "Functional and naturopathic root-cause clinicians bridging modern testing with ancient wisdom." },
];

const visiting = [
  { t: "Indigenous Shamans", d: "Traditional plant medicine carriers and ceremonial leaders from South America, Mexico, and other lineages." },
  { t: "Master Energy Healers", d: "Internationally recognized practitioners — Pranic, Quantum, Theta, and other advanced modalities." },
  { t: "Spiritual Teachers", d: "Wisdom keepers, non-duality guides, and consciousness teachers." },
  { t: "Heart-Brain Coherence Experts", d: "HeartMath-certified trainers and heart intelligence educators." },
  { t: "Breathwork Masters", d: "Facilitators of the highest-level transformational and holotropic breathwork." },
  { t: "Consciousness Researchers", d: "Scientists and explorers bridging spirituality and cutting-edge science — DMT research, NDE studies, quantum consciousness." },
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

function PractitionersPage() {
  return (
    <PageShell
      eyebrow="The Keepers of the Space"
      title="Founder, Network & Visiting Masters"
      intro="Sacred Journey is built around William, a curated practitioner network, and an ongoing series of visiting luminaries brought to South Florida to share their medicine."
    >
      {/* Founder */}
      <section className="border-y border-border py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/55">{founder.role}</p>
          <h2 className="mt-6 font-serif text-4xl font-light text-foreground md:text-5xl">{founder.name}</h2>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
          {founder.bio}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact-william"
            className="border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
          >
            Send William a Note
          </Link>
          <Link
            to="/discovery"
            className="border border-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background"
          >
            Begin Your Discovery
          </Link>
        </div>
      </section>

      {/* Network */}
      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">A Curated Circle of Healers</h2>
          <p className="mt-6 font-serif text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
            Skill, integrity, reverence — chosen one by one.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            Sacred Journey is not a one-person practice. Your customized healing plan draws from a vetted network of specialists across modalities.
          </p>
        </div>
        <div className="mt-12">
          <NumberedGrid items={network} />
        </div>
      </section>

      {/* Visiting */}
      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">Hosted Guest Masters</h2>
          <p className="mx-auto mt-8 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            Sacred Journey is becoming the place in South Florida where the world's most gifted teachers and healers come to share their work.
          </p>
        </div>
        <div className="mt-12">
          <NumberedGrid items={visiting} />
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-light italic text-muted-foreground">
          Visiting masters appear on the <Link to="/events" className="text-foreground underline-offset-4 hover:underline">events calendar</Link> as their dates are confirmed.
        </p>
      </section>
    </PageShell>
  );
}
