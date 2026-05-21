import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/my-readings")({
  head: () => ({
    meta: [
      { title: "My Readings — Soul True" },
      { name: "description", content: "Your saved soul readings on Soul True." },
    ],
  }),
  component: MyReadingsPage,
});

type Reading = {
  id: string;
  reading_type: string;
  result_data: { soul_name?: string; soul_summary?: string } & Record<string, unknown>;
  shared_profile_id: string | null;
  created_at: string;
};

type Transmission = {
  id: string;
  emotional_state: string;
  intention: string;
  seal: string | null;
  audio_path: string | null;
  created_at: string;
};

function MyReadingsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/sign-in" }); return; }
    Promise.all([
      supabase.from("user_readings").select("*").order("created_at", { ascending: false }),
      supabase.from("transmissions").select("id, emotional_state, intention, seal, audio_path, created_at").order("created_at", { ascending: false }),
    ]).then(([r1, r2]) => {
      setReadings((r1.data ?? []) as Reading[]);
      setTransmissions((r2.data ?? []) as Transmission[]);
      setLoadingData(false);
    });
  }, [user, loading, navigate]);

  const playTransmission = async (t: Transmission) => {
    if (!t.audio_path) return;
    setPlayingId(t.id);
    try {
      const { data, error } = await supabase.functions.invoke("sign-transmission", { body: { path: t.audio_path } });
      if (error || !data?.signedUrl) throw new Error(error?.message || "Could not load audio");
      const audio = new Audio(data.signedUrl);
      audio.play();
      audio.onended = () => setPlayingId(null);
    } catch (e) {
      console.error(e);
      setPlayingId(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-20" style={{ background: "#0A0A0A", color: "#F5F0E8" }}>
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Your Library</p>
        <h1 className="mt-3 font-serif text-4xl italic md:text-5xl" style={{ color: "#E8C87A", fontFamily: '"Cormorant Garamond", serif' }}>My Readings</h1>

        {/* Transmissions */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>✦ My Transmissions</p>
            <Link to="/transmissions" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>+ New Transmission</Link>
          </div>

          {loadingData ? (
            <p className="mt-6 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Loading…</p>
          ) : transmissions.length === 0 ? (
            <div className="mt-4 rounded-none border p-6" style={{ borderColor: "rgba(201,168,76,0.25)", background: "#1A1209" }}>
              <p className="text-sm italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: '"Cormorant Garamond", serif' }}>
                No transmissions yet. Receive your first frequency transmission to begin.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {transmissions.map((t) => (
                <li key={t.id} className="rounded-none border p-5"
                  style={{ borderColor: "rgba(201,168,76,0.25)", background: "#141716" }}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-none border px-2 py-1 text-[10px] uppercase tracking-[0.22em]"
                        style={{ borderColor: "rgba(201,168,76,0.4)", color: "#C9A84C" }}>{t.intention}</span>
                      <span className="rounded-none border px-2 py-1 text-[10px] uppercase tracking-[0.22em]"
                        style={{ borderColor: "rgba(245,240,232,0.2)", color: "rgba(245,240,232,0.7)" }}>{t.emotional_state}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: "rgba(245,240,232,0.4)" }}>
                      {new Date(t.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  {t.seal && (
                    <p className="mt-3 italic" style={{ color: "#E8C87A", fontFamily: '"Cormorant Garamond", serif' }}>
                      "{t.seal}"
                    </p>
                  )}
                  {t.audio_path && (
                    <button onClick={() => playTransmission(t)} disabled={playingId === t.id}
                      className="mt-4 rounded-none px-5 py-2 text-[11px] uppercase tracking-[0.22em] disabled:opacity-50"
                      style={{ background: "linear-gradient(135deg,#C9A84C,#D4A017)", color: "#0A0A0A" }}>
                      {playingId === t.id ? "Playing…" : "▶ Replay"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Readings */}
        <section className="mt-14">
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Saved Readings</p>
          {loadingData ? (
            <p className="mt-6 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Loading…</p>
          ) : readings.length === 0 ? (
            <div className="mt-4 rounded-none border p-10 text-center" style={{ borderColor: "rgba(201,168,76,0.3)", background: "#1A1209" }}>
              <p className="font-serif text-xl italic" style={{ color: "#F5F0E8" }}>Nothing saved yet.</p>
              <p className="mt-2 text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>Generate a reading and we'll keep it here for you.</p>
              <Link to="/readings" className="mt-6 inline-block rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: "#C9A84C", color: "#0A0A0A" }}>Begin a Reading →</Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {readings.map((r) => {
                const target = r.shared_profile_id ? `/profile/${r.shared_profile_id}` : null;
                const inner = (
                  <div className="flex flex-col gap-2 rounded-none border p-6 transition hover:border-[#C9A84C]"
                    style={{ borderColor: "rgba(201,168,76,0.2)", background: "#141716" }}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>{r.reading_type.replace("_", " ")}</p>
                      <p className="text-[10px]" style={{ color: "rgba(245,240,232,0.4)" }}>
                        {new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    {r.result_data?.soul_name && (
                      <p className="font-serif text-2xl italic" style={{ color: "#E8C87A" }}>{r.result_data.soul_name}</p>
                    )}
                    {r.result_data?.soul_summary && (
                      <p className="line-clamp-2 text-sm" style={{ color: "rgba(245,240,232,0.7)" }}>{r.result_data.soul_summary}</p>
                    )}
                  </div>
                );
                return (
                  <li key={r.id}>
                    {target ? <Link to="/profile/$id" params={{ id: r.shared_profile_id! }}>{inner}</Link> : inner}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
