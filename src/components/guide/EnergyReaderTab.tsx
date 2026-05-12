import { useRef, useState } from "react";
import { Camera, Eye, Fingerprint, Sparkles, ChevronRight, RotateCcw, Check, Loader2, Upload } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const C = {
  bg: "#0D0F0E",
  surface: "#141716",
  border: "rgba(245,240,232,0.12)",
  gold: "#C9A84C",
  goldLight: "#E8C87A",
  text: "#F5F0E8",
  muted: "#8A9A8E",
};

const fonts = {
  heading: '"Cormorant Garamond", serif',
  body: '"Outfit", sans-serif',
};

type ReaderType = "aura" | "iris" | "fingerprint";

type AuraReading = {
  aura_color: string;
  color_meaning: string;
  current_energetic_state: string;
  energetic_strengths: string[];
  areas_for_healing: string[];
  affirmation: string;
};

type IrisReading = {
  iris_pattern: string;
  pattern_meaning: string;
  vitality_reading: string;
  soul_temperament: string;
  innate_gifts: string[];
  growth_edges: string[];
  soul_message: string;
};

type FingerprintReading = {
  pattern_type: string;
  pattern_meaning: string;
  soul_blueprint: string;
  life_path: string;
  innate_gifts: string[];
  life_purpose_statement: string;
  integration_message: string;
};

type Results = {
  aura: AuraReading | null;
  iris: IrisReading | null;
  fingerprint: FingerprintReading | null;
};

const READERS: {
  id: ReaderType;
  label: string;
  icon: typeof Sparkles;
  fn: string;
  instruction: string;
  tip: string;
  facing: "user" | "environment";
}[] = [
  {
    id: "aura",
    label: "Aura",
    icon: Sparkles,
    fn: "aura-reading",
    instruction: "Take a clear selfie in soft, natural light. Look gently into the camera.",
    tip: "Relax your face. Daylight gives the most resonant reading.",
    facing: "user",
  },
  {
    id: "iris",
    label: "Iris",
    icon: Eye,
    fn: "iris-reading",
    instruction: "Photograph one eye up close. Hold steady, eye wide open.",
    tip: "Bright, even light is essential. Crop tightly to the iris if possible.",
    facing: "environment",
  },
  {
    id: "fingerprint",
    label: "Blueprint",
    icon: Fingerprint,
    fn: "fingerprint-reading",
    instruction: "Photograph the pad of your index finger so the ridge pattern is visible.",
    tip: "Clean your finger and use bright light for the clearest pattern.",
    facing: "environment",
  },
];

function CameraCapture({
  onCapture,
  instruction,
  tip,
  facing,
}: {
  onCapture: (dataUrl: string) => void;
  instruction: string;
  tip: string;
  facing: "user" | "environment";
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState("");

  const start = async () => {
    setErr("");
    setReady(false);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setErr("Camera API not available in this browser. Please upload a photo instead.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: false,
      });
      streamRef.current = stream;
      setStreaming(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            setReady(true);
          } catch {
            setErr("Couldn't start the camera preview. Please try again.");
          }
        };
      }
    } catch (e) {
      const name = (e as { name?: string })?.name;
      if (name === "NotAllowedError" || name === "SecurityError") {
        setErr("Camera access was blocked. Click the camera icon in your browser's address bar to enable it, then refresh.");
      } else if (name === "NotFoundError" || name === "OverconstrainedError") {
        setErr("No camera detected on this device.");
      } else if (name === "NotReadableError" || name === "AbortError") {
        setErr("Your camera is being used by another app. Close it and refresh.");
      } else {
        setErr("Camera unavailable. Please upload a photo instead.");
      }
      setStreaming(false);
      setReady(false);
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  };

  const capture = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth || !v.videoHeight) {
      setErr("Camera not ready yet. Please wait a moment and try again.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    if (!dataUrl || dataUrl.length < 100) {
      setErr("Capture failed. Please try again or upload a photo.");
      return;
    }
    stop();
    onCapture(dataUrl);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onCapture(r.result as string);
    r.readAsDataURL(f);
  };

  return (
    <div className="space-y-4" style={{ fontFamily: fonts.body }}>
      <p className="text-sm leading-relaxed" style={{ color: C.text }}>
        {instruction}
      </p>
      <p className="text-xs" style={{ color: C.muted }}>
        {tip}
      </p>

      <div
        className="relative aspect-[3/4] w-full overflow-hidden"
        style={{ backgroundColor: "#000", border: `1px solid ${C.border}` }}
      >
        {streaming ? (
          <video
            ref={videoRef}
            playsInline
            muted
            className="h-full w-full object-cover"
            style={{ transform: facing === "user" ? "scaleX(-1)" : undefined }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: C.muted }}>
            Camera preview will appear here
          </div>
        )}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 133" preserveAspectRatio="none">
          <ellipse cx="50" cy="66" rx="32" ry="48" fill="none" stroke={C.gold} strokeWidth="0.4" opacity="0.7" />
        </svg>
      </div>

      {err && <p className="text-xs" style={{ color: "#FF8FB8" }}>{err}</p>}

      <div className="grid grid-cols-2 gap-3">
        {streaming ? (
          <button
            onClick={capture}
            className="col-span-2 flex items-center justify-center gap-2 px-4 py-4 text-[11px] uppercase tracking-[0.22em]"
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#0D0F0E", borderRadius: 4 }}
          >
            <Sparkles size={16} /> Capture
          </button>
        ) : (
          <button
            onClick={start}
            className="flex items-center justify-center gap-2 border px-4 py-4 text-[11px] uppercase tracking-[0.22em]"
            style={{ borderColor: C.gold, color: C.gold, borderRadius: 4 }}
          >
            <Camera size={16} /> Open Camera
          </button>
        )}
        <label
          className="flex cursor-pointer items-center justify-center gap-2 border px-4 py-4 text-[11px] uppercase tracking-[0.22em]"
          style={{ borderColor: C.border, color: C.text, borderRadius: 4 }}
        >
          <Upload size={16} /> Upload Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold, fontFamily: fonts.body }}>
        {kicker}
      </p>
      <h3
        className="mt-3 text-3xl font-light italic"
        style={{ color: C.goldLight, fontFamily: fonts.heading }}
      >
        {title}
      </h3>
    </div>
  );
}

function AuraResultCard({ r }: { r: AuraReading }) {
  return (
    <div className="space-y-6" style={{ fontFamily: fonts.body, color: C.text }}>
      <SectionHeader kicker="Aura Reading" title={r.aura_color} />
      <p className="text-base leading-relaxed">{r.color_meaning}</p>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Current Energetic State</p>
        <p className="mt-2 text-base leading-relaxed">{r.current_energetic_state}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Energetic Strengths</p>
        <ul className="mt-3 space-y-2">
          {r.energetic_strengths?.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: C.gold }} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Areas Inviting Care</p>
        <ul className="mt-3 space-y-1">
          {r.areas_for_healing?.map((s, i) => (
            <li key={i} className="text-sm leading-relaxed" style={{ color: C.muted }}>— {s}</li>
          ))}
        </ul>
      </div>
      <p className="text-center text-xl font-light italic" style={{ color: C.goldLight, fontFamily: fonts.heading }}>
        "{r.affirmation}"
      </p>
    </div>
  );
}

function IrisResultCard({ r }: { r: IrisReading }) {
  return (
    <div className="space-y-6" style={{ fontFamily: fonts.body, color: C.text }}>
      <SectionHeader kicker="Iris Reading" title={r.iris_pattern} />
      <p className="text-base leading-relaxed">{r.pattern_meaning}</p>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Vitality</p>
        <p className="mt-2 text-base leading-relaxed">{r.vitality_reading}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Soul Temperament</p>
        <p className="mt-2 text-base leading-relaxed">{r.soul_temperament}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Innate Gifts</p>
          <ul className="mt-3 space-y-2">
            {r.innate_gifts?.map((g, i) => (
              <li key={i} className="text-sm leading-relaxed">• {g}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.muted }}>Growth Edges</p>
          <ul className="mt-3 space-y-2">
            {r.growth_edges?.map((g, i) => (
              <li key={i} className="text-sm leading-relaxed" style={{ color: C.muted }}>— {g}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center text-xl font-light italic" style={{ color: C.goldLight, fontFamily: fonts.heading }}>
        "{r.soul_message}"
      </p>
    </div>
  );
}

function FingerprintResultCard({ r }: { r: FingerprintReading }) {
  return (
    <div className="space-y-6" style={{ fontFamily: fonts.body, color: C.text }}>
      <SectionHeader kicker="Soul Blueprint" title={r.pattern_type} />
      <p className="text-base leading-relaxed">{r.pattern_meaning}</p>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Soul Blueprint</p>
        <p className="mt-2 text-base leading-relaxed">{r.soul_blueprint}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Life Path</p>
        <p className="mt-2 text-base leading-relaxed">{r.life_path}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Innate Gifts</p>
        <ul className="mt-3 space-y-2">
          {r.innate_gifts?.map((g, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: C.gold }} />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-y py-6 text-center" style={{ borderColor: C.border }}>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Life Purpose</p>
        <p
          className="mt-3 text-xl font-light italic leading-relaxed"
          style={{ color: C.goldLight, fontFamily: fonts.heading }}
        >
          "{r.life_purpose_statement}"
        </p>
      </div>
      <p className="text-center text-sm" style={{ color: C.muted }}>{r.integration_message}</p>
    </div>
  );
}

export default function EnergyReaderTab() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(() => {
    if (typeof window === "undefined") return "";
    try { return localStorage.getItem("soultrue_first_name") || ""; } catch { return ""; }
  });
  const [nameInput, setNameInput] = useState("");
  const [activeReader, setActiveReader] = useState<ReaderType>("aura");
  const [results, setResults] = useState<Results>({ aura: null, iris: null, fingerprint: null });
  const [loading, setLoading] = useState<ReaderType | null>(null);
  const [err, setErr] = useState("");

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    const v = nameInput.trim();
    if (!v) return;
    setFirstName(v);
    try { localStorage.setItem("soultrue_first_name", v); } catch {}
  };

  if (!firstName) {
    return (
      <div className="mx-auto max-w-md py-16 text-center" style={{ color: C.text, fontFamily: fonts.body }}>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Energy Reading</p>
        <h1
          className="mt-4 text-3xl font-light leading-tight md:text-4xl"
          style={{ color: C.goldLight, fontFamily: fonts.heading }}
        >
          Before we begin, <em>what shall we call you?</em>
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm" style={{ color: C.muted }}>
          Your name personalizes every reading.
        </p>
        <form onSubmit={submitName} className="mt-10 space-y-4">
          <input
            type="text"
            autoFocus
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your first name"
            className="w-full border bg-transparent px-4 py-4 text-center text-base outline-none"
            style={{ borderColor: C.border, color: C.text, borderRadius: 4 }}
          />
          <button
            type="submit"
            disabled={!nameInput.trim()}
            className="w-full px-6 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              color: "#0D0F0E",
              borderRadius: 4,
            }}
          >
            Begin My Reading
          </button>
        </form>
      </div>
    );
  }


  const handleCapture = async (readerType: ReaderType, imageBase64: string) => {
    if (!imageBase64 || !imageBase64.startsWith("data:image/") || imageBase64.length < 200) {
      setErr("That image didn't capture properly. Please try again or upload a photo.");
      return;
    }
    setLoading(readerType);
    setErr("");
    try {
      const fnName = READERS.find((r) => r.id === readerType)!.fn;
      const { data, error } = await supabase.functions.invoke(fnName, {
        body: { imageBase64 },
      });
      if (error) throw new Error(error.message || "Reading failed");
      if (data?.error) throw new Error(data.error);
      if (!data?.reading) throw new Error("No reading returned");
      setResults((prev) => ({ ...prev, [readerType]: data.reading }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const allComplete = !!(results.aura && results.iris && results.fingerprint);

  return (
    <div className="mx-auto max-w-2xl space-y-10 py-8" style={{ color: C.text }}>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold, fontFamily: fonts.body }}>
          Energy Reading · {firstName}
        </p>
        <h1
          className="mt-3 text-4xl font-light leading-tight md:text-5xl"
          style={{ color: C.goldLight, fontFamily: fonts.heading }}
        >
          A reflective reading of your <em>aura, iris, and soul blueprint</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: C.muted, fontFamily: fonts.body }}>
          Welcome, {firstName}. Complete all three readings to unlock your Soul Profile.
        </p>
      </div>

      {/* Reader sub-tabs */}
      <div className="grid grid-cols-3 gap-2">
        {READERS.map((r) => {
          const Icon = r.icon;
          const isActive = activeReader === r.id;
          const isDone = !!results[r.id];
          return (
            <button
              key={r.id}
              onClick={() => setActiveReader(r.id)}
              className="flex flex-col items-center gap-2 border px-3 py-4 transition"
              style={{
                backgroundColor: isActive ? C.surface : "transparent",
                borderColor: isActive ? C.gold : C.border,
                color: isActive ? C.gold : C.muted,
                borderRadius: 4,
                fontFamily: fonts.body,
              }}
            >
              {isDone ? <Check size={18} style={{ color: C.gold }} /> : <Icon size={18} />}
              <span className="text-[10px] uppercase tracking-[0.22em]">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active reader panel */}
      <div className="border p-6 md:p-8" style={{ borderColor: C.border, backgroundColor: C.surface, borderRadius: 4 }}>
        {loading === activeReader ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <Loader2 size={28} className="animate-spin" style={{ color: C.gold }} />
            <p className="text-sm italic" style={{ color: C.goldLight, fontFamily: fonts.heading }}>
              Reading your energy field…
            </p>
          </div>
        ) : results[activeReader] ? (
          <div className="space-y-6">
            {activeReader === "aura" && <AuraResultCard r={results.aura!} />}
            {activeReader === "iris" && <IrisResultCard r={results.iris!} />}
            {activeReader === "fingerprint" && <FingerprintResultCard r={results.fingerprint!} />}
            <button
              onClick={() => setResults((prev) => ({ ...prev, [activeReader]: null }))}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
              style={{ color: C.muted, fontFamily: fonts.body }}
            >
              <RotateCcw size={12} /> Retake this reading
            </button>
          </div>
        ) : (
          <CameraCapture
            onCapture={(b64) => handleCapture(activeReader, b64)}
            instruction={READERS.find((r) => r.id === activeReader)!.instruction}
            tip={READERS.find((r) => r.id === activeReader)!.tip}
            facing={READERS.find((r) => r.id === activeReader)!.facing}
          />
        )}
        {err && (
          <p className="mt-4 text-xs" style={{ color: "#FF8FB8", fontFamily: fonts.body }}>
            {err}
          </p>
        )}
      </div>

      {/* Soul Profile CTA */}
      {allComplete && (
        <div
          className="border p-8 text-center"
          style={{ borderColor: C.gold, backgroundColor: C.surface, borderRadius: 4 }}
        >
          <Sparkles size={24} className="mx-auto" style={{ color: C.gold }} />
          <h3
            className="mt-3 text-2xl font-light italic"
            style={{ color: C.goldLight, fontFamily: fonts.heading }}
          >
            All three readings complete
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: C.muted, fontFamily: fonts.body }}>
            Your Soul Profile is ready to be woven together.
          </p>
          <button
            onClick={() => navigate({ to: "/soul-profile" })}
            className="mt-6 inline-flex items-center gap-2 px-6 py-4 text-[11px] uppercase tracking-[0.22em]"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              color: "#0D0F0E",
              borderRadius: 4,
              fontFamily: fonts.body,
            }}
          >
            Generate My Soul Profile <ChevronRight size={14} />
          </button>
        </div>
      )}

      <p className="text-center text-[10px] uppercase tracking-[0.22em]" style={{ color: C.muted, fontFamily: fonts.body }}>
        For educational & inspirational purposes only. Not medical advice.
      </p>
    </div>
  );
}
