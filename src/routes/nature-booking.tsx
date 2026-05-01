import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { PageShell, makeRouteMeta } from "../components/PageShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/nature-booking")({
  head: () =>
    makeRouteMeta({
      title: "Book a Nature & Animal Healing Session — Sacred Journey",
      description:
        "Request an equine session, forest immersion, earthing practice, ocean ceremony, horse reiki, or animal companionship integration with William.",
    }),
  component: NatureBookingPage,
  validateSearch: (search: Record<string, unknown>) => ({
    modality: typeof search.modality === "string" ? search.modality : undefined,
  }),
});

const MODALITIES = [
  { value: "equine", label: "Equine-Assisted Healing", blurb: "Held sessions with horses on the land — heart awakening, presence, mirror medicine. No riding required." },
  { value: "horse_reiki", label: "Horse Reiki", blurb: "Energy work offered with and through the horses — a sacred triangulation for trauma, grief, and trust." },
  { value: "forest", label: "Forest & Land Immersion", blurb: "Guided 'forest bathing'-style walks on the sanctuary grounds — slow, sensory, prayerful." },
  { value: "earthing", label: "Earthing & Grounding", blurb: "Barefoot practice on the earth, often paired with breathwork and coherence training." },
  { value: "ocean", label: "Ocean & Water Ceremony", blurb: "South Florida saltwater ceremonies — immersion, prayer, and integration with the sea." },
  { value: "animal_companionship", label: "Animal Companionship Integration", blurb: "Guidance for adopting, working with, or grieving an animal companion." },
] as const;

const TIMES = ["Morning", "Midday", "Afternoon", "Sunset", "Evening", "Flexible"] as const;
const LEVELS = ["First time", "Some experience", "Deeply familiar"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  modality: z.enum(["equine", "horse_reiki", "forest", "earthing", "ocean", "animal_companionship"]),
  preferred_date: z.string().optional().or(z.literal("")),
  preferred_time_of_day: z.string().optional().or(z.literal("")),
  group_size: z.coerce.number().int().min(1).max(50),
  experience_level: z.string().optional().or(z.literal("")),
  intention: z.string().trim().min(10, "Please share a few words about your intention").max(2000),
  accessibility_notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

function NatureBookingPage() {
  const search = Route.useSearch();
  const initialModality = useMemo(() => {
    const m = MODALITIES.find((x) => x.value === search.modality);
    return m?.value ?? "equine";
  }, [search.modality]);

  const [modality, setModality] = useState<typeof MODALITIES[number]["value"]>(initialModality);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [level, setLevel] = useState("");
  const [intention, setIntention] = useState("");
  const [accessibility, setAccessibility] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setModality(initialModality);
  }, [initialModality]);

  const selected = MODALITIES.find((m) => m.value === modality)!;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({
      name,
      email,
      phone,
      modality,
      preferred_date: preferredDate,
      preferred_time_of_day: timeOfDay,
      group_size: groupSize,
      experience_level: level,
      intention,
      accessibility_notes: accessibility,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please review your responses.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        modality: parsed.data.modality,
        preferred_date: parsed.data.preferred_date || null,
        preferred_time_of_day: parsed.data.preferred_time_of_day || null,
        group_size: parsed.data.group_size,
        experience_level: parsed.data.experience_level || null,
        intention: parsed.data.intention,
        accessibility_notes: parsed.data.accessibility_notes || null,
      };
      const { error: insertErr } = await supabase
        .from("nature_healing_bookings")
        .insert(payload);
      if (insertErr) throw insertErr;
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong sending your request. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <PageShell
        eyebrow="✦ Request received ✦"
        title="Your request has reached William"
        intro="We will be in touch personally — usually within 1–3 days — to weave the details together with you."
      >
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-serif text-xl text-foreground">
            Thank you, {name.split(" ")[0] || "soul"}.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Your request for a <strong className="text-foreground">{selected.label}</strong> session has been received. The land, the horses, and William have been notified. Watch your inbox at{" "}
            <span className="text-primary">{email}</span> — and please check your spam folder just in case.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="rounded-full border border-border px-5 py-2 text-sm text-foreground hover:bg-muted"
            >
              Return to Services
            </Link>
            <Link
              to="/discovery"
              className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90"
            >
              Begin a Soul Discovery
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="✦ Nature & Animal Healing ✦"
      title="Request a Session"
      intro="Tell us a little about who you are and what you are seeking. Every booking is hand-held — there is no automated calendar, because the land, the horses, and the tides ask to be honored."
    >
      <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-8">
        {/* Modality picker */}
        <fieldset className="rounded-2xl border border-border bg-card p-6">
          <legend className="px-2 text-sm uppercase tracking-[0.2em] text-primary">Choose a modality</legend>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            {MODALITIES.map((m) => {
              const active = modality === m.value;
              return (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setModality(m.value)}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    active
                      ? "border-primary bg-[image:var(--gradient-sanctuary)]"
                      : "border-border hover:border-primary/50"
                  }`}
                  aria-pressed={active}
                >
                  <p className="font-serif text-base text-foreground">{m.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{m.blurb}</p>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Identity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Your name" required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Email" required>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              required
              className={inputCls}
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={40}
              className={inputCls}
            />
          </Field>
          <Field label="How many people?">
            <input
              type="number"
              min={1}
              max={50}
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value) || 1)}
              className={inputCls}
            />
          </Field>
          <Field label="Preferred date (we'll confirm)">
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Preferred time">
            <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} className={inputCls}>
              <option value="">— Select —</option>
              {TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Experience with this kind of work">
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={inputCls}>
              <option value="">— Select —</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="What is calling you to this session?" required>
          <textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            rows={5}
            maxLength={2000}
            required
            placeholder="Share what you are seeking, healing, grieving, or curious about. There is no wrong answer — William reads each one personally."
            className={`${inputCls} resize-none`}
          />
          <p className="mt-1 text-xs text-muted-foreground">{intention.length}/2000</p>
        </Field>

        <Field label="Accessibility, mobility, or animal-related notes (optional)">
          <textarea
            value={accessibility}
            onChange={(e) => setAccessibility(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="E.g. fear of horses, mobility needs, allergies, recent surgeries, or anything that would help us hold you well."
            className={`${inputCls} resize-none`}
          />
        </Field>

        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending your request…" : "Send my request"}
          </button>
          <p className="text-xs text-muted-foreground">
            By submitting, you agree to be contacted by William about this session.
          </p>
        </div>
      </form>
    </PageShell>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-0 transition-colors focus:border-primary";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}{required && <span className="ml-1 text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
