import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

type StripeEnv = "sandbox" | "live";

// Map of Stripe price lookup_keys → Sovereignty Code tier
const SOVEREIGN_PRICE_TO_TIER: Record<string, "digital" | "complete"> = {
  sovereign_digital_onetime: "digital",
  sovereign_complete_onetime: "complete",
};

let _admin: ReturnType<typeof createClient> | null = null;
function getAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _admin;
}

async function recordSovereignEnrollment(session: any, env: StripeEnv) {
  try {
    const priceId = session?.metadata?.priceId ?? null;
    const tier = priceId ? SOVEREIGN_PRICE_TO_TIER[priceId] : undefined;
    if (!tier) return; // not a Sovereignty Code purchase
    const email = session?.customer_details?.email ?? session?.customer_email ?? null;
    if (!email) {
      console.warn("[sovereign] no email on session", session?.id);
      return;
    }
    const { error } = await getAdmin().from("sovereign_enrollments").upsert(
      {
        email,
        tier,
        stripe_session_id: session.id,
        stripe_customer_id: session.customer ?? null,
        amount_cents: session.amount_total ?? null,
        currency: session.currency ?? "usd",
        environment: env,
        status: "active",
      },
      { onConflict: "stripe_session_id" }
    );
    if (error) console.error("[sovereign] enrollment insert error", error);
    else console.log("[sovereign] enrollment recorded", { email, tier, env });
  } catch (e) {
    console.error("[sovereign] recordSovereignEnrollment error", e);
  }
}

async function handleEvent(event: { type: string; data: { object: any } }, env: StripeEnv) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[payments] checkout.session.completed", {
        env,
        sessionId: session?.id,
        email: session?.customer_details?.email ?? session?.customer_email ?? null,
        priceId: session?.metadata?.priceId ?? null,
      });
      await recordSovereignEnrollment(session, env);
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
