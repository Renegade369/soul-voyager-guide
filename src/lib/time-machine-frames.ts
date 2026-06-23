// Time-Machine Frame copy for The Sovereignty Code.
// Loss-aversion copy: contrast the cost of staying with the cost of moving.
// Never gain-language. Cormorant Garamond italic, gold, on black.

export const TIME_MACHINE_ANCHOR =
  "One year from now, you could still be reading these words and feeling exactly the way you do right now. Or you could be someone your past self wouldn't recognize. The door is open. Step through.";

// 4b — three rotating dashboard greeting lines. Caller picks by day index.
export const DASHBOARD_GREETINGS = [
  (day: number) =>
    `Day ${day}. The version of you that didn't start is still waiting. The version that did is already becoming.`,
  () =>
    "Tick. Tick. Tick. Time is the only resource you can't get back. Spend it on what matters.",
  () =>
    "A year from now, you'll wish you had started today. Don't make that true.",
] as const;

export function pickGreeting(streakDay: number, seed: number = 0): string {
  const idx = (Math.floor(Date.now() / 86_400_000) + seed) % DASHBOARD_GREETINGS.length;
  return DASHBOARD_GREETINGS[idx](streakDay);
}

// 4c — streak copy escalates with the streak (120-day window).
export function streakFrame(streak: number): string {
  if (streak === 0)
    return "Day 0. The chain is broken. The work resets. How many more times will you start over before you don't stop?";
  if (streak <= 7)
    return "You started. The hardest part. Tomorrow, the version of you that stayed stuck falls further behind.";
  if (streak <= 40)
    return "You're building something. Don't break the chain. The version of you that quits here is the same version that always quits.";
  if (streak <= 80)
    return "Two-thirds in. The next 40 days decide who you are. Stop now and the streak resets to zero — and so does the momentum.";
  if (streak <= 119)
    return "Almost there. Don't let 80+ days of work die for the sake of one skipped day. The cost of breaking is much higher than the cost of showing up.";
  return "120 days. You did it. You are the person who did the work. That person is not the same one who started. Now: do you stop, or do you keep going?";
}

// 4d — rotating morning ritual openers.
export const MORNING_OPENERS = [
  "Another day. Another choice. The work compounds when you show up. It disappears when you don't.",
  "This is the hour that defines the next 23. The cost of skipping it is invisible until it's not.",
  "You woke up. That's the first victory. The second is what you do in the next 10 minutes.",
] as const;

export function pickMorningOpener(seed: number = 0): string {
  const idx = (Math.floor(Date.now() / 86_400_000) + seed) % MORNING_OPENERS.length;
  return MORNING_OPENERS[idx];
}

// 4e — module loss-aversion intros, by module ordinal (1-6).
// Mapped against the live curriculum (architecture-of-sleep → walking-free) in
// the same Awakening → Stripping → Voice → Brand → Income → Freedom intent order.
export const MODULE_LOSS_FRAMES: Record<number, string> = {
  1: "Most people live their whole life asleep. The version of you that wakes up is rare. The version of you that goes back to sleep is the default. Which one are you?",
  2: "Everything you think you are is a costume. Most people never take it off. The next 30 days are about removing the layers you forgot you were wearing.",
  3: "The version of you that doesn't speak is the version that never gets heard. The cost of silence is invisible — until one day you realize the life you wanted is the life you never asked for.",
  4: "A year from now, you could still be doing someone else's work under someone else's name. Or you could be the person whose work has a name they recognize. Build it now or don't build it at all.",
  5: "The gap between what you earn and what you're worth widens every year you don't address it. 5 years from now, the gap will be a canyon. Start closing it.",
  6: "Freedom is not a destination. It's a daily practice. The cost of losing it is the cost of going back to a life that was never yours.",
};

// 4f — reflection prompts.
export const DAILY_REFLECTION_PROMPT =
  "What did you do today that the version of you from 120 days ago wouldn't recognize? What did you skip that they wouldn't be proud of?";

export const WEEKLY_REFLECTION_PROMPT =
  "Look back at the week. What did the work cost you? What did it give you? If you keep going for a year, where will you be?";

export function moduleEndPrompt(moduleTitle: string): string {
  return `You finished ${moduleTitle}. A year ago, you couldn't have. 5 years from now, you'll either be the person who built on this foundation or the person who let it crumble. Which?`;
}

// True on Sundays in the user's local time. Used to surface the weekly prompt.
export function isSundayLocal(d: Date = new Date()): boolean {
  return d.getDay() === 0;
}
