import { useState } from "react";
import { Play, X, Clock } from "lucide-react";
import MeditationGenerator from "@/components/MeditationGenerator";

const IMAGE_HERO = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778449067909.png";
const IMAGE_RELEASING_FEAR = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447312570.png";
const IMAGE_LIVING_HEART = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448438907.png";
const IMAGE_THETA = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447011088.png";
const IMAGE_PURPOSE = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448859613.png";
const IMAGE_ABUNDANCE = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778447857528.png";
const IMAGE_COHERENCE = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778448421456.png";
const IMAGE_REWIRING = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778446922151.png";
const IMAGE_PRESENT = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778449004974.png";
const IMAGE_AI_GENERATOR = "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778449001316.png";

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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1205 100%)" }}
      >
        <div className="relative h-52 w-full overflow-hidden">
          <img src={meditation.image} alt={meditation.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <button
            onClick={onClose}
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
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-1">{meditation.title}</h3>
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Clock size={13} />
            <span>{meditation.duration}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">{meditation.description}</p>
          {meditation.audioUrl && (
            <audio controls className="w-full rounded-lg" style={{ filter: "invert(1) hue-rotate(180deg)" }}>
              <source src={meditation.audioUrl} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}

function MeditationCard({ meditation, onPlay }: { meditation: Meditation; onPlay: (m: Meditation) => void }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-amber-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      style={{ minHeight: "280px" }}
      onClick={() => onPlay(meditation)}
    >
      <img
        src={meditation.image}
        alt={meditation.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center backdrop-blur-sm">
          <Play size={22} className="text-amber-400 ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs font-medium text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-2.5 py-0.5 mb-2 inline-block">
          {meditation.category}
        </span>
        <h3 className="text-white font-semibold text-base leading-tight mb-1">{meditation.title}</h3>
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
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
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200')" }}
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
