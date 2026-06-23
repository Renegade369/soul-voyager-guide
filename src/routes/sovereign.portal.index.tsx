import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { BrandLoader } from "@/components/BrandLoader";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { usePortalStatus } from "@/hooks/usePortalStatus";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", muted: "rgba(245,240,232,0.7)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/portal/")({
  head: () => ({ meta: [{ title: "Sovereign Portal — Soul True" }] }),
  component: PortalEntry,
});

function PortalEntry() {
  const status = usePortalStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (status.state === "ready") {
      navigate({ to: "/sovereign/dashboard", replace: true });
    } else if (status.state === "needs-onboarding") {
      navigate({ to: "/sovereign/portal/onboarding", replace: true });
    }
  }, [status.state, navigate]);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "85vh" }}>
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        {status.state === "loading" && (
          <>
            <BrandLoader size={64} />
            <p className="mt-6 text-sm uppercase tracking-[0.3em]" style={{ color: C.muted }}>
              Entering the portal…
            </p>
          </>
        )}

        {status.state === "signed-out" && (
          <>
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Sovereign Portal
            </p>
            <h1 className="mt-4 text-4xl font-light italic" style={{ fontFamily: fonts.display }}>
              Sign in to enter.
            </h1>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>
              Use the email address you enrolled with.
            </p>
            <Link
              to="/sign-in"
              className="mt-10 inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: C.gold, color: C.bg }}
            >
              Sign In
            </Link>
          </>
        )}

        {status.state === "not-enrolled" && (
          <>
            <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
              Sovereign Portal
            </p>
            <h1 className="mt-4 text-4xl font-light italic" style={{ fontFamily: fonts.display }}>
              No enrollment found.
            </h1>
            <p className="mt-4 text-sm" style={{ color: C.muted }}>
              We can't find an active enrollment for{" "}
              <strong style={{ color: C.text }}>{status.email}</strong>. If you've already
              purchased, make sure you're signed in with the same email used at checkout.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/sovereign"
                className="inline-block px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ background: C.gold, color: C.bg }}
              >
                View Program
              </Link>
              <a
                href="mailto:hello@soul-true.com"
                className="inline-block border px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: C.gold, color: C.gold }}
              >
                Contact Support
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
