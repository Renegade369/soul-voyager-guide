import { createFileRoute } from "@tanstack/react-router";
import MeditationsContent from "@/components/MeditationsContent";

export const Route = createFileRoute("/meditations")({
  head: () => ({
    meta: [
      { title: "Sacred Meditations — Soul True" },
      { name: "description", content: "Guided meditations for deep transformation, heart coherence, and soul alignment. For educational and inspirational purposes." },
      { property: "og:title", content: "Sacred Meditations — Soul True" },
      { property: "og:description", content: "Guided meditations for deep transformation, heart coherence, and soul alignment." },
    ],
  }),
  component: MeditationsPage,
});

function MeditationsPage() {
  return <MeditationsContent />;
}
