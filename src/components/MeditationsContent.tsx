import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square, X, Clock, Loader2 } from "lucide-react";
import MeditationGenerator from "@/components/MeditationGenerator";
import { supabase } from "@/integrations/supabase/client";

const IMAGE_HERO = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778539783382.png";
const IMAGE_RELEASING_FEAR = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778539831064.png";
const IMAGE_LIVING_HEART = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778539877125.png";
const IMAGE_THETA = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778539928386.png";
const IMAGE_PURPOSE = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778539972297.png";
const IMAGE_ABUNDANCE = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778540016198.png";
const IMAGE_COHERENCE = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778540064520.png";
const IMAGE_REWIRING = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778540111861.png";
const IMAGE_PRESENT = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778540149195.png";
const IMAGE_AI_GENERATOR = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1778540196366.png";

interface Meditation {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
  audioUrl?: string;
  description: string;
}

const meditations: Meditation[] = [
  {
    id: "releasing-fear",
    title: "Releasing Fear & Scarcity",
    duration: "18 min",
    category: "Emotional Healing",
    image: IMAGE_RELEASING_FEAR,
    audioUrl: "/audio/releasing-fear.mp3",
    description: "Dissolve deep-rooted fear and scarcity patterns. Let the chains fall away and rise into freedom.",
  },
  {
    id: "living-heart",
    title: "Living from the Heart",
    duration: "22 min",
    category: "Heart Activation",
    image: IMAGE_LIVING_HEART,
    audioUrl: "/audio/living-from-heart.mp3",
    description: "Open the heart as your true intelligence center. Radiate love as your natural frequency.",
  },
  {
    id: "theta",
    title: "Theta Brainwave Journey",
    duration: "30 min",
    category: "Deep Mind",
    image: IMAGE_THETA,
    audioUrl: "/audio/theta-journey.mp3",
    description: "Descend into theta — the gateway to the subconscious. Access deep healing and expanded awareness.",
  },
  {
    id: "purpose",
    title: "Purpose Activation",
    duration: "20 min",
    category: "Soul Alignment",
    image: IMAGE_PURPOSE,
    audioUrl: "/audio/purpose-activation.mp3",
    description: "Call in your sacred mission. Align with the divine purpose that was meant for you.",
  },
  {
    id: "abundance",
    title: "Abundance Programming",
    duration: "25 min",
    category: "Wealth Consciousness",
    image: IMAGE_ABUNDANCE,
    audioUrl: "/audio/abundance-programming.mp3",
    description: "Reprogram your relationship with abundance. Plant seeds of prosperity deep in the subconscious mind.",
  },
  {
    id: "coherence",
    title: "Heart Brain Coherence",
    duration: "15 min",
    category: "Integration",
    image: IMAGE_COHERENCE,
    audioUrl: "/audio/heart-brain-coherence.mp3",
    description: "Synchronize heart and mind into perfect coherence. Science meets soul in this powerful practice.",
  },
  {
    id: "rewiring",
    title: "Rewiring the Subconscious",
    duration: "28 min",
    category: "Deep Mind",
    image: IMAGE_REWIRING,
    audioUrl: "/audio/rewiring-subconscious.mp3",
    description: "Break old neural patterns and lay down new golden pathways. Transform identity at the root level.",
  },
  {
    id: "present",
    title: "Living in the Present Moment",
    duration: "12 min",
    category: "Mindfulness",
    image: IMAGE_PRESENT,
    audioUrl: "/audio/present-moment.mp3",
    description: "Return home to now. Let time dissolve into the sacred stillness that has always been here.",
  },
];

function PlayModal({ meditation, onClose }: { meditation: Meditation; onClose: () => void }) {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speakingSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    let cancelled = false;
    const generate = async () => {
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
            shiftTarget: meditation.title,
            pillar: meditation.category,
          }),
        });
        if (!resp.ok || !resp.body) throw new Error(await resp.text());
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let full = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (cancelled) return;
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
                if (!cancelled) setScript(full);
              }
            } catch {
              /* partial chunk */
            }
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to generate meditation");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    generate();
    return () => {
      cancelled = true;
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, [meditation.title, meditation.category]);

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
    u.onend = () => { setSpeaking(false); setPaused(false); };
    u.onerror = () => { setSpeaking(false); setPaused(false); };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setSpeaking(true);
    setPaused(false);
  };

  const handlePauseResume = () => {
    if (!speakingSupported) return;
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };

  const handleStop = () => {
    if (!speakingSupported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  const handleClose = () => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1205 100%)" }}
      >
        <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
          <img src={meditation.image} alt={meditation.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-1"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-medium text-amber-400/90 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1">
              {meditation.category}
            </span>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <h3 className="text-xl font-semibold text-white mb-1">{meditation.title}</h3>
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Clock size={13} />
            <span>{meditation.duration}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">{meditation.description}</p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {loading && (
              <span className="inline-flex items-center gap-2 text-amber-400/80 text-sm">
                <Loader2 size={14} className="animate-spin" /> Generating your meditation…
              </span>
            )}
            {!loading && script && !speaking && (
              <button
                onClick={handleSpeak}
                disabled={!speakingSupported}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-400/40 text-amber-400 hover:bg-amber-400/10 transition-colors text-sm disabled:opacity-40"
              >
                <Play size={14} /> Read Aloud
              </button>
            )}
            {speaking && (
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
            {!speakingSupported && script && (
              <span className="text-xs text-white/40">Text-to-speech unavailable in this browser.</span>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-400/90 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}

          {script && (
            <div className="bg-black/40 border border-white/10 rounded-lg p-4 max-h-[40vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-white/80 text-sm leading-relaxed">{script}</pre>
            </div>
          )}

          <p className="mt-3 text-[11px] text-white/30 italic">
            For educational and inspirational purposes only. Not medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function MeditationCard({ meditation, onPlay }: { meditation: Meditation; onPlay: (m: Meditation) => void }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      style={{
        minHeight: "280px",
        borderRadius: 16,
        border: "1px solid rgba(201,168,76,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={() => onPlay(meditation)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,130,26,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.6)";
      }}
    >
      <img
        src={meditation.image}
        alt={meditation.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(26,18,9,0.5) 50%, rgba(26,18,9,0.1) 100%)" }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(232,130,26,0.18)", border: "1px solid rgba(232,130,26,0.55)" }}>
          <Play size={22} style={{ color: "#E8821A", marginLeft: 2 }} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs font-medium rounded-full px-2.5 py-0.5 mb-2 inline-block" style={{ color: "#C9A84C", background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.25)" }}>
          {meditation.category}
        </span>
        <h3 className="font-semibold text-base leading-tight mb-1" style={{ color: "#F5F0E8" }}>{meditation.title}</h3>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(245,240,232,0.5)" }}>
          <Clock size={11} />
          <span>{meditation.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default function MeditationsContent({ withHero = true }: { withHero?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingMeditation, setPlayingMeditation] = useState<Meditation | null>(null);

  const categories = ["All", ...Array.from(new Set(meditations.map((m) => m.category)))];
  const filtered = activeCategory === "All" ? meditations : meditations.filter((m) => m.category === activeCategory);

  return (
    <div style={{ background: "linear-gradient(180deg, #050505 0%, #0d0a00 100%)" }} className="min-h-full">
      {withHero && (
        <div className="relative h-72 flex items-end pb-10 px-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${IMAGE_HERO}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="relative max-w-4xl mx-auto w-full">
            <p className="text-amber-400/70 text-sm tracking-widest uppercase mb-2">Soul True</p>
            <h1 className="text-4xl font-bold text-white mb-2">Sacred Meditations</h1>
            <p className="text-white/50 text-base max-w-lg">
              Guided journeys for deep transformation and soul alignment.
            </p>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-amber-400/20 border-amber-400/50 text-amber-400"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => (
            <MeditationCard key={m.id} meditation={m} onPlay={setPlayingMeditation} />
          ))}
        </div>
      </div>
      <MeditationGenerator />
      {playingMeditation && (
        <PlayModal meditation={playingMeditation} onClose={() => setPlayingMeditation(null)} />
      )}
    </div>
  );
}
