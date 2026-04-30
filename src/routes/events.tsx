import { createFileRoute } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/events")({
  head: () => makeRouteMeta({
    title: "Events & Classes — Sacred Journey",
    description: "Upcoming ceremonies, workshops, and group circles at Sacred Journey.",
  }),
  component: EventsPage,
});

const events = [
  { date: "May 18", t: "New Moon Sound Bath", d: "Set intentions under the dark moon with crystal bowls and guided meditation.", time: "7:00–8:30 PM" },
  { date: "May 25", t: "Hidden Truths Circle", d: "Open discussion on the nature of consciousness and the multiverse.", time: "6:30–8:30 PM" },
  { date: "Jun 02", t: "Breathwork Journey", d: "A 90-minute conscious breath ceremony for release and remembrance.", time: "10:00–11:30 AM" },
  { date: "Jun 14", t: "Ancestral Healing Workshop", d: "Connect with your lineage — heal what was, bless what will be.", time: "1:00–5:00 PM" },
  { date: "Jun 21", t: "Solstice Ceremony", d: "A community gathering to honor the turning of the wheel.", time: "Sunset" },
];

function EventsPage() {
  return (
    <PageShell eyebrow="✦ The Veil Is Thinning · Gather ✦" title="Events & Classes" intro="Live ceremonies, workshops, and circles held in our sanctuary space — gatherings for a time when the unseen is drawing closer.">
      <div className="space-y-4">
        {events.map((e) => (
          <article key={e.t} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="font-serif text-2xl leading-none">{e.date.split(" ")[1]}</span>
              <span className="mt-1 text-xs uppercase tracking-wider">{e.date.split(" ")[0]}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-foreground">{e.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-primary">{e.time}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Space is limited for most gatherings. Please contact the center to reserve your seat.
      </p>
    </PageShell>
  );
}
