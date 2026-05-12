import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const STORAGE_KEY = "soul-true-ambient-audio";
const AUDIO_SRC = "/audio/ambient.mp3";
const TARGET_VOLUME = 0.25;

/** Ambient singing-bowl/forest loop with persisted toggle. Auto-starts muted. */
export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  // restore preference (only auto-plays if user previously enabled and browser permits)
  useEffect(() => {
    const want = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1";
    if (want) void tryPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeIn = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 2000);
      if (audioRef.current) audioRef.current.volume = p * TARGET_VOLUME;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const tryPlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
      fadeIn();
      setPlaying(true);
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // autoplay blocked or audio missing — keep silent
      setAvailable(true);
    }
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "0");
    } else {
      await tryPlay();
    }
  };

  if (!available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
        className="fixed transition-all"
        style={{
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(26,18,9,0.8)",
          border: `1px solid rgba(201,168,76,${playing ? 0.55 : 0.35})`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: playing ? "#E8821A" : "#C9A84C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 60,
          boxShadow: playing
            ? "0 0 16px rgba(232,130,26,0.35)"
            : "0 4px 16px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(232,130,26,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(201,168,76,${playing ? 0.55 : 0.35})`;
          e.currentTarget.style.boxShadow = playing
            ? "0 0 16px rgba(232,130,26,0.35)"
            : "0 4px 16px rgba(0,0,0,0.4)";
        }}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
