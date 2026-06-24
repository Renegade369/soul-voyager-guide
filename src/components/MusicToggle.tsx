import { useEffect, useRef, useState } from "react";
import { Music2, MicOff } from "lucide-react";

const STORAGE_KEY = "soul-true-homepage-music";

const C = { gold: "#C9A84C", bg: "#0A0A0A", text: "#F5F0E8", overlay: "#1A1209" };

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Restore last state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "on") setPlaying(true);
    } catch {}
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch(() => {
        // Silent fail — file may be missing or autoplay blocked
      });
    } else {
      audio.pause();
    }

    try {
      localStorage.setItem(STORAGE_KEY, playing ? "on" : "off");
    } catch {}
  }, [playing]);

  return (
    <div
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3"
      style={{ fontFamily: '"Outfit", sans-serif' }}
    >
      <audio
        ref={audioRef}
        src="/audio/homepage-music.mp3"
        preload="none"
        loop
        onError={() => {
          console.warn("[MusicToggle] homepage-music.mp3 failed to load");
        }}
      />

      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause homepage music" : "Play homepage music"}
        aria-pressed={playing}
        className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:scale-105"
        style={{
          background: playing ? C.gold : C.overlay,
          borderColor: C.gold,
          color: playing ? C.bg : C.gold,
          boxShadow: playing ? "0 0 24px rgba(232,130,26,0.4)" : "none",
        }}
      >
        {playing ? <Music2 size={18} /> : <MicOff size={18} />}
      </button>

      <p
        className="hidden md:block text-[10px] leading-tight max-w-[200px]"
        style={{ color: "rgba(245,240,232,0.55)" }}
      >
        Music: <em>"To Sit With The Kings"</em> by Tone Levels — used with permission.
      </p>
    </div>
  );
}
