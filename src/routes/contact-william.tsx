import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/contact-william")({
  head: () => makeRouteMeta({
    title: "Contact William Roberts — Sacred Journey",
    description: "Reach William Roberts, founder of Sacred Journey, with questions about sacred journeys, private and group plant medicine ceremonies.",
  }),
  component: ContactWilliamPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40, "Phone is too long").optional().or(z.literal("")),
  interest: z.enum(["private-ceremony", "group-ceremony", "sacred-journey", "general"]),
  experience: z.string().trim().max(500, "Please keep this under 500 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please share a message").max(2000, "Message is too long"),
});

type FormValues = z.infer<typeof contactSchema>;

const interestOptions: { value: FormValues["interest"]; label: string; description: string }[] = [
  { value: "private-ceremony", label: "Private Plant Medicine Ceremony", description: "An intimate, one-on-one ceremony tailored to you." },
  { value: "group-ceremony", label: "Group Plant Medicine Ceremony", description: "Sit in sacred circle with fellow seekers." },
  { value: "sacred-journey", label: "Sacred Journey Guidance", description: "Mentorship for your unfolding path." },
  { value: "general", label: "General Question", description: "Something else on your heart." },
];

function ContactWilliamPage() {
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest: String(formData.get("interest") ?? "general") as FormValues["interest"],
      experience: String(formData.get("experience") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Simulated submit. Hook this up to your email/back-end when ready.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <PageShell
      eyebrow="✦ The Veil Is Thinning · Reach William ✦"
      title="Contact William Roberts"
      intro="Founder and healer at Sacred Journey. Share what's on your heart — questions about sacred journeys, private or group plant medicine ceremonies, or guidance on your path. William reads each message personally."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-7 shadow-[var(--shadow-glow)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--gradient-warm)] font-serif text-2xl text-primary-foreground">
              WR
            </div>
            <h2 className="mt-5 font-serif text-2xl text-foreground">William Roberts</h2>
            <p className="text-sm uppercase tracking-wider text-primary">Founder · Healer</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              William holds Sacred Journey as a sanctuary of remembrance — guiding souls through ceremony, healing, and the thinning of the veil with reverence and care.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            <p className="font-serif text-base text-foreground">What to expect</p>
            <ul className="mt-3 space-y-2">
              <li>• A personal reply within 1–3 days</li>
              <li>• A preparation conversation before any ceremony</li>
              <li>• Discernment, safety, and sovereignty held throughout</li>
            </ul>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-7">
          {sent ? (
            <div className="rounded-xl border border-border bg-background p-8 text-center">
              <p className="font-serif text-2xl text-foreground">Received with gratitude 🙏</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Your message has reached William. He'll be in touch personally within 1–3 days.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-2xl text-foreground">Send William a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">All fields marked with an asterisk are required.</p>
              </div>

              <Field label="Your name *" name="name" error={errors.name} maxLength={100} />
              <Field label="Email *" name="email" type="email" error={errors.email} maxLength={255} />
              <Field label="Phone (optional)" name="phone" type="tel" error={errors.phone} maxLength={40} />

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">I'm reaching out about *</label>
                <div className="space-y-2">
                  {interestOptions.map((opt, i) => (
                    <label key={opt.value} className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background p-3 hover:border-primary/60">
                      <input
                        type="radio"
                        name="interest"
                        value={opt.value}
                        defaultChecked={i === 0}
                        className="mt-1 accent-[color:var(--primary)]"
                      />
                      <span>
                        <span className="block text-sm font-medium text-foreground">{opt.label}</span>
                        <span className="block text-xs text-muted-foreground">{opt.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.interest && <p className="mt-1 text-xs text-destructive">{errors.interest}</p>}
              </div>

              <div>
                <label htmlFor="experience" className="mb-1.5 block text-sm font-medium text-foreground">
                  Your experience with ceremony or healing work (optional)
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={3}
                  maxLength={500}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {errors.experience && <p className="mt-1 text-xs text-destructive">{errors.experience}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">Your message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Share what's calling you, any questions, and what you're hoping for…"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send to William"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Your words are held in confidence.
              </p>
            </div>
          )}
        </form>
      </div>
    </PageShell>
  );
}

function Field({
  label, name, type = "text", error, maxLength,
}: { label: string; name: string; type?: string; error?: string; maxLength?: number }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
