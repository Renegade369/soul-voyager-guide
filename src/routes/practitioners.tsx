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
  bio: "Founder of Sacred Journey. 51 years old, born in 1974, rooted in Broward County, FL. Twenty-year entrepreneur, fifteen-year spiritual seeker, Reiki Level 2 practitioner, BioWell and Spooky2 Rife operator, and lived-experience guide for plant medicine and recovery. William stopped drinking and using cocaine at the start of 2026 — and he holds this work as his life's purpose. He speaks from what he has walked, not what he has read.",
};

const network = [
  { name: "Energy Healers", role: "Reiki · Quantum · Pranic · Theta", bio: "A vetted network of advanced energy practitioners across South Florida and beyond." },
  { name: "Sound & Frequency Masters", role: "Bowls · Gongs · Tuning Forks", bio: "World-class sound healers and frequency medicine practitioners brought into the sanctuary for sessions and ceremonies." },
  { name: "Bodywork Therapists", role: "Somatic · Therapeutic · Lomi Lomi", bio: "Massage and somatic practitioners trained to work with trauma stored in the body." },
  { name: "Yoga & Breathwork Facilitators", role: "Trauma-informed · Holotropic · Wim Hof", bio: "Teachers oriented toward spiritual embodiment and nervous system safety." },
  { name: "Mediums & Intuitive Readers", role: "Vetted · Gifted · Discerning", bio: "Channels, medical intuitives, and spiritual communicators we trust to hold the work with integrity." },
  { name: "Holistic Health Practitioners", role: "Functional · Naturopathic", bio: "Root-cause clinicians bridging modern testing with ancient wisdom." },
];

const visiting = [
  { t: "Indigenous Shamans", d: "Traditional plant medicine carriers and ceremonial leaders from South America, Mexico, and other lineages." },
  { t: "Master Energy Healers", d: "Internationally recognized practitioners — Pranic, Quantum, Theta, and other advanced modalities." },
  { t: "Spiritual Gurus & Teachers", d: "Wisdom keepers, non-duality guides, and consciousness teachers." },
  { t: "Heart-Brain Coherence Experts", d: "HeartMath-certified trainers and heart intelligence educators." },
  { t: "Breathwork Masters", d: "Facilitators of the highest-level transformational and holotropic breathwork." },
  { t: "Consciousness Researchers", d: "Scientists and explorers bridging spirituality and cutting-edge science — DMT research, NDE studies, quantum consciousness." },
];

function PractitionersPage() {
  return (
    <PageShell
      eyebrow="The Keepers of the Space"
      title="Founder, Network & Visiting Masters"
      intro="Sacred Journey is built around William, a curated practitioner network, and an ongoing series of visiting luminaries brought to South Florida to share their medicine."
    >
      {/* Founder */}
      <article className="rounded-2xl border border-primary/40 bg-[image:var(--gradient-sanctuary)] p-8 shadow-[var(--shadow-glow)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-warm)] font-serif text-3xl text-primary-foreground">
            WR
          </div>
          <div>
            <h2 className="font-serif text-3xl text-foreground">{founder.name}</h2>
            <p className="text-sm uppercase tracking-wider text-primary">{founder.role}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{founder.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact-william" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                Send William a Direct Note
              </Link>
              <Link to="/discovery" className="rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur hover:bg-background">
                Begin Your Discovery
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Network */}
      <section className="mt-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Practitioner Network</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">A Curated Circle of Healers</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Sacred Journey is not a one-person practice. Your customized healing plan draws from a vetted network of specialists across modalities — each chosen for skill, integrity, and reverence.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {network.map((p) => (
            <article key={p.name} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
              <p className="text-xs uppercase tracking-wider text-primary">{p.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Visiting Masters */}
      <section className="mt-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Visiting Luminaries</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">Hosted Guest Masters</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Sacred Journey is becoming the place in South Florida where the world's most gifted teachers and healers come to share their work.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visiting.map((v) => (
            <div key={v.t} className="rounded-2xl border border-primary/20 bg-card p-6">
              <h3 className="font-serif text-lg text-foreground">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Visiting masters appear on the <Link to="/events" className="text-primary hover:underline">events calendar</Link> as their dates are confirmed.
        </p>
      </section>
    </PageShell>
  );
}
