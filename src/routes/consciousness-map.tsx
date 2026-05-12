import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/consciousness-map")({
  head: () => ({
    meta: [
      { title: "Consciousness Map — Soul True" },
      { name: "description", content: "A live global energy dashboard of every soul reading on Soul True." },
    ],
  }),
  component: ConsciousnessMapPage,
});

type Row = { aura_color: string | null; dominant_energy: string | null; soul_archetype: string | null; created_at: string };

const AURA_HEX: Record<string, string> = {
  red: "#E8504C", orange: "#E89149", yellow: "#E8C849", green: "#5BC97D",
  blue: "#5B8FC9", indigo: "#6E5BC9", violet: "#A05BC9", pink: "#E89DC2",
  white: "#F5F0E8", gold: "#C9A84C", silver: "#C8C8C8",
};

function colorFor(name: string): string {
  const k = name.toLowerCase();
  for (const key of Object.keys(AURA_HEX)) if (k.includes(key)) return AURA_HEX[key];
  return "#C9A84C";
}

function topN<T extends string>(arr: (T | null | undefined)[], n: number): { name: T; count: number; pct: number }[] {
  const counts = new Map<T, number>();
  let total = 0;
  for (const v of arr) if (v) { counts.set(v, (counts.get(v) ?? 0) + 1); total++; }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, count]) => ({ name, count, pct: total ? Math.round((count / total) * 100) : 0 }));
}

function ConsciousnessMapPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);

  const load = async () => {
    const { count } = await supabase.from("consciousness_data").select("*", { count: "exact", head: true });
    setTotal(count ?? 0);
    const { data } = await supabase.from("consciousness_data").select("aura_color, dominant_energy, soul_archetype, created_at")
      .order("created_at", { ascending: false }).limit(2000);
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);

  const auraDist = topN(rows.map((r) => r.aura_color), 7);
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const weekRows = rows.filter((r) => new Date(r.created_at).getTime() >= weekAgo);
  const archetypes = topN(weekRows.map((r) => r.soul_archetype), 5);
  const energies = topN(weekRows.map((r) => r.dominant_energy), 3);

  return (
    <div className="relative min-h-screen px-6 py-20" style={{ background: "#0A0A0A", color: "#F5F0E8" }}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(232,130,26,0.05), transparent 70%)" }} />
      <div className="relative mx-auto max-w-4xl space-y-20">

        {/* Hero counter */}
        <section className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>The Living Map</p>
          <p className="mt-6 font-serif text-7xl font-light md:text-8xl" style={{ color: "#F5F0E8" }}>
            {total.toLocaleString()}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em]" style={{ color: "#C9A84C" }}>
            souls have been read on Soul True
          </p>
        </section>

        {/* Aura distribution */}
        <section>
          <h2 className="mb-6 font-serif text-2xl italic" style={{ color: "#E8C87A" }}>Aura Color Distribution</h2>
          {auraDist.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>The map is still gathering signals.</p>
          ) : (
            <ul className="space-y-3">
              {auraDist.map((a) => (
                <li key={a.name} className="flex items-center gap-4">
                  <span className="h-6 w-6 flex-shrink-0 rounded-full" style={{ background: colorFor(a.name) }} />
                  <span className="w-32 text-sm capitalize" style={{ color: "#F5F0E8" }}>{a.name}</span>
                  <div className="h-2 flex-1 overflow-hidden" style={{ background: "rgba(201,168,76,0.1)" }}>
                    <div className="h-full" style={{ width: `${a.pct}%`, background: "#C9A84C" }} />
                  </div>
                  <span className="w-12 text-right text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>{a.pct}%</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Archetypes */}
        <section>
          <h2 className="mb-6 font-serif text-2xl italic" style={{ color: "#E8C87A" }}>Trending Soul Archetypes (this week)</h2>
          {archetypes.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>No data yet for this week.</p>
          ) : (
            <ol className="space-y-3">
              {archetypes.map((a, i) => (
                <li key={a.name} className="flex items-baseline gap-4 border-b py-2"
                  style={{ borderColor: "rgba(201,168,76,0.15)" }}>
                  <span className="font-serif text-2xl" style={{ color: "#C9A84C" }}>{i + 1}</span>
                  <span className="flex-1 font-serif text-lg italic" style={{ color: "#F5F0E8" }}>{a.name}</span>
                  <span className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>{a.count}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Collective energy */}
        <section>
          <h2 className="mb-6 font-serif text-2xl italic" style={{ color: "#E8C87A" }}>This week's collective energy</h2>
          {energies.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>The collective is quiet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {energies.map((e) => (
                <span key={e.name}
                  className="rounded-full px-6 py-3 text-base"
                  style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#F5F0E8" }}>
                  {e.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="font-serif text-3xl italic" style={{ color: "#E8C87A" }}>Discover your place in this map.</p>
          <Link to="/" className="mt-6 inline-block rounded-none px-8 py-4 text-[11px] uppercase tracking-[0.22em]"
            style={{ background: "#C9A84C", color: "#0A0A0A" }}>
            Get Your Free Reading →
          </Link>
        </section>

        <p className="text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(245,240,232,0.3)" }}>
          Refreshes every 60 seconds · Anonymized data only
        </p>
      </div>
    </div>
  );
}
