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

function MyReadingsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/sign-in" }); return; }
    supabase.from("user_readings").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setReadings((data ?? []) as Reading[]);
      setLoadingData(false);
    });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen px-6 py-20" style={{ background: "#0A0A0A", color: "#F5F0E8" }}>
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Your Library</p>
        <h1 className="mt-3 font-serif text-4xl italic md:text-5xl" style={{ color: "#E8C87A" }}>My Readings</h1>

        {loadingData ? (
          <p className="mt-12 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Loading…</p>
        ) : readings.length === 0 ? (
          <div className="mt-12 rounded-none border p-10 text-center" style={{ borderColor: "rgba(201,168,76,0.3)", background: "#1A1209" }}>
            <p className="font-serif text-xl italic" style={{ color: "#F5F0E8" }}>Nothing saved yet.</p>
            <p className="mt-2 text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>Generate a reading and we'll keep it here for you.</p>
            <Link to="/" className="mt-6 inline-block rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ background: "#C9A84C", color: "#0A0A0A" }}>Begin a Reading →</Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
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
      </div>
    </div>
  );
}
