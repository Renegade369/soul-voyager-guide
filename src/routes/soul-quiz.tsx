import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { KimAlfanoCard } from "@/components/KimAlfanoCard";
import { PlantImageBand, PLANT_IMAGES } from "@/components/PlantImageBand";
import { useScrollTopOnChange } from "@/hooks/useScrollTop";

export const Route = createFileRoute("/soul-quiz")({
  head: () => ({
    meta: [
      { title: "Soul Quiz — Free — Soul True" },
      { name: "description", content: "Discover your soul type in 5 minutes. Free guided quiz — Starseed, Earth Angel, Lightworker, Indigo, Crystal Being, Rainbow Warrior, or Ancient Soul." },
      { property: "og:title", content: "Soul Quiz — Free — Soul True" },
      { property: "og:description", content: "Discover your soul type in 5 minutes. Free." },
    ],
  }),
  component: SoulQuizPage,
});

const C = {
  bg: "#0A0A0A", gold: "#C9A84C", goldAlt: "#D4A017", text: "#F5F0E8",
  glow: "#E8821A", deep: "#1A1209", muted: "rgba(245,240,232,0.65)", dim: "rgba(245,240,232,0.4)",
};

const SOUL_TYPES = ["Starseed","Earth Angel","Lightworker","Indigo Child","Crystal Being","Rainbow Warrior","Ancient Soul"] as const;
type SoulType = (typeof SOUL_TYPES)[number];

interface QuizOption { text: string; types: SoulType[] | "neutral"; }
interface QuizQuestion { question: string; options: QuizOption[]; }

const baseQuestions: QuizQuestion[] = [
  { question: "When you walk into a room full of people, you usually:", options: [
    { text: "Feel everyone's emotions immediately and need time to recover", types: ["Earth Angel","Crystal Being"] },
    { text: "Sense something is \"off\" about certain people before they even speak", types: ["Starseed","Indigo Child"] },
    { text: "Feel a strong urge to help or fix whatever is wrong", types: ["Lightworker","Rainbow Warrior"] },
    { text: "Feel like you are observing from outside — like you don't quite belong", types: ["Starseed","Ancient Soul"] },
  ]},
  { question: "As a child you:", options: [
    { text: "Saw or sensed things others couldn't — lights, beings, or presences", types: ["Starseed","Crystal Being"] },
    { text: "Felt deeply misunderstood and different from other children", types: ["Indigo Child","Starseed"] },
    { text: "Were the peacemaker — always trying to help others get along", types: ["Earth Angel","Lightworker"] },
    { text: "Had an unusually deep wisdom that surprised adults", types: ["Ancient Soul","Indigo Child"] },
  ]},
  { question: "Your relationship with nature is:", options: [
    { text: "Profound — you feel most alive and recharged in nature", types: ["Earth Angel","Rainbow Warrior"] },
    { text: "Interesting but you feel more drawn to the stars and cosmos", types: ["Starseed","Crystal Being"] },
    { text: "You feel you can communicate with animals and plants", types: ["Earth Angel","Crystal Being"] },
    { text: "You appreciate it but feel most at home in meditation or inner worlds", types: ["Ancient Soul","Lightworker"] },
  ]},
  { question: "When the world feels chaotic and dark you:", options: [
    { text: "Feel it physically in your body — it can make you ill", types: ["Crystal Being","Earth Angel"] },
    { text: "Get angry — you came here to change this and the pace feels too slow", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Hold the light anyway — you know this is part of the plan", types: ["Lightworker","Ancient Soul"] },
    { text: "Feel homesick for somewhere you cannot name", types: ["Starseed","Ancient Soul"] },
  ]},
  { question: "Your greatest gift to others is:", options: [
    { text: "Unconditional love and emotional depth", types: ["Earth Angel","Crystal Being"] },
    { text: "Seeing the truth and speaking it even when it's uncomfortable", types: ["Indigo Child","Starseed"] },
    { text: "Inspiring others to wake up and see their potential", types: ["Lightworker","Rainbow Warrior"] },
    { text: "Ancient wisdom and perspective that comes from somewhere deep", types: ["Ancient Soul","Starseed"] },
  ]},
  { question: "You are most drawn to:", options: [
    { text: "Energy work, crystals, frequency, and vibrational practices", types: ["Crystal Being","Lightworker"] },
    { text: "Sacred texts, ancient civilizations, and hidden history", types: ["Ancient Soul","Starseed"] },
    { text: "Social justice, environmental causes, and changing broken systems", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Helping individuals open their hearts and find their path", types: ["Earth Angel","Lightworker"] },
  ]},
  { question: "In your dreams you:", options: [
    { text: "Visit other planets, star systems, or receive transmissions", types: ["Starseed","Crystal Being"] },
    { text: "Meet guides, angels, or beings of light who give you messages", types: ["Earth Angel","Ancient Soul"] },
    { text: "See visions of a better world and feel called to help build it", types: ["Rainbow Warrior","Lightworker"] },
    { text: "Relive ancient memories from other times and places", types: ["Ancient Soul","Starseed"] },
  ]},
  { question: "Your biggest challenge in this life has been:", options: [
    { text: "Feeling too sensitive — absorbing other people's pain", types: ["Earth Angel","Crystal Being"] },
    { text: "Anger at the state of the world and systems that suppress truth", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Feeling like you don't belong here — like Earth is not your home", types: ["Starseed","Ancient Soul"] },
    { text: "Knowing what needs to change but struggling to be heard", types: ["Indigo Child","Lightworker"] },
  ]},
  { question: "When you think about why you are here you feel:", options: [
    { text: "A deep sense of mission — you came here to help humanity shift", types: ["Lightworker","Rainbow Warrior"] },
    { text: "Like you volunteered for something enormous and forgot what it was", types: ["Starseed","Ancient Soul"] },
    { text: "Called to hold love and compassion as the world goes through change", types: ["Earth Angel","Crystal Being"] },
    { text: "Like you carry ancient knowledge that the world desperately needs now", types: ["Ancient Soul","Indigo Child"] },
  ]},
  { question: "When you look at the night sky you feel:", options: [
    { text: "A deep longing — like you are looking at home", types: ["Starseed","Ancient Soul"] },
    { text: "Awe and wonder — you feel connected to something vast", types: ["Crystal Being","Lightworker"] },
    { text: "A sense of mission — beings out there are watching and supporting you", types: ["Starseed","Rainbow Warrior"] },
    { text: "Peace — you feel held by something much larger than this world", types: ["Earth Angel","Ancient Soul"] },
  ]},
];

// Append "None of the above" to every question — counts as authentic neutral data, not a penalty.
const questions: QuizQuestion[] = baseQuestions.map((q) => ({
  ...q,
  options: [...q.options, { text: "None of the above", types: "neutral" as const }],
}));

interface SoulResult { title: string; origin: string; mission: string; gifts: string; challenge: string; message: string; }
const results: Record<SoulType, SoulResult> = {
  "Starseed": { title: "You Are a Starseed", origin: "Your soul originates beyond this solar system. You volunteered to incarnate on Earth during this critical time of planetary shift.", mission: "You carry frequency codes that activate by your presence. Your mission is not to fit in — it is to raise the vibration of everything around you just by being authentically yourself.", gifts: "Cosmic perspective, energy sensitivity, truth detection, frequency transmission", challenge: "The feeling of not belonging is your greatest teacher. You are not meant to belong to the old world — you are here to help build the new one.", message: "You have not lost your way. You are exactly where you agreed to be. The homesickness is real — and it is fuel." },
  "Earth Angel": { title: "You Are an Earth Angel", origin: "You come from the angelic realm — a being of pure love who chose human form to bridge heaven and Earth.", mission: "Your presence soothes. People feel safer, calmer, and more loved simply by being near you. Your mission is to hold unconditional love.", gifts: "Unconditional love, emotional depth, compassion, energetic presence", challenge: "Your greatest lesson is boundaries. You cannot pour from an empty vessel.", message: "You are not too sensitive. The world is not too harsh. You came equipped for exactly this." },
  "Lightworker": { title: "You Are a Lightworker", origin: "Lightworkers come from many places — what unites you is the conscious choice to be a beacon.", mission: "You are here to hold the light in the darkness — not by fighting the dark but by shining so brightly that others remember their own light.", gifts: "Spiritual teaching, presence, inspiration, energetic transmission", challenge: "The spiritual ego is your shadow. Remembering that you are a student as much as a teacher keeps you in true service.", message: "Every person you wake. Every heart you open. It all matters more than you know." },
  "Indigo Child": { title: "You Are an Indigo", origin: "Indigo souls began arriving en masse in the 1970s and 80s — warriors of truth sent to dismantle corrupt systems.", mission: "You are a system buster. You came to question everything that should be questioned and light the path for those ready to break free.", gifts: "Truth detection, fearlessness, system thinking, fierce compassion", challenge: "Your anger is sacred — but undirected it burns you. Channeling your warrior energy into creation is your mastery.", message: "Your refusal to accept a lesser reality is not stubbornness. It is your mission." },
  "Crystal Being": { title: "You Are a Crystal Being", origin: "Crystal souls are among the newest and most evolved incarnating on Earth — extraordinarily sensitive, telepathic, and carrying the crystalline frequency.", mission: "You are here to model the new human — heart-led, sensitive, connected, fully present.", gifts: "Telepathy, deep empathy, frequency sensitivity, heart coherence", challenge: "The density of the old world can feel unbearable to your sensitive system. Protecting your energy while staying open is the balance.", message: "Your sensitivity is not a disorder. It is a superpower." },
  "Rainbow Warrior": { title: "You Are a Rainbow Warrior", origin: "Rainbow Warriors are souls who have mastered many traditions and dimensions. You carry the full spectrum.", mission: "You are a builder of the new world. Not just a visionary — an activator.", gifts: "Multi-dimensional wisdom, courage, creativity, bridge-building", challenge: "You can see so many possibilities that choosing one path feels like losing the others. Focus is your spiritual practice.", message: "The old prophecies spoke of you. You are not too much. You are exactly enough. Now build." },
  "Ancient Soul": { title: "You Are an Ancient Soul", origin: "You have been here longer than almost anyone. Through Lemuria, Atlantis, Egypt, and countless civilizations.", mission: "You are the keeper of what has been forgotten. The knowledge in your soul is not in any book — it lives in you.", gifts: "Deep wisdom, pattern recognition across time, spiritual authority, ancestral memory", challenge: "The weight of all you have seen can make this lifetime feel heavy. Being present — not just wise — is your practice.", message: "You have survived the fall of worlds. You are still here. That is not an accident." },
};

function calcResult(answers: number[][]): { winner: SoulType; tied: SoulType[]; scores: Record<string,number>; neutralCount: number } {
  const scores: Record<string,number> = {};
  SOUL_TYPES.forEach(t => scores[t] = 0);
  let neutralCount = 0;
  answers.forEach((choices, qi) => {
    choices.forEach(choice => {
      const opt = questions[qi].options[choice];
      if (opt.types === "neutral") { neutralCount++; return; }
      opt.types.forEach(t => scores[t] += 2);
    });
  });
  const max = Math.max(...Object.values(scores));
  const tied = SOUL_TYPES.filter(t => scores[t] === max);
  return { winner: tied[0], tied, scores, neutralCount };
}

function SoulQuizPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  useScrollTopOnChange([phase]);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [resultData, setResultData] = useState<ReturnType<typeof calcResult> | null>(null);

  const start = () => { setPhase("quiz"); setQi(0); setAnswers([]); setSelected(new Set()); };

  const toggle = (idx: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      // "None of the above" is exclusive
      const isNeutral = questions[qi].options[idx].types === "neutral";
      if (isNeutral) return next.has(idx) ? new Set() : new Set([idx]);
      // Selecting a non-neutral clears any neutral selection
      const cleaned = new Set(Array.from(next).filter(i => questions[qi].options[i].types !== "neutral"));
      if (cleaned.has(idx)) cleaned.delete(idx); else cleaned.add(idx);
      return cleaned;
    });
  };

  const next = () => {
    if (selected.size === 0) return;
    const updated = [...answers, Array.from(selected)];
    if (qi < questions.length - 1) {
      setAnswers(updated);
      setQi(qi + 1);
      setSelected(new Set());
    } else {
      const res = calcResult(updated);
      setResultData(res);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      setAnswers(updated);
      setPhase("result");
      void supabase.from("consciousness_data").insert({ reader_type: "soul-quiz", soul_archetype: res.winner });
    }
  };

  const result = resultData ? results[resultData.winner] : null;
  const neutralLine = resultData && resultData.neutralCount >= 3
    ? "You said \"none of the above\" several times — that is itself a powerful signal. The clarity about what does not resonate is its own form of self-knowledge."
    : null;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="relative min-h-screen px-6 py-16" style={{ background: C.bg, color: C.text }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.dim }}>← Soul True</Link>
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Soul Quiz · Free</span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Free · No account required</p>
              <h1 className="mt-4 font-serif text-5xl font-light italic" style={{ color: C.text }}>What kind of soul are you?</h1>
              <p className="mt-6 text-base leading-relaxed" style={{ color: C.muted }}>
                Ten questions, about five minutes. You can pick more than one answer per question — and "none of the above" is always a valid choice if nothing fits.
              </p>
              <button onClick={start}
                className="mt-10 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em]"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                Begin the Quiz →
              </button>
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div key={`q-${qi}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>Question {qi + 1} of {questions.length}</p>
              <h2 className="font-serif text-2xl font-light italic md:text-3xl" style={{ color: C.text }}>{questions[qi].question}</h2>
              <div className="mt-8 space-y-3">
                {questions[qi].options.map((opt, idx) => {
                  const isSelected = selected.has(idx);
                  const isNeutral = opt.types === "neutral";
                  return (
                    <button key={idx} onClick={() => toggle(idx)}
                      className="block w-full rounded-none border px-5 py-4 text-left text-base transition-all"
                      style={{
                        borderColor: isSelected ? C.gold : `${C.gold}40`,
                        color: isSelected ? C.text : (isNeutral ? C.muted : C.text),
                        background: isSelected ? "rgba(201,168,76,0.1)" : "rgba(201,168,76,0.03)",
                        fontStyle: isNeutral ? "italic" : "normal",
                      }}>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs" style={{ color: C.dim }}>Tap any that resonate. "None of the above" clears the others.</p>
              <button onClick={next} disabled={selected.size === 0}
                className="mt-8 block w-full rounded-none px-10 py-4 text-[11px] uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                {qi < questions.length - 1 ? "Next →" : "See My Result →"}
              </button>
            </motion.div>
          )}

          {phase === "result" && result && resultData && (
            <motion.div key="result" data-animate="fade-up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="text-center text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>Your soul type</p>
              <h1 className="mt-4 text-center font-serif text-5xl font-light italic" style={{ color: C.text }}>{result.title}</h1>

              {neutralLine && (
                <p className="mt-6 text-center text-sm italic" style={{ color: C.muted }}>{neutralLine}</p>
              )}

              {[
                { label: "Origin", text: result.origin },
                { label: "Mission", text: result.mission },
                { label: "Gifts", text: result.gifts },
                { label: "Challenge", text: result.challenge },
              ].map((s, i) => (
                <motion.section key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }} className="mt-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: C.gold }}>{s.label}</p>
                  <p className="text-base leading-relaxed">{s.text}</p>
                </motion.section>
              ))}

              <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                className="mt-12 rounded-none border p-7 text-center" style={{ borderColor: `${C.gold}66`, background: C.deep }}>
                <p className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: C.gold }}>A message for you</p>
                <p className="font-serif text-xl italic leading-relaxed">"{result.message}"</p>
              </motion.section>

              <KimAlfanoCard />

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => { setPhase("intro"); }}
                  className="flex-1 rounded-none border px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
                  style={{ borderColor: C.gold, color: C.gold }}>
                  Take Again
                </button>
                <Link to="/soul-profile"
                  className="flex-1 rounded-none px-6 py-3 text-center text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`, color: C.bg }}>
                  Get Your Full Soul Profile →
                </Link>
              </div>
              <p className="mt-10 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: C.dim }}>
                For educational &amp; inspirational purposes only.
              </p>
              <PlantImageBand src={PLANT_IMAGES.soulQuiz} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
