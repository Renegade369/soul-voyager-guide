// The Sovereignty Code — 6 modules, 12 weeks.
// Phase 3 scaffold. Lesson bodies, exercise instructions, companion role,
// integration paragraphs, and bridges are placeholders to be replaced from
// the source-of-truth curriculum doc.

export type Phase = "Awaken" | "Build" | "Sovereign";
export type Milestone =
  | "Awakened"
  | "Stripped"
  | "Built"
  | "Sovereign"
  | "Graduated";

export type CompanionTone =
  | "gentle, slow, curious — curious, not condemning"
  | "practical, clarifying — what's the next step? what's the obstacle?"
  | "witnessing, integrating — what's true now that wasn't true 90 days ago? what stays?";

export type SovereignLesson = {
  slug: string; // e.g. "1.1"
  title: string;
  duration: string;
  summary: string;
  body: string;
};

export type SovereignExercise = {
  id: string; // e.g. "exercise-1"
  number: number;
  title: string;
  time: string; // e.g. "15 min, once"
  instructions: string;
};

export type SovereignModule = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  weeks: string; // "Weeks 1-2"
  phase: Phase;
  description: string;
  promise: string; // 150-200 word opening
  tierRequired: "digital" | "complete";
  lessons: SovereignLesson[];
  exercises: SovereignExercise[];
  companionTone: CompanionTone;
  companionRole: string; // 50-100 word italicized section
  integration: string; // ~100 words
  bridge: string; // 50-100 words to next module
  milestoneOnComplete: Milestone | null;
};

// Placeholder body copy — to be replaced with the canonical curriculum text.
const TODO = (label: string) =>
  `[TODO: Replace with the canonical copy from the source-of-truth curriculum doc — ${label}. The structure, headings, and brand voice are in place; only the body text needs to be dropped in.]`;

export const SOVEREIGN_MODULES: SovereignModule[] = [
  {
    slug: "awakening",
    number: 1,
    title: "Awakening",
    subtitle: "Seeing the matrix you've been living in.",
    weeks: "Weeks 1-2",
    phase: "Awaken",
    description:
      "Before sovereignty, recognition. This module is the first noticing — the cage seen, named, and softened.",
    tierRequired: "digital",
    promise: TODO("Module 1 promise — what the member walks away with"),
    lessons: [
      { slug: "1.1", title: "What the Matrix actually is", duration: "12 min read", summary: "Not the movie. The actual architecture.", body: TODO("Lesson 1.1 body") },
      { slug: "1.2", title: "How you got here (without shame)", duration: "12 min read", summary: "Inheritance, not failure.", body: TODO("Lesson 1.2 body") },
      { slug: "1.3", title: "The first noticing practice", duration: "10 min + practice", summary: "Begin to feel the difference between living and being lived.", body: TODO("Lesson 1.3 body") },
      { slug: "1.4", title: "Naming what you see", duration: "10 min reflection", summary: "Language is the first lever of sovereignty.", body: TODO("Lesson 1.4 body") },
    ],
    exercises: [
      { id: "exercise-1", number: 1, title: "The Inheritance Inventory", time: "15 min, once", instructions: TODO("Exercise 1 instructions") },
      { id: "exercise-2", number: 2, title: "The Daily Witnessing", time: "2 min, daily for 14 days", instructions: TODO("Exercise 2 instructions") },
      { id: "exercise-3", number: 3, title: "The Matrix Journal", time: "5 min, daily for 14 days", instructions: TODO("Exercise 3 instructions") },
    ],
    companionTone: "gentle, slow, curious — curious, not condemning",
    companionRole: TODO("Module 1 Companion role — how the Companion holds space"),
    integration: TODO("Module 1 integration — how ritual, morning + sleep meditations align"),
    bridge: TODO("Module 1 bridge — points to Stripping"),
    milestoneOnComplete: "Awakened",
  },
  {
    slug: "stripping",
    number: 2,
    title: "Stripping",
    subtitle: "Removing what was never yours.",
    weeks: "Weeks 3-4",
    phase: "Awaken",
    description:
      "The art of letting go without force. The family layer. The cultural layer. The body that finally exhales.",
    tierRequired: "digital",
    promise: TODO("Module 2 promise"),
    lessons: [
      { slug: "2.1", title: "The art of letting go (without force)", duration: "12 min read", summary: "Release is not effort. It is permission.", body: TODO("Lesson 2.1 body") },
      { slug: "2.2", title: "The family layer", duration: "14 min read", summary: "The first costume you were handed.", body: TODO("Lesson 2.2 body") },
      { slug: "2.3", title: "The cultural layer", duration: "14 min read", summary: "The agreements you signed before you could speak.", body: TODO("Lesson 2.3 body") },
      { slug: "2.4", title: "Releasing rituals", duration: "10 min + practice", summary: "Body-led practices for actually putting it down.", body: TODO("Lesson 2.4 body") },
    ],
    exercises: [
      { id: "exercise-1", number: 1, title: "The Not-Mine Inventory", time: "30 min, once", instructions: TODO("Exercise 1 instructions") },
      { id: "exercise-2", number: 2, title: "The Inheritance Letter", time: "20 min, once", instructions: TODO("Exercise 2 instructions") },
      { id: "exercise-3", number: 3, title: "Body-Release Practice", time: "10 min, daily for 14 days", instructions: TODO("Exercise 3 instructions") },
    ],
    companionTone: "gentle, slow, curious — curious, not condemning",
    companionRole: TODO("Module 2 Companion role"),
    integration: TODO("Module 2 integration"),
    bridge: TODO("Module 2 bridge — closes the inner-work arc, points to Your Voice"),
    milestoneOnComplete: "Stripped",
  },
  {
    slug: "your-voice-amplified",
    number: 3,
    title: "Your Voice, Amplified",
    subtitle: "The thing you've been refusing to say out loud.",
    weeks: "Weeks 5-6",
    phase: "Build",
    description:
      "The cost of silence. The message that won't leave you alone. Speaking before you're ready.",
    tierRequired: "digital",
    promise: TODO("Module 3 promise"),
    lessons: [
      { slug: "3.1", title: "The voice you've been hiding", duration: "12 min read", summary: "It was never quiet. You were.", body: TODO("Lesson 3.1 body") },
      { slug: "3.2", title: "The cost of silence", duration: "12 min read", summary: "What you don't say compounds.", body: TODO("Lesson 3.2 body") },
      { slug: "3.3", title: "Finding the message that won't leave you alone", duration: "15 min reflection", summary: "Not your topic. Your transmission.", body: TODO("Lesson 3.3 body") },
      { slug: "3.4", title: "Speaking before you're ready", duration: "10 min + practice", summary: "Readiness is a story. Voice is the cure.", body: TODO("Lesson 3.4 body") },
    ],
    exercises: [
      { id: "exercise-1", number: 1, title: "The Voice Inventory", time: "20 min, once", instructions: TODO("Exercise 1 instructions") },
      { id: "exercise-2", number: 2, title: "The Daily Declaration", time: "5 min, daily for 14 days", instructions: TODO("Exercise 2 instructions") },
      { id: "exercise-3", number: 3, title: "The Public Post", time: "varies, once", instructions: TODO("Exercise 3 instructions") },
    ],
    companionTone: "practical, clarifying — what's the next step? what's the obstacle?",
    companionRole: TODO("Module 3 Companion role"),
    integration: TODO("Module 3 integration"),
    bridge: TODO("Module 3 bridge — points to Your Brand & Platform, Built"),
    milestoneOnComplete: null,
  },
  {
    slug: "your-brand-platform-built",
    number: 4,
    title: "Your Brand & Platform, Built",
    subtitle: "The body of work has to exist before the audience arrives.",
    weeks: "Weeks 7-8",
    phase: "Build",
    description:
      "What a brand actually is (and isn't). The platform myth. Building before anyone is watching.",
    tierRequired: "digital",
    promise: TODO("Module 4 promise"),
    lessons: [
      { slug: "4.1", title: "What a brand actually is (and isn't)", duration: "14 min read", summary: "Not a logo. Not a colour. A signal.", body: TODO("Lesson 4.1 body") },
      { slug: "4.2", title: "The platform myth", duration: "12 min read", summary: "You don't need a million people. You need the right ones.", body: TODO("Lesson 4.2 body") },
      { slug: "4.3", title: "Building the body of work", duration: "15 min read", summary: "Volume is its own teacher.", body: TODO("Lesson 4.3 body") },
      { slug: "4.4", title: "Showing up before the audience arrives", duration: "10 min + practice", summary: "The first 100 are for you.", body: TODO("Lesson 4.4 body") },
    ],
    exercises: [
      { id: "exercise-1", number: 1, title: "The Brand Audit", time: "30 min, once", instructions: TODO("Exercise 1 instructions") },
      { id: "exercise-2", number: 2, title: "The Content Cadence", time: "varies, ongoing", instructions: TODO("Exercise 2 instructions") },
      { id: "exercise-3", number: 3, title: "The 100-Post Commitment", time: "ongoing", instructions: TODO("Exercise 3 instructions") },
    ],
    companionTone: "practical, clarifying — what's the next step? what's the obstacle?",
    companionRole: TODO("Module 4 Companion role"),
    integration: TODO("Module 4 integration"),
    bridge: TODO("Module 4 bridge — points to Your Income, Activated"),
    milestoneOnComplete: null,
  },
  {
    slug: "your-income-activated",
    number: 5,
    title: "Your Income, Activated",
    subtitle: "The wealth wound, and the first dollar.",
    weeks: "Weeks 9-10",
    phase: "Build",
    description:
      "What you're really selling. Pricing without apology. The first offer that proves the model.",
    tierRequired: "digital",
    promise: TODO("Module 5 promise"),
    lessons: [
      { slug: "5.1", title: "The wealth wound", duration: "15 min read", summary: "The story you carry about money — and where it came from.", body: TODO("Lesson 5.1 body") },
      { slug: "5.2", title: "What you're really selling", duration: "14 min read", summary: "Not the thing. The transformation.", body: TODO("Lesson 5.2 body") },
      { slug: "5.3", title: "Pricing without apology", duration: "13 min read", summary: "Numbers that match the work, not the wound.", body: TODO("Lesson 5.3 body") },
      { slug: "5.4", title: "The first offer", duration: "15 min + practice", summary: "Ship it before it's perfect. Especially before it's perfect.", body: TODO("Lesson 5.4 body") },
    ],
    exercises: [
      { id: "exercise-1", number: 1, title: "The Money Story Inventory", time: "25 min, once", instructions: TODO("Exercise 1 instructions") },
      { id: "exercise-2", number: 2, title: "The Offer Outline", time: "45 min, once", instructions: TODO("Exercise 2 instructions") },
      { id: "exercise-3", number: 3, title: "The First Dollar Plan", time: "30 min, once", instructions: TODO("Exercise 3 instructions") },
    ],
    companionTone: "practical, clarifying — what's the next step? what's the obstacle?",
    companionRole: TODO("Module 5 Companion role"),
    integration: TODO("Module 5 integration"),
    bridge: TODO("Module 5 bridge — closes outer-work arc, points to Your Freedom, Protected"),
    milestoneOnComplete: "Built",
  },
  {
    slug: "your-freedom-protected",
    number: 6,
    title: "Your Freedom, Protected",
    subtitle: "The daily life of an initiate.",
    weeks: "Weeks 11-12",
    phase: "Sovereign",
    description:
      "The 5 Sovereign Laws. The practice of staying free. The integration. The graduation.",
    tierRequired: "digital",
    promise: TODO("Module 6 promise"),
    lessons: [
      { slug: "6.1", title: "The 5 Sovereign Laws (overview)", duration: "16 min read", summary: "The architecture you take with you.", body: TODO("Lesson 6.1 body") },
      { slug: "6.2", title: "The practice of staying free", duration: "14 min read", summary: "Sovereignty is a posture, not an arrival.", body: TODO("Lesson 6.2 body") },
      { slug: "6.3", title: "The integration", duration: "12 min reflection", summary: "What stays. What goes. What you commit to.", body: TODO("Lesson 6.3 body") },
      { slug: "6.4", title: "The graduation", duration: "10 min", summary: "Not the end. The threshold.", body: TODO("Lesson 6.4 body") },
    ],
    exercises: [
      { id: "exercise-1", number: 1, title: "The 5 Sovereign Laws Deep Reflection", time: "60 min, once", instructions: TODO("Exercise 1 instructions") },
      { id: "exercise-2", number: 2, title: "The Integration Letter to Future Self", time: "30 min, once", instructions: TODO("Exercise 2 instructions") },
      { id: "exercise-3", number: 3, title: "The Sovereignty Plan", time: "45 min, once", instructions: TODO("Exercise 3 instructions — what stays, what changes, what you commit to") },
    ],
    companionTone: "witnessing, integrating — what's true now that wasn't true 90 days ago? what stays?",
    companionRole: TODO("Module 6 Companion role"),
    integration: TODO("Module 6 integration"),
    bridge: TODO("Module 6 bridge — graduation and what becomes possible from here"),
    milestoneOnComplete: "Sovereign",
  },
];

export function getModule(slug: string) {
  return SOVEREIGN_MODULES.find((m) => m.slug === slug);
}

// Phase 3 — unlock logic.
// A module is unlocked if:
//   - it is module 1, OR
//   - the previous module is fully complete (all lessons done + all exercises responded to), OR
//   - 14 days have passed since the previous module unlocked.
export const MODULE_UNLOCK_FALLBACK_DAYS = 14;

export type ModuleStatus = "locked" | "unlocked" | "in-progress" | "complete";

export function moduleIsFullyComplete(
  mod: SovereignModule,
  completedLessonSlugs: Set<string>,
  respondedExerciseIds: Set<string>
): boolean {
  const lessonsDone = mod.lessons.every((l) => completedLessonSlugs.has(l.slug));
  const exercisesDone = mod.exercises.every((e) => respondedExerciseIds.has(e.id));
  return lessonsDone && exercisesDone;
}

export function daysUntilFallbackUnlock(prevUnlockedAt: Date | null): number {
  if (!prevUnlockedAt) return MODULE_UNLOCK_FALLBACK_DAYS;
  const elapsedMs = Date.now() - prevUnlockedAt.getTime();
  const elapsedDays = Math.floor(elapsedMs / 86_400_000);
  return Math.max(0, MODULE_UNLOCK_FALLBACK_DAYS - elapsedDays);
}
