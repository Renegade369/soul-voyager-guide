import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Sunrise, Moon, BookOpen, Sparkles, Users, Headphones } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";
import { SOVEREIGN_MODULES } from "@/lib/sovereign-curriculum";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  amber: "#E8821A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  dim: "rgba(245,240,232,0.4)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/portal/dashboard")({
  head: () => ({ meta: [{ title: "Sovereign Portal — Dashboard" }] }),
  component: DashboardPage,
});

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function DashboardPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [ritualDone, setRitualDone] = useState<boolean | null>(null);
  const [eveningDone, setEveningDone] = useState<boolean | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [intentions, setIntentions] = useState<string[]>([]);

  useEffect(() => {
    if (status.state !== "ready") return;
    const userId = status.userId;
    (async () => {
      const today = todayKey();
      const { data: ritualRow } = await supabase
        .from("sovereign_rituals")
        .select("morning_completed_at, evening_completed_at")
        .eq("user_id", userId)
        .eq("ritual_date", today)
        .maybeSingle();
      setRitualDone(!!ritualRow?.morning_completed_at);
      setEveningDone(!!ritualRow?.evening_completed_at);

      // Quick streak: count consecutive past days with morning_completed_at, ending today/yesterday.
      const { data: recent } = await supabase
        .from("sovereign_rituals")
        .select("ritual_date, morning_completed_at")
        .eq("user_id", userId)
        .order("ritual_date", { ascending: false })
        .limit(60);
      if (recent) {
        let s = 0;
        let cursor = new Date();
        for (let i = 0; i < 60; i++) {
          const key = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, "0")}-${String(cursor.getUTCDate()).padStart(2, "0")}`;
          const row = recent.find((r: any) => r.ritual_date === key);
          if (row?.morning_completed_at) {
            s++;
            cursor.setUTCDate(cursor.getUTCDate() - 1);
          } else if (i === 0 && !row) {
            // today not done yet — don't break streak immediately
            cursor.setUTCDate(cursor.getUTCDate() - 1);
          } else {
            break;
          }
        }
        setStreak(s);
      }

      const { data: onboarding } = await supabase
        .from("sovereign_onboarding")
        .select("intention_one, intention_two, intention_three")
        .eq("user_id", userId)
        .maybeSingle();
      if (onboarding) {
        setIntentions(
          [onboarding.intention_one, onboarding.intention_two, onboarding.intention_three].filter(
            (v): v is string => !!v
          )
        );
      }
    })();
  }, [status]);

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} color={C.gold} />
      </div>
    );
  }

  const { email, tier } = status;
  const isComplete = tier === "complete";

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      {/* Header */}
      <section className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Sovereign Portal
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Welcome back, <em style={{ color: C.gold }}>initiate</em>.
          </h1>
          <p className="mt-2 text-sm" style={{ color: C.muted }}>
            {email} · <span style={{ textTransform: "capitalize" }}>{tier}</span> tier
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        {/* Today panel */}
        <div className="md:col-span-2 space-y-6">
          <Panel>
            <PanelHeading icon={<Sunrise size={18} color={C.gold} />} title="Today's Morning Ritual" />
            {ritualDone === null ? (
              <Loader2 className="animate-spin mt-4" size={20} color={C.gold} />
            ) : ritualDone ? (
              <>
                <p className="mt-3 text-base font-light italic" style={{ color: C.text, fontFamily: fonts.display }}>
                  Completed. The day is consecrated.
                </p>
                <p className="mt-2 text-sm" style={{ color: C.muted }}>
                  Return this evening for your reflection.
                </p>
                <Link
                  to="/sovereign/portal/morning-ritual"
                  className="mt-6 inline-block border px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: C.gold, color: C.gold }}
                >
                  Revisit Today's Ritual
                </Link>
              </>
            ) : (
              <>
                <p className="mt-3 text-base font-light leading-relaxed" style={{ color: C.muted }}>
                  Seven minutes. Breath, intention, and a single sacred prompt. Begin your day with
                  the work.
                </p>
                <Link
                  to="/sovereign/portal/morning-ritual"
                  className="mt-6 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ background: C.gold, color: C.bg }}
                >
                  Begin Morning Ritual
                </Link>
              </>
            )}
          </Panel>

          <Panel>
            <PanelHeading icon={<BookOpen size={18} color={C.gold} />} title="The Curriculum" />
            <p className="mt-3 text-sm" style={{ color: C.muted }}>
              Six modules. Six layers. Self-paced.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SOVEREIGN_MODULES.map((m) => (
                <Link
                  key={m.slug}
                  to="/sovereign/portal/modules/$slug"
                  params={{ slug: m.slug }}
                  className="p-4 text-sm font-light transition-opacity hover:opacity-80 block"
                  style={{ background: C.bg, border: `1px solid rgba(201,168,76,0.2)` }}
                >
                  <span style={{ color: C.gold }}>0{m.number}</span>
                  <p className="mt-1" style={{ color: C.text, fontFamily: fonts.display, fontSize: "1.05rem" }}>{m.title}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
                    {m.lessons.length} lessons →
                  </p>
                </Link>
              ))}
            </div>
            <Link
              to="/sovereign/portal/modules"
              className="mt-6 inline-block border px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              All Modules
            </Link>
          </Panel>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Panel>
            <PanelHeading icon={<Sparkles size={18} color={C.gold} />} title="Your Streak" />
            <p className="mt-3 text-5xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
              {streak}
            </p>
            <p className="text-xs uppercase tracking-[0.22em]" style={{ color: C.muted }}>
              {streak === 1 ? "Day" : "Days"} of practice
            </p>
          </Panel>

          <Panel>
            <PanelHeading title="Your Intentions" />
            {intentions.length === 0 ? (
              <p className="mt-3 text-sm" style={{ color: C.muted }}>None set yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {intentions.map((it, i) => (
                  <li key={i} className="flex gap-2 text-sm font-light" style={{ color: C.text }}>
                    <span style={{ color: C.gold }}>✦</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel icon={<Headphones size={18} color={C.gold} />}>
            <PanelHeading title="Audio Transmissions" />
            <p className="mt-3 text-sm" style={{ color: C.muted }}>
              {isComplete
                ? "Guided practices and transmissions from William."
                : "Preview the library — full access on the Complete tier."}
            </p>
            <Link
              to="/sovereign/portal/audio"
              className="mt-4 inline-block border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              Open Library
            </Link>
          </Panel>

          <Panel icon={<Moon size={18} color={C.amber} />}>
            <PanelHeading title="Evening Reflection" />
            {eveningDone === null ? (
              <Loader2 className="animate-spin mt-3" size={18} color={C.gold} />
            ) : eveningDone ? (
              <p className="mt-3 text-sm italic" style={{ color: C.muted, fontFamily: fonts.display }}>
                Sealed for the night. Rest well.
              </p>
            ) : (
              <p className="mt-3 text-sm" style={{ color: C.muted }}>
                Four stages. Release the day, then enter sleep as sovereign.
              </p>
            )}
            <Link
              to="/sovereign/portal/evening-ritual"
              className="mt-4 inline-block border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.amber, color: C.amber }}
            >
              {eveningDone ? "Revisit Reflection" : "Begin Evening Ritual"}
            </Link>
          </Panel>

          <Panel icon={<Users size={18} color={C.gold} />}>
            <PanelHeading title="The Council" />
            <p className="mt-3 text-sm" style={{ color: C.muted }}>
              Read the council. {isComplete ? "Share what is alive in your practice." : "Posting on Complete tier."}
            </p>
            <Link
              to="/sovereign/portal/community"
              className="mt-4 inline-block border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              Enter Council
            </Link>
          </Panel>

          <Panel icon={<Users size={18} color={C.gold} />}>
            <PanelHeading title="Live Calls" />
            <p className="mt-3 text-sm" style={{ color: C.muted }}>
              Monthly gatherings with William. {isComplete ? "" : "Complete tier."}
            </p>
            <Link
              to="/sovereign/portal/live-calls"
              className="mt-4 inline-block border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              View Schedule
            </Link>
          </Panel>
        </div>
      </div>

      <footer className="border-t mt-12" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs flex flex-wrap items-center justify-between gap-3" style={{ color: C.muted }}>
          <span>The Sovereignty Code · Soul True</span>
          <div className="flex gap-4">
            <Link to="/sovereign/terms" style={{ color: C.muted }}>Terms</Link>
            <a href="mailto:hello@soul-true.com" style={{ color: C.muted }}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Panel({
  children,
  locked = false,
  icon,
}: {
  children: React.ReactNode;
  locked?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="p-6 relative"
      style={{
        background: C.card,
        border: `1px solid rgba(201,168,76,${locked ? 0.12 : 0.25})`,
        opacity: locked ? 0.65 : 1,
      }}
    >
      {icon && <div className="absolute right-4 top-4">{icon}</div>}
      {children}
    </div>
  );
}

function PanelHeading({
  title,
  icon,
  muted = false,
}: {
  title: string;
  icon?: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h3
        className="text-[11px] uppercase tracking-[0.32em]"
        style={{ color: muted ? C.muted : C.gold }}
      >
        {title}
      </h3>
    </div>
  );
}
