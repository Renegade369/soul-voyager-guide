import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, Check, Circle, Headphones } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { getModule, SOVEREIGN_MODULES } from "@/lib/sovereign-curriculum";
import { MODULE_LOSS_FRAMES, moduleEndPrompt } from "@/lib/time-machine-frames";

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
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const { data } = await supabase
        .from("sovereign_module_progress")
        .select("lesson_slug")
        .eq("user_id", status.userId)
        .eq("module_slug", slug);
      setDoneLessons(new Set((data ?? []).map((r: any) => r.lesson_slug)));
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

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  const idx = SOVEREIGN_MODULES.findIndex((m) => m.slug === slug);
  const prev = SOVEREIGN_MODULES[idx - 1];
  const next = SOVEREIGN_MODULES[idx + 1];

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
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Module 0{mod.number}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            {mod.title}
          </h1>
          <p className="mt-2 text-lg italic" style={{ color: C.gold, fontFamily: fonts.display }}>
            {mod.subtitle}
          </p>
          <p className="mt-4 text-base font-light max-w-2xl" style={{ color: C.muted }}>
            {mod.description}
          </p>
          {/* 4e — Time-Machine loss frame */}
          {MODULE_LOSS_FRAMES[mod.number] && (
            <p
              className="mt-6 max-w-2xl text-lg italic font-light leading-relaxed"
              style={{ fontFamily: fonts.display, color: C.gold, opacity: 0.9 }}
            >
              {MODULE_LOSS_FRAMES[mod.number]}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 space-y-3">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLesson(lesson.slug);
                  }}
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
                    <span>Lesson 0{i + 1}</span>
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

        <div className="pt-8 mt-8 border-t" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          {/* 4f — Module-end reflection prompt (when all lessons complete) */}
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
          <Link
            to="/sovereign/portal/audio"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] mb-8"
            style={{ color: C.glow }}
          >
            <Headphones size={14} /> Companion Audio
          </Link>
          <div className="flex flex-wrap justify-between gap-4">
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
    </div>
  );
}
