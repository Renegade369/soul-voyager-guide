import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell, makeRouteMeta } from "../components/PageShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => makeRouteMeta({
    title: "Contact — Sacred Journey",
    description: "Reach out to Sacred Journey with questions, guidance, or to connect. You are not alone on this journey.",
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40, "Phone is too long").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please share a message").max(2000, "Message is too long"),
});

type FormValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
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
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const resp = await supabase.functions.invoke("contact-submit", {
        body: parsed.data,
      });

      if (resp.error) {
        setServerError("Something went wrong. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <PageShell
        eyebrow="Message Received"
        title="Thank You"
        intro=""
      >
        <section className="mx-auto max-w-2xl py-16 text-center">
          <div className="mx-auto mb-8 h-px w-16" style={{ backgroundColor: "#D4AF64" }} />
          <p className="font-serif text-2xl font-light italic leading-snug text-foreground md:text-3xl">
            Thank you for reaching out.
          </p>
          <p className="mx-auto mt-8 max-w-lg text-base font-light leading-relaxed text-muted-foreground">
            Your message has been received and someone from Sacred Journey will be in touch with you soon. You are in the right place.
          </p>
          <div className="mx-auto mt-8 h-px w-16" style={{ backgroundColor: "#D4AF64" }} />
        </section>

        {/* Disclaimer */}
        <section className="border-t border-border py-10">
          <p className="mx-auto max-w-3xl text-center text-[11px] font-light leading-relaxed tracking-wide text-muted-foreground">
            Sacred Journey is a holistic wellness and spiritual guidance platform. The information, resources, and guidance provided here are for educational and inspirational purposes only and do not constitute medical, psychological, or healthcare advice. Always consult your primary care physician or a qualified healthcare professional regarding any health concerns or before making any changes to your health regimen.
          </p>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Connect"
      title="We Are Here for You"
      intro="Whether you have questions, need guidance, or simply want to connect — we welcome you. You are not alone on this journey."
    >
      <section className="mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/70">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="mt-2 w-full border-b border-border bg-transparent pb-3 text-base font-light text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-[#D4AF64]"
              placeholder="Your name"
            />
            {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/70">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-2 w-full border-b border-border bg-transparent pb-3 text-base font-light text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-[#D4AF64]"
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Phone (optional) */}
          <div>
            <label htmlFor="phone" className="block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/70">
              Phone Number <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="mt-2 w-full border-b border-border bg-transparent pb-3 text-base font-light text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-[#D4AF64]"
              placeholder="(555) 555-5555"
            />
            {errors.phone && <p className="mt-2 text-xs text-red-600">{errors.phone}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-[11px] font-light uppercase tracking-[0.22em] text-foreground/70">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-2 w-full resize-none border-b border-border bg-transparent pb-3 text-base font-light text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-[#D4AF64]"
              placeholder="Share what's on your heart…"
            />
            {errors.message && <p className="mt-2 text-xs text-red-600">{errors.message}</p>}
          </div>

          {serverError && (
            <p className="text-sm text-red-600">{serverError}</p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] transition disabled:opacity-50"
              style={{
                backgroundColor: "#D4AF64",
                color: "#1C1B3A",
                borderRadius: "0.25rem",
              }}
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </section>

      {/* Disclaimer */}
      <section className="mt-32 border-t border-border py-10">
        <p className="mx-auto max-w-3xl text-center text-[11px] font-light leading-relaxed tracking-wide text-muted-foreground">
          Sacred Journey is a holistic wellness and spiritual guidance platform. The information, resources, and guidance provided here are for educational and inspirational purposes only and do not constitute medical, psychological, or healthcare advice. Always consult your primary care physician or a qualified healthcare professional regarding any health concerns or before making any changes to your health regimen.
        </p>
      </section>
    </PageShell>
  );
}
