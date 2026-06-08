import { useEffect, useState } from "react";
import { BrandLoader } from "@/components/BrandLoader";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { getSessionUnlock } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { unlock, READER_TITLES, type ReaderSlug } from "@/lib/unlocks";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", muted: "rgba(245,240,232,0.7)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

// Map Stripe price lookup_keys → ReaderSlug or "all" (bundle).
const PRICE_TO_SLUG: Record<string, ReaderSlug | "all"> = {
  aura_onetime: "aura",
  blood_type_onetime: "blood-type",
  birth_chart_onetime: "birth-chart",
  numerology_onetime: "numerology",
  astrology_onetime: "astrology",
  gene_keys_onetime: "gene-keys",
  horoscope_onetime: "horoscope",
  bundle_onetime: "all",
};

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { session_id: sessionId } = Route.useSearch();
  const [state, setState] = useState<"loading" | "paid" | "unpaid" | "error">("loading");
  const [unlockedTitles, setUnlockedTitles] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      setErrorMsg("Missing session id.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const r = await getSessionUnlock({
          data: { sessionId, environment: getStripeEnvironment() },
        });
        if (cancelled) return;
        if ("error" in r) {
          setState("error");
          setErrorMsg(r.error);
          return;
        }
        if (!r.paid) {
          setState("unpaid");
          return;
        }
        const titles: string[] = [];
        for (const pid of r.priceIds) {
          const target = PRICE_TO_SLUG[pid];
          if (!target) continue;
          if (target === "all") {
            unlock("all");
            titles.push("All readers (bundle)");
          } else {
            unlock([target]);
            titles.push(READER_TITLES[target]);
          }
        }
        setUnlockedTitles(titles);
        setState("paid");
      } catch (e) {
        if (cancelled) return;
        setState("error");
        setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      }
    })();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "70vh" }}>
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        {state === "loading" && (
          <>
            <BrandLoader size={64} />
            <p className="mt-6 text-sm uppercase tracking-[0.3em]" style={{ color: C.muted }}>
              Confirming your payment…
            </p>
          </>
        )}

        {state === "paid" && (
          <>
            <CheckCircle2 className="mx-auto" size={48} color={C.gold} />
            <h1 className="mt-6 text-4xl font-light italic" style={{ fontFamily: fonts.display }}>
              Your reading is <span style={{ color: C.gold }}>unlocked.</span>
            </h1>
            <p className="mt-4 text-base" style={{ color: C.muted }}>
              {unlockedTitles.length > 0
                ? `Access granted: ${unlockedTitles.join(", ")}.`
                : "Access has been granted."}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/readings"
                className="inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: C.gold, color: C.bg }}
              >
                Open My Readings
              </Link>
              <Link
                to="/"
                className="inline-block border px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                Back to Home
              </Link>
            </div>
          </>
        )}

        {state === "unpaid" && (
          <>
            <AlertCircle className="mx-auto" size={48} color="#E8504C" />
            <h1 className="mt-6 text-3xl font-light italic" style={{ fontFamily: fonts.display }}>
              Payment not completed.
            </h1>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>
              Your payment did not go through. Please try again.
            </p>
            <Link
              to="/readings"
              className="mt-8 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Back to Readings
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <AlertCircle className="mx-auto" size={48} color="#E8504C" />
            <h1 className="mt-6 text-3xl font-light italic" style={{ fontFamily: fonts.display }}>
              Something went wrong.
            </h1>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>{errorMsg}</p>
            <Link
              to="/readings"
              className="mt-8 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Back to Readings
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
