import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, ArrowLeft, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  amber: "#E8821A",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/portal/evening-ritual")({
  head: () => ({ meta: [{ title: "Evening Reflection — The Sovereignty Code" }] }),
  component: EveningRitualPage,
});

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

type Stage = "release" | "review" | "gratitude" | "seal";

const STAGES: { key: Stage; label: string; title: string; body: string; prompt?: string }[] = [
  {
    key: "release",
    label: "Stage 1 · Release",
    title: "Lay down the day.",
    body:
      "Sit. Soften the jaw. Soften the shoulders. Take three long exhales — longer than the inhales. With each exhale, name one thing you are setting down. It is finished. It does not need to follow you into sleep.",
  },
  {
    key: "review",
    label: "Stage 2 · Review",
    title: "Honest witness.",
    body:
      "Look back at the day without judgment. Where did you move from sovereignty? Where did you slip? You are not collecting evidence against yourself. You are gathering information.",
    prompt: "Where did I move as sovereign today? Where did I slip?",
  },
  {
    key: "gratitude",
    label: "Stage 3 · Gratitude",
    title: "Three blessings.",
    body:
      "Name three things — small or large — that you receive from this day. The body that carried you. A face. A meal. A breath. Gratitude is the frequency that re-tunes the field.",
    prompt: "Three blessings from today.",
  },
  {
    key: "seal",
    label: "Stage 4 · Seal",
    title: "Release into rest.",
    body:
      "Place your hand on your heart. Whisper: \"The day is done. I release what was. I open to what is becoming. I rest as a sovereign being.\" Let sleep take you.",
  },
];

function EveningRitualPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);
  const navigate = useNavigate();

  const [idx, setIdx] = useState(0);
  const [reflection, setReflection] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [alreadyDone, setAlreadyDone] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [doneNow, setDoneNow] = useState(false);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const { data } = await supabase
        .from("sovereign_rituals")
        .select("evening_completed_at, evening_reflection")
        .eq("user_id", status.userId)
        .eq("ritual_date", todayKey())
        .maybeSingle();
      setAlreadyDone(!!data?.evening_completed_at);
      if (data?.evening_reflection) setReflection(data.evening_reflection);
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
    if (status.state !== "ready") return;
    const combined = [
      reflection.trim() ? `Review:\n${reflection.trim()}` : "",
      gratitude.trim() ? `Gratitude:\n${gratitude.trim()}` : "",
    ].filter(Boolean).join("\n\n");
    const { error: err } = await supabase
      .from("sovereign_rituals")
      .upsert(
        {
          user_id: status.userId,
          ritual_date: todayKey(),
          evening_completed_at: new Date().toISOString(),
          evening_reflection: combined || null,
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

  if ((alreadyDone && !doneNow && idx === 0) || doneNow) {
    return (
      <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <CheckCircle2 className="mx-auto" size={52} color={C.gold} />
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Rest as sovereign
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light italic" style={{ fontFamily: fonts.display }}>
            Evening reflection <span style={{ color: C.gold }}>complete.</span>
          </h1>
          {reflection && (
            <div className="mt-10 p-6 text-left" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}>
              <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
                Your reflection
              </p>
              <p className="mt-3 text-base font-light italic leading-relaxed whitespace-pre-line" style={{ fontFamily: fonts.display }}>
                {reflection}
              </p>
            </div>
          )}
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
              Revisit Reflection
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

        <div className="mt-8 flex items-center justify-center">
          <Moon size={28} color={C.amber} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className="h-1 w-12 transition-all"
              style={{ background: i <= idx ? C.gold : "rgba(201,168,76,0.2)" }}
            />
          ))}
        </div>

        <section className="mt-10">
          <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            {stage.label}
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-light italic leading-tight" style={{ fontFamily: fonts.display }}>
            {stage.title}
          </h1>
          <p className="mt-8 text-lg font-light leading-relaxed" style={{ color: C.muted }}>
            {stage.body}
          </p>

          {stage.key === "review" && (
            <textarea
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={stage.prompt}
              className="mt-8 w-full px-4 py-3 text-base"
              style={{ background: C.card, color: C.text, border: `1px solid rgba(201,168,76,0.3)` }}
            />
          )}
          {stage.key === "gratitude" && (
            <textarea
              rows={4}
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder={stage.prompt}
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
                {saving ? "Sealing…" : "Seal the Reflection"}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
