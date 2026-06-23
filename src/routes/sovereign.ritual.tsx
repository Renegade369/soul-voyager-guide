import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BrandLoader } from "@/components/BrandLoader";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { pickMorningOpener } from "@/lib/time-machine-frames";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  amber: "#E8821A",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/ritual")({
  head: () => ({ meta: [{ title: "Morning Ritual — The Sovereignty Code" }] }),
  component: RitualPage,
});

type Step = {
  key: string;
  label: string;
  body: string;
  seconds: number;
  breath?: boolean; // animated breath circle
  question?: boolean; // silent question step
};

function buildSteps(): Step[] {
  return [
    { key: "settle", label: "Step 1 · Settle", body: "I am here.", seconds: 60 },
    { key: "release", label: "Step 2 · Release", body: "I release what is not mine.", seconds: 60 },
    { key: "anchor", label: "Step 3 · Anchor", body: "The door is open. I am sovereign.", seconds: 60 },
    { key: "frame", label: "Step 4 · Today's frame", body: pickMorningOpener(), seconds: 60 },
    { key: "question", label: "Step 5 · The question", body: "What is mine, beneath the Matrix today?", seconds: 90, question: true },
    { key: "breath", label: "Step 6 · The breath", body: "Breathe with the circle. In 4. Hold 4. Out 6.", seconds: 90, breath: true },
    { key: "close", label: "Step 7 · Close", body: "The practice is yours. Begin the day.", seconds: 0 },
  ];
}

function RitualPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);
  const navigate = useNavigate();

  const [steps] = useState<Step[]>(() => buildSteps());
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(steps[0].seconds);
  const [paused, setPaused] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const tickRef = useRef<number | null>(null);

  // tick
  useEffect(() => {
    if (paused) return;
    if (steps[idx].seconds === 0) return; // close step is manual
    if (remaining <= 0) {
      // auto-advance
      if (idx < steps.length - 1) {
        setIdx((i) => i + 1);
      }
      return;
    }
    tickRef.current = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => {
      if (tickRef.current) window.clearTimeout(tickRef.current);
    };
  }, [idx, remaining, paused, steps]);

  // reset remaining on step change
  useEffect(() => {
    setRemaining(steps[idx].seconds);
  }, [idx, steps]);

  async function persist(skipped: boolean) {
    if (status.state !== "ready") return;
    setSaving(true);
    setError("");
    const { error: err } = await supabase.from("sovereign_ritual_completions").insert({
      user_id: status.userId,
      completed_at: new Date().toISOString(),
      skipped,
    });
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    navigate({ to: "/sovereign/dashboard" });
  }

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  const step = steps[idx];
  const isLast = idx === steps.length - 1;

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => (idx > 0 ? setIdx(idx - 1) : navigate({ to: "/sovereign/dashboard" }))}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> {idx > 0 ? "Back" : "Exit"}
          </button>
          <button
            onClick={() => setShowSkipConfirm(true)}
            className="text-xs uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            Skip today
          </button>
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 w-8 transition-all"
              style={{ background: i <= idx ? C.gold : "rgba(201,168,76,0.2)" }}
            />
          ))}
        </div>

        {/* Body */}
        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            {step.label}
          </p>
          <h1
            className="mt-8 text-5xl md:text-6xl font-light italic leading-tight"
            style={{ fontFamily: fonts.display, color: step.question ? C.gold : C.text }}
          >
            {step.body}
          </h1>

          {step.breath && <BreathCircle paused={paused} />}

          {step.seconds > 0 && (
            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume" : "Pause"}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                {paused ? <Play size={18} /> : <Pause size={18} />}
              </button>
              <span className="text-sm" style={{ color: C.muted, fontVariantNumeric: "tabular-nums" }}>
                {String(Math.floor(remaining / 60)).padStart(1, "0")}:
                {String(remaining % 60).padStart(2, "0")}
              </span>
            </div>
          )}

          {isLast && (
            <>
              {error && <p className="mt-4 text-sm" style={{ color: "#E8504C" }}>{error}</p>}
              <button
                onClick={() => persist(false)}
                disabled={saving}
                className="mt-10 px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-50"
                style={{ background: C.gold, color: C.bg, boxShadow: "0 0 32px rgba(232,130,26,0.35)" }}
              >
                {saving ? "Sealing…" : "Open Today's Lesson →"}
              </button>
            </>
          )}
        </section>
      </div>

      {/* Skip confirm modal */}
      {showSkipConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="max-w-md p-8 text-center" style={{ background: C.card, border: `1px solid ${C.gold}` }}>
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>Skip today's ritual?</p>
            <p className="mt-4 text-lg font-light italic leading-relaxed" style={{ fontFamily: fonts.display, color: C.text }}>
              Your 120-day practice is yours to keep. You have one grace day per week — use it
              wisely.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => persist(true)}
                disabled={saving}
                className="px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-50"
                style={{ background: C.gold, color: C.bg }}
              >
                {saving ? "Saving…" : "Yes, skip today"}
              </button>
              <button
                onClick={() => setShowSkipConfirm(false)}
                className="px-7 py-3 text-[11px] uppercase tracking-[0.22em] border"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                Continue the ritual
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BreathCircle({ paused }: { paused: boolean }) {
  return (
    <>
      <style>{`
        @keyframes soulBreath {
          0%   { transform: scale(0.7); opacity: 0.5; }
          28%  { transform: scale(1.2); opacity: 1; }   /* in 4s */
          57%  { transform: scale(1.2); opacity: 1; }   /* hold 4s */
          100% { transform: scale(0.7); opacity: 0.5; } /* out 6s */
        }
      `}</style>
      <div className="mt-12 flex h-48 w-48 items-center justify-center">
        <div
          className="h-40 w-40 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(232,130,26,0.55) 0%, rgba(201,168,76,0.15) 60%, transparent 100%)",
            border: `1px solid ${C.gold}`,
            animation: "soulBreath 14s ease-in-out infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
    </>
  );
}
