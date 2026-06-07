import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PaywallModal } from "@/components/PaywallModal";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { isUnlocked } from "@/lib/unlocks";
import { calculateGeneKeys, GENE_KEY_TITLES, SPHERE_LABELS, type GeneKeySet } from "@/lib/geneKeys";
import { useScrollTopOnChange } from "@/hooks/useScrollTop";

export const Route = createFileRoute("/gene-keys")({
  head: () => ({
    meta: [
      { title: "Gene Key Reading — Soul True" },
      { name: "description", content: "Discover the 6 sacred Gene Keys encoded in your birth — Life's Work, Evolution, Radiance, Purpose, Pearl, and Venus." },
      { property: "og:title", content: "Gene Key Reading — Soul True" },
      { property: "og:description", content: "The 6 sacred keys encoded in your birth." },
    ],
  }),
  component: GeneKeysPage,
});

const C = {
  bg: "#0A0B09", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

type SphereKey = keyof GeneKeySet;
type SphereReading = { keyNumber: number; keyTitle: string; reading: string };
type Reading = Record<SphereKey, SphereReading>;

const SPHERE_ORDER: SphereKey[] = ["lifeWork", "evolution", "radiance", "purpose", "pearl", "venus"];

function GeneKeysPage() {
  const [step, setStep] = useState<"intake" | "loading" | "result" | "error">("intake");
  useScrollTopOnChange([step]);
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [keys, setKeys] = useState<GeneKeySet | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [savedState, setSavedState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => { setUnlocked(isUnlocked("gene-keys")); }, [step]);

  const submit = async () => {
    if (!birthDate || !birthCity.trim()) return;
    setStep("loading");
    setErrorMsg("");
    try {
      const computed = calculateGeneKeys(birthDate, birthTime || undefined);
      setKeys(computed);

      const { data, error } = await supabase.functions.invoke("gene-key-reading", {
        body: { ...computed, birthDate, birthCity: birthCity.trim() },
      });

      if (error) throw new Error(error.message || "Edge function error");
      if (!data || data.error) throw new Error(data?.error || "No reading returned");

      setReading(data.reading as Reading);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      setStep("result");
    } catch (e) {
      console.error("gene-keys submit error", e);
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("error");
    }
  };

  const saveReading = async () => {
    if (!reading || !keys) return;
    setSavedState("saving");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSavedState("idle");
        window.location.href = "/sign-in";
        return;
      }
      const { error } = await supabase.from("user_readings").insert({
        user_id: user.id,
        reading_type: "gene_keys",
        result_data: { keys, reading, birthDate, birthCity, birthTime } as never,
      });
      setSavedState(error ? "error" : "saved");
    } catch {
      setSavedState("error");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/readings" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← All Readings</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Gene Keys · $9.63</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "intake" && (
            <motion.div key="intake" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: C.gold }}>Begin</p>
              <h1 className="font-serif text-3xl font-light italic md:text-4xl" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                The 6 sacred keys encoded in your birth.
              </h1>
              <p className="mt-5 text-base" style={{ color: C.muted }}>
                Gene Keys are a synthesis of the I Ching, Human Design, astrology, and epigenetics — six spheres of light revealing the deepest pattern of your soul.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Date of Birth</label>
                  <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                    className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                    style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Time of Birth · Optional</label>
                  <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)}
                    className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                    style={{ borderColor: `${C.gold}66`, color: C.text, colorScheme: "dark" }} />
                  <p className="mt-2 text-xs" style={{ color: C.dim }}>
                    If unknown, we'll use solar noon. Exact time increases precision.
                  </p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>City of Birth</label>
                  <input type="text" value={birthCity} onChange={(e) => setBirthCity(e.target.value)}
                    placeholder="e.g. New York, NY"
                    className="mt-2 w-full rounded-none border bg-transparent px-5 py-4 text-base outline-none"
                    style={{ borderColor: `${C.gold}66`, color: C.text }} />
                </div>
              </div>

              <button onClick={submit} disabled={!birthDate || !birthCity.trim()}
                className="mt-10 block w-full rounded-none px-10 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_24px_rgba(232,130,26,0.5)] disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Reveal My Gene Keys →
              </button>
              <p className="mt-4 text-center text-[10px] italic" style={{ color: C.dim }}>
                For educational and inspirational purposes only.
              </p>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
              style={{ background: "rgba(10,11,9,0.94)", backdropFilter: "blur(6px)" }}
              aria-busy="true" aria-live="polite">
              <div className="h-32 w-32 animate-pulse rounded-full"
                style={{ background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`, filter: "blur(10px)" }} />
              <p className="mt-10 font-serif text-xl italic text-center" style={{ color: C.gold, fontFamily: '"Cormorant Garamond", serif' }}>
                Decoding your 6 sacred keys… please wait
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                This may take up to a minute
              </p>
            </motion.div>
          )}

          {step === "error" && (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <p className="font-serif text-2xl italic" style={{ color: C.gold, fontFamily: '"Cormorant Garamond", serif' }}>
                Your keys couldn't be revealed this time — please try again.
              </p>
              {errorMsg && <p className="mt-3 text-xs" style={{ color: C.dim }}>{errorMsg}</p>}
              <button onClick={() => { setStep("intake"); setErrorMsg(""); }}
                className="mt-8 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Try again
              </button>
            </motion.div>
          )}

          {step === "result" && reading && keys && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* All 6 key numbers preview */}
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your 6 Gene Keys</p>
                <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
                  {SPHERE_ORDER.map((s) => (
                    <div key={s} className="rounded-none border p-3"
                      style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                      <p className="text-[9px] uppercase tracking-[0.22em]" style={{ color: C.dim }}>{SPHERE_LABELS[s]}</p>
                      <p className="mt-1 font-serif text-3xl" style={{ color: C.gold, fontFamily: '"Cormorant Garamond", serif' }}>{keys[s]}</p>
                      <p className="text-[10px]" style={{ color: C.muted }}>{GENE_KEY_TITLES[keys[s]]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free: Life's Work */}
              <SphereCard sphere="lifeWork" data={reading.lifeWork} eyebrow="Free Preview · Your Life's Work Key" />

              <KimAlfanoCard />

              {/* Locked or full */}
              {!unlocked ? (
                <div className="mt-12 rounded-none border p-7 text-center"
                  style={{ borderColor: `${C.gold}55`, background: C.deep }}>
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your Full Gene Key Profile Awaits</p>
                  <h3 className="mt-3 font-serif text-2xl italic" style={{ color: C.text, fontFamily: '"Cormorant Garamond", serif' }}>
                    Evolution · Radiance · Purpose · Pearl · Venus
                  </h3>
                  <p className="mt-4 text-sm" style={{ color: C.muted }}>
                    Each key holds a mirror to a different dimension of your soul. Unlock your complete reading to receive them all.
                  </p>
                  <button onClick={() => setPaywallOpen(true)}
                    className="mt-6 inline-block rounded-none px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                    style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                    Unlock Full Reading →
                  </button>
                </div>
              ) : (
                <>
                  {SPHERE_ORDER.slice(1).map((s) => (
                    <SphereCard key={s} sphere={s} data={reading[s]} />
                  ))}

                  <div className="mt-12 text-center">
                    <button onClick={saveReading} disabled={savedState === "saving" || savedState === "saved"}
                      className="rounded-none px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em] disabled:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                      {savedState === "saving" ? "Saving…" : savedState === "saved" ? "✓ Saved" : "Save My Reading"}
                    </button>
                    {savedState === "error" && <p className="mt-2 text-xs" style={{ color: "#E8504C" }}>Could not save — please try again.</p>}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PaywallModal
        slug="gene-keys"
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        onUnlocked={() => { setUnlocked(true); setPaywallOpen(false); }}
      />
    </motion.div>
  );
}

function SphereCard({ sphere, data, eyebrow }: { sphere: SphereKey; data: SphereReading; eyebrow?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="mt-10 rounded-none border p-7"
      style={{ borderColor: `${C.gold}55`, background: C.deep, boxShadow: `0 0 32px -16px ${C.gold}44` }}
    >
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>{eyebrow}</p>
      )}
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>{SPHERE_LABELS[sphere]} Key</p>
      <h2 className="mt-2 font-serif text-3xl font-light italic" style={{ color: C.gold, fontFamily: '"Cormorant Garamond", serif' }}>
        Gene Key {data.keyNumber} — {data.keyTitle}
      </h2>
      <p className="mt-5 whitespace-pre-line text-base leading-relaxed" style={{ color: C.text, fontFamily: '"Outfit", sans-serif' }}>
        {data.reading}
      </p>
    </motion.section>
  );
}
