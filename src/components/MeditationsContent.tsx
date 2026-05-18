import { useEffect, useRef, useState } from "react";
import { Play, X, Clock, Loader2 } from "lucide-react";
import MeditationGenerator from "@/components/MeditationGenerator";
import MeditationPlayer from "@/components/MeditationPlayer";
import { supabase } from "@/integrations/supabase/client";
import { PlantImageBand, PLANT_IMAGES } from "@/components/PlantImageBand";

const IMG = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/";
const IMAGE_HERO = `${IMG}1778539783382.png`;

interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
  description: string;
}

const meditations: Meditation[] = [
  { id: "releasing-fear", title: "Releasing Fear & Scarcity", duration: "18 min", category: "Emotional Release", image: `${IMG}1778539831064.png`, description: "Dissolve deep-rooted fear and scarcity patterns. Let the chains fall away and rise into freedom." },
  { id: "living-heart", title: "Living from the Heart", duration: "22 min", category: "Heart Activation", image: `${IMG}1778539877125.png`, description: "Open the heart as your true intelligence center. Radiate love as your natural frequency." },
  { id: "theta", title: "Theta Brainwave Journey", duration: "30 min", category: "Deep Mind", image: `${IMG}1778539928386.png`, description: "Descend into theta — the gateway to the subconscious. Access deep awareness." },
  { id: "purpose", title: "Purpose Activation", duration: "20 min", category: "Soul Alignment", image: `${IMG}1778539972297.png`, description: "Call in your sacred mission. Align with the divine purpose that was meant for you." },
  { id: "abundance", title: "Abundance Programming", duration: "25 min", category: "Wealth Consciousness", image: `${IMG}1778540016198.png`, description: "Reprogram your relationship with abundance. Plant seeds of prosperity in the subconscious." },
  { id: "coherence", title: "Heart Brain Coherence", duration: "15 min", category: "Integration", image: `${IMG}1778540064520.png`, description: "Synchronize heart and mind into perfect coherence. Science meets soul in this practice." },
  { id: "rewiring", title: "Rewiring the Subconscious", duration: "28 min", category: "Deep Mind", image: `${IMG}1778540111861.png`, description: "Break old neural patterns and lay down new golden pathways. Transform identity at the root." },
  { id: "present", title: "Living in the Present Moment", duration: "12 min", category: "Mindfulness", image: `${IMG}1778540149195.png`, description: "Return home to now. Let time dissolve into the sacred stillness that has always been here." },
];

function PlayModal({ meditation, onClose }: { meditation: Meditation; onClose: () => void }) {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    const generate = async () => {
      setLoading(true); setError(null); setScript("");
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
            shiftTarget: meditation.title,
            pillar: meditation.category,
          }),
        });
        if (!resp.ok || !resp.body) throw new Error(await resp.text());
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = ""; let full = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelRef.current) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const payload = t.slice(5).trim();
            if (payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta && !cancelRef.current) { full += delta; setScript(full); }
            } catch { /* */ }
          }
        }
      } catch (e) {
        if (!cancelRef.current) setError(e instanceof Error ? e.message : "Failed to generate");
      } finally {
        if (!cancelRef.current) setLoading(false);
      }
    };
    generate();
    return () => { cancelRef.current = true; };
  }, [meditation.title, meditation.category]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col" style={{ background: "#1A1209", border: "1px solid rgba(201,168,76,0.25)" }}>
        <div className="relative h-44 flex-shrink-0 overflow-hidden">
          <img src={meditation.image} alt={meditation.title} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1209] to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-black/50 p-1.5" aria-label="Close" style={{ color: "#F5F0E8" }}>
            <X size={18} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: "#C9A84C" }}>{meditation.category}</p>
          <h3 className="text-2xl mb-1" style={{ fontFamily: '"Cormorant Garamond", serif', color: "#F5F0E8" }}>{meditation.title}</h3>
          <div className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "rgba(245,240,232,0.5)" }}>
            <Clock size={12} /><span>{meditation.duration}</span>
          </div>

          {loading && !script && (
            <div className="flex items-center gap-2 text-sm py-6 justify-center" style={{ color: "#C9A84C" }}>
              <Loader2 size={14} className="animate-spin" /> Preparing your meditation…
            </div>
          )}

          {error && (
            <div className="mb-4 text-sm px-3 py-2" style={{ color: "#E8821A", background: "rgba(232,130,26,0.08)", border: "1px solid rgba(232,130,26,0.3)" }}>
              {error}
            </div>
          )}

          {script && (
            <>
              <MeditationPlayer title={meditation.title} text={script} loading={loading} />
              <details className="mt-6">
                <summary className="text-[10px] uppercase tracking-[0.3em] cursor-pointer" style={{ color: "rgba(245,240,232,0.5)" }}>Read the script</summary>
                <div className="mt-3 bg-black/40 p-4 max-h-[40vh] overflow-y-auto" style={{ border: "1px solid rgba(201,168,76,0.15)" }}>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.8)" }}>{script}</pre>
                </div>
              </details>
              <p className="mt-4 text-[11px] italic" style={{ color: "rgba(245,240,232,0.4)" }}>
                For educational and inspirational purposes only.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MeditationCard({ meditation, onPlay }: { meditation: Meditation; onPlay: (m: Meditation) => void }) {
  return (
    <button
      onClick={() => onPlay(meditation)}
      className="group relative text-left overflow-hidden transition-all hover:scale-[1.02]"
      style={{ minHeight: 280, border: "1px solid rgba(201,168,76,0.18)", background: "#1A1209" }}
    >
      <img src={meditation.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95), rgba(10,10,10,0.2))" }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(232,130,26,0.2)", border: "1px solid #E8821A" }}>
          <Play size={22} style={{ color: "#E8821A", marginLeft: 2 }} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block text-[9px] uppercase tracking-[0.25em] mb-2 px-2 py-0.5" style={{ color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
          {meditation.category}
        </span>
        <h3 className="text-lg leading-tight mb-1" style={{ fontFamily: '"Cormorant Garamond", serif', color: "#F5F0E8" }}>{meditation.title}</h3>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(245,240,232,0.55)" }}>
          <Clock size={11} /><span>{meditation.duration}</span>
        </div>
      </div>
    </button>
  );
}

export default function MeditationsContent({ withHero = true }: { withHero?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playing, setPlaying] = useState<Meditation | null>(null);

  const categories = ["All", ...Array.from(new Set(meditations.map((m) => m.category)))];
  const filtered = activeCategory === "All" ? meditations : meditations.filter((m) => m.category === activeCategory);

  return (
    <div style={{ background: "#0A0A0A" }} className="min-h-full">
      {withHero && (
        <div className="relative h-72 flex items-end pb-10 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${IMAGE_HERO}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          <div className="relative max-w-4xl mx-auto w-full">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: "#C9A84C" }}>Soul True</p>
            <h1 className="text-5xl mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', color: "#F5F0E8" }}>Sacred Meditations</h1>
            <p className="text-base max-w-lg" style={{ color: "rgba(245,240,232,0.6)" }}>
              Guided journeys voiced in a warm, sacred tone. Headphones recommended.
            </p>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-6 flex gap-2 flex-wrap">
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] transition"
              style={{
                border: `1px solid ${active ? "#C9A84C" : "rgba(245,240,232,0.15)"}`,
                color: active ? "#C9A84C" : "rgba(245,240,232,0.6)",
                background: active ? "rgba(201,168,76,0.08)" : "transparent",
              }}>{cat}</button>
          );
        })}
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m) => <MeditationCard key={m.id} meditation={m} onPlay={setPlaying} />)}
      </div>
      <MeditationGenerator />
      <PlantImageBand src={PLANT_IMAGES.meditations} />
      {playing && <PlayModal meditation={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
