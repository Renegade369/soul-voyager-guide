# Frequency Transmissions — Build Plan

A flagship, login-gated, multi-step experience at `/transmissions` that generates a unique spoken transmission from the user's soul profile.

---

## 1. Database & Storage (one migration)

**Table `transmissions`** (per-user history)
- `id uuid pk`, `user_id uuid → auth.users on delete cascade`
- `emotional_state text`, `intention text`
- `script text` (full transmission)
- `seal text` (final line)
- `audio_path text` (storage path, nullable)
- `profile_snapshot jsonb` (what we pulled)
- `created_at timestamptz default now()`
- RLS: users select/insert/delete only their own rows

**Table `transmission_credits`**
- `user_id uuid pk → auth.users`
- `credits int default 0`
- `all_access boolean default false`
- RLS: user can select own; only service role mutates (via edge functions after purchase)

**Storage bucket `transmissions`** — private. Files served via signed URLs (1h). Policy: authenticated users can read their own `userId/...` prefix.

---

## 2. Edge Functions (Supabase)

Both follow the working Aura Reader pattern: full try/catch, input validation, always return JSON, CORS headers.

**`generate-transmission-text`**
- Input: `{ emotionalState, intention, soulProfile }`
- Calls Lovable AI Gateway `google/gemini-2.5-pro` with the spec'd system prompt
- Returns `{ script, seal }` (seal = last sentence of script)

**`generate-transmission-audio`**
- Input: `{ script, userId }`
- Auth required (uses caller JWT)
- POSTs to ElevenLabs TTS (`eleven_multilingual_v2`, voice from `ELEVENLABS_VOICE_ID` env, settings per spec)
- Uploads MP3 to `transmissions/{userId}/{timestamp}.mp3` via service-role client
- Returns `{ audioPath, signedUrl }`
- On TTS failure: returns `{ audioPath: null, signedUrl: null, message: "..." }` with 200

**`save-transmission`** (small helper)
- Auth required. Inserts the row into `transmissions` for the user.

---

## 3. Secrets

Need from user: `ELEVENLABS_API_KEY` (request via `add_secret` if not present), `ELEVENLABS_VOICE_ID` (default to a known voice id like Sarah `EXAVITQu4vr4xnSDxMaL`; user can override later). `LOVABLE_API_KEY` is already configured.

---

## 4. Frontend

**Route `/transmissions`** (`src/routes/transmissions.tsx`) — single route, internal step state machine: `gate → checkin → intention → loading → paywall → player → done`.

**Components** (in `src/components/transmissions/`):
- `LoginGate.tsx` — auth check, sign-in CTA
- `CheckInStep.tsx` — 10-state grid, gold-bordered cards
- `IntentionStep.tsx` — 5 intentions with inline SVG sacred glyphs (no emoji in render)
- `LoadingScreen.tsx` — pulsing gold mandala, cycling copy
- `PaywallStep.tsx` — $3.69 single / $9.36 3-pack, checks `transmission_credits` for All Access
- `TransmissionPlayer.tsx` — breathing mandala, gold play/pause, progress bar, seal reveal on end, download
- `PostScreen.tsx` — save + call-in-another

**Profile pull**: helper `loadSoulProfile(userId)` queries any existing reading tables present in the project (best-effort selects, swallow missing tables). Pass whatever was found to the edge function.

**Saved-transmissions tab**: add a "My Transmissions" section to `src/routes/my-readings.tsx` (existing user profile-ish page) — list with date, state, intention, seal, replay button (fetches fresh signed URL via a tiny `sign-transmission` edge fn).

**Nav + catalog**:
- `SiteHeader.tsx` — add "Transmissions" link with subtle gold pulse class
- `src/routes/readings.tsx` (or homepage catalog) — featured card at the top with `SIGNATURE` badge and animated glow

**Paywall integration**: this feature uses Lovable's existing payment pattern (the codebase has `unlocks.ts` + `redeem_promo_code` RPC + cart). For v1, wire the credits via a simple "I have a code" path matching existing readers, plus stub Single/3-Pack buttons that show "Coming soon — use a code or All Access" until Stripe is wired. (Avoids reworking the entire payment stack in one shot.) If you want full Stripe checkout here, say so and I'll add it as a follow-up.

---

## 5. Design

- BG `#0A0B09`, gold `#C9A84C`, text `#F5F0E8`
- Cormorant Garamond headings (italic for prompts), Outfit body
- Square cards, uppercase 11px tracking-[0.22em] CTAs
- Mandala = pure CSS/SVG breathing animation (no extra deps)
- No "AI" anywhere in copy

---

## 6. Out of scope (call out if you want them)

- Full Stripe checkout for the $3.69/$9.36 SKUs (will stub with promo-code unlock matching existing readers)
- All Access subscription billing logic ($39.66/mo) — only the `all_access` boolean read path is wired
- Streaming TTS (using simple file generation, fine for 250–350 words)

---

## Files to create / edit

Create:
- `supabase/migrations/<ts>_transmissions.sql`
- `supabase/functions/generate-transmission-text/index.ts`
- `supabase/functions/generate-transmission-audio/index.ts`
- `supabase/functions/save-transmission/index.ts`
- `supabase/functions/sign-transmission/index.ts`
- `src/routes/transmissions.tsx`
- `src/components/transmissions/*.tsx` (6 files)
- `src/lib/soulProfile.ts` (profile pull helper)

Edit:
- `src/components/SiteHeader.tsx` (nav link)
- `src/routes/readings.tsx` (featured card)
- `src/routes/my-readings.tsx` (history tab)
- `supabase/config.toml` (register the 4 new functions)

Confirm to proceed, and confirm whether to add `ELEVENLABS_API_KEY` now (I'll trigger the secret prompt).
