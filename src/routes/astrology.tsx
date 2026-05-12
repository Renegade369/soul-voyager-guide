import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/astrology")({
  head: () => ({
    meta: [
      { title: "Astrology Reader — Soul True" },
      { name: "description", content: "Your natal chart interpreted in Soul True's voice. Birth date, time, and place — read with depth." },
      { property: "og:title", content: "Astrology Reader — Soul True" },
      { property: "og:description", content: "Your natal chart, read in Soul True's voice." },
    ],
  }),
  component: AstrologyPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

type Reading = {
  sun_sign: string; moon_sign: string; rising_sign: string;
  mercury_sign: string; venus_sign: string; mars_sign: string;
  cosmic_blueprint: string; your_sun: string; your_moon: string; your_rising: string;
  your_inner_planets: string; your_current_sky: string; cosmic_message: string; closing: string;
};

function StarField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 2, height: 1 + Math.random() * 2,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            background: i % 5 === 0 ? C.gold : C.text,
            opacity: 0.3 + Math.random() * 0.6,
            boxShadow: i % 5 === 0 ? `0 0 4px ${C.gold}` : "none",
          }} />
      ))}
    </div>
  );
}

function AstrologyPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [birthPlace, setBirthPlace] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [step, setStep] = useState<"intake" | "loading" | "result" | "error">("intake");
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const emailReading = async () => {
    if (!reading) return;
    setEmailState("sending");
    const placements = [
      ["Sun", reading.sun_sign], ["Moon", reading.moon_sign], ["Rising", reading.rising_sign],
      ["Mercury", reading.mercury_sign], ["Venus", reading.venus_sign], ["Mars", reading.mars_sign],
    ].filter(([, v]) => !!v).map(([l, v]) => `${l}: ${v}`).join("  ·  ");
    const sections = [
      { label: "Your Placements", body: placements },
      { label: "Your Cosmic Blueprint", body: reading.cosmic_blueprint },
      { label: "Your Sun", body: reading.your_sun },
      { label: "Your Moon", body: reading.your_moon },
      ...(reading.your_rising && reading.rising_sign ? [{ label: "Your Rising", body: reading.your_rising }] : []),
      { label: "Your Inner Planets", body: reading.your_inner_planets },
      { label: "Your Current Sky", body: reading.your_current_sky },
      { label: "Your Cosmic Message", body: reading.cosmic_message },
      { label: "From Soul True", body: reading.closing },
    ];
    try {
      const { error } = await supabase.functions.invoke("send-reading-email", {
        body: { email: email.trim().toLowerCase(), title: "Your Astrology Reading", sections },
      });
      setEmailState(error ? "error" : "sent");
    } catch {
      setEmailState("error");
    }
  };

  const submit = async () => {
    if (!birthDate || !birthPlace.trim() || !email.trim()) return;
    setStep("loading");
    try {
      const { data, error } = await supabase.functions.invoke("astrology-generate", {
        body: { birthDate, birthTime: unknownTime ? "unknown" : birthTime, birthPlace: birthPlace.trim() },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      const r = data.reading as Reading;
      setReading(r);
      setStep("result");
      void supabase.from("subscribers").insert({ email: email.trim().toLowerCase(), source: "astrology", opted_in_consciousness_map: optIn });
      if (optIn) void supabase.from("consciousness_data").insert({ reader_type: "astrology", sun_sign: r.sun_sign });
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("error");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      {step === "result" && <StarField />}
      <div className="relative mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Soul True</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Astrology</span>
        </div>

        {step === "intake" && (
          <>
            <h1 className="font-serif text-5xl font-light italic">Your chart</h1>
            <p className="mt-4 text-base" style={{ color: C.muted }}>If you know your birth time we can read your rising sign and houses. If not, sun and moon will lead the way.</p>
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
                <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Place of birth</label>
                <input type="text" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, Country"
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
              <span>Contribute my anonymized reading to the Soul True Consciousness Map.</span>
            </label>
            <button onClick={submit} disabled={!birthDate || !birthPlace.trim() || !email.trim()}
              className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
              Read My Chart →
            </button>
          </>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center py-24">
            <div className="h-32 w-32 animate-pulse rounded-full" style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
            <p className="mt-10 font-serif text-xl italic" style={{ color: C.gold }}>Reading the sky…</p>
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
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your cosmic blueprint</p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center sm:grid-cols-6">
                {[
                  ["Sun", reading.sun_sign, "☉"], ["Moon", reading.moon_sign, "☾"],
                  ["Rising", reading.rising_sign, "↑"], ["Mercury", reading.mercury_sign, "☿"],
                  ["Venus", reading.venus_sign, "♀"], ["Mars", reading.mars_sign, "♂"],
                ].filter(([, v]) => !!v).map(([label, val, sym]) => (
                  <div key={label} className="rounded-none border p-3" style={{ borderColor: `${C.gold}40`, background: "rgba(201,168,76,0.03)" }}>
                    <p className="text-2xl" style={{ color: C.gold }}>{sym}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.25em]" style={{ color: C.muted }}>{label}</p>
                    <p className="mt-1 text-sm font-serif italic">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-12 font-serif text-xl italic leading-relaxed">{reading.cosmic_blueprint}</motion.p>

            {[
              { label: "Your Sun", text: reading.your_sun },
              { label: "Your Moon", text: reading.your_moon },
              ...(reading.your_rising && reading.rising_sign ? [{ label: "Your Rising", text: reading.your_rising }] : []),
              { label: "Your Inner Planets", text: reading.your_inner_planets },
              { label: "Your Current Sky", text: reading.your_current_sky },
            ].map((s, i) => (
              <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }} className="mt-12">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>{s.label}</p>
                <p className="text-base leading-relaxed">{s.text}</p>
              </motion.section>
            ))}

            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="mt-14 rounded-none border p-8 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: C.gold }}>Your cosmic message</p>
              <p className="font-serif text-xl italic leading-relaxed">"{reading.cosmic_message}"</p>
            </motion.section>

            <p className="mt-10 text-center text-sm leading-relaxed" style={{ color: C.muted }}>{reading.closing}</p>

            <div className="mt-12 text-center">
              <Link to="/soul-profile" className="inline-block rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Get Your Full Soul Profile →
              </Link>
            </div>
            <p className="mt-12 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
              For educational &amp; inspirational purposes only.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
