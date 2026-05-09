import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/events")({
  head: () => makeRouteMeta({
    title: "Events, Retreats & Visiting Teachers — Soul True",
    description: "Sound baths, breathwork, workshops, weekend immersives with visiting teachers and practitioners, and multi-day retreats at Soul True in South Florida.",
  }),
  component: EventsPage,
});

const formats = [
  { t: "Community Gatherings", d: "Sound baths, circles, and meditation evenings — accessible entry points to the sanctuary." },
  { t: "Workshops", d: "Half-day and full-day teachings on coherence, breath, plant wisdom education, and consciousness." },
  { t: "Sacred Gatherings", d: "Held containers — breathwork, fire, sound, and mindful practice." },
  { t: "Visiting Teacher Intensives", d: "Weekend immersives with hosted wisdom keepers, energy practitioners, sound artists, intuitives, and consciousness teachers." },
  { t: "Multi-Day Retreats", d: "The flagship offering — fully immersive transformation with accommodations, meals, modalities, and community." },
  { t: "Online & Live-Streamed", d: "Recorded teachings and live events for the digital community across the world." },
];

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      toast.success("You're on the list. We'll be in touch as gatherings are confirmed.");
    }, 400);
  };
  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 border border-border bg-background px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
      />
      <button
        type="submit"
        disabled={submitting}
        className="border border-foreground bg-foreground px-7 py-3 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground disabled:opacity-60"
      >
        {submitting ? "Joining…" : "Join the List"}
      </button>
    </form>
  );
}

function EventsPage() {
  return (
    <PageShell
      eyebrow="Gather · Learn · Grow"
      title="Events, Retreats & Visiting Teachers"
      intro="Live gatherings, workshops, and circles in our South Florida sanctuary — plus weekend intensives with the world's most gifted visiting teachers and practitioners."
    >
      <section>
        <h2 className="font-serif text-3xl font-light text-foreground md:text-4xl">Upcoming</h2>
        <div className="mt-10 border-t border-border pt-12 text-center">
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            Events are being scheduled now for our South Florida sanctuary. Join the list to be first notified when gatherings, workshops, and retreats are confirmed.
          </p>
          <NotifyForm />
        </div>
      </section>

      <section className="mt-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">How We Gather</h2>
          <p className="mt-6 font-serif text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
            Six containers. One steady invitation to remember.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 border-t border-border md:grid-cols-2">
          {formats.map((f, i) => {
            const isLast = i === formats.length - 1;
            return (
              <article
                key={f.t}
                className={[
                  "px-2 py-12 md:px-10 md:py-14",
                  "border-b border-border",
                  i % 2 === 0 ? "md:border-r" : "",
                  i >= formats.length - 2 ? "md:border-b-0" : "",
                  isLast ? "border-b-0" : "",
                ].join(" ")}
              >
                <p className="font-serif text-sm font-light italic text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-normal text-foreground md:text-3xl">{f.t}</h3>
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">{f.d}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-32 border-t border-border py-20 text-center">
        <p className="font-serif text-3xl font-light italic text-foreground md:text-4xl">
          Space is intentionally limited.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm font-light text-muted-foreground">
          Reserve your seat or learn what's right for you.
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
