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
  { date: "May 18", t: "New Moon Sound Bath", d: "Set intentions under the dark moon with crystal bowls and guided meditation.", time: "7:00 – 8:30 PM", tag: "Community" },
  { date: "May 25", t: "Hidden Truths Circle", d: "Open discussion on consciousness, the multiverse, and the great unveiling.", time: "6:30 – 8:30 PM", tag: "Community" },
  { date: "Jun 02", t: "Heart-Brain Coherence Workshop", d: "A HeartMath-rooted workshop to align heart and mind, regulate the nervous system, and unlock clarity.", time: "10:00 AM – 1:00 PM", tag: "Workshop" },
  { date: "Jun 14", t: "Holotropic Breathwork Journey", d: "A 90-minute conscious connected breath ceremony for trauma release and expanded states.", time: "1:00 – 4:00 PM", tag: "Ceremony" },
  { date: "Jun 21", t: "Solstice Ceremony", d: "A community gathering to honor the turning of the wheel — fire, sound, prayer.", time: "Sunset", tag: "Ceremony" },
  { date: "Jul 12", t: "Visiting Shaman Weekend Intensive", d: "A two-day immersive with a traditional plant medicine carrier from South America. Limited seats.", time: "Fri – Sun", tag: "Visiting Master" },
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
      eyebrow="Gather · Learn · Transform"
      title="Events, Retreats & Visiting Masters"
      intro="Live ceremonies, workshops, and circles in our South Florida sanctuary — plus weekend intensives with the world's most gifted visiting healers and teachers."
    >
      <section>
        <h2 className="font-serif text-3xl font-light text-foreground md:text-4xl">Upcoming</h2>
        <div className="mt-10 border-t border-border">
          {events.map((e) => {
            const [month, day] = e.date.split(" ");
            return (
              <article
                key={e.t}
                className="grid grid-cols-[80px_1fr] gap-6 border-b border-border py-8 md:grid-cols-[120px_1fr_140px] md:gap-10 md:py-10"
              >
                <div>
                  <p className="font-serif text-3xl font-light text-foreground md:text-4xl">{day}</p>
                  <p className="mt-1 text-[11px] font-light uppercase tracking-[0.22em] text-muted-foreground">{month}</p>
                </div>
                <div>
                  <p className="text-[11px] font-light uppercase tracking-[0.22em] text-foreground/55">{e.tag}</p>
                  <h3 className="mt-2 font-serif text-2xl font-normal text-foreground md:text-3xl">{e.t}</h3>
                  <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">{e.d}</p>
                </div>
                <p className="hidden text-[11px] font-light uppercase tracking-[0.22em] text-muted-foreground md:block md:text-right">
                  {e.time}
                </p>
                <p className="text-xs font-light uppercase tracking-[0.18em] text-muted-foreground md:hidden">{e.time}</p>
              </article>
            );
          })}
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
