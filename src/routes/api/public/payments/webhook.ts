import { createFileRoute } from "@tanstack/react-router";

type StripeEnv = "sandbox" | "live";

async function handleEvent(event: { type: string; data: { object: any } }, env: StripeEnv) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const sessionId = session?.id;
      const email = session?.customer_details?.email ?? session?.customer_email ?? null;
      const priceId = session?.metadata?.priceId ?? null;
      console.log("[payments] checkout.session.completed", {
        env,
        sessionId,
        email,
        priceId,
      });
      // Unlock state is granted client-side on the /checkout/return page
      // via getSessionUnlock(), which is authoritative (re-fetches the
      // session from Stripe). This webhook is logged for auditability.
      break;
    }
    case "checkout.session.async_payment_succeeded":
    case "payment_intent.succeeded":
      console.log("[payments]", event.type, env);
      break;
    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed":
      console.warn("[payments] payment failed", event.type, env);
      break;
    default:
      console.log("[payments] unhandled event", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("[payments] webhook invalid env:", rawEnv);
          return Response.json({ received: true, ignored: "invalid env" });
        }
        const env: StripeEnv = rawEnv;
        try {
          const { verifyWebhook } = await import("@/lib/stripe.server");
          const event = await verifyWebhook(request, env);
          await handleEvent(event, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error("[payments] webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
