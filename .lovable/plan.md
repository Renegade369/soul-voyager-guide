# Soul True — Master Build Plan

This is a large scope. I'll break it into 3 phases so you can review/test between each rather than waiting on one giant drop. Confirm the phasing (or tell me to do it all in one go) and I'll start.

## Phase 1 — Pricing update (app-wide)

Source of truth lives in `src/lib/unlocks.ts` and Stripe products.

- Update constants: `READER_PRICES` stays `$9.36` per reader, `BUNDLE_3_PRICE = $26.39` (new), `ALL_ACCESS_PRICE = $96.39` (was $29.99), `MEMBERSHIP_MONTHLY = $36`.
- Stripe: create new prices (sandbox auto-syncs to live on publish):
  - `bundle_3_onetime` $26.39 (one-time)
  - `all_access_onetime` $96.39 (one-time) — replaces the old `bundle_onetime`
  - `membership_monthly` $36/mo (recurring subscription)
- Update `PaywallModal`, `readings.tsx`, and any pricing copy to show the new tiers.
- Keep `SOULTRUE` promo code working for all unlocks.
- Note: monthly membership requires the `subscriptions` table + webhook handling per the Stripe subscriptions pattern. I'll add `subscriptions` table, webhook handlers for `customer.subscription.*`, and a `useSubscription` hook that grants `unlock("all")` while active.

## Phase 2 — Three new readers

Each follows the existing Energy Reader two-layer pattern (GPT-4o raw → Claude synthesis → ElevenLabs TTS). I'll reuse the existing edge function shape (`aura-reader-generate` is the template) and add one edge function + one route per reader.

- **#8 Love Horoscope** (`/love-horoscope`)
  - Free: Daily Love Snapshot (sign or birth date → short daily read, cached per day)
  - Paid: Sacred Love Reading with optional partner fields, 6 output sections per spec
  - Cross-link: Birth Chart / Gene Keys
- **#9 Life Path** (`/life-path`)
  - Free: "Where You Are Now"
  - Paid: 6 output sections per spec
  - Cross-link: Numerology
- **#10 Passion & Purpose** (`/passion-purpose`)
  - Free: "Your Spark" (2 reflective prompts)
  - Paid: reflection-led intake, 6 output sections
  - Go Deeper leads with Kim Alfano accountability
- Add all 3 to the Readings dropdown nav and `/readings` grid.
- Add `ReaderSlug` entries: `love-horoscope`, `life-path`, `passion-purpose`. Add Stripe prices `love_horoscope_onetime`, `life_path_onetime`, `passion_purpose_onetime` at $9.36 each.
- Reuse `PaywallModal`, save-to-profile, ElevenLabs voice playback, and the Go Deeper resource block (extract into a shared `<GoDeeper />` component).

## Phase 3 — Sacred Breathing (inside Meditations)

- Convert `/meditations` route into tabbed layout: **Meditations | Sacred Breathing**.
- New `SacredBreathingLibrary` component:
  - 5 categories (Grounding & Calm, Energy & Activation, Release & Renewal, Sleep & Stillness, Sacred & Ceremonial)
  - Card grid: title, duration, guide, intensity tag, candlelit thumbnail, free/member badge
  - Data driven from a `src/data/sacredBreathing.ts` array (so adding videos = adding entries, no rebuild needed)
- New `BreathPlayer` component:
  - Full-screen candlelit player, Vimeo unlisted embed
  - Gold breath pacer orb (CSS animation, configurable inhale/exhale seconds)
  - Audio-only toggle, ambient soundscape layer
  - Save to favorites (Supabase `saved_breathwork` table), mark complete, log to profile
  - End screen → suggested meditation or transmission
- Safety disclaimer shown on landing screen + modal before first play.
- Free Foundations: 1 starter per category free; rest gated behind `useSubscription` (membership) OR existing `unlock("all")`.

## Brand & legal

All new pages use the locked palette + Cormorant/Outfit fonts, no "AI" wording, no medical claims, footer disclaimer included.

## Open questions before I start

1. **Phasing**: ship Phase 1 → review → Phase 2 → review → Phase 3? Or all at once?
2. **Membership unlock scope**: does $36/mo also unlock the All Access readers (yes per spec) AND Sacred Breathing? Confirming "all readings + meditations + Sacred Breathing + transmissions" = full unlock.
3. **Sacred Breathing videos**: do you have Vimeo URLs ready, or should I scaffold with placeholder embeds you can swap in later?
4. **Daily Love Snapshot**: generate fresh via AI each day (cost per visit) or pre-generate 12 sign-based templates that rotate daily (cheaper, still personal-feeling)?

Reply with answers + go-ahead and I'll start with Phase 1.