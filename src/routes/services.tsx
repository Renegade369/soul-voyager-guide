import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/services")({
  head: () => makeRouteMeta({
    title: "Services — Sacred Journey",
    description: "Energy healing, sound baths, breathwork, bodywork, and spiritual guidance at Sacred Journey.",
  }),
  component: ServicesPage,
});

const services = [
  { t: "Energy Healing", d: "Reiki, biofield clearing, and chakra alignment to restore your subtle anatomy.", duration: "60 / 90 min" },
  { t: "Sound Bath", d: "Crystal bowls, gongs, and tuning forks guide you into deep theta restoration.", duration: "60 min" },
  { t: "Breathwork Journeys", d: "Conscious connected breathing to release trauma and access expanded states.", duration: "75 min" },
  { t: "Bodywork & Massage", d: "Holistic massage integrating somatic release and energetic balancing.", duration: "60 / 90 min" },
  { t: "Akashic Readings", d: "Sacred consultation accessing the soul's record across lifetimes and realms.", duration: "60 min" },
  { t: "Spiritual Mentorship", d: "One-on-one guidance for awakening, integration, and discernment.", duration: "60 min" },
];

const plantMedicine = [
  { t: "Private Plant Medicine Ceremony", d: "An intimate, one-on-one ceremony held with deep reverence — tailored to your intention, lineage, and readiness. Pre-ceremony preparation and post-ceremony integration included.", duration: "Full day" },
  { t: "Group Plant Medicine Ceremony", d: "A held container of fellow seekers gathering in sacred circle. Songs, prayer, and skilled facilitation guide the journey from opening to closing of the space.", duration: "Overnight" },
];

function ServicesPage() {
  return (
    <PageShell eyebrow="✦ The Veil Is Thinning · Offerings ✦" title="Services & Sessions" intro="Each session is held in sacred space, tailored to where you are on your path. As the veil thins, the body asks to be met with deeper care.">
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.t} className="group rounded-2xl border border-border bg-card p-7 transition hover:shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif text-2xl text-foreground">{s.t}</h3>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{s.duration}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ The Veil Is Thinning · Sacred Medicine ✦</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Sacred Plant Medicine Ceremonies</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Held with the deepest reverence for the plants, the lineages, and the souls who come to sit with them. Both private and group ceremonies are available — each prepared with intention, prayer, and skilled care.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plantMedicine.map((s) => (
            <article key={s.t} className="group rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-7 transition hover:shadow-[var(--shadow-glow)]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl text-foreground">{s.t}</h3>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">{s.duration}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic text-muted-foreground">
          Plant medicine ceremonies require a preparation conversation. We honor discernment, safety, and the sovereignty of every soul who sits with us.
        </p>
      </section>

      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <p className="text-muted-foreground">All sessions are by appointment. Reach out to discuss what is right for you.</p>
        <Link to="/visit" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Contact us to book
        </Link>
      </div>
    </PageShell>
  );
}
