import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/consciousness-map")({
  head: () => ({
    meta: [
      { title: "Consciousness Map — Soul True" },
      { name: "description", content: "A live global energy dashboard of every soul reading on Soul True." },
      { property: "og:title", content: "Consciousness Map — Soul True" },
      { property: "og:description", content: "A live global energy dashboard of every soul reading on Soul True." },
    ],
  }),
  component: ConsciousnessMapPage,
});

type Row = {
  aura_color: string | null;
  dominant_energy: string | null;
  soul_archetype: string | null;
  created_at: string;
};

// Brand palette
const C = {
  bg: "#0A0A0A",
  gold: "#C9A84C",
  goldAlt: "#D4A017",
  text: "#F5F0E8",
  glow: "#E8821A",
  crystal: "#C3A6D4",
  deep: "#1A1209",
};

// Aura swatch colors — these are the only place non-brand hues appear (data-driven)
const AURA_HEX: Record<string, string> = {
  indigo: "#6E5BC9",
  violet: "#A05BC9",
  blue: "#5B8FC9",
  gold: "#C9A84C",
  green: "#5BC97D",
  white: "#F5F0E8",
  red: "#E8504C",
  orange: "#E89149",
  yellow: "#E8C849",
  pink: "#E89DC2",
  silver: "#C8C8C8",
};

// Seed values (the floor)
const SEED_COUNT = 2847;
const SEED_AURAS: { name: string; pct: number }[] = [
  { name: "indigo", pct: 24 },
  { name: "violet", pct: 18 },
  { name: "blue", pct: 15 },
  { name: "gold", pct: 14 },
  { name: "green", pct: 12 },
  { name: "white", pct: 10 },
  { name: "red", pct: 7 },
];
const SEED_ARCHETYPES = ["The Awakener", "The Empath", "The Seeker", "The Transformer", "The Visionary"];
const SEED_ENERGIES = ["Transformation", "Awakening", "Release"];

const MIN_DATA_POINTS = 10;

function colorFor(name: string): string {
  const k = name.toLowerCase();
  for (const key of Object.keys(AURA_HEX)) if (k.includes(key)) return AURA_HEX[key];
  return C.gold;
}

function passiveIncrement(): number {
  // 1-3 per hour drift — derive from current hour-of-day so it's stable per render window
  const hours = Math.floor(Date.now() / 3_600_000);
  // pseudo: 1-3 per hour, accumulated since seed baseline epoch (May 2026)
  const baseline = Math.floor(new Date("2026-05-01").getTime() / 3_600_000);
  const elapsed = Math.max(0, hours - baseline);
  // Average ~2/hr deterministic
  let total = 0;
  for (let i = 0; i < elapsed; i++) total += 1 + ((i * 2654435761) % 3);
  return total;
}

function ConsciousnessMapPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [realCount, setRealCount] = useState(0);

  const load = async () => {
    const { count } = await supabase
      .from("consciousness_data")
      .select("*", { count: "exact", head: true });
    setRealCount(count ?? 0);
    const { data } = await supabase
      .from("consciousness_data")
      .select("aura_color, dominant_energy, soul_archetype, created_at")
      .order("created_at", { ascending: false })
      .limit(2000);
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, []);

  // 1. SOUL COUNT — seed floor + passive increment
  const displayCount = useMemo(() => {
    const floor = SEED_COUNT + passiveIncrement();
    return Math.max(realCount, floor);
  }, [realCount]);

  // 2. AURA DISTRIBUTION — blend if <10 real, else use real
  const auraDist = useMemo(() => {
    const realAuras = rows.map((r) => r.aura_color).filter(Boolean) as string[];
    if (realAuras.length >= MIN_DATA_POINTS) {
      const counts = new Map<string, number>();
      for (const a of realAuras) {
        const k = a.toLowerCase();
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
      const total = realAuras.length;
      return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7)
        .map(([name, c]) => ({ name, pct: Math.round((c / total) * 100) }));
    }
    return SEED_AURAS;
  }, [rows]);

  // 3. ARCHETYPES THIS WEEK
  const archetypes = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = rows
      .filter((r) => new Date(r.created_at).getTime() >= weekAgo)
      .map((r) => r.soul_archetype)
      .filter(Boolean) as string[];
    if (recent.length >= MIN_DATA_POINTS) {
      const counts = new Map<string, number>();
      for (const a of recent) counts.set(a, (counts.get(a) ?? 0) + 1);
      return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name]) => name);
    }
    return SEED_ARCHETYPES;
  }, [rows]);

  // 4. COLLECTIVE ENERGY
  const energies = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = rows
      .filter((r) => new Date(r.created_at).getTime() >= weekAgo)
      .map((r) => r.dominant_energy)
      .filter(Boolean) as string[];
    if (recent.length >= MIN_DATA_POINTS) {
      const counts = new Map<string, number>();
      for (const e of recent) counts.set(e, (counts.get(e) ?? 0) + 1);
      return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name);
    }
    return SEED_ENERGIES;
  }, [rows]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative min-h-screen px-6 py-20"
      style={{ background: C.bg, color: C.text }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{ background: `radial-gradient(ellipse at bottom, ${C.glow}10, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-4xl space-y-20">
        {/* 1. Live Soul Counter */}
        <section className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
            The Living Map
          </p>
          <p
            className="mt-6 font-serif text-7xl font-light md:text-8xl"
            style={{ color: C.text, textShadow: `0 0 40px ${C.glow}40` }}
          >
            {displayCount.toLocaleString()}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em]" style={{ color: C.gold }}>
            souls have been read on Soul True
          </p>
        </section>

        {/* 2. Aura Color Distribution */}
        <section>
          <h2 className="mb-6 font-serif text-2xl italic" style={{ color: C.goldAlt }}>
            Aura Color Distribution
          </h2>
          <ul className="space-y-3">
            {auraDist.map((a) => (
              <li key={a.name} className="flex items-center gap-4">
                <span
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                  style={{ background: colorFor(a.name), boxShadow: `0 0 12px ${colorFor(a.name)}80` }}
                />
                <span className="w-32 text-sm capitalize" style={{ color: C.text }}>
                  {a.name}
                </span>
                <div className="h-2 flex-1 overflow-hidden" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${a.pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full"
                    style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldAlt})` }}
                  />
                </div>
                <span className="w-12 text-right text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>
                  {a.pct}%
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Trending Archetypes */}
        <section>
          <h2 className="mb-6 font-serif text-2xl italic" style={{ color: C.goldAlt }}>
            Trending Soul Archetypes (this week)
          </h2>
          <ol className="space-y-3">
            {archetypes.map((name, i) => (
              <li
                key={name}
                className="flex items-baseline gap-4 border-b py-3"
                style={{ borderColor: "rgba(201,168,76,0.15)" }}
              >
                <span className="font-serif text-2xl" style={{ color: C.gold }}>
                  {i + 1}
                </span>
                <span className="flex-1 font-serif text-lg italic" style={{ color: C.text }}>
                  {name}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Collective Energy */}
        <section>
          <h2 className="mb-6 font-serif text-2xl italic" style={{ color: C.goldAlt }}>
            This week's collective energy
          </h2>
          <div className="flex flex-wrap gap-3">
            {energies.map((e) => (
              <span
                key={e}
                className="rounded-full px-6 py-3 text-base"
                style={{
                  background: "rgba(201,168,76,0.12)",
                  border: `1px solid ${C.gold}66`,
                  color: C.text,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </section>

        {/* 5. CTA */}
        <section
          className="rounded-none border px-6 py-14 text-center"
          style={{ borderColor: `${C.gold}40`, background: C.deep }}
        >
          <p className="font-serif text-3xl italic md:text-4xl" style={{ color: C.goldAlt }}>
            Discover your place in this map.
          </p>
          <Link
            to="/guide"
            className="mt-8 inline-block rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`,
              color: C.bg,
              boxShadow: `0 0 30px ${C.glow}40`,
            }}
          >
            Get Your Free Reading →
          </Link>
        </section>

        <p className="text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(245,240,232,0.3)" }}>
          Refreshes every 60 seconds · Anonymized data only · For educational &amp; inspirational purposes
        </p>
      </div>
    </motion.div>
  );
}
