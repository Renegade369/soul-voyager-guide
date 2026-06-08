import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { getModule } from "@/lib/sovereign-curriculum";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  glow: "#E8821A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.4)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

type Search = {
  module?: string;
  exercise?: string;
};

export const Route = createFileRoute("/sovereign/reflection")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    module: typeof search.module === "string" ? search.module : undefined,
    exercise: typeof search.exercise === "string" ? search.exercise : undefined,
  }),
  head: () => ({ meta: [{ title: "The Companion — Sovereign Portal" }] }),
  component: ReflectionPage,
});

function ReflectionPage() {
  const { module: moduleSlug, exercise: exerciseId } = Route.useSearch();
  const mod = useMemo(() => (moduleSlug ? getModule(moduleSlug) : undefined), [moduleSlug]);
  const exercise = useMemo(
    () => (mod && exerciseId ? mod.exercises.find((e) => e.id === exerciseId) : undefined),
    [mod, exerciseId]
  );

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <section className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Link
            to="/sovereign/portal/modules/$slug"
            params={{ slug: moduleSlug ?? "awakening" }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> Back to module
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The Companion
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Let's sit with this.
          </h1>
          {mod && (
            <p className="mt-3 italic" style={{ color: C.muted, fontFamily: fonts.display }}>
              Tone for {mod.title}: <span style={{ color: C.gold }}>{mod.companionTone}</span>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-10 space-y-8">
        {exercise && (
          <div
            className="p-6"
            style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}
          >
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: C.glow }}>
              Exercise context loaded
            </p>
            <h2
              className="mt-2 text-2xl font-light"
              style={{ fontFamily: fonts.display, color: C.text }}
            >
              {exercise.title}
            </h2>
            <p className="mt-1 text-xs uppercase tracking-[0.22em]" style={{ color: C.dim }}>
              {exercise.time}
            </p>
            <p className="mt-4 text-base font-light whitespace-pre-line" style={{ color: C.muted }}>
              {exercise.instructions}
            </p>
          </div>
        )}

        <div
          className="p-6"
          style={{ background: C.card, border: `1px solid rgba(232,130,26,0.25)` }}
        >
          <p className="text-base font-light leading-relaxed" style={{ color: C.text }}>
            The AI Reflection Companion is the space where the work lands. Bring
            what's alive — the resistance, the recognition, the bit you don't
            want to look at. The Companion holds it in the tone of this module
            and reflects back, one question at a time.
          </p>
          <p
            className="mt-4 text-sm italic"
            style={{ color: C.muted, fontFamily: fonts.display }}
          >
            [Chat interface — wire to the existing Companion chat surface when
            the conversational endpoint is added.]
          </p>
        </div>

        <p className="text-center text-lg italic" style={{ fontFamily: fonts.display, color: C.gold }}>
          Let's Go Deeper.
        </p>
      </div>
    </div>
  );
}
