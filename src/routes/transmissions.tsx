import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { loadSoulProfile, getTransmissionAccess, type SoulProfileSnapshot } from "@/lib/soulProfile";

export const Route = createFileRoute("/transmissions")({
  head: () => ({
    meta: [
      { title: "Frequency Transmissions — Soul True" },
      { name: "description", content: "A personalized spoken transmission drawn from the depths of your soul profile. Soul True's signature offering." },
      { property: "og:title", content: "Frequency Transmissions — Soul True" },
      { property: "og:description", content: "A personalized spoken transmission drawn from the depths of your soul profile." },
    ],
  }),
  component: TransmissionsPage,
});

const C = {
  bg: "#0A0B09", deep: "#1A1209", gold: "#C9A84C", goldAlt: "#D4A017",
  text: "#F5F0E8", muted: "rgba(245,240,232,0.7)", dim: "rgba(245,240,232,0.45)",
  glow: "#E8821A",
};
const fontHeading = '"Cormorant Garamond", serif';
const fontBody = '"Outfit", sans-serif';

type Step = "gate" | "checkin" | "intention" | "loading" | "paywall" | "player" | "post";

const EMOTIONAL_STATES = [
  { id: "seeking-clarity", label: "Seeking Clarity", glyph: "◉" },
  { id: "heavy-burdened", label: "Heavy or Burdened", glyph: "☷" },
  { id: "open-receptive", label: "Open and Receptive", glyph: "◯" },
  { id: "anxious-unsettled", label: "Anxious or Unsettled", glyph: "≋" },
  { id: "grateful-expanding", label: "Grateful and Expanding", glyph: "✶" },
  { id: "numb-disconnected", label: "Numb or Disconnected", glyph: "◌" },
  { id: "activated-ready", label: "Activated and Ready", glyph: "⚡" },
  { id: "grieving-releasing", label: "Grieving or Releasing", glyph: "❍" },
  { id: "in-transition", label: "In Transition", glyph: "◐" },
  { id: "simply-present", label: "Simply Present", glyph: "•" },
];

const INTENTIONS = [
  { id: "healing", label: "Healing", glyph: "🜂", desc: "Restore what has been wounded" },
  { id: "clarity", label: "Clarity", glyph: "✦", desc: "Cut through the noise and see true" },
  { id: "abundance", label: "Abundance", glyph: "◈", desc: "Open to receive in all forms" },
  { id: "protection", label: "Protection", glyph: "⊕", desc: "Seal your field and stand sovereign" },
  { id: "activation", label: "Activation", glyph: "⚡", desc: "Ignite what is ready to awaken" },
];

const LOADING_LINES = [
  "Reading your soul's frequency...",
  "Weaving your transmission...",
  "Your transmission is arriving...",
];

function TransmissionsPage() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState<Step>("gate");
  const [emotionalState, setEmotionalState] = useState<string>("");
  const [intention, setIntention] = useState<string>("");
  const [script, setScript] = useState("");
  const [seal, setSeal] = useState("");
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [audioMessage, setAudioMessage] = useState<string | null>(null);
  const [profileSnap, setProfileSnap] = useState<SoulProfileSnapshot>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [access, setAccess] = useState<{ credits: number; allAccess: boolean }>({ credits: 0, allAccess: false });

  // Move past gate when signed in
  useEffect(() => {
    if (authLoading) return;
    if (user && step === "gate") setStep("checkin");
    if (!user && step !== "gate") setStep("gate");
  }, [user, authLoading, step]);

  useEffect(() => {
    if (user) getTransmissionAccess(user.id).then(setAccess);
  }, [user, step]);

  const emotionalLabel = useMemo(
    () => EMOTIONAL_STATES.find((e) => e.id === emotionalState)?.label ?? "",
    [emotionalState],
  );
  const intentionLabel = useMemo(
    () => INTENTIONS.find((i) => i.id === intention)?.label ?? "",
    [intention],
  );

  const handleGenerate = async () => {
    if (!user) return;
    setStep("loading");
    setErrorMsg("");
    try {
      const snap = await loadSoulProfile(user.id);
      setProfileSnap(snap);

      const { data, error } = await supabase.functions.invoke("generate-transmission-text", {
        body: { emotionalState: emotionalLabel, intention: intentionLabel, soulProfile: snap },
      });
      if (error) throw new Error(error.message || "Transmission could not be channeled");
      if (!data || data.error || !data.script) throw new Error(data?.error || "Empty transmission");

      setScript(data.script);
      setSeal(data.seal || "");

      // After text is ready, gate audio behind paywall (or All Access)
      if (access.allAccess || access.credits > 0) {
        await fetchAudio(data.script);
        setStep("player");
      } else {
        setStep("paywall");
      }
    } catch (e) {
      console.error("generate transmission failed", e);
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setStep("checkin");
    }
  };

  const fetchAudio = async (scriptText: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("generate-transmission-audio", {
        body: { script: scriptText },
      });
      if (error) throw new Error(error.message);
      setAudioPath(data?.audioPath ?? null);
      setSignedUrl(data?.signedUrl ?? null);
      setAudioMessage(data?.message ?? null);
    } catch (e) {
      console.error("audio failed", e);
      setAudioMessage("Your transmission has been prepared. Audio is temporarily unavailable — return shortly to receive it as sound.");
    }
  };

  const reset = () => {
    setStep("checkin");
    setEmotionalState("");
    setIntention("");
    setScript("");
    setSeal("");
    setAudioPath(null);
    setSignedUrl(null);
    setAudioMessage(null);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen px-4 py-12 md:px-6 md:py-20" style={{ background: C.bg, color: C.text, fontFamily: fontBody }}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Home</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Frequency Transmissions</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "gate" && <LoginGate key="gate" />}
          {step === "checkin" && (
            <CheckIn key="checkin" value={emotionalState} onChange={setEmotionalState}
              onContinue={() => setStep("intention")} errorMsg={errorMsg} />
          )}
          {step === "intention" && (
            <IntentionStep key="intent" value={intention} onChange={setIntention}
              onBack={() => setStep("checkin")} onContinue={handleGenerate} />
          )}
          {step === "loading" && <Loading key="loading" />}
          {step === "paywall" && (
            <Paywall key="paywall" onUnlocked={async () => {
              await fetchAudio(script);
              setStep("player");
            }} script={script} />
          )}
          {step === "player" && (
            <Player key="player"
              script={script}
              seal={seal}
              signedUrl={signedUrl}
              audioMessage={audioMessage}
              emotional={emotionalLabel}
              intention={intentionLabel}
              onDone={() => setStep("post")}
            />
          )}
          {step === "post" && (
            <PostScreen key="post"
              userId={user?.id}
              emotional={emotionalLabel}
              intention={intentionLabel}
              script={script}
              seal={seal}
              audioPath={audioPath}
              profileSnap={profileSnap}
              onAnother={reset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------- STEPS ----------

function LoginGate() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="py-20 text-center">
      <div className="mx-auto mb-10 h-24 w-24 rounded-full" style={{
        background: `radial-gradient(circle, ${C.glow}, ${C.gold} 40%, transparent 70%)`,
        filter: "blur(8px)", animation: "pulse 4s ease-in-out infinite",
      }} />
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Signature Offering</p>
      <h1 className="mt-4 text-4xl font-light italic md:text-5xl" style={{ fontFamily: fontHeading, color: C.text }}>
        Your transmission is waiting.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-base italic" style={{ color: C.muted, fontFamily: fontHeading }}>
        Sign in to receive it.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/sign-in"
          className="block w-full max-w-xs rounded-none px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_24px_rgba(232,130,26,0.5)]"
          style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
          Sign In
        </Link>
        <Link to="/sign-in"
          className="block w-full max-w-xs rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${C.gold}66`, color: C.text }}>
          Create Account
        </Link>
      </div>
    </motion.div>
  );
}

function CheckIn({ value, onChange, onContinue, errorMsg }: {
  value: string; onChange: (v: string) => void; onContinue: () => void; errorMsg: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
      <p className="text-center text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Step 1 · Arrive</p>
      <h2 className="mt-4 text-center text-4xl font-light italic md:text-5xl" style={{ fontFamily: fontHeading, color: C.text }}>
        How are you arriving today?
      </h2>
      {errorMsg && <p className="mt-4 text-center text-xs" style={{ color: "#E8504C" }}>{errorMsg}</p>}

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {EMOTIONAL_STATES.map((s) => {
          const active = value === s.id;
          return (
            <button key={s.id} onClick={() => onChange(s.id)}
              className="flex items-center gap-4 rounded-none border px-5 py-4 text-left transition"
              style={{
                borderColor: active ? C.gold : `${C.gold}33`,
                background: active ? "rgba(201,168,76,0.08)" : C.deep,
                boxShadow: active ? `0 0 24px -8px ${C.gold}` : "none",
              }}>
              <span className="text-2xl" style={{ color: C.gold, fontFamily: fontHeading }}>{s.glyph}</span>
              <span className="text-sm" style={{ color: C.text }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <button disabled={!value} onClick={onContinue}
        className="mt-10 block w-full rounded-none px-10 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_24px_rgba(232,130,26,0.5)] disabled:opacity-40"
        style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
        I Am Here →
      </button>
    </motion.div>
  );
}

function IntentionStep({ value, onChange, onBack, onContinue }: {
  value: string; onChange: (v: string) => void; onBack: () => void; onContinue: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
      <button onClick={onBack} className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Back</button>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Step 2 · Call In</p>
      <h2 className="mt-4 text-center text-4xl font-light italic md:text-5xl" style={{ fontFamily: fontHeading }}>
        What do you call in today?
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-3">
        {INTENTIONS.map((i) => {
          const active = value === i.id;
          return (
            <button key={i.id} onClick={() => onChange(i.id)}
              className="flex items-center gap-5 rounded-none border px-6 py-5 text-left transition"
              style={{
                borderColor: active ? C.gold : `${C.gold}33`,
                background: active ? "rgba(201,168,76,0.08)" : C.deep,
                boxShadow: active ? `0 0 24px -8px ${C.gold}` : "none",
              }}>
              <span className="text-3xl" style={{ color: C.gold, fontFamily: fontHeading }}>{i.glyph}</span>
              <span>
                <span className="block text-base font-medium" style={{ color: C.text }}>{i.label}</span>
                <span className="mt-1 block text-xs italic" style={{ color: C.muted, fontFamily: fontHeading }}>{i.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      <button disabled={!value} onClick={onContinue}
        className="mt-10 block w-full rounded-none px-10 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_24px_rgba(232,130,26,0.5)] disabled:opacity-40"
        style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
        Prepare My Transmission →
      </button>
    </motion.div>
  );
}

function Loading() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LOADING_LINES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{ background: "rgba(10,11,9,0.96)", backdropFilter: "blur(8px)" }}>
      <BreathingMandala size={180} />
      <AnimatePresence mode="wait">
        <motion.p key={idx}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.8 }}
          className="mt-12 max-w-md text-center text-2xl italic"
          style={{ color: C.gold, fontFamily: fontHeading }}>
          {LOADING_LINES[idx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

function Paywall({ onUnlocked, script }: { onUnlocked: () => void; script: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your transmission is ready</p>
        <h2 className="mt-3 text-3xl font-light italic md:text-4xl" style={{ fontFamily: fontHeading }}>
          This is your personal frequency.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm" style={{ color: C.muted }}>
          Generated from the unique constellation of your soul. Receive it now.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <PaywallCard title="Single Transmission" price="$3.69" desc="Receive this transmission now."
          highlight={false} />
        <PaywallCard title="3-Pack" price="$9.36" desc="Receive 3 transmissions — use anytime."
          highlight={true} />
      </div>

      <div className="mt-8 rounded-none border p-6 text-center" style={{ borderColor: `${C.gold}55`, background: C.deep }}>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Coming Soon</p>
        <p className="mt-2 text-sm" style={{ color: C.muted }}>
          Direct purchase is being prepared. If you have an All Access pass or an access code, your transmission unlocks instantly.
        </p>
        <button onClick={onUnlocked}
          className="mt-6 rounded-none px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
          Preview Transmission Text
        </button>
        <p className="mt-3 text-[10px]" style={{ color: C.dim }}>
          Audio will be available once payments are live.
        </p>
      </div>

      {/* Small text preview so the user sees what's waiting */}
      <div className="mt-8 rounded-none border p-6" style={{ borderColor: `${C.gold}33`, background: "rgba(201,168,76,0.04)" }}>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>First lines</p>
        <p className="mt-3 line-clamp-3 italic" style={{ color: C.muted, fontFamily: fontHeading }}>
          {script.slice(0, 200)}…
        </p>
      </div>
    </motion.div>
  );
}

function PaywallCard({ title, price, desc, highlight }: { title: string; price: string; desc: string; highlight: boolean }) {
  return (
    <div className="rounded-none border p-6"
      style={{
        borderColor: highlight ? C.gold : `${C.gold}55`,
        background: C.deep,
        boxShadow: highlight ? `0 0 32px -16px ${C.gold}` : "none",
      }}>
      {highlight && (
        <p className="mb-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Best Value</p>
      )}
      <h3 className="text-2xl font-light italic" style={{ fontFamily: fontHeading, color: C.text }}>{title}</h3>
      <p className="mt-2 text-3xl" style={{ color: C.gold, fontFamily: fontHeading }}>{price}</p>
      <p className="mt-3 text-sm" style={{ color: C.muted }}>{desc}</p>
      <button disabled
        className="mt-5 w-full rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em] opacity-60"
        style={{ border: `1px solid ${C.gold}`, color: C.gold }}>
        Coming Soon
      </button>
    </div>
  );
}

function Player({ script, seal, signedUrl, audioMessage, emotional, intention, onDone }: {
  script: string; seal: string; signedUrl: string | null; audioMessage: string | null;
  emotional: string; intention: string; onDone: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showSeal, setShowSeal] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const tick = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const end = () => { setPlaying(false); setShowSeal(true); onDone(); };
    a.addEventListener("timeupdate", tick);
    a.addEventListener("ended", end);
    return () => { a.removeEventListener("timeupdate", tick); a.removeEventListener("ended", end); };
  }, [onDone]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) { setShowSeal(true); onDone(); return; }
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  const replay = () => {
    const a = audioRef.current; if (!a) return;
    a.currentTime = 0; setShowSeal(false); a.play(); setPlaying(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      className="py-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
        Your {intention} Transmission
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-none border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${C.gold}55`, color: C.gold }}>{emotional}</span>
        <span className="rounded-none border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${C.gold}55`, color: C.gold }}>{intention}</span>
      </div>

      <div className="my-10 flex flex-col items-center justify-center">
        <BreathingMandala size={240} />
        <button onClick={toggle}
          className="mt-8 flex h-20 w-20 items-center justify-center rounded-full transition hover:shadow-[0_0_32px_rgba(232,130,26,0.6)]"
          style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>
        {signedUrl && (
          <audio ref={audioRef} src={signedUrl} preload="auto" className="hidden" />
        )}
        {audioMessage && (
          <p className="mt-6 max-w-md text-sm italic" style={{ color: C.muted, fontFamily: fontHeading }}>
            {audioMessage}
          </p>
        )}
      </div>

      {signedUrl && (
        <div className="mx-auto mt-2 h-[2px] w-full max-w-md overflow-hidden" style={{ background: `${C.gold}22` }}>
          <div className="h-full transition-all" style={{ width: `${progress * 100}%`, background: C.gold }} />
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {signedUrl && (
          <>
            <button onClick={replay} className="rounded-none border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: `${C.gold}66`, color: C.gold }}>Replay</button>
            <a href={signedUrl} download={`transmission-${Date.now()}.mp3`}
              className="rounded-none border px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: `${C.gold}66`, color: C.gold }}>Download</a>
          </>
        )}
        <button onClick={() => { setShowSeal(true); onDone(); }}
          className="rounded-none px-5 py-2 text-[11px] uppercase tracking-[0.22em]"
          style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
          {signedUrl ? "I have received" : "Continue"}
        </button>
      </div>

      <AnimatePresence>
        {showSeal && seal && (
          <motion.blockquote initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mx-auto mt-12 max-w-xl border-y py-8 text-2xl font-light italic md:text-3xl"
            style={{ borderColor: `${C.gold}55`, color: C.text, fontFamily: fontHeading }}>
            "{seal}"
          </motion.blockquote>
        )}
      </AnimatePresence>

      {/* Always-visible script for accessibility / readability */}
      <details className="mx-auto mt-10 max-w-xl text-left">
        <summary className="cursor-pointer text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>
          Read the transmission
        </summary>
        <p className="mt-4 whitespace-pre-line text-base leading-relaxed" style={{ color: C.muted }}>
          {script}
        </p>
      </details>
    </motion.div>
  );
}

function PostScreen({ userId, emotional, intention, script, seal, audioPath, profileSnap, onAnother }: {
  userId?: string; emotional: string; intention: string; script: string; seal: string;
  audioPath: string | null; profileSnap: SoulProfileSnapshot; onAnother: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  const save = async () => {
    if (!userId) return;
    setSaving(true);
    setErr("");
    try {
      const { error } = await supabase.functions.invoke("save-transmission", {
        body: { emotionalState: emotional, intention, script, seal, audioPath, profileSnapshot: profileSnap },
      });
      if (error) throw new Error(error.message);
      setSaved(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Sealed</p>
      <h2 className="mt-3 text-3xl font-light italic md:text-4xl" style={{ fontFamily: fontHeading }}>
        Your transmission has been received and sealed.
      </h2>
      {seal && (
        <p className="mx-auto mt-6 max-w-lg text-lg italic" style={{ color: C.gold, fontFamily: fontHeading }}>
          "{seal}"
        </p>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button onClick={save} disabled={saving || saved}
          className="w-full max-w-xs rounded-none px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_24px_rgba(232,130,26,0.5)] disabled:opacity-50"
          style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
          {saved ? "✓ Saved to Profile" : saving ? "Saving…" : "Save to My Profile"}
        </button>
        <button onClick={onAnother}
          className="w-full max-w-xs rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${C.gold}66`, color: C.text }}>
          Call in Another
        </button>
      </div>
      {err && <p className="mt-4 text-xs" style={{ color: "#E8504C" }}>{err}</p>}
      {saved && (
        <p className="mt-6 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>
          View it any time in <Link to="/my-readings" className="underline">My Readings</Link>
        </p>
      )}
    </motion.div>
  );
}

// ---------- Visuals ----------

function BreathingMandala({ size = 200 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{
        background: `radial-gradient(circle, ${C.glow}66, transparent 70%)`,
        animation: "breathe 6s ease-in-out infinite", filter: "blur(12px)",
      }} />
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ animation: "spin-slow 60s linear infinite" }}>
        <g fill="none" stroke={C.gold} strokeWidth="0.4" opacity="0.85">
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="38" opacity="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 12;
            const x = 50 + Math.cos(angle) * 30;
            const y = 50 + Math.sin(angle) * 30;
            return <circle key={i} cx={x} cy={y} r="6" />;
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={50 - Math.cos(a) * 38} y1={50 - Math.sin(a) * 38}
              x2={50 + Math.cos(a) * 38} y2={50 + Math.sin(a) * 38} opacity="0.35" />;
          })}
        </g>
        <circle cx="50" cy="50" r="3" fill={C.gold} />
      </svg>
      <style>{`
        @keyframes breathe { 0%,100% { transform: scale(0.9); opacity: 0.6; } 50% { transform: scale(1.1); opacity: 1; } }
        @keyframes spin-slow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 0.6; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } }
      `}</style>
    </div>
  );
}

function PlayGlyph() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>;
}
function PauseGlyph() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>;
}
