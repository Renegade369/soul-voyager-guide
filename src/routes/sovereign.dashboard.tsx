import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home as HomeIcon, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BrandLoader } from "@/components/BrandLoader";
import { LogoMark } from "@/components/LogoMark";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { pickGreeting, streakFrame } from "@/lib/time-machine-frames";
import { computeStreak, type RitualCompletionRow } from "@/lib/sovereign-streak";
import { getOnboardingByEmail } from "@/lib/sovereign-onboarding.functions";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  amber: "#E8821A",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — The Sovereignty Code" }] }),
  component: DashboardPage,
});

function isoToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type ReflectionRow = { module_slug: string | null; exercise_id: string | null; response_text: string | null; created_at: string };

function DashboardPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);
  const navigate = useNavigate();

  const [completions, setCompletions] = useState<RitualCompletionRow[]>([]);
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [reflections, setReflections] = useState<ReflectionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status.state !== "ready") return;
    let cancelled = false;
    (async () => {
      const [comp, refl, onb] = await Promise.all([
        supabase
          .from("sovereign_ritual_completions")
          .select("completed_at, skipped")
          .eq("user_id", status.userId)
          .order("completed_at", { ascending: false })
          .limit(200),
        supabase
          .from("sovereign_module_responses")
          .select("module_slug, exercise_id, response_text, created_at")
          .eq("user_id", status.userId)
          .order("created_at", { ascending: false })
          .limit(3),
        getOnboardingByEmail({ data: { email: status.email } }),
      ]);
      if (cancelled) return;
      setCompletions((comp.data ?? []) as RitualCompletionRow[]);
      setReflections((refl.data ?? []) as ReflectionRow[]);
      if ("onboarding" in onb && onb.onboarding?.wake_time) {
        setWakeTime(String(onb.onboarding.wake_time).slice(0, 5));
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status.state !== "ready" || loading) {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <BrandLoader size={56} />
      </div>
    );
  }

  const { streak, graceUsed, graceResetsInDays } = computeStreak(completions);
  const todayKey = isoToday();
  const completedToday = completions.some((r) => {
    const k = r.completed_at.slice(0, 10);
    return k === todayKey && !r.skipped;
  });

  const now = new Date();
  const [wh, wm] = wakeTime.split(":").map(Number);
  const wake = new Date();
  wake.setHours(wh || 7, wm || 0, 0, 0);
  const beforeWake = now < wake;
  const evening = now.getHours() >= 20;

  let practice: { headline: string; cta: string; to: "/sovereign/ritual" | "/sovereign/portal/modules" | null };
  if (completedToday && evening) {
    practice = { headline: "Your sleep practice is ready.", cta: "Open evening reflection", to: "/sovereign/portal/modules" };
  } else if (completedToday) {
    practice = { headline: "Today's lesson is open.", cta: "Continue the work", to: "/sovereign/portal/modules" };
  } else if (beforeWake) {
    practice = { headline: `Your Morning Ritual unlocks at ${wakeTime}.`, cta: "View today's frame", to: "/sovereign/ritual" };
  } else {
    practice = { headline: "Begin your Morning Ritual.", cta: "Begin →", to: "/sovereign/ritual" };
  }

  const greeting = pickGreeting(Math.max(1, streak));
  const streakLine = streakFrame(streak);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
        {/* Greeting */}
        <p
          className="text-2xl md:text-3xl font-light italic leading-relaxed"
          style={{ fontFamily: fonts.display, color: C.gold }}
        >
          {greeting}
        </p>

        {/* Today's practice — dominant card */}
        <article
          className="relative mt-10 p-8 md:p-10"
          style={{ background: C.card, border: `1px solid ${C.gold}`, boxShadow: "0 0 48px rgba(232,130,26,0.18)" }}
        >
          <LogoMark position="top-right" />
          <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Today's practice
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-light italic leading-tight" style={{ fontFamily: fonts.display }}>
            {practice.headline}
          </h2>
          {practice.to && (
            <Link
              to={practice.to}
              className="mt-8 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              {practice.cta}
            </Link>
          )}
        </article>

        {/* Streak + Module side-by-side on md+ */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Streak
            </p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-6xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>
                {streak}
              </span>
              <span className="text-sm" style={{ color: C.muted }}>of 120</span>
            </div>
            <p className="mt-4 text-sm font-light italic leading-relaxed" style={{ fontFamily: fonts.display, color: C.text }}>
              {streakLine}
            </p>
            {graceUsed && (
              <p className="mt-3 text-xs" style={{ color: C.amber }}>
                Grace day used · resets in {graceResetsInDays}d
              </p>
            )}
          </Card>

          <Card>
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Module
            </p>
            <h3 className="mt-3 text-2xl font-light italic" style={{ fontFamily: fonts.display }}>
              Module 1: Awakening
            </h3>
            <p className="mt-2 text-sm" style={{ color: C.muted }}>
              Seeing the matrix you've been living in.
            </p>
            <Link
              to="/sovereign/portal/modules"
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: C.gold }}
            >
              Continue Module 1 <ArrowRight size={14} />
            </Link>
          </Card>
        </div>

        {/* Companion */}
        <div className="mt-6">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
                  Companion
                </p>
                <h3 className="mt-2 text-xl font-light italic" style={{ fontFamily: fonts.display }}>
                  Talk it through.
                </h3>
                <p className="mt-2 text-sm" style={{ color: C.muted }}>
                  The Companion is here for the in-between moments — questions, doubt, integration.
                </p>
              </div>
              <Link
                to="/sovereign/reflection"
                className="shrink-0 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: C.gold, color: C.bg }}
              >
                Talk to the Companion
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent reflections */}
        {reflections.length > 0 && (
          <div className="mt-6">
            <Card>
              <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
                Recent reflections
              </p>
              <ul className="mt-4 space-y-4">
                {reflections.map((r, i) => (
                  <li key={i} className="border-l-2 pl-4" style={{ borderColor: "rgba(201,168,76,0.4)" }}>
                    {(r.module_slug || r.exercise_id) && (
                      <p className="text-xs uppercase tracking-[0.22em]" style={{ color: C.muted }}>
                        {r.module_slug ?? ""}{r.exercise_id ? ` · ${r.exercise_id}` : ""}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-light italic" style={{ fontFamily: fonts.display, color: C.text }}>
                      {r.response_text ? `"${r.response_text}"` : "—"}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* Tier card */}
        <div className="mt-6">
          <TierCard tier={status.tier} />
        </div>
      </div>

      {/* Sticky mobile bottom bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 md:hidden"
        style={{ background: C.card, borderTop: `1px solid rgba(201,168,76,0.25)` }}
      >
        <BarLink to="/sovereign/dashboard" icon={<HomeIcon size={18} />} label="Home" />
        <BarLink to="/sovereign/portal/modules" icon={<BookOpen size={18} />} label="Modules" />
        <BarLink to="/sovereign/reflection" icon={<MessageCircle size={18} />} label="Companion" />
      </nav>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <article className="relative p-6 md:p-7" style={{ background: C.card, border: `1px solid rgba(201,168,76,0.25)` }}>
      {children}
    </article>
  );
}

function BarLink({ to, icon, label }: { to: "/sovereign/dashboard" | "/sovereign/portal/modules" | "/sovereign/reflection"; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center py-3 text-[10px] uppercase tracking-[0.22em]"
      style={{ color: C.muted }}
      activeProps={{ style: { color: C.gold } }}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
}

function TierCard({ tier }: { tier: "digital" | "complete" }) {
  if (tier === "complete") {
    return (
      <Card>
        <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
          Complete tier
        </p>
        <h3 className="mt-2 text-xl font-light italic" style={{ fontFamily: fonts.display }}>
          Your welcome package is on its way.
        </h3>
        <p className="mt-2 text-sm" style={{ color: C.muted }}>
          We'll email tracking when it ships. In the meantime, your 3 code unlocks are active.
        </p>
      </Card>
    );
  }
  return (
    <Card>
      <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
        Upgrade
      </p>
      <h3 className="mt-2 text-xl font-light italic" style={{ fontFamily: fonts.display }}>
        Get the Complete experience.
      </h3>
      <p className="mt-2 text-sm" style={{ color: C.muted }}>
        Physical welcome package + 3 code unlocks.
      </p>
      <Link
        to="/sovereign"
        className="mt-5 inline-block px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ background: C.gold, color: C.bg }}
      >
        View Complete
      </Link>
    </Card>
  );
}
