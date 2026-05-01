// Sacred geometry + botanical line-art primitives.
// All shapes: stroke only, no fill. Color via `color` prop (defaults to currentColor).
// Stroke widths kept between 0.4 and 0.8 — pure line art.

type SvgProps = {
  size?: number;
  className?: string;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

const baseProps = (p: SvgProps, viewBox = "0 0 100 100") => ({
  width: p.size,
  height: p.size,
  viewBox,
  fill: "none",
  stroke: p.color ?? "currentColor",
  strokeWidth: p.strokeWidth ?? 0.6,
  opacity: p.opacity,
  style: p.style,
  className: p.className,
  "aria-hidden": true,
  focusable: false,
});

/* ---------- Hero / quote watermarks ---------- */

// Flower of life + star of David + axis lines. Centered mandala.
export function FlowerOfLife(p: SvgProps) {
  const r = 14;
  const cx = 50, cy = 50;
  // 6 surrounding circles of seed of life
  const seeds = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return { cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a) };
  });
  // outer ring of 12 circles
  const outer = Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI / 6) * i;
    const R = r * 2;
    return { cx: cx + R * Math.cos(a), cy: cy + R * Math.sin(a) };
  });
  return (
    <svg {...baseProps(p)}>
      {/* concentric containing circles */}
      <circle cx={cx} cy={cy} r={r * 3} />
      <circle cx={cx} cy={cy} r={r * 3 - 1.2} />
      <circle cx={cx} cy={cy} r={r * 2} />
      {/* center + seed of life */}
      <circle cx={cx} cy={cy} r={r} />
      {seeds.map((s, i) => <circle key={`s${i}`} cx={s.cx} cy={s.cy} r={r} />)}
      {outer.map((s, i) => <circle key={`o${i}`} cx={s.cx} cy={s.cy} r={r} />)}
      {/* star of David */}
      <polygon points={`${cx},${cy - r * 2} ${cx + r * 1.732},${cy + r} ${cx - r * 1.732},${cy + r}`} />
      <polygon points={`${cx},${cy + r * 2} ${cx + r * 1.732},${cy - r} ${cx - r * 1.732},${cy - r}`} />
      {/* axis lines */}
      <line x1={cx - r * 3} y1={cy} x2={cx + r * 3} y2={cy} />
      <line x1={cx} y1={cy - r * 3} x2={cx} y2={cy + r * 3} />
      <line x1={cx - r * 2.12} y1={cy - r * 2.12} x2={cx + r * 2.12} y2={cy + r * 2.12} />
      <line x1={cx - r * 2.12} y1={cy + r * 2.12} x2={cx + r * 2.12} y2={cy - r * 2.12} />
    </svg>
  );
}

/* ---------- Section ornaments (between hairlines) ---------- */

export function OrnamentRadiating(p: SvgProps) {
  const cx = 50, cy = 50, r = 10;
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI / 6) * i;
    return {
      x1: cx + (r + 2) * Math.cos(a),
      y1: cy + (r + 2) * Math.sin(a),
      x2: cx + (r + 8) * Math.cos(a),
      y2: cy + (r + 8) * Math.sin(a),
    };
  });
  return (
    <svg {...baseProps(p)}>
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={2.2} />
      {rays.map((l, i) => <line key={i} {...l} />)}
    </svg>
  );
}

export function OrnamentDiamond(p: SvgProps) {
  return (
    <svg {...baseProps(p)}>
      <polygon points="50,20 80,50 50,80 20,50" />
      <polygon points="50,30 70,50 50,70 30,50" />
      <circle cx="50" cy="50" r="8" />
      <circle cx="50" cy="50" r="1.6" />
    </svg>
  );
}

export function OrnamentDoubleCircle(p: SvgProps) {
  return (
    <svg {...baseProps(p)}>
      <circle cx="50" cy="50" r="20" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="50" cy="50" r="2" />
      <line x1="20" y1="50" x2="28" y2="50" />
      <line x1="72" y1="50" x2="80" y2="50" />
    </svg>
  );
}

const ORNAMENTS = [OrnamentRadiating, OrnamentDiamond, OrnamentDoubleCircle];

/** Hairline + centered SVG ornament + hairline. Used between sections. */
export function GeometricDivider({
  variant = 0,
  className = "",
  maxWidth = "max-w-6xl",
  tone = "light",
}: {
  variant?: 0 | 1 | 2;
  className?: string;
  maxWidth?: string;
  tone?: "light" | "dark";
}) {
  const Ornament = ORNAMENTS[variant % 3];
  const stroke = tone === "dark" ? "#D4AF64" : "#1C1B3A";
  const opacity = tone === "dark" ? 0.55 : 0.3;
  const lineStyle =
    tone === "dark"
      ? { backgroundColor: "rgba(212,175,100,0.35)" }
      : { backgroundColor: "rgba(28,27,58,0.3)" };
  return (
    <div className={`mx-auto ${maxWidth} px-6 ${className}`}>
      <div className="flex items-center gap-6">
        <div className="h-px flex-1" style={lineStyle} />
        <Ornament size={28} color={stroke} opacity={opacity} strokeWidth={0.6} />
        <div className="h-px flex-1" style={lineStyle} />
      </div>
    </div>
  );
}

/* ---------- Pillar icons (36×36 above titles) ---------- */

export function PillarSeedOfLife(p: SvgProps) {
  const cx = 50, cy = 50, r = 14;
  const seeds = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return { cx: cx + r * Math.cos(a), cy: cy + r * Math.sin(a) };
  });
  return (
    <svg {...baseProps({ ...p, strokeWidth: p.strokeWidth ?? 0.7 })}>
      <circle cx={cx} cy={cy} r={r} />
      {seeds.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={r} />)}
    </svg>
  );
}

export function PillarMetatronCube(p: SvgProps) {
  const cx = 50, cy = 50, R = 22, r = 4;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as const;
  });
  const lines: Array<[number, number, number, number]> = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      lines.push([pts[i][0], pts[i][1], pts[j][0], pts[j][1]]);
    }
  }
  return (
    <svg {...baseProps({ ...p, strokeWidth: p.strokeWidth ?? 0.7 })}>
      {lines.map((l, i) => <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}
      <circle cx={cx} cy={cy} r={r} />
      {pts.map(([x, y], i) => <circle key={`p${i}`} cx={x} cy={y} r={r} />)}
    </svg>
  );
}

export function PillarVesica(p: SvgProps) {
  const cx = 50, cy = 50, r = 22;
  return (
    <svg {...baseProps({ ...p, strokeWidth: p.strokeWidth ?? 0.7 })}>
      <circle cx={cx - r / 2} cy={cy} r={r} />
      <circle cx={cx + r / 2} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r} />
      <line x1={cx} y1={cy - r * 0.866} x2={cx} y2={cy + r * 0.866} />
    </svg>
  );
}

/* ---------- Card watermark (80×80, bottom-right) ---------- */

export function CardWatermark({
  variant = 0,
  className = "",
}: { variant?: 0 | 1 | 2; className?: string }) {
  const Cmp = [PillarMetatronCube, PillarSeedOfLife, PillarVesica][variant % 3];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bottom-3 right-3 ${className}`}
    >
      <Cmp size={80} color="#2C2B29" opacity={0.06} strokeWidth={0.5} />
    </div>
  );
}

/* ---------- Service tile corner brackets (top-right, 48×48) ---------- */

function CornerA(p: SvgProps) {
  return (
    <svg {...baseProps(p)}>
      <path d="M 95 5 L 95 35 M 95 5 L 65 5" />
      <circle cx="95" cy="5" r="4" />
      <circle cx="95" cy="5" r="10" />
      <line x1="80" y1="5" x2="95" y2="20" />
    </svg>
  );
}
function CornerB(p: SvgProps) {
  return (
    <svg {...baseProps(p)}>
      <path d="M 60 5 L 95 5 L 95 40" />
      <polygon points="95,15 85,25 95,35 105,25" />
      <line x1="75" y1="5" x2="95" y2="25" />
    </svg>
  );
}
function CornerC(p: SvgProps) {
  return (
    <svg {...baseProps(p)}>
      <path d="M 65 5 L 95 5 L 95 35" />
      <circle cx="95" cy="5" r="6" />
      <circle cx="95" cy="5" r="12" />
      <circle cx="95" cy="5" r="18" />
    </svg>
  );
}
function CornerD(p: SvgProps) {
  return (
    <svg {...baseProps(p)}>
      <path d="M 70 5 L 95 5 L 95 30" />
      <path d="M 80 5 Q 95 5 95 20" />
      <line x1="78" y1="5" x2="95" y2="22" />
      <line x1="86" y1="5" x2="95" y2="14" />
    </svg>
  );
}

const CORNERS = [CornerA, CornerB, CornerC, CornerD];

export function ServiceCornerBracket({
  variant = 0,
  className = "",
}: { variant?: number; className?: string }) {
  const Cmp = CORNERS[variant % CORNERS.length];
  return (
    <div aria-hidden className={`pointer-events-none absolute right-0 top-0 ${className}`}>
      <Cmp size={48} color="#2C2B29" opacity={0.12} strokeWidth={0.6} />
    </div>
  );
}

/* ---------- CTA vesica botanical (280×160) ---------- */

export function VesicaBotanical(p: SvgProps) {
  return (
    <svg {...baseProps(p, "0 0 280 160")}>
      {/* central vesica */}
      <ellipse cx="140" cy="80" rx="70" ry="40" />
      <ellipse cx="140" cy="80" rx="50" ry="28" />
      <ellipse cx="140" cy="80" rx="30" ry="16" />
      {/* leaves */}
      <path d="M 140 80 Q 90 50 50 80 Q 90 110 140 80 Z" />
      <path d="M 140 80 Q 190 50 230 80 Q 190 110 140 80 Z" />
      <path d="M 140 80 Q 110 30 140 10 Q 170 30 140 80 Z" />
      <path d="M 140 80 Q 110 130 140 150 Q 170 130 140 80 Z" />
      {/* center */}
      <circle cx="140" cy="80" r="3" />
      {/* tips */}
      <circle cx="50" cy="80" r="2" />
      <circle cx="230" cy="80" r="2" />
      <circle cx="140" cy="10" r="2" />
      <circle cx="140" cy="150" r="2" />
    </svg>
  );
}
