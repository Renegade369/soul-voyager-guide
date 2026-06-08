// Static curriculum for The Sovereignty Code.
// User progress is tracked in sovereign_module_progress (per lesson_slug).

export type SovereignLesson = {
  slug: string;
  title: string;
  duration: string; // human-readable
  summary: string;
  body: string; // markdown-ish plain text
};

export type SovereignModule = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  tierRequired: "digital" | "complete";
  lessons: SovereignLesson[];
};

export const SOVEREIGN_MODULES: SovereignModule[] = [
  {
    slug: "architecture-of-sleep",
    number: 1,
    title: "The Architecture of Sleep",
    subtitle: "Seeing the cage before you walk through it.",
    description:
      "Before sovereignty, recognition. This module maps the conditioning, the loops, and the inherited frequencies most never name.",
    tierRequired: "digital",
    lessons: [
      {
        slug: "the-three-sleeps",
        title: "The Three Sleeps",
        duration: "12 min read",
        summary: "Body, mind, and spirit each have their own form of slumber.",
        body: "There is the sleep of the body, the sleep of the mind, and the sleep of the spirit. Most never wake from the third. In this lesson we name each layer and how it presents in daily life — so you can begin to feel the difference between living and being lived.",
      },
      {
        slug: "inherited-frequencies",
        title: "Inherited Frequencies",
        duration: "14 min read",
        summary: "What you carry that was never yours to begin with.",
        body: "Generational lines, cultural overlays, and the subtle agreements you signed before you could speak. We do not blame — we observe. Observation is the first act of sovereignty.",
      },
      {
        slug: "the-loop-and-the-door",
        title: "The Loop & The Door",
        duration: "10 min reflection",
        summary: "Every loop has an exit. Most are simply unlit.",
        body: "A practice for identifying one repeating pattern in your life and locating its hinge — the single point where attention changes the outcome.",
      },
    ],
  },
  {
    slug: "sovereignty-of-the-body",
    number: 2,
    title: "Sovereignty of the Body",
    subtitle: "The temple remembers what the mind forgot.",
    description:
      "Reclaiming the vessel: breath, water, light, rhythm, and the practices that re-tune the nervous system.",
    tierRequired: "digital",
    lessons: [
      {
        slug: "breath-as-anchor",
        title: "Breath as Anchor",
        duration: "11 min + practice",
        summary: "The one tool always with you, almost never used.",
        body: "Three breath patterns — grounding, clearing, and sealing — and when each one serves. Practice them daily for one week before moving on.",
      },
      {
        slug: "the-four-elements-of-vitality",
        title: "The Four Elements of Vitality",
        duration: "15 min read",
        summary: "Water, light, movement, stillness.",
        body: "Not a regimen — a return. How to align with the simplest inputs and let the body show you what it has been asking for.",
      },
    ],
  },
  {
    slug: "sovereignty-of-the-mind",
    number: 3,
    title: "Sovereignty of the Mind",
    subtitle: "Author your inner voice.",
    description:
      "Discernment, attention, narrative. The mind as servant, not master.",
    tierRequired: "digital",
    lessons: [
      {
        slug: "the-observer-seat",
        title: "The Observer Seat",
        duration: "13 min + practice",
        summary: "You are not the thought. You are the one who notices the thought.",
        body: "A simple, repeatable practice for stepping behind your own thinking — the foundation for everything that follows.",
      },
      {
        slug: "narrative-archaeology",
        title: "Narrative Archaeology",
        duration: "20 min reflection",
        summary: "Excavate the story you have been telling.",
        body: "Three writing prompts to surface the dominant story shaping your current life. Then: rewrite one sentence.",
      },
    ],
  },
  {
    slug: "sovereignty-of-the-heart",
    number: 4,
    title: "Sovereignty of the Heart",
    subtitle: "Open without losing center.",
    description:
      "Boundaries, devotion, the difference between open and porous.",
    tierRequired: "digital",
    lessons: [
      {
        slug: "the-sovereign-no",
        title: "The Sovereign No",
        duration: "12 min read",
        summary: "Every no is a yes to something deeper.",
        body: "How to feel the no in your body before it becomes a yes in your mouth.",
      },
      {
        slug: "devotion-without-dissolution",
        title: "Devotion Without Dissolution",
        duration: "16 min read",
        summary: "Love that does not require you to disappear.",
        body: "The signature difference between codependence and communion. Practices for staying whole inside connection.",
      },
    ],
  },
  {
    slug: "sovereignty-of-the-spirit",
    number: 5,
    title: "Sovereignty of the Spirit",
    subtitle: "The unmediated relationship.",
    description:
      "No intermediaries. No gurus. The direct line between you and Source.",
    tierRequired: "digital",
    lessons: [
      {
        slug: "the-direct-line",
        title: "The Direct Line",
        duration: "14 min + practice",
        summary: "You do not need permission. You need willingness.",
        body: "A short evening practice for opening the channel — and the discernment to know what you receive.",
      },
      {
        slug: "discerning-the-voice",
        title: "Discerning the Voice",
        duration: "18 min read",
        summary: "Not every whisper is your own.",
        body: "How to tell the difference between intuition, conditioning, and projection. Markers in the body, markers in the language.",
      },
    ],
  },
  {
    slug: "walking-free",
    number: 6,
    title: "Walking Free",
    subtitle: "Integration. Embodiment. The daily life of an initiate.",
    description:
      "What sovereignty looks like in the unremarkable hours. How to keep the work alive after the program ends.",
    tierRequired: "digital",
    lessons: [
      {
        slug: "the-sealed-practice",
        title: "The Sealed Practice",
        duration: "15 min",
        summary: "Build your own daily rite.",
        body: "Take what you have learned. Distill it to one morning practice you can keep for the rest of your life.",
      },
      {
        slug: "the-next-mountain",
        title: "The Next Mountain",
        duration: "10 min reflection",
        summary: "What calls you now?",
        body: "Sovereignty is not an arrival. It is a posture. A final reflection on what becomes possible from here.",
      },
    ],
  },
];

export function getModule(slug: string) {
  return SOVEREIGN_MODULES.find((m) => m.slug === slug);
}
