import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div>
      <section
        className="border-b border-border"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.965 0.012 80) 0%, oklch(0.935 0.018 70) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
          {eyebrow && (
            <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/60">{eyebrow}</p>
          )}
          <h1 className="mt-8 font-serif text-5xl font-light leading-[1.05] text-foreground md:text-6xl">{title}</h1>
          {intro && (
            <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
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
