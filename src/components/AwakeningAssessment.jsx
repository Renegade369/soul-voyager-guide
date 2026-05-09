import { useState, useRef, useEffect } from "react";

// ─── COSMIC LEVELS ───────────────────────────────────────────────────────────
const LEVELS = [
  {
    id: 1,
    title: "The Dreamer",
    range: [0, 19],
    color: "#6a7a9a",
    glow: "rgba(106,122,154,0.3)",
    symbol: "☽",
    description: "Still moving through the world as it was handed to you. The programming is deep but something inside you is beginning to stir — otherwise you wouldn't be here. The awakening has already begun, whether you know it yet or not. This is not a judgment. Every luminous being started exactly here.",
    next: "Your next step is simply to keep asking questions. Follow what feels wrong in the official story. Trust the instinct that brought you to Soul True.",
  },
  {
    id: 2,
    title: "The Seeker",
    range: [20, 34],
    color: "#7a8aaa",
    glow: "rgba(122,138,170,0.3)",
    symbol: "✦",
    description: "You know something is wrong with the story you were told. You're pulling threads, asking questions nobody around you seems to be asking, and finding yourself drawn to knowledge that exists outside the approved narrative. The hunger you feel is real. It is your consciousness recognizing itself.",
    next: "Dive into the Truth Archive. Start with the ancient sites. Let the evidence stack. Trust what you're finding.",
  },
  {
    id: 3,
    title: "The Questioner",
    range: [35, 49],
    color: "#8a9aba",
    glow: "rgba(138,154,186,0.3)",
    symbol: "◎",
    description: "The official narrative has largely collapsed for you. You see patterns in history, in media, in the structures of power that most people around you cannot yet perceive. You no longer need permission to think differently. You are thinking — and what you're finding is changing everything.",
    next: "Explore the Hidden Truth section. The connection between suppressed history and suppressed human potential is where this gets personal.",
  },
  {
    id: 4,
    title: "The Witness",
    range: [50, 62],
    color: "#9aaacc",
    glow: "rgba(154,170,204,0.35)",
    symbol: "◈",
    description: "You have moved beyond gathering information into genuine observation. You see the systems clearly — not with anxiety but with clarity. You understand quantum reality at an intellectual level and you're beginning to feel the shift in your own experience of life, not just your thinking.",
    next: "The Quantum Reality section is your next territory. Understanding what physics has proven about consciousness will anchor everything you've been sensing.",
  },
  {
    id: 5,
    title: "The Activator",
    range: [63, 74],
    color: "#c8a94a",
    glow: "rgba(200,169,74,0.35)",
    symbol: "⚡",
    description: "You don't just know the truth — you are living differently because of it. Your frequency is rising. Your choices are made from awareness rather than programming. You are actively dismantling the false identity that was built for you and discovering what was underneath it all along.",
    next: "Connect with coaching. The shift from knowing to embodying is where a guide accelerates everything. Kim Alfano at Higher Vibes is your resource.",
  },
  {
    id: 6,
    title: "The Wayshower",
    range: [75, 84],
    color: "#d4b84a",
    glow: "rgba(212,184,74,0.4)",
    symbol: "☀",
    description: "Others are beginning to wake up because of you. You carry the truth without ego, without preaching, without needing to convince anyone. Your presence alone shifts the energy of a room. You have moved from seeking truth to being a demonstration of it.",
    next: "Your work now is to share. Soul True community and contributing your story to the platform — what you've walked through is medicine for others.",
  },
  {
    id: 7,
    title: "The Sovereign",
    range: [85, 91],
    color: "#e0c050",
    glow: "rgba(224,192,80,0.45)",
    symbol: "♛",
    description: "You have reclaimed your identity from every system that tried to define you. You understand your consciousness as a genuine creative force in reality — not metaphorically but as an operating principle you live by. You exist with a quality of freedom that most people cannot yet imagine is available to them.",
    next: "Your path now is integration and service. How the truth you carry becomes a gift to the collective awakening is the question your life is answering.",
  },
  {
    id: 8,
    title: "The Cosmic Witness",
    range: [92, 96],
    color: "#f0d060",
    glow: "rgba(240,208,96,0.5)",
    symbol: "⚛",
    description: "Quantum non-locality is not a concept to you — it is your lived experience. The non-separation of all things is something you feel in your body as much as you understand in your mind. You move through the world with an awareness of the interconnected field that most beings are still discovering exists.",
    next: "You are the leading edge. Stay curious. The frontier of consciousness is where your growth continues.",
  },
  {
    id: 9,
    title: "The Embodied Truth",
    range: [97, 98],
    color: "#f8e070",
    glow: "rgba(248,224,112,0.55)",
    symbol: "𓂀",
    description: "You are the convergence of ancient wisdom and quantum understanding made flesh. Your life is not a search for truth — it is a transmission of it. The work is no longer about your own awakening. It is about holding the frequency for others who are finding their way.",
    next: "You know what your next step is. Trust it completely.",
  },
  {
    id: 10,
    title: "The Luminous One",
    range: [99, 100],
    color: "#fff8d0",
    glow: "rgba(255,248,208,0.6)",
    symbol: "✧",
    description: "Complete integration of awakened consciousness. You exist in full awareness of what you are, why you are here, and the role you carry in the collective awakening of humanity. The light you embody is not yours alone — it moves through you for everyone whose path will cross yours.",
    next: "You are already doing it.",
  },
];

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  // HISTORY AWARENESS
  {
    id: 1,
    category: "HISTORY",
    type: "agree",
    text: "The history of human civilization taught in schools and mainstream media is largely incomplete — and in key areas, deliberately misleading.",
    options: ["Strongly disagree", "I'm not sure", "I suspect this is true", "I believe this is true", "I know this to be true"],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 2,
    category: "HISTORY",
    type: "scenario",
    text: "When you hear about a newly discovered ancient site that contradicts the official timeline of civilization — like Göbekli Tepe or the underwater ruins off Dwarka — your first instinct is:",
    options: [
      "To wait for mainstream archaeologists to validate it",
      "Mild curiosity, but I don't think too much about it",
      "Genuine interest — I want to know more",
      "Excitement — this is evidence of something much bigger",
      "Recognition — this confirms what I already understand about suppressed history",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 3,
    category: "HISTORY",
    type: "direct",
    text: "How much of your understanding of human history comes from sources outside mainstream academia, textbooks, or corporate media?",
    options: [
      "Almost none — I trust established sources",
      "A little — I've read some alternative perspectives",
      "A fair amount — I actively seek different viewpoints",
      "Most of it — I've largely moved beyond mainstream sources",
      "All of it — mainstream history is a managed narrative",
    ],
    weights: [0, 1, 2, 3, 4],
  },

  // POWER AWARENESS
  {
    id: 4,
    category: "POWER",
    type: "agree",
    text: "The major decisions that shape geopolitics, economics, and culture are made by a relatively small network of interconnected individuals and institutions operating largely outside of democratic accountability.",
    options: ["Strongly disagree", "Probably an exaggeration", "Possibly true", "Very likely true", "This is demonstrably documented"],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 5,
    category: "POWER",
    type: "scenario",
    text: "When both candidates in a major election seem to serve the same financial interests regardless of their stated positions — your interpretation is:",
    options: [
      "Coincidence or the natural result of campaign finance",
      "Somewhat concerning but probably not coordinated",
      "A pattern that suggests deeper structural problems",
      "Evidence of a coordinated system that controls both sides",
      "Exactly how a controlled system is designed to operate",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 6,
    category: "POWER",
    type: "direct",
    text: "How often do you feel that the life you are living — your career options, financial ceiling, social role — was largely designed for you by systems you didn't choose?",
    options: [
      "Rarely — I feel I have genuine freedom and choice",
      "Sometimes — I notice limits but don't think too much about them",
      "Often — the system feels designed to keep most people in a certain lane",
      "Very often — the programming runs deep and I'm actively working through it",
      "Always — and I've made it my work to understand and dismantle it",
    ],
    weights: [0, 1, 2, 3, 4],
  },

  // QUANTUM REALITY
  {
    id: 7,
    category: "REALITY",
    type: "agree",
    text: "The 2022 Nobel Prize in Physics was awarded for proving that the universe is not 'locally real' — meaning reality does not exist independently of observation. This finding fundamentally changes how we understand existence.",
    options: [
      "I wasn't aware of this",
      "I've heard of it but don't fully understand it",
      "I understand it intellectually",
      "I understand it and feel its implications personally",
      "This confirms what I already know about the nature of consciousness and reality",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 8,
    category: "REALITY",
    type: "scenario",
    text: "The double-slit experiment shows that a particle behaves differently when it is being observed versus when it is not. When you consider this finding, you feel:",
    options: [
      "Nothing in particular — it's a physics curiosity",
      "Mild interest — it's strange but I'm not sure what to do with it",
      "Fascination — this suggests something profound about the nature of reality",
      "Deep resonance — this is consistent with how I understand consciousness",
      "Recognition — this is science catching up to what mystics have always known",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 9,
    category: "REALITY",
    type: "direct",
    text: "How would you describe your current understanding of the relationship between consciousness and physical reality?",
    options: [
      "Consciousness is produced by the brain and ends at death",
      "I'm genuinely uncertain — it's a fascinating open question",
      "Consciousness may be more fundamental than matter",
      "Consciousness is the primary reality — matter is derivative",
      "I live from this understanding daily — it shapes everything I do",
    ],
    weights: [0, 1, 2, 3, 4],
  },

  // SELF & IDENTITY
  {
    id: 10,
    category: "SELF",
    type: "agree",
    text: "The identity most people carry — their sense of who they are, what they're capable of, what they deserve — has been largely constructed by external systems designed to keep them manageable.",
    options: [
      "I don't see it that way",
      "Partially perhaps, but I think I know who I am",
      "I can see this is true for many people including myself",
      "This has been one of the central realizations of my life",
      "I've done significant work to dismantle this programming",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 11,
    category: "SELF",
    type: "scenario",
    text: "When you sit in genuine silence — no phone, no noise, no distraction — what most often arises?",
    options: [
      "Restlessness or discomfort — I prefer to stay occupied",
      "Relaxation, but not much deeper than that",
      "Awareness — I notice thoughts, patterns, things I usually miss",
      "A sense of something larger than my personal story",
      "Deep stillness and connection to something that feels like my true nature",
    ],
    weights: [0, 1, 2, 3, 4],
  },

  // FREQUENCY & ENERGY
  {
    id: 12,
    category: "FREQUENCY",
    type: "direct",
    text: "How actively are you working on your energetic and vibrational state — through meditation, breathwork, frequency sessions, nature, intentional practices, or similar?",
    options: [
      "Not at all — I don't work with these concepts",
      "Occasionally, when I think of it",
      "Regularly — it's part of my life",
      "Daily — it's a non-negotiable foundation",
      "It's not something I do separately — it's how I exist",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 13,
    category: "FREQUENCY",
    type: "scenario",
    text: "When you walk into a room full of people you've never met, you typically:",
    options: [
      "Focus on the practical social dynamics — who to talk to, what to say",
      "Notice the general mood but don't think much beyond that",
      "Pick up on the emotional undercurrent of the room quite naturally",
      "Feel the energetic quality of the space and individuals clearly",
      "Immediately sense the frequency of the space and adjust or hold your own accordingly",
    ],
    weights: [0, 1, 2, 3, 4],
  },

  // PURPOSE & MISSION
  {
    id: 14,
    category: "PURPOSE",
    type: "agree",
    text: "I have a sense — however unclear — that I am here for something specific. That my life carries a purpose beyond the conventional markers of success.",
    options: [
      "Not particularly — I'm focused on practical goals",
      "Sometimes I feel this but I'm not sure I trust it",
      "Yes — I feel this and I'm actively trying to understand it",
      "Strongly — my sense of purpose has become a guiding force",
      "This is the central fact of my life and everything flows from it",
    ],
    weights: [0, 1, 2, 3, 4],
  },
  {
    id: 15,
    category: "PURPOSE",
    type: "scenario",
    text: "You are at a gathering and someone dismisses the idea that history has been suppressed, that elite coordination exists, or that consciousness is more than a brain function. Your response is:",
    options: [
      "I probably agree with them — these seem like conspiracy theories",
      "I stay quiet — I don't want to argue about something I'm not sure of",
      "I share a thought or two but don't push it — not everyone is ready",
      "I engage calmly with facts — not to convince but to plant a seed",
      "I feel genuine compassion — I remember when I saw the world that way",
    ],
    weights: [0, 1, 2, 3, 4],
  },
];

// ─── SCORING ──────────────────────────────────────────────────────────────────
function getScore(answers) {
  const total = answers.reduce((sum, a) => sum + a, 0);
  const max = QUESTIONS.length * 4;
  return Math.round((total / max) * 100);
}

function getLevel(score) {
  return LEVELS.find(l => score >= l.range[0] && score <= l.range[1]) || LEVELS[0];
}

// ─── CERTIFICATE CANVAS ───────────────────────────────────────────────────────
function CertificateCanvas({ name, level }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 1200, H = 800;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#040404";
    ctx.fillRect(0, 0, W, H);

    // Grain texture
    for (let i = 0; i < 15000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.025})`;
      ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
    }

    // Outer border
    ctx.strokeStyle = level.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    ctx.strokeRect(32, 32, W - 64, H - 64);
    ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.globalAlpha = 1;

    // Corner ornaments
    const corners = [[48, 48], [W - 48, 48], [48, H - 48], [W - 48, H - 48]];
    corners.forEach(([x, y]) => {
      ctx.fillStyle = level.color;
      ctx.globalAlpha = 0.6;
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("◆", x, y);
    });
    ctx.globalAlpha = 1;

    // Glow behind symbol
    const grd = ctx.createRadialGradient(W / 2, 240, 0, W / 2, 240, 180);
    grd.addColorStop(0, level.glow);
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Symbol
    ctx.font = "bold 96px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = level.color;
    ctx.globalAlpha = 0.9;
    ctx.fillText(level.symbol, W / 2, 200);
    ctx.globalAlpha = 1;

    // Soul True tag
    ctx.font = "13px 'Courier New', monospace";
    ctx.fillStyle = level.color;
    ctx.globalAlpha = 0.6;
    ctx.letterSpacing = "0.4em";
    ctx.fillText("SOUL TRUE · AWAKENING ASSESSMENT", W / 2, 300);
    ctx.globalAlpha = 1;

    // Title
    ctx.font = "bold 68px Georgia, serif";
    ctx.fillStyle = "#f0ece0";
    ctx.shadowColor = level.color;
    ctx.shadowBlur = 30;
    ctx.fillText(level.title, W / 2, 390);
    ctx.shadowBlur = 0;

    // Name
    ctx.font = "italic 32px Georgia, serif";
    ctx.fillStyle = level.color;
    ctx.fillText(name || "Soul Traveler", W / 2, 460);

    // Divider
    ctx.beginPath();
    ctx.moveTo(W / 2 - 200, 495);
    ctx.lineTo(W / 2 + 200, 495);
    ctx.strokeStyle = level.color;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Description — word wrap
    const desc = level.description;
    ctx.font = "18px Georgia, serif";
    ctx.fillStyle = "#888888";
    const maxWidth = 800;
    const lineHeight = 28;
    const words = desc.split(" ");
    let line = "";
    let y = 530;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), W / 2, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), W / 2, y);

    // Date
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.font = "14px 'Courier New', monospace";
    ctx.fillStyle = level.color;
    ctx.globalAlpha = 0.5;
    ctx.fillText(date, W / 2, H - 70);
    ctx.globalAlpha = 1;

    // Bottom Soul True
    ctx.font = "13px 'Courier New', monospace";
    ctx.fillStyle = "#888";
    ctx.fillText("soultrue.com · Your awakening is your gift to the world", W / 2, H - 50);

  }, [name, level]);

  return <canvas ref={canvasRef} style={{ width: "100%", maxWidth: 800, display: "block", margin: "0 auto", borderRadius: 2 }} />;
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: "#888", letterSpacing: "0.3em", textTransform: "uppercase" }}>Question {current} of {total}</span>
        <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: "#c8a94a", letterSpacing: "0.2em" }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.05)", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, #c8a94a, #f0d060)`, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AwakeningAssessment() {
  const [phase, setPhase] = useState("intro"); // intro | questions | name | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef(null);
  const topRef = useRef(null);

  const CATEGORY_ICONS = { HISTORY: "📜", POWER: "👁", REALITY: "⚛", SELF: "✦", FREQUENCY: "〰", PURPOSE: "∞" };

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleStart() {
    setPhase("questions");
    setCurrentQ(0);
    setAnswers([]);
    scrollTop();
  }

  function handleAnswer(weight) {
    setSelected(weight);
    setTimeout(() => {
      const newAnswers = [...answers, weight];
      if (currentQ + 1 < QUESTIONS.length) {
        setAnswers(newAnswers);
        setCurrentQ(q => q + 1);
        setSelected(null);
        scrollTop();
      } else {
        setAnswers(newAnswers);
        setPhase("name");
        scrollTop();
      }
    }, 400);
  }

  function handleNameSubmit() {
    const finalScore = getScore(answers);
    const finalLevel = getLevel(finalScore);
    setScore(finalScore);
    setLevel(finalLevel);
    setPhase("result");
    scrollTop();
  }

  function handleDownload() {
    setDownloading(true);
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `SoulTrue_${level.title.replace(/\s+g/, "_")}_Certificate.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
    setTimeout(() => setDownloading(false), 1500);
  }

  function handleRetake() {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setName("");
    setScore(0);
    setLevel(null);
    scrollTop();
  }

  const q = QUESTIONS[currentQ];

  return (
    <div ref={topRef} style={{ background: "#040404", color: "#d4c9a8", fontFamily: "'Rajdhani', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Courier+Prime:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(200,169,74,0.1)}50%{box-shadow:0 0 40px rgba(200,169,74,0.25)}}
        @keyframes starPulse{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.8;transform:scale(1.1)}}
        .opt-btn{transition:all 0.2s;border:1px solid rgba(200,169,74,0.25);background:transparent;cursor:pointer;width:100%;text-align:left;padding:14px 20px;color:#888;font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:400;line-height:1.4;}
        .opt-btn:hover{border-color:#c8a94a;color:#d4c9a8;background:rgba(200,169,74,0.06);}
        .opt-btn.selected{border-color:#f0d060;color:#f0d060;background:rgba(200,169,74,0.12);}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:#c8a94a44}
        input[type=text]{background:#111;border:1px solid rgba(200,169,74,0.3);color:#f0ece0;font-family:'Rajdhani',sans-serif;font-size:1.3rem;padding:16px 20px;outline:none;width:100%;letter-spacing:0.05em;transition:border-color 0.2s;}
        input[type=text]:focus{border-color:#c8a94a;}
        input[type=text]::placeholder{color:rgba(136,136,136,0.4);font-style:italic;}
      `}</style>

      {/* STARS BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, background: "#fff", borderRadius: "50%", top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() * 0.4 + 0.1, animation: `starPulse ${Math.random() * 4 + 3}s ease-in-out infinite`, animationDelay: `${Math.random() * 4}s` }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {phase === "intro" && (
          <div style={{ animation: "fadeUp 0.6s ease", paddingTop: 80, paddingBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.4em", color: "#c8a94a", opacity: 0.6, textTransform: "uppercase", marginBottom: 20 }}>Soul True · Awakening Assessment</div>
              <div style={{ fontSize: "5rem", marginBottom: 24, animation: "pulse 4s ease-in-out infinite" }}>𓂀</div>
              <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem,6vw,3.8rem)", fontWeight: 900, color: "#f0ece0", lineHeight: 0.95, marginBottom: 16, textShadow: "0 0 60px rgba(200,169,74,0.25)" }}>
                WHERE ARE YOU<br /><span style={{ color: "#c8a94a" }}>ON YOUR</span><br />AWAKENING PATH
              </h1>
              <p style={{ fontSize: 13, letterSpacing: "0.28em", color: "#888", textTransform: "uppercase", marginBottom: 40 }}>15 Questions · Your Cosmic Title · Downloadable Certificate</p>
              <div style={{ maxWidth: 560, margin: "0 auto 48px", fontSize: 16, lineHeight: 1.78, color: "#d4c9a8", fontWeight: 300, borderLeft: "2px solid #c8a94a", paddingLeft: 22, textAlign: "left" }}>
                This is not a test. There are no wrong answers. It is a mirror — showing you where you are right now on the journey from programmed sleep to fully awakened consciousness.<br /><br />
                <strong style={{ color: "#f0d060" }}>Answer honestly. The reflection you get will be accurate only if you are.</strong>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginBottom: 48 }}>
                {[["15", "Questions"], ["10", "Cosmic Levels"], ["1", "Certificate"]].map(([n, l]) => (
                  <div key={l} style={{ background: "#111", padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "2rem", color: "#c8a94a", fontWeight: 900 }}>{n}</div>
                    <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={handleStart} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, letterSpacing: "0.35em", textTransform: "uppercase", padding: "18px 56px", background: "transparent", border: "1px solid #c8a94a", color: "#c8a94a", cursor: "pointer", animation: "glow 3s ease-in-out infinite", fontWeight: 700 }}>
                Begin the Assessment
              </button>
            </div>

            {/* Level preview */}
            <div style={{ borderTop: "1px solid rgba(200,169,74,0.1)", paddingTop: 40 }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.3em", color: "#888", textTransform: "uppercase", textAlign: "center", marginBottom: 24 }}>The Ten Cosmic Levels</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 2 }}>
                {LEVELS.map(l => (
                  <div key={l.id} style={{ background: "#111", padding: "14px 12px", textAlign: "center", borderTop: `2px solid ${l.color}` }}>
                    <div style={{ fontSize: "1.4rem", marginBottom: 6, color: l.color }}>{l.symbol}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", color: "#f0ece0", lineHeight: 1.3 }}>{l.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── QUESTIONS ─────────────────────────────────────────────────── */}
        {phase === "questions" && q && (
          <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 60, paddingBottom: 60 }}>
            <ProgressBar current={currentQ + 1} total={QUESTIONS.length} />
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: "1rem" }}>{CATEGORY_ICONS[q.category]}</span>
                <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, letterSpacing: "0.3em", color: "#c8a94a", textTransform: "uppercase", opacity: 0.7 }}>{q.category}</span>
              </div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, color: "#f0ece0", lineHeight: 1.4, marginBottom: 32 }}>
                {q.text}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, i) => (
                  <button key={i} className={`opt-btn${selected === q.weights[i] ? " selected" : ""}`} onClick={() => handleAnswer(q.weights[i])}>
                    <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: "#c8a94a", marginRight: 12, opacity: 0.6 }}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── NAME ──────────────────────────────────────────────────────── */}
        {phase === "name" && (
          <div style={{ animation: "fadeUp 0.5s ease", paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 20, animation: "pulse 3s ease-in-out infinite" }}>✦</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem,4vw,2.4rem)", color: "#f0ece0", marginBottom: 12 }}>Your Assessment Is Complete</h2>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>
              Enter your name to receive your cosmic title<br />and generate your personal certificate.
            </p>
            <div style={{ maxWidth: 420, margin: "0 auto" }}>
              <input
                type="text"
                placeholder="Your name..."
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && name.trim() && handleNameSubmit()}
                autoFocus
              />
              <button onClick={handleNameSubmit} disabled={!name.trim()} style={{ marginTop: 16, fontFamily: "'Rajdhani', sans-serif", fontSize: 13, letterSpacing: "0.35em", textTransform: "uppercase", padding: "16px 48px", background: name.trim() ? "transparent" : "transparent", border: `1px solid ${name.trim() ? "#c8a94a" : "rgba(200,169,74,0.2)"}`, color: name.trim() ? "#c8a94a" : "rgba(200,169,74,0.3)", cursor: name.trim() ? "pointer" : "not-allowed", fontWeight: 700, width: "100%", transition: "all 0.2s" }}>
                Reveal My Title →
              </button>
            </div>
          </div>
        )}

        {/* ── RESULT ────────────────────────────────────────────────────── */}
        {phase === "result" && level && (
          <div style={{ animation: "fadeUp 0.6s ease", paddingTop: 60, paddingBottom: 80 }}>

            {/* Title reveal */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.4em", color: level.color, opacity: 0.7, textTransform: "uppercase", marginBottom: 20 }}>Soul True · Your Cosmic Title</div>
              <div style={{ fontSize: "5rem", marginBottom: 16, filter: `drop-shadow(0 0 30px ${level.glow})`, animation: "pulse 3s ease-in-out infinite" }}>{level.symbol}</div>
              <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.4rem,7vw,4rem)", fontWeight: 900, color: level.color, marginBottom: 8, textShadow: `0 0 60px ${level.glow}` }}>
                {level.title}
              </h1>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: "#888", marginBottom: 32, letterSpacing: "0.15em" }}>
                {name}
              </p>
              <div style={{ maxWidth: 600, margin: "0 auto 32px", fontSize: 15, lineHeight: 1.8, color: "#d4c9a8", fontWeight: 300, padding: "20px 24px", background: "rgba(255,255,255,0.025)", borderLeft: `3px solid ${level.color}` }}>
                {level.description}
              </div>
              <div style={{ maxWidth: 560, margin: "0 auto", fontSize: 13, lineHeight: 1.7, color: "#888", fontWeight: 300, padding: "14px 18px", border: "1px solid rgba(200,169,74,0.15)", background: "rgba(200,169,74,0.03)" }}>
                <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.25em", color: "#c8a94a", display: "block", marginBottom: 6 }}>YOUR NEXT STEP</span>
                {level.next}
              </div>
            </div>

            {/* Certificate */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.3em", color: "#888", textTransform: "uppercase", textAlign: "center", marginBottom: 20 }}>Your Certificate</div>
              <CertificateCanvas name={name} level={level} />
            </div>

            {/* Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 48 }}>
              <button onClick={handleDownload} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "16px", background: "transparent", border: `1px solid ${level.color}`, color: level.color, cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }}>
                {downloading ? "Downloading..." : "⬇ Download Certificate"}
              </button>
              <button onClick={() => { if (navigator.share) { navigator.share({ title: `I am ${level.title} — Soul True Awakening Assessment`, text: `I just completed the Soul True Awakening Assessment and received the title: ${level.title}. ${level.description.slice(0, 100)}...`, url: window.location.href }); } else { navigator.clipboard.writeText(`I am ${level.title} on my awakening journey — Soul True · soultrue.com`); alert("Copied to clipboard!"); } }} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "16px", background: "transparent", border: "1px solid rgba(200,169,74,0.3)", color: "#888", cursor: "pointer", fontWeight: 700 }}>
                ↗ Share My Title
              </button>
            </div>

            {/* All levels context */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 40, marginBottom: 40 }}>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.3em", color: "#888", textTransform: "uppercase", textAlign: "center", marginBottom: 24 }}>The Path Ahead</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 2 }}>
                {LEVELS.map(l => (
                  <div key={l.id} style={{ background: l.id === level.id ? "rgba(255,255,255,0.04)" : "#111", padding: "14px 10px", textAlign: "center", borderTop: `2px solid ${l.id === level.id ? l.color : "rgba(255,255,255,0.04)"}`, position: "relative" }}>
                    {l.id === level.id && <div style={{ position: "absolute", top: 6, right: 8, width: 6, height: 6, background: l.color, borderRadius: "50%" }} />}
                    <div style={{ fontSize: "1.2rem", marginBottom: 5, color: l.id <= level.id ? l.color : "#333" }}>{l.symbol}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: l.id <= level.id ? "#f0ece0" : "#333", lineHeight: 1.3 }}>{l.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Higher Vibes CTA */}
            <div style={{ background: "#111", borderTop: `2px solid #c8a94a`, padding: "32px 28px", textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem", color: "#f0ece0", marginBottom: 10 }}>Ready to Accelerate Your Awakening?</div>
              <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 20, fontWeight: 300, maxWidth: 480, margin: "0 auto 20px" }}>
                The shift from knowing to embodying is where a guide changes everything. Connect with Kim Alfano at Higher Vibes for personalized coaching.
              </p>
              <a href="mailto:highervibrations36@gmail.com" style={{ display: "inline-block", fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "14px 36px", border: "1px solid #c8a94a", color: "#c8a94a", textDecoration: "none", fontWeight: 700 }}>
                Connect With Kim →
              </a>
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={handleRetake} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", background: "none", border: "none", color: "#555", cursor: "pointer", padding: 8 }}>
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
