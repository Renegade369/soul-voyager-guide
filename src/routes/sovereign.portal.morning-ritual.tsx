import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { pickMorningOpener, DAILY_REFLECTION_PROMPT } from "@/lib/time-machine-frames";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  amber: "#E8821A",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/portal/morning-ritual")({
  head: () => ({ meta: [{ title: "Morning Ritual — The Sovereignty Code" }] }),
  component: MorningRitualPage,
});

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

type Stage = "ground" | "breathe" | "intend" | "reflect" | "seal";

const STAGES: { key: Stage; label: string; title: string; body: string }[] = [
  {
    key: "ground",
    label: "Stage 1 · Ground",
    title: "Arrive.",
    body:
      "Sit. Feet on the floor. Spine long. Eyes soft. Notice that you are here. Notice that you have a body. Notice that the day has not yet been decided. You are about to decide it.",
  },
  {
    key: "breathe",
    label: "Stage 2 · Breathe",
    title: "Seven sacred breaths.",
    body:
      "Inhale through the nose for a count of four. Hold for two. Exhale through the mouth for a count of six. Seven rounds. With each exhale, release one thing the world has placed on you that was not yours to carry.",
  },
  {
    key: "intend",
    label: "Stage 3 · Intend",
    title: "Choose your frequency.",
    body:
      "Speak silently or aloud: \"Today I move as a sovereign being. I respond, I do not react. I receive what is mine and release what is not. I am the author of this day.\"",
  },
  {
    key: "reflect",
    label: "Stage 4 · Reflect",
    title: "One honest line.",
    body:
      "Write a single sentence — what you want this day to mean. No performance. The truth as it lives in you right now.",
  },
  {
    key: "seal",
    label: "Stage 5 · Seal",
    title: "Consecrate the day.",
    body:
      "Place your hand on your heart. Three slow breaths. The ritual is complete. Carry the frequency forward.",
  },
];

function MorningRitualPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);
  const navigate = useNavigate();

  const [idx, setIdx] = useState(0);
  const [reflection, setReflection] = useState("");
  const [alreadyDone, setAlreadyDone] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [doneNow, setDoneNow] = useState(false);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const { data } = await supabase
        .from("sovereign_rituals")
        .select("morning_completed_at, reflection")
        .eq("user_id", status.userId)
        .eq("ritual_date", todayKey())
        .maybeSingle();
      setAlreadyDone(!!data?.morning_completed_at);
      if (data?.reflection) setReflection(data.reflection);
    })();
  }, [status]);

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  async function complete() {
    setSaving(true);
    setError("");
    const now = new Date().toISOString();
    if (status.state !== "ready") return;
    const { error: err } = await supabase
      .from("sovereign_rituals")
      .upsert(
        {
          user_id: status.userId,
          ritual_date: todayKey(),
          morning_completed_at: now,
          reflection: reflection.trim() || null,
        },
        { onConflict: "user_id,ritual_date" }
      );
    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    setDoneNow(true);
    setSaving(false);
  }

  const stage = STAGES[idx];
  const last = idx === STAGES.length - 1;

  if (doneNow || (alreadyDone && idx === 0 && !reflection)) {
    // skip showing nothing — but if alreadyDone show summary instead of forcing replay
  }

  // If user already finished today, show completion view (with option to revisit).
  if ((alreadyDone && !doneNow && idx === 0) || doneNow) {
    return (
      <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <CheckCircle2 className="mx-auto" size={52} color={C.gold} />
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The day is consecrated
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light italic" style={{ fontFamily: fonts.display }}>
            Morning ritual <span style={{ color: C.gold }}>complete.</span>
          </h1>
          {reflection && (
            <div
              className="mt-10 p-6 text-left"
              style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}
            >
              <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
                Your line for today
              </p>
              <p className="mt-3 text-lg font-light italic leading-relaxed" style={{ fontFamily: fonts.display }}>
                "{reflection}"
              </p>
            </div>
          )}
          {/* 4f — Daily reflection prompt after ritual */}
          <div
            className="mt-6 p-6 text-left"
            style={{ background: C.card, border: `1px solid rgba(232,130,26,0.25)` }}
          >
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: C.amber }}>
              Carry this with you
            </p>
            <p
              className="mt-3 text-lg font-light italic leading-relaxed"
              style={{ fontFamily: fonts.display, color: C.text }}
            >
              {DAILY_REFLECTION_PROMPT}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/sovereign/portal/dashboard"
              className="inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Back to Portal
            </Link>
            <button
              onClick={() => { setAlreadyDone(false); setDoneNow(false); setIdx(0); }}
              className="inline-block border px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              Revisit the Ritual
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <div className="mx-auto max-w-2xl px-6 py-12">
        <button
          onClick={() => navigate({ to: "/sovereign/portal/dashboard" })}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em]"
          style={{ color: C.muted }}
        >
          <ArrowLeft size={14} /> Back to portal
        </button>

        {/* Progress dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className="h-1 w-10 transition-all"
              style={{ background: i <= idx ? C.gold : "rgba(201,168,76,0.2)" }}
            />
          ))}
        </div>

        <section className="mt-10">
          {/* 4d — Time-Machine morning opener */}
          <p
            className="mb-6 text-base italic font-light leading-relaxed"
            style={{ fontFamily: fonts.display, color: C.gold, opacity: 0.85 }}
          >
            {pickMorningOpener()}
          </p>
          <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            {stage.label}
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-light italic leading-tight" style={{ fontFamily: fonts.display }}>
            {stage.title}
          </h1>
          <p className="mt-8 text-lg font-light leading-relaxed" style={{ color: C.muted }}>
            {stage.body}
          </p>

          {stage.key === "reflect" && (
            <textarea
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="One honest line."
              className="mt-8 w-full px-4 py-3 text-base"
              style={{ background: C.card, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
            />
          )}

          {error && <p className="mt-4 text-sm" style={{ color: "#E8504C" }}>{error}</p>}

          <div className="mt-12 flex items-center gap-3">
            {idx > 0 && (
              <button
                onClick={() => setIdx((i) => i - 1)}
                className="px-6 py-4 text-[11px] uppercase tracking-[0.22em] border"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                Back
              </button>
            )}
            {!last ? (
              <button
                onClick={() => setIdx((i) => i + 1)}
                className="flex-1 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: C.gold, color: C.bg }}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={complete}
                disabled={saving}
                className="flex-1 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
                style={{ background: C.gold, color: C.bg }}
              >
                {saving ? "Sealing…" : "Seal the Ritual"}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
