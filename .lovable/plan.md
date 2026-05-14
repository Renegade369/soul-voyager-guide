## Scope (one prompt, no Stripe wiring)

### 1. Database (one migration)
- `promo_codes`: `code` (unique), `unlocks` (text[] — reader slugs or `["all"]`), `max_uses` (int, nullable), `uses_count` (int default 0), `expires_at` (timestamptz, nullable), `is_active` (bool default true), `created_by` (uuid), timestamps.
- `promo_code_redemptions`: `code_id`, `code` (denormalized), `email` (nullable), `reader_slug`, `redeemed_at`.
- RLS: `promo_codes` admin-only via `has_role(auth.uid(),'admin')`. Redemptions: insert allowed to anon (server-validated), select admin-only.
- RPC `redeem_promo_code(_code text, _reader text)` — SECURITY DEFINER, validates active/expiry/uses, increments `uses_count`, inserts redemption row, returns `{ ok, unlocks }`.

### 2. Standalone routes (build these)
- `/soul-quiz` — FREE, no paywall. Each question gets a "None of the above" option. AI prompt updated to treat NotA as authentic neutral data, not missing.
- `/blood-type` — name + email + blood type + Rh form → free 2-3 sentence teaser → paywall → full reading. New edge function `blood-type-generate` (uses Lovable AI Gateway / Gemini 2.5 Pro, structured output).
- `/birth-chart` — birth date/time/place form → teaser → paywall → full reading. New edge function `birth-chart-generate`.
- `/aura-reader` — REWRITE: 3 layers (Emotional Core, Social Presence, Spiritual Depth) + Chakra Alignment (7 chakras with status + practice) + extended palette (metallics, crystalline). Teaser → paywall → full. Edge function `aura-reader-generate` rewritten.
- `/numerology` and `/astrology` — keep existing flow, insert teaser + paywall before full reveal.

### 3. Paywall (UI only, no Stripe)
- Reusable `<PaywallModal>` component: emotional copy block (per-reader), $9.99 button (disabled, "Payments coming soon"), $29.99 bundle button (disabled), promo code input + Apply.
- Promo flow: client calls `redeem_promo_code` RPC → on `{ok:true}` set `localStorage.soul_true_unlocked.<slug>=true` and reveal the full reading. Bundle code unlocks Aura+Blood Type+Birth Chart+Numerology (Astrology stays standalone per spec).
- Persist unlocks in `localStorage` so a refresh doesn't re-paywall.

### 4. /admin (gated by user_roles 'admin')
- Server fn `requireAdmin` middleware (checks `has_role` via authed Supabase client).
- UI: create code form (code, unlocks multi-select or "all", max_uses, expires_at) → list table → deactivate toggle → redemption log.
- If signed-in user lacks admin role: show "You don't have admin access" (no password prompt — admin role only, per your call).

### 5. Kim Alfano branding
- Reusable `<KimAlfanoCard>` component with the locked copy + mailto.
- Insert at the bottom of every full reader result (Soul Quiz, Aura, Blood Type, Birth Chart, Numerology, Astrology).
- Grep for "coaching" / "book a session" / "schedule a call" / "talk to someone" / standalone email — replace inline mentions.

### 6. Readings hub (`/readings`)
- Bundle banner above the grid: "Unlock Everything — $29.99" with note that Astrology is sold separately, button disabled until Stripe wired.
- 6 cards: Soul Quiz (green "Free" badge), Aura, Blood Type, Birth Chart, Numerology, Astrology (each with "$9.99" gold badge).
- Routes wired to new standalone pages.

### 7. Removals
- Delete `src/components/guide/EnergyReaderTab.tsx` iris/fingerprint UI references; remove iris/fingerprint from any nav. (Leave the guide tabs themselves alone — they're not part of this prompt's scope, but the new standalone pages are now the primary surface.)

### Out of scope (explicit)
- No Stripe wiring (your call).
- No edits to Wisdom pages, Meditations, Journey, homepage hero.
- Existing /guide tabs stay live as-is; new standalone routes are now canonical and linked from /readings.

### Compliance
- All copy uses "frequency / energetic / vibrational / soul work" — never "healing / treatment / cure / therapy".

---

This is ~12-15 file changes + 1 migration + 2 new edge functions + 1 rewritten edge function. I'll batch the migration first (needs your approval), then ship the rest in one pass. OK to proceed?