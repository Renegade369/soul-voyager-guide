## Diagnosis

The connector gateway fully supports Stripe API version `2026-03-25.dahlia` and accepts `ui_mode: embedded_page` — verified with direct gateway calls and a byte-identical reproduction of the project's `createStripeClient` code, both returning HTTP 200 with a valid `client_secret`.

The repo code is correct (`apiVersion: "2026-03-25.dahlia"` is in `src/lib/stripe.server.ts`). The failure persists because the deployed worker serving the preview's server functions is still running a stale bundle compiled before that fix. Dev-server restarts don't redeploy it.

## Steps

1. **Force a worker redeploy** — make a trivial, behavior-neutral change (e.g. a comment) in `src/lib/stripe.server.ts` so a fresh build is produced and deployed with the corrected `apiVersion`.
2. **Verify server-side** — call `createCheckoutSession` against the fresh deployment and confirm it returns a `clientSecret` instead of the ui_mode error; confirm via server-function logs.
3. **You verify in the preview** — click Buy on /sovereign and confirm the embedded checkout renders.

## Technical notes

- No changes to `webhook.ts`, edge functions, `ui_mode`, or the stripe package version.
- The gateway's default (when no version header is sent) is `2026-05-27.dahlia` — newer than required, so no gateway-side fix is needed.