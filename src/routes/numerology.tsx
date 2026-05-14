import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { calculateAll } from "@/lib/numerology";
import { PaywallModal } from "@/components/PaywallModal";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { isUnlocked } from "@/lib/unlocks";

export const Route = createFileRoute("/numerology")({
  head: () => ({
    meta: [
      { title: "Numerology Reader — Soul True" },
      { name: "description", content: "Real Pythagorean numerology. Discover your Life Path, Expression, Soul Urge, Personality, and Personal Year." },
      { property: "og:title", content: "Numerology Reader — Soul True" },
      { property: "og:description", content: "Real Pythagorean numerology, interpreted in Soul True's voice." },
    ],
  }),
  component: NumerologyPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

type Reading = {
  life_path_meaning: string; expression_meaning: string; soul_urge_meaning: string;
  personality_meaning: string; personal_year_meaning: string; number_message: string;
};

function NumerologyPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [step, setStep] = useState<"intake" | "loading" | "result" | "error">("intake");
  const [reading, setReading] = useState<Reading | null>(null);
  const [numbers, setNumbers] = useState<ReturnType<typeof calculateAll> | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => { setUnlocked(isUnlocked("numerology")); }, [step]);

  const emailReading = async () => {
    if (!reading || !numbers) return;
    setEmailState("sending");
    const sections = [
      { label: `Your Life Path · ${numbers.life_path}`, body: reading.life_path_meaning },
      { label: `Your Expression · ${numbers.expression}`, body: reading.expression_meaning },
      { label: `Your Soul Urge · ${numbers.soul_urge}`, body: reading.soul_urge_meaning },
      { label: `Your Personality · ${numbers.personality}`, body: reading.personality_meaning },
      { label: `This Year's Frequency · ${numbers.personal_year}`, body: reading.personal_year_meaning },
      { label: "What Your Numbers Say", body: reading.number_message },
    ];
    try {
      const { error } = await supabase.functions.invoke("send-reading-email", {
        body: { email: email.trim().toLowerCase(), title: "Your Numerology Reading", name, sections },
      });
      setEmailState(error ? "error" : "sent");
    } catch {
      setEmailState("error");
    }
  };

  const submit = async () => {
    if (!name.trim() || !birthDate || !email.trim()) return;
    setStep("loading");
    const currentYear = new Date().getFullYear();
    const nums = calculateAll(name.trim(), birthDate, currentYear);
    setNumbers(nums);
    try {
      const { data, error } = await supabase.functions.invoke("numerology-generate", {
        body: { numbers: nums, name: name.trim(), currentYear },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      setReading(data.reading as Reading);
      setStep("result");
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), first_name: name.trim().split(" ")[0], source: "numerology", opted_in_consciousness_map: optIn });
      if (optIn) void supabase.from("consciousness_data").insert({ reader_type: "numerology", life_path_number: Number(nums.life_path) });
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("error");
    }
  };

  const NumberCard = ({ label, value }: { label: string; value: number | string }) => (
    <div className="rounded-none border p-6 text-center" style={{ borderColor: `${C.gold}40`, background: "rgba(201,168,76,0.03)" }}>
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>{label}</p>
      <p className="mt-3 font-serif text-5xl font-light" style={{ color: C.text, textShadow: `0 0 20px ${C.glow}40` }}>{value}</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Soul True</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Numerology</span>
        </div>

        {step === "intake" && (
          <>
            <h1 className="font-serif text-5xl font-light italic" style={{ color: C.text }}>Your numbers</h1>
            <p className="mt-4 text-base" style={{ color: C.muted }}>Real Pythagorean numerology — calculated from your full birth name and date.</p>
            <div className="mt-10 space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Full name at birth</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First Middle Last"
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text }} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Date of birth</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                  className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                  style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
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
            <button onClick={submit} disabled={!name.trim() || !birthDate || !email.trim()}
              className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
              Calculate My Numbers →
            </button>
          </>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center py-24">
            <div className="h-32 w-32 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
            <p className="mt-10 font-serif text-xl italic" style={{ color: C.gold }}>Calculating your frequency…</p>
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

        {step === "result" && reading && numbers && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your core numbers</p>
              <h1 className="mt-4 font-serif text-4xl font-light italic" style={{ color: C.text }}>{name}</h1>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
              <NumberCard label="Life Path" value={numbers.life_path} />
              <NumberCard label="Expression" value={numbers.expression} />
              <NumberCard label="Soul Urge" value={numbers.soul_urge} />
              <NumberCard label="Personality" value={numbers.personality} />
              <NumberCard label="Personal Year" value={numbers.personal_year} />
            </div>

            {(unlocked
              ? [
                  { label: `Your Life Path · ${numbers.life_path}`, text: reading.life_path_meaning },
                  { label: `Your Expression · ${numbers.expression}`, text: reading.expression_meaning },
                  { label: `Your Soul Urge · ${numbers.soul_urge}`, text: reading.soul_urge_meaning },
                  { label: `Your Personality · ${numbers.personality}`, text: reading.personality_meaning },
                  { label: `This Year's Frequency · ${numbers.personal_year}`, text: reading.personal_year_meaning },
                ]
              : [{ label: `Your Life Path · ${numbers.life_path}`, text: reading.life_path_meaning }]
            ).map((s, i) => (
              <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="mt-12">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>{s.label}</p>
                <p className="text-base leading-relaxed">{s.text}</p>
              </motion.section>
            ))}

            {!unlocked && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-12 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The full reading awaits</p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: C.muted }}>
                  Your Expression, Soul Urge, Personality, and Personal Year frequencies are calculated and ready. Unlock to see how all five numbers weave the precise frequency of who you are this lifetime.
                </p>
                <button onClick={() => setPaywallOpen(true)}
                  className="mt-6 inline-block rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                  Unlock Full Reading →
                </button>
              </motion.section>
            )}

            {unlocked && (
              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                className="mt-14 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>What your numbers say</p>
                <p className="font-serif text-xl italic leading-relaxed">"{reading.number_message}"</p>
              </motion.section>
            )}

            {unlocked && (
              <div className="mt-12 text-center">
                <button onClick={emailReading} disabled={emailState === "sending" || emailState === "sent"}
                  className="mb-6 inline-block rounded-none border px-8 py-3 text-[11px] uppercase tracking-[0.22em] disabled:opacity-50"
                  style={{ borderColor: `${C.gold}`, color: C.gold, background: "transparent" }}>
                  {emailState === "sending" ? "Sending…" : emailState === "sent" ? "✓ Sent to your inbox" : emailState === "error" ? "Try again" : "Email me this reading"}
                </button>
                <p className="text-sm mb-4" style={{ color: C.muted }}>See how your numbers fit your complete soul picture.</p>
                <Link to="/soul-profile" className="inline-block rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                  Get Your Full Soul Profile →
                </Link>
              </div>
            )}

            {unlocked && <KimAlfanoCard />}

            <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
              For educational &amp; inspirational purposes only.
            </p>
          </motion.div>
        )}
      </div>
      <PaywallModal slug="numerology" open={paywallOpen} email={email} onClose={() => setPaywallOpen(false)} onUnlocked={() => { setUnlocked(true); setPaywallOpen(false); }} />
    </motion.div>
  );
}
