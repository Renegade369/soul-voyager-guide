import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/portal/onboarding")({
  head: () => ({ meta: [{ title: "Sacred Contract — The Sovereignty Code" }] }),
  component: OnboardingPage,
});

const SACRED_CONTRACT = [
  "I show up for the work, even when it's uncomfortable.",
  "I take radical responsibility for my life, my choices, and my frequency.",
  "I do not outsource my truth to algorithms, authorities, or anyone else.",
  "I honor this container — what I receive here is sacred and not for resale.",
  "I commit to the full six modules, at my own pace, with my whole self.",
];

function OnboardingPage() {
  const status = usePortalStatus();
  usePortalGuard(status); // redirect signed-out / not-enrolled
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [agreed, setAgreed] = useState(false);
  const [intention1, setIntention1] = useState("");
  const [intention2, setIntention2] = useState("");
  const [intention3, setIntention3] = useState("");
  const [whyNow, setWhyNow] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-skip if already complete
  useEffect(() => {
    if (status.state === "ready") navigate({ to: "/sovereign/portal/dashboard", replace: true });
  }, [status.state, navigate]);

  if (status.state === "loading" || status.state === "signed-out" || status.state === "not-enrolled") {
    return (
      <div style={{ background: C.bg, color: C.text, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  const { email, userId, tier } = status;

  async function submit() {
    setSaving(true);
    setError("");
    const now = new Date().toISOString();
    const { error: err } = await supabase
      .from("sovereign_onboarding")
      .upsert(
        {
          user_id: userId,
          email,
          sacred_contract_signed_at: now,
          intention_one: intention1.trim() || null,
          intention_two: intention2.trim() || null,
          intention_three: intention3.trim() || null,
          why_now: whyNow.trim() || null,
          completed_at: now,
        },
        { onConflict: "user_id" }
      );
    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    navigate({ to: "/sovereign/portal/dashboard", replace: true });
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <section className="mx-auto max-w-2xl px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
          Initiation · Step {step} of 3
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-light leading-tight" style={{ fontFamily: fonts.display }}>
          {step === 1 && (<>The Sacred <em style={{ color: C.gold }}>Contract</em>.</>)}
          {step === 2 && (<>Your Three <em style={{ color: C.gold }}>Intentions</em>.</>)}
          {step === 3 && (<>Why <em style={{ color: C.gold }}>now</em>?</>)}
        </h1>
        <p className="mt-2 text-xs" style={{ color: C.muted }}>
          Enrolled as <span style={{ color: C.gold }}>{email}</span> · Tier:{" "}
          <span style={{ color: C.gold, textTransform: "capitalize" }}>{tier}</span>
        </p>

        <div className="mt-10 p-8" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}>
          {step === 1 && (
            <>
              <p className="text-base font-light leading-relaxed" style={{ color: C.muted }}>
                Before you enter the work, read what you are agreeing to. These are not rules. They
                are the conditions under which transformation is possible.
              </p>
              <ul className="mt-6 space-y-4">
                {SACRED_CONTRACT.map((line, i) => (
                  <li key={i} className="flex gap-3 text-base font-light leading-relaxed">
                    <span style={{ color: C.gold }}>✦</span>
                    <span style={{ color: C.text }}>{line}</span>
                  </li>
                ))}
              </ul>
              <label className="mt-8 flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#C9A84C]"
                />
                <span className="text-sm" style={{ color: C.text }}>
                  I have read and I agree. I sign this contract with my full presence.
                </span>
              </label>
              <button
                onClick={() => setStep(2)}
                disabled={!agreed}
                className="mt-8 w-full px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: C.gold, color: C.bg }}
              >
                I Sign — Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-base font-light leading-relaxed" style={{ color: C.muted }}>
                Write three intentions you carry into this work. Be specific. Be honest. These will
                live in your portal and you'll return to them.
              </p>
              <div className="mt-6 space-y-5">
                <IntentionField label="Intention One" value={intention1} onChange={setIntention1} />
                <IntentionField label="Intention Two" value={intention2} onChange={setIntention2} />
                <IntentionField label="Intention Three" value={intention3} onChange={setIntention3} />
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 text-[11px] uppercase tracking-[0.22em] border"
                  style={{ borderColor: C.gold, color: C.gold }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!intention1.trim() || !intention2.trim() || !intention3.trim()}
                  className="flex-1 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-40"
                  style={{ background: C.gold, color: C.bg }}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-base font-light leading-relaxed" style={{ color: C.muted }}>
                Of all the moments in your life, you arrived <em>here</em>, <em>now</em>. Why? Tell
                the truth — the deep one, not the polished one.
              </p>
              <textarea
                rows={7}
                value={whyNow}
                onChange={(e) => setWhyNow(e.target.value)}
                placeholder="What woke you up. What you can no longer ignore."
                className="mt-5 w-full px-4 py-3 text-base"
                style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
              />
              {error && <p className="mt-3 text-sm" style={{ color: "#E8504C" }}>{error}</p>}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-4 text-[11px] uppercase tracking-[0.22em] border"
                  style={{ borderColor: C.gold, color: C.gold }}
                >
                  Back
                </button>
                <button
                  onClick={submit}
                  disabled={saving || !whyNow.trim()}
                  className="flex-1 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-40 inline-flex items-center justify-center gap-2"
                  style={{ background: C.gold, color: C.bg }}
                >
                  {saving ? "Sealing…" : (<>Enter the Portal <CheckCircle2 size={14} /></>)}
                </button>
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs">
          <Link to="/sovereign" style={{ color: C.muted }} className="underline">
            ← Back to program details
          </Link>
        </p>
      </section>
    </div>
  );
}

function IntentionField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block mb-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-base"
        style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
      />
    </label>
  );
}
