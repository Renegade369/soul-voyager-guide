import { useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

/** CSS-driven page entrance: fade + 12px upward slide on each route change. */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setKey(location.pathname);
  }, [location.pathname]);

  return (
    <div key={key} className="page-transition">
      {children}
    </div>
  );
}
