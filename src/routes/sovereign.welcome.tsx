import { useEffect, useState } from "react";
import { BrandLoader } from "@/components/BrandLoader";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { getSessionUnlock } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { TIME_MACHINE_ANCHOR } from "@/lib/time-machine-frames";

const C = { bg: "#0A0A0A", gold: "#C9A84C", glow: "#E8821A", text: "#F5F0E8", muted: "rgba(245,240,232,0.7)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

const PRICE_TO_TIER: Record<string, "Digital" | "Complete"> = {
  sovereign_digital_onetime: "Digital",
  sovereign_complete_onetime: "Complete",
};

export const Route = createFileRoute("/sovereign/welcome")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: SovereignWelcome,
});

function SovereignWelcome() {
  const { session_id: sessionId } = Route.useSearch();
  const [state, setState] = useState<"loading" | "paid" | "unpaid" | "error">("loading");
  const [tier, setTier] = useState<string>("");
  const [err, setErr] = useState("");
  // 4a — Time-Machine anchor moment shown once before the standard welcome content.
  const [anchorDismissed, setAnchorDismissed] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      setErr("Missing session id.");
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
          setErr(r.error);
          return;
        }
        if (!r.paid) {
          setState("unpaid");
          return;
        }
        const found = r.priceIds.map((p) => PRICE_TO_TIER[p]).filter(Boolean)[0];
        setTier(found ?? "");
        setState("paid");
      } catch (e) {
        if (cancelled) return;
        setState("error");
        setErr(e instanceof Error ? e.message : "Unknown error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "80vh" }}>
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        {state === "loading" && (
          <>
            <BrandLoader size={64} />
            <p className="mt-6 text-sm uppercase tracking-[0.3em]" style={{ color: C.muted }}>
              Confirming your enrollment…
            </p>
          </>
        )}

        {state === "paid" && !anchorDismissed && (
          <div
            className="mx-auto"
            style={{
              maxWidth: "640px",
              padding: "32px 24px",
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              The Door
            </p>
            <p
              className="mt-8 text-2xl md:text-3xl font-light italic leading-relaxed"
              style={{
                fontFamily: fonts.display,
                color: C.text,
                textShadow: `0 0 24px ${C.glow}55`,
              }}
            >
              {TIME_MACHINE_ANCHOR}
            </p>
            <button
              onClick={() => setAnchorDismissed(true)}
              className="mt-12 px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:shadow-[0_0_18px_rgba(232,130,26,0.5)]"
              style={{ background: C.gold, color: C.bg }}
            >
              Begin the Work
            </button>
          </div>
        )}

        {state === "paid" && anchorDismissed && (
          <>
            <CheckCircle2 className="mx-auto" size={52} color={C.gold} />
            <p className="mt-6 text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Welcome, Initiate
            </p>
            <h1 className="mt-4 text-5xl font-light italic" style={{ fontFamily: fonts.display }}>
              The work <span style={{ color: C.gold }}>begins.</span>
            </h1>
            {tier && (
              <p className="mt-4 text-base" style={{ color: C.muted }}>
                You're enrolled in <strong style={{ color: C.text }}>The Sovereignty Code — {tier}</strong>.
              </p>
            )}
            <p className="mx-auto mt-8 max-w-lg text-sm font-light leading-relaxed" style={{ color: C.muted }}>
              A confirmation email is on its way. Your program portal and Module One will be available
              within the next few minutes. Check your inbox (and your spam folder, just in case).
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/sovereign/portal"
                className="inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: C.gold, color: C.bg }}
              >
                Enter Your Portal
              </Link>
              <Link
                to="/sign-in"
                className="inline-block border px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                Sign In With Email
              </Link>
            </div>
            <p className="mt-6 text-xs" style={{ color: C.muted }}>
              Sign in with the same email you used at checkout to access the portal.
            </p>
          </>
        )}

        {state === "unpaid" && (
          <>
            <AlertCircle className="mx-auto" size={48} color="#E8504C" />
            <h1 className="mt-6 text-3xl font-light italic" style={{ fontFamily: fonts.display }}>
              Payment not completed.
            </h1>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>
              Your enrollment didn't go through. Please try again.
            </p>
            <Link
              to="/sovereign"
              className="mt-8 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Back to Sovereignty Code
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <AlertCircle className="mx-auto" size={48} color="#E8504C" />
            <h1 className="mt-6 text-3xl font-light italic" style={{ fontFamily: fonts.display }}>
              Something went wrong.
            </h1>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>
              {err}
            </p>
            <Link
              to="/sovereign"
              className="mt-8 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Back to Sovereignty Code
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
