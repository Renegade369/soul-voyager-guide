import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pillars")({
  beforeLoad: () => {
    throw redirect({ to: "/the-sacred-journey" });
  },
});
