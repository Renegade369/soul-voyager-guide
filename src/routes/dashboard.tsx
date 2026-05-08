import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Soul True" },
      { name: "description", content: "View your Soul True journey — quiz results, birth chart readings, challenge progress, and more." },
    ],
  }),
  component: DashboardPage,
});

const C = { bg: "#0D0F0E", card: "#141816", border: "#2E3A35", gold: "#C9A84C", text: "#E8EDE9", muted: "#8A9E94" };
const heading = { fontFamily: '"Cormorant Garamond", serif', color: C.gold };
const body = { fontFamily: '"Outfit", sans-serif' };

function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [quizResult, setQuizResult] = useState<any>(null);
  const [challengeDays, setChallengeDays] = useState<number>(0);
  const [meditations, setMeditations] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    supabase.from("soul_quiz_results").select("soul_type, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).then(({ data }) => {
      if (data?.[0]) setQuizResult(data[0]);
    });
    supabase.from("challenge_progress").select("id").eq("user_id", user.id).then(({ data }) => {
      setChallengeDays(data?.length ?? 0);
    });
    supabase.from("saved_meditations").select("id").eq("user_id", user.id).then(({ data }) => {
      setMeditations(data?.length ?? 0);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: C.bg }}>
        <p style={{ ...body, color: C.muted }}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4" style={{ backgroundColor: C.bg }}>
        <h1 className="text-3xl font-light" style={heading}>Sign in to view your dashboard</h1>
        <Link
          to="/guide"
          className="rounded-sm px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
          style={{ backgroundColor: C.gold, color: C.bg, ...body }}
        >
          Go to Guide
        </Link>
      </div>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Seeker";

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg }}>
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em]" style={{ ...body, color: C.muted }}>Welcome back</p>
            <h1 className="mt-2 text-4xl font-light" style={heading}>{displayName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/guide" className="text-xs uppercase tracking-[0.18em]" style={{ ...body, color: C.gold }}>
              Guide
            </Link>
            <button onClick={signOut} className="text-xs uppercase tracking-[0.18em]" style={{ ...body, color: C.muted }}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Soul Type */}
          <div className="rounded-sm border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <p className="text-[10px] uppercase tracking-[0.22em]" style={{ ...body, color: C.muted }}>Soul Type</p>
            <p className="mt-3 text-2xl font-light" style={heading}>
              {quizResult?.soul_type || "—"}
            </p>
            {!quizResult && (
              <Link to="/guide" className="mt-4 inline-block text-xs" style={{ ...body, color: C.gold }}>
                Take the Soul Quiz →
              </Link>
            )}
          </div>

          {/* Challenge Progress */}
          <div className="rounded-sm border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <p className="text-[10px] uppercase tracking-[0.22em]" style={{ ...body, color: C.muted }}>Challenge Days</p>
            <p className="mt-3 text-2xl font-light" style={heading}>
              {challengeDays} / 10
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full" style={{ backgroundColor: C.border }}>
              <div className="h-full rounded-full" style={{ backgroundColor: C.gold, width: `${(challengeDays / 10) * 100}%` }} />
            </div>
          </div>

          {/* Saved Meditations */}
          <div className="rounded-sm border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <p className="text-[10px] uppercase tracking-[0.22em]" style={{ ...body, color: C.muted }}>Saved Meditations</p>
            <p className="mt-3 text-2xl font-light" style={heading}>
              {meditations}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t pt-10" style={{ borderColor: C.border }}>
          <h2 className="mb-6 text-xl font-light" style={heading}>Continue Your Journey</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Soul Quiz", desc: "Discover your soul origin type", tab: "soulquiz" },
              { label: "Birth Chart", desc: "Get your AI-powered birth chart reading", tab: "birthchart" },
              { label: "Blood Type Guide", desc: "Explore your blood lineage wisdom", tab: "bloodtype" },
              { label: "10-Day Challenge", desc: "Transform your daily habits", tab: "challenge" },
            ].map((item) => (
              <Link
                key={item.tab}
                to="/guide"
                className="flex items-center justify-between rounded-sm border p-5 transition-colors hover:border-[#C9A84C55]"
                style={{ backgroundColor: C.card, borderColor: C.border }}
              >
                <div>
                  <p className="text-sm font-light" style={{ ...body, color: C.text }}>{item.label}</p>
                  <p className="mt-1 text-xs" style={{ ...body, color: C.muted }}>{item.desc}</p>
                </div>
                <span style={{ color: C.gold }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
