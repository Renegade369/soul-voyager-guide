import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, makeRouteMeta } from "../components/PageShell";
import { MapPin, Clock, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/visit")({
  head: () => makeRouteMeta({
    title: "Visit & Contact — Sacred Journey",
    description: "Find us, reach out, and plan your visit to the Sacred Journey wellness center.",
  }),
  component: VisitPage,
});

function VisitPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell eyebrow="Find Us" title="Visit the Sanctuary" intro="We welcome you in. Reach out to book a session, ask a question, or simply say hello.">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <InfoRow icon={<MapPin size={20} />} title="Location" lines={["123 Sage Hollow Lane", "Sedona, AZ 86336"]} />
          <InfoRow icon={<Clock size={20} />} title="Hours" lines={["Tuesday – Sunday", "9:00 AM – 7:00 PM", "Closed Mondays"]} />
          <InfoRow icon={<Phone size={20} />} title="Phone" lines={["(555) 012-3456"]} />
          <InfoRow icon={<Mail size={20} />} title="Email" lines={["hello@sacredjourney.center"]} />

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="flex h-56 items-center justify-center bg-[image:var(--gradient-sanctuary)] text-sm text-muted-foreground">
              Map preview — embed your map here
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-7"
        >
          <h2 className="font-serif text-2xl text-foreground">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We respond within 1–2 days.</p>

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
