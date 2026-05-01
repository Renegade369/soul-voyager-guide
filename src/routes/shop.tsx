import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, makeRouteMeta } from "../components/PageShell";
import {
  STOREFRONT_PRODUCTS_QUERY,
  ShopifyProduct,
  formatPrice,
  storefrontApiRequest,
} from "@/lib/shopify";

export const Route = createFileRoute("/shop")({
  head: () =>
    makeRouteMeta({
      title: "Sacred Journey Shop — Apparel, Spiritual & Healing Goods",
      description:
        "Sacred Journey branded shirts, hats, sweatshirts and mugs alongside spiritual, cleansing, and healing items — every purchase supports the sanctuary.",
    }),
  component: ShopPage,
});

function ShopPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
        if (!active) return;
        const edges: ShopifyProduct[] = data?.data?.products?.edges ?? [];
        setProducts(edges);
      } catch (e) {
        console.error(e);
        if (active) setError("We couldn't load the shop right now. Please try again shortly.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <PageShell
      eyebrow="Sacred Goods"
      title="The Shop"
      intro="Branded Sacred Journey apparel, sacred objects, cleansing tools, and healing companions — every item is chosen or made with intention. Proceeds support the sanctuary."
    >
      {loading && <p className="text-center text-sm text-muted-foreground">Gathering offerings…</p>}
      {error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center">
          <p className="font-serif text-xl text-foreground">No products yet</p>
          <p className="mt-3 text-sm text-muted-foreground">
            The shop is being prepared. Tell William what you'd like to see — Sacred Journey shirts,
            hats, sweatshirts, mugs, sage bundles, crystals, oils, books — and he'll add them.
          </p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const img = product.node.images?.edges?.[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.node.handle }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        {img ? (
          <img
            src={img.url}
            alt={img.altText ?? product.node.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg text-foreground">{product.node.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.node.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-medium text-foreground">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">View →</span>
        </div>
      </div>
    </Link>
  );
}
