import { useEffect, useRef, useState } from "react";

/** Candlelight cursor glow — desktop pointer devices only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(232,130,26,0.12) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
        opacity: 0,
        zIndex: 9999,
        left: 0,
        top: 0,
        mixBlendMode: "screen",
      }}
    />
  );
}
