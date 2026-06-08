import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { validateUnsubscribeToken, unsubscribeByToken } from "@/lib/subscribe.functions";
import { makeRouteMeta } from "@/components/PageShell";
import { z } from "zod";

export const Route = createFileRoute("/unsubscribe")({
  head: () =>
    makeRouteMeta({
      title: "Unsubscribe — Soul True Journal",
      description: "Unsubscribe from the Soul True monthly Journal email.",
    }),
  validateSearch: (search: Record<string, unknown>) =>
    z.object({ token: z.string().optional() }).parse(search),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const validate = useServerFn(validateUnsubscribeToken);
  const unsub = useServerFn(unsubscribeByToken);

  const [state, setState] = useState<"loading" | "confirm" | "done" | "already" | "invalid" | "error">("loading");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    validate({ data: { token } })
      .then((res) => {
        if (!res.ok) {
          setState("invalid");
          return;
        }
        setEmail(res.email);
        setState(res.alreadyUnsubscribed ? "already" : "confirm");
      })
      .catch(() => setState("error"));
  }, [token]);

  async function handleConfirm() {
    if (!token) return;
    setState("loading");
    try {
      const res = await unsub({ data: { token } });
      if (!res.ok) {
        setState("invalid");
        return;
      }
      setEmail(res.email);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="min-h-[70vh] px-6 py-24" style={{ backgroundColor: "#0A0A0A", color: "#F5F0E8" }}>
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Soul True Journal</p>
        <h1 className="mt-6 font-serif text-4xl font-light leading-tight md:text-5xl">
          {state === "done" || state === "already" ? "You're unsubscribed." : "Unsubscribe"}
        </h1>

        <div className="mt-10 text-base font-light leading-relaxed" style={{ color: "rgba(245,240,232,0.78)" }}>
          {state === "loading" && <p>Working…</p>}
          {state === "invalid" && (
            <p>This unsubscribe link is invalid or has expired. You can manage your preferences by reaching us at <a href="mailto:William@Soul-True.com" style={{ color: "#C9A84C" }}>William@Soul-True.com</a>.</p>
          )}
          {state === "error" && <p>Something went wrong. Please try again in a moment.</p>}
          {state === "confirm" && (
            <>
              <p>Unsubscribe <strong style={{ color: "#F5F0E8" }}>{email}</strong> from the monthly Journal?</p>
              <button
                onClick={handleConfirm}
                className="mt-8 rounded-none px-8 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#0A0A0A", background: "linear-gradient(135deg,#C9A84C,#D4A017)" }}
              >
                Confirm Unsubscribe
              </button>
            </>
          )}
          {(state === "done" || state === "already") && (
            <>
              <p>
                {email && <>Your address <strong style={{ color: "#F5F0E8" }}>{email}</strong> has been removed. </>}
                You can resubscribe anytime at <Link to="/blog" style={{ color: "#C9A84C" }}>soul-true.com/blog</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
