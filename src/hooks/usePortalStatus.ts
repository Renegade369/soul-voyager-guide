import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { getEnrollmentByEmail } from "@/lib/payments.functions";


export type PortalStatus =
  | { state: "loading" }
  | { state: "signed-out" }
  | { state: "not-enrolled"; email: string }
  | { state: "needs-onboarding"; email: string; tier: "digital" | "complete"; userId: string }
  | { state: "ready"; email: string; tier: "digital" | "complete"; userId: string };

/**
 * Resolves the current user's status inside the Sovereignty Code portal.
 * - signed-out → must sign in
 * - not-enrolled → must purchase
 * - needs-onboarding → must complete onboarding
 * - ready → portal accessible
 */
export function usePortalStatus(): PortalStatus {
  const [status, setStatus] = useState<PortalStatus>({ state: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user || !user.email) {
        if (!cancelled) setStatus({ state: "signed-out" });
        return;
      }
      const email = user.email;

      const result = await getEnrollmentByEmail({ data: { email } });
      const enrollment = "enrollment" in result ? result.enrollment : null;

      if (!enrollment) {
        if (!cancelled) setStatus({ state: "not-enrolled", email });
        return;
      }

      const tier = enrollment.tier;


      const { data: onboarding } = await supabase
        .from("sovereign_onboarding")
        .select("completed_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!onboarding?.completed_at) {
        if (!cancelled)
          setStatus({ state: "needs-onboarding", email, tier, userId: user.id });
        return;
      }

      if (!cancelled)
        setStatus({ state: "ready", email, tier, userId: user.id });
    }

    load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") load();
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return status;
}

/** Convenience: redirect the user to the right portal step based on status. */
export function usePortalGuard(status: PortalStatus, requireReady = false) {
  const navigate = useNavigate();
  useEffect(() => {
    if (status.state === "signed-out") {
      navigate({ to: "/sign-in" });
    } else if (status.state === "not-enrolled") {
      navigate({ to: "/sovereign" });
    } else if (requireReady && status.state === "needs-onboarding") {
      navigate({ to: "/sovereign/portal/onboarding" });
    }
  }, [status.state, requireReady, navigate]);
}
