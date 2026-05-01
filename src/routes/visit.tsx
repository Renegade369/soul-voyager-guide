import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, makeRouteMeta } from "../components/PageShell";
import { MapPin, Clock, Mail, Plane } from "lucide-react";

export const Route = createFileRoute("/visit")({
  head: () => makeRouteMeta({
    title: "Visit Sacred Journey — South Florida",
    description: "Sacred Journey is being built as a destination sanctuary in South Florida — most likely Davie, FL — with land, horses, ceremony space, and guest accommodations.",
  }),
  component: VisitPage,
});

function VisitPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      eyebrow="✦ Find Us · South Florida ✦"
      title="Visit the Sanctuary"
      intro="Sacred Journey is being built as a destination — a place worth traveling for. Online intake and consultations are available now while the South Florida property is being established."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <InfoRow icon={<MapPin size={20} />} title="Where We're Building" lines={["South Florida — Davie, FL (in progress)", "Serving Broward, Miami-Dade & Palm Beach", "Accessible from all of South Florida"]} />
          <InfoRow icon={<Plane size={20} />} title="A Destination Sanctuary" lines={["Guest house & extended-stay accommodations", "For seekers traveling from across the US and the world", "International draw for immersive retreats"]} />
          <InfoRow icon={<Clock size={20} />} title="Online Sessions Available Now" lines={["Intake assessments", "Consultations & integration", "Mentorship & coherence training"]} />
          <InfoRow icon={<Mail size={20} />} title="Reach William" lines={["Use the form, or send a direct note via the Discovery page."]} />

          <div className="overflow-hidden rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ The Vision ✦</p>
            <p className="mt-3 font-serif text-xl text-foreground">A sacred property with land, horses, ceremony space, treatment rooms, and gathering grounds.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              An equestrian-rooted community with the sanctuary feel of remote land — yet reachable from the largest population of seekers in the southeast.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-7"
        >
          <h2 className="font-serif text-2xl text-foreground">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">William responds personally within 1–3 days.</p>

          {sent ? (
            <div className="mt-8 rounded-xl border border-border bg-background p-6 text-center">
              <p className="font-serif text-xl text-foreground">Thank you 🙏</p>
              <p className="mt-2 text-sm text-muted-foreground">Your message has been received. We'll be in touch soon.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="What brings you here?" name="topic" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Send Message
              </button>
            </div>
          )}
        </form>
      </div>
    </PageShell>
  );
}

function InfoRow({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <h3 className="font-serif text-lg text-foreground">{title}</h3>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">{l}</p>
        ))}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
