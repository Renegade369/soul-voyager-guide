
# Phase 2 — Onboarding + Dashboard + Morning Ritual

Confirmed: ship 7-step ritual as drafted · Erin + 7am defaults · grace streak (1 skip per rolling 7 days).

## What exists today vs spec

- `sovereign.portal.onboarding.tsx` — Sacred Contract / Intentions / Why Now. Different from Phase 2 spec (Welcome → Door → Name → Wake → Voice → Identity → Done).
- `sovereign.portal.morning-ritual.tsx` — 5-stage (Ground/Breathe/Intend/Reflect/Seal). Spec wants 7-step timer-based ritual.
- `sovereign.portal.dashboard.tsx` — exists, fragmentary.
- Tables: `sovereign_onboarding` (11 cols, no cert_name/wake_time/timezone/voice), `sovereign_enrollments` (11 cols), `sovereign_rituals` (per-day morning/evening row). No `sovereign_ritual_completions`.

Decision: keep the existing Sacred-Contract onboarding intact (already wired through `usePortalStatus`) and the existing 5-stage gentle ritual page intact. **Append** the Phase 2 surfaces at the new top-level paths the spec calls out (`/sovereign/onboarding`, `/sovereign/dashboard`, `/sovereign/ritual`). The portal-prefixed routes remain for the Sacred Contract flow and current daily reflection; Phase 2 is the new public/portal home surface William asked for.

## Database migration (single migration)

1. `sovereign_onboarding`: add `cert_name text`, `wake_time time`, `timezone text`, `meditation_voice text default 'erin'`. Backfill no-op.
2. `sovereign_ritual_completions` new table:
   - `id uuid pk`, `user_id uuid references auth.users`, `enrollment_id uuid references sovereign_enrollments`, `completed_at timestamptz default now()`, `day_number int`, `skipped boolean default false`, `created_at timestamptz default now()`.
   - GRANT to authenticated + service_role; RLS: user can select/insert own rows (`auth.uid() = user_id`).
3. `sovereign_enrollments`: add `cert_name text`, `wake_time time default '07:00'`, `timezone text`, `meditation_voice text default 'erin'`.

## New routes

- `src/routes/sovereign.onboarding.tsx` — 7-step linear flow per spec. Steps: Welcome / Door (auto-advance 30s) / Name / Timezone+Wake / Voice / Identity / Complete. Writes `cert_name`, `wake_time`, `timezone`, `meditation_voice` to `sovereign_enrollments` and a row to `sovereign_onboarding` on completion. No back on Door step.
- `src/routes/sovereign.dashboard.tsx` — Time-aware dashboard. Sections:
  1. Greeting (uses existing `pickGreeting` / `DASHBOARD_GREETINGS`).
  2. Today's Practice card — branches by local time + ritual completion state.
  3. Streak card — uses `streakFrame` (120-day window). Grace-aware: shows current streak number and a small "1 grace day used (resets in Nd)" line when applicable.
  4. Module card — pulls current module from curriculum + `sovereign_module_progress`.
  5. Companion CTA → `/sovereign/reflection`.
  6. Recent reflections (last 3 from `sovereign_module_responses`).
  7. Tier upsell card (Digital → Complete) / shipment status (Complete).
  8. Sticky mobile bottom bar: Home / Modules / Companion.
- `src/routes/sovereign.ritual.tsx` — 7-step ritual: Settle / Release / Anchor / Today's frame (uses `pickMorningOpener`) / The question (90s) / 4-4-6 breath (animated circle, 90s) / Close. Auto-advance per step timer. Pause + Back always visible. Skip CTA with confirm. Writes to `sovereign_ritual_completions` on completion (with `skipped` flag). Streak increments only when completed (not skipped) and before local noon.

## Routing entry

Update `/sovereign/portal` index (`sovereign.portal.index.tsx`) to read: if no `sovereign_onboarding` row for user → redirect `/sovereign/onboarding`, else `/sovereign/dashboard`. Keep existing `/sovereign/portal/dashboard` as-is so no current link breaks.

## Streak logic (grace: 1 skip / 7 rolling days)

Helper `src/lib/sovereign-streak.ts`:
- `computeStreak(completions: {completed_at, skipped}[])` → `{ streak, graceUsed, graceResetsInDays }`.
- Walks back day-by-day from today's local date. A completed day extends streak. A skipped day OR missing day counts as a "miss"; up to 1 miss within the last rolling 7 days is forgiven and streak continues; a second miss within that window breaks streak to 0.

## Files to add/change

Add:
- `src/routes/sovereign.onboarding.tsx`
- `src/routes/sovereign.dashboard.tsx`
- `src/routes/sovereign.ritual.tsx`
- `src/lib/sovereign-streak.ts`
- `src/lib/sovereign-onboarding.functions.ts` (server fn to read/write onboarding+enrollment fields with service-role, mirroring `getEnrollmentByEmail`).

Change:
- `src/routes/sovereign.portal.index.tsx` — re-route based on new onboarding presence check.
- Migration as above.

Untouched: existing Sacred Contract onboarding, 5-stage gentle ritual, all `/sovereign/portal/*` pages, all Phase 3 module routes, brand tokens, time-machine frames file.

## Verification

- `vite build` clean.
- Manual sweep via curl/inspect of new routes (SSR-safe, no auth in loaders).
- DB: confirm new columns + table after migration approval; smoke-test inserts via Supabase reads.

## Out of scope (flagged, not built)

- ElevenLabs voice narration for ritual (spec marked optional/future).
- Push/email morning reminders driven by `wake_time` (would need pg_cron + Resend job; Phase 4 work).
- `/sovereign/upgrade` Digital→Complete flow (already exists per spec).
