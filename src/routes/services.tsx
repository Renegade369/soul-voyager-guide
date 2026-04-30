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
      <div className="mt-14 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <p className="text-muted-foreground">All sessions are by appointment. Reach out to discuss what is right for you.</p>
        <Link to="/visit" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Contact us to book
        </Link>
      </div>
    </PageShell>
  );
}
