import { createFileRoute, Link } from "@tanstack/react-router";
import EnergyReaderTab from "@/components/guide/EnergyReaderTab";

export const Route = createFileRoute("/aura-reader")({
  head: () => ({
    meta: [
      { title: "Energy Reader — Soul True" },
      { name: "description", content: "A reflective reading of your aura, iris, and soul blueprint. Educational and inspirational only." },
      { property: "og:title", content: "Energy Reader — Soul True" },
      { property: "og:description", content: "A reflective reading of your aura, iris, and soul blueprint." },
    ],
  }),
  component: AuraReaderRoute,
});

function AuraReaderRoute() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#0D0F0E", color: "#F5F0E8" }}>
      <div className="px-6 pt-6">
        <Link to="/" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#8A9A8E" }}>
          ← Soul True
        </Link>
      </div>
      <div className="mx-auto max-w-3xl px-6">
        <EnergyReaderTab />
      </div>
    </div>
  );
}
