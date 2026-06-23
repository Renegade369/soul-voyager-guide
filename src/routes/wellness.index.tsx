import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  fetchWellnessProducts,
  WELLNESS_CATEGORIES,
  categoryLabel,
  type WellnessProduct,
  type WellnessCategory,
} from "@/lib/directory";
import { makeRouteMeta } from "@/components/PageShell";

export const Route = createFileRoute("/wellness/")({
  head: () =>
    makeRouteMeta({
      title: "Wellness — The Tools William Uses · Soul True",
      description:
        "Curated supplements, tools, books, and accessories William personally uses for the work. Let's Go Deeper.",
    }),
  component: WellnessIndex,
});

function WellnessIndex() {
  const [items, setItems] = useState<WellnessProduct[]>([]);
  const [filter, setFilter] = useState<WellnessCategory | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWellnessProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => items.filter((i) => i.is_featured), [items]);
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>
      {/* Hero */}
      <section className="border-b px-6 py-24 text-center md:py-32" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
        <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Wellness</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl font-light leading-[1.05] md:text-6xl">
          The tools William uses for the work.
        </h1>
      </section>

      {/* Featured strip */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-16">
          <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Featured</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-wrap gap-2 border-b pb-4" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
          {WELLNESS_CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setFilter(c.value)}
              className="rounded-none px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition"
              style={{
                color: filter === c.value ? "#0A0A0A" : "rgba(245,240,232,0.7)",
                backgroundColor: filter === c.value ? "#C9A84C" : "transparent",
                border: "1px solid rgba(201,168,76,0.35)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {loading ? (
          <p className="py-20 text-center text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>Nothing here yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="border-t px-6 py-20 text-center" style={{ borderColor: "rgba(201,168,76,0.18)" }}>
        <p className="font-serif text-2xl italic" style={{ color: "#F5F0E8" }}>
          Begin the work.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/begin-here"
            className="rounded-none px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)" }}
          >
            Begin Your Journey
          </Link>
          <Link
            to="/sovereign"
            className="rounded-none border px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "#C9A84C", borderColor: "#C9A84C" }}
          >
            Soul True Membership
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: WellnessProduct }) {
  return (
    <Link
      to="/wellness/$slug"
      params={{ slug: product.slug }}
      className="group block transition"
      style={{
        backgroundColor: "#1A1209",
        border: "1px solid rgba(201,168,76,0.18)",
      }}
    >
      <div
        className="aspect-[4/3] w-full overflow-hidden"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-5xl italic" style={{ color: "rgba(201,168,76,0.3)" }}>
            ST
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>
          {categoryLabel(product.category)}
        </p>
        <h3 className="mt-2 font-serif text-xl font-light group-hover:text-[#E8C87A]" style={{ color: "#F5F0E8" }}>
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm font-light" style={{ color: "rgba(245,240,232,0.65)" }}>
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
}
