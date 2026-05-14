import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PaywallModal } from "@/components/PaywallModal";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { isUnlocked } from "@/lib/unlocks";

export const Route = createFileRoute("/aura-reader")({
  head: () => ({
    meta: [
      { title: "Aura Reader — Soul True" },
      { name: "description", content: "A 3-layer aura reading: emotional core, social presence, spiritual depth — plus full 7-chakra alignment." },
      { property: "og:title", content: "Aura Reader — Soul True" },
      { property: "og:description", content: "Map your 3-layer energy field." },
    ],
  }),
  component: AuraReaderPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

const AURA_HEX: Record<string, string> = {
  Gold: "#C9A84C", Silver: "#C0C0C0", Platinum: "#E5E4E2", Copper: "#B87333",
  Blue: "#5B8FC9", Green: "#5BC97D", Violet: "#A05BC9", White: "#F5F0E8",
  Red: "#E8504C", Orange: "#E89149", Indigo: "#6E5BC9",
  Diamond: "#F5F0E8", Clear: "#F5F0E8", Opalescent: "#E8D8E8",
  Iridescent: "#C3A6D4", Obsidian: "#1A1209",
};
function colorOf(name: string): string {
  const key = Object.keys(AURA_HEX).find(k => name.toLowerCase().includes(k.toLowerCase()));
  return key ? AURA_HEX[key] : C.gold;
}

const QUESTIONS = [
  { q: "Right now, how does your body feel?", options: ["Light", "Heavy", "Buzzing", "Tired", "Electric"] },
  { q: "When you walk into a room, people tend to feel —", options: ["Calm", "Energized", "Seen", "Uncomfortable", "Nothing changes"] },
  { q: "Your relationship with your emotions is —", options: ["I feel everything deeply", "I process slowly", "I keep them contained", "I'm not sure"] },
  { q: "What color are you most drawn to right now?", options: ["Gold", "Deep blue", "Forest green", "Violet", "White", "Crimson"] },
  { q: "What word lives in your chest most days?", options: ["Love", "Fear", "Power", "Peace", "Hunger", "Confusion"] },
];

const CHAKRAS = [
  { key: "root", label: "Root", color: "#C9302C" },
  { key: "sacral", label: "Sacral", color: "#E89149" },
  { key: "solar_plexus", label: "Solar Plexus", color: "#D4A017" },
  { key: "heart", label: "Heart", color: "#5BC97D" },
  { key: "throat", label: "Throat", color: "#5B8FC9" },
  { key: "third_eye", label: "Third Eye", color: "#6E5BC9" },
  { key: "crown", label: "Crown", color: "#A05BC9" },
] as const;

type Layer = { colors: string[]; reading: string };
type Chakra = { status: string; description: string; practice: string };
type Reading = {
  aura_color: string; teaser: string;
  emotional_core: Layer; social_presence: Layer; spiritual_depth: Layer;
  chakras: Record<string, Chakra>;
  soul_message: string;
};

function AuraReaderPage() {
  const [step, setStep] = useState<"intake" | "email" | "loading" | "result" | "error">("intake");
  const [answers, setAnswers] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => { setUnlocked(isUnlocked("aura")); }, []);

  const pick = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (idx < QUESTIONS.length - 1) setIdx(idx + 1);
    else setStep("email");
  };

  const submit = async () => {
    if (!email.trim()) return;
    setStep("loading");
    try {
      const payload: Record<string, string> = {};
      QUESTIONS.forEach((q, i) => { payload[q.q] = answers[i]; });
      const { data, error } = await supabase.functions.invoke("aura-reader-generate", { body: { answers: payload } });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      const r = data.reading as Reading;
      setReading(r);
      setStep("result");
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), source: "aura-reader", opted_in_consciousness_map: optIn });
      if (optIn) void supabase.from("consciousness_data").insert({ reader_type: "aura", aura_color: r.aura_color, dominant_energy: answers[4] ?? null });
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("error");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/readings" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← All Readings</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Aura · $9.99</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "intake" && (
            <motion.div key={`q-${idx}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: C.gold }}>Question {idx + 1} of {QUESTIONS.length}</p>
              <h1 className="font-serif text-3xl font-light italic md:text-4xl">{QUESTIONS[idx].q}</h1>
              <div className="mt-10 space-y-3">
                {QUESTIONS[idx].options.map((opt) => (
                  <button key={opt} onClick={() => pick(opt)}
                    className="block w-full rounded-none border px-6 py-4 text-left text-base"
                    style={{ borderColor: `${C.gold}40`, color: C.text, background: "rgba(201,168,76,0.03)" }}>
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "email" && (
            <motion.div key="email" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: C.gold }}>Almost there</p>
              <h1 className="font-serif text-3xl font-light italic md:text-4xl">Where shall we send your aura reading?</h1>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                className="mt-8 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                style={{ borderColor: `${C.gold}66`, color: C.text }} />
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm" style={{ color: C.muted }}>
                <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-1" />
                <span>Contribute my anonymized reading to the Soul True Consciousness Map. No personal information is ever stored with your reading data.</span>
              </label>
              <button onClick={submit} disabled={!email.trim()}
                className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Reveal My Aura →
              </button>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24">
              <div className="h-32 w-32 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
              <p className="mt-10 font-serif text-xl italic" style={{ color: C.gold }}>Reading your frequency…</p>
            </motion.div>
          )}

          {step === "error" && (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <p className="font-serif text-2xl italic" style={{ color: C.gold }}>The reading didn't come through.</p>
              <p className="mt-3 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
              <button onClick={() => { setStep("intake"); setIdx(0); setAnswers([]); }}
                className="mt-8 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>Try again</button>
            </motion.div>
          )}

          {step === "result" && reading && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your dominant aura</p>
                <div className="relative mx-auto mt-8 h-44 w-44">
                  <div className="absolute inset-0 animate-pulse rounded-full"
                    style={{ background: `radial-gradient(circle, ${colorOf(reading.aura_color)}, transparent 70%)`, filter: "blur(20px)" }} />
                  <div className="absolute inset-6 rounded-full"
                    style={{ background: colorOf(reading.aura_color), boxShadow: `0 0 60px ${colorOf(reading.aura_color)}` }} />
                </div>
                <h1 className="mt-10 font-serif text-5xl font-light italic" style={{ color: C.text }}>{reading.aura_color}</h1>
              </div>

              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>Free preview</p>
                <p className="font-serif text-xl italic leading-relaxed">"{reading.teaser}"</p>
              </motion.section>

              {!unlocked && (
                <div className="mt-10 rounded-none border p-7 text-center" style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The full 3-layer reading awaits</p>
                  <p className="mt-3 text-base" style={{ color: C.muted }}>Emotional Core, Social Presence, Spiritual Depth — plus your full 7-chakra alignment.</p>
                  <button onClick={() => setPaywallOpen(true)}
                    className="mt-6 inline-block rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                    style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                    Unlock Full Reading →
                  </button>
                </div>
              )}

              {unlocked && (
                <>
                  {[
                    { label: "Layer 1 · Emotional Core", layer: reading.emotional_core },
                    { label: "Layer 2 · Social Presence", layer: reading.social_presence },
                    { label: "Layer 3 · Spiritual Depth", layer: reading.spiritual_depth },
                  ].map((s, i) => (
                    <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="mt-12">
                      <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>{s.label}</p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {s.layer.colors.map((c) => (
                          <span key={c} className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
                            <span className="inline-block h-3 w-3 rounded-full" style={{ background: colorOf(c), boxShadow: `0 0 8px ${colorOf(c)}80` }} />
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-base leading-relaxed">{s.layer.reading}</p>
                    </motion.section>
                  ))}

                  <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-14">
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>Chakra alignment</p>
                    <div className="space-y-3">
                      {CHAKRAS.map(({ key, label, color }) => {
                        const ch = reading.chakras[key];
                        if (!ch) return null;
                        return (
                          <div key={key} className="rounded-none border p-4" style={{ borderColor: `${C.gold}33`, background: "rgba(201,168,76,0.03)" }}>
                            <div className="flex items-center gap-3">
                              <span className="inline-block h-4 w-4 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}80` }} />
                              <p className="text-base font-medium">{label}</p>
                              <span className="ml-auto text-[10px] uppercase tracking-[0.25em]" style={{ color: C.gold }}>{ch.status}</span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed" style={{ color: C.text }}>{ch.description}</p>
                            <p className="mt-2 text-sm italic" style={{ color: C.muted }}><span className="text-[10px] uppercase tracking-[0.2em] mr-2" style={{ color: C.gold }}>Practice</span>{ch.practice}</p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.section>

                  <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                    className="mt-14 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>A message for you</p>
                    <p className="font-serif text-xl italic leading-relaxed">"{reading.soul_message}"</p>
                  </motion.section>

                  <KimAlfanoCard />
                </>
              )}

              <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                For educational &amp; inspirational purposes only.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <PaywallModal slug="aura" open={paywallOpen} email={email} onClose={() => setPaywallOpen(false)} onUnlocked={() => { setUnlocked(true); setPaywallOpen(false); }} />
      </div>
    </motion.div>
  );
}
