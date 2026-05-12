import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/aura-reader")({
  head: () => ({
    meta: [
      { title: "Aura Reader — Soul True" },
      { name: "description", content: "A 5-question energetic reading. Discover your dominant aura color and what your frequency is asking for. Educational and inspirational only." },
      { property: "og:title", content: "Aura Reader — Soul True" },
      { property: "og:description", content: "Discover your dominant aura color in five questions." },
    ],
  }),
  component: AuraReaderPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

const AURA_HEX: Record<string, string> = {
  Gold: "#C9A84C", Blue: "#5B8FC9", Green: "#5BC97D", Violet: "#A05BC9",
  White: "#F5F0E8", Red: "#E8504C", Orange: "#E89149", Indigo: "#6E5BC9",
};

const QUESTIONS = [
  { q: "Right now, how does your body feel?", options: ["Light", "Heavy", "Buzzing", "Tired", "Electric"] },
  { q: "When you walk into a room, people tend to feel —", options: ["Calm", "Energized", "Seen", "Uncomfortable", "Nothing changes"] },
  { q: "Your relationship with your emotions is —", options: ["I feel everything deeply", "I process slowly", "I keep them contained", "I'm not sure"] },
  { q: "What color are you most drawn to right now?", options: ["Gold", "Deep blue", "Forest green", "Violet", "White", "Crimson"] },
  { q: "What word lives in your chest most days?", options: ["Love", "Fear", "Power", "Peace", "Hunger", "Confusion"] },
];

type Reading = {
  aura_color: string; color_meaning: string; current_frequency: string;
  your_gift: string; what_energy_needs: string; soul_message: string;
};

function AuraReaderPage() {
  const [step, setStep] = useState<"intake" | "email" | "loading" | "result" | "error">("intake");
  const [answers, setAnswers] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

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
      // Background: subscribe + log consciousness
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), source: "aura-reader", opted_in_consciousness_map: optIn });
      if (optIn) {
        void supabase.from("consciousness_data").insert({
          reader_type: "aura", aura_color: r.aura_color, dominant_energy: answers[4] ?? null,
        });
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("error");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Soul True</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Aura Reader</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "intake" && (
            <motion.div key={`q-${idx}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: C.gold }}>Question {idx + 1} of {QUESTIONS.length}</p>
              <h1 className="font-serif text-3xl font-light italic md:text-4xl" style={{ color: C.text }}>{QUESTIONS[idx].q}</h1>
              <div className="mt-10 space-y-3">
                {QUESTIONS[idx].options.map((opt) => (
                  <button key={opt} onClick={() => pick(opt)}
                    className="block w-full rounded-none border px-6 py-4 text-left text-base transition-all hover:border-opacity-100"
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
                <span>Contribute my anonymized reading to the Soul True Consciousness Map.</span>
              </label>
              <p className="mt-4 text-xs" style={{ color: C.dim }}>By continuing you agree to our Terms. Personal information is never shared with anonymized data.</p>
              <button onClick={submit} disabled={!email.trim()}
                className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] transition-all disabled:opacity-40"
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
                    style={{ background: `radial-gradient(circle, ${AURA_HEX[reading.aura_color] || C.gold}, transparent 70%)`, filter: "blur(20px)" }} />
                  <div className="absolute inset-6 rounded-full"
                    style={{ background: AURA_HEX[reading.aura_color] || C.gold, boxShadow: `0 0 60px ${AURA_HEX[reading.aura_color] || C.gold}` }} />
                </div>
                <h1 className="mt-10 font-serif text-6xl font-light italic uppercase" style={{ color: C.text }}>{reading.aura_color}</h1>
              </div>

              {[
                { label: "What this color means", text: reading.color_meaning },
                { label: "Your current frequency", text: reading.current_frequency },
                { label: "Your gift", text: reading.your_gift },
                { label: "What your energy needs", text: reading.what_energy_needs },
              ].map((s, i) => (
                <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.2 }} className="mt-12">
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>{s.label}</p>
                  <p className="text-base leading-relaxed">{s.text}</p>
                </motion.section>
              ))}

              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                className="mt-14 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>A message for you</p>
                <p className="font-serif text-xl italic leading-relaxed">"{reading.soul_message}"</p>
              </motion.section>

              <div className="mt-12 text-center">
                <p className="text-sm mb-4" style={{ color: C.muted }}>Go deeper.</p>
                <Link to="/soul-profile"
                  className="inline-block rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                  Get Your Full Soul Profile →
                </Link>
              </div>

              <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                For educational &amp; inspirational purposes only.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
