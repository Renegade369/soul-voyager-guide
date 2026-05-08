import { useState, useEffect, useCallback } from "react";
import { Sparkles, RotateCcw, ArrowRight, Share2, Mail, Star } from "lucide-react";
import { C, fonts, Emblem, Eyebrow, HeroTitle, GoldText, GoldRule } from "./GuideShared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useServerFn } from "@tanstack/react-start";
import { sendEmail } from "@/lib/email.functions";
import { soulQuizEmail } from "@/lib/emailTemplates";

/* ───── soul types ───── */
const SOUL_TYPES = ["Starseed","Earth Angel","Lightworker","Indigo Child","Crystal Being","Rainbow Warrior","Ancient Soul"] as const;
type SoulType = (typeof SOUL_TYPES)[number];

/* ───── questions ───── */
interface QuizOption { text: string; types: SoulType[]; }
interface QuizQuestion { question: string; options: QuizOption[]; }

const questions: QuizQuestion[] = [
  { question: "When you walk into a room full of people, you usually:", options: addAllOption([
    { text: "Feel everyone's emotions immediately and need time to recover", types: ["Earth Angel","Crystal Being"] },
    { text: "Sense something is \"off\" about certain people before they even speak", types: ["Starseed","Indigo Child"] },
    { text: "Feel a strong urge to help or fix whatever is wrong", types: ["Lightworker","Rainbow Warrior"] },
    { text: "Feel like you are observing from outside — like you don't quite belong", types: ["Starseed","Ancient Soul"] },
  ])},
  { question: "As a child you:", options: addAllOption([
    { text: "Saw or sensed things others couldn't — lights, beings, or presences", types: ["Starseed","Crystal Being"] },
    { text: "Felt deeply misunderstood and different from other children", types: ["Indigo Child","Starseed"] },
    { text: "Were the peacemaker — always trying to help others get along", types: ["Earth Angel","Lightworker"] },
    { text: "Had an unusually deep wisdom that surprised adults", types: ["Ancient Soul","Indigo Child"] },
  ])},
  { question: "Your relationship with nature is:", options: addAllOption([
    { text: "Profound — you feel most alive and recharged in nature", types: ["Earth Angel","Rainbow Warrior"] },
    { text: "Interesting but you feel more drawn to the stars and cosmos", types: ["Starseed","Crystal Being"] },
    { text: "You feel you can communicate with animals and plants", types: ["Earth Angel","Crystal Being"] },
    { text: "You appreciate it but feel most at home in meditation or inner worlds", types: ["Ancient Soul","Lightworker"] },
  ])},
  { question: "When the world feels chaotic and dark you:", options: addAllOption([
    { text: "Feel it physically in your body — it can make you ill", types: ["Crystal Being","Earth Angel"] },
    { text: "Get angry — you came here to change this and the pace feels too slow", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Hold the light anyway — you know this is part of the plan", types: ["Lightworker","Ancient Soul"] },
    { text: "Feel homesick for somewhere you cannot name", types: ["Starseed","Ancient Soul"] },
  ])},
  { question: "Your greatest gift to others is:", options: addAllOption([
    { text: "Unconditional love and emotional healing", types: ["Earth Angel","Crystal Being"] },
    { text: "Seeing the truth and speaking it even when it's uncomfortable", types: ["Indigo Child","Starseed"] },
    { text: "Inspiring others to wake up and see their potential", types: ["Lightworker","Rainbow Warrior"] },
    { text: "Ancient wisdom and perspective that comes from somewhere deep", types: ["Ancient Soul","Starseed"] },
  ])},
  { question: "You are most drawn to:", options: addAllOption([
    { text: "Energy healing, crystals, frequency, and vibrational medicine", types: ["Crystal Being","Lightworker"] },
    { text: "Sacred texts, ancient civilizations, and hidden history", types: ["Ancient Soul","Starseed"] },
    { text: "Social justice, environmental causes, and changing broken systems", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Helping individuals heal their hearts and find their path", types: ["Earth Angel","Lightworker"] },
  ])},
  { question: "In your dreams you:", options: addAllOption([
    { text: "Visit other planets, star systems, or receive transmissions", types: ["Starseed","Crystal Being"] },
    { text: "Meet guides, angels, or beings of light who give you messages", types: ["Earth Angel","Ancient Soul"] },
    { text: "See visions of a better world and feel called to help build it", types: ["Rainbow Warrior","Lightworker"] },
    { text: "Relive ancient memories from other times and places", types: ["Ancient Soul","Starseed"] },
  ])},
  { question: "Your biggest challenge in this life has been:", options: addAllOption([
    { text: "Feeling too sensitive — absorbing other people's pain", types: ["Earth Angel","Crystal Being"] },
    { text: "Anger at the state of the world and systems that suppress truth", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Feeling like you don't belong here — like Earth is not your home", types: ["Starseed","Ancient Soul"] },
    { text: "Knowing what needs to change but struggling to be heard", types: ["Indigo Child","Lightworker"] },
  ])},
  { question: "When you think about why you are here you feel:", options: addAllOption([
    { text: "A deep sense of mission — you came here to help humanity shift", types: ["Lightworker","Rainbow Warrior"] },
    { text: "Like you volunteered for something enormous and forgot what it was", types: ["Starseed","Ancient Soul"] },
    { text: "Called to hold love and compassion as the world goes through change", types: ["Earth Angel","Crystal Being"] },
    { text: "Like you carry ancient knowledge that the world desperately needs now", types: ["Ancient Soul","Indigo Child"] },
  ])},
  { question: "Your relationship with technology and modern society is:", options: addAllOption([
    { text: "Uncomfortable — you feel it dulls sensitivity and disconnects people", types: ["Crystal Being","Earth Angel"] },
    { text: "Frustrating — you see how it could be used for liberation but isn't", types: ["Indigo Child","Rainbow Warrior"] },
    { text: "Neutral — you use what serves the mission and release the rest", types: ["Lightworker","Ancient Soul"] },
    { text: "Alienating — none of it feels natural to who you truly are", types: ["Starseed","Ancient Soul"] },
  ])},
  { question: "People who know you would say you are:", options: addAllOption([
    { text: "The most empathetic and caring person they have ever met", types: ["Earth Angel","Crystal Being"] },
    { text: "Intense, direct, and impossible to manipulate", types: ["Indigo Child","Starseed"] },
    { text: "Inspiring — you make people believe change is possible", types: ["Rainbow Warrior","Lightworker"] },
    { text: "Wise beyond your years — like an old soul in a young body", types: ["Ancient Soul","Indigo Child"] },
  ])},
  { question: "Your physical sensitivity means:", options: addAllOption([
    { text: "You feel others' physical pain in your own body", types: ["Crystal Being","Earth Angel"] },
    { text: "Crowds, loud places, and harsh environments drain you quickly", types: ["Starseed","Crystal Being"] },
    { text: "You need significant alone time to reset and recharge", types: ["Ancient Soul","Lightworker"] },
    { text: "You have always been drawn to clean food, pure water, and natural environments", types: ["Rainbow Warrior","Earth Angel"] },
  ])},
  { question: "When you look at the night sky you feel:", options: addAllOption([
    { text: "A deep longing — like you are looking at home", types: ["Starseed","Ancient Soul"] },
    { text: "Awe and wonder — you feel connected to something vast", types: ["Crystal Being","Lightworker"] },
    { text: "A sense of mission — beings out there are watching and supporting you", types: ["Starseed","Rainbow Warrior"] },
    { text: "Peace — you feel held by something much larger than this world", types: ["Earth Angel","Ancient Soul"] },
  ])},
  { question: "Your mission in this lifetime feels connected to:", options: addAllOption([
    { text: "Healing — of people, relationships, and the collective heart", types: ["Earth Angel","Lightworker"] },
    { text: "Truth — exposing what is hidden and waking people up", types: ["Indigo Child","Starseed"] },
    { text: "Building — creating new systems, communities, and ways of living", types: ["Rainbow Warrior","Indigo Child"] },
    { text: "Remembering — recovering ancient wisdom and bringing it forward", types: ["Ancient Soul","Crystal Being"] },
  ])},
  { question: "Deep down, your greatest fear is:", options: addAllOption([
    { text: "That you will leave this life without completing your mission", types: ["Lightworker","Rainbow Warrior"] },
    { text: "That you came all this way and the world won't change in time", types: ["Indigo Child","Starseed"] },
    { text: "That you will lose yourself trying to save everyone else", types: ["Earth Angel","Crystal Being"] },
    { text: "That you will forget who you truly are and go back to sleep", types: ["Ancient Soul","Starseed"] },
  ])},
];

/* ───── result data ───── */
interface SoulResult { title: string; origin: string; mission: string; gifts: string; challenge: string; message: string; }
const results: Record<SoulType, SoulResult> = {
  "Starseed": {
    title: "You Are a Starseed",
    origin: "Your soul originates beyond this solar system — from star systems like the Pleiades, Sirius, Arcturus, or Andromeda. You volunteered to incarnate on Earth during this critical time of planetary shift.",
    mission: "You carry frequency codes encoded in your DNA that activate simply by your presence. Your mission is not to fit in — it is to raise the vibration of everything around you just by being authentically yourself.",
    gifts: "Cosmic perspective, energy sensitivity, truth detection, frequency transmission",
    challenge: "The feeling of not belonging is your greatest teacher. You are not meant to belong to the old world — you are here to help build the new one.",
    message: "You have not lost your way. You are exactly where you agreed to be. The homesickness you feel is real — and it is fuel. Let it remind you why you came.",
  },
  "Earth Angel": {
    title: "You Are an Earth Angel",
    origin: "You come from the angelic realm — a being of pure love who chose to take human form to serve as a bridge between heaven and Earth during humanity's awakening.",
    mission: "Your presence heals. People feel safer, calmer, and more loved simply by being near you. Your mission is to hold unconditional love in a world that has forgotten what love truly is.",
    gifts: "Unconditional love, emotional healing, compassion, energetic presence",
    challenge: "Your greatest lesson is boundaries. You cannot pour from an empty vessel. Learning to receive as gracefully as you give is your spiritual work in this lifetime.",
    message: "You are not too sensitive. The world is not too harsh. You came equipped for exactly this. Your softness is not weakness — it is your most powerful weapon.",
  },
  "Lightworker": {
    title: "You Are a Lightworker",
    origin: "Lightworkers come from many places — some angelic, some cosmic, some deeply human souls who have evolved through many lifetimes of service. What unites you is the conscious choice to be a beacon.",
    mission: "You are here to hold the light in the darkness — not by fighting the dark but by shining so brightly that others remember their own light. Your awakening is your service.",
    gifts: "Spiritual teaching, healing, inspiration, energetic transmission",
    challenge: "The spiritual ego is your shadow. Remembering that you are a student as much as a teacher keeps you in true service.",
    message: "Every person you wake up. Every heart you open. Every moment you choose love over fear — it all matters more than you know. Keep going.",
  },
  "Indigo Child": {
    title: "You Are an Indigo",
    origin: "Indigo souls began arriving en masse in the 1970s and 80s — warriors of truth sent to dismantle corrupt systems and wake humanity from its trance of compliance and conformity.",
    mission: "You are a system buster. You came to question everything that should be questioned, to refuse what should be refused, and to light the path for those who are ready to break free.",
    gifts: "Truth detection, fearlessness, system thinking, fierce compassion",
    challenge: "Your anger is sacred — but undirected it burns you and those around you. Learning to channel your warrior energy into creation rather than destruction is your mastery.",
    message: "Your refusal to accept a lesser version of reality is not stubbornness. It is your mission. The world needs people who refuse to go back to sleep. That is you.",
  },
  "Crystal Being": {
    title: "You Are a Crystal Being",
    origin: "Crystal souls are among the newest and most evolved incarnating on Earth — extraordinarily sensitive, highly telepathic, and carrying the crystalline frequency of the new Earth.",
    mission: "You are here to model the new human — heart-led, sensitive, connected, and fully present. Your very existence demonstrates what is possible when a being lives in complete alignment with love.",
    gifts: "Telepathy, deep empathy, frequency sensitivity, heart coherence",
    challenge: "The density of the old world can feel unbearable to your sensitive system. Protecting your energy while staying open is the balance you are here to master.",
    message: "Your sensitivity is not a disorder. It is a superpower. You feel everything because you were designed to — and what you do with that feeling changes the world.",
  },
  "Rainbow Warrior": {
    title: "You Are a Rainbow Warrior",
    origin: "Rainbow Warriors are souls who have mastered many traditions, lifetimes, and dimensions. You carry the full spectrum of human experience and cosmic wisdom — and you came to use all of it.",
    mission: "You are a builder of the new world. Not just a visionary — an activator. You see what needs to change AND you have the courage, creativity, and resilience to actually change it.",
    gifts: "Multi-dimensional wisdom, courage, creativity, bridge-building across differences",
    challenge: "You can see so many possibilities that choosing one path feels like losing the others. Focus is your spiritual practice.",
    message: "The old prophecies spoke of you. The warriors who would come carrying all colors, all wisdom, all courage. You are not too much. You are exactly enough. Now build.",
  },
  "Ancient Soul": {
    title: "You Are an Ancient Soul",
    origin: "You have been here longer than almost anyone. Through Lemuria, Atlantis, Egypt, and countless civilizations before recorded history — you have gathered wisdom that spans the full arc of human experience.",
    mission: "You are the keeper of what has been forgotten. The knowledge encoded in your soul is not available in any book — it lives in you, waiting to be remembered and shared at exactly the right moment.",
    gifts: "Deep wisdom, pattern recognition across time, spiritual authority, ancestral healing",
    challenge: "The weight of all you have seen and all you have lost can make this lifetime feel heavy. Learning to be present — not just wise — is your greatest practice.",
    message: "You have survived the fall of worlds. You have held wisdom through dark ages. You are still here. That is not an accident. What you carry is needed now more than ever.",
  },
};

/* ───── helpers ───── */
function calcResult(answers: number[]): { winner: SoulType; tied: SoulType[]; scores: Record<string,number> } {
  const scores: Record<string,number> = {};
  SOUL_TYPES.forEach(t => scores[t] = 0);
  answers.forEach((choice, qi) => {
    const opt = questions[qi].options[choice];
    opt.types.forEach(t => scores[t] += 2);
  });
  const max = Math.max(...Object.values(scores));
  const tied = SOUL_TYPES.filter(t => scores[t] === max);
  return { winner: tied[0], tied, scores };
}

/* ───── particles ───── */
function GoldParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }))
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            backgroundColor: C.gold,
            opacity: 0,
            animation: `quizParticle ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes quizParticle {
          0%,100% { opacity:0; transform:translateY(0) scale(1); }
          50% { opacity:0.6; transform:translateY(-20px) scale(1.3); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════ MAIN COMPONENT ═══════════════════════════ */
export function SoulQuizTab() {
  const { user } = useAuth();
  const sendEmailFn = useServerFn(sendEmail);
  const [phase, setPhase] = useState<"intro"|"quiz"|"result">("intro");
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number|null>(null);
  const [fade, setFade] = useState(true);
  const [resultData, setResultData] = useState<ReturnType<typeof calcResult>|null>(null);

  const startQuiz = () => { setPhase("quiz"); setQi(0); setAnswers([]); setSelected(null); setFade(true); };

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers, idx];
    setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        if (qi < questions.length - 1) {
          setQi(qi + 1);
          setSelected(null);
          setFade(true);
        } else {
          const res = calcResult(newAnswers);
          setResultData(res);
          setAnswers(newAnswers);
          setPhase("result");
          // save if logged in
          if (user) {
            supabase.from("soul_quiz_results").insert({
              user_id: user.id,
              soul_type: res.winner,
              scores: res.scores,
            } as any).then(() => {});
            // Send soul quiz result email
            if (user.email) {
              sendEmailFn({ data: { to: user.email, subject: `${results[res.winner].title} — Your Soul Origin`, html: soulQuizEmail(res.winner, results[res.winner]) } }).catch(e => console.error("Soul quiz email failed:", e));
            }
          }
        }
      }, 400);
    }, 600);
    setAnswers(newAnswers);
  }, [selected, answers, qi, user]);

  const shareResult = useCallback(() => {
    if (!resultData) return;
    const text = `I just discovered my Soul Origin — I'm ${results[resultData.winner].title.replace("You Are ","").replace("an ","").replace("a ","")}! Take the Soul Origin Quiz at soul-true.com/guide`;
    if (navigator.share) {
      navigator.share({ title: "My Soul Origin", text, url: "https://soul-true.com/guide" }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!")).catch(() => {});
    }
  }, [resultData]);

  /* ── INTRO ── */
  if (phase === "intro") return (
    <div className="py-16 text-center">
      <Emblem icon={<Sparkles size={28} />} />
      <Eyebrow>Soul Origin Quiz</Eyebrow>
      <HeroTitle>Discover Your <GoldText>Soul Type</GoldText></HeroTitle>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>
        Your soul carries a signature that reaches far beyond this single lifetime. This quiz reveals which of 7 soul archetypes most closely mirrors your deepest nature — your origin, your gifts, and your sacred mission.
      </p>
      <GoldRule />
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 text-left sm:grid-cols-3 md:grid-cols-4">
        {SOUL_TYPES.map(t => (
          <div key={t} className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: C.border, backgroundColor: C.card }}>
            <Star size={12} style={{ color: C.gold }} />
            <span className="text-xs" style={{ fontFamily: fonts.body, color: C.text }}>{t}</span>
          </div>
        ))}
      </div>
      <button
        onClick={startQuiz}
        className="mt-10 inline-flex items-center gap-2 rounded px-8 py-3 text-xs font-medium uppercase tracking-[0.22em]"
        style={{ backgroundColor: C.gold, color: C.bg, fontFamily: fonts.body }}
      >
        Begin the Quiz <ArrowRight size={14} />
      </button>
      <p className="mt-4 text-xs" style={{ color: C.dim, fontFamily: fonts.body }}>15 questions · takes about 3 minutes</p>
    </div>
  );

  /* ── QUIZ ── */
  if (phase === "quiz") {
    const q = questions[qi];
    const pct = ((qi) / questions.length) * 100;
    return (
      <div className="py-12">
        {/* progress */}
        <div className="mx-auto mb-2 flex max-w-2xl items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: fonts.body, color: C.muted }}>
            Question {qi + 1} of {questions.length}
          </span>
          <span className="text-[10px]" style={{ fontFamily: fonts.body, color: C.gold }}>{Math.round(pct)}%</span>
        </div>
        <div className="mx-auto mb-10 h-1 max-w-2xl overflow-hidden rounded-full" style={{ backgroundColor: C.border }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: C.gold }} />
        </div>

        {/* question card */}
        <div
          className="mx-auto max-w-2xl transition-all duration-400"
          style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(20px)" }}
        >
          <h3 className="mb-8 text-center text-2xl font-light md:text-3xl" style={{ fontFamily: fonts.display, color: C.text, lineHeight: 1.3 }}>
            {q.question}
          </h3>
          <div className="space-y-3">
            {q.options.map((opt, oi) => {
              const isSelected = selected === oi;
              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(oi)}
                  disabled={selected !== null}
                  className="block w-full rounded-xl border p-5 text-left transition-all duration-300"
                  style={{
                    borderColor: isSelected ? C.gold : C.border,
                    backgroundColor: isSelected ? `${C.gold}15` : C.card,
                    cursor: selected !== null ? "default" : "pointer",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"
                      style={{
                        border: `1.5px solid ${isSelected ? C.gold : C.border}`,
                        color: isSelected ? C.gold : C.muted,
                        backgroundColor: isSelected ? `${C.gold}20` : "transparent",
                        fontFamily: fonts.body,
                      }}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: isSelected ? C.text : C.muted, fontWeight: 300 }}>
                      {opt.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── RESULT ── */
  if (phase === "result" && resultData) {
    const r = results[resultData.winner];
    const sections: { label: string; text: string }[] = [
      { label: "Origin", text: r.origin },
      { label: "Your Mission", text: r.mission },
      { label: "Your Gifts", text: r.gifts },
      { label: "Your Challenge", text: r.challenge },
    ];

    return (
      <div className="relative py-16">
        <GoldParticles />

        {/* title reveal */}
        <div className="relative z-10 text-center">
          <Emblem icon={<Sparkles size={28} />} />
          <Eyebrow>Your Soul Origin</Eyebrow>
          <h2
            className="mt-5 text-4xl font-light md:text-5xl lg:text-6xl"
            style={{ fontFamily: fonts.display, color: C.gold, lineHeight: 1.1 }}
          >
            {r.title}
          </h2>
          {resultData.tied.length > 1 && (
            <p className="mt-3 text-sm" style={{ fontFamily: fonts.body, color: C.muted }}>
              with equal resonance to <span style={{ color: C.gold }}>{resultData.tied.slice(1).join(" & ")}</span>
            </p>
          )}
        </div>

        <GoldRule />

        {/* sections */}
        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="rounded-xl border p-6" style={{ backgroundColor: C.card, borderColor: C.border }}>
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>{s.label}</p>
              <p className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.text, fontWeight: 300 }}>{s.text}</p>
            </div>
          ))}

          {/* message — special styling */}
          <div className="rounded-xl border-2 p-8 text-center" style={{ borderColor: `${C.gold}40`, backgroundColor: `${C.gold}08` }}>
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>A Message for You</p>
            <p className="text-lg font-light italic leading-relaxed" style={{ fontFamily: fonts.display, color: C.text }}>
              "{r.message}"
            </p>
          </div>
        </div>

        <GoldRule />

        {/* actions */}
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-3">
          <button
            onClick={shareResult}
            className="flex w-full items-center justify-center gap-2 rounded px-6 py-3 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ backgroundColor: C.gold, color: C.bg, fontFamily: fonts.body }}
          >
            <Share2 size={14} /> Share My Soul Type
          </button>
          <button
            onClick={startQuiz}
            className="flex w-full items-center justify-center gap-2 rounded border px-6 py-3 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
          >
            <RotateCcw size={14} /> Retake Quiz
          </button>
          <a
            href="mailto:highervibrations36@gmail.com?subject=Soul%20True%20Session%20Inquiry"
            className="flex w-full items-center justify-center gap-2 rounded border px-6 py-3 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ borderColor: C.border, color: C.text, fontFamily: fonts.body }}
          >
            <Mail size={14} /> Book a Session with Kim Alfano
          </a>
        </div>
      </div>
    );
  }

  return null;
}
