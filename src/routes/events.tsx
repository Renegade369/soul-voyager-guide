import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/events")({
  head: () => makeRouteMeta({
    title: "Events, Retreats & Visiting Masters — Sacred Journey",
    description: "Sound baths, breathwork, ceremonies, weekend immersives with visiting shamans and master healers, and multi-day retreats at Sacred Journey in South Florida.",
  }),
  component: EventsPage,
});

const events = [
  { date: "May 18", t: "New Moon Sound Bath", d: "Set intentions under the dark moon with crystal bowls and guided meditation.", time: "7:00–8:30 PM", tag: "Community" },
  { date: "May 25", t: "Hidden Truths Circle", d: "Open discussion on consciousness, the multiverse, and the great unveiling.", time: "6:30–8:30 PM", tag: "Community" },
  { date: "Jun 02", t: "Heart-Brain Coherence Workshop", d: "A HeartMath-rooted workshop to align heart and mind, regulate the nervous system, and unlock clarity.", time: "10:00 AM–1:00 PM", tag: "Workshop" },
  { date: "Jun 14", t: "Holotropic Breathwork Journey", d: "A 90-minute conscious connected breath ceremony for trauma release and expanded states.", time: "1:00–4:00 PM", tag: "Ceremony" },
  { date: "Jun 21", t: "Solstice Ceremony", d: "A community gathering to honor the turning of the wheel — fire, sound, prayer.", time: "Sunset", tag: "Ceremony" },
  { date: "Jul 12", t: "Visiting Shaman Weekend Intensive", d: "A two-day immersive with a traditional plant medicine carrier from South America. Limited seats.", time: "Fri–Sun", tag: "Visiting Master" },
  { date: "Aug 09", t: "Sacred Journey Retreat", d: "A multi-day immersive at the sanctuary — ceremonies, healing modalities, nature, community, meals.", time: "5 days", tag: "Retreat" },
];

const formats = [
  { t: "Community Gatherings", d: "Sound baths, circles, and meditation evenings — accessible entry points to the sanctuary." },
  { t: "Workshops", d: "Half-day and full-day teachings on coherence, breath, plant medicine preparation, and consciousness." },
  { t: "Ceremonies", d: "Held containers — breathwork, fire, sound, and (in proper context) sacred plant medicine." },
  { t: "Visiting Master Intensives", d: "Weekend immersives with hosted shamans, energy masters, sound healers, mediums, and consciousness teachers." },
  { t: "Multi-Day Retreats", d: "The flagship offering — fully immersive transformation with accommodations, meals, modalities, and ceremony." },
  { t: "Online & Live-Streamed", d: "Recorded teachings and live events for the digital community across the world." },
];

function EventsPage() {
  return (
    <PageShell
      eyebrow="✦ Gather · Learn · Transform ✦"
      title="Events, Retreats & Visiting Masters"
      intro="Live ceremonies, workshops, and circles in our South Florida sanctuary — plus weekend intensives with the world's most gifted visiting healers and teachers."
    >
      <section>
        <h2 className="font-serif text-2xl text-foreground">Upcoming</h2>
        <div className="mt-5 space-y-4">
          {events.map((e) => (
            <article key={e.t} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <span className="font-serif text-2xl leading-none">{e.date.split(" ")[1]}</span>
                <span className="mt-1 text-xs uppercase tracking-wider">{e.date.split(" ")[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-xl text-foreground">{e.t}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-primary">{e.tag}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-primary">{e.time}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ Event Formats ✦</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">How We Gather</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {formats.map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg text-foreground">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-8 text-center">
        <p className="font-serif text-xl text-foreground">Space is intentionally limited for most gatherings.</p>
        <p className="mt-2 text-sm text-muted-foreground">Reserve your seat or learn what's right for you.</p>
        <Link to="/discovery" className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Begin Your Discovery
        </Link>
      </div>
    </PageShell>
  );
}
