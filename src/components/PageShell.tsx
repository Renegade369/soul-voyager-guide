import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
          )}
          <h1 className="mt-5 font-serif text-5xl text-foreground md:text-6xl">{title}</h1>
          {intro && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
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
