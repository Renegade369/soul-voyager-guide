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
      {loading && (
        <p className="text-center text-sm font-light italic text-muted-foreground">Gathering offerings…</p>
      )}
      {error && (
        <div className="mx-auto max-w-xl border-y border-border py-8 text-center text-sm font-light text-foreground">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="mx-auto max-w-xl border-y border-border py-16 text-center">
          <p className="font-serif text-3xl font-light italic text-foreground">No products yet.</p>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            The shop is being prepared. Tell William what you'd like to see — Sacred Journey shirts, hats, sweatshirts, mugs, sage bundles, crystals, oils, books — and he'll add them.
          </p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
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
      className="group flex flex-col"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        {img ? (
          <img
            src={img.url}
            alt={img.altText ?? product.node.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-light italic text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl font-normal text-foreground">{product.node.title}</h3>
        <span className="text-sm font-light text-foreground">
          {formatPrice(price.amount, price.currencyCode)}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-muted-foreground">
        {product.node.description}
      </p>
      <span className="mt-4 text-[11px] font-normal uppercase tracking-[0.22em] text-foreground/60 group-hover:text-foreground">
        View →
      </span>
    </Link>
  );
}
