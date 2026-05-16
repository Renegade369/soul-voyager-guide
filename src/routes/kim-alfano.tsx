import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/kim-alfano")({
  component: () => <Navigate to="/higher-vibes" replace />,
});
