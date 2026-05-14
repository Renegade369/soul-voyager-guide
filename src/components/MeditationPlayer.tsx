import { useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2, Mail, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const C = { gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.25)" };

const AMBIENT: Record<string, { label: string; emoji: string; url: string | null }> = {
  none: { label: "None", emoji: "·", url: null },
  rain: {
    label: "Rain + Thunder",
    emoji: "🌧",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_d1718ab41b.mp3?filename=rain-and-thunder-nature-sounds-8052.mp3",
  },
  forest: {
    label: "Forest / Birds",
    emoji: "🌲",
    url: "https://cdn.pixabay.com/download/audio/2022/03/09/audio_2dde668ca8.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3",
  },
  ocean: {
    label: "Ocean Waves",
    emoji: "🌊",
    url: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_711d8b5b41.mp3?filename=ocean-waves-112762.mp3",
  },
  bowls: {
    label: "Tibetan Bowls",
    emoji: "🔔",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=tibetan-singing-bowls-110488.mp3",
  },
};

const STORAGE_KEY = "soul_true_ambient";

export default function MeditationPlayer({
  title,
  text,
  loading,
}: {
  title: string;
  text: string; // meditation script (intro is added server-side)
  loading?: boolean;
}) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ambient, setAmbient] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) || "none" : "none",
  );
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, ambient);
  }, [ambient]);

  // Cleanup on unmount or text change — critical so audio doesn't trap users when navigating away
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      ambientRef.current?.pause();
      ambientRef.current = null;
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // reset when meditation text changes
    audioRef.current?.pause();
    audioRef.current = null;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setPlaying(false);
    setError(null);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const generateAudio = async () => {
    setGenerating(true);
    setError(null);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meditation-tts`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ text, includeIntro: true }),
      });
      if (!resp.ok) {
        const t = await resp.text().catch(() => "");
        throw new Error(t || `TTS ${resp.status}`);
      }
      const blob = await resp.blob();
      const objUrl = URL.createObjectURL(blob);
      setAudioUrl(objUrl);
      return objUrl;
    } catch (e) {
      setError("Audio generation is temporarily unavailable — your meditation text is below.");
      console.error(e);
      return null;
    } finally {
      setGenerating(false);
    }
  };

  const startAmbient = () => {
    const cfg = AMBIENT[ambient];
    if (!cfg?.url) return;
    if (!ambientRef.current) {
      const a = new Audio(cfg.url);
      a.loop = true;
      a.volume = 0.35;
      ambientRef.current = a;
    }
    ambientRef.current.play().catch(() => {});
  };

  const stopAmbient = () => {
    ambientRef.current?.pause();
  };

  const handleStart = async () => {
    if (!text || generating) return;
    let url = audioUrl;
    if (!url) url = await generateAudio();
    if (!url) return;
    if (!audioRef.current) {
      const a = new Audio(url);
      a.onended = () => {
        setPlaying(false);
        stopAmbient();
      };
      a.onpause = () => setPlaying(false);
      a.onplay = () => setPlaying(true);
      audioRef.current = a;
    }
    audioRef.current.play().catch((e) => setError(String(e)));
    startAmbient();
  };

  const handlePause = () => {
    audioRef.current?.pause();
    stopAmbient();
  };

  const sendEmail = async () => {
    if (!email || !email.includes("@")) return;
    setEmailSending(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-reading-email`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          email,
          title: `Your ${title} Meditation`,
          sections: [
            { label: "Meditation", body: text },
            { label: "A Note", body: "Your Soul True meditation — read it anytime, anywhere." },
          ],
        }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      setEmailSent(true);
    } catch (e) {
      console.error(e);
      setError("Could not send email. Please try again.");
    } finally {
      setEmailSending(false);
    }
  };

  const isReady = !loading && !!text;

  return (
    <div className="space-y-5">
      {/* Ambient selector */}
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
          Background sound
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(AMBIENT).map(([key, cfg]) => {
            const active = ambient === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setAmbient(key);
                  if (ambientRef.current) {
                    ambientRef.current.pause();
                    ambientRef.current = null;
                    if (playing && AMBIENT[key].url) {
                      const a = new Audio(AMBIENT[key].url!);
                      a.loop = true;
                      a.volume = 0.35;
                      ambientRef.current = a;
                      a.play().catch(() => {});
                    }
                  }
                }}
                className="px-3 py-2 text-xs transition-colors"
                style={{
                  border: `1px solid ${active ? C.gold : "rgba(245,240,232,0.18)"}`,
                  color: active ? C.gold : "rgba(245,240,232,0.7)",
                  background: active ? "rgba(201,168,76,0.08)" : "transparent",
                  borderRadius: 4,
                }}
              >
                <span className="mr-1.5">{cfg.emoji}</span>{cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Start / Pause */}
      <div className="flex flex-col items-center gap-3 py-6">
        <button
          onClick={playing ? handlePause : handleStart}
          disabled={!isReady || generating}
          className="flex h-24 w-24 items-center justify-center transition-all hover:shadow-[0_0_36px_rgba(232,130,26,0.55)] disabled:opacity-40"
          style={{
            background: `linear-gradient(135deg, ${C.gold}, #D4A017)`,
            color: "#0A0A0A",
            borderRadius: "50%",
            border: `2px solid ${C.gold}`,
          }}
          aria-label={playing ? "Pause meditation" : "Start meditation"}
        >
          {generating ? <Loader2 size={32} className="animate-spin" /> : playing ? <Pause size={36} /> : <Play size={36} className="ml-1" />}
        </button>
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(245,240,232,0.55)" }}>
          {generating ? "Preparing your voice…" : playing ? "Playing — close your eyes" : "Tap to begin"}
        </p>
      </div>

      {error && (
        <div className="text-sm px-4 py-3" style={{ color: "#E8821A", background: "rgba(232,130,26,0.08)", border: "1px solid rgba(232,130,26,0.3)" }}>
          {error}
        </div>
      )}

      {/* Email button */}
      <div className="flex justify-center">
        <button
          onClick={() => setEmailOpen(true)}
          disabled={!isReady}
          className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
          style={{ color: C.gold, border: `1px solid ${C.border}`, borderRadius: 4 }}
        >
          <Mail size={13} /> Email me this meditation
        </button>
      </div>

      {emailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setEmailOpen(false)}>
          <div className="w-full max-w-md p-6" style={{ background: C.overlay, border: `1px solid ${C.border}` }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl" style={{ fontFamily: '"Cormorant Garamond", serif', color: C.text }}>Send to your inbox</h3>
              <button onClick={() => setEmailOpen(false)} style={{ color: "rgba(245,240,232,0.5)" }}><X size={20} /></button>
            </div>
            {emailSent ? (
              <p className="text-sm" style={{ color: C.text }}>Sent. Check your inbox in a moment.</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 mb-3 bg-black/40 outline-none"
                  style={{ border: `1px solid ${C.border}`, color: C.text }}
                />
                <button
                  onClick={sendEmail}
                  disabled={emailSending || !email.includes("@")}
                  className="w-full py-2.5 text-[11px] uppercase tracking-[0.22em] font-bold disabled:opacity-40"
                  style={{ background: C.gold, color: "#0A0A0A" }}
                >
                  {emailSending ? "Sending…" : "Send Meditation"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
