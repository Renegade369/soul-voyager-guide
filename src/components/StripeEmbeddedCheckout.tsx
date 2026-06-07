import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createCheckoutSession } from "@/lib/payments.functions";

interface Props {
  priceId: string;
  customerEmail?: string;
  returnUrl?: string;
}

export function StripeEmbeddedCheckout({ priceId, customerEmail, returnUrl }: Props) {
  const fetchClientSecret = async (): Promise<string> => {
    const finalReturn = returnUrl
      || `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;
    const result = await createCheckoutSession({
      data: {
        priceId,
        customerEmail,
        returnUrl: finalReturn,
        environment: getStripeEnvironment(),
      },
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Payments did not return a client secret");
    return result.clientSecret;
  };

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
