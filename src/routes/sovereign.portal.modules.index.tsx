import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { LogoMark } from "@/components/LogoMark";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, BookOpen, Lock, Check, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import {
  SOVEREIGN_MODULES,
  moduleIsFullyComplete,
  MODULE_UNLOCK_FALLBACK_DAYS,
  type Phase,
} from "@/lib/sovereign-curriculum";

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

const PHASE_ORDER: Phase[] = ["Awaken", "Build", "Sovereign"];

export const Route = createFileRoute("/sovereign/portal/modules/")({
  head: () => ({ meta: [{ title: "Modules — Sovereign Portal" }] }),
  component: ModulesIndexPage,
});

function ModulesIndexPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [lessonsByModule, setLessonsByModule] = useState<Record<string, Set<string>>>({});
  const [responsesByModule, setResponsesByModule] = useState<Record<string, Set<string>>>({});
  const [unlockedAt, setUnlockedAt] = useState<Record<string, Date>>({});
  const [milestones, setMilestones] = useState<Record<string, string>>({}); // module_slug -> milestone
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const [p, r, u, m] = await Promise.all([
        supabase.from("sovereign_module_progress").select("module_slug, lesson_slug").eq("user_id", status.userId),
        supabase.from("sovereign_module_responses").select("module_slug, exercise_id, response_text").eq("user_id", status.userId),
        supabase.from("sovereign_module_unlocks").select("module_slug, unlocked_at").eq("user_id", status.userId),
        supabase.from("sovereign_milestones").select("milestone, module_slug").eq("user_id", status.userId),
      ]);
      const lm: Record<string, Set<string>> = {};
      (p.data ?? []).forEach((x: any) => {
        if (!lm[x.module_slug]) lm[x.module_slug] = new Set();
        lm[x.module_slug].add(x.lesson_slug);
      });
      const rm: Record<string, Set<string>> = {};
      (r.data ?? []).forEach((x: any) => {
        if ((x.response_text ?? "").trim().length === 0) return;
        if (!rm[x.module_slug]) rm[x.module_slug] = new Set();
        rm[x.module_slug].add(x.exercise_id);
      });
      const um: Record<string, Date> = {};
      (u.data ?? []).forEach((x: any) => { um[x.module_slug] = new Date(x.unlocked_at); });
      const mm: Record<string, string> = {};
      (m.data ?? []).forEach((x: any) => { if (x.module_slug) mm[x.module_slug] = x.milestone; });
      setLessonsByModule(lm);
      setResponsesByModule(rm);
      setUnlockedAt(um);
      setMilestones(mm);
      setLoaded(true);
    })();
  }, [status]);

  // Compute per-module status with progressive unlock.
  const moduleState = useMemo(() => {
    const out: Record<string, { state: "locked" | "unlocked" | "in-progress" | "complete"; daysUntil: number | null }> = {};
    let prevComplete = true; // module 1 always unlocked
    let prevUnlockedDate: Date | null = new Date(0);
    SOVEREIGN_MODULES.forEach((m) => {
      const done = lessonsByModule[m.slug] ?? new Set();
      const resp = responsesByModule[m.slug] ?? new Set();
      const complete = moduleIsFullyComplete(m, done, resp);
      const inProgress = done.size > 0 || resp.size > 0;

      let canAccess = m.number === 1 || prevComplete;
      let daysUntil: number | null = null;
      if (!canAccess && prevUnlockedDate) {
        const elapsed = Math.floor((Date.now() - prevUnlockedDate.getTime()) / 86_400_000);
        if (elapsed >= MODULE_UNLOCK_FALLBACK_DAYS) {
          canAccess = true;
        } else {
          daysUntil = MODULE_UNLOCK_FALLBACK_DAYS - elapsed;
        }
      }

      if (!canAccess) {
        out[m.slug] = { state: "locked", daysUntil };
      } else if (complete) {
        out[m.slug] = { state: "complete", daysUntil: null };
      } else if (inProgress) {
        out[m.slug] = { state: "in-progress", daysUntil: null };
      } else {
        out[m.slug] = { state: "unlocked", daysUntil: null };
      }

      prevComplete = complete;
      prevUnlockedDate = unlockedAt[m.slug] ?? prevUnlockedDate;
    });
    return out;
  }, [lessonsByModule, responsesByModule, unlockedAt]);

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
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link to="/sovereign/portal/dashboard" className="text-[11px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>
            ← Dashboard
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            The Curriculum · 12 Weeks
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Six modules. <em style={{ color: C.gold }}>Three phases.</em>
          </h1>
          <p className="mt-3 text-base font-light max-w-2xl" style={{ color: C.muted }}>
            Awaken to the cage. Build the body of work. Walk free. Each module unlocks
            when the previous one is complete, or after 14 days — whichever comes first.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12 space-y-12">
        {PHASE_ORDER.map((phase) => {
          const phaseMods = SOVEREIGN_MODULES.filter((m) => m.phase === phase);
          if (phaseMods.length === 0) return null;
          return (
            <div key={phase}>
              <p className="text-[11px] uppercase tracking-[0.32em] mb-4" style={{ color: C.glow }}>
                Phase · {phase}
              </p>
              <div className="space-y-4">
                {phaseMods.map((m) => {
                  const s = moduleState[m.slug] ?? { state: "locked" as const, daysUntil: null };
                  const done = (lessonsByModule[m.slug] ?? new Set()).size;
                  const total = m.lessons.length;
                  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                  const milestone = milestones[m.slug];
                  const locked = s.state === "locked";
                  const complete = s.state === "complete";
                  const inProgress = s.state === "in-progress";

                  const card = (
                    <div
                      className="block p-6 transition-opacity"
                      style={{
                        background: C.card,
                        border: `1px solid ${
                          complete
                            ? C.gold
                            : inProgress
                            ? "rgba(232,130,26,0.45)"
                            : locked
                            ? "rgba(201,168,76,0.12)"
                            : "rgba(201,168,76,0.25)"
                        }`,
                        opacity: locked ? 0.55 : 1,
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
                              Module 0{m.number}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                              {m.weeks}
                            </span>
                            {loaded && complete && (
                              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                                <Check size={12} /> Complete
                              </span>
                            )}
                            {loaded && inProgress && (
                              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.glow }}>
                                In Progress
                              </span>
                            )}
                            {loaded && locked && (
                              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                                <Lock size={12} />
                                {s.daysUntil !== null
                                  ? `Unlocks in ${s.daysUntil} day${s.daysUntil === 1 ? "" : "s"}`
                                  : "Locked"}
                              </span>
                            )}
                            {milestone && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em]" style={{ background: C.gold, color: C.bg }}>
                                <Award size={11} /> {milestone}
                              </span>
                            )}
                          </div>
                          <h2 className="mt-2 text-2xl md:text-3xl font-light" style={{ fontFamily: fonts.display }}>
                            {m.title}
                          </h2>
                          <p className="mt-1 text-sm italic" style={{ color: C.gold, fontFamily: fonts.display }}>
                            {m.subtitle}
                          </p>
                          <p className="mt-3 text-sm font-light" style={{ color: C.muted }}>
                            {m.description}
                          </p>
                          {loaded && total > 0 && !locked && (
                            <div className="mt-4 h-[2px] w-full" style={{ background: "rgba(201,168,76,0.15)" }}>
                              <div className="h-full" style={{ width: `${pct}%`, background: C.gold }} />
                            </div>
                          )}
                        </div>
                        {!locked && <ChevronRight size={20} color={C.gold} className="mt-2 flex-shrink-0" />}
                      </div>
                    </div>
                  );

                  return locked ? (
                    <div key={m.slug}>{card}</div>
                  ) : (
                    <Link
                      key={m.slug}
                      to="/sovereign/portal/modules/$slug"
                      params={{ slug: m.slug }}
                      className="block hover:opacity-90"
                    >
                      {card}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="border-t mt-12" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-5xl px-6 py-8 text-xs flex items-center gap-2" style={{ color: C.muted }}>
          <BookOpen size={14} color={C.gold} />
          <span>The Sovereignty Code · Let's Go Deeper.</span>
        </div>
      </footer>
    </div>
  );
}
