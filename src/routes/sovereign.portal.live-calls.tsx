import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, Calendar, ExternalLink, Play, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePortalStatus, usePortalGuard } from "@/hooks/usePortalStatus";

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

type Call = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  duration_minutes: number;
  join_url: string | null;
  recording_url: string | null;
  tier_required: string;
};

export const Route = createFileRoute("/sovereign/portal/live-calls")({
  head: () => ({ meta: [{ title: "Live Calls — Sovereign Portal" }] }),
  component: LiveCallsPage,
});

function formatWhen(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function LiveCallsPage() {
  const status = usePortalStatus();
  usePortalGuard(status, true);

  const [calls, setCalls] = useState<Call[] | null>(null);

  useEffect(() => {
    if (status.state !== "ready") return;
    (async () => {
      const { data } = await supabase
        .from("sovereign_live_calls")
        .select("*")
        .eq("is_published", true)
        .order("scheduled_at", { ascending: false });
      setCalls((data as Call[]) ?? []);
    })();
  }, [status]);

  if (status.state !== "ready") {
    return (
      <div style={{ background: C.bg, minHeight: "80vh" }} className="flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} color={C.gold} />
      </div>
    );
  }

  const isComplete = status.tier === "complete";
  const now = Date.now();
  const upcoming = (calls ?? []).filter((c) => new Date(c.scheduled_at).getTime() >= now - 1000 * 60 * 30).reverse();
  const past = (calls ?? []).filter((c) => new Date(c.scheduled_at).getTime() < now - 1000 * 60 * 30);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      <section className="border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link
            to="/sovereign/portal/dashboard"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
            Live with William
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
            Monthly <em style={{ color: C.gold }}>gatherings</em>.
          </h1>
          <p className="mt-3 text-base font-light max-w-2xl" style={{ color: C.muted }}>
            Live transmissions, questions held in council, and the practice of being seen by your peers in the work.
          </p>
          {!isComplete && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 text-sm" style={{ background: C.card, border: `1px solid rgba(232,130,26,0.3)`, color: C.muted }}>
              <Lock size={14} color={C.glow} />
              <span>Live calls are part of the Complete tier. <a href="mailto:hello@soul-true.com" style={{ color: C.gold, textDecoration: "underline" }}>Upgrade for $200</a>.</span>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 space-y-12">
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>Upcoming</h2>
          {calls === null ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin" size={24} color={C.gold} /></div>
          ) : upcoming.length === 0 ? (
            <p className="mt-4 text-sm italic" style={{ color: C.muted, fontFamily: fonts.display }}>
              The next call will be announced soon. You'll be notified by email.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {upcoming.map((c) => <CallCard key={c.id} call={c} locked={!isComplete && c.tier_required === "complete"} kind="upcoming" />)}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>Recordings</h2>
          {past.length === 0 ? (
            <p className="mt-4 text-sm italic" style={{ color: C.muted, fontFamily: fonts.display }}>
              Past gatherings will appear here.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {past.map((c) => <CallCard key={c.id} call={c} locked={!isComplete && c.tier_required === "complete"} kind="past" />)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function CallCard({ call, locked, kind }: { call: Call; locked: boolean; kind: "upcoming" | "past" }) {
  return (
    <li
      className="p-5 flex items-start gap-4"
      style={{
        background: C.card,
        border: `1px solid rgba(201,168,76,${locked ? 0.12 : 0.25})`,
        opacity: locked ? 0.6 : 1,
      }}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center" style={{ border: `1px solid ${C.gold}` }}>
        {locked ? <Lock size={16} color={C.dim} /> : kind === "upcoming" ? <Calendar size={16} color={C.gold} /> : <Play size={16} color={C.gold} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>
          {formatWhen(call.scheduled_at)} · {call.duration_minutes} min
        </p>
        <h3 className="mt-1 text-xl font-light" style={{ fontFamily: fonts.display }}>{call.title}</h3>
        {call.description && <p className="mt-1 text-sm font-light" style={{ color: C.muted }}>{call.description}</p>}
        {!locked && (
          <div className="mt-3 flex flex-wrap gap-3">
            {kind === "upcoming" && call.join_url && (
              <a
                href={call.join_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: C.gold, color: C.bg }}
              >
                Join Call <ExternalLink size={12} />
              </a>
            )}
            {kind === "past" && call.recording_url && (
              <a
                href={call.recording_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                Watch Recording <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
