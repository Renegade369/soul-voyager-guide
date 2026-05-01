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
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <PageShell
      eyebrow="Reach William"
      title="Contact William Roberts"
      intro="Founder and healer at Sacred Journey. Share what's on your heart — questions about sacred journeys, private or group plant medicine ceremonies, or guidance on your path. William reads each message personally."
    >
      <section className="mx-auto max-w-2xl border-y border-border py-16 text-center">
        <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/55">Founder · Healer</p>
        <h2 className="mt-6 font-serif text-4xl font-light text-foreground md:text-5xl">William Roberts</h2>
        <p className="mx-auto mt-8 max-w-xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
          William holds Sacred Journey as a sanctuary of remembrance — guiding souls through ceremony, healing, and the slow work of becoming whole.
        </p>
      </section>

      <section className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
        {[
          { t: "Personal reply", d: "Within one to three days." },
          { t: "Preparation", d: "A conversation before any ceremony." },
          { t: "Sovereignty", d: "Discernment and safety held throughout." },
        ].map((c, i) => (
          <div key={c.t} className="text-center md:text-left">
            <p className="font-serif text-sm font-light italic text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-serif text-2xl font-normal text-foreground">{c.t}</h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-32 border-t border-border pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">Send a Message</h2>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-14 max-w-2xl">
          {sent ? (
            <div className="border-y border-border py-16 text-center">
              <p className="font-serif text-3xl font-light italic text-foreground">Received with gratitude.</p>
              <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                Your message has reached William. He'll be in touch personally within one to three days.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <Field label="Your name" name="name" error={errors.name} maxLength={100} required />
              <Field label="Email" name="email" type="email" error={errors.email} maxLength={255} required />
              <Field label="Phone (optional)" name="phone" type="tel" error={errors.phone} maxLength={40} />

              <div>
                <label className="mb-4 block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/65">
                  I'm reaching out about
                </label>
                <div className="space-y-3">
                  {interestOptions.map((opt, i) => (
                    <label key={opt.value} className="flex cursor-pointer items-start gap-4 border border-border p-4 hover:border-foreground">
                      <input
                        type="radio"
                        name="interest"
                        value={opt.value}
                        defaultChecked={i === 0}
                        className="mt-1 accent-[color:var(--foreground)]"
                      />
                      <span>
                        <span className="block font-serif text-lg font-normal text-foreground">{opt.label}</span>
                        <span className="mt-1 block text-sm font-light text-muted-foreground">{opt.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.interest && <p className="mt-2 text-xs font-light text-destructive">{errors.interest}</p>}
              </div>

              <div>
                <label htmlFor="experience" className="mb-2 block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/65">
                  Your experience with ceremony or healing work (optional)
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={3}
                  maxLength={500}
                  className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm font-light text-foreground outline-none focus:border-foreground"
                />
                {errors.experience && <p className="mt-2 text-xs font-light text-destructive">{errors.experience}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/65">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm font-light text-foreground outline-none focus:border-foreground"
                  placeholder="Share what's calling you, any questions, and what you're hoping for…"
                />
                {errors.message && <p className="mt-2 text-xs font-light text-destructive">{errors.message}</p>}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground disabled:opacity-40"
                >
                  {submitting ? "Sending…" : "Send to William"}
                </button>
                <p className="mt-5 text-xs font-light italic text-muted-foreground">
                  Your words are held in confidence.
                </p>
              </div>
            </div>
          )}
        </form>
      </section>
    </PageShell>
  );
}

function Field({
  label, name, type = "text", error, maxLength, required,
}: { label: string; name: string; type?: string; error?: string; maxLength?: number; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/65">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={maxLength}
        required={required}
        className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm font-light text-foreground outline-none focus:border-foreground"
      />
      {error && <p className="mt-2 text-xs font-light text-destructive">{error}</p>}
    </div>
  );
}
