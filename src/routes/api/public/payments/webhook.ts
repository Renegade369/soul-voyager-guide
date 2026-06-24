import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

type StripeEnv = "sandbox" | "live";

// Map of Stripe price lookup_keys → Sovereignty Code tier
const SOVEREIGN_PRICE_TO_TIER: Record<string, "digital" | "complete"> = {
  sovereign_digital_onetime: "digital",
  sovereign_complete_onetime: "complete",
};

let _admin: any = null;
function getAdmin(): any {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _admin;
}

async function recordSovereignEnrollment(session: any, env: StripeEnv): Promise<string | null> {
  try {
    const priceId = session?.metadata?.priceId ?? null;
    const tier = priceId ? SOVEREIGN_PRICE_TO_TIER[priceId] : undefined;
    if (!tier) return null;
    const email = session?.customer_details?.email ?? session?.customer_email ?? null;
    if (!email) {
      console.warn("[sovereign] no email on session", session?.id);
      return null;
    }
    const { data, error } = await getAdmin().from("sovereign_enrollments").upsert(
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
    ).select("id").maybeSingle();
    if (error) {
      console.error("[sovereign] enrollment insert error", error);
      return null;
    }
    console.log("[sovereign] enrollment recorded", { email, tier, env });
    return data?.id ?? null;
  } catch (e) {
    console.error("[sovereign] recordSovereignEnrollment error", e);
    return null;
  }
}

async function enqueueEmailSequence(enrollmentId: string) {
  try {
    const res = await fetch(process.env.SUPABASE_URL + "/functions/v1/enqueue-email-sequence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      body: JSON.stringify({ enrollment_id: enrollmentId }),
    });
    if (!res.ok) console.error("[sovereign] enqueue-email-sequence failed", res.status, await res.text());
  } catch (e) {
    console.error("[sovereign] enqueueEmailSequence error", e);
  }
}

async function autoSubscribeFromStripe(session: any, source: string) {
  try {
    const email = session?.customer_details?.email ?? session?.customer_email ?? null;
    if (!email) return;
    const name = session?.customer_details?.name ?? null;
    await getAdmin()
      .from("subscribers")
      .upsert(
        { email: String(email).toLowerCase().trim(), first_name: name, source, is_active: true, unsubscribed_at: null },
        { onConflict: "email" }
      );
  } catch (e) {
    console.error("[subscribe] autoSubscribeFromStripe error", e);
  }
}

async function handleEvent(event: { type: string; data: { object: any } }, env: StripeEnv, request: Request) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[payments] checkout.session.completed", {
        env,
        sessionId: session?.id,
        email: session?.customer_details?.email ?? session?.customer_email ?? null,
        priceId: session?.metadata?.priceId ?? null,
      });
      const enrollmentId = await recordSovereignEnrollment(session, env);
      await autoSubscribeFromStripe(session, "stripe_checkout");
      try {
        const customerEmail = session.customer_details?.email ?? session.customer_email;
        const firstName = (session.customer_details?.name?.split(" ")[0]) ?? "friend";
        const tier = (session.metadata?.tier as "free" | "digital" | "complete") ?? "digital";
        const loginUrl = new URL(request.url).origin + "/sovereign/portal";
        await fetch(process.env.SUPABASE_URL + "/functions/v1/send-sovereign-welcome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
          },
          body: JSON.stringify({ email: customerEmail, firstName, tier, loginUrl }),
        });
      } catch (emailErr) {
        console.error("[sovereign-welcome] email send failed (non-fatal):", emailErr);
      }
      if (enrollmentId) await enqueueEmailSequence(enrollmentId);
      break;
    }
    case "customer.subscription.created": {
      await autoSubscribeFromStripe(event.data.object, "stripe_subscription");
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
          await handleEvent(event, env, request);
          return Response.json({ received: true });
        } catch (e) {
          console.error("[payments] webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
