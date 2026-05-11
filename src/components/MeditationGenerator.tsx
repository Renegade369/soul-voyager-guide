import { useEffect, useRef, useState } from "react";
import { Sparkles, Loader2, Play, Pause, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function MeditationGenerator() {
  const [theme, setTheme] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setError(null);
    setScript("");
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setSpeaking(false);
    setPaused(false);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meditation-generate`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          feeling: "open and ready to receive",
          shiftTarget: theme,
          pillar: theme,
        }),
      });

      if (!resp.ok || !resp.body) {
        const t = await resp.text();
        throw new Error(t || "Failed to generate meditation");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              full += delta;
              setScript(full);
            }
          } catch {
            // ignore parse errors on partial chunks
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const speakingSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const handleSpeak = () => {
    if (!speakingSupported || !script) return;
    window.speechSynthesis.cancel();
    const cleaned = script
      .replace(/\[long pause\]/gi, ". . . . . .")
      .replace(/\[pause\]/gi, ". . .")
      .replace(/[#*_`>]/g, "");
    const u = new SpeechSynthesisUtterance(cleaned);
    u.rate = 0.85;
    u.pitch = 0.95;
    u.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /female|samantha|victoria|karen|moira/i.test(v.name)) ||
      voices.find((v) => v.lang?.startsWith("en"));
    if (preferred) u.voice = preferred;
    u.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    u.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setSpeaking(true);
    setPaused(false);
  };

  const handlePauseResume = () => {
    if (!speakingSupported) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const handleStop = () => {
    if (!speakingSupported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 pb-24">
      <div className="border-t border-white/10 pt-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-amber-400/80 text-xs tracking-[0.22em] uppercase mb-3">
            <Sparkles size={14} />
            <span>AI Guided Practice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
            Generate Your Own Sacred Meditation
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Type a theme or intention. Receive a personalized guided meditation, read aloud in your browser.
          </p>
        </div>

        <div
          className="rounded-2xl border border-white/10 p-6 sm:p-8"
          style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1205 100%)" }}
        >
          <label className="block text-xs uppercase tracking-widest text-amber-400/70 mb-2">
            Your intention
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder='e.g. "releasing grief", "calling in abundance"'
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/40"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) handleGenerate();
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !theme.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-400/90 hover:bg-amber-400 text-black font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-400/90 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {script && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {!speaking ? (
                  <button
                    onClick={handleSpeak}
                    disabled={!speakingSupported}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-400/40 text-amber-400 hover:bg-amber-400/10 transition-colors text-sm disabled:opacity-40"
                  >
                    <Play size={14} /> Read Aloud
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePauseResume}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-400/40 text-amber-400 hover:bg-amber-400/10 transition-colors text-sm"
                    >
                      {paused ? <Play size={14} /> : <Pause size={14} />}
                      {paused ? "Resume" : "Pause"}
                    </button>
                    <button
                      onClick={handleStop}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white/70 hover:bg-white/5 transition-colors text-sm"
                    >
                      <Square size={14} /> Stop
                    </button>
                  </>
                )}
                {!speakingSupported && (
                  <span className="text-xs text-white/40">Text-to-speech unavailable in this browser.</span>
                )}
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-5 max-h-[480px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-white/80 text-sm leading-relaxed">
                  {script}
                </pre>
              </div>
              <p className="mt-3 text-[11px] text-white/30 italic">
                For educational and inspirational purposes only. Not medical advice.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
