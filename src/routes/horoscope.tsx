import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PaywallModal } from "@/components/PaywallModal";

import { isUnlocked } from "@/lib/unlocks";
import { useScrollTopOnChange } from "@/hooks/useScrollTop";

export const Route = createFileRoute("/horoscope")({
  head: () => ({
    meta: [
      { title: "Daily Horoscope — Soul True Oracle" },
      { name: "description", content: "Soul True's daily oracle horoscope — free preview every day, full transmission when you go deeper." },
      { property: "og:title", content: "Daily Horoscope — Soul True Oracle" },
      { property: "og:description", content: "A daily oracle reading channeled for your sign." },
    ],
  }),
  component: HoroscopePage,
});

const SIGNS = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water" },
] as const;

type Sign = (typeof SIGNS)[number];

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "#E8821A", Earth: "#C9A84C", Air: "#C3A6D4", Water: "#7AB8D4",
};
const ENERGY_COLORS: Record<string, string> = {
  Low: "#7AB8D4", Building: "#C9A84C", High: "#E8821A", Intense: "#D4A017", Transformative: "#C3A6D4",
};

type FreeReading = {
  theme: string;
  message: string;
  shadow: string;
  activation: string;
  energy: string;
  domains: { love: string; purpose: string; wealth: string; spirit: string };
};
type DeepReading = {
  extended_message: string;
  deeper_shadow: string;
  soul_invitation: string;
  cosmic_context: string;
};

function HoroscopePage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);
  const [freeReading, setFreeReading] = useState<FreeReading | null>(null);
  useScrollTopOnChange([freeReading, deepReading]);
  const [deepReading, setDeepReading] = useState<DeepReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDeep, setLoadingDeep] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => { setUnlocked(isUnlocked("horoscope")); }, []);

  const callOracle = async (sign: Sign, mode: "free" | "deep") => {
    const isFree = mode === "free";
    if (isFree) {
      setLoading(true);
      setFreeReading(null);
      setDeepReading(null);
      setRevealed(false);
    } else {
      setLoadingDeep(true);
    }
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("horoscope-generate", {
        body: { sign: sign.name, element: sign.element, dates: sign.dates, mode },
      });
      if (fnError) throw new Error(fnError.message);
      if (!data || data.error || !data.reading) throw new Error(data?.error || "Empty reading");

      if (isFree) {
        setFreeReading(data.reading as FreeReading);
        setTimeout(() => setRevealed(true), 100);
      } else {
        setDeepReading(data.reading as DeepReading);
      }
    } catch (e) {
      console.error("horoscope failed", e);
      setError("The stars are veiled. Please try again.");
    } finally {
      if (isFree) setLoading(false);
      else setLoadingDeep(false);
    }
  };

  const handleSelect = (sign: Sign) => {
    setSelectedSign(sign);
    setDeepReading(null);
    callOracle(sign, "free");
  };

  const handleGoDeep = () => {
    if (unlocked && selectedSign) {
      callOracle(selectedSign, "deep");
    } else {
      setPaywallOpen(true);
    }
  };

  const onUnlocked = () => {
    setUnlocked(true);
    setPaywallOpen(false);
    if (selectedSign) callOracle(selectedSign, "deep");
  };

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", fontFamily: '"Outfit", sans-serif', color: "#F5F0E8" }}>
      <PaywallModal
        slug="horoscope"
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onUnlocked={onUnlocked}
      />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "48px 24px 32px", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#C9A84C", textTransform: "uppercase", marginBottom: "12px" }}>
          Soul True · Daily Oracle
        </div>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(30px,5vw,50px)", fontWeight: 400, margin: "0 0 8px" }}>
          {selectedSign ? `${selectedSign.name} · ${selectedSign.symbol}` : "Daily Horoscope"}
        </h1>
        <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.35)", letterSpacing: "1px" }}>{today}</div>
        <div style={{ marginTop: 14 }}>
          <Link to="/readings" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)" }}>
            ← All Readings
          </Link>
        </div>
      </div>

      {/* Sign Grid */}
      <div style={{ padding: "32px 20px 0", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "rgba(201,168,76,0.5)", textTransform: "uppercase", marginBottom: "14px", textAlign: "center" }}>
          Select your sign
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: "8px" }}>
          {SIGNS.map((sign) => {
            const active = selectedSign?.name === sign.name;
            return (
              <button key={sign.name} onClick={() => handleSelect(sign)} style={{
                background: active ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                border: active ? "1px solid rgba(201,168,76,0.45)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px", padding: "12px 8px", cursor: "pointer", textAlign: "center",
                transition: "all 0.2s", color: active ? "#D4A017" : "#F5F0E8",
              }}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{sign.symbol}</div>
                <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", opacity: active ? 1 : 0.65 }}>{sign.name}</div>
                <div style={{ fontSize: "9px", color: ELEMENT_COLORS[sign.element], letterSpacing: "1px", marginTop: "2px" }}>{sign.element}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reading */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px 60px" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.25)", borderTop: "1px solid #C9A84C", margin: "0 auto 20px", animation: "horoscopeSpin 1.5s linear infinite" }} />
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "18px", color: "rgba(245,240,232,0.4)", fontStyle: "italic" }}>Reading the stars…</div>
            <style>{`@keyframes horoscopeSpin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && <div style={{ textAlign: "center", padding: "40px", color: "rgba(245,240,232,0.4)", fontStyle: "italic" }}>{error}</div>}

        {freeReading && !loading && (
          <div style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease" }}>

            {/* Theme + Energy */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "6px" }}>Today's Theme</div>
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "26px", fontWeight: 500, color: "#D4A017" }}>{freeReading.theme}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "6px" }}>Energy</div>
                <div style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: ENERGY_COLORS[freeReading.energy] || "#C9A84C", border: `1px solid ${ENERGY_COLORS[freeReading.energy] || "#C9A84C"}40`, padding: "4px 12px", borderRadius: "20px" }}>
                  {freeReading.energy}
                </div>
              </div>
            </div>

            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)", marginBottom: "28px" }} />

            {/* Oracle Message */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "14px" }}>Oracle Message</div>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(17px,2.5vw,21px)", lineHeight: 1.8, color: "#F5F0E8", margin: 0 }}>
                {freeReading.message}
              </p>
            </div>

            {/* Shadow */}
            <div style={{ background: "rgba(195,166,212,0.05)", border: "1px solid rgba(195,166,212,0.12)", borderRadius: "8px", padding: "18px 22px", marginBottom: "28px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(195,166,212,0.55)", marginBottom: "10px" }}>Shadow Work</div>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "17px", lineHeight: 1.7, color: "rgba(245,240,232,0.65)", margin: 0, fontStyle: "italic" }}>{freeReading.shadow}</p>
            </div>

            {/* Domains */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "14px" }}>Life Domains</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {Object.entries(freeReading.domains).map(([domain, text]) => {
                  const icons: Record<string, string> = { love: "♡", purpose: "◈", wealth: "◎", spirit: "✦" };
                  const colors: Record<string, string> = { love: "#D4536A", purpose: "#E8821A", wealth: "#C9A84C", spirit: "#C3A6D4" };
                  return (
                    <div key={domain} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                        <span style={{ fontSize: "13px", color: colors[domain] }}>{icons[domain]}</span>
                        <span style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: colors[domain], opacity: 0.75 }}>{domain}</span>
                      </div>
                      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "15px", lineHeight: 1.6, color: "rgba(245,240,232,0.7)", margin: 0 }}>{text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activation */}
            <div style={{ textAlign: "center", padding: "28px 24px", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "8px", marginBottom: "32px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "14px" }}>Soul Activation</div>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(17px,3vw,22px)", fontStyle: "italic", color: "#D4A017", margin: 0, lineHeight: 1.6 }}>
                "{freeReading.activation}"
              </p>
            </div>

            {/* Deep reading block */}
            {loadingDeep && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.25)", borderTop: "1px solid #C9A84C", margin: "0 auto 16px", animation: "horoscopeSpin 1.5s linear infinite" }} />
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "16px", color: "rgba(245,240,232,0.4)", fontStyle: "italic" }}>Channeling the deeper transmission…</div>
              </div>
            )}

            {deepReading && !loadingDeep && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "14px" }}>Full Oracle Transmission</div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 19, lineHeight: 1.8, color: "#F5F0E8", margin: "0 0 22px" }}>
                  {deepReading.extended_message}
                </p>
                <div style={{ background: "rgba(195,166,212,0.05)", border: "1px solid rgba(195,166,212,0.12)", borderRadius: 8, padding: "18px 22px", marginBottom: 22 }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(195,166,212,0.55)", marginBottom: 10 }}>Deeper Shadow</div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 17, lineHeight: 1.7, color: "rgba(245,240,232,0.75)", margin: 0, fontStyle: "italic" }}>
                    {deepReading.deeper_shadow}
                  </p>
                </div>
                <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, padding: "18px 22px", marginBottom: 22 }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#C9A84C", marginBottom: 10 }}>Soul Invitation</div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, lineHeight: 1.7, color: "#F5F0E8", margin: 0 }}>
                    {deepReading.soul_invitation}
                  </p>
                </div>
                <div style={{ padding: "18px 22px", border: "1px dashed rgba(201,168,76,0.25)", borderRadius: 8 }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: 10 }}>Cosmic Context</div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 16, lineHeight: 1.7, color: "rgba(245,240,232,0.75)", margin: 0 }}>
                    {deepReading.cosmic_context}
                  </p>
                </div>
              </div>
            )}

            {/* Go Deep CTA — when not yet shown */}
            {!deepReading && !loadingDeep && (
              <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", marginBottom: "32px" }}>
                <div style={{ padding: "28px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "10px", filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "12px" }}>Full Oracle Transmission</div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "18px", lineHeight: 1.8, color: "#F5F0E8", margin: "0 0 16px" }}>
                    The cosmos has more to say. Your full reading goes deeper into the soul-level forces at work — the patterns beneath the patterns, the invitation beneath the invitation…
                  </p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,232,0.6)", fontStyle: "italic", margin: 0 }}>
                    What shadow is running quietly beneath your conscious awareness today? What is the cosmos specifically asking of you this week?
                  </p>
                </div>
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,0.75))",
                  borderRadius: "10px", padding: "24px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "10px", color: "#C9A84C" }}>✦</div>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", color: "#F5F0E8", marginBottom: "6px" }}>
                    Your full reading is waiting
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.5)", marginBottom: "20px" }}>
                    {unlocked ? "You have access — reveal the full transmission" : "Starting at $0.99 — nothing held back"}
                  </div>
                  <button
                    onClick={handleGoDeep}
                    style={{
                      background: "linear-gradient(135deg,#C9A84C,#D4A017)",
                      color: "#0A0A0A",
                      border: "1px solid #C9A84C",
                      padding: "12px 28px",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {unlocked ? "Reveal Full Reading" : "Go Deeper →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedSign && !loading && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(245,240,232,0.4)", fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: 18 }}>
            Choose your sign above to receive today's oracle.
          </div>
        )}

        <p style={{ marginTop: 40, textAlign: "center", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)" }}>
          For educational & inspirational purposes only
        </p>
      </div>
    </div>
  );
}
