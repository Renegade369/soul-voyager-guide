import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect, useMemo, useState } from "react";
import { Loader2, ArrowLeft, Check, Circle, Headphones, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import {
  getModule,
  SOVEREIGN_MODULES,
  moduleIsFullyComplete,
  type Milestone,
} from "@/lib/sovereign-curriculum";
import { MODULE_LOSS_FRAMES, moduleEndPrompt } from "@/lib/time-machine-frames";
import { MilestoneCelebrationModal } from "@/components/sovereign/MilestoneCelebrationModal";
import { sendTransactionalEmail } from "@/lib/email/send";

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

export const Route = createFileRoute("/sovereign/portal/modules/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${getModule(params.slug)?.title ?? "Module"} — Sovereign Portal` }],
  }),
  component: ModuleDetailPage,
  notFoundComponent: () => (
    <div style={{ background: C.bg, color: C.text, minHeight: "80vh" }} className="flex flex-col items-center justify-center gap-4 p-8">
      <p style={{ fontFamily: fonts.display }} className="text-2xl">Module not found.</p>
      <Link to="/sovereign/portal/modules" style={{ color: C.gold }}>← Return to modules</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div style={{ background: C.bg, color: C.text, minHeight: "80vh" }} className="flex items-center justify-center p-8">
      <p>{error.message}</p>
    </div>
  ),
  beforeLoad: ({ params }) => {
    if (!getModule(params.slug)) throw notFound();
  },
});

function ModuleDetailPage() {
  const { slug } = useParams({ from: "/sovereign/portal/modules/$slug" });
  const mod = getModule(slug)!;
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [doneLessons, setDoneLessons] = useState<Set<string>>(new Set());
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [earnedMilestones, setEarnedMilestones] = useState<Set<string>>(new Set());
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [savingResponse, setSavingResponse] = useState<string | null>(null);
  const [completingModule, setCompletingModule] = useState(false);
  const [celebrate, setCelebrate] = useState<Milestone | null>(null);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const [p, r, m] = await Promise.all([
        supabase
          .from("sovereign_module_progress")
          .select("lesson_slug")
          .eq("user_id", status.userId)
          .eq("module_slug", slug),
        supabase
          .from("sovereign_module_responses")
          .select("exercise_id, response_text")
          .eq("user_id", status.userId)
          .eq("module_slug", slug),
        supabase
          .from("sovereign_milestones")
          .select("milestone")
          .eq("user_id", status.userId),
      ]);
      setDoneLessons(new Set((p.data ?? []).map((x: any) => x.lesson_slug)));
      const respMap: Record<string, string> = {};
      (r.data ?? []).forEach((x: any) => { respMap[x.exercise_id] = x.response_text ?? ""; });
      setResponses(respMap);
      setEarnedMilestones(new Set((m.data ?? []).map((x: any) => x.milestone)));

      // Record this module as unlocked the first time it's viewed.
      await supabase.from("sovereign_module_unlocks").upsert(
        { user_id: status.userId, module_slug: slug },
        { onConflict: "user_id,module_slug", ignoreDuplicates: true }
      );
    })();
  }, [status, slug]);

  async function toggleLesson(lessonSlug: string) {
    if (status.state !== "ready") return;
    setSaving(lessonSlug);
    if (doneLessons.has(lessonSlug)) {
      await supabase
        .from("sovereign_module_progress")
        .delete()
        .eq("user_id", status.userId)
        .eq("module_slug", slug)
        .eq("lesson_slug", lessonSlug);
      const next = new Set(doneLessons);
      next.delete(lessonSlug);
      setDoneLessons(next);
    } else {
      await supabase.from("sovereign_module_progress").upsert(
        {
          user_id: status.userId,
          module_slug: slug,
          lesson_slug: lessonSlug,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,module_slug,lesson_slug" }
      );
      setDoneLessons(new Set([...doneLessons, lessonSlug]));
    }
    setSaving(null);
  }

  async function saveResponse(exerciseId: string, text: string) {
    if (status.state !== "ready") return;
    setSavingResponse(exerciseId);
    await supabase.from("sovereign_module_responses").upsert(
      {
        user_id: status.userId,
        module_slug: slug,
        exercise_id: exerciseId,
        response_text: text,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_slug,exercise_id" }
    );
    setSavingResponse(null);
  }

  const idx = SOVEREIGN_MODULES.findIndex((m) => m.slug === slug);
  const prev = SOVEREIGN_MODULES[idx - 1];
  const next = SOVEREIGN_MODULES[idx + 1];

  const fullyComplete = useMemo(
    () => moduleIsFullyComplete(mod, doneLessons, new Set(Object.keys(responses).filter((k) => (responses[k] ?? "").trim().length > 0))),
    [mod, doneLessons, responses]
  );

  async function completeModule() {
    if (status.state !== "ready") return;
    if (!mod.milestoneOnComplete) {
      // No milestone — just route forward.
      if (next) window.location.href = `/sovereign/portal/modules/${next.slug}`;
      return;
    }
    if (earnedMilestones.has(mod.milestoneOnComplete)) {
      setCelebrate(mod.milestoneOnComplete);
      return;
    }
    setCompletingModule(true);
    const { error } = await supabase.from("sovereign_milestones").upsert(
      {
        user_id: status.userId,
        milestone: mod.milestoneOnComplete,
        module_slug: mod.slug,
      },
      { onConflict: "user_id,milestone", ignoreDuplicates: true }
    );
    if (!error) {
      setEarnedMilestones(new Set([...earnedMilestones, mod.milestoneOnComplete]));
      setCelebrate(mod.milestoneOnComplete);
      // Fire the milestone email (best-effort; ignore failures so the UX doesn't block).
      try {
        const email = (status as any).email ?? (await supabase.auth.getUser()).data.user?.email;
        if (email) {
          await sendTransactionalEmail({
            templateName: "sovereign-milestone",
            recipientEmail: email,
            idempotencyKey: `milestone-${status.userId}-${mod.milestoneOnComplete}`,
            templateData: {
              milestone: mod.milestoneOnComplete,
              moduleTitle: `Module 0${mod.number} — ${mod.title}`,
              nextHref: next
                ? `https://soul-true.com/sovereign/portal/modules/${next.slug}`
                : "https://soul-true.com/sovereign/portal/dashboard",
              nextLabel: next ? `Continue to ${next.title}` : "Return to your dashboard",
            },
          });
        }
      } catch (e) {
        console.warn("Milestone email failed", e);
      }
    }
    setCompletingModule(false);
  }

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <section className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/sovereign/portal/modules"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> All Modules
          </Link>

          {/* 4e — Loss-frame pull-quote (kept from Time-Machine build) */}
          {MODULE_LOSS_FRAMES[mod.number] && (
            <p
              className="mt-8 max-w-2xl text-lg italic font-light leading-relaxed"
              style={{ fontFamily: fonts.display, color: C.gold, opacity: 0.9 }}
            >
              {MODULE_LOSS_FRAMES[mod.number]}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <span
              className="px-3 py-1 text-[10px] uppercase tracking-[0.32em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Phase · {mod.phase}
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
              {mod.weeks}
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
              · Module 0{mod.number}
            </span>
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            {mod.title}
          </h1>
          <p className="mt-2 text-lg italic" style={{ color: C.gold, fontFamily: fonts.display }}>
            {mod.subtitle}
          </p>
          <p className="mt-6 text-base font-light max-w-2xl leading-relaxed" style={{ color: C.muted }}>
            {mod.promise}
          </p>
        </div>
      </section>

      {/* LESSONS */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2
          className="text-[11px] uppercase tracking-[0.32em] mb-6"
          style={{ color: C.gold }}
        >
          The Lessons
        </h2>
        <div className="space-y-3">
          {mod.lessons.map((lesson, i) => {
            const done = doneLessons.has(lesson.slug);
            const open = activeLesson === lesson.slug;
            return (
              <div
                key={lesson.slug}
                style={{
                  background: C.card,
                  border: `1px solid rgba(201,168,76,${done ? 0.4 : 0.2})`,
                }}
              >
                <button
                  onClick={() => setActiveLesson(open ? null : lesson.slug)}
                  className="w-full text-left p-6 flex items-start gap-4"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLesson(lesson.slug); }}
                    disabled={saving === lesson.slug}
                    className="mt-1 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border"
                    style={{
                      borderColor: done ? C.gold : "rgba(245,240,232,0.3)",
                      background: done ? C.gold : "transparent",
                    }}
                    aria-label={done ? "Mark incomplete" : "Mark complete"}
                  >
                    {saving === lesson.slug ? (
                      <Loader2 size={12} className="animate-spin" color={done ? C.bg : C.muted} />
                    ) : done ? (
                      <Check size={14} color={C.bg} strokeWidth={3} />
                    ) : (
                      <Circle size={6} color={C.dim} fill="transparent" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                      <span>Lesson {lesson.slug}</span>
                      <span>·</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <h3 className="mt-1 text-xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
                      {lesson.title}
                    </h3>
                    <p className="mt-1 text-sm font-light" style={{ color: C.muted }}>
                      {lesson.summary}
                    </p>
                  </div>
                </button>
                {open && (
                  <div className="px-6 pb-6 pl-16">
                    <div
                      className="text-base font-light leading-relaxed whitespace-pre-line"
                      style={{ color: C.text }}
                    >
                      {lesson.body}
                    </div>
                    {!done && (
                      <button
                        onClick={() => toggleLesson(lesson.slug)}
                        disabled={saving === lesson.slug}
                        className="mt-6 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                        style={{ background: C.gold, color: C.bg }}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* EXERCISES */}
      <div className="mx-auto max-w-4xl px-6 pb-12">
        <h2
          className="text-[11px] uppercase tracking-[0.32em] mb-6"
          style={{ color: C.gold }}
        >
          The Exercises
        </h2>
        <div className="space-y-6">
          {mod.exercises.map((ex) => {
            const value = responses[ex.id] ?? "";
            return (
              <div
                key={ex.id}
                className="p-6"
                style={{ background: C.card, border: `1px solid rgba(201,168,76,0.2)` }}
              >
                <div className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                  <span>Exercise {ex.number}</span>
                  <span>·</span>
                  <span>{ex.time}</span>
                </div>
                <h3 className="mt-1 text-2xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
                  {ex.title}
                </h3>
                <p className="mt-3 text-base font-light leading-relaxed whitespace-pre-line" style={{ color: C.muted }}>
                  {ex.instructions}
                </p>
                <label className="block mt-6">
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                    Your reflection
                  </span>
                  <textarea
                    value={value}
                    onChange={(e) => setResponses({ ...responses, [ex.id]: e.target.value })}
                    onBlur={(e) => saveResponse(ex.id, e.target.value)}
                    rows={5}
                    placeholder="Write what surfaces. Nothing is wrong here."
                    className="mt-2 w-full p-4 text-base font-light leading-relaxed bg-transparent focus:outline-none"
                    style={{
                      color: C.text,
                      border: `1px solid rgba(201,168,76,0.25)`,
                      fontFamily: fonts.body,
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                    {savingResponse === ex.id ? "Saving…" : value.trim() ? "Saved" : ""}
                  </span>
                </label>
                <Link
                  to="/sovereign/reflection"
                  search={{ module: mod.slug, exercise: ex.id }}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: C.glow }}
                >
                  <MessageCircle size={14} /> Talk to the Companion about this
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* COMPANION ROLE */}
      <div className="mx-auto max-w-4xl px-6 pb-12">
        <div
          className="p-6"
          style={{ background: C.card, border: `1px solid rgba(201,168,76,0.2)` }}
        >
          <h2 className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The Companion's Role
          </h2>
          <p
            className="mt-3 text-base italic font-light leading-relaxed"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            {mod.companionRole}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
            Tone: <span style={{ color: C.muted, textTransform: "none", letterSpacing: 0 }}>{mod.companionTone}</span>
          </p>
        </div>
      </div>

      {/* INTEGRATION */}
      <div className="mx-auto max-w-4xl px-6 pb-12">
        <div className="p-6" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.2)` }}>
          <h2 className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Integration with Ritual & Meditations
          </h2>
          <p className="mt-3 text-base font-light leading-relaxed" style={{ color: C.text }}>
            {mod.integration}
          </p>
          <Link
            to="/sovereign/portal/audio"
            className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.glow }}
          >
            <Headphones size={14} /> Companion Audio
          </Link>
        </div>
      </div>

      {/* BRIDGE + COMPLETE */}
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <div className="pt-8 border-t" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          {mod.lessons.every((l) => doneLessons.has(l.slug)) && (
            <div
              className="mb-8 p-6"
              style={{ background: C.card, border: `1px solid rgba(232,130,26,0.3)` }}
            >
              <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: C.glow }}>
                Module Complete · Reflection
              </p>
              <p
                className="mt-3 text-lg italic font-light leading-relaxed"
                style={{ fontFamily: fonts.display, color: C.text }}
              >
                {moduleEndPrompt(mod.title)}
              </p>
            </div>
          )}

          <h2 className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The Bridge
          </h2>
          <p
            className="mt-3 text-lg italic font-light leading-relaxed max-w-2xl"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            {mod.bridge}
          </p>

          <div className="mt-10">
            {fullyComplete ? (
              <button
                onClick={completeModule}
                disabled={completingModule}
                className="px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{
                  background: C.gold,
                  color: C.bg,
                  boxShadow: "0 0 24px rgba(232,130,26,0.5)",
                }}
              >
                {completingModule
                  ? "Sealing…"
                  : mod.milestoneOnComplete
                  ? `Complete Module — Claim "${mod.milestoneOnComplete}"`
                  : "Complete Module"}
              </button>
            ) : (
              <p className="text-sm font-light" style={{ color: C.muted }}>
                Mark each lesson complete and write a reflection on every exercise
                to seal this module.
              </p>
            )}
          </div>

          <div className="mt-12 flex flex-wrap justify-between gap-4">
            {prev ? (
              <Link
                to="/sovereign/portal/modules/$slug"
                params={{ slug: prev.slug }}
                className="text-sm"
                style={{ color: C.muted }}
              >
                ← {prev.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link
                to="/sovereign/portal/modules/$slug"
                params={{ slug: next.slug }}
                className="text-sm"
                style={{ color: C.gold }}
              >
                {next.title} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </div>

      <MilestoneCelebrationModal
        milestone={celebrate ?? ""}
        open={!!celebrate}
        onDismiss={() => setCelebrate(null)}
        nextHref={
          next
            ? `/sovereign/portal/modules/${next.slug}`
            : "/sovereign/portal/dashboard"
        }
        nextLabel={next ? "Continue the work" : "You're sovereign"}
      />
    </div>
  );
}
