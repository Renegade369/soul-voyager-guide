import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/iris-reader")({
  head: () => ({
    meta: [
      { title: "Iris Reading — Soul True" },
      { name: "description", content: "Coming soon: the second step of your Soul Profile — the Iris Reader." },
    ],
  }),
  component: IrisReaderPlaceholder,
});

function IrisReaderPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8" }}>
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>Step 2 of 3</p>
        <h1 className="mt-6 font-serif text-4xl font-light" style={{ color: "#E8C87A" }}>Iris Reader</h1>
        <p className="mt-6 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>
          The window to your soul, decoded. This reading arrives soon — a deep look into the patterns of your iris and what they reveal about your inner landscape.
        </p>
        <Link
          to="/aura-reader"
          className="mt-10 inline-block rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "#C9A84C", border: "1px solid #C9A84C" }}
        >
          ← Back to Aura Reader
        </Link>
      </div>
    </div>
  );
}
