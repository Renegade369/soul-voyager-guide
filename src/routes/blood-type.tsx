import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PaywallModal } from "@/components/PaywallModal";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { PlantImageBand, PLANT_IMAGES } from "@/components/PlantImageBand";
import { isUnlocked } from "@/lib/unlocks";

export const Route = createFileRoute("/blood-type")({
  head: () => ({
    meta: [
      { title: "Blood Type Reader — Soul True" },
      { name: "description", content: "Your blood type is one of the oldest biological codes you carry. Discover your ancestral nutrition blueprint, immune signature, and emotional architecture." },
      { property: "og:title", content: "Blood Type Reader — Soul True" },
      { property: "og:description", content: "Unlock your ancestral biology." },
    ],
  }),
  component: BloodTypePage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

const BLOOD_TYPES = ["O", "A", "B", "AB"] as const;
const RH = ["+", "-"] as const;

type Reading = {
  teaser: string;
  ancestral_blueprint: string;
  nourishment: string;
  immune_signature: string;
  stress_response: string;
  movement_style: string;
  emotional_architecture: string;
  soul_message: string;
};

function BloodTypePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodType, setBloodType] = useState<typeof BLOOD_TYPES[number] | "">("");
  const [rh, setRh] = useState<typeof RH[number] | "">("");
  const [optIn, setOptIn] = useState(true);
  const [step, setStep] = useState<"intake" | "loading" | "result" | "error">("intake");
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => { setUnlocked(isUnlocked("blood-type")); }, []);

  const submit = async () => {
    if (!name.trim() || !email.trim() || !bloodType || !rh) return;
    setStep("loading");
    try {
      const { data, error } = await supabase.functions.invoke("blood-type-generate", {
        body: { name: name.trim(), blood_type: bloodType, rh_factor: rh },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      setReading(data.reading as Reading);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      setStep("result");
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), first_name: name.trim().split(" ")[0], source: "blood-type", opted_in_consciousness_map: optIn });
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
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Blood Type · $9.99</span>
        </div>

        {step === "intake" && (
          <>
            <h1 className="font-serif text-5xl font-light italic">Your blood, your blueprint</h1>
            <p className="mt-4 text-base" style={{ color: C.muted }}>
              Your blood type is one of the oldest biological codes you carry. Tell us yours.
            </p>
            <div className="mt-10 space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Full name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Blood type</label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {BLOOD_TYPES.map((b) => (
                    <button key={b} onClick={() => setBloodType(b)}
                      className="rounded-none border px-4 py-3 text-base transition-all"
                      style={{ borderColor: bloodType === b ? C.gold : `${C.gold}40`, background: bloodType === b ? "rgba(201,168,76,0.12)" : "transparent", color: C.text }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Rh factor</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {RH.map((r) => (
                    <button key={r} onClick={() => setRh(r)}
                      className="rounded-none border px-4 py-3 text-base"
                      style={{ borderColor: rh === r ? C.gold : `${C.gold}40`, background: rh === r ? "rgba(201,168,76,0.12)" : "transparent", color: C.text }}>
                      {r === "+" ? "Positive (+)" : "Negative (−)"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm" style={{ color: C.muted }}>
              <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-1" />
              <span>Contribute my anonymized reading to the Soul True Consciousness Map. No personal information is ever stored with your reading data.</span>
            </label>
            <button onClick={submit} disabled={!name.trim() || !email.trim() || !bloodType || !rh}
              className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
              Read My Blueprint →
            </button>
          </>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center py-24">
            <div className="h-32 w-32 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
            <p className="mt-10 font-serif text-xl italic" style={{ color: C.gold }}>Reading your blueprint…</p>
          </div>
        )}

        {step === "error" && (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl italic" style={{ color: C.gold }}>The reading didn't come through.</p>
            <p className="mt-3 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
            <button onClick={() => setStep("intake")} className="mt-8 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>Try again</button>
          </div>
        )}

        {step === "result" && reading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your blueprint</p>
              <h1 className="mt-4 font-serif text-6xl font-light italic" style={{ color: C.text, textShadow: `0 0 30px ${C.glow}40` }}>
                {bloodType}{rh}
              </h1>
            </div>

            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>Free preview</p>
              <p className="font-serif text-xl italic leading-relaxed" style={{ color: C.text }}>"{reading.teaser}"</p>
            </motion.section>

            {!unlocked && (
              <div className="mt-10 rounded-none border p-7 text-center" style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The full reading awaits</p>
                <p className="mt-3 text-base" style={{ color: C.muted }}>Six layers of your ancestral biology — nourishment, immune signature, stress response, movement, emotional architecture, and your soul message.</p>
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
                  { label: "Ancestral Blueprint", text: reading.ancestral_blueprint },
                  { label: "Nourishment", text: reading.nourishment },
                  { label: "Immune Signature", text: reading.immune_signature },
                  { label: "Stress Response", text: reading.stress_response },
                  { label: "Movement Style", text: reading.movement_style },
                  { label: "Emotional Architecture", text: reading.emotional_architecture },
                ].map((s, i) => (
                  <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12 }} className="mt-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>{s.label}</p>
                    <p className="text-base leading-relaxed">{s.text}</p>
                  </motion.section>
                ))}

                <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
                  className="mt-12 rounded-none border p-7 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>A message for you</p>
                  <p className="font-serif text-xl italic leading-relaxed">"{reading.soul_message}"</p>
                </motion.section>

                <KimAlfanoCard />
              </>
            )}

            <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
              For educational &amp; inspirational purposes only.
            </p>
            <PlantImageBand src={PLANT_IMAGES.bloodType} />
          </motion.div>
        )}

        <PaywallModal slug="blood-type" open={paywallOpen} email={email} onClose={() => setPaywallOpen(false)} onUnlocked={() => { setUnlocked(true); setPaywallOpen(false); }} />
      </div>
    </motion.div>
  );
}
