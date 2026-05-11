import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/soul-profile")({
  head: () => ({
    meta: [
      { title: "Your Soul Profile — Soul True" },
      { name: "description", content: "Your complete Soul Profile — the union of your Aura, Iris, and Fingerprint readings." },
    ],
  }),
  component: SoulProfilePlaceholder,
});

function SoulProfilePlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8" }}>
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>The Crescendo</p>
        <h1 className="mt-6 font-serif text-4xl font-light italic" style={{ color: "#E8C87A" }}>
          Your Soul Profile
        </h1>
        <p className="mt-6 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>
          Your three readings — Aura, Iris, and Fingerprint — are weaving together into a single, sacred reflection of who you are. Your full Soul Profile arrives soon.
        </p>
        <Link
          to="/fingerprint-reader"
          className="mt-10 inline-block rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "#C9A84C", border: "1px solid #C9A84C" }}
        >
          ← Back to Fingerprint Reader
        </Link>
      </div>
    </div>
  );
}
