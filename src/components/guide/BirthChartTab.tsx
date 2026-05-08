import { useState, useEffect, useRef, useCallback } from "react";
import { Orbit, ArrowRight, Star, RotateCcw, Mail, Download } from "lucide-react";
import { C, fonts, Emblem, Eyebrow, HeroTitle, GoldText, GoldRule } from "./GuideShared";
import { calculateBirthChart, COUNTRIES, TIMEZONE_OFFSETS, getApproxCoords, type BirthChart } from "@/lib/astrology";
import { supabase } from "@/integrations/supabase/client";

/* ═══════ CONSTANTS ═══════ */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 100 }, (_, i) => 2010 - i); // 1911–2010
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const LOADING_MESSAGES = [
  "Calculating your planetary positions...",
  "Reading the stars at your moment of birth...",
  "Connecting your chart to your soul's mission...",
  "Preparing your personalized Soul True reading...",
];

/* ═══════ ZODIAC WHEEL SVG ═══════ */
function ZodiacWheel() {
  const glyphs = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  return (
    <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 200 200" className="animate-spin" style={{ animationDuration: "30s" }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="70" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.2" />
        <circle cx="100" cy="100" r="50" fill="none" stroke={C.gold} strokeWidth="0.5" opacity="0.15" />
        {glyphs.map((g, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180;
          const x = 100 + 80 * Math.cos(angle);
          const y = 100 + 80 * Math.sin(angle);
          return (
            <text key={i} x={x} y={y} fill={C.gold} fontSize="14" textAnchor="middle" dominantBaseline="central" opacity="0.7">
              {g}
            </text>
          );
        })}
        {/* Lines between signs */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = 100 + 60 * Math.cos(angle);
          const y1 = 100 + 60 * Math.sin(angle);
          const x2 = 100 + 92 * Math.cos(angle);
          const y2 = 100 + 92 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gold} strokeWidth="0.5" opacity="0.2" />;
        })}
      </svg>
    </div>
  );
}

/* ═══════ SELECT COMPONENT ═══════ */
function Select({ label, value, onChange, options, placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: fonts.body, color: C.muted }}>
        {label} {required && <span style={{ color: C.gold }}>*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-current"
        style={{ borderColor: C.border, color: value ? C.text : C.dim, fontFamily: fonts.body, backgroundColor: C.card }}
      >
        <option value="" style={{ backgroundColor: C.card, color: C.dim }}>{placeholder}</option>
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ backgroundColor: C.card, color: C.text }}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, required, type = "text", note }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; required?: boolean; type?: string; note?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: fonts.body, color: C.muted }}>
        {label} {required && <span style={{ color: C.gold }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-current placeholder:opacity-40"
        style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body, backgroundColor: C.card }}
      />
      {note && <p className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>{note}</p>}
    </div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export function BirthChartTab() {
  const [phase, setPhase] = useState<"form" | "loading" | "reading">("form");

  /* form state */
  const [fullName, setFullName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthHour, setBirthHour] = useState("");
  const [birthMinute, setBirthMinute] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [birthState, setBirthState] = useState("");
  const [birthCountry, setBirthCountry] = useState("");
  const [email, setEmail] = useState("");

  /* loading state */
  const [loadingMsg, setLoadingMsg] = useState(0);

  /* reading state */
  const [reading, setReading] = useState("");
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [streamDone, setStreamDone] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  /* cycle loading messages */
  useEffect(() => {
    if (phase !== "loading") return;
    const iv = setInterval(() => setLoadingMsg(m => (m + 1) % LOADING_MESSAGES.length), 2500);
    return () => clearInterval(iv);
  }, [phase]);

  const canSubmit = fullName && birthMonth && birthDay && birthYear && birthCity && birthCountry && email;

  const handleGenerate = useCallback(async () => {
    if (!canSubmit) return;
    setPhase("loading");
    setReading("");
    setStreamDone(false);

    // Calculate chart
    const coords = getApproxCoords(birthCountry);
    const hasBirthTime = birthHour !== "";
    const chartData = calculateBirthChart({
      year: parseInt(birthYear),
      month: parseInt(birthMonth),
      day: parseInt(birthDay),
      hour: hasBirthTime ? parseInt(birthHour) : undefined,
      minute: hasBirthTime && birthMinute ? parseInt(birthMinute) : undefined,
      latitude: coords.lat,
      longitude: coords.lon,
      timezoneOffset: TIMEZONE_OFFSETS[birthCountry] ?? 0,
    });
    setChart(chartData);

    // Prepare chart summary for AI
    const chartSummary = {
      name: fullName,
      birthDate: `${MONTHS[parseInt(birthMonth) - 1]} ${birthDay}, ${birthYear}`,
      birthTime: hasBirthTime ? `${birthHour}:${(birthMinute || "0").padStart(2, "0")}` : "Unknown",
      birthPlace: `${birthCity}, ${birthCountry}`,
      planets: chartData.planets.map(p => ({
        name: p.name,
        sign: p.sign,
        degree: p.degree,
        ...(p.house ? { house: p.house } : {}),
      })),
      ascendant: chartData.ascendant ? {
        sign: chartData.ascendant.sign,
        degree: chartData.ascendant.degree,
      } : null,
      aspects: chartData.aspects.map(a => ({
        planets: `${a.planet1} - ${a.planet2}`,
        type: a.type,
        orb: a.orb,
      })),
    };

    // Stream from AI
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/birth-chart-reading`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ chartData: chartSummary, name: fullName }),
          signal: controller.signal,
        }
      );

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Unknown error" }));
        console.error("Reading error:", err);
        setReading("We weren't able to generate your reading at this time. Please try again in a moment.");
        setPhase("reading");
        setStreamDone(true);
        return;
      }

      setPhase("reading");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let nlIdx: number;
        while ((nlIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nlIdx);
          buffer = buffer.slice(nlIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setReading(fullText);
            }
          } catch { /* partial JSON */ }
        }
      }

      setStreamDone(true);
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("Stream error:", e);
        setReading("We weren't able to generate your reading at this time. Please try again in a moment.");
        setPhase("reading");
        setStreamDone(true);
      }
    }
  }, [canSubmit, fullName, birthMonth, birthDay, birthYear, birthHour, birthMinute, birthCity, birthCountry, email]);

  const handleReset = () => {
    abortRef.current?.abort();
    setPhase("form");
    setReading("");
    setChart(null);
    setStreamDone(false);
  };

  /* ── FORM ── */
  if (phase === "form") {
    return (
      <div className="py-16">
        <div className="text-center">
          <Emblem icon={<Orbit size={28} />} />
          <Eyebrow>Birth Chart Reader</Eyebrow>
          <HeroTitle>Discover Your <GoldText>Soul Blueprint</GoldText></HeroTitle>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
            Your birth chart is a cosmic snapshot of the sky at the exact moment you arrived on Earth. It reveals your soul's gifts, challenges, and sacred mission in this lifetime.
          </p>
        </div>

        <GoldRule />

        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border p-8" style={{ backgroundColor: C.card, borderColor: C.border }}>
            {/* Logo at top */}
            <div className="mb-8 text-center">
              <span className="text-2xl font-light tracking-wider" style={{ fontFamily: fonts.display, color: C.gold }}>
                Soul True
              </span>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.body, color: C.muted }}>
                Birth Chart Reading
              </p>
            </div>

            <div className="space-y-5">
              <TextInput label="Full Name" value={fullName} onChange={setFullName} placeholder="Your full name" required />

              {/* Birth date */}
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: fonts.body, color: C.muted }}>
                  Birth Date <span style={{ color: C.gold }}>*</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Select label="" value={birthMonth} onChange={setBirthMonth}
                    options={MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))} placeholder="Month" />
                  <Select label="" value={birthDay} onChange={setBirthDay}
                    options={DAYS.map(d => ({ value: String(d), label: String(d) }))} placeholder="Day" />
                  <Select label="" value={birthYear} onChange={setBirthYear}
                    options={YEARS.map(y => ({ value: String(y), label: String(y) }))} placeholder="Year" />
                </div>
              </div>

              {/* Birth time */}
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: fonts.body, color: C.muted }}>
                  Birth Time <span className="normal-case tracking-normal" style={{ color: C.dim }}>(optional)</span>
                </p>
                <p className="mb-2 text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>
                  More accurate reading with birth time
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Select label="" value={birthHour} onChange={setBirthHour}
                    options={HOURS.map(h => ({ value: String(h), label: `${h.toString().padStart(2, "0")}:00` }))} placeholder="Hour" />
                  <Select label="" value={birthMinute} onChange={setBirthMinute}
                    options={MINUTES.map(m => ({ value: String(m), label: `:${m.toString().padStart(2, "0")}` }))} placeholder="Min" />
                </div>
              </div>

              <TextInput label="Birth City" value={birthCity} onChange={setBirthCity} placeholder="City you were born in" required note="City you were born in" />

              <TextInput label="State / Province" value={birthState} onChange={setBirthState} placeholder="State or Province (recommended for accuracy)" note="Helps distinguish cities with the same name" />

              <Select label="Birth Country" value={birthCountry} onChange={setBirthCountry} required
                options={COUNTRIES.map(c => ({ value: c, label: c }))} placeholder="Select country" />

              <TextInput label="Email Address" value={email} onChange={setEmail} placeholder="your@email.com" required type="email" />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!canSubmit}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded px-6 py-3.5 text-xs font-medium uppercase tracking-[0.22em] transition-opacity disabled:opacity-40"
              style={{ backgroundColor: C.gold, color: C.bg, fontFamily: fonts.body }}
            >
              Generate My Birth Chart Reading <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── LOADING ── */
  if (phase === "loading") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center py-20">
        {/* Pulsing logo */}
        <div className="mb-10 animate-pulse">
          <span className="text-3xl font-light tracking-wider" style={{ fontFamily: fonts.display, color: C.gold }}>
            Soul True
          </span>
        </div>

        {/* Zodiac wheel */}
        <ZodiacWheel />

        {/* Loading message */}
        <p
          className="mt-10 text-center text-sm transition-opacity duration-500"
          style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}
          key={loadingMsg}
        >
          {LOADING_MESSAGES[loadingMsg]}
        </p>

        {/* Subtle progress dots */}
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: C.gold,
                animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
        <style>{`
          @keyframes pulse { 0%,100% { opacity:0.2; transform:scale(1); } 50% { opacity:1; transform:scale(1.4); } }
        `}</style>
      </div>
    );
  }

  /* ── READING ── */
  if (phase === "reading") {
    // Format the reading text into sections
    const sections = reading.split(/\n(?=#{1,3}\s|\d+\.\s|[A-Z]{2,})/g).filter(Boolean);

    return (
      <div className="py-12">
        {/* Header */}
        <div className="text-center">
          <Emblem icon={<Orbit size={28} />} />
          <Eyebrow>Your Birth Chart Reading</Eyebrow>
          <h2 className="mt-4 text-3xl font-light md:text-4xl" style={{ fontFamily: fonts.display, color: C.gold, lineHeight: 1.2 }}>
            {fullName}'s Soul Blueprint
          </h2>
          {chart && (
            <div className="mx-auto mt-4 flex max-w-md flex-wrap justify-center gap-2">
              {chart.planets.slice(0, 3).map(p => (
                <span key={p.name} className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider"
                  style={{ borderColor: `${C.gold}40`, color: C.gold, fontFamily: fonts.body }}>
                  {p.name}: {p.sign} {p.degree}°
                </span>
              ))}
              {chart.ascendant && (
                <span className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider"
                  style={{ borderColor: `${C.gold}40`, color: C.gold, fontFamily: fonts.body }}>
                  Rising: {chart.ascendant.sign} {chart.ascendant.degree}°
                </span>
              )}
            </div>
          )}
        </div>

        <GoldRule />

        {/* Planetary positions summary */}
        {chart && (
          <div className="mx-auto mb-10 max-w-2xl">
            <div className="rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
                Your Planetary Positions
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {chart.planets.map(p => (
                  <div key={p.name} className="flex items-center justify-between border-b py-1.5" style={{ borderColor: `${C.border}80` }}>
                    <span className="text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>{p.name}</span>
                    <span className="text-xs font-medium" style={{ fontFamily: fonts.body, color: C.text }}>
                      {p.sign} {p.degree}°{p.house ? ` (H${p.house})` : ""}
                    </span>
                  </div>
                ))}
                {chart.ascendant && (
                  <div className="flex items-center justify-between border-b py-1.5" style={{ borderColor: `${C.border}80` }}>
                    <span className="text-xs" style={{ fontFamily: fonts.body, color: C.muted }}>Ascendant</span>
                    <span className="text-xs font-medium" style={{ fontFamily: fonts.body, color: C.text }}>
                      {chart.ascendant.sign} {chart.ascendant.degree}°
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AI Reading */}
        <div className="mx-auto max-w-2xl">
          <div className="prose-invert prose prose-sm max-w-none" style={{ fontFamily: fonts.body, color: C.text }}>
            {reading.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={i} className="h-4" />;
              // Headings
              if (trimmed.startsWith("### ")) {
                return <h4 key={i} className="mb-2 mt-8 text-base font-light" style={{ fontFamily: fonts.display, color: C.gold }}>{trimmed.slice(4)}</h4>;
              }
              if (trimmed.startsWith("## ")) {
                return <h3 key={i} className="mb-3 mt-10 text-xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>{trimmed.slice(3)}</h3>;
              }
              if (trimmed.startsWith("# ")) {
                return <h2 key={i} className="mb-4 mt-10 text-2xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>{trimmed.slice(2)}</h2>;
              }
              // Bold section headers like **THE SUN**
              if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                return <h3 key={i} className="mb-3 mt-10 text-lg font-light" style={{ fontFamily: fonts.display, color: C.gold }}>{trimmed.slice(2, -2)}</h3>;
              }
              // Numbered sections
              const numMatch = trimmed.match(/^(\d+)\.\s+\*\*(.*?)\*\*/);
              if (numMatch) {
                const rest = trimmed.slice(numMatch[0].length).trim().replace(/^[—–-]\s*/, "");
                return (
                  <div key={i}>
                    <h3 className="mb-2 mt-10 text-lg font-light" style={{ fontFamily: fonts.display, color: C.gold }}>
                      {numMatch[2]}
                    </h3>
                    {rest && <p className="text-sm leading-relaxed" style={{ color: C.text, fontWeight: 300 }}>{rest}</p>}
                  </div>
                );
              }
              // Regular paragraph — render bold/italic inline
              return (
                <p key={i} className="text-sm leading-relaxed" style={{ fontWeight: 300 }}
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      .replace(/\*\*(.*?)\*\*/g, `<strong style="color:${C.gold};font-weight:500">$1</strong>`)
                      .replace(/\*(.*?)\*/g, `<em>$1</em>`),
                  }}
                />
              );
            })}
            {!streamDone && (
              <span className="inline-block h-4 w-1 animate-pulse" style={{ backgroundColor: C.gold }} />
            )}
          </div>
        </div>

        {/* Actions */}
        {streamDone && (
          <>
            <GoldRule />
            <div className="mx-auto flex max-w-md flex-col items-center gap-3">
              <button
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded border px-6 py-3 text-xs font-medium uppercase tracking-[0.22em]"
                style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
              >
                <RotateCcw size={14} /> Generate Another Reading
              </button>
              <a
                href="mailto:highervibrations36@gmail.com?subject=Soul%20True%20Birth%20Chart%20Session"
                className="flex w-full items-center justify-center gap-2 rounded border px-6 py-3 text-xs font-medium uppercase tracking-[0.22em]"
                style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
              >
                <Mail size={14} /> Book a Deep-Dive Session
              </a>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}
