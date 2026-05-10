/* Shared design constants for the dark-themed app pages */

export const C = {
  bg: "#0D0F0E",
  card: "#141917",
  inner: "#1C2420",
  hover: "#2A332F",
  border: "#2E3A35",
  teal: "#1D9E75",
  tealDark: "#0F6E56",
  tealLight: "#E1F5EE",
  gold: "#C9A84C",
  goldDark: "#8B6914",
  text: "#E8EDE9",
  muted: "#8A9E94",
  dim: "#5A6E64",
  red: "#E24B4A",
  amber: "#EF9F27",
} as const;

export const fonts = {
  display: '"Cormorant Garamond", serif',
  body: '"Outfit", sans-serif',
  label: '"Cinzel", serif',
};

import dividerAccent from "@/assets/divider-accent.png";

export function GoldRule() {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 700, padding: "8px 0" }}>
      <svg viewBox="0 0 800 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" className="block w-full h-auto">
        <line x1="0" y1="15" x2="370" y2="15" stroke="#c9a84c" strokeWidth="0.5" opacity="0.8" />
        <line x1="430" y1="15" x2="800" y2="15" stroke="#c9a84c" strokeWidth="0.5" opacity="0.8" />
        <circle cx="378" cy="15" r="1.5" fill="#c9a84c" />
        <circle cx="422" cy="15" r="1.5" fill="#c9a84c" />
        <polygon points="400,5 403,13 411,15 403,17 400,25 397,17 389,15 397,13" fill="#c9a84c" />
      </svg>
    </div>
  );
}

export function StepCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index?: number }) {
  return (
    <div
      className="rounded-xl border p-6 transition-colors duration-200"
      style={{ backgroundColor: C.card, borderColor: C.border }}
    >
      <div className="mb-4 flex items-center gap-3">
        {index !== undefined && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium" style={{ backgroundColor: `${C.teal}22`, color: C.teal, fontFamily: fonts.body }}>
            {index}
          </span>
        )}
        <span style={{ color: C.gold }}>{icon}</span>
      </div>
      <h4 className="mb-2 text-lg font-medium" style={{ fontFamily: fonts.display, color: C.text }}>{title}</h4>
      <p className="text-sm leading-relaxed" style={{ fontFamily: fonts.body, color: C.muted, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

export function Emblem({ icon, size = 70 }: { icon: React.ReactNode; size?: number }) {
  return (
    <div
      className="mx-auto flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        border: `1.5px solid ${C.gold}`,
        color: C.gold,
      }}
    >
      {icon}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: fonts.label, color: C.gold }}>
      {children}
    </p>
  );
}

export function HeroTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 text-4xl font-light md:text-5xl" style={{ fontFamily: fonts.display, color: C.text, lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

export function GoldText({ children }: { children: React.ReactNode }) {
  return <span className="italic" style={{ color: C.gold }}>{children}</span>;
}
