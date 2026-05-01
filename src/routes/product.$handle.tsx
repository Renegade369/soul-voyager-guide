import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { PageShell, makeRouteMeta } from "../components/PageShell";
import {
  STOREFRONT_PRODUCT_BY_HANDLE_QUERY,
  ShopifyProduct,
  formatPrice,
  storefrontApiRequest,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

type ProductNode = ShopifyProduct["node"];
type LoaderData = { product: ProductNode };

export const Route = createFileRoute("/product/$handle")({
  head: ({ loaderData }: { loaderData?: LoaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.title} — Sacred Journey Shop` : "Product — Sacred Journey Shop";
    const desc = p?.description?.slice(0, 160) || "Sacred Journey shop item.";
    const img = p?.images?.edges?.[0]?.node?.url;
    const meta = makeRouteMeta({ title, description: desc });
    if (img) {
      meta.meta.push(
        { property: "og:image", content: img },
        { name: "twitter:image", content: img }
      );
    }
    return meta;
  },
  loader: async ({ params }): Promise<LoaderData> => {
    const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, {
      handle: params.handle,
    });
    const product = data?.data?.product as ProductNode | null | undefined;
    if (!product) throw notFound();
    return { product };
  },
  errorComponent: () => (
    <PageShell title="We couldn't load this item" intro="Please try again in a moment.">
      <div className="text-center">
        <Link to="/shop" className="text-primary underline">Back to Shop</Link>
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell title="Item not found" intro="This offering is no longer in the shop.">
      <div className="text-center">
        <Link to="/shop" className="text-primary underline">Back to Shop</Link>
      </div>
    </PageShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as LoaderData;
  const variants = product.variants.edges.map((e) => e.node);
  const [variantId, setVariantId] = useState<string>(variants[0]?.id ?? "");
  const selected = useMemo(
    () => variants.find((v) => v.id === variantId) ?? variants[0],
    [variantId, variants]
  );
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const productWrapper: ShopifyProduct = { node: product };
  const img = product.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!selected) return;
    if (!selected.availableForSale) {
      toast.error("This variant is sold out.");
      return;
    }
    await addItem({
      product: productWrapper,
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity,
      selectedOptions: selected.selectedOptions || [],
    });
    toast.success("Added to your cart", {
      description: `${product.title}${selected.title !== "Default Title" ? ` · ${selected.title}` : ""}`,
    });
  };

  return (
    <div>
      <section className="border-b border-border/60 bg-[image:var(--gradient-sanctuary)]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Link to="/shop" className="text-xs uppercase tracking-[0.3em] text-primary">
            ← Back to Shop
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          {img ? (
            <img
              src={img.url}
              alt={img.altText ?? product.title}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-4xl text-foreground">{product.title}</h1>
          <p className="mt-3 text-2xl font-medium text-foreground">
            {selected && formatPrice(selected.price.amount, selected.price.currencyCode)}
          </p>

          {product.description && (
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {variants.length > 1 && (
            <div className="mt-8">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Variant
              </label>
              <select
                value={variantId}
                onChange={(e) => setVariantId(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {variants.map((v) => (
                  <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                    {v.title} {!v.availableForSale && "— sold out"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6">
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={isLoading || !selected?.availableForSale}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : selected?.availableForSale ? (
              "Add to Cart"
            ) : (
              "Sold Out"
            )}
          </button>

          <p className="mt-4 text-xs text-muted-foreground">
            Shipping & taxes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
