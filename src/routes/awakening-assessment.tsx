import { createFileRoute } from "@tanstack/react-router";
import AwakeningAssessment from "../components/AwakeningAssessment";

export const Route = createFileRoute("/awakening-assessment")({
  head: () => ({
    meta: [
      { title: "Discover Your Level — Soul True" },
      { name: "description", content: "An interactive assessment to discover where you are on your awakening journey." },
      { property: "og:title", content: "Discover Your Level — Soul True" },
      { property: "og:description", content: "An interactive assessment to discover where you are on your awakening journey." },
    ],
  }),
  component: AwakeningAssessment,
});
