import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Upload, Sparkles, Check, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/iris-reader")({
  head: () => ({
    meta: [
      { title: "Iris Reading — Soul True" },
      { name: "description", content: "Step 2 of your Soul Profile. A reflective reading of your iris pattern, vitality, and soul temperament. Educational and inspirational only." },
      { property: "og:title", content: "Iris Reading — Soul True" },
      { property: "og:description", content: "A reflective reading of your iris pattern, vitality, and soul temperament." },
    ],
  }),
  component: IrisReaderPage,
});

type Step = "transition" | "instruction" | "capture" | "processing" | "result" | "error";

type Reading = {
  iris_pattern: string;
  pattern_meaning: string;
  vitality_reading: string;
  soul_temperament: string;
  innate_gifts: string[];
  growth_edges: string[];
  soul_message: string;
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

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-in fade-in duration-700 ${className}`}>{children}</div>;
}

function getSession(): { id: string; email: string } | null {
  try {
    const raw = localStorage.getItem("soultrue_energy_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function IrisReaderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("transition");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  // ---------- Transition auto-advance ----------
  useEffect(() => {
    if (step !== "transition") return;
    const t = setTimeout(() => setStep("instruction"), 3000);
    return () => clearTimeout(t);
  }, [step]);

  // ---------- Camera ----------
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    setStep("capture");
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
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

  // ---------- AI ----------
  const runReading = async (img: string) => {
    setStep("processing");
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("iris-reading", {
        body: { imageBase64: img },
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
    if (!reading) return;
    const session = getSession();
    if (!session?.id) {
      setErrorMsg("No session found. Please start with the Aura Reader.");
      return;
    }
    setBusy(true);
    await supabase
      .from("energy_reading_sessions")
      .update({ iris_result: reading })
      .eq("id", session.id);
    setBusy(false);
    setSaved(true);
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: C.bg, color: C.text }}>
      <div className="px-6 pt-6">
        <Link to="/aura-reader" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>
          ← Aura Reader
        </Link>
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-2xl flex-col items-center justify-center px-6 py-10">
        {step === "transition" && (
          <FadeIn className="text-center" key="transition">
            <button
              onClick={() => setStep("instruction")}
              className="block focus:outline-none"
              aria-label="Continue"
            >
              <div className="relative mx-auto h-40 w-40">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${C.goldLight} 0%, ${C.gold} 40%, transparent 75%)`,
                    animation: "iris-pulse 2.4s ease-in-out infinite",
                    filter: "blur(8px)",
                  }}
                />
                <div
                  className="absolute inset-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, #fff 0%, ${C.goldLight} 60%, transparent 90%)`,
                    animation: "iris-pulse 2.4s ease-in-out infinite reverse",
                  }}
                />
              </div>
              <p className="mt-10 font-serif text-2xl font-light italic md:text-3xl" style={{ color: C.goldLight }}>
                Your aura has been read.<br />
                Now we look deeper —<br />
                into the windows of your soul.
              </p>
              <p className="mt-8 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Tap to continue</p>
            </button>
            <style>{`@keyframes iris-pulse { 0%,100% { transform: scale(0.95); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }`}</style>
          </FadeIn>
        )}

        {step === "instruction" && (
          <FadeIn className="w-full text-center">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Step 2 of 3</p>
            <h1 className="mt-6 font-serif text-4xl font-light md:text-5xl" style={{ color: C.goldLight }}>
              Iris Reading
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed" style={{ color: C.text }}>
              Hold your phone 6–8 inches from your eye. Use good lighting. We'll analyze your iris pattern, vitality field, and soul temperament.
            </p>

            {/* Example illustration */}
            <div className="mx-auto mt-10 flex flex-col items-center">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Example</p>
              <div className="relative mt-4 h-32 w-32">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <radialGradient id="iris-eg" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1a1a1a" />
                      <stop offset="35%" stopColor={C.gold} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={C.gold} stopOpacity="0.6" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="48" fill="none" stroke={C.border} strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="38" fill="url(#iris-eg)" stroke={C.gold} strokeWidth="0.4" opacity="0.8" />
                  {Array.from({ length: 24 }).map((_, i) => {
                    const a = (Math.PI * 2 * i) / 24;
                    const x1 = 50 + Math.cos(a) * 14;
                    const y1 = 50 + Math.sin(a) * 14;
                    const x2 = 50 + Math.cos(a) * 36;
                    const y2 = 50 + Math.sin(a) * 36;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gold} strokeWidth="0.3" opacity="0.5" />;
                  })}
                  <circle cx="50" cy="50" r="12" fill="#000" />
                  <circle cx="46" cy="46" r="2.5" fill="#fff" opacity="0.7" />
                </svg>
              </div>
            </div>

            {errorMsg && <p className="mt-6 text-xs" style={{ color: "#FF8FB8" }}>{errorMsg}</p>}

            <div className="mx-auto mt-10 grid max-w-sm grid-cols-2 gap-3">
              <button
                onClick={startCamera}
                className="flex flex-col items-center gap-2 rounded-none px-4 py-5 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#0D0F0E" }}
              >
                <Camera size={20} />
                Capture My Iris
              </button>
              <label
                className="flex cursor-pointer flex-col items-center gap-2 rounded-none border px-4 py-5 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                <Upload size={20} />
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          </FadeIn>
        )}

        {step === "capture" && (
          <FadeIn className="w-full text-center">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Iris Capture</p>
            <h2 className="mt-6 font-serif text-2xl font-light md:text-3xl" style={{ color: C.goldLight }}>
              Hold steady. Bring your eye into the frame.
            </h2>

            <div className="relative mx-auto mt-8 aspect-square w-full max-w-sm overflow-hidden" style={{ backgroundColor: "#000", border: `1px solid ${C.border}` }}>
              {cameraOn ? (
                <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: C.muted }}>
                  Camera preview will appear here
                </div>
              )}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="32" fill="none" stroke={C.gold} strokeWidth="0.4" opacity="0.7" />
                <circle cx="50" cy="50" r="36" fill="none" stroke={C.gold} strokeWidth="0.2" opacity="0.3" />
              </svg>
            </div>

            {errorMsg && <p className="mt-4 text-xs" style={{ color: "#FF8FB8" }}>{errorMsg}</p>}

            <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">
              <button
                onClick={captureFromCamera}
                disabled={!cameraOn}
                className="flex flex-col items-center gap-2 rounded-none px-4 py-5 text-[11px] uppercase tracking-[0.22em] disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#0D0F0E" }}
              >
                <Sparkles size={20} />
                Capture
              </button>
              <label
                className="flex cursor-pointer flex-col items-center gap-2 rounded-none border px-4 py-5 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.border, color: C.text }}
              >
                <Upload size={20} />
                Upload Instead
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
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
                  animation: "iris-pulse 2.4s ease-in-out infinite",
                  filter: "blur(6px)",
                }}
              />
              <div
                className="absolute inset-6 rounded-full"
                style={{
                  background: `radial-gradient(circle, #fff 0%, ${C.goldLight} 50%, transparent 80%)`,
                  animation: "iris-pulse 2.4s ease-in-out infinite reverse",
                }}
              />
            </div>
            <p className="mt-12 font-serif text-xl font-light italic" style={{ color: C.goldLight }}>
              Reading the map of your soul…
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>This may take a moment</p>
            <style>{`@keyframes iris-pulse { 0%,100% { transform: scale(0.95); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } }`}</style>
          </FadeIn>
        )}

        {step === "error" && (
          <FadeIn className="w-full text-center">
            <h2 className="font-serif text-2xl font-light" style={{ color: C.goldLight }}>The reading didn't come through</h2>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
            <button
              onClick={() => imageBase64 ? runReading(imageBase64) : setStep("instruction")}
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
              {/* Animated iris ring */}
              <div className="relative mx-auto h-56 w-56">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ animation: "iris-spin 40s linear infinite" }}>
                  <defs>
                    <radialGradient id="iris-result" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#000" />
                      <stop offset="30%" stopColor={C.gold} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={C.goldLight} stopOpacity="0.7" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="44" fill="url(#iris-result)" stroke={C.gold} strokeWidth="0.4" />
                  {Array.from({ length: 36 }).map((_, i) => {
                    const a = (Math.PI * 2 * i) / 36;
                    const x1 = 50 + Math.cos(a) * 16;
                    const y1 = 50 + Math.sin(a) * 16;
                    const x2 = 50 + Math.cos(a) * 42;
                    const y2 = 50 + Math.sin(a) * 42;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.goldLight} strokeWidth="0.25" opacity="0.6" />;
                  })}
                  <circle cx="50" cy="50" r="14" fill="#000" />
                  <circle cx="45" cy="45" r="3" fill="#fff" opacity="0.8" />
                </svg>
                <div
                  className="absolute -inset-4 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
                    filter: "blur(20px)",
                    opacity: 0.4,
                    animation: "iris-pulse 4s ease-in-out infinite",
                  }}
                />
                <style>{`@keyframes iris-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes iris-pulse { 0%,100% { transform: scale(0.95); opacity: 0.4; } 50% { transform: scale(1.1); opacity: 0.7; } }`}</style>
              </div>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Your iris pattern</p>
              <h1 className="mt-3 font-serif text-5xl font-light italic" style={{ color: C.goldLight }}>
                {reading.iris_pattern}
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed" style={{ color: C.text }}>
                {reading.pattern_meaning}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Vitality</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: C.text }}>{reading.vitality_reading}</p>
            </div>

            <div className="mx-auto mt-10 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Soul Temperament</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: C.text }}>{reading.soul_temperament}</p>
            </div>

            <div className="mx-auto mt-10 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Innate Gifts</h3>
              <ul className="mt-4 space-y-3">
                {reading.innate_gifts.map((s, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: C.gold }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto mt-10 max-w-lg">
              <h3 className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Growth Edges</h3>
              <ul className="mt-4 space-y-2">
                {reading.growth_edges.map((s, i) => (
                  <li key={i} className="text-sm leading-relaxed" style={{ color: C.muted }}>— {s}</li>
                ))}
              </ul>
            </div>

            <div className="mx-auto mt-12 max-w-lg text-center">
              <p className="font-serif text-xl font-light italic md:text-2xl" style={{ color: C.goldLight }}>
                "{reading.soul_message}"
              </p>
            </div>

            <div className="mx-auto mt-14 flex max-w-lg flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate({ to: "/aura-reader" })}
                className="flex flex-1 items-center justify-center gap-2 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.border, color: C.muted }}
              >
                ← Back to Aura
              </button>
              <button
                onClick={saveReading}
                disabled={busy || saved}
                className="flex flex-1 items-center justify-center gap-2 rounded-none border px-6 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-60"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                {saved ? <><Check size={14} /> Saved</> : busy ? "Saving…" : "Save My Reading"}
              </button>
              <button
                onClick={() => navigate({ to: "/fingerprint-reader" })}
                className="flex flex-1 items-center justify-center gap-2 rounded-none px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#0D0F0E", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}
              >
                <Eye size={14} />
                Continue to Fingerprint →
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
