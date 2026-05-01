import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/** Fade + slide up when scrolled into view. SSR-safe (renders content immediately on server). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // On server / pre-hydration: render plain content (no opacity:0) to avoid SEO/SSR blank flashes.
  const style: CSSProperties | undefined =
    mounted && delay ? { animationDelay: `${delay}ms` } : undefined;
  const cls = mounted
    ? `reveal ${visible ? "is-visible" : ""} ${className}`.trim()
    : className;

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref as never} className={cls} style={style}>
      {children}
    </Component>
  );
}
