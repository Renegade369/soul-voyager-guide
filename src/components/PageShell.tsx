import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div>
      <section className="border-b border-border/60 bg-[image:var(--gradient-sanctuary)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>}
          <h1 className="mt-3 font-serif text-5xl text-foreground md:text-6xl">{title}</h1>
          {intro && <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 py-16">{children}</div>
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
