import type { ReactNode } from "react";
import { FlowerOfLife } from "./SacredGeometry";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div>
      <section
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "#1C1B3A" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FlowerOfLife size={520} color="#D4AF64" opacity={0.11} strokeWidth={0.5} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
          {eyebrow && (
            <p className="text-[11px] font-light uppercase tracking-[0.28em]" style={{ color: "#D4AF64" }}>{eyebrow}</p>
          )}
          <h1 className="mt-8 font-serif text-5xl font-light leading-[1.05] md:text-6xl" style={{ color: "#F8F5F0" }}>{title}</h1>
          {intro && (
            <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed md:text-lg" style={{ color: "rgba(248,245,240,0.72)" }}>{intro}</p>
          )}
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">{children}</div>
    </div>
  );
}

export function makeRouteMeta(meta: { title: string; description: string }) {
  return {
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
    ],
  };
}
