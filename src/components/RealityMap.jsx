import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────
const T = {
  void: "#040404", stone: "#111111", stone2: "#0d0d0d",
  gold: "#c8a94a", goldBright: "#f0d060", amber: "#e07020",
  ocean: "#00c8ff", green: "#3a9a50", purple: "#9a6aaa",
  blood: "#8b1a1a", ash: "#888888", bone: "#d4c9a8", white: "#f0ece0",
};

// ─── NODE DATA ────────────────────────────────────────────────
const NODES = [
  // CENTER
  {
    id: "soultrue",
    label: "Soul True",
    sublabel: "The Convergence",
    symbol: "𓂀",
    color: T.gold,
    glow: "rgba(200,169,74,0.5)",
    x: 50, y: 50,
    size: 90,
    center: true,
    description: "Soul True exists at the intersection of suppressed history, hidden power, quantum reality, and human potential. Every pillar connects to a single truth: you are vastly more than the story you were handed.",
    links: ["history", "power", "quantum", "frequency", "identity", "awakening"],
  },

  // TIER 1 — PRIMARY PILLARS
  {
    id: "history",
    label: "Suppressed History",
    sublabel: "Ancient Sites · Lost Civilizations",
    symbol: "△",
    color: T.amber,
    glow: "rgba(224,112,32,0.4)",
    x: 50, y: 14,
    size: 68,
    description: "A prior advanced civilization existed and was erased from the official record. LiDAR is finding their cities under jungles. Sonar is finding their temples under the sea. The timeline we were taught is demonstrably false — and the suppression of that truth is systematic.",
    links: ["gobekli", "lidar", "underwater", "power"],
    facts: [
      "Göbekli Tepe: 12,000 years old — built before agriculture supposedly existed",
      "60,000+ structures found under Guatemalan jungle via LiDAR",
      "Dwarka: 9,500-year-old city confirmed underwater off India",
      "Less than 1% of the Amazon has been archaeologically surveyed",
    ],
    cta: { label: "Explore the Truth Archive", path: "/hidden-truth" },
  },
  {
    id: "power",
    label: "Hidden Power",
    sublabel: "Secret Societies · Elite Networks",
    symbol: "👁",
    color: T.gold,
    glow: "rgba(200,169,74,0.4)",
    x: 82, y: 30,
    size: 68,
    description: "Elite coordination is not a theory. It is documented. Skull & Bones, Bohemian Grove, the CFR, Bilderberg — their memberships are on record, their influence on government is established, and their rituals are filmed. The world is run by networks, not by the institutions visible to the public.",
    links: ["history", "quantum", "identity"],
    facts: [
      "Both 2004 presidential candidates were Skull & Bones members",
      "The Manhattan Project was conceived at Bohemian Grove",
      "Every US Secretary of State since 1961 has been a CFR member",
      "Klaus Schwab publicly stated he has 'penetrated' multiple democratic cabinets",
    ],
    cta: { label: "Explore Hidden Power", path: "/hidden-truth" },
  },
  {
    id: "quantum",
    label: "Quantum Reality",
    sublabel: "Non-Local · Observer Effect",
    symbol: "⚛",
    color: T.ocean,
    glow: "rgba(0,200,255,0.4)",
    x: 82, y: 70,
    size: 68,
    description: "The 2022 Nobel Prize in Physics proved the universe is not locally real. Particles don't have definite properties until observed. Consciousness participates in creating reality. The mechanical model of existence — that you are a powerless being in a material universe — has been formally disproven by the most precise science ever developed.",
    links: ["identity", "frequency", "power"],
    facts: [
      "2022 Nobel Prize: universe is not 'locally real' — confirmed experimentally",
      "Double-slit experiment: observation changes the physical behavior of matter",
      "Max Planck: 'I regard consciousness as fundamental. Matter is derivative.'",
      "PEAR Lab: 28 years of published evidence of intention affecting physical systems",
    ],
    cta: { label: "Explore Quantum Reality", path: "/hidden-truth" },
  },
  {
    id: "frequency",
    label: "Frequency Wellness",
    sublabel: "Vibrational Health · Energy Work",
    symbol: "〰",
    color: T.green,
    glow: "rgba(58,154,80,0.4)",
    x: 50, y: 86,
    size: 68,
    description: "Everything is frequency. Your physical body, your emotional state, your mental patterns — all operate as vibrational fields that can be consciously elevated. Frequency wellness is not alternative wellness. It is the practical application of quantum understanding to daily human experience.",
    links: ["identity", "awakening", "quantum"],
    facts: [
      "Heart Math Institute: the heart generates the body's largest electromagnetic field",
      "Dr. Emoto's water crystal research: intention changes molecular structure",
      "Sound frequencies (432Hz, 528Hz) demonstrably affect cellular behavior",
      "Meditation measurably changes brain structure within 8 weeks",
    ],
    cta: { label: "Connect With Higher Vibes", path: "mailto:highervibrations36@gmail.com" },
  },
  {
    id: "identity",
    label: "True Identity",
    sublabel: "Deprogramming · Sovereign Self",
    symbol: "✦",
    color: T.purple,
    glow: "rgba(154,106,170,0.4)",
    x: 18, y: 70,
    size: 68,
    description: "The identity most people carry was largely constructed by external systems — educational, media, cultural, and governmental — designed to produce compliant, manageable beings. Reclaiming your true identity is not a philosophical exercise. It is the most practical and consequential work a human being can undertake.",
    links: ["awakening", "frequency", "history"],
    facts: [
      "MKUltra: the US government ran a 20-year program to learn how to control identity",
      "Media ownership: 6 corporations control 90% of US media",
      "Educational systems worldwide teach compliance, not critical thinking",
      "Quantum mechanics suggests the self is not separate from the field it observes",
    ],
    cta: { label: "Take the Awakening Assessment", path: "/awakening-assessment" },
  },
  {
    id: "awakening",
    label: "The Awakening",
    sublabel: "Your Path Forward",
    symbol: "☀",
    color: T.goldBright,
    glow: "rgba(240,208,96,0.45)",
    x: 18, y: 30,
    size: 68,
    description: "Awakening is not a destination. It is an ongoing process of expanding awareness — of history, of power, of reality, and of yourself. Every piece of suppressed knowledge you recover, every false identity you release, every quantum truth you embody moves you further from the managed life and closer to the sovereign one.",
    links: ["soultrue", "identity", "history"],
    facts: [
      "The same system that suppressed ancient history suppressed human potential",
      "Quantum non-locality proves separation is an appearance, not fundamental reality",
      "Every culture that had genuine awakening practices had them systematically eliminated",
      "You are here — which means the process has already begun",
    ],
    cta: { label: "Discover Your Level", path: "/awakening-assessment" },
  },

  // TIER 2 — SECONDARY NODES
  {
    id: "gobekli",
    label: "Göbekli Tepe",
    sublabel: "12,000 Years Old",
    symbol: "𓂀",
    color: T.amber,
    glow: "rgba(224,112,32,0.3)",
    x: 35, y: 6,
    size: 44,
    description: "The world's oldest known megalithic structure. Built 12,000 years ago — before pottery, writing, or agriculture supposedly existed. Deliberately buried around 8,000 BC by human hands. Less than 5% excavated. Pillar 43 encodes a comet impact record dated to 10,950 BC — peer-reviewed 2024.",
    links: ["history", "lidar"],
    cta: { label: "Full Deep Dive", path: "/hidden-truth" },
  },
  {
    id: "lidar",
    label: "LiDAR Discoveries",
    sublabel: "Cities Under Jungle",
    symbol: "◎",
    color: T.green,
    glow: "rgba(58,154,80,0.3)",
    x: 65, y: 6,
    size: 44,
    description: "Laser scanning from aircraft is revealing complete civilizations hidden under jungle canopy worldwide. Guatemala: 60,000+ structures. Amazon: urban networks across 300 km². Cambodia: Angkor was four times larger than known. Less than 1% of relevant territory has been scanned.",
    links: ["history", "underwater"],
    cta: { label: "Explore LiDAR Finds", path: "/hidden-truth" },
  },
  {
    id: "underwater",
    label: "Underwater Sites",
    sublabel: "Pre-Flood Civilizations",
    symbol: "🌊",
    color: T.ocean,
    glow: "rgba(0,200,255,0.3)",
    x: 92, y: 50,
    size: 44,
    description: "Sea levels rose 400 feet at the end of the last ice age — swallowing every coastal civilization that existed before 10,000 BC. Dwarka (India): 9,500 years old, 120 feet underwater. Thonis-Heracleion: Egypt's greatest port, called legend for 2,000 years, confirmed in 2000. Over 100 confirmed submerged sites worldwide.",
    links: ["history", "quantum"],
    cta: { label: "Explore Underwater Sites", path: "/hidden-truth" },
  },
];

// ─── CONNECTION LINES ─────────────────────────────────────────
function getConnections() {
  const pairs = new Set();
  const connections = [];
  NODES.forEach(node => {
    node.links?.forEach(targetId => {
      const key = [node.id, targetId].sort().join("-");
      if (!pairs.has(key)) {
        pairs.add(key);
        const target = NODES.find(n => n.id === targetId);
        if (target) connections.push({ from: node, to: target });
      }
    });
  });
  return connections;
}

// ─── NODE COMPONENT ───────────────────────────────────────────
function MapNode({ node, active, onClick, containerSize }) {
  const isActive = active === node.id;
  const px = (node.x / 100) * containerSize.w;
  const py = (node.y / 100) * containerSize.h;
  const r = node.size / 2;

  return (
    <g
      transform={`translate(${px}, ${py})`}
      onClick={() => onClick(node.id)}
      style={{ cursor: "pointer" }}
    >
      {/* Outer glow ring */}
      <circle
        r={r + 14}
        fill="none"
        stroke={node.color}
        strokeWidth={isActive ? 1.5 : 0.5}
        opacity={isActive ? 0.6 : 0.15}
        style={{ transition: "all 0.3s" }}
      />
      {/* Pulsing ring on active */}
      {isActive && (
        <circle r={r + 22} fill="none" stroke={node.color} strokeWidth={0.5} opacity={0.3}>
          <animate attributeName="r" values={`${r + 18};${r + 28};${r + 18}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Main circle */}
      <circle
        r={r}
        fill={isActive ? `rgba(${node.color === T.gold ? "200,169,74" : node.color === T.ocean ? "0,200,255" : node.color === T.amber ? "224,112,32" : node.color === T.green ? "58,154,80" : node.color === T.purple ? "154,106,170" : "240,208,96"},0.15)` : T.stone}
        stroke={node.color}
        strokeWidth={isActive ? 1.5 : 0.8}
        style={{ transition: "all 0.3s" }}
      />
      {/* Symbol */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        y={-6}
        fontSize={node.size > 60 ? 22 : 16}
        fill={node.color}
        opacity={0.9}
        style={{ fontFamily: "serif", userSelect: "none" }}
      >
        {node.symbol}
      </text>
      {/* Label */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        y={node.size > 60 ? 14 : 11}
        fontSize={node.size > 60 ? 10 : 8}
        fill={isActive ? T.white : T.bone}
        fontFamily="'Cinzel', serif"
        fontWeight="700"
        letterSpacing="0.5"
        style={{ userSelect: "none", transition: "fill 0.3s" }}
      >
        {node.label.split(" ").map((word, i, arr) => (
          <tspan key={i} x="0" dy={i === 0 ? 0 : 11}>{word}</tspan>
        ))}
      </text>
    </g>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────
function DetailPanel({ node, onClose }) {
  if (!node) return null;
  return (
    <div style={{ animation: "slideIn 0.3s ease", background: T.stone, borderTop: `2px solid ${node.color}`, padding: "28px 28px 32px", position: "relative" }}>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: T.ash, cursor: "pointer", fontSize: "1.1rem", fontFamily: "monospace" }}>✕</button>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <span style={{ fontSize: "2rem", color: node.color, filter: `drop-shadow(0 0 8px ${node.glow})` }}>{node.symbol}</span>
        <div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.2rem", fontWeight: 700, color: T.white, marginBottom: 3 }}>{node.label}</h3>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: node.color, opacity: 0.75, letterSpacing: "0.2em" }}>{node.sublabel}</div>
        </div>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.72, color: T.ash, fontWeight: 300, marginBottom: 16 }}>{node.description}</p>
      {node.facts && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 9, letterSpacing: "0.3em", color: node.color, textTransform: "uppercase", marginBottom: 10 }}>Key Facts</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {node.facts.map((f, i) => (
              <li key={i} style={{ fontSize: 13, color: T.bone, paddingLeft: 14, position: "relative", fontWeight: 300, lineHeight: 1.45 }}>
                <span style={{ position: "absolute", left: 0, color: node.color, fontSize: 9, top: 3 }}>▸</span>{f}
              </li>
            ))}
          </ul>
        </div>
      )}
      {node.cta && (
        <a href={node.cta.path} style={{ display: "inline-block", fontFamily: "'Rajdhani', sans-serif", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", padding: "12px 28px", border: `1px solid ${node.color}`, color: node.color, textDecoration: "none", fontWeight: 700, transition: "all 0.2s" }}>
          {node.cta.label} →
        </a>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function RealityMap() {
  const [activeNode, setActiveNode] = useState(null);
  const [containerSize, setContainerSize] = useState({ w: 700, h: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const connections = getConnections();

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = rect.width;
        const h = Math.max(w * 0.85, 480);
        setContainerSize({ w, h });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const active = NODES.find(n => n.id === activeNode);

  function handleNodeClick(id) {
    setActiveNode(prev => prev === id ? null : id);
  }

  return (
    <div style={{ background: T.void, color: T.bone, fontFamily: "'Rajdhani', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Courier+Prime:wght@400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:#c8a94a44}
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "60px 40px 40px", textAlign: "center", background: "radial-gradient(ellipse at 50% 0, rgba(200,169,74,0.06), transparent 60%)", animation: "fadeUp 0.6s ease" }}>
        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.4em", color: T.gold, opacity: 0.6, textTransform: "uppercase", marginBottom: 14 }}>Soul True · Reality Map</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 900, color: T.white, lineHeight: 1, marginBottom: 10, textShadow: "0 0 40px rgba(200,169,74,0.2)" }}>
          THE <span style={{ color: T.gold }}>CONNECTED</span> TRUTH
        </h1>
        <p style={{ fontSize: 12, letterSpacing: "0.28em", color: T.ash, textTransform: "uppercase", marginBottom: 20 }}>Every Pillar · Every Connection · One Map</p>
        <p style={{ fontSize: 14, color: T.ash, lineHeight: 1.7, maxWidth: 560, margin: "0 auto", fontWeight: 300 }}>
          Nothing in Soul True is isolated. Ancient history, hidden power, quantum reality, frequency, identity, and awakening are all facets of a single truth. <strong style={{ color: T.bone }}>Click any node to explore the connection.</strong>
        </p>
      </div>

      {/* LEGEND */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", padding: "0 40px 32px" }}>
        {[
          { color: T.gold, label: "Core" },
          { color: T.amber, label: "History" },
          { color: T.ocean, label: "Reality" },
          { color: T.green, label: "Wellness" },
          { color: T.purple, label: "Identity" },
          { color: T.goldBright, label: "Awakening" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: T.stone, border: `1px solid rgba(255,255,255,0.05)` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 11, color: T.ash, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* MAP */}
      <div style={{ padding: "0 24px 24px" }}>
        <div ref={containerRef} style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <svg
            width={containerSize.w}
            height={containerSize.h}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Connection lines */}
            {connections.map(({ from, to }, i) => {
              const x1 = (from.x / 100) * containerSize.w;
              const y1 = (from.y / 100) * containerSize.h;
              const x2 = (to.x / 100) * containerSize.w;
              const y2 = (to.y / 100) * containerSize.h;
              const isHighlighted = activeNode && (from.id === activeNode || to.id === activeNode);
              const lineColor = isHighlighted
                ? (from.id === activeNode ? from.color : to.color)
                : "rgba(200,169,74,0.1)";
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={lineColor}
                  strokeWidth={isHighlighted ? 1.5 : 0.5}
                  strokeDasharray={isHighlighted ? "none" : "4 6"}
                  opacity={isHighlighted ? 0.8 : 0.4}
                  style={{ transition: "all 0.3s" }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map(node => (
              <MapNode
                key={node.id}
                node={node}
                active={activeNode}
                onClick={handleNodeClick}
                containerSize={containerSize}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        {active ? (
          <DetailPanel node={active} onClose={() => setActiveNode(null)} />
        ) : (
          <div style={{ background: T.stone, padding: "24px 28px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8, opacity: 0.3, animation: "pulse 3s ease-in-out infinite" }}>⬆</div>
            <p style={{ fontSize: 13, color: T.ash, fontWeight: 300, letterSpacing: "0.1em" }}>Select any node above to explore its truth</p>
          </div>
        )}
      </div>

      {/* ALL CONNECTIONS SUMMARY */}
      <div style={{ maxWidth: 900, margin: "32px auto 0", padding: "0 24px 80px" }}>
        <div style={{ borderTop: "1px solid rgba(200,169,74,0.1)", paddingTop: 40 }}>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, letterSpacing: "0.3em", color: T.ash, textTransform: "uppercase", textAlign: "center", marginBottom: 28 }}>All Pillars</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
            {NODES.filter(n => !n.center).map(node => (
              <button
                key={node.id}
                onClick={() => { setActiveNode(node.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ background: activeNode === node.id ? "rgba(255,255,255,0.04)" : T.stone, border: "none", borderLeft: `3px solid ${activeNode === node.id ? node.color : "rgba(255,255,255,0.06)"}`, padding: "16px 18px", textAlign: "left", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}
              >
                <span style={{ fontSize: "1.3rem", color: node.color, flexShrink: 0 }}>{node.symbol}</span>
                <div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", color: T.white, marginBottom: 3 }}>{node.label}</div>
                  <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: 10, color: node.color, opacity: 0.7 }}>{node.sublabel}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Core truth statement */}
        <div style={{ background: T.stone, borderTop: `2px solid ${T.gold}`, padding: "36px 32px", marginTop: 40, textAlign: "center" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", color: T.gold, marginBottom: 12 }}>Everything Connects</div>
          <p style={{ fontSize: 15, color: T.ash, lineHeight: 1.82, maxWidth: 640, margin: "0 auto 24px", fontWeight: 300 }}>
            The suppression of ancient history, the operation of hidden power networks, the concealment of quantum mechanics' implications, and the constructed nature of personal identity are not separate subjects. <strong style={{ color: T.bone }}>They are facets of a single system — and understanding how they connect is the beginning of genuine freedom.</strong>
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/awakening-assessment" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "13px 28px", border: `1px solid ${T.gold}`, color: T.gold, textDecoration: "none", fontWeight: 700 }}>
              Discover Your Level →
            </a>
            <a href="/hidden-truth" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", padding: "13px 28px", border: "1px solid rgba(200,169,74,0.25)", color: T.ash, textDecoration: "none", fontWeight: 700 }}>
              Explore the Archive →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
