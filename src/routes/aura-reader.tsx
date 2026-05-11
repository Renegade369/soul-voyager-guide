import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Upload, Sparkles, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/aura-reader")({
  head: () => ({
    meta: [
      { title: "Aura Reader — Soul True" },
      { name: "description", content: "Step 1 of your Soul Profile. A reflective reading of your aura field, color frequency, and current energetic state. Educational and inspirational only." },
      { property: "og:title", content: "Aura Reader — Soul True" },
      { property: "og:description", content: "A reflective reading of your aura field and current energetic state." },
    ],
  }),
  component: AuraReaderPage,
});

type Step = "email" | "mood" | "capture" | "processing" | "result" | "error";

type Mood = { feeling: string; center: string; seeking: string };
type Reading = {
  aura_color: string;
  color_meaning: string;
  current_energetic_state: string;
  energetic_strengths: string[];
  areas_for_healing: string[];
  affirmation: string;
};

const C = {
  bg: "#0a0a0a",
  surface: "#141716",
  border: "rgba(212,175,100,0.18)",
  gold: "#C9A84C",
  goldLight: "#E8C87A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.6)",
};

const moodQuestions: { key: keyof Mood; q: string; options: string[] }[] = [
  { key: "feeling", q: "How are you feeling right now?", options: ["Expansive", "Contracted", "Unsettled", "Peaceful"] },
  { key: "center", q: "Where is your energy centered today?", options: ["Mind", "Heart", "Body", "Spirit"] },
  { key: "seeking", q: "What are you seeking?", options: ["Clarity", "Healing", "Direction", "Connection"] },
];

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-in fade-in duration-700 ${className}`}>{children}</div>;
}

function colorToCss(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("violet") || n.includes("purple")) return "#9B6BFF";
  if (n.includes("indigo")) return "#6B5BFF";
  if (n.includes("blue")) return "#5BA9FF";
  if (n.includes("turquoise") || n.includes("teal")) return "#2DD4BF";
  if (n.includes("emerald") || n.includes("green")) return "#5BD89B";
  if (n.includes("yellow") || n.includes("gold")) return "#E8C87A";
  if (n.includes("orange")) return "#FFA86B";
  if (n.includes("red") || n.includes("crimson")) return "#FF6B6B";
  if (n.includes("pink") || n.includes("rose") || n.includes("magenta")) return "#FF8FB8";
  if (n.includes("white") || n.includes("silver")) return "#F0F0F8";
  if (n.includes("black")) return "#3A3A4A";
  return C.gold;
}

function AuraReaderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mood, setMood] = useState<Partial<Mood>>({});
  const [moodIdx, setMoodIdx] = useState(0);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  // ---------- Email ----------
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setBusy(true);
    setErrorMsg("");
    const { data, error } = await supabase
      .from("energy_reading_sessions")
      .insert({ email })
      .select("id")
      .single();
    setBusy(false);
    if (error || !data) {
      setErrorMsg("We couldn't start your session. Please try again.");
      return;
    }
    setSessionId(data.id);
    setStep("mood");
  };

  // ---------- Mood ----------
  const selectMood = (key: keyof Mood, value: string) => {
    const next = { ...mood, [key]: value };
    setMood(next);
    if (moodIdx < moodQuestions.length - 1) {
      setTimeout(() => setMoodIdx((i) => i + 1), 250);
    } else {
      setTimeout(() => setStep("capture"), 250);
    }
  };

  // ---------- Capture ----------
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch {
      setErrorMsg("Camera unavailable. Please use Upload Photo instead.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  useEffect(() => () => stopCamera(), []);

  const captureFromCamera = () => {
    const v = videoRef.current;
    if (!v) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    const data = canvas.toDataURL("image/jpeg", 0.85);
    stopCamera();
    setImageBase64(data);
    runReading(data);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      setImageBase64(data);
      runReading(data);
    };
    reader.readAsDataURL(f);
  };

  // ---------- Processing / AI ----------
  const runReading = async (img: string) => {
    setStep("processing");
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("aura-reading", {
        body: { imageBase64: img, mood },
      });
      if (error) throw new Error(error.message || "Reading failed");
      if (data?.error) throw new Error(data.error);
      if (!data?.reading) throw new Error("No reading returned");
      setReading(data.reading as Reading);
      setStep("result");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStep("error");
    }
  };

  // ---------- Save ----------
  const saveReading = async () => {
    if (!sessionId || !reading) return;
    setBusy(true);
    await supabase
      .from("energy_reading_sessions")
      .update({ aura_result: reading, mood_answers: mood })
      .eq("id", sessionId);
    setBusy(false);
    setSaved(true);
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: C.bg, color: C.text }}>
      {/* Header */}
      <div className="px-6 pt-6">
        <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>
          ← Soul True
        </Link>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-2xl flex-col items-center justify-center px-6 py-10">
        {step === "email" && (
          <FadeIn className="w-full text-center">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Step 1 of 3 · Aura Reading</p>
            <h1 className="mt-8 font-serif text-3xl font-light leading-tight md:text-4xl" style={{ color: C.goldLight }}>
              Before we begin your reading,<br />where should we send your Soul Profile when it's complete?
            </h1>
            <form onSubmit={handleEmailSubmit} className="mx-auto mt-10 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-none border bg-transparent px-4 py-4 text-center text-base outline-none transition focus:border-[var(--gold)]"
                style={{ borderColor: C.border, color: C.text, ["--gold" as any]: C.gold }}
              />
              {errorMsg && <p className="mt-3 text-xs" style={{ color: "#FF8FB8" }}>{errorMsg}</p>}
              <button
                type="submit"
                disabled={busy}
                className="mt-6 w-full rounded-none px-6 py-4 text-[11px] uppercase tracking-[0.22em] transition disabled:opacity-50"
                style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}
              >
                {busy ? "Opening…" : "Begin My Reading"}
              </button>
              <p className="mt-6 text-[10px] uppercase tracking-[0.2em]" style={{ color: C.muted }}>
                For educational & inspirational purposes only
              </p>
            </form>
          </FadeIn>
        )}

        {step === "mood" && (
          <FadeIn key={moodIdx} className="w-full text-center">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
              Question {moodIdx + 1} of {moodQuestions.length}
            </p>
            <h2 className="mt-6 font-serif text-2xl font-light md:text-3xl" style={{ color: C.goldLight }}>
              {moodQuestions[moodIdx].q}
            </h2>
            <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-3">
              {moodQuestions[moodIdx].options.map((opt) => {
                const selected = mood[moodQuestions[moodIdx].key] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => selectMood(moodQuestions[moodIdx].key, opt)}
                    className="rounded-none border px-4 py-6 font-serif text-lg font-light transition hover:scale-[1.02]"
                    style={{
                      borderColor: selected ? C.gold : C.border,
                      backgroundColor: selected ? "rgba(201,168,76,0.08)" : "transparent",
                      color: selected ? C.goldLight : C.text,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </FadeIn>
        )}

        {step === "capture" && (
          <FadeIn className="w-full text-center">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Aura Capture</p>
            <h2 className="mt-6 font-serif text-2xl font-light md:text-3xl" style={{ color: C.goldLight }}>
              Relax your face. Look gently into the camera.<br />We'll capture your aura field.
            </h2>

            <div className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-sm overflow-hidden" style={{ backgroundColor: "#000", border: `1px solid ${C.border}` }}>
              {cameraOn ? (
                <video ref={videoRef} playsInline muted className="h-full w-full object-cover" style={{ transform: "scaleX(-1)" }} />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: C.muted }}>
                  Camera preview will appear here
                </div>
              )}
              {/* Gold oval frame */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 133" preserveAspectRatio="none">
                <ellipse cx="50" cy="66" rx="32" ry="48" fill="none" stroke={C.gold} strokeWidth="0.4" opacity="0.7" />
                <ellipse cx="50" cy="66" rx="34" ry="50" fill="none" stroke={C.gold} strokeWidth="0.2" opacity="0.3" />
              </svg>
            </div>

            {errorMsg && <p className="mt-4 text-xs" style={{ color: "#FF8FB8" }}>{errorMsg}</p>}

            <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">
              {!cameraOn ? (
                <button
                  onClick={startCamera}
                  className="flex flex-col items-center gap-2 rounded-none border px-4 py-5 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: C.gold, color: C.gold }}
                >
                  <Camera size={20} />
                  Take Photo
                </button>
              ) : (
                <button
                  onClick={captureFromCamera}
                  className="flex flex-col items-center gap-2 rounded-none px-4 py-5 text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#0D0F0E" }}
                >
                  <Sparkles size={20} />
                  Capture
                </button>
              )}
              <label
                className="flex cursor-pointer flex-col items-center gap-2 rounded-none border px-4 py-5 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.border, color: C.text }}
              >
                <Upload size={20} />
                Upload Photo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </FadeIn>
        )}

        {step === "processing" && (
          <FadeIn className="text-center">
            <div className="relative mx-auto h-48 w-48">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${C.goldLight} 0%, ${C.gold} 40%, transparent 75%)`,
                  animation: "aura-pulse 2.4s ease-in-out infinite",
                  filter: "blur(6px)",
                }}
              />
              <div
                className="absolute inset-6 rounded-full"
                style={{
                  background: `radial-gradient(circle, #fff 0%, ${C.goldLight} 50%, transparent 80%)`,
                  animation: "aura-pulse 2.4s ease-in-out infinite reverse",
                }}
              />
            </div>
            <p className="mt-12 font-serif text-xl font-light italic" style={{ color: C.goldLight }}>
              Reading your energy field…
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>
              This may take a moment
            </p>
            <style>{`@keyframes aura-pulse { 0%,100% { transform: scale(0.95); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }`}</style>
          </FadeIn>
        )}

        {step === "error" && (
          <FadeIn className="w-full text-center">
            <h2 className="font-serif text-2xl font-light" style={{ color: C.goldLight }}>The reading didn't come through</h2>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
            <button
              onClick={() => imageBase64 ? runReading(imageBase64) : setStep("capture")}
              className="mt-8 rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}
            >
              Try again
            </button>
          </FadeIn>
        )}

        {step === "result" && reading && (
          <FadeIn className="w-full">
            <div className="text-center">
              {/* Aura orb */}
              <div className="relative mx-auto h-56 w-56">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${colorToCss(reading.aura_color)} 0%, transparent 70%)`,
                    filter: "blur(20px)",
                    animation: "aura-pulse 4s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute inset-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, #fff 0%, ${colorToCss(reading.aura_color)} 60%, transparent 90%)`,
                    opacity: 0.85,
                  }}
                />
                <style>{`@keyframes aura-pulse { 0%,100% { transform: scale(0.95); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }`}</style>
              </div>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Your aura reads as</p>
              <h1 className="mt-3 font-serif text-5xl font-light italic" style={{ color: colorToCss(reading.aura_color) }}>
                {reading.aura_color}
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed" style={{ color: C.text }}>
                {reading.color_meaning}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Current Energetic State</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: C.text }}>{reading.current_energetic_state}</p>
            </div>

            <div className="mx-auto mt-10 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Energetic Strengths</h3>
              <ul className="mt-4 space-y-3">
                {reading.energetic_strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: C.gold }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto mt-10 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Areas Inviting Care</h3>
              <ul className="mt-4 space-y-2">
                {reading.areas_for_healing.map((s, i) => (
                  <li key={i} className="text-sm leading-relaxed" style={{ color: C.muted }}>
                    — {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto mt-12 max-w-lg text-center">
              <p className="font-serif text-xl font-light italic md:text-2xl" style={{ color: C.goldLight }}>
                "{reading.affirmation}"
              </p>
            </div>

            <div className="mx-auto mt-14 flex max-w-lg flex-col gap-3 sm:flex-row">
              <button
                onClick={saveReading}
                disabled={busy || saved}
                className="flex flex-1 items-center justify-center gap-2 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-60"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                {saved ? <><Check size={14} /> Saved</> : busy ? "Saving…" : "Save My Reading"}
              </button>
              <button
                onClick={() => navigate({ to: "/iris-reader" })}
                className="flex-1 rounded-none px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}
              >
                Continue to Iris Reading →
              </button>
            </div>

            <p className="mx-auto mt-10 max-w-lg text-center text-[10px] uppercase tracking-[0.2em]" style={{ color: C.muted }}>
              For educational & inspirational purposes only. Not medical advice.
            </p>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
