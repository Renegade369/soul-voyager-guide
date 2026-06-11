// Server-only Stripe client routed through the Lovable connector gateway.
// Redeploy marker: pin apiVersion 2026-03-25.dahlia (rev 2026-06-11).
// NEVER import this from client-reachable code at module scope.
import Stripe from "stripe";

export type StripeEnv = "sandbox" | "live";

const GATEWAY_HOST = "connector-gateway.lovable.dev";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not configured`);
  return v;
}

function gatewayFetch(stripeKey: string, lovableKey: string): typeof fetch {
  return (async (input: any, init?: any) => {
    const url = typeof input === "string" ? input : input.url;
    const u = new URL(url);
    // Stripe SDK sends to <host>/v1/...; gateway expects /stripe/v1/...
    if (!u.pathname.startsWith("/stripe/")) {
      u.pathname = "/stripe" + u.pathname;
    }
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${lovableKey}`);
    headers.set("X-Connection-Api-Key", stripeKey);
    return fetch(u.toString(), { ...init, headers });
  }) as typeof fetch;
}

export function createStripeClient(env: StripeEnv): Stripe {
  const stripeKey = env === "sandbox"
    ? getEnv("STRIPE_SANDBOX_API_KEY")
    : getEnv("STRIPE_LIVE_API_KEY");
  const lovableKey = getEnv("LOVABLE_API_KEY");

  return new Stripe("sk_gateway_placeholder", {
    host: GATEWAY_HOST,
    protocol: "https",
    port: 443,
    httpClient: Stripe.createFetchHttpClient(gatewayFetch(stripeKey, lovableKey)),
    // Pin a recent API version
    apiVersion: "2026-03-25.dahlia" as any,
  });
}

export function getStripeErrorMessage(error: unknown): string {
  if (error instanceof Stripe.errors.StripeError) {
    return error.message || "Payment provider error";
  }
  if (error instanceof Error) return error.message;
  return "Unknown payment error";
}

export async function verifyWebhook(
  req: Request,
  env: StripeEnv,
): Promise<{ type: string; data: { object: any } }> {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const secret = env === "sandbox"
    ? getEnv("PAYMENTS_SANDBOX_WEBHOOK_SECRET")
    : getEnv("PAYMENTS_LIVE_WEBHOOK_SECRET");

  if (!signature || !body) throw new Error("Missing signature or body");

  let timestamp: string | undefined;
  const v1Signatures: string[] = [];
  for (const part of signature.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k === "t") timestamp = v;
    if (k === "v1") v1Signatures.push(v);
  }
  if (!timestamp || v1Signatures.length === 0) {
    throw new Error("Invalid signature format");
  }
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) throw new Error("Webhook timestamp too old");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${body}`),
  );
  const expected = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (!v1Signatures.includes(expected)) {
    throw new Error("Invalid webhook signature");
  }
  return JSON.parse(body);
}
