import { useEffect, useRef } from "react";

/** Pure-CSS warm ember field — drifting gold dots + amber sparks. No deps. */
export function EmberField({ density = 50 }: { density?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = isMobile ? Math.min(20, density) : density;

    el.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const isEmber = Math.random() < 0.25;
      const dot = document.createElement("span");
      const size = isEmber ? 2 + Math.random() * 1.5 : 1 + Math.random() * 0.8;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = 18 + Math.random() * 22;
      const delay = -Math.random() * dur;
      const driftX = (Math.random() - 0.5) * 60;
      const driftY = -30 - Math.random() * 60;

      dot.style.cssText = `
        position:absolute;
        left:${x}%;
        top:${y}%;
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:${isEmber ? "#E8821A" : "#C9A84C"};
        opacity:${isEmber ? 0.3 : 0.55};
        box-shadow:${isEmber ? "0 0 6px rgba(232,130,26,0.5)" : "none"};
        --dx:${driftX}px;
        --dy:${driftY}px;
        animation:${reduced || isMobile ? "none" : `ember-drift ${dur}s linear ${delay}s infinite`};
        will-change:transform,opacity;
      `;
      el.appendChild(dot);
    }
  }, [density]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
