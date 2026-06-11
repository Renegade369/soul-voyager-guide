import { createServerFn } from "@tanstack/react-start";

type StripeEnv = "sandbox" | "live";

type CheckoutSessionResult =
  | { clientSecret: string }
  | { error: string };

type UnlockResult =
  | { paid: boolean; priceIds: string[] }
  | { error: string };

const PRICE_ID_RE = /^[a-zA-Z0-9_-]+$/;

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
    priceId: string;
    customerEmail?: string;
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    if (!PRICE_ID_RE.test(data.priceId)) throw new Error("Invalid priceId");
    if (!data.returnUrl?.startsWith("http")) throw new Error("Invalid returnUrl");
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Invalid environment");
    }
    return data;
  })
  .handler(async ({ data }): Promise<CheckoutSessionResult> => {
    const { createStripeClient, getStripeErrorMessage } = await import("@/lib/stripe.server");
    try {
      const stripe = createStripeClient(data.environment);

      const prices = await stripe.prices.list({ lookup_keys: [data.priceId], limit: 1 });
      if (!prices.data.length) throw new Error("Price not found");
      const stripePrice = prices.data[0];

      const productId = typeof stripePrice.product === "string"
        ? stripePrice.product
        : stripePrice.product.id;
      const product = await stripe.products.retrieve(productId);

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: stripePrice.id, quantity: 1 }],
        mode: "payment",
        ui_mode: "embedded",
        return_url: data.returnUrl,
        ...(data.customerEmail && { customer_email: data.customerEmail }),
        payment_intent_data: { description: product.name },
        metadata: {
          priceId: data.priceId,
          ...(data.customerEmail && { customerEmail: data.customerEmail }),
        },
      });

      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      console.error("createCheckoutSession error:", error);
      return { error: getStripeErrorMessage(error) };
    }
  });

export const getSessionUnlock = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!data.sessionId?.startsWith("cs_")) throw new Error("Invalid sessionId");
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Invalid environment");
    }
    return data;
  })
  .handler(async ({ data }): Promise<UnlockResult> => {
    const { createStripeClient, getStripeErrorMessage } = await import("@/lib/stripe.server");
    try {
      const stripe = createStripeClient(data.environment);
      const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
        expand: ["line_items.data.price"],
      });

      const paid = session.payment_status === "paid";
      const priceIds: string[] = [];
      const lineItems = (session.line_items?.data ?? []) as Array<{
        price?: { lookup_key?: string | null; id?: string } | null;
      }>;
      for (const li of lineItems) {
        const lk = li.price?.lookup_key ?? null;
        if (lk) priceIds.push(lk);
      }
      // Fallback: priceId stamped in session metadata at create time
      if (priceIds.length === 0 && session.metadata?.priceId) {
        priceIds.push(session.metadata.priceId);
      }

      return { paid, priceIds };
    } catch (error) {
      console.error("getSessionUnlock error:", error);
      return { error: getStripeErrorMessage(error) };
    }
  });
