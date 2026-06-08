import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const C = { bg: "#0A0A0A", card: "#1A1209", gold: "#C9A84C", text: "#F5F0E8", muted: "rgba(245,240,232,0.7)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/vip-waitlist")({
  head: () => ({
    meta: [
      { title: "VIP Retreat Waitlist — The Sovereignty Code" },
      {
        name: "description",
        content:
          "Join the waitlist for in-person Sovereignty Code retreats. Small, intentional gatherings with William.",
      },
    ],
  }),
  component: VipWaitlistPage,
});

function VipWaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    setErr("");
    const { error } = await supabase.from("sovereign_vip_waitlist").insert({
      email: email.trim().toLowerCase(),
      full_name: name.trim() || null,
      notes: notes.trim() || null,
    });
    if (error) {
      // Duplicate email is fine — treat as success.
      if (error.code === "23505") {
        setStatus("ok");
        return;
      }
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "85vh" }}>
      <section className="mx-auto max-w-xl px-6 py-24">
        <p className="text-[11px] uppercase tracking-[0.32em] text-center" style={{ color: C.gold }}>
          VIP Retreats — Waitlist
        </p>
        <h1
          className="mt-6 text-4xl md:text-5xl font-light leading-tight text-center"
          style={{ fontFamily: fonts.display }}
        >
          Sit in the <em style={{ color: C.gold }}>room.</em>
        </h1>
        <p className="mt-6 text-center text-base font-light leading-relaxed" style={{ color: C.muted }}>
          Small, intentional in-person gatherings with William. Limited seats. Sovereignty Code
          Complete members get first access. Add your name to be notified when retreats open.
        </p>

        {status === "ok" ? (
          <div
            className="mt-12 p-8 text-center"
            style={{ background: C.card, border: `1px solid ${C.gold}` }}
          >
            <CheckCircle2 className="mx-auto" size={40} color={C.gold} />
            <h2 className="mt-5 text-2xl font-light italic" style={{ fontFamily: fonts.display }}>
              You're on the list.
            </h2>
            <p className="mt-3 text-sm" style={{ color: C.muted }}>
              We'll reach out the moment retreat dates are announced.
            </p>
            <Link
              to="/sovereign"
              className="mt-8 inline-block border px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              Back to Sovereignty Code
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-5">
            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base"
                style={{ background: C.card, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
              />
            </Field>
            <Field label="Name (optional)">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-base"
                style={{ background: C.card, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
              />
            </Field>
            <Field label="Anything you'd like us to know? (optional)">
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 text-base"
                style={{ background: C.card, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
              />
            </Field>

            {status === "error" && (
              <p className="text-sm" style={{ color: "#E8504C" }}>
                {err || "Something went wrong. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
              style={{ background: C.gold, color: C.bg }}
            >
              {status === "submitting" ? "Joining…" : "Join the Waitlist"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="block mb-2 text-[11px] uppercase tracking-[0.22em]"
        style={{ color: C.gold }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
