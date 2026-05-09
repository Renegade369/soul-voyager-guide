import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - JSX component without type declarations
import TrueHumanTimeline from "../components/TrueHumanTimeline";

export const Route = createFileRoute("/true-timeline")({
  head: () => ({
    meta: [
      { title: "True Timeline — Soul True" },
      { name: "description", content: "An exploration of humanity's hidden timeline — for educational and inspirational purposes." },
      { property: "og:title", content: "True Timeline — Soul True" },
      { property: "og:description", content: "An exploration of humanity's hidden timeline — for educational and inspirational purposes." },
    ],
  }),
  component: TrueHumanTimeline,
});
