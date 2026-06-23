import { useEffect, useRef, useState } from "react";
import { Music2, MicOff } from "lucide-react";

// "To Sit With The Kings" by Tone Levels.
// TODO: replace with the canonical YouTube video ID once confirmed by William.
const YOUTUBE_VIDEO_ID = "Wf7ovwj-ues";
const STORAGE_KEY = "soul-true-homepage-music";

const C = { gold: "#C9A84C", bg: "#0A0A0A", text: "#F5F0E8", overlay: "#1A1209" };

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Restore last state (will only auto-resume after user clicks; YouTube/browser autoplay rules).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "on") setPlaying(true);
    } catch {}
  }, []);

  const send = (func: "playVideo" | "pauseVideo") => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
  };

  useEffect(() => {
    if (!ready) return;
    if (playing) send("playVideo");
    else send("pauseVideo");
    try { localStorage.setItem(STORAGE_KEY, playing ? "on" : "off"); } catch {}
  }, [playing, ready]);

  return (
    <div
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3"
      style={{ fontFamily: '"Outfit", sans-serif' }}
    >
      {/* Hidden YouTube iframe (audio only) */}
      <iframe
        ref={iframeRef}
        title="Soul True Homepage Music"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&modestbranding=1&playsinline=1`}
        allow="autoplay; encrypted-media"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        onLoad={() => setReady(true)}
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
