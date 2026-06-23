import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandLoader } from "@/components/BrandLoader";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { savePhase2Onboarding } from "@/lib/sovereign-onboarding.functions";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  amber: "#E8821A",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/onboarding")({
  head: () => ({ meta: [{ title: "Begin — The Sovereignty Code" }] }),
  component: OnboardingFlow,
});

type StepKey = "welcome" | "door" | "name" | "wake" | "voice" | "identity" | "complete";

const STEPS: StepKey[] = ["welcome", "door", "name", "wake", "voice", "identity", "complete"];

const VOICES = [
  { id: "erin", label: "Erin", note: "Calm feminine — the default." },
  { id: "milo", label: "Milo", note: "Calm masculine." },
  { id: "charlotte", label: "Charlotte", note: "Warm feminine." },
] as const;

function OnboardingFlow() {
  const status = usePortalStatus();
  usePortalGuard(status);
  const navigate = useNavigate();

  const [stepIdx, setStepIdx] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [timezone, setTimezone] = useState<string>("");
  const [voice, setVoice] = useState<"erin" | "milo" | "charlotte">("erin");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      } catch {
        setTimezone("UTC");
      }
    }
  }, []);

  // Auto-advance the Door step after 30 seconds
  useEffect(() => {
    if (STEPS[stepIdx] !== "door") return;
    const t = window.setTimeout(() => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1)), 30_000);
    return () => window.clearTimeout(t);
  }, [stepIdx]);

  if (status.state === "loading" || status.state === "signed-out" || status.state === "not-enrolled") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  const step = STEPS[stepIdx];
  const canBack = stepIdx > 0 && step !== "door" && step !== "complete";

  async function persist() {
    if (status.state !== "ready" && status.state !== "needs-onboarding") return;
    const email = "email" in status ? status.email : "";
    const userId = "userId" in status ? status.userId : "";
    if (!email || !userId) return;
    setSaving(true);
    setError("");
    const res = await savePhase2Onboarding({
      data: {
        email,
        userId,
        cert_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        wake_time: wakeTime,
        timezone: timezone || "UTC",
        meditation_voice: voice,
      },
    });
    setSaving(false);
    if ("error" in res) {
      setError(res.error);
      return;
    }
    setStepIdx(STEPS.indexOf("complete"));
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* progress dots (hidden on door + complete) */}
        {step !== "door" && step !== "complete" && (
          <div className="mb-12 flex items-center justify-center gap-2">
            {STEPS.slice(0, -1).map((_, i) => (
              <div
                key={i}
                className="h-1 w-8 transition-all"
                style={{ background: i <= stepIdx ? C.gold : "rgba(201,168,76,0.2)" }}
              />
            ))}
          </div>
        )}

        {step === "welcome" && (
          <section className="text-center">
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              The Sovereignty Code
            </p>
            <h1 className="mt-6 text-5xl md:text-6xl font-light italic leading-tight" style={{ fontFamily: fonts.display }}>
              You said <span style={{ color: C.gold }}>yes</span> to yourself.
            </h1>
            <p className="mx-auto mt-8 max-w-lg text-lg font-light leading-relaxed" style={{ color: C.muted }}>
              The Sovereignty Code is a 120-day practice. The next 7 minutes start your morning
              ritual — the practice you'll do every day for the rest of the program.
            </p>
            <button
              onClick={() => setStepIdx(1)}
              className="mt-12 inline-block px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg, boxShadow: "0 0 32px rgba(232,130,26,0.35)" }}
            >
              Begin the Journey
            </button>
          </section>
        )}

        {step === "door" && (
          <section className="py-20 text-center">
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              The Door
            </p>
            <h1
              className="mt-10 text-5xl md:text-6xl font-light italic leading-tight"
              style={{ fontFamily: fonts.display }}
            >
              The door is <span style={{ color: C.gold }}>open</span>.
              <br />
              Step through.
            </h1>
            <p className="mx-auto mt-12 max-w-md text-base font-light leading-relaxed" style={{ color: C.muted }}>
              One year from now, you could still be reading these words and feeling exactly the way
              you do right now. Or you could be someone your past self wouldn't recognize.
            </p>
            <button
              onClick={() => setStepIdx(stepIdx + 1)}
              className="mt-16 text-[11px] uppercase tracking-[0.32em]"
              style={{ color: C.gold, opacity: 0.7 }}
            >
              Continue →
            </button>
          </section>
        )}

        {step === "name" && (
          <StepShell title={<>What name should appear on your <em style={{ color: C.gold }}>certificate</em>?</>}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FieldInput label="First name" value={firstName} onChange={setFirstName} />
              <FieldInput label="Last name" value={lastName} onChange={setLastName} />
            </div>
            <Nav
              canBack={canBack}
              onBack={() => setStepIdx(stepIdx - 1)}
              onNext={() => setStepIdx(stepIdx + 1)}
              nextDisabled={!firstName.trim() || !lastName.trim()}
            />
          </StepShell>
        )}

        {step === "wake" && (
          <StepShell title={<>What time do you <em style={{ color: C.gold }}>wake up</em>?</>}>
            <p className="mb-6 text-sm" style={{ color: C.muted }}>
              This sets the rhythm for your morning ritual. You can change it later.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="block mb-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Wake time
                </span>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-4 py-3 text-base"
                  style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
                />
              </label>
              <label className="block">
                <span className="block mb-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Time zone
                </span>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 text-base"
                  style={{ background: C.bg, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
                />
              </label>
            </div>
            <Nav
              canBack={canBack}
              onBack={() => setStepIdx(stepIdx - 1)}
              onNext={() => setStepIdx(stepIdx + 1)}
              nextDisabled={!wakeTime || !timezone}
            />
          </StepShell>
        )}

        {step === "voice" && (
          <StepShell title={<>Which <em style={{ color: C.gold }}>voice</em> guides your meditations?</>}>
            <div className="space-y-3">
              {VOICES.map((v) => {
                const active = v.id === voice;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVoice(v.id)}
                    className="block w-full p-5 text-left transition-all"
                    style={{
                      background: active ? "rgba(201,168,76,0.08)" : C.card,
                      border: `1px solid ${active ? C.gold : "rgba(201,168,76,0.2)"}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-light italic"
                        style={{ fontFamily: fonts.display, color: active ? C.gold : C.text }}
                      >
                        {v.label}
                      </span>
                      {active && <CheckCircle2 size={18} color={C.gold} />}
                    </div>
                    <p className="mt-1 text-sm" style={{ color: C.muted }}>
                      {v.note}
                    </p>
                  </button>
                );
              })}
            </div>
            <Nav
              canBack={canBack}
              onBack={() => setStepIdx(stepIdx - 1)}
              onNext={() => setStepIdx(stepIdx + 1)}
            />
          </StepShell>
        )}

        {step === "identity" && (
          <section className="text-center">
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Module 1 · Identity
            </p>
            <h1
              className="mt-8 text-6xl md:text-7xl font-light italic leading-tight"
              style={{ fontFamily: fonts.display, color: C.gold }}
            >
              I am sovereign.
            </h1>
            <p className="mx-auto mt-10 max-w-lg text-lg font-light leading-relaxed" style={{ color: C.muted }}>
              For the next 14 days, this is the line you carry. Read it aloud each morning after
              your ritual. Let it land in the body.
            </p>
            {error && <p className="mt-4 text-sm" style={{ color: "#E8504C" }}>{error}</p>}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setStepIdx(stepIdx - 1)}
                className="px-6 py-4 text-[11px] uppercase tracking-[0.22em] border"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                <ArrowLeft size={14} className="inline mr-1" /> Back
              </button>
              <button
                onClick={persist}
                disabled={saving}
                className="px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-50"
                style={{ background: C.gold, color: C.bg, boxShadow: "0 0 32px rgba(232,130,26,0.35)" }}
              >
                {saving ? "Sealing…" : "I'm Ready"}
              </button>
            </div>
          </section>
        )}

        {step === "complete" && (
          <section className="py-20 text-center">
            <CheckCircle2 size={56} color={C.gold} className="mx-auto" />
            <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Your portal is open
            </p>
            <h1
              className="mt-4 text-5xl md:text-6xl font-light italic leading-tight"
              style={{ fontFamily: fonts.display }}
            >
              Tomorrow morning,
              <br />
              your <em style={{ color: C.gold }}>ritual</em> will be waiting.
            </h1>
            <p className="mx-auto mt-8 max-w-md text-base" style={{ color: C.muted }}>
              We'll meet you at {wakeTime} in {timezone}.
            </p>
            <button
              onClick={() => navigate({ to: "/sovereign/dashboard", replace: true })}
              className="mt-12 inline-block px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg, boxShadow: "0 0 32px rgba(232,130,26,0.35)" }}
            >
              Open My Dashboard <ArrowRight size={14} className="inline ml-1" />
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function StepShell({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <h1 className="text-4xl md:text-5xl font-light italic leading-tight" style={{ fontFamily: fonts.display }}>
        {title}
      </h1>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
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

function Nav({
  canBack,
  onBack,
  onNext,
  nextDisabled,
}: {
  canBack: boolean;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center gap-3">
      {canBack && (
        <button
          onClick={onBack}
          className="px-6 py-4 text-[11px] uppercase tracking-[0.22em] border"
          style={{ borderColor: C.gold, color: C.gold }}
        >
          <ArrowLeft size={14} className="inline mr-1" /> Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-40"
        style={{ background: C.gold, color: C.bg }}
      >
        Continue <ArrowRight size={14} className="inline ml-1" />
      </button>
    </div>
  );
}
