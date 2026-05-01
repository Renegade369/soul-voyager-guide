import { useEffect, useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + parseFloat(i.price.amount) * i.quantity,
    0
  );
  const currency = items[0]?.price.currencyCode ?? "USD";

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted"
      >
        <ShoppingCart size={18} />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-background shadow-xl">
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <h2 className="font-serif text-xl text-foreground">Sacred Cart</h2>
                <p className="text-xs text-muted-foreground">
                  {totalItems === 0
                    ? "Your cart is empty"
                    : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted"
              >
                Close
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingCart className="mb-4 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Nothing here yet.</p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const img = item.product.node.images?.edges?.[0]?.node;
                    return (
                      <li key={item.variantId} className="flex gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          {img && (
                            <img
                              src={img.url}
                              alt={img.altText ?? item.product.node.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <p className="font-serif text-sm text-foreground">
                            {item.product.node.title}
                          </p>
                          {item.selectedOptions.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {item.selectedOptions.map((o) => o.value).join(" · ")}
                            </p>
                          )}
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {formatPrice(item.price.amount, item.price.currencyCode)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded border border-border hover:bg-muted"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded border border-border hover:bg-muted"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="ml-auto text-muted-foreground hover:text-destructive"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-border bg-background px-6 py-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-lg text-foreground">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Shipping & taxes calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <ExternalLink size={14} /> Secure Checkout
                    </>
                  )}
                </button>
              </footer>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
