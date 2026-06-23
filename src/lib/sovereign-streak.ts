// Streak calculation with grace allowance: 1 missed/skipped day per rolling 7-day window.
// A "completion" is a non-skipped ritual completion. A "miss" is a skipped completion
// or a calendar day with no completion at all.

export type RitualCompletionRow = {
  completed_at: string; // ISO timestamp
  skipped: boolean;
};

export type StreakResult = {
  streak: number;
  graceUsed: boolean;
  graceResetsInDays: number; // days until the consumed grace falls outside the 7-day window
};

function localDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export function computeStreak(rows: RitualCompletionRow[], today: Date = new Date()): StreakResult {
  // Build day → status map. "done" beats "skip".
  const byDay = new Map<string, "done" | "skip">();
  for (const r of rows) {
    const key = localDateKey(new Date(r.completed_at));
    const prev = byDay.get(key);
    if (r.skipped) {
      if (!prev) byDay.set(key, "skip");
    } else {
      byDay.set(key, "done");
    }
  }

  // Walk back from today. If today has no entry yet, do not penalize it
  // (the day isn't over). Start the walk from yesterday in that case.
  const todayKey = localDateKey(today);
  let cursor = byDay.has(todayKey) ? new Date(today) : addDays(today, -1);

  let streak = 0;
  let missesInWindow = 0; // misses encountered within the last 7-day window of the walk
  let lastMissOffset = -1; // how many days back the (single) grace miss occurred
  let graceUsed = false;

  for (let i = 0; i < 200; i++) {
    const key = localDateKey(cursor);
    const status = byDay.get(key);

    if (status === "done") {
      streak += 1;
      // Slide the 7-day window: drop the grace miss if it fell out
      if (lastMissOffset !== -1 && i - lastMissOffset >= 7) {
        missesInWindow = 0;
        lastMissOffset = -1;
        graceUsed = false;
      }
    } else {
      // miss (skipped or no entry)
      missesInWindow += 1;
      if (missesInWindow === 1) {
        graceUsed = true;
        lastMissOffset = i;
      } else {
        // second miss within window → streak breaks here
        break;
      }
    }

    cursor = addDays(cursor, -1);
  }

  const graceResetsInDays = graceUsed && lastMissOffset !== -1 ? Math.max(0, 7 - lastMissOffset) : 0;
  return { streak, graceUsed, graceResetsInDays };
}

export function dayNumberFromEnrollment(enrolledAt: string | null | undefined, today: Date = new Date()): number {
  if (!enrolledAt) return 1;
  const start = new Date(enrolledAt);
  const diffMs = today.getTime() - start.getTime();
  return Math.max(1, Math.floor(diffMs / 86_400_000) + 1);
}
