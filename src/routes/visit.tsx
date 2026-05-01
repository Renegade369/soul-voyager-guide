import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/visit")({
  head: () => makeRouteMeta({
    title: "Visit Sacred Journey — South Florida",
    description: "Sacred Journey is being built as a destination sanctuary in South Florida — Davie, FL — with land, horses, ceremony space, and guest accommodations.",
  }),
  component: VisitPage,
});

const info = [
  { t: "Where We're Building", lines: ["South Florida — Davie, FL (in progress)", "Serving Broward, Miami-Dade & Palm Beach", "Accessible from all of South Florida"] },
  { t: "A Destination Sanctuary", lines: ["Guest house & extended-stay accommodations", "For seekers traveling from across the US and the world", "An international draw for immersive retreats"] },
  { t: "Online Sessions Available Now", lines: ["Intake assessments", "Consultations & integration", "Mentorship & coherence training"] },
  { t: "Reach William", lines: ["Use the form, or send a direct note via the Discovery page."] },
];

function VisitPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      eyebrow="Find Us · South Florida"
      title="Visit the Sanctuary"
      intro="Sacred Journey is being built as a destination — a place worth traveling for. Online intake and consultations are available now while the South Florida property is being established."
    >
      <section className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-2xl font-light italic leading-snug text-muted-foreground md:text-3xl">
          A sacred property with land, horses, ceremony space, and gathering grounds.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
          An equestrian-rooted community with the sanctuary feel of remote land — yet reachable from the largest population of seekers in the southeast.
        </p>
      </section>

      <section className="mt-24 grid gap-12 border-t border-border pt-16 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {info.map((row) => (
          <div key={row.t}>
            <h3 className="font-serif text-2xl font-normal text-foreground">{row.t}</h3>
            <div className="mt-4 space-y-2 text-sm font-light leading-relaxed text-muted-foreground">
              {row.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-32 border-t border-border pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">Send Us a Message</h2>
          <p className="mt-6 font-serif text-xl font-light italic text-muted-foreground">
            William responds personally within one to three days.
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mx-auto mt-14 max-w-xl"
        >
          {sent ? (
            <div className="border-t border-b border-border py-12 text-center">
              <p className="font-serif text-3xl font-light italic text-foreground">Thank you.</p>
              <p className="mx-auto mt-4 max-w-sm text-sm font-light text-muted-foreground">
                Your message has been received. We'll be in touch soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="What brings you here?" name="topic" />
              <div>
                <label className="mb-2 block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/65">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm font-light text-foreground outline-none focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
              >
                Send Message
              </button>
            </div>
          )}
        </form>
      </section>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/65">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm font-light text-foreground outline-none focus:border-foreground"
      />
    </div>
  );
}
