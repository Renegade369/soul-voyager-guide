import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pathless layout wrapper for /sovereign/* routes. Children (sales page at /,
// /welcome, /terms, /vip-waitlist, /portal/*) render inside the <Outlet />.
export const Route = createFileRoute("/sovereign")({
  component: () => <Outlet />,
});
