import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MeditationPlayer from "@/components/MeditationPlayer";

export default function MeditationGenerator() {
  const [theme, setTheme] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setError(null);
    setScript("");

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

      if (!resp.ok || !resp.body) throw new Error(await resp.text() || "Failed to generate");

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
            if (delta) { full += delta; setScript(full); }
          } catch { /* partial */ }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 pb-24">
      <div className="border-t pt-12" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: "#C9A84C" }}>
            <Sparkles size={12} className="inline mr-1.5 -mt-0.5" /> Soul True Guided Practice
          </p>
          <h2 className="text-3xl sm:text-4xl mb-3" style={{ fontFamily: '"Cormorant Garamond", serif', color: "#F5F0E8" }}>
            Generate Your Own Sacred Meditation
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.55)" }}>
            Type a theme or intention. Receive a personalized guided meditation, voiced for you.
          </p>
        </div>

        <div className="p-6 sm:p-8" style={{ background: "#1A1209", border: "1px solid rgba(201,168,76,0.22)" }}>
          <label className="block text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "#C9A84C" }}>Your intention</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder='e.g. "releasing grief", "calling in abundance"'
              className="flex-1 bg-black/40 px-4 py-3 outline-none"
              style={{ border: "1px solid rgba(201,168,76,0.25)", color: "#F5F0E8" }}
              onKeyDown={(e) => { if (e.key === "Enter" && !loading) handleGenerate(); }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !theme.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-[0.22em] text-[11px] disabled:opacity-40"
              style={{ background: "#C9A84C", color: "#0A0A0A" }}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {loading ? "Generating…" : "Generate"}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-sm px-3 py-2" style={{ color: "#E8821A", background: "rgba(232,130,26,0.08)", border: "1px solid rgba(232,130,26,0.3)" }}>
              {error}
            </div>
          )}

          {script && (
            <div className="mt-6 space-y-6">
              <MeditationPlayer title={theme} text={script} loading={loading} />
              <div className="bg-black/40 p-5 max-h-[400px] overflow-y-auto" style={{ border: "1px solid rgba(201,168,76,0.18)" }}>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>{script}</pre>
              </div>
              <p className="text-[11px] italic" style={{ color: "rgba(245,240,232,0.4)" }}>
                For educational and inspirational purposes only.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
