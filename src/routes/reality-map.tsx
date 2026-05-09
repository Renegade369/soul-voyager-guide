import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX component without type declarations
import RealityMap from "../components/RealityMap";

export const Route = createFileRoute("/reality-map")({
  head: () => ({
    meta: [
      { title: "Reality Map — Soul True" },
      { name: "description", content: "An interactive map of the convergence: suppressed history, hidden power, quantum reality, and human potential." },
      { property: "og:title", content: "Reality Map — Soul True" },
      { property: "og:description", content: "An interactive map of the convergence: suppressed history, hidden power, quantum reality, and human potential." },
    ],
  }),
  component: RealityMap,
});
