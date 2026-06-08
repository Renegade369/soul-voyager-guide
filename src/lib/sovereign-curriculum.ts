// The Sovereignty Code — 6 modules, 12 weeks.
// Phase 3b: full curriculum content. Module 1 is verbatim from the v1
// source-of-truth doc. Modules 2-6 are a first-pass draft anchored by the
// Module 1 voice and the per-lesson content spec. William will do a
// fidelity-and-voice pass against the canonical doc afterward.

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
    promise:
      "The Matrix isn't a metaphor. It's a system — a real, operational system of distraction, debt, and quiet agreement that you are not enough. The first two weeks of The Sovereignty Code are about seeing the system clearly — naming it without shame, witnessing it without trying to fight it.\n\nThis module is the most tender work in the program. There is no building here, no performance, no output. There is only the practice of seeing what's actually running your day. For most members, this is the first time anyone has named it for them — not with judgment, but with the kind recognition of someone who has lived it.\n\nBy the end of week 2, you'll have a clear, named understanding of the Matrix you're in. You won't have escaped it yet. You will have seen it. And seeing it is the beginning of sovereignty.",
    lessons: [
      {
        slug: "1.1",
        title: "What the Matrix actually is",
        duration: "12 min read",
        summary: "Not the movie. The actual architecture.",
        body: "The Matrix isn't a metaphor. It's a real, operational system — the architecture of distraction, debt, and quiet agreement that runs most people's days without their consent. It is the notification you reach for before you have finished waking up. It is the credit card statement you do not open. It is the meeting you said yes to because saying no felt expensive. It is the version of yourself you perform online so that the algorithm keeps feeding you. It is the slow, ambient sense that you are behind on a race you never agreed to run.\n\nThe Matrix is not run by villains. It is run by incentives. Every screen you hold has been optimized by thousands of engineers whose job is to capture your attention and convert it into revenue. Every credit line you carry has been priced to be paid forever, never paid off. Every cultural story about success and rest and worth has been handed to you by people who were handed it themselves. No one chose it. Everyone is inside it.\n\nThe first thing to understand is that the Matrix is not your fault. The second thing is that it is, from this moment forward, your responsibility. Not to fix. To see. The whole architecture relies on you not looking. The moment you look — actually look, with curiosity instead of shame — the system loses a degree of its power over you. Not all of it. A degree. That degree is the seed of sovereignty.\n\nThis week, the work is not to escape. The work is to notice. To begin to feel the difference between a life that is happening to you and a life you are choosing. Most of your day, right now, is the first. By the end of these two weeks, a small piece of it will be the second. That is the beginning.",
      },
      {
        slug: "1.2",
        title: "How you got here (without shame)",
        duration: "12 min read",
        summary: "Inheritance, not failure.",
        body: "You did not choose the Matrix. You were born into it. The agreements were already in place before you could speak — about money, about work, about rest, about what success looks like, about what a good life is supposed to feel like. Your family had a posture toward money before you arrived. Your culture had a posture toward worth before you were named. Your school taught you how to sit still and wait for instructions. Your first job taught you to call exhaustion ambition. None of this was your fault.\n\nIt is important to say this clearly because shame is the Matrix's preferred fuel. Shame keeps you scrolling, spending, performing, apologizing. Shame keeps you small enough to manage. The moment you understand that you inherited this — the same way you inherited your eye color and your accent — the shame loses its grip. You did not fail. You were enrolled.\n\nRecognition is the work of this lesson. Not blame of the people who handed it to you. Most of them were inside the same system, trying their best with what they had. Not blame of yourself, either. You were a child. You did what children do — you absorbed what was around you and built a self out of it.\n\nWhat you can do now is different. You can begin to notice which agreements are still running and ask, gently: is this mine? Some of them are. Some of them are not. You do not have to decide today. You only have to begin to see them, one at a time, without flinching and without performing a recovery you have not yet done.\n\nRecognition is not blame. Recognition is the first sovereign act. You did not choose the system. You are choosing, now, to see it.",
      },
      {
        slug: "1.3",
        title: "The first noticing practice",
        duration: "10 min + practice",
        summary: "Begin to feel the difference between living and being lived.",
        body: "Most of your day is run by patterns you did not consciously set. The reach for the phone. The second cup of coffee. The internal monologue that has been playing the same recording since you were nine. The patterns are not bad. They are efficient. The brain is an efficiency machine. The problem is that efficiency, without noticing, becomes a cage.\n\nThe practice this week is simple and almost embarrassing in its smallness. At any point in your day, you stop. You notice your breath. You notice your body. You notice the thought you are thinking. And you name it: I am having the thought that... I am feeling... I am noticing the urge to... That is the practice. Five minutes a day, anywhere. The bus. The kitchen. The bathroom at work. The moment between meetings. The pause before bed.\n\nThe goal is not to stop the thought. The goal is to notice that you are the one having the thought. This distinction is everything. When you are inside the thought, it is reality. When you are noticing the thought, it is weather. Weather passes. Reality does not. Sovereignty begins the moment you can tell the difference.\n\nThis is what witnessing mode feels like. It is not transcendence. It is not bliss. It is a small, quiet step backward inside yourself, the way you might take a small step backward in a museum to see the painting whole. The painting was always there. You were just standing too close to it.\n\nDo this five times today. Set a timer if you have to. Each time, give yourself the same three seconds of recognition: breath, body, thought. Name what is there. Then go back to your life. The practice is not separate from the day. The practice is what makes the day yours.",
      },
      {
        slug: "1.4",
        title: "Naming what you see",
        duration: "10 min reflection",
        summary: "Language is the first lever of sovereignty.",
        body: "What you can name, you can move. What you cannot name moves you. This is the law underneath the whole module. Witnessing is the first sovereign act because language is the first sovereign lever, and you cannot pull a lever you have not yet named.\n\nThis week you have been noticing. Now you begin to name. When you reach for the phone, you say: the Matrix is pulling me right now. When you feel the not-enough story in your chest after a scroll, you say: that is the not-enough story, not me. When you say yes to a meeting you did not want to attend, you say: that was the agreement-to-please, not the choice. Naming is not judgment. Naming is location. You are telling yourself where you are.\n\nMost of the suffering in the Matrix comes from confusion about location. You think you are choosing when you are being pulled. You think the thought is you when it is a recording. You think the impulse is honest when it is engineered. Naming dissolves the confusion. It does not solve the problem. It tells you what the problem actually is, which is the only place real change can begin.\n\nThe people in your life who seem most sovereign — the ones whose presence steadies a room — are not people who have escaped the Matrix. They are people who have named it so often, and so accurately, that the naming has become reflex. They see the pull and call it the pull. They feel the urge and call it the urge. They are not performing serenity. They are just no longer confused about where they are standing.\n\nThis is the work of these two weeks. Not escape. Location. By the end of Module 1, you will not be free yet. You will know exactly where you have been standing. That is the beginning of sovereignty, and there is no shortcut around it.",
      },
    ],
    exercises: [
      {
        id: "exercise-1",
        number: 1,
        title: "The Inheritance Belief Inventory",
        time: "15 min, once",
        instructions:
          "Make a list of 5-10 beliefs you hold that you didn't choose. Things like \"money is hard,\" \"people like me don't get to...,\" \"success takes sacrifice,\" \"rest is lazy,\" \"asking for help is weak.\"\n\nFor each, ask: Who gave this to me? Family? Culture? A specific experience? A religion? An ex? Just notice. Don't try to release yet — that's Module 2. Just name them.\n\nWrite them down somewhere you will see them again. The Companion can hold the list if you want to share it. The point is not to do anything with the list yet. The point is to make the inheritance visible. You cannot move what you have not yet named.",
      },
      {
        id: "exercise-2",
        number: 2,
        title: "The Daily Witnessing Practice",
        time: "5 min, daily for 14 days",
        instructions:
          "At any point in your day, stop. Notice your breath. Notice your body. Notice the thought you're thinking. Name it out loud or in your head: \"I'm having the thought that...\" That's the practice. Five minutes a day, anywhere. The bus. The kitchen. The bathroom at work. The moment you wake up.\n\nThe goal is not to stop the thought. The goal is to notice that you are the one having the thought. That's witnessing mode. That's the first sovereignty.\n\nDo it five times today. Tomorrow, again. Fourteen days. The repetition is the point. The witnessing muscle is built by use, not by understanding.",
      },
      {
        id: "exercise-3",
        number: 3,
        title: "The 3-Questions Check-in & Noticing Log",
        time: "5 min, twice daily for 14 days",
        instructions:
          "Twice a day — morning and evening — three questions, in order:\n\n1. What's the Matrix doing right now? (the distraction, the debt pull, the \"not enough\" story)\n2. What is mine, beneath that? (the truth, even if small)\n3. What is one small thing I can do from that truth, not the Matrix? (a tiny action)\n\nJournal it. The Companion can hold the reflections.\n\nAlongside this, keep a small noticing log (a phone note or a journal page) of every time you catch the Matrix in action this week. \"Spent 40 min scrolling before realizing I was anxious.\" \"Said yes to a meeting I didn't want to attend.\" \"Felt the 'not enough' pull when I saw someone's post.\"\n\nNot to fix. Just to see. The Matrix disappears when you see it clearly — but only if you actually look.",
      },
    ],
    companionTone: "gentle, slow, curious — curious, not condemning",
    companionRole:
      "The Companion is here to slow down with you. Not to fix, not to push, not to point. When you bring a noticing, the Companion will ask: what do you see? and what's underneath that? The Companion will never rush you past a feeling. Witnessing is the work of these two weeks. The Companion witnesses you while you witness the Matrix.",
    integration:
      "The Morning Ritual is the anchor for this module. Each morning, the 3-Questions Check-in pairs with the morning meditation theme \"I release what is not mine.\" The sleep meditation — \"I let go. I am safe.\" — closes the day. The whole module is a 14-day noticing practice dressed in two different outfits: morning and evening. The identity statement carried through Weeks 1-2 is I am sovereign — said quietly, not declared. The ritual holds the practice. The practice does the work.",
    bridge:
      "You've named the system. You've seen it move through your day. In Module 2, you'll do something with what you've seen. We'll go to the layer underneath — the inherited beliefs, the family and cultural agreements you didn't write. Not to fight them. To begin the slow, deliberate work of letting them go. Let's go deeper.",
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
    promise:
      "The Matrix runs on inherited agreements. Things you believe that you didn't choose — about money, work, love, rest, success, what you deserve. Module 2 is about the slow, deliberate art of letting those agreements go. Not by force. Not by fighting them. By seeing them clearly enough that they no longer run you.\n\nThe work of these two weeks is tender. The Companion holds the space. The exercises are the field where the real change happens — written letters you may never send, body practices that release what the mind can't, and a careful inventory of what's yours and what was given to you.\n\nBy the end of Module 2, you will have released (or at least named for release) the heaviest of the inherited agreements. You will be lighter. The inner-work arc is complete. From here, we begin the outer work: building the sovereign expression of who you actually are.",
    lessons: [
      {
        slug: "2.1",
        title: "The art of letting go (without force)",
        duration: "12 min read",
        summary: "Release is not effort. It is permission.",
        body: "Letting go is not a battle. It is a recognition. The Matrix taught you that change happens by force — by pushing harder, by trying harder, by white-knuckling the version of yourself you wish you were. None of that is release. That is just the inherited agreement wearing a costume called self-improvement.\n\nReal release happens when you see the thing clearly, hold it without flinching, and notice that you no longer need to keep carrying it. It is closer to setting down a heavy bag than to winning a fight. The bag was never glued to your hand. You were just holding it because nobody told you that you could put it down.\n\nThis week we let go with the body, not just the mind. The mind will rehearse the belief forever — it is a recording loop, and recordings do not release themselves. The body is the place where the belief is actually stored. You feel it in the chest when you think about money. You feel it in the throat when you think about asking for help. You feel it in the shoulders when you think about rest. The body is the archive. Release happens there or it does not happen at all.\n\nThe practice this week is to bring the body into the noticing you began in Module 1. When the inherited belief shows up, you do not argue with it. You feel where it lives. You breathe into that place. You let the breath be longer than the thought. The belief loses its grip not because you fought it but because you stopped feeding it your held breath.\n\nThis is the art. Not force. Permission. You are allowed to put it down. No one is checking. No one was ever checking. The agreement was a story, and stories end when you stop telling them.",
      },
      {
        slug: "2.2",
        title: "The family layer",
        duration: "14 min read",
        summary: "The first costume you were handed.",
        body: "The deepest agreements were signed before you could read. Your family had a posture toward money before you arrived — tight or loose, anxious or denying, hoarding or fleeing. Your family had a posture toward rest, toward ambition, toward conflict, toward joy. Your family had a role you played in the system: the responsible one, the easy one, the difficult one, the bright one, the invisible one. You did not choose the role. You filled it because the system needed it filled.\n\nThis is the deepest layer because it is pre-verbal. You absorbed it through the air, through the kitchen, through the silences after the phone calls, through the way your mother held her shoulders when the bill came. You learned what money meant before you knew what money was. You learned what love cost before you knew what cost meant. The family layer is the substrate on which every other agreement sits.\n\nThis lesson is not about blame. Most of the people who handed you these agreements were inside the same system, doing their best with what they had. Blame is the Matrix's preferred trap — it keeps you small, righteous, and unmoving. Recognition is different. Recognition is calm. Recognition says: this came from there. That is all. The next breath belongs to me.\n\nYou are not your family's wound. You are not the role you played. You are not the story they told about you. You are the one who can see it now. That seeing is the beginning of the unhooking.\n\nThe work this week is to name the heaviest of the family agreements without flinching and without performing forgiveness you have not yet done. Just see it. Locate it in the body. Let it be what it is. The releasing follows the seeing — never the other way around.",
      },
      {
        slug: "2.3",
        title: "The cultural layer",
        duration: "14 min read",
        summary: "The agreements you signed before you could speak.",
        body: "Above the family layer sits the cultural layer. The agreements your culture handed you about what success looks like, who gets to want what, what makes a life worthy, what makes a person valuable. \"People like me don't get to...\" is a cultural agreement. So is \"success takes sacrifice.\" So is \"asking is weak,\" \"rest is lazy,\" \"money is dirty,\" \"money is the only thing that matters,\" \"you should have figured this out by now.\"\n\nCultural agreements are harder to see than family ones because they are the water. Everyone around you is swimming in the same water and treating it as oxygen. The cultural agreement only becomes visible when you meet someone from a different water and notice that they are not drowning the way you assumed everyone drowns.\n\nThe work of this lesson is to begin to identify the cultural agreements you have been treating as truth. The religion you were raised in. The country you grew up in. The era you came of age in. The class you were born into. The institutions you trusted. Each of them handed you a script. Most of the script you absorbed without inspection.\n\nThis is not a takedown of culture. Some of what you inherited is beautiful and you will keep it. Some of it is poison and you will set it down. The work is to learn the difference. Not all at once. One agreement at a time, with the same calm recognition you brought to the family layer.\n\nA cultural agreement is not a truth. It is a popular story. Popular stories can be true, and they can be utterly wrong, and you are allowed — finally — to decide which is which for yourself. That is sovereignty at the cultural layer. It is quieter than rebellion and more durable than reaction. It is just you, choosing again.",
      },
      {
        slug: "2.4",
        title: "Releasing rituals",
        duration: "10 min + practice",
        summary: "Body-led practices for actually putting it down.",
        body: "Insight is not release. You can understand a belief perfectly and still carry it forever. What moves the belief out of the body is ritual — a deliberate, embodied act that tells the nervous system the agreement has been seen, named, and set down.\n\nThe two rituals this week are the Inheritance Letter and the Body-Release Practice. The letter is the cognitive act. You write to the person, the system, the era, or the version of yourself that handed you the agreement. You name what they gave you. You name what it cost you. You name what you are setting down. You do not have to send the letter. The writing is the ritual. The page receives what the body has been carrying.\n\nThe Body-Release Practice is the somatic act. You lie or sit. You breathe slowly into the place where the agreement lives — the chest, the throat, the gut, the jaw. You let the exhale be longer than the inhale. You name what you are releasing as you exhale: \"I release the agreement that money is hard.\" \"I release the role of the responsible one.\" \"I release the story that rest is lazy.\" The body does what the body does. Sometimes there are tears. Sometimes there is yawning. Sometimes nothing visible happens and the work lands anyway, hours later, in a quietness you cannot quite explain.\n\nRitual matters because the nervous system did not learn the agreement through logic and will not unlearn it through logic. It learned through repetition and embodiment. It releases through repetition and embodiment. The rituals are small. They are repeatable. They are how the seeing becomes the freeing.\n\nDo them this week. Not perfectly. Just actually do them. The releasing happens in the doing.",
      },
    ],
    exercises: [
      {
        id: "exercise-1",
        number: 1,
        title: "The Not-Mine Inventory",
        time: "30 min, once",
        instructions:
          "Sit down with the inheritance list you started in Module 1. Open a fresh page. For each belief, write three things: 1) Whose is this, really? (a person, a system, an era, a religion, a specific moment), 2) What has it cost me to carry it? (be specific — money, relationships, sleep, opportunities), 3) Am I willing to set it down?\n\nIf the answer to the third question is no or not yet, that is fine. Write \"not yet\" and move on. The point is not to release everything today. The point is to make a clear-eyed inventory of what is yours and what was handed to you.\n\nKeep the page. You will come back to it in the Inheritance Letter exercise. The Companion can hold it if you want to talk through any of the entries. Take the full thirty minutes. This is the spine of the module.",
      },
      {
        id: "exercise-2",
        number: 2,
        title: "The Inheritance Letter",
        time: "20 min, once",
        instructions:
          "Choose the single heaviest agreement from your Not-Mine Inventory. Write a letter to the person, the system, the era, or the version of yourself that handed it to you. You may never send it. That is not the point.\n\nName what they gave you. Name what it cost you. Name what you understand about why they gave it — not to excuse, just to see. And then name, in your own words, what you are setting down and what you are keeping.\n\nWrite it by hand if you can. The hand-to-page act is part of the ritual. Do not edit while you write. Do not perform. Do not try to make it good. Just let the truth move through your hand onto the page. When you are done, you can keep it, burn it, bury it, or share it with the Companion. The writing is the release.",
      },
      {
        id: "exercise-3",
        number: 3,
        title: "The Body-Release Practice",
        time: "10 min, daily for 14 days",
        instructions:
          "Once a day, find ten quiet minutes. Lie down or sit upright with a long spine. Close your eyes. Take three slow breaths.\n\nScan your body and find where the agreement you are working with lives. The chest. The throat. The gut. The jaw. The shoulders. Breathe into that place. Make the exhale longer than the inhale — four in, six or eight out. As you exhale, name what you are releasing: \"I release the agreement that...\" Repeat for ten minutes.\n\nNothing dramatic has to happen. Tears, yawning, shaking, stillness — all of it is release. The point is the daily repetition. The nervous system learned the agreement by living with it. It releases the agreement by living with the release. Fourteen days. Same time each day if you can. The body knows what to do once you give it permission and space.",
      },
    ],
    companionTone: "gentle, slow, curious — curious, not condemning",
    companionRole:
      "The Companion continues to slow down with you. The Companion will not push you toward a release you aren't ready for. When you bring something heavy — a belief, a family story, a letter you wrote and didn't send — the Companion will ask: what does it feel like in your body? and what's the smallest next step? Witnessing and releasing is the work. The Companion holds the space for both.",
    integration:
      "The Morning Ritual pairs with the meditation theme \"I am willing to let go.\" The sleep meditation — \"I am safe in the releasing.\" — holds the day's work while you rest. The Body-Release Practice is the daily anchor that makes the inventory and the letter land in the body, not just the mind. The identity statement for Weeks 3-4 is I release what is not mine — repeated quietly through the ritual, not announced. The whole module is a 14-day practice of permission. The ritual is the container. The practice is the work.",
    bridge:
      "You've done the inner work. You've named the system. You've released the heaviest of the inherited agreements. Now the program pivots. Module 3 begins the outer-work arc — building the sovereign expression of who you actually are. The voice you've been hiding. The message that won't leave you alone. Let's go deeper.",
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
    promise:
      "You have a message. You have known it for a while. The cost of not saying it has been quietly enormous — in your work, your relationships, your body, your sleep. Module 3 is about speaking before you're ready. Not perfectly. Not to everyone. To one person, on one platform, in one honest sentence. Then another. Then another.\n\nThe voice you've been hiding is not fragile. It is the most honest thing about you. The work of these two weeks is to let it out of your chest and into the world — in small, repeatable, daily acts. The Daily Declaration. The Public Post. The voice that gets stronger the more you use it.\n\nBy the end of Module 3, you will have a clear sense of the message you cannot stop speaking, and you will have begun the practice of speaking it in public. The voice work is done when it stops being a question and becomes a habit.",
    lessons: [
      {
        slug: "3.1",
        title: "The voice you've been hiding",
        duration: "12 min read",
        summary: "It was never quiet. You were.",
        body: "You have a voice. You have always had one. It is not the voice you use in meetings or at family dinners or in the captions you write and delete. It is the one underneath those — the one that interrupts your shower, that wakes you up at four, that knows what you actually think before you have decided what is safe to say.\n\nThe voice did not go quiet. You did. Somewhere along the way you learned that the voice was too much, or too direct, or too inconvenient for the room you were in. You learned to soften it, to qualify it, to swallow it. You learned to perform a tamer version of yourself and call that maturity. The voice did not leave. It just got smaller, and the cost of keeping it small became the ambient hum of your adult life.\n\nThis lesson is about meeting the voice again without flinching. It is not the loud voice. It is the honest one. The voice that says what is actually true before the polite version arrives. The voice that has known, for years, what you should be doing, what you should be saying, who you should be talking to, what you should be charging. The voice has not been wrong. It has just been outvoted.\n\nThe work of this module begins with permission. Permission for the voice to be heard inside you again. Permission to write down what it says without editing it. Permission to notice that what it says is, almost always, both more honest and more inconvenient than what the polite version says.\n\nYou do not need to know where to put the voice yet. You only need to admit that it is there, and that it has been there the whole time, and that the silence has cost you more than the speaking ever will. That admission is the start of the amplification.",
      },
      {
        slug: "3.2",
        title: "The cost of silence",
        duration: "12 min read",
        summary: "What you don't say compounds.",
        body: "Silence is not free. People speak about silence as if it were neutral, as if not saying the thing were the safe option. It is not. The thing unsaid compounds. The relationship you did not name. The boundary you did not draw. The work you did not put out. The price you did not raise. The truth you did not tell the person who needed to hear it. Each one carries interest, and the interest gets paid out of your body, your sleep, your sense of self-trust.\n\nThis lesson is the loss-frame for the voice work. The Time-Machine frame applies here directly. If you do not begin to speak in the next ninety days, what will you have lost in five years? Five more years of the same swallowed message. Five more years of the resentment that builds when you are not saying what is true. Five more years of watching someone less talented and more willing build the work that should have been yours.\n\nThis is not motivational speaking. This is just math. The voice carries information. The information is valuable. Withheld information depreciates the person withholding it. Spoken information appreciates them. The reason this feels uncomfortable is that the Matrix has trained you to treat silence as politeness. It is not politeness. It is a slow leak.\n\nYou do not have to fix everything you have been quiet about. You only have to begin to be honest about the cost of the silence. Sit with the cost for a minute before you reach for the comfort of a plan. Let it land in the body. The body already knows. The body has been paying the bill for years.\n\nNotice what you would feel if, a year from now, nothing had changed. That feeling is the most useful thing in this module. It is the friction that makes the speaking possible.",
      },
      {
        slug: "3.3",
        title: "Finding the message that won't leave you alone",
        duration: "15 min reflection",
        summary: "Not your topic. Your transmission.",
        body: "You have a message. Not a topic. A transmission. The difference matters. A topic is what you talk about. A transmission is what people receive when they are near you whether you are talking or not. Your transmission is the thing you cannot stop noticing in the world. It is the thing you bring up at dinner without meaning to. It is the thing you have written about, badly, in the notes app a hundred times. It is the thing you would say to one person if you had ten minutes left and they were the only one in the room.\n\nFinding the message is not about brainstorming. It is about noticing what is already there. The message has been visible in your behavior for years. The books you keep buying. The conversations you keep starting. The injustices you cannot look away from. The kinds of people you cannot help but help. The patterns in what you save, what you screenshot, what you reread. The message is in the data you have already generated. You have just been treating it as random.\n\nThe practice this lesson asks for is gentle archaeology. Sit with a blank page and ask: what do I keep coming back to? Not what do I want to want to come back to. What do I actually come back to. The honest answer will probably embarrass you a little, because the message is rarely the prestigious version of you. It is the truer version. The version that the polite voice has been trying to manage.\n\nDo not try to make the message marketable yet. Do not try to make it a business yet. Do not try to make it a brand yet. Those will come. First, you only have to name it clearly enough that you can hold it in one sentence and feel that the sentence is true. Once you have that sentence, the rest of the module is teaching you to say it out loud.",
      },
      {
        slug: "3.4",
        title: "Speaking before you're ready",
        duration: "10 min + practice",
        summary: "Readiness is a story. Voice is the cure.",
        body: "You will not feel ready. This is not a flaw in you. This is the design. The version of you that feels ready is the version that has already done the speaking. You cannot reach her by waiting. You can only reach her by speaking, badly, in public, before you feel like you have earned the right to.\n\nReadiness is a story the Matrix tells to keep you in preparation forever. There is always one more course to take, one more book to read, one more credential to acquire, one more version of the message to polish. Each of these is real and none of them will make you ready. The work itself makes you ready. There is no other path.\n\nThe practice in this lesson is the Daily Declaration. One sentence. Out loud or written. Every day. The sentence does not have to be brilliant. It does not have to be original. It only has to be true. \"I think most people are quietly exhausted.\" \"I think we are pricing creative work wrong.\" \"I think the way we talk about grief is broken.\" Whatever the sentence is, the practice is to say it. Today. And tomorrow. And the day after.\n\nAlongside the declaration is the Public Post. One honest public act this module. A status. A story. A short video. A reply. Something that has your actual voice on it and your name attached, in a place where someone you do not know could see it. Press publish before you have decided whether it is good. The decision about whether it is good is not yours to make. Your job is to ship.\n\nThis is how the voice gets strong. Not by waiting. By using it. The reps are the practice. The polish comes later. Begin now.",
      },
    ],
    exercises: [
      {
        id: "exercise-1",
        number: 1,
        title: "The Voice Inventory",
        time: "20 min, once",
        instructions:
          "Sit with a blank page. Write down every message you have been carrying that you have not said out loud. Not the polished version. The raw one. The one that scares you a little. The opinion you have at dinner that you swallow. The thing you would say to your industry if you had no fear of being unhired. The thing you would say to a younger version of yourself.\n\nDo not edit. Do not curate. Write fast. The hand should move faster than the inner critic. Aim for at least ten entries.\n\nWhen you are done, read it back. Circle the one or two that, when you read them, you feel in the chest — not the head. Those are the seeds of the message that will not leave you alone. Keep the page. You will use it in the Daily Declaration.",
      },
      {
        id: "exercise-2",
        number: 2,
        title: "The Daily Declaration",
        time: "5 min, daily for 14 days",
        instructions:
          "Every day, for fourteen days, one sentence. Written or spoken. Pulled from the Voice Inventory or arrived at fresh.\n\nThe sentence must be true. It does not have to be brilliant. It does not have to be original. It only has to be something you actually believe. \"I think we are overworking the wrong things.\" \"I think most of what we call ambition is fear.\" \"I think the people who taught us about money were also broke.\"\n\nWrite it where you can see it — a sticky note, a phone note, a recording of your own voice. The point is the repetition. The voice gets stronger by use. Fourteen days. Same time each day if you can. The Companion can hold the declarations if you want a witness. You do not have to share them publicly yet. That comes next.",
      },
      {
        id: "exercise-3",
        number: 3,
        title: "The Public Post",
        time: "30 min, once",
        instructions:
          "One honest public post during this module. One. Anywhere — a status, a story, a short video, a reply, a substack note, a LinkedIn paragraph. The platform does not matter. The honesty does.\n\nWrite it. Read it once. Do not edit for politeness. Edit only for truth — does this say what I actually mean? When the answer is yes, press publish. Set a timer for thirty minutes total. If the post is not out by the end of the thirty minutes, post the draft anyway.\n\nDo not check the response for an hour after posting. The response is not the point. The act of pressing publish on something true is the point. You can debrief with the Companion afterward — what came up, what almost stopped you, what shifted in the body once the post was out. The first one is the hardest. After it, the rest are easier.",
      },
    ],
    companionTone: "practical, clarifying — what's the next step? what's the obstacle?",
    companionRole:
      "The Companion shifts gear. Less what do you notice? More what's the next step? The work of these two weeks is action. When you bring a draft, a declaration, a post you've been sitting on, the Companion will ask: what's the obstacle? and what would you do if no one was watching? The Companion holds you to the work. No more hiding.",
    integration:
      "The Morning Ritual pairs with the meditation theme \"I speak from the truth of who I am.\" The sleep meditation — \"I rest in the truth I've spoken.\" — closes the day's declaration. The identity statement for Weeks 5-6 is My voice is mine. The world needs to hear it. The Daily Declaration is the practice; the rest of the work is the container around it. The ritual primes the voice in the morning. The sleep meditation settles what was spoken. The day in between is where the speaking lives.",
    bridge:
      "You have a voice and you're using it. Now we put a body around it. Module 4 is about the brand — the shape your work takes, the platform it lives on, the body of work that compounds over time. The voice was the seed. The brand is the soil. Let's go deeper.",
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
    promise:
      "A brand is not a logo. It is not a color palette. It is the body of work you are willing to put into the world on a regular basis. Module 4 is about the practice of building that body of work — without waiting for permission, without waiting for the audience, without waiting for the platform to make sense.\n\nThe myth of the platform will be the first thing we set down. The platform is not the point. The work is the point. The work compounds. The audience arrives because the work was there first.\n\nBy the end of Module 4, you will have a content cadence you can sustain, a 100-post commitment you have begun, and a clear sense of the body of work you are building. The brand isn't finished. It is in motion.",
    lessons: [
      {
        slug: "4.1",
        title: "What a brand actually is (and isn't)",
        duration: "14 min read",
        summary: "Not a logo. Not a colour. A signal.",
        body: "A brand is not a logo. A brand is not a color palette. A brand is not the font on your website. Those are decorations. A brand is the compound result of showing up — the body of work you have put into the world, the patterns inside that work, and the signal that emerges when the patterns become recognizable.\n\nMost brand advice misses this because most brand advice is sold by people whose job is to make logos. The logo is downstream of the work. The work is upstream of the audience. Reversing that order is the most expensive mistake people make in this phase, and it is the reason a thousand beautifully designed brands have nothing to say.\n\nA real brand answers a simple question: what does this person reliably bring into the room? Reliable is the word that matters. One post is not a brand. One workshop is not a brand. One viral moment is not a brand. A brand is the pattern that emerges across a hundred posts, ten workshops, three years of showing up with the same message in slightly different costumes.\n\nThis means the brand is not built in a planning document. It is built in the doing. The doing reveals what you actually care about, who you actually want to serve, what you actually have to say. You cannot think your way into a brand. You can only work your way into one. Every time you publish, the signal sharpens. Every time you do not publish, it stays vague.\n\nThis lesson asks you to stop trying to design the brand and start trying to build the body of work. The brand will emerge from the body of work the same way a face emerges from a photograph as it develops. You cannot rush the developing. You can only keep showing up to the work. That is the brand. Everything else is decoration.",
      },
      {
        slug: "4.2",
        title: "The platform myth",
        duration: "12 min read",
        summary: "You don't need a million people. You need the right ones.",
        body: "The platform myth says that if you pick the right channel, the audience will arrive. It is the most expensive lie in this entire phase of the program. Picking the platform feels like work. It is not work. It is delay dressed as strategy.\n\nThere is no perfect platform. There is no waiting platform full of the people who would love you if only you spoke to them on Substack instead of LinkedIn, or TikTok instead of YouTube, or your own newsletter instead of someone else's. The platform is downstream of the work. The work is upstream of the audience. The audience finds the work — eventually, slowly, less romantically than you imagined — when the work is consistently there.\n\nThis is not a counsel against strategy. It is a counsel against using strategy as a hiding place. Pick a platform. Almost any of them work. Decide based on which one you can reasonably show up to twice a week for a year. That is the only criterion that matters. The platform you will actually publish on is infinitely better than the perfect platform you will not.\n\nThe second part of the platform myth is the audience-size obsession. You do not need a million people. You need the right hundred. A hundred people who actually want what you make is a business. A million followers who scrolled past you is not. The internet has rewired the way we think about scale and broken the thing that actually pays: depth.\n\nThis week the practice is to stop optimizing the platform and start producing the work. Pick the channel. Set the cadence. Begin. The platform is a delivery mechanism. The work is what is delivered. Build the work. The rest is logistics.",
      },
      {
        slug: "4.3",
        title: "Building the body of work",
        duration: "15 min read",
        summary: "Volume is its own teacher.",
        body: "Volume is the price of clarity. You cannot think your way to your sharpest message. You can only publish your way there. The first thirty pieces will teach you what you actually have to say. The next thirty will teach you how to say it. The next thirty will start to compound. There is no shortcut. Anyone who tells you there is is selling something.\n\nThis is the unglamorous truth that breaks most people in this phase. They are looking for the one piece that will work. There is no one piece. There is a body of work, and the body of work works as a whole. Each individual post is a brick. No single brick is the building. The building is what emerges from a thousand bricks laid in roughly the same direction over a long enough period of time.\n\nThe second thing volume teaches is taste. You do not know what is good in your own work until you have made enough of it to start to notice the patterns. Which pieces felt easy. Which ones got the response. Which ones surprised you. Volume reveals the signal inside the noise. Without volume, you are guessing.\n\nThe third thing volume teaches is discipline. Discipline is the muscle of showing up on a day when the post you wrote is not your best work, and publishing it anyway, because the cadence is the practice. The pieces themselves matter less than the act of holding the cadence. The cadence builds the body. The body builds the brand. The brand builds the audience. The audience builds the income. The whole chain depends on the first link, which is you, showing up to publish a piece you do not love because you said you would.\n\nThis lesson asks for the 100-Post Commitment. A hundred pieces. On the cadence you pick. The point is not the number. The point is the practice. Begin.",
      },
      {
        slug: "4.4",
        title: "Showing up before the audience arrives",
        duration: "10 min + practice",
        summary: "The first 100 are for you.",
        body: "The hardest discipline in this whole module is showing up when no one is watching. The first thirty posts will get almost no response. This is the design, not a failure. The audience does not arrive at post one. The audience arrives at post forty or sixty or a hundred, and only because the first thirty were there to be found when they did.\n\nThis is where most people quit. They publish for two weeks, see modest numbers, decide the work is not working, and stop. Then they pick a new platform, redesign the brand, write a new strategy doc, and publish for two weeks. The cycle is the trap. The cycle is the platform myth and the readiness story holding hands.\n\nThe practice for this week is to publish without checking. Schedule the post. Close the app. Do not look at the response for a day. Then a week. Then begin to barely look at all. The dopamine of the response is the most efficient way to stop publishing the work that matters. The response shapes the work toward the algorithm. The algorithm is not your audience. The algorithm is a slot machine wearing a friend's clothing.\n\nShow up before the audience arrives. Publish for the version of you who is doing the work, not for the audience who is not yet there. Trust that the audience finds the work because the work is good and the work is there. Both have to be true. Neither is enough alone.\n\nThis is the practice that builds a real body of work and a real brand and, eventually, a real audience. It is the slowest of the four lessons in this module and the most important. The body of work compounds in silence before it compounds in public. Stay in the silence. Keep building. The audience is on its way. Your job is to make sure the work is there when they arrive.",
      },
    ],
    exercises: [
      {
        id: "exercise-1",
        number: 1,
        title: "The Brand Audit",
        time: "30 min, once",
        instructions:
          "Sit down with everything you have already put into the world — posts, articles, talks, videos, threads, comments, anything with your name on it. If there is very little, that is also useful data. List what is there.\n\nLook for patterns. What themes keep coming back? Which pieces felt most true when you made them? Which ones got the response that mattered (not the most likes — the response from the right person)? Which ones did you hate making? Which ones did you love?\n\nWrite down three things you want to keep doing, two things you want to stop doing, and one thing you have not yet done that the audit suggests you should. This is the foundation for the Content Cadence. The Companion can hold the audit if you want a second set of eyes.",
      },
      {
        id: "exercise-2",
        number: 2,
        title: "The Content Cadence",
        time: "30 min, then ongoing",
        instructions:
          "Decide a cadence you can hold for a year. Not the cadence you wish you could hold. The cadence you can actually hold on the worst Tuesday of February when nothing is going right.\n\nFor most people this is two pieces a week. For some it is one. For very few it is daily. Pick the one you will not break in week three. Write it down. Pick the platform. Pick the days. Pick the time of day.\n\nNow build the smallest possible infrastructure that lets you hold the cadence — a notes app for ideas, a recurring calendar block for writing, a place to schedule the post. Make it boring and repeatable. The cadence is the discipline. The discipline is the brand. The Companion can hold the schedule and ask you about it weekly if that helps.",
      },
      {
        id: "exercise-3",
        number: 3,
        title: "The 100-Post Commitment",
        time: "ongoing",
        instructions:
          "Commit, in writing, to one hundred posts on the cadence you chose. Sign your name to it. The number matters because the number is the antidote to the readiness story. You cannot quit at post seventeen if you have committed to a hundred.\n\nKeep a simple tracker — a spreadsheet, a notes page, a notebook. Mark each post off as it goes out. Do not measure the response. Measure the publishing. The point of this exercise is not the quality of any single post. It is the proof, in your own data, that you can hold a body of work over time.\n\nReport progress to the Companion every two weeks. Use those check-ins to debrief — what is getting easier, what is still hard, what the volume is starting to teach you. The hundred posts is the practice. Everything you need to learn about your brand is hiding inside it.",
      },
    ],
    companionTone: "practical, clarifying — what's the next step? what's the obstacle?",
    companionRole:
      "The Companion is your project manager. When you bring a piece of content, a post, a hesitation about the platform, the Companion will ask: what's the cadence? and what's the next piece? The work of these two weeks is the discipline of output. The Companion holds you to it. No more waiting for the moment. The moment is the work.",
    integration:
      "The Morning Ritual pairs with the meditation theme \"I build the work, one piece at a time.\" The sleep meditation — \"I release the need for the audience to be here yet.\" — releases the comparison. The identity statement for Weeks 7-8 is I show up before the audience arrives. The Content Cadence is the practice. The rest of the work is the discipline around the practice. The ritual sets the day's intention. The sleep meditation softens the unmet hunger for response. The body of work grows quietly in between.",
    bridge:
      "You have a body of work in motion. The voice is amplified. The brand is taking shape. Module 5 is the question that has been underneath all of it: what is the work actually worth? We name it. We price it. We make the first offer. The income arc begins. Let's go deeper.",
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
    promise:
      "The wealth wound is the last thing most people name. The story that money is hard, or that you don't deserve it, or that charging well is selfish. Module 5 is about naming the wealth wound without shame, naming what you actually sell, and pricing it without apology.\n\nThe first offer is not the goal. The first offer is the evidence that the work is worth something to someone other than you. The work was always worth it. The pricing is the practice of saying so out loud.\n\nBy the end of Module 5, you will have a clear offer, a clear price, and a clear plan for the first dollar. The outer-work arc is complete. The built work is ready to be exchanged. Let's go deeper.",
    lessons: [
      {
        slug: "5.1",
        title: "The wealth wound",
        duration: "15 min read",
        summary: "The story you carry about money — and where it came from.",
        body: "Underneath the money story is the wealth wound. The money story is what you say out loud — \"I'm bad with money,\" \"I just don't think about it,\" \"I'd rather focus on the work.\" The wealth wound is the older, quieter thing underneath. The first time you saw the bill make your mother's face change. The fight your parents had about the credit card when you were nine. The cousin who got more. The neighborhood you were not from. The job you took because it was safe. The relationship you stayed in because leaving cost too much.\n\nThe wealth wound is not a flaw in your character. It is data. It is the nervous system's record of what money has meant in your life, and the rules it built to keep you safe inside those meanings. Most of the rules are obsolete. Most of them were written by a child who did the best she could with what was happening around her. The child is not in charge anymore. But the rules are still running.\n\nThe work of this lesson is to name the wound clearly and without shame. Not to fix it today. Just to see it. To find the family layer of it. The cultural layer of it. The specific moments that taught you what money was for and what you were allowed to have.\n\nNaming the wound is the first sovereign act with money. As long as the wound is unnamed, it drives the pricing, the asking, the receiving, and the savings. It will under-price the work. It will apologize for the invoice. It will refuse the gift. It will spend the windfall before it can be felt. Named, the wound loses the wheel. You are not free of it yet. You are no longer driven by it without your consent.\n\nThis is where the income arc begins. Not with a price tag. With a story, finally said out loud.",
      },
      {
        slug: "5.2",
        title: "What you're really selling",
        duration: "14 min read",
        summary: "Not the thing. The transformation.",
        body: "You are not selling the deliverable. You are selling the change in the person who buys it. This is the second-most expensive mistake people make in their first offer. They price the hours. They price the deliverable. They price the file or the call or the document. None of that is what the buyer is paying for. The buyer is paying for the version of themselves on the other side of the work.\n\nThis is not a manipulation. This is how value actually works. People pay for what changes. The more clearly you can articulate the change, the more clearly you can price the work that produces it. A coaching call is not worth an hour of your time. A coaching call is worth the clarity it produces in the person who took it, multiplied by how badly that person needed the clarity and how many years they have spent without it.\n\nThe practice of this lesson is to write down the transformation, not the deliverable. What does the person walk away with that they did not have before? What is now true about their life or their work that was not true before? What problem is solved? What decision is made? What weight is set down? Write it specifically. Write it in their language, not yours.\n\nOnce you have the transformation, the deliverable is just the vehicle. The vehicle can be a session, a workshop, a course, a retainer, a product. It does not particularly matter. The transformation is what is being purchased. The vehicle is how you deliver it.\n\nThis reframe changes everything about pricing. You are no longer pricing your time, which is finite and small. You are pricing the change in someone's life, which is, when it lands, almost incalculably valuable. The work in front of you for the rest of this module is to learn to charge in that direction without apology and without shame.",
      },
      {
        slug: "5.3",
        title: "Pricing without apology",
        duration: "13 min read",
        summary: "Numbers that match the work, not the wound.",
        body: "There are two prices for any piece of work. The price the wound proposes and the price the work is worth. The wound's price is always lower. The wound's price is shaped by the family layer (money is hard), the cultural layer (don't ask for too much), and the specific moments in your past when asking for what you needed cost you something you could not afford to lose. The wound knows how to keep you small. It is very good at it.\n\nThe work's price is different. The work's price is shaped by the transformation it produces, the time and skill it took to build, and the cost to the person of not doing it. The work's price is usually two to five times higher than the wound's price. This gap is not arrogance. It is just accurate.\n\nThe practice of this lesson is to learn to sit with the gap without flinching. Write down the wound's price. Write down the work's price. Notice the difference. Notice what comes up in the body when you write the work's price down. That is the wound, in real time, in the room with you, making its case for the smaller number.\n\nUnder-pricing is not humility. Under-pricing is self-abandonment dressed as virtue. It tells the buyer that the work is not worth what it is worth. It tells the nervous system that the wound is in charge. It guarantees a business model that cannot sustain you, which guarantees the burnout, which guarantees the resentment, which guarantees the eventual exit from the work you were called to do.\n\nThe math of a sustainable practice is not optional. It is the precondition for being able to do this work for a decade. Price the work for the version of you who is still doing this in ten years. Price the work for the buyer who actually wants the transformation enough to pay for it. Price the work without apology. Then ship the offer.",
      },
      {
        slug: "5.4",
        title: "The first offer",
        duration: "15 min + practice",
        summary: "Ship it before it's perfect. Especially before it's perfect.",
        body: "The first offer is not the goal. The first offer is the proof. Proof that the work is worth something to someone other than you. Proof that you can ask for it without dying. Proof that the wealth wound, named in lesson 5.1, can be moved through. Proof that the chain works: voice, brand, offer, exchange.\n\nThe first offer should be small enough to ship this week and real enough to test the chain. Not the dream offer. Not the most elegant version. Not the funnel you have been planning for two years. The smallest, truest, most-shippable thing you can put in front of a person and ask for money for. A single session. A short workshop. A small bundle. A consultation. The form does not matter. The act of putting it into the world with a price on it is what matters.\n\nThe practice of this lesson is to write the offer outline, set the price (the work's price, not the wound's), and make the first dollar plan. Who do you tell? What do you say? What is the smallest version of the offer that is still true to the transformation? Where does the buyer click, reply, or pay? Make it boring and concrete. Romance is the enemy of the first offer. Logistics is its friend.\n\nThen ship it. This week. Not next month. This week. You are going to want to wait until you have made the website, refined the copy, picked the perfect platform, written the email sequence. None of that matters. The first offer can be sent in a single email or a single DM or a single post. The polish comes after the first dollar, not before.\n\nThe first dollar changes everything. Not because of the dollar. Because of what it proves to the nervous system: the work is wanted. People will pay for it. You are allowed to ask. You are allowed to receive. The whole module has been pointing at this moment. Ship.",
      },
    ],
    exercises: [
      {
        id: "exercise-1",
        number: 1,
        title: "The Money Story Inventory",
        time: "25 min, once",
        instructions:
          "Open a fresh page. Write down every belief you hold about money. Start with the loud ones — \"money is hard,\" \"rich people are greedy,\" \"I'm bad with money\" — and keep going until you reach the quieter ones underneath.\n\nFor each, ask: where did this come from? Family? Culture? A specific moment? An ex? A boss? A teacher? Write the source next to the belief.\n\nThen ask: what has this belief cost me? Be specific. The unasked raise. The under-priced project. The opportunity not taken. The job stayed at too long.\n\nDo not try to release any of it today. The point is to make the wound visible. The Companion can hold the page if you want to talk through what came up. Take the full twenty-five minutes. This is the foundation for the pricing work.",
      },
      {
        id: "exercise-2",
        number: 2,
        title: "The Offer Outline",
        time: "45 min, once",
        instructions:
          "Write a one-page outline of your first offer. Not a sales page. An outline. It should answer five questions, in plain language:\n\n1. What is the offer? (the vehicle — a session, a workshop, a product, a retainer)\n2. Who is it for? (be specific — the person, not the demographic)\n3. What is the transformation? (what is different about their life after they buy)\n4. What does it cost? (the work's price, not the wound's)\n5. How do they buy? (the boring logistics — the link, the email, the calendar)\n\nWrite it for one specific person you can picture. Not the market. The person. The outline should be shippable as an email or a post with very little additional work. The Companion can review it with you and stress-test the price.",
      },
      {
        id: "exercise-3",
        number: 3,
        title: "The First Dollar Plan",
        time: "30 min, once",
        instructions:
          "Write the smallest possible plan for the first dollar. Who do you tell? Make a list of five to ten specific people who might want the offer. Not the audience at large. Named people.\n\nFor each, write what you would say in one paragraph — honest, direct, no marketing voice. \"I've built this thing. Here is what it does. Here is what it costs. Would this be useful for you?\"\n\nSet a deadline within seven days for sending the first one. Set a second deadline within fourteen days for sending all of them. The Companion can hold the deadlines and ask you about them. Do not let the plan turn into a launch. The plan is a series of one-to-one asks. The first dollar comes from a person, not from a funnel. Begin with the person.",
      },
    ],
    companionTone: "practical, clarifying — what's the next step? what's the obstacle?",
    companionRole:
      "The Companion is your pricing strategist. When you bring the offer, the price, the hesitation, the Companion will ask: what is this worth? and what would you charge if no one was watching? The work of these two weeks is the unapologetic exchange. The Companion holds you to it.",
    integration:
      "The Morning Ritual pairs with the meditation theme \"I am willing to be paid for the truth I carry.\" The sleep meditation — \"I release the wealth wound. I am safe to receive.\" — does the deeper work the day cannot do. The identity statement for Weeks 9-10 is I price my work without apology. The First Dollar Plan is the action. The rest of the work is the unworthiness underneath it. The ritual primes the day. The sleep meditation moves the wound at the nervous-system layer. The first dollar happens in between.",
    bridge:
      "You have built the work, named the message, priced the offer, and made the first exchange. The outer-work arc is complete. Module 6 is the integration — the 5 Sovereign Laws, the practice of staying free, the closing arc. The certificate. The graduation. The Sovereignty Call. Let's go deeper.",
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
    promise:
      "You have done the work. 90 days. Six modules. The awakening, the stripping, the voice, the brand, the income, and now — the protection. Module 6 is about the practice of staying free. The discipline of not slipping back into the Matrix. The 5 Sovereign Laws, written down, lived out, integrated.\n\nThe work of these two weeks is the opposite of building. The work is integrating what you have built. Writing it down so you don't forget. Naming the laws that will hold you when the practice is over. Closing the arc with the dignity it deserves.\n\nBy the end of Module 6, the program is complete. The certificate is generated. The Sovereignty Call with William is unlocked — a 75-minute 1-on-1 for members who want to go further. You are sovereign. You are free. You are protected. Let's go deeper.",
    lessons: [
      {
        slug: "6.1",
        title: "The 5 Sovereign Laws (overview)",
        duration: "16 min read",
        summary: "The architecture you take with you.",
        body: "Underneath everything you have done in the last 90 days are five laws. They are not rules. They are not affirmations. They are the operating logic of sovereignty itself. You have been living inside them already — you have just not had names for them. The names are the gift of this lesson. Naming them turns them from instinct into architecture, and architecture is what holds when motivation does not.\n\nThe 5 Sovereign Laws are: The Law of Witnessing — you cannot change what you cannot see. The Law of Releasing — letting go is the door to letting in. The Law of Voice — the message you cannot stop speaking is the one the world needs. The Law of Exchange — you cannot receive what you are not willing to give. The Law of Protection — freedom is not the absence of constraint, it is the presence of a sovereign frame.\n\nThe Law of Witnessing is Module 1. You spent two weeks proving it in your own life. In practice, it looks like the daily pause that names what is actually running you. The cost of ignoring it is a life on autopilot, lived on inheritance you did not choose.\n\nThe Law of Releasing is Module 2. You spent two weeks setting down what was never yours. In practice, it looks like the willingness to feel the weight of an inherited belief and let it move through the body. The cost of ignoring it is a body that carries other people's agreements until it breaks.\n\nThe Law of Voice is Module 3. You spent two weeks letting the honest thing out of your chest. In practice, it looks like the small, daily act of saying the true sentence out loud, in public, on a cadence. The cost of ignoring it is the slow erosion of self-trust as the message accumulates unspoken.\n\nThe Law of Exchange is Modules 4 and 5. You spent four weeks building the work and pricing it without apology. In practice, it looks like the willingness to ask for what the work is worth and to receive what is offered in return. The cost of ignoring it is a life of giving without receiving, which is unsustainable on every layer — financial, emotional, energetic.\n\nThe Law of Protection is this module. In practice, it looks like the deliberate construction of a sovereign frame — the daily, weekly, monthly practices that keep the Matrix from quietly reclaiming the ground you have won. The cost of ignoring it is the slow drift back. Freedom without protection does not last. The frame is what protects the freedom.\n\nThese are the five. Memorize them. Live them. They are yours.",
      },
      {
        slug: "6.2",
        title: "The practice of staying free",
        duration: "14 min read",
        summary: "Sovereignty is a posture, not an arrival.",
        body: "Sovereignty is not an arrival. There is no day on which you are done. The Matrix is not a place you escape once. It is a current that runs underneath every day for the rest of your life, and the practice of staying free is the practice of swimming against it on a cadence you can actually hold.\n\nThis is the discipline the program is for. Without the discipline, the 90 days are a memory. With it, they are a foundation. The difference between the two is not motivation. Motivation is unreliable. The difference is structure — daily, weekly, monthly, yearly practices that hold the sovereignty in place even on the days when you do not feel sovereign.\n\nThe daily practice is the Morning Ritual, the witnessing pause, the truth said out loud. Twenty minutes total, most days. Not perfect. Habitual. The day belongs to the Matrix until you take it back, and you take it back through the ritual. Skip the ritual for a week and you will feel the current pulling. Resume the ritual and the current loosens. This is just how it works.\n\nThe weekly practice is the reflection. Once a week, the three questions: what was true this week, what was the Matrix, what stays. Half an hour. Written. With the Companion or alone. The week becomes data. The data becomes pattern. The pattern becomes the curriculum for the next week.\n\nThe monthly practice is the integration check. Once a month, you look at the 5 Sovereign Laws and ask: which of these am I living, and which am I slipping on? You catch the drift early. The drift is always early. By the time it is obvious, it is months in.\n\nThe yearly practice is the larger arc. Once a year, the full integration. What stays. What goes. What you commit to. The yearly practice is the version of the Sovereignty Plan you write in this module, refreshed.\n\nThis is what staying free looks like. It is not glamorous. It is just durable. Do it for a year and you will not be the same person. Do it for ten, and the work you built in these 90 days will look like the beginning of something much larger. Sovereignty is a posture you keep returning to. The returning is the practice.",
      },
      {
        slug: "6.3",
        title: "The integration",
        duration: "12 min reflection",
        summary: "What stays. What goes. What you commit to.",
        body: "Integration is the part of the program that does not look like work. It looks like sitting with a notebook and asking honest questions. It is the most important week of the 90 days, and it is the one most people skip.\n\nThe arc you have walked is real. Week 1 you said \"I am sovereign\" tentatively, almost as a question. Week 12, the identity statement is \"I am sovereign. I am free. I am protected.\" The distance between those two sentences is the program. The integration is the practice of noticing the distance and naming what made it possible.\n\nThe three questions of integration are simple and not easy. What is true now that was not true 90 days ago? What stays? What do you want to remember?\n\nThe first question is the data. List the things specifically. The new daily practice. The voice you began to use. The offer you shipped. The wound you named. The belief you released. Be granular. Vague answers will fade. Specific answers compound.\n\nThe second question is the discipline. Of everything you have built in 90 days, what stays? Not what you wish would stay. What you commit to. This is the Sovereignty Plan in the next exercise. The honest answer is usually shorter than the wishful answer. Shorter is better. A practice you actually hold is infinitely more valuable than a practice you intend to hold.\n\nThe third question is the legacy. What do you want to remember? In two years, when the program is far behind you, what do you want to be sure you have kept? Write it down somewhere you will see it again. Future you will not remember unless past you wrote it down with care.\n\nThe integration is the architecture that lets the 90 days become a decade. Without it, the work fades. With it, the work compounds. Do the work of this week. Sit with the notebook. Answer the three questions with the honesty you have earned.",
      },
      {
        slug: "6.4",
        title: "The graduation",
        duration: "10 min",
        summary: "Not the end. The threshold.",
        body: "This is the closing. Not the end. There is no end. There is a threshold you have crossed, and on the other side of the threshold is the rest of your life, which is now structured by what you built in these 90 days.\n\nYou earned the milestones in sequence. Awakened, after the inner-work begins. Stripped, after the releasing. Built, after the offer ships. Sovereign, after the Laws are named and integrated. Graduated, when the program is complete. The certificate exists not as a credential but as a witness. There is now a record, with your name on it, that the work was done.\n\nThe Sovereignty Call with William is unlocked from this point. A 75-minute 1-on-1 for the members who want to go further. The Call is not a graduation present. It is the next door. It is for the people who want to take the foundation built here and put it under something larger — a brand, a body of work, a practice, a business, a life. The Call is the bridge to whatever comes next, and it is yours to use when you are ready.\n\nThe closing of this module is the same closing as the closing of the program. You are sovereign. You are free. You are protected. You have a daily ritual, a weekly reflection, a monthly check, a yearly arc. You have a Sovereignty Plan. You have a voice you are using. You have a body of work in motion. You have an offer in the world. You have the 5 Sovereign Laws written down where you can see them.\n\nThe work continues. The practice continues. The Companion remains here as long as you remain a member. The Sovereignty Call is available when you want it. The community of initiates continues. The arc does not end. It widens.\n\nThis is the threshold. Cross it with the dignity it deserves. The work was real. The work mattered. The work is yours, now, for the rest of your life. Let's go deeper.",
      },
    ],
    exercises: [
      {
        id: "exercise-1",
        number: 1,
        title: "The 5 Sovereign Laws Deep Reflection",
        time: "60 min, once",
        instructions:
          "Sit down with a notebook and the 5 Sovereign Laws. For each law, three questions, in order:\n\n1. What does this law mean in my life specifically? Not in theory. In my own days.\n2. Where have I lived it? Find a concrete moment in the last 90 days where this law was operating.\n3. Where have I not? Find a place — recent or chronic — where this law is being ignored and what it is costing.\n\nWrite the answers by hand if you can. Take the full hour. Do not rush. This reflection is the doctrinal spine of the program. The Companion can hold the answers and reflect them back if you want a second voice in the room. The point is to make the Laws yours — not memorized, lived.",
      },
      {
        id: "exercise-2",
        number: 2,
        title: "The Integration Letter to Future Self",
        time: "30 min, once",
        instructions:
          "Write a letter to yourself one year from today. Date it. Address it to your name.\n\nTell future you what is true now that was not true 90 days ago. Tell future you what you want her to remember. Tell future you what you have committed to. Tell future you what to do if she has drifted — which ritual to return to, which Law to read, which practice to resume.\n\nBe specific. Be tender. Speak to her the way the Companion has spoken to you. When you are done, seal it — in a paper envelope you put in a drawer, in a scheduled email to yourself, in a note pinned in your phone with a reminder set for one year out. Future you will need this letter. Past you is the only person who can write it. Take the thirty minutes and write it.",
      },
      {
        id: "exercise-3",
        number: 3,
        title: "The Sovereignty Plan",
        time: "45 min, once",
        instructions:
          "Write the plan for staying free. One page. Four sections.\n\n1. The daily practice. What you commit to every day. Be honest. A 10-minute ritual you actually do is infinitely better than a 60-minute ritual you intend to do.\n2. The weekly practice. The reflection cadence. The day, the time, the three questions.\n3. The monthly practice. The integration check against the 5 Sovereign Laws.\n4. The yearly practice. The bigger arc — the version of this plan you will rewrite a year from now.\n\nAlso write: what stays from the 90 days. What goes. What you commit to going forward. Sign it. Date it. Put it somewhere you will see it — pinned in your notes, printed and on a wall, saved in the Companion. The Plan is the architecture of your sovereignty going forward. Write it with the care it deserves.",
      },
    ],
    companionTone:
      "witnessing, integrating — what's true now that wasn't true 90 days ago? what stays?",
    companionRole:
      "The Companion becomes a witness, not a strategist. When you bring the reflection, the integration, the letter to your future self, the Companion will ask: what's true now that wasn't true 90 days ago? and what stays? and what do you want to remember? The work of these two weeks is the integration. The Companion holds it with you.",
    integration:
      "The Morning Ritual pairs with the meditation theme \"I walk in the freedom I've claimed.\" The sleep meditation — \"I rest in the sovereignty I've built.\" — closes the program with the dignity it deserves. The identity statement for Weeks 11-12 is I am sovereign. I am free. I am protected. The Sovereignty Plan is the container for what stays. The rest of the work is the living of it. The ritual is no longer a beginning. It is now a practice you carry into the rest of your life.",
    bridge:
      "There is no next module. The program is complete. What is in front of you now is the rest of your life, structured by what you built here. The certificate is yours. The Sovereignty Call with William is unlocked — a 75-minute 1-on-1 for those who want to take the foundation built here and put it under something larger. The Companion remains. The community remains. The practice remains. Cross the threshold with the dignity it deserves. Let's go deeper.",
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
