import { useState, useRef, useEffect, useCallback } from "react";
import {
  Brain, Heart, Sun, Sparkles, Eye, Flame, Target, Shield,
  Play, Pause, Square, Copy, BookOpen, Save, ChevronDown, Loader2, Volume2,
} from "lucide-react";
import { C, fonts, Emblem, Eyebrow, HeroTitle, GoldText, GoldRule } from "./GuideShared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { sendEmail } from "@/lib/email.functions";
import { meditationEmail } from "@/lib/emailTemplates";
import ReactMarkdown from "react-markdown";

/* ───── helpers ───── */
const stripMarkdown = (md: string) =>
  md.replace(/#{1,6}\s?/g, "").replace(/\*{1,3}(.*?)\*{1,3}/g, "$1").replace(/_+(.*?)_+/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[`~>]/g, "").replace(/\n{2,}/g, "\n").trim();

const fmtTime = (s: number) => {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/* ───── meditation data ───── */
const MEDITATIONS = [
  { id: 1, icon: Brain, title: "Rewiring the Subconscious Mind", duration: "15 min", desc: "Break the invisible programs running your life. This meditation speaks directly to your subconscious, replacing fear, limitation, and old conditioning with new empowering beliefs. Best listened to just before sleep." },
  { id: 2, icon: Heart, title: "Heart/Brain Coherence", duration: "12 min", desc: "Science and soul unite. This practice synchronizes your heart and brain into a state of coherence — the most powerful state a human being can enter. From here, decisions clarify and manifestation becomes effortless." },
  { id: 3, icon: Sun, title: "Living in the Present Moment", duration: "10 min", desc: "The past is a memory. The future is a thought. This is the only moment that exists. This meditation anchors you so deeply in the now that anxiety dissolves and your true power becomes available." },
  { id: 4, icon: Sparkles, title: "Abundance Programming", duration: "18 min", desc: "Your relationship with money, success, and worthiness lives in the subconscious. This session reprograms scarcity thinking at the root level and installs a new abundance frequency." },
  { id: 5, icon: Eye, title: "The Awakened Mind", duration: "20 min", desc: "Access the theta brainwave state where subconscious reprogramming happens most powerfully. This deep meditation opens the door between your conscious intentions and your subconscious reality." },
  { id: 6, icon: Heart, title: "Living From the Heart", duration: "14 min", desc: "Your heart is not just a pump — it's an intelligence center 100 times more powerful than your brain electromagnetically. This meditation teaches you to lead your life from heart wisdom rather than fear-based thinking." },
  { id: 7, icon: Target, title: "Purpose Activation", duration: "16 min", desc: "You came here with a purpose. This meditation helps you feel it, not just think it. Drop below the noise of daily life and reconnect with the deeper signal of why you are here." },
  { id: 8, icon: Shield, title: "Releasing Fear and Scarcity", duration: "13 min", desc: "Fear and scarcity are programs, not truths. This session uses breath, visualization, and direct subconscious communication to dissolve the patterns that keep you small and playing it safe." },
];

const PILLARS = [
  "Physical",
  "Mental & Emotional",
  "Spiritual",
  "Work, Wealth & Purpose",
];

/* ───── Audio Card ───── */
function MeditationCard({ m }: { m: typeof MEDITATIONS[0] }) {
  const Icon = m.icon;
  return (
    <div className="relative overflow-hidden rounded-xl border" style={{ backgroundColor: C.card, borderColor: C.border }}>
      {/* Coming Soon overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${C.bg}cc`, backdropFilter: "blur(2px)" }}>
        <span className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em]" style={{ borderColor: C.gold, color: C.gold, fontFamily: fonts.body }}>
          Coming Soon
        </span>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${C.gold}15` }}>
            <Icon size={18} style={{ color: C.gold }} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium" style={{ fontFamily: fonts.display, color: C.text }}>{m.title}</h4>
            <span className="text-[11px]" style={{ fontFamily: fonts.body, color: C.muted }}>{m.duration}</span>
          </div>
        </div>
        <p className="mb-4 text-xs leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>{m.desc}</p>

        {/* Fake player */}
        <div className="flex items-center gap-3 rounded-lg p-2.5" style={{ backgroundColor: C.inner }}>
          <button className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: C.teal }}>
            <Play size={14} fill="white" color="white" />
          </button>
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: `${C.dim}40` }}>
              <div className="h-full w-0 rounded-full" style={{ backgroundColor: C.gold }} />
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>0:00</span>
              <span className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>{m.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Main Tab ───── */
export function MeditationsTab() {
  const { user } = useAuth();
  const sendEmailFn = useServerFn(sendEmail);
  const [feeling, setFeeling] = useState("");
  const [shiftTarget, setShiftTarget] = useState("");
  const [pillar, setPillar] = useState("");
  const [generating, setGenerating] = useState(false);
  const [meditation, setMeditation] = useState("");
  const [saving, setSaving] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  /* ── TTS / audio state ── */
  const [ttsState, setTtsState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioUrlsRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const totalChunksRef = useRef(0);
  const [ttsChunkProgress, setTtsChunkProgress] = useState({ loaded: 0, total: 0 });
  const ttsAbortRef = useRef(false);

  // Split text into chunks at sentence boundaries, max ~500 chars each
  const chunkText = (text: string, maxLen = 500): string[] => {
    const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
    const chunks: string[] = [];
    let current = "";
    for (const s of sentences) {
      if ((current + s).length > maxLen && current.length > 0) {
        chunks.push(current.trim());
        current = s;
      } else {
        current += s;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      ttsAbortRef.current = true;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      audioUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      audioUrlsRef.current = [];
    };
  }, []);

  const fetchChunkAudio = async (chunk: string): Promise<Blob> => {
    const resp = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text: chunk }),
      },
    );
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ error: "TTS failed" }));
      throw new Error(err.error || `TTS failed: ${resp.status}`);
    }
    return resp.blob();
  };

  const playAudioBlob = (blob: Blob): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      audioUrlsRef.current.push(url);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener("loadedmetadata", () => {
        setAudioDuration((prev) => prev + audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        const chunkOffset = chunkIndexRef.current;
        const total = totalChunksRef.current;
        const chunkFraction = total > 0 ? (chunkOffset + (audio.duration ? audio.currentTime / audio.duration : 0)) / total : 0;
        setAudioProgress(chunkFraction * 100);
        setAudioCurrentTime(audio.currentTime);
      });
      audio.addEventListener("ended", () => resolve());
      audio.addEventListener("error", () => reject(new Error("Audio playback failed")));

      audio.play().catch(reject);
    });
  };

  const requestTTS = useCallback(async () => {
    if (ttsState === "paused" && audioRef.current) {
      audioRef.current.play();
      setTtsState("playing");
      return;
    }

    // Stop any existing playback
    ttsAbortRef.current = true;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    audioUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    audioUrlsRef.current = [];

    ttsAbortRef.current = false;
    setTtsState("loading");
    setAudioProgress(0);
    setAudioCurrentTime(0);
    setAudioDuration(0);

    try {
      const text = stripMarkdown(meditation);
      const chunks = chunkText(text);
      totalChunksRef.current = chunks.length;
      setTtsChunkProgress({ loaded: 0, total: chunks.length });

      // Pre-fetch first chunk, then start playing while fetching rest
      const blobs: Blob[] = [];

      // Fetch all chunks first for smoother playback
      for (let i = 0; i < chunks.length; i++) {
        if (ttsAbortRef.current) return;
        const blob = await fetchChunkAudio(chunks[i]);
        blobs.push(blob);
        setTtsChunkProgress({ loaded: i + 1, total: chunks.length });
        // Start playing after first chunk is ready
        if (i === 0) setTtsState("playing");
      }

      // Play all chunks sequentially
      for (let i = 0; i < blobs.length; i++) {
        if (ttsAbortRef.current) return;
        chunkIndexRef.current = i;
        await playAudioBlob(blobs[i]);
      }

      setTtsState("idle");
      setAudioProgress(0);
    } catch (e: any) {
      if (!ttsAbortRef.current) {
        console.error("TTS error:", e);
        toast.error(e.message || "Something went wrong with text-to-speech");
        setTtsState("idle");
      }
    }
  }, [meditation, ttsState]);

  const pauseTTS = () => { audioRef.current?.pause(); setTtsState("paused"); };
  const stopTTS = () => {
    ttsAbortRef.current = true;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    audioUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    audioUrlsRef.current = [];
    setTtsState("idle"); setAudioProgress(0); setAudioCurrentTime(0);
  };

  // Ensure voices are loaded
  useEffect(() => { speechSynthesis.getVoices(); }, []);

  const generate = async () => {
    if (!feeling.trim() || !shiftTarget.trim() || !pillar) {
      toast.error("Please fill out all three fields");
      return;
    }
    setGenerating(true);
    setMeditation("");
    stopTTS();

    try {
      abortRef.current = new AbortController();
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meditation-generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ feeling, shiftTarget, pillar }),
          signal: abortRef.current.signal,
        },
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Unknown error" }));
        toast.error(err.error || "Failed to generate meditation");
        setGenerating(false);
        return;
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (typeof delta === "string") {
              full += delta;
              setMeditation(full);
            }
          } catch { /* partial */ }
        }
      }
      // Send meditation email after stream completes
      if (user?.email && full.length > 100) {
        sendEmailFn({ data: { to: user.email, subject: "Your Personalized Soul True Meditation", html: meditationEmail(feeling, pillar, full) } }).catch(e => console.error("Meditation email failed:", e));
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("meditation generate error", e);
        toast.error("Something went wrong generating your meditation");
      }
    } finally {
      setGenerating(false);
    }
  };

  const copyMeditation = () => {
    navigator.clipboard.writeText(meditation);
    toast.success("Meditation copied to clipboard");
  };

  const saveMeditation = async () => {
    if (!user) {
      toast.info("Sign in to save meditations to your profile");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("saved_meditations").insert({
        user_id: user.id,
        feeling,
        shift_target: shiftTarget,
        pillar,
        content: meditation,
      });
      if (error) throw error;
      toast.success("Meditation saved to your profile ✓");
    } catch {
      toast.error("Error saving meditation");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ color: C.text }}>
      {/* Hero */}
      <div className="py-16 text-center">
        <Emblem icon={<Brain size={32} />} />
        <Eyebrow>Guided Meditations</Eyebrow>
        <HeroTitle>
          Reprogram Your <GoldText>Subconscious.</GoldText>
        </HeroTitle>
        <p className="mx-auto mt-4 max-w-lg text-sm" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
          Guided sessions designed to rewire your deepest patterns — combining neuroscience, heart coherence, and spiritual wisdom. For educational and inspirational purposes only.
        </p>
      </div>

      {/* ─── PART 1: Audio Library ─── */}
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
            Audio Library
          </p>
          <h3 className="mt-2 text-2xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
            8 Guided Sessions
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {MEDITATIONS.map((m) => (
            <MeditationCard key={m.id} m={m} />
          ))}
        </div>
      </div>

      <GoldRule />

      {/* ─── PART 2: AI Generator ─── */}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
            Your Personalized Meditation
          </p>
          <h3 className="mt-2 text-2xl font-light" style={{ fontFamily: fonts.display, color: C.text }}>
            Generate Your <span className="italic" style={{ color: C.gold }}>Personal</span> Meditation
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
            Tell us where you are right now and AI will write a guided meditation session personalized specifically for you — your challenges, your goals, your journey.
          </p>
        </div>

        <div className="rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
          {/* Input 1 */}
          <label className="mb-1.5 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.gold }}>
            How are you feeling right now?
          </label>
          <textarea
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="Be honest. Stressed, anxious, stuck, excited, lost, hopeful... whatever is true."
            rows={3}
            className="mb-5 w-full resize-none rounded-lg px-4 py-3 text-sm outline-none placeholder:opacity-40"
            style={{ backgroundColor: C.inner, color: C.text, border: `0.5px solid ${C.border}`, fontFamily: fonts.body }}
          />

          {/* Input 2 */}
          <label className="mb-1.5 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.gold }}>
            What do you most want to shift?
          </label>
          <textarea
            value={shiftTarget}
            onChange={(e) => setShiftTarget(e.target.value)}
            placeholder="A belief, a pattern, a fear, a relationship with money or purpose..."
            rows={3}
            className="mb-5 w-full resize-none rounded-lg px-4 py-3 text-sm outline-none placeholder:opacity-40"
            style={{ backgroundColor: C.inner, color: C.text, border: `0.5px solid ${C.border}`, fontFamily: fonts.body }}
          />

          {/* Input 3 */}
          <label className="mb-1.5 block text-xs uppercase tracking-wider" style={{ fontFamily: fonts.body, color: C.gold }}>
            Which pillar needs the most attention?
          </label>
          <div className="relative mb-6">
            <select
              value={pillar}
              onChange={(e) => setPillar(e.target.value)}
              className="w-full appearance-none rounded-lg px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: C.inner, color: pillar ? C.text : C.dim, border: `0.5px solid ${C.border}`, fontFamily: fonts.body }}
            >
              <option value="">Select a pillar...</option>
              {PILLARS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: C.dim }} />
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={generating}
            className="w-full rounded-md py-3 text-xs font-medium uppercase tracking-[0.22em] transition-opacity disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${C.goldDark}, ${C.gold})`,
              color: C.bg,
              fontFamily: fonts.body,
            }}
          >
            {generating ? "Crafting your personalized meditation..." : "Generate My Meditation →"}
          </button>
        </div>

        {/* Loading */}
        {generating && !meditation && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <Loader2 size={28} className="animate-spin" style={{ color: C.gold }} />
            <p className="animate-pulse text-sm" style={{ fontFamily: fonts.body, color: C.muted }}>
              Crafting your personalized meditation...
            </p>
          </div>
        )}

        {/* Result */}
        {meditation && (
          <div className="mt-8 rounded-xl border" style={{ backgroundColor: C.card, borderColor: C.border }}>
            <div className="border-b p-5" style={{ borderColor: C.border }}>
              <p className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
                Your Personalized Meditation
              </p>
            </div>
            <div
              className="max-h-[60vh] overflow-y-auto p-6"
              style={{ fontFamily: fonts.body, color: C.text, fontWeight: 300 }}
            >
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <>
                        <div className="my-6 flex items-center gap-3">
                          <div className="h-px flex-1" style={{ backgroundColor: `${C.gold}33` }} />
                          <div className="h-2 w-2 rotate-45" style={{ border: `1px solid ${C.gold}`, opacity: 0.5 }} />
                          <div className="h-px flex-1" style={{ backgroundColor: `${C.gold}33` }} />
                        </div>
                        <h2 className="mb-3 text-xl font-light" style={{ fontFamily: fonts.display, color: C.gold }}>
                          {children}
                        </h2>
                      </>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 mt-4 text-base font-medium" style={{ fontFamily: fonts.display, color: C.text }}>
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 text-sm leading-relaxed" style={{ color: C.muted, fontWeight: 300 }}>
                        {children}
                      </p>
                    ),
                    em: ({ children }) => (
                      <em style={{ color: C.gold, fontStyle: "italic" }}>{children}</em>
                    ),
                  }}
                >
                  {meditation}
                </ReactMarkdown>
              </div>
            </div>

            {/* Audio Player — shows when audio is loaded */}
            {ttsState !== "idle" && ttsState !== "loading" && (
              <div className="border-t px-5 pt-4 pb-2" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: C.inner }}>
                  <button
                    onClick={ttsState === "playing" ? pauseTTS : requestTTS}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                    style={{ backgroundColor: C.teal }}
                  >
                    {ttsState === "playing"
                      ? <Pause size={15} fill="white" color="white" />
                      : <Play size={15} fill="white" color="white" />}
                  </button>
                  <div className="flex-1">
                    <div
                      className="h-1.5 overflow-hidden rounded-full"
                      style={{ backgroundColor: `${C.dim}40` }}
                    >
                      <div className="h-full rounded-full transition-all" style={{ backgroundColor: C.gold, width: `${audioProgress}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between">
                      <span className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>
                        Part {chunkIndexRef.current + 1} of {totalChunksRef.current}
                      </span>
                      <span className="text-[10px]" style={{ fontFamily: fonts.body, color: C.dim }}>{fmtTime(audioCurrentTime)}</span>
                    </div>
                  </div>
                  <button
                    onClick={stopTTS}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${C.border}` }}
                  >
                    <Square size={12} style={{ color: C.muted }} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 border-t p-5" style={{ borderColor: C.border }}>
              <button
                onClick={copyMeditation}
                className="flex items-center gap-2 rounded-md border px-4 py-2 text-xs"
                style={{ borderColor: C.teal, color: C.teal, fontFamily: fonts.body }}
              >
                <Copy size={14} /> Copy Full Meditation
              </button>
              {ttsState === "idle" && (
                <button
                  onClick={requestTTS}
                  className="flex items-center gap-2 rounded-md border px-4 py-2 text-xs transition-colors"
                  style={{ borderColor: C.teal, color: C.teal, fontFamily: fonts.body }}
                >
                  <Volume2 size={14} /> Read This to Me
                </button>
              )}
              {ttsState === "loading" && (
                <button
                  disabled
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-xs"
                  style={{ backgroundColor: `${C.teal}20`, color: C.teal, fontFamily: fonts.body }}
                >
                  <Loader2 size={14} className="animate-spin" />
                  {ttsChunkProgress.total > 0
                    ? `Generating voice... (${ttsChunkProgress.loaded}/${ttsChunkProgress.total} parts)`
                    : "Generating voice..."}
                </button>
              )}
              <button
                onClick={saveMeditation}
                disabled={saving}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium"
                style={{ backgroundColor: `${C.gold}20`, color: C.gold, fontFamily: fonts.body }}
              >
                <Save size={14} /> {saving ? "Saving..." : "Save to My Meditations"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mx-auto mt-12 max-w-2xl pb-8 text-center">
        <p className="text-[10px] leading-relaxed" style={{ fontFamily: fonts.body, color: C.dim }}>
          These meditations are for educational and inspirational purposes only. They are not a substitute for professional medical or psychological advice, diagnosis, or treatment. Always consult a qualified professional for health concerns.
        </p>
      </div>
    </div>
  );
}
