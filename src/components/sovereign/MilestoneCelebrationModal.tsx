import { X } from "lucide-react";


const C = {
  bg: "rgba(10,10,10,0.96)",
  card: "#1A1209",
  gold: "#C9A84C",
  glow: "#E8821A",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

const DESCRIPTIONS: Record<string, string> = {
  Awakened:
    "You saw the architecture. You named it. The cage is no longer invisible. This is the first sovereignty.",
  Stripped:
    "You set down what was never yours. The inner-work arc is complete. The body finally exhales.",
  Built:
    "You found your voice, built the body of work, and named your price. The outer-work arc is complete.",
  Sovereign:
    "You finished the architecture. You have the Laws. You have the practice. The work is now yours to keep.",
  Graduated:
    "You completed The Sovereignty Code. You are not the person who started 120 days ago.",
};

export type MilestoneCelebrationModalProps = {
  milestone: string;
  open: boolean;
  onDismiss: () => void;
  nextHref?: string;
  nextLabel?: string;
};

export function MilestoneCelebrationModal({
  milestone,
  open,
  onDismiss,
  nextHref,
  nextLabel,
}: MilestoneCelebrationModalProps) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: C.bg,
        zIndex: 100,
        fontFamily: fonts.body,
      }}
      className="flex items-center justify-center p-6"
    >
      <button
        onClick={onDismiss}
        aria-label="Close"
        className="absolute top-6 right-6"
        style={{ color: C.muted }}
      >
        <X size={24} />
      </button>
      <div
        className="max-w-xl w-full text-center"
        style={{
          background: C.card,
          border: `1px solid ${C.gold}`,
          boxShadow: `0 0 80px rgba(232,130,26,0.35)`,
          padding: "56px 32px",
        }}
      >
        <p
          className="text-[11px] uppercase tracking-[0.32em]"
          style={{ color: C.gold }}
        >
          Milestone Earned
        </p>
        <h1
          className="mt-6 text-6xl md:text-7xl font-light"
          style={{ fontFamily: fonts.display, color: C.gold }}
        >
          {milestone}.
        </h1>
        <p
          className="mt-6 text-lg italic font-light leading-relaxed"
          style={{ fontFamily: fonts.display, color: C.text }}
        >
          {DESCRIPTIONS[milestone] ?? "You crossed a threshold."}
        </p>
        <div className="mt-10 flex flex-col gap-4 items-center">
          {nextHref && (
            <a
              href={nextHref}
              onClick={onDismiss}
              className="px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: "#0A0A0A", textDecoration: "none" }}
            >
              {nextLabel ?? "Continue the work"}
            </a>
          )}
          <button
            onClick={onDismiss}
            className="text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            I'll sit with this
          </button>
        </div>
      </div>
    </div>
  );
}
