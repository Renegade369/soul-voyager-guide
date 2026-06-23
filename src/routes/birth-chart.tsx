import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PaywallModal } from "@/components/PaywallModal";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { PlantImageBand, PLANT_IMAGES } from "@/components/PlantImageBand";
import { LogoMark } from "@/components/LogoMark";
import { isUnlocked } from "@/lib/unlocks";
import { useScrollTopOnChange } from "@/hooks/useScrollTop";

export const Route = createFileRoute("/birth-chart")({
  head: () => ({
    meta: [
      { title: "Birth Chart Reader — Soul True" },
      { name: "description", content: "The sky at the moment of your first breath created a map of your soul's intention. Decode your full natal blueprint." },
      { property: "og:title", content: "Birth Chart Reader — Soul True" },
      { property: "og:description", content: "Your soul's blueprint at first breath." },
    ],
  }),
  component: BirthChartPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

type Reading = {
  sun_sign: string; moon_sign: string; rising_sign: string;
  mercury_sign: string; venus_sign: string; mars_sign: string;
  teaser: string; soul_blueprint: string;
  sun_reading: string; moon_reading: string; rising_reading: string;
  inner_planets_reading: string; karmic_themes: string; current_energies: string;
  soul_message: string;
};

function BirthChartPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [birthCity, setBirthCity] = useState("");
  const [birthState, setBirthState] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const birthPlace = [birthCity, birthState, birthCountry].map(s => s.trim()).filter(Boolean).join(", ");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [step, setStep] = useState<"intake" | "loading" | "result" | "error">("intake");
  useScrollTopOnChange([step]);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => { setUnlocked(isUnlocked("birth-chart")); }, []);

  const submit = async () => {
    if (!birthDate || !birthCity.trim() || !birthCountry.trim() || !email.trim()) return;
    setStep("loading");
    try {
      const { data, error } = await supabase.functions.invoke("birth-chart-generate", {
        body: { birthDate, birthTime: unknownTime ? "unknown" : birthTime, birthPlace: birthPlace.trim() },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      setReading(data.reading as Reading);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      setStep("result");
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), source: "birth-chart", opted_in_consciousness_map: optIn });
      if (optIn) void supabase.from("consciousness_data").insert({ reader_type: "birth-chart", sun_sign: (data.reading as Reading).sun_sign });
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
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Birth Chart · $9.99</span>
        </div>

        {step === "intake" && (
          <>
            <h1 className="font-serif text-5xl font-light italic">Your soul's blueprint</h1>
            <p className="mt-4 text-base" style={{ color: C.muted }}>The sky at the exact moment of your first breath. If you know your birth time, your rising sign reveals your outer mask.</p>
            <div className="mt-10 space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Date of birth</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Time of birth</label>
                <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} disabled={unknownTime}
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none disabled:opacity-40"
                  style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
                <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm" style={{ color: C.muted }}>
                  <input type="checkbox" checked={unknownTime} onChange={(e) => setUnknownTime(e.target.checked)} />
                  I don't know my birth time
                </label>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>City of birth</label>
                <input type="text" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} placeholder="City"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>State / Province <span style={{ color: C.dim }}>(optional)</span></label>
                <input type="text" value={birthState} onChange={(e) => setBirthState(e.target.value)} placeholder="State or Province"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Country of birth</label>
                <input type="text" value={birthCountry} onChange={(e) => setBirthCountry(e.target.value)} placeholder="Country"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
            </div>
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm" style={{ color: C.muted }}>
              <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-1" />
              <span>Contribute my anonymized reading to the Soul True Consciousness Map. No personal information is ever stored with your reading data.</span>
            </label>
            <button onClick={submit} disabled={!birthDate || !birthCity.trim() || !birthCountry.trim() || !email.trim()}
              className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
              Decode My Chart →
            </button>
          </>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center py-24">
            <div className="h-32 w-32 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
            <p className="mt-10 font-serif text-xl italic" style={{ color: C.gold }}>Decoding your chart…</p>
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
          <motion.div className="relative" data-animate="fade-up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <LogoMark size={36} position="top-right" />
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your placements</p>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {[
                  ["Sun", reading.sun_sign, "☉"], ["Moon", reading.moon_sign, "☾"], ["Rising", reading.rising_sign, "↑"],
                  ["Mercury", reading.mercury_sign, "☿"], ["Venus", reading.venus_sign, "♀"], ["Mars", reading.mars_sign, "♂"],
                ].filter(([, v]) => !!v).map(([label, val, sym]) => (
                  <div key={label} className="rounded-none border p-3" style={{ borderColor: `${C.gold}40`, background: "rgba(201,168,76,0.03)" }}>
                    <p className="text-2xl" style={{ color: C.gold }}>{sym}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.25em]" style={{ color: C.muted }}>{label}</p>
                    <p className="mt-1 text-sm font-serif italic">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>Free preview</p>
              <p className="font-serif text-xl italic leading-relaxed">"{reading.teaser}"</p>
            </motion.section>

            {!unlocked && (
              <div className="mt-10 rounded-none border p-7 text-center" style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The full chart awaits</p>
                <p className="mt-3 text-base" style={{ color: C.muted }}>Sun, Moon, Rising, inner planets, karmic themes, and the energies active for you right now.</p>
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
                  { label: "Soul Blueprint", text: reading.soul_blueprint },
                  { label: "Your Sun", text: reading.sun_reading },
                  { label: "Your Moon", text: reading.moon_reading },
                  ...(reading.rising_sign && reading.rising_reading ? [{ label: "Your Rising", text: reading.rising_reading }] : []),
                  { label: "Your Inner Planets", text: reading.inner_planets_reading },
                  { label: "Karmic Themes", text: reading.karmic_themes },
                  { label: "Current Energies", text: reading.current_energies },
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
            <PlantImageBand src={PLANT_IMAGES.birthChart} />
          </motion.div>
        )}

        <PaywallModal slug="birth-chart" open={paywallOpen} email={email} onClose={() => setPaywallOpen(false)} onUnlocked={() => { setUnlocked(true); setPaywallOpen(false); }} />
      </div>
    </motion.div>
  );
}
