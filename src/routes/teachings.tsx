import { createFileRoute } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/teachings")({
  head: () => makeRouteMeta({
    title: "Teachings — Hidden Truths of Life",
    description: "An evolving codex on consciousness, the multiverse, intelligent species, and the spirit world.",
  }),
  component: TeachingsPage,
});

const categories = [
  {
    t: "The 3D World",
    d: "The hidden architecture of life on Earth — history rewritten, the nature of money and matter, the body as a sacred instrument.",
    items: ["Lost human history", "The veiled nature of money", "The body as antenna"],
  },
  {
    t: "Beyond the Stars",
    d: "Other planets, star systems, and the civilizations seeded across the cosmos — what the elders and the new contactees agree upon.",
    items: ["Pleiadian, Sirian & Arcturian lineages", "The Galactic federation question", "Star seeds & soul origins"],
  },
  {
    t: "Intelligent Species",
    d: "The many forms consciousness takes — benevolent, neutral, and shadow. Discernment as spiritual practice.",
    items: ["Benevolent guardians", "Tricksters & service-to-self beings", "Inter-species communication"],
  },
  {
    t: "The Spirit World",
    d: "Ancestors, guides, departed loved ones, and the realms between lives. How to listen, and how to verify.",
    items: ["Ancestral healing", "Working with guides", "Between-life realms"],
  },
  {
    t: "Heart-Brain Coherence",
    d: "The measurable, sacred state where heart and mind synchronize — a doorway to intuition, healing, and remembrance.",
    items: ["The heart's electromagnetic field", "Coherence breathing", "Group field amplification"],
  },
];

function TeachingsPage() {
  return (
    <PageShell
      eyebrow="✦ The Veil Is Thinning · The Codex ✦"
      title="Hidden Truths of Life"
      intro="A living library of teachings from the seen and unseen — offered as inquiry, not dogma. Take what resonates, leave the rest."
    >
      <div className="space-y-8">
        {categories.map((c) => (
          <article key={c.t} className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-serif text-3xl text-foreground">{c.t}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.d}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {c.items.map((i) => (
                <li key={i} className="rounded-lg border border-border/60 bg-background px-4 py-3 text-sm text-foreground">
                  {i}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-cosmos)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Life in the Spirit World</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            What happens when the body falls away? Two of the most thorough modern explorers of this
            question — <em>Dolores Cannon</em>, through her Quantum Healing Hypnosis Technique (QHHT),
            and <em>Dr. Michael Newton</em>, through Life Between Lives regression (documented in
            <em> Journey of Souls</em> and <em>Destiny of Souls</em>) — independently gathered thousands of
            client accounts that converge on a remarkably consistent picture of the realms between incarnations.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Crossing</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Newton's subjects describe leaving the body gently, often greeted by a guide or a
                beloved soul. There is no judgment at the threshold — only a homecoming. Cannon's
                clients, speaking from what she called the Subconscious or Higher Self, echo this:
                death is a remembering, not an ending.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Soul Groups & Cluster Families</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                In <em>Destiny of Souls</em>, Newton maps how souls travel in primary clusters of
                3–25 — kindred beings who reincarnate together across lifetimes, switching roles
                (parent, lover, rival, friend) to help one another grow. These are the "soul family"
                bonds you sometimes feel instantly with a stranger.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Council of Elders</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Newton describes a panel of advanced beings — wise, loving, never punitive — who
                meet with each soul to review the lifetime just lived and to help shape the next.
                Cannon's Higher Self sessions point to the same orchestrating intelligence: every
                hardship was chosen, every gift was earned, every contract was agreed upon before birth.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Healing & Restoration</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Souls returning from traumatic lifetimes are bathed in healing light, sometimes for
                what feels like ages of Earth time. Cannon's work emphasizes that the body itself
                can be healed in this state — many QHHT clients reported physical conditions resolving
                once the soul understood their purpose.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Soul Specializations</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <em>Destiny of Souls</em> details how older souls take on roles — Healers, Teachers,
                Designers of worlds, Watchers, Hybrids who incarnate on multiple planets. Cannon's
                "Three Waves of Volunteers" describes souls who came to Earth specifically now, from
                elsewhere, to help humanity through this great shift.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Choosing the Next Life</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Before returning, the soul previews potential lives — bodies, parents, eras, the
                lessons each path offers. Nothing is forced. The Self chooses, often selecting the
                very challenges the human personality will later resist most fiercely. The hardest
                lives are usually chosen by the bravest souls.
              </p>
            </article>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <h3 className="font-serif text-xl text-foreground">Further Study</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>📖 <em>Destiny of Souls</em> — Michael Newton (the deeper companion to <em>Journey of Souls</em>)</li>
              <li>📖 <em>The Convoluted Universe</em> series — Dolores Cannon</li>
              <li>📖 <em>Three Waves of Volunteers and the New Earth</em> — Dolores Cannon</li>
              <li>📖 <em>Between Death and Life</em> — Dolores Cannon</li>
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">
              We hold regular study circles on these texts at the center. See Events for the next gathering.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-sanctuary)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
            The Sensitive Soul & the Weight of the Veil
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Many of the most spiritually sensitive people on Earth have, at some point, struggled
            with alcohol, drugs, food, or other compulsions. This is not a moral failing — it is
            often a sign of a soul wired to perceive more than the dense 3D world is comfortable
            holding. Understanding <em>why</em> the suffering arose is, for many, the beginning of
            the way through it.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Why Sensitives Are Vulnerable</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Empaths, starseeds, and those Dolores Cannon called the "Volunteers" often arrive
                with thinner veils. They feel collective grief, ancestral pain, and unseen
                presences without being taught what they are. Substances become a way to mute a
                signal that was never meant to be muted — only understood and channelled.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Numbing Contract</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Alcohol and many drugs create gaps in the auric field. Cannon's QHHT sessions and
                Newton's between-life work both describe how these openings can invite attachments
                or draining energies that intensify the cycle. The substance promises peace and
                quietly deepens the static.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Remembering Who You Are</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Again and again, people in recovery describe a turning point that was not
                willpower but <em>recognition</em>: I am a soul. I chose this life. The pain I am
                drinking away is information, not a defect. When the self is re-met as eternal,
                the craving loses its grip on the human personality.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Truth About the Universe</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Learning that consciousness survives death, that soul families exist, that this
                Earth experience is a chosen curriculum — these are not abstract ideas for the
                sensitive. They are nervous-system medicine. The world stops feeling hostile and
                random; the sensitivity reveals itself as the gift it always was.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Practices That Replace the Substance</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Breathwork, somatic release, time in nature, grounding, energetic hygiene, sacred
                community, and contemplative study give the body the regulation it was seeking.
                The hunger was never for the drink — it was for stillness, belonging, and contact
                with the unseen. These can be met directly.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Healed Sensitive</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Those who walk through this passage often become the very healers, teachers, and
                guides their younger self needed. The addiction, in hindsight, was the soul
                knocking — insisting that a deeper truth be remembered. Many describe it as the
                hardest and most sacred initiation of their life.
              </p>
            </article>
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">Stories of Recovery Through Awakening</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Composite vignettes drawn from the patterns that show up again and again in
              sensitives who walked this path. Names and details are changed; the arc is real.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Maren, 38</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Drank nightly for a decade to quiet the "noise" of other people. A QHHT session
                  showed her she was an empath who had never been taught to close her field. She
                  learned grounding, stopped within months, and now teaches energetic hygiene to nurses.
                </p>
              </article>
              <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Daniel, 45</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Cocaine became the only thing that matched the velocity of his mind. Reading
                  <em> Destiny of Souls</em> cracked him open — he recognized himself as an old soul
                  exhausted by a heavy contract. Stillness, not stimulation, became his medicine.
                </p>
              </article>
              <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Ana, 29</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Pills kept the visions away since childhood. When a teacher named her gift instead
                  of pathologizing it, the addiction lost its job. She now leads grief circles and
                  hasn't used in four years.
                </p>
              </article>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">Practical Tools & Daily Practices</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Replacement is more powerful than restriction. These are the practices most often
              named by sensitives who found freedom.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Grounding", d: "Bare feet on earth, daily. Reconnects the nervous system to a regulating field." },
                { t: "Breathwork", d: "Conscious connected breathing or box breath to discharge stored activation." },
                { t: "Energetic Hygiene", d: "Cord cutting, salt baths, and clearing the field morning and night." },
                { t: "Cold Water", d: "Brief cold exposure resets vagal tone and provides a clean nervous-system 'high.'" },
                { t: "Sacred Plants", d: "Adaptogens, nervines (skullcap, oats, tulsi), and traditional teas in place of alcohol." },
                { t: "Somatic Release", d: "TRE, shaking practices, and embodied movement to complete trauma cycles." },
                { t: "Meditation & Prayer", d: "Daily contact with the Self and the unseen — even ten minutes restructures craving." },
                { t: "Community", d: "At least one circle, sangha, or recovery group where the soul is seen, not just the symptom." },
                { t: "Sleep & Sunlight", d: "Circadian alignment is the unsexy foundation that makes every other practice work." },
              ].map((p) => (
                <article key={p.t} className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur">
                  <div className="h-1 w-8 rounded-full bg-primary" />
                  <h4 className="mt-3 font-serif text-lg text-foreground">{p.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-primary/30 bg-background/40 p-8 backdrop-blur">
            <h3 className="font-serif text-2xl text-foreground">Reading & Resources</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Voices that have helped many sensitives meet their addiction with understanding instead of shame.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Books</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>📖 <em>In the Realm of Hungry Ghosts</em> — Gabor Maté</li>
                  <li>📖 <em>The Body Keeps the Score</em> — Bessel van der Kolk</li>
                  <li>📖 <em>Destiny of Souls</em> — Michael Newton</li>
                  <li>📖 <em>Three Waves of Volunteers</em> — Dolores Cannon</li>
                  <li>📖 <em>Recovery 2.0</em> — Tommy Rosen</li>
                  <li>📖 <em>The Empath's Survival Guide</em> — Judith Orloff</li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Modalities & Communities</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>🌿 Internal Family Systems (IFS) — meeting the protector parts</li>
                  <li>🌿 Somatic Experiencing & TRE — releasing held charge</li>
                  <li>🌿 QHHT & Life-Between-Lives regression</li>
                  <li>🌿 Refuge Recovery & Y12SR (yoga + 12-step)</li>
                  <li>🌿 Plant medicine ceremony with vetted, ethical facilitators</li>
                  <li>🌿 Local sober sanghas, breathwork circles, and ecstatic dance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">A note of care:</strong> these teachings honour
              the spiritual dimension of addiction, but they are not a replacement for medical
              support. If you or someone you love is in active crisis, please reach out to a
              qualified professional alongside this work. Both paths belong.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-aurora)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-foreground/80">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Heart-Brain Coherence</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/85">
            The heart is not merely a pump. It is the body's most powerful electromagnetic generator — producing
            a field roughly <em>60 times stronger electrically</em> and up to <em>5,000 times stronger magnetically</em>
            than the brain (HeartMath Institute). When heart rhythm, breath, and brainwaves synchronize into a smooth,
            harmonic pattern, the body enters <em>coherence</em>: a measurable state where intuition sharpens, healing
            accelerates, and the veil between self and Source thins.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Heart's Intelligence</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The heart contains roughly 40,000 sensory neurons — its own "little brain" (the intrinsic cardiac
                nervous system) that senses, learns, remembers, and sends more signals up to the brain than the brain
                sends down. Ancient traditions placed wisdom in the heart for good reason; modern neurocardiology is
                only now catching up.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">What Coherence Feels Like</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A quiet warmth in the chest. The mind softens. Time slows. Decisions become obvious rather than
                effortful. This is not a metaphor — it is the physiological signature of the autonomic nervous
                system moving from chaos into order, parasympathetic and sympathetic branches dancing in rhythm.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">The Field Around You</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Your heart's electromagnetic field radiates several feet beyond the body and is detectable by the
                hearts of others nearby. When two coherent people share space, their fields entrain. This is the
                physics behind why a calm presence calms a room — and why ceremony amplifies what one person alone
                cannot reach.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Coherence as Prayer</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Dr. Joe Dispenza's research with HeartMath has documented measurable shifts in genetic expression,
                inflammation, and even tumor markers in subjects sustaining elevated heart-coherent states paired with
                clear intention. Coherence is the carrier wave; intention is the message. Without the wave, the message
                does not travel far.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Group Coherence</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The Global Coherence Initiative monitors Earth's magnetic field and has gathered evidence that large
                groups holding coherent, loving states can shift the local — and possibly global — magnetic
                environment. Circles, ceremonies, and prayer groups are not symbolic. They are physics.
              </p>
            </article>

            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <h3 className="font-serif text-2xl text-foreground">Why It Matters Now</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                As the veil thins, the nervous system needs an anchor. Coherence is that anchor — the steady ground
                from which expanded perception becomes safe, integrated, and useful. Without it, awakening
                destabilizes. With it, awakening matures.
              </p>
            </article>
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">The Quick Coherence Practice</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Adapted from HeartMath's foundational technique. Three steps, five minutes. Practice daily and the
              baseline of your nervous system shifts.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Heart Focus",
                  d: "Place a hand on the center of your chest. Bring your attention into the heart space, behind the sternum. Stay there.",
                },
                {
                  n: "02",
                  t: "Heart Breathing",
                  d: "Breathe slowly through the heart — in for 5 seconds, out for 5 seconds. Imagine the breath flowing in and out of the heart itself.",
                },
                {
                  n: "03",
                  t: "Heart Feeling",
                  d: "While breathing, recall a moment of genuine appreciation, love, or care. Hold the feeling, not the memory. Let it radiate.",
                },
              ].map((s) => (
                <article key={s.n} className="rounded-2xl border border-primary/30 bg-background/60 p-6 backdrop-blur">
                  <p className="font-serif text-3xl text-primary">{s.n}</p>
                  <h4 className="mt-2 font-serif text-xl text-foreground">{s.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">Daily Doorways into Coherence</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Resonance Breathing", d: "Five to six breaths per minute is the cardiac sweet spot. A simple metronome will do." },
                { t: "Gratitude on Waking", d: "Three felt thank-yous before the feet touch the floor. Sets the day's baseline frequency." },
                { t: "Heart-Held Decisions", d: "Drop the question into the chest, not the head. Wait. The heart answers in warmth, contraction, or stillness." },
                { t: "Nature Immersion", d: "The Earth itself is in a coherent rhythm (Schumann resonance, ~7.83 Hz). Bare feet, slow walks, and sky-gazing entrain you to it." },
                { t: "Pre-Ceremony Coherence", d: "Five minutes of heart breathing before any prayer, ceremony, or healing session multiplies the field you bring." },
                { t: "Coherence with Another", d: "Sit knee-to-knee, eyes soft, breathing together. Two coherent fields entrain faster than one alone." },
              ].map((p) => (
                <article key={p.t} className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur">
                  <div className="h-1 w-8 rounded-full bg-primary" />
                  <h4 className="mt-3 font-serif text-lg text-foreground">{p.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <h3 className="font-serif text-xl text-foreground">Further Study</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>📖 <em>The HeartMath Solution</em> — Doc Childre & Howard Martin</li>
              <li>📖 <em>Becoming Supernatural</em> — Dr. Joe Dispenza</li>
              <li>📖 <em>The Heart's Code</em> — Dr. Paul Pearsall</li>
              <li>🔬 HeartMath Institute research library — heartmath.org/research</li>
              <li>🌍 Global Coherence Initiative — heartmath.org/gci</li>
            </ul>
            <p className="mt-4 text-xs italic text-muted-foreground">
              We hold weekly Heart Coherence circles at the center — guided practice, group entrainment, and
              gentle integration. See Events for the next gathering.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-aurora)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-foreground/80">✦ The Veil Is Thinning · Policy & Path Forward ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">The Legalization of Sacred Plant Medicines</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/85">
            For most of the last century, the medicines that have healed humanity for tens of thousands of
            years were declared criminal. That era is ending. A quiet, careful, often state-by-state and
            country-by-country opening is underway — driven by neuroscience, veterans' advocacy, indigenous
            sovereignty movements, and a culture that can no longer ignore the depth of the mental-health
            crisis. Below is the current landscape and the road ahead.
          </p>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">Where Things Stand Today</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {[
                {
                  t: "Psilocybin — United States",
                  d: "Oregon (Measure 109, services since 2023) and Colorado (Prop 122, services launching) have legalized supervised psilocybin therapy. Decriminalized in Denver, Oakland, Santa Cruz, Seattle, Detroit, DC, Somerville, Cambridge, and Ann Arbor. The FDA has granted Breakthrough Therapy designation for treatment-resistant depression and PTSD.",
                },
                {
                  t: "MDMA-Assisted Therapy",
                  d: "MAPS' Phase 3 trials showed roughly 67% of severe PTSD patients no longer met diagnostic criteria after three guided sessions. The FDA declined initial approval in 2024, requesting another study, but most observers expect approval within the next 2–4 years.",
                },
                {
                  t: "Ketamine (Legal Now)",
                  d: "Already federally legal as an anesthetic and used off-label for depression, PTSD, and chronic pain. Spravato (esketamine) is FDA-approved. Ketamine clinics now operate in nearly every major US city — currently the most accessible legal entry point into psychedelic-assisted healing.",
                },
                {
                  t: "Ayahuasca",
                  d: "Legal in Brazil, Peru, Ecuador, and Costa Rica when used in religious context. In the US, the Santo Daime and União do Vegetal churches have federal religious exemptions. Otherwise still federally controlled — though prosecutions are rare and decreasing.",
                },
                {
                  t: "Peyote",
                  d: "Federally legal in the US only for enrolled members of the Native American Church. Wild populations are critically endangered; ethical practice means honoring NAC sovereignty and not extracting from indigenous supply chains.",
                },
                {
                  t: "Ibogaine",
                  d: "Legal in Mexico, New Zealand, Brazil, and South Africa. Kentucky has explored state funding for ibogaine research targeting the opioid crisis. Multiple states are following. Cardiac screening remains medically essential.",
                },
                {
                  t: "Cannabis",
                  d: "Medically legal in 38+ US states, recreationally in 24+. Federally still Schedule I as of 2025, though the DEA has moved toward Schedule III rescheduling. Fully legal recreationally in Canada, Germany, Thailand, Uruguay, Malta, Luxembourg, and growing.",
                },
                {
                  t: "5-MeO-DMT, DMT, Mescaline",
                  d: "Federally Schedule I in the US, but increasingly the focus of clinical research. Decriminalized in some of the same cities as psilocybin. Religious-use exemptions are expanding case by case.",
                },
                {
                  t: "Australia — A Global First",
                  d: "In July 2023, Australia became the first country to authorize psychiatrists to prescribe MDMA for PTSD and psilocybin for treatment-resistant depression. A working model the rest of the world is studying.",
                },
                {
                  t: "Europe & Beyond",
                  d: "Switzerland allows compassionate-use psilocybin and LSD therapy. The Netherlands has a long-tolerated psilocybin truffle market. Portugal decriminalized all personal drug use in 2001 and saw addiction rates fall dramatically — proof of what a public-health frame can achieve.",
                },
              ].map((c) => (
                <article key={c.t} className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                  <h4 className="font-serif text-xl text-foreground">{c.t}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">What Is Driving the Shift</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { t: "The Mental-Health Crisis", d: "Antidepressants help only some, partially, slowly. The data on psychedelic-assisted therapy — sustained remission after a small number of sessions — is rewriting the standard of care." },
                { t: "Veterans' Advocacy", d: "Combat veterans, families of those lost to suicide, and bipartisan champions in Congress have made psychedelic therapy one of the rare issues uniting both political parties." },
                { t: "Neuroscience Catching Up", d: "fMRI imaging now shows what mystics described — ego dissolution, default-mode quieting, neuroplasticity. The science has finally given language to the experience." },
                { t: "Indigenous Voices Rising", d: "After centuries of suppression, the lineage holders are being heard. Reciprocity, attribution, and protection of source communities are now central to the conversation." },
                { t: "End-of-Life Care", d: "Studies at Johns Hopkins and NYU on terminal patients show single psilocybin sessions producing lasting reductions in death anxiety. Hospice and palliative care are quietly leading the way." },
                { t: "Cultural Permission", d: "Public figures speaking openly — from athletes to investors to former skeptics — has dissolved the stigma. The conversation has crossed a threshold no policy can put back." },
              ].map((p) => (
                <article key={p.t} className="rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur">
                  <div className="h-1 w-8 rounded-full bg-primary" />
                  <h4 className="mt-3 font-serif text-lg text-foreground">{p.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">How They Will Be Used to Heal — Moving Forward</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The veil is thinning, and so is the wall between medicine and ceremony. The most promising
              models emerging combine clinical rigor with the depth the elders have always insisted upon.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  t: "Licensed Therapeutic Centers",
                  d: "Oregon-style service centers staffed by trained facilitators, integrated with mental-health care. Sessions held in beautiful, intentional spaces — not hospital rooms. Preparation, journey, and integration as one continuous arc.",
                },
                {
                  t: "Insurance-Covered Protocols",
                  d: "MDMA and psilocybin therapy are on track to be covered by major insurers within this decade. Once that crosses, access shifts from a privileged few to anyone who needs it. The economics begin to mirror the ethics.",
                },
                {
                  t: "Veteran & First-Responder Programs",
                  d: "Dedicated centers for those who carry the country's trauma. Many states are already piloting subsidized programs. The political coalition behind these is broad and growing.",
                },
                {
                  t: "Indigenous-Led Sanctuaries",
                  d: "The deepest healing will continue to happen in lineage settings — with the medicines, songs, and prayers as they have been held for generations. The clinical model and the ceremonial model are not in competition; they are two hands of the same body.",
                },
                {
                  t: "Integration as Standard Practice",
                  d: "Therapists trained specifically in post-journey integration will become as common as primary-care physicians. The medicine opens the door; integration is what allows you to walk through it and stay changed.",
                },
                {
                  t: "Group & Community Models",
                  d: "Small-group ceremony — vetted, facilitated, integrated — is showing equal or greater outcomes than one-on-one work in some studies, at a fraction of the cost. The community itself becomes part of the medicine.",
                },
                {
                  t: "Microdosing Protocols",
                  d: "Sub-perceptual doses of psilocybin or LSD, rigorously studied for depression, focus, and creativity, are likely to be among the first widely-prescribed psychedelic offerings. Quiet, daily, sustainable.",
                },
                {
                  t: "End-of-Life Hospice Care",
                  d: "Death-with-dignity meets psychedelic-assisted peace. Among the most humane uses of these medicines, and one of the easiest to legislate. Many hospice programs are already preparing.",
                },
                {
                  t: "Trauma-Specific Tracks",
                  d: "Different medicines for different wounds — MDMA for relational trauma, psilocybin for depression and existential distress, ibogaine for addiction interruption, ketamine for acute crisis. Personalized, not one-size-fits-all.",
                },
              ].map((row) => (
                <article key={row.t} className="rounded-xl border border-primary/30 bg-background/60 p-5 backdrop-blur">
                  <h4 className="font-serif text-xl text-foreground">{row.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-primary/30 bg-background/40 p-8 backdrop-blur">
            <h3 className="font-serif text-2xl text-foreground">The Sacred Concern</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              As legalization expands, the elders' warning grows louder: <em>do not let the medicines be
              stripped of their spirit.</em> A clinical session without preparation, prayer, integration, or
              reverence is a half-medicine. Profit-driven scaling, weekend-certified facilitators, and the
              reduction of these intelligences to "molecules" is the real danger of this moment. The path
              forward is access <em>and</em> reverence — both, or neither.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/30 bg-background/40 p-8 backdrop-blur">
            <h3 className="font-serif text-2xl text-foreground">A Vision of the Decade Ahead</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              By 2035, it is plausible — even likely — that PTSD, treatment-resistant depression, end-of-life
              distress, and major addictions will all have psychedelic-assisted protocols as a standard of
              care, covered by insurance, available within driving distance of most people. Indigenous
              sanctuaries will be protected, source communities resourced, and ceremony recognized
              alongside clinic. The veil that has separated medicine from spirit, science from sacred,
              healing from remembrance — that veil is the one that is thinning fastest of all.
            </p>
          </div>
        </div>
      </section>


      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-cosmos)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">The Sacred Plant Medicines</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Plant medicines are ancient teachers — sentient intelligences the elders have sat with for
            millennia. Each carries a distinct spirit, a distinct gift, and a distinct warning. Below is
            an offering of the most widely-honored sacraments, what they are known for, and the life
            challenges they have most often been called to meet. This is teaching, not prescription.
            Every medicine asks for preparation, vetted facilitation, integration, and reverence.
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                name: "Ayahuasca",
                origin: "Amazon Basin · Shipibo, Shuar, Quechua lineages",
                spirit: "The Grandmother. A purgative, visionary teacher who shows the soul what it has buried. Works through the gut, the lineage, and the unseen realms.",
                health: "Studied for treatment-resistant depression, PTSD, addiction, and trauma. Increases neuroplasticity, BDNF expression, and default-mode-network reorganization.",
                challenges: ["Deep depression", "PTSD & complex trauma", "Addiction (alcohol, opioids, cocaine)", "Spiritual disconnection", "Ancestral wounds"],
              },
              {
                name: "Psilocybin Mushrooms",
                origin: "Worldwide · Mazatec (María Sabina), Aztec teonanácatl",
                spirit: "The Quiet Teachers. Gentle yet uncompromising — they unbind the small self and reveal the felt sense of unity. Often described as the medicine that loves you.",
                health: "FDA Breakthrough Therapy for depression and end-of-life distress. Strong evidence for OCD, alcohol use disorder, and existential anxiety in terminal illness.",
                challenges: ["Depression & rumination", "Death anxiety", "Creative & spiritual stagnation", "OCD", "Self-loathing"],
              },
              {
                name: "San Pedro (Huachuma)",
                origin: "Andes · Quechua & Chavín lineages",
                spirit: "The Grandfather. The heart-opener of the mountains. Slow, warm, day-long — works through gentle expansion rather than confrontation. Reconnects you to nature and the felt presence of the divine.",
                health: "Cardiovascular activation, increased empathy and prosocial feeling, somatic warmth, nature reconnection.",
                challenges: ["Closed or grieving heart", "Disconnection from nature", "Emotional numbness", "Difficulty receiving love", "Spiritual loneliness"],
              },
              {
                name: "Peyote",
                origin: "Northern Mexico & SW US · Wixárika (Huichol), Native American Church",
                spirit: "Grandfather Hikuri. The medicine of the desert and the long prayer. Holds ceremony through the night and reveals the sacredness of suffering. Endangered — sit only with indigenous-led traditions.",
                health: "Used for centuries within the Native American Church for alcoholism recovery; profound effects on community belonging and identity restoration.",
                challenges: ["Alcoholism", "Loss of cultural or ancestral identity", "Long, dark nights of the soul", "Need for community and prayer"],
              },
              {
                name: "Iboga / Ibogaine",
                origin: "West-Central Africa · Bwiti tradition (Gabon)",
                spirit: "The Father. A confronting, root-level teacher who shows you your life like a film. Long, demanding, not recreational. Works in deep medical settings.",
                health: "Documented interruption of opioid, methamphetamine, and alcohol addiction — often in a single session. Cardiac screening is mandatory; deaths have occurred without it.",
                challenges: ["Opioid & heroin addiction", "Methamphetamine addiction", "Severe trauma reckoning", "Pattern that won't break"],
              },
              {
                name: "5-MeO-DMT (Bufo / Sapo)",
                origin: "Sonoran Desert · Bufo alvarius toad secretion (now also synthesized to protect the toad)",
                spirit: "The God Molecule. Brief, total dissolution into pure source consciousness. Not a journey — an unmaking. The most powerful entheogen known and the one demanding the deepest preparation.",
                health: "Early research shows rapid relief of depression, anxiety, and PTSD. Integration is everything; without it, destabilization is real.",
                challenges: ["Existential terror", "Spiritual ego / bypassing", "Need for direct nondual realization", "Treatment-resistant depression (under careful supervision)"],
              },
              {
                name: "Cannabis (Sacred Use)",
                origin: "Central Asia · Vedic, Sufi, Rastafari, and Scythian traditions",
                spirit: "Ganja, the gentle teacher. When used ceremonially and sparingly, opens the heart and softens the analytic mind. Daily recreational use closes the very door it can open.",
                health: "Ceremonial use as bridge to meditation and prayer; medical applications in chronic pain, sleep, appetite, and end-of-life care.",
                challenges: ["Chronic pain", "Insomnia", "Difficulty meditating (occasional ceremonial use)", "End-of-life suffering"],
              },
              {
                name: "Kambo",
                origin: "Amazon · Matsés, Katukina, Yawanawá",
                spirit: "The Frog Medicine. Not psychoactive — a fierce physical purge from the secretion of the giant monkey frog. Clears panema (heavy energy), strengthens the immune and lymphatic systems.",
                health: "Studied peptides (dermorphin, deltorphin, phyllomedusin) with antimicrobial, analgesic, and immune-modulating effects. Lyme, chronic infection, and inflammation are common contexts.",
                challenges: ["Stagnant or heavy energy", "Chronic infection (Lyme, EBV)", "Lethargy & depression", "Need for somatic clearing"],
              },
              {
                name: "Rapé (Hapé)",
                origin: "Amazon · multiple tribal lineages",
                spirit: "Sacred snuff blown through a tepi pipe. Grounds, focuses, opens the third eye, and clears the energetic field. Often used to open and close other ceremonies.",
                health: "Sinus clearing, mental focus, parasympathetic activation when held in ceremony.",
                challenges: ["Scattered mind", "Trouble grounding", "Pre-meditation preparation", "Energetic clearing"],
              },
              {
                name: "Sananga",
                origin: "Amazon · Kaxinawá, Matsés",
                spirit: "Eye drops from a jungle root. Burns intensely for minutes, then clears — physical and spiritual vision both. Used by hunters and seers.",
                health: "Traditional use for ocular health, glaucoma, and cataracts; spiritual use for clearing the inner sight.",
                challenges: ["Clouded discernment", "Spiritual vision blocks", "Ocular conditions (traditional contexts)"],
              },
              {
                name: "Cacao (Ceremonial)",
                origin: "Mesoamerica · Maya, Olmec, Aztec",
                spirit: "The gentle Mother. Heart-opener, gateway medicine. Safe, food-grade, increases blood flow to the heart and brain — perfect for women's circles, daily practice, and beginners.",
                health: "Theobromine and PEA support mood, focus, and cardiovascular health. Widely accessible and integratable.",
                challenges: ["Heart heaviness", "Daily reconnection practice", "Beginning the path", "Group circles & creativity"],
              },
              {
                name: "MDMA (Therapeutic Use)",
                origin: "Synthesized 1912 · therapeutic protocols developed since the 1970s",
                spirit: "Not a traditional plant, but held alongside the medicines for the heart-opening it offers. Reduces fear, allowing trauma to be revisited safely. FDA-acknowledged as breakthrough therapy.",
                health: "MAPS Phase 3 trials: ~67% of severe PTSD patients no longer met diagnostic criteria after three sessions with therapy.",
                challenges: ["PTSD (especially relational/sexual trauma)", "Couples in disconnection", "Inability to feel safe in the body"],
              },
              {
                name: "Mescaline (Synthesized & Cactus)",
                origin: "San Pedro & Peyote alkaloid",
                spirit: "The long, lucid teacher. Less visionary than psilocybin, more reflective. Sustained clarity of thought and feeling for many hours.",
                health: "Emerging research on depression, alcoholism, and contemplative insight.",
                challenges: ["Need for sustained reflection", "Life transitions", "Integration of past medicine work"],
              },
            ].map((m) => (
              <article key={m.name} className="rounded-2xl border border-border/60 bg-background/60 p-7 backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-2xl text-foreground">{m.name}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{m.origin}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Spirit & Tradition · </span>{m.spirit}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Health & Research · </span>{m.health}
                </p>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">Most Often Called For</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.challenges.map((c) => (
                      <li key={c} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-foreground">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">By Life Challenge — A Quick Reference</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Many medicines can meet the same wound; the right one depends on the soul, the lineage, and
              the moment. This is a starting orientation, not an answer.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { c: "Depression", m: "Psilocybin · Ayahuasca · San Pedro · Cacao" },
                { c: "PTSD & Complex Trauma", m: "MDMA · Ayahuasca · Psilocybin · 5-MeO-DMT (advanced)" },
                { c: "Addiction — Opioids & Stimulants", m: "Iboga / Ibogaine · Ayahuasca" },
                { c: "Addiction — Alcohol", m: "Peyote · Psilocybin · Ayahuasca" },
                { c: "Death Anxiety & End-of-Life", m: "Psilocybin · Cannabis · 5-MeO-DMT" },
                { c: "Closed or Grieving Heart", m: "San Pedro · Cacao · MDMA · Ayahuasca" },
                { c: "Spiritual Disconnection", m: "Ayahuasca · San Pedro · 5-MeO-DMT · Peyote" },
                { c: "Stagnant Energy & Chronic Illness", m: "Kambo · Rapé · Ayahuasca" },
                { c: "Scattered Mind & Lack of Focus", m: "Rapé · Cacao · Ceremonial Cannabis" },
                { c: "Ancestral & Lineage Wounds", m: "Ayahuasca · Peyote · Iboga" },
                { c: "Need for Nondual Realization", m: "5-MeO-DMT · Mescaline · Psilocybin (high dose)" },
                { c: "Beginning the Path", m: "Cacao · Microdose Psilocybin · Ceremonial Cannabis" },
              ].map((row) => (
                <article key={row.c} className="rounded-xl border border-border/60 bg-background/60 p-5 backdrop-blur">
                  <p className="font-serif text-lg text-foreground">{row.c}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{row.m}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <h3 className="font-serif text-xl text-foreground">Sacred Principles</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>🌿 <span className="text-foreground">Reverence over recreation.</span> The medicine knows the difference.</li>
              <li>🌿 <span className="text-foreground">Vetted facilitators only.</span> Lineage, training, and ethics matter more than charisma.</li>
              <li>🌿 <span className="text-foreground">Preparation is half the medicine.</span> Diet, prayer, and intention shape the journey.</li>
              <li>🌿 <span className="text-foreground">Integration is the other half.</span> Without it, insight evaporates.</li>
              <li>🌿 <span className="text-foreground">Honor the source cultures.</span> Reciprocity, attribution, and protection of endangered plants and peoples.</li>
              <li>🌿 <span className="text-foreground">Medical screening is non-negotiable</span> for Iboga, Ayahuasca (SSRIs), and 5-MeO-DMT.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">A note of care:</strong> this teaching is offered for
              education and discernment, not as medical advice or invitation to seek out substances. Many
              of these medicines are legally controlled and carry real risks without proper container,
              screening, and integration. If a medicine is calling you, sit with it slowly — and reach out
              to William or a trusted facilitator before taking any step.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-sanctuary)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Dr. Joe Dispenza · Becoming Supernatural</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A neuroscientist, chiropractor, and researcher who has documented thousands of cases of
            spontaneous healing in his week-long retreats. His work braids quantum physics, epigenetics,
            and meditation into a teachable method: the body can be changed by the mind, and the
            future can be changed by the present moment held in coherence.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                t: "The Body as the Unconscious Mind",
                d: "After enough repetition, thoughts become feelings, feelings become moods, moods become temperaments, and temperaments become personality traits. Your body is, quite literally, your past. Healing begins when you stop being the memorized self.",
              },
              {
                t: "Breaking the Habit of Being Yourself",
                d: "The same thoughts produce the same choices, which produce the same behaviors, which produce the same experiences, which produce the same emotions — which fire the same thoughts. The loop must be broken consciously, every morning, before the body takes over.",
              },
              {
                t: "Thinking Greater Than Your Environment",
                d: "Most people wait for circumstances to change before they feel different. The supernatural inversion: feel the elevated emotion of the future first, and the environment will rearrange to match.",
              },
              {
                t: "The Energy of Elevated Emotion",
                d: "Gratitude, love, joy, and awe are the carrier waves of new biology. Coherent heart + clear intention = signal sent into the field. Without elevated emotion, intention is a thought without a body.",
              },
              {
                t: "Mind Movies & Mental Rehearsal",
                d: "The brain does not distinguish between vividly imagined experience and lived experience. Mental rehearsal of a future self — felt, not just visualized — installs new neural circuitry before the event occurs.",
              },
              {
                t: "The Pineal Gland & Mystical Experience",
                d: "Through specific breath and focused awareness, Dispenza teaches activation of the pineal — the small endocrine gland the mystics called the seat of the soul. The reported experiences echo what contemplatives have described for millennia.",
              },
            ].map((c) => (
              <article key={c.t} className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <h3 className="font-serif text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">Practice · Becoming Someone Else (Adapted)</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A simplified morning meditation drawn from Dispenza's protocols. 30–60 minutes. Best done
              before the body wakes into its old emotional baseline.
            </p>
            <ol className="mt-6 space-y-4">
              {[
                { n: "01", t: "Induction", d: "Sit upright. Eyes closed. Slow the breath. Bring awareness to the space the body occupies and then to the space around it. Become no body, no thing, no time." },
                { n: "02", t: "Recognize the Old Self", d: "Without judgment, name the unconscious thoughts, automatic emotions, and habitual behaviors of the self you no longer wish to be. See them clearly so they cannot run you in shadow." },
                { n: "03", t: "Let Them Go", d: "Exhale and release. Decide. The old self does not need to be defeated — only un-chosen." },
                { n: "04", t: "Rehearse the New Self", d: "What thoughts will the new you think? What choices will they make? What will they feel walking through their day? Rehearse it inwardly, in the first person, with feeling." },
                { n: "05", t: "Open the Heart", d: "Generate gratitude as if the future has already arrived. Hold it in the chest. The body now believes." },
                { n: "06", t: "Bless the Day", d: "Bring the same elevated state into your eyes opening, into your first steps, into the first interaction. Carry the new self into the old environment without flinching." },
              ].map((s) => (
                <li key={s.n} className="rounded-xl border border-primary/30 bg-background/60 p-5 backdrop-blur">
                  <p className="font-serif text-2xl text-primary">{s.n}</p>
                  <p className="mt-1 font-serif text-lg text-foreground">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <h3 className="font-serif text-xl text-foreground">Recommended Dispenza Meditations</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>🎧 <em>Blessing of the Energy Centers</em> — the foundational practice; clears and activates the chakras</li>
              <li>🎧 <em>Tuning In to New Potentials in the Quantum Field</em> — choosing a future from the unified field</li>
              <li>🎧 <em>Reaching for a New Personality</em> — the Becoming Someone Else meditation</li>
              <li>🎧 <em>Body Parts Meditation</em> — restoring coherent communication with the autonomic nervous system</li>
              <li>📖 <em>Becoming Supernatural</em> · <em>Breaking the Habit of Being Yourself</em> · <em>You Are the Placebo</em></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-cosmos)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">✦ Featured Teaching ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Alan Watts · The Wisdom of Insecurity</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The British philosopher who translated Zen, Taoism, and Vedanta into the most luminous English
            of the 20th century. His gift was to dissolve — gently, with humor — the very assumptions that
            create suffering: that the self is separate, that life is a problem to be solved, that the
            future is where the answer lives. With Watts, the path is not to <em>become</em> awakened but
            to notice you already are.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                t: "You Are It",
                d: "The universe is not something you were dropped into; you are something the universe is doing — the same way a wave is something the ocean is doing. The 'you' that feels separate is a useful illusion, no more solid than a vortex in a river.",
              },
              {
                t: "The Backwards Law",
                d: "The harder you grasp at peace, joy, or enlightenment, the more they retreat. Trying to be calm is the opposite of calm. Wisdom is letting go of the very effort to grasp.",
              },
              {
                t: "The Eternal Now",
                d: "There is no such thing as the future or the past — only memories and anticipations happening now. To live fully is to recognize that this moment is the only place anything has ever happened.",
              },
              {
                t: "The Game of Hide and Seek",
                d: "The Hindu image of Brahman: the One forgetting it is the One, in order to play at being the many — so that one day, with great delight, it can remember. You are the Self, peeking through.",
              },
              {
                t: "Music & the Meaning of Life",
                d: "Watts' famous teaching: life is not a journey to a destination. It is a musical thing, meant to be danced and sung while it is being played. We have been miseducated to treat it like a race.",
              },
              {
                t: "The Wisdom of Insecurity",
                d: "Trying to make the changing solid is the root of suffering. Security cannot be found by clinging — only by realizing that the one who would cling is itself part of the flow. Then the flow becomes the home.",
              },
            ].map((c) => (
              <article key={c.t} className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <h3 className="font-serif text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-3xl text-foreground">Practice · The Watts-Style Awareness Meditation</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Watts taught meditation not as effort but as <em>letting be</em>. There is nothing to achieve.
              Nothing to fix. Sit, and notice that life is already happening — without your management.
              20 minutes is plenty.
            </p>
            <ol className="mt-6 space-y-4">
              {[
                { n: "01", t: "Sit & Listen", d: "Sit comfortably, eyes open or soft. Listen to the sounds around you — not for anything, just listen. Let sound arrive. You don't make hearing happen; it happens to you." },
                { n: "02", t: "Notice the Breath Breathing You", d: "You are not breathing. Breathing is occurring. The lungs fill and empty without your permission. Notice this. The body is wiser than the manager." },
                { n: "03", t: "Drop the Watcher", d: "When you notice yourself watching the meditation, ask: who is watching? Look for the watcher. You will not find one. There is only the looking. Rest there." },
                { n: "04", t: "Let Thoughts Be Sounds", d: "Treat thoughts the same as the bird outside. They arise, they pass. They are not yours. They are not problems. They are just the mind doing its thing." },
                { n: "05", t: "Rest as Awareness", d: "What is left when you stop trying to be anyone? Awareness — open, knowing, peaceful, already complete. This is what you are. You always were." },
              ].map((s) => (
                <li key={s.n} className="rounded-xl border border-primary/30 bg-background/60 p-5 backdrop-blur">
                  <p className="font-serif text-2xl text-primary">{s.n}</p>
                  <p className="mt-1 font-serif text-lg text-foreground">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-background/40 p-6 backdrop-blur">
            <h3 className="font-serif text-xl text-foreground">Essential Watts Lectures & Books</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>🎧 <em>The Real You</em> — short, perfect introduction (also widely shared as a music remix)</li>
              <li>🎧 <em>Out of Your Mind</em> (lecture series) — Watts at the height of his powers</li>
              <li>🎧 <em>The Nature of Consciousness</em> — the Big Self / Little Self teaching</li>
              <li>🎧 <em>Life is a Musical Thing</em> — the dance metaphor in full</li>
              <li>📖 <em>The Wisdom of Insecurity</em> — his clearest book</li>
              <li>📖 <em>The Book: On the Taboo Against Knowing Who You Are</em> — the cosmic game made plain</li>
              <li>📖 <em>The Way of Zen</em> · <em>Tao: The Watercourse Way</em></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border border-primary/30 bg-[image:var(--gradient-warm)] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-foreground/80">✦ Two Doors, One Room ✦</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Dispenza & Watts — The Daily Pairing</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/85">
            Two complementary doorways. Dispenza, in the morning: become the new self, install the future,
            move the body forward with intention and elevated emotion. Watts, in the evening: drop the
            manager, let the day go, recognize you were already That all along. Effort and effortlessness.
            Becoming and being. Together they make a complete day.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Morning · 30–45 min</p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">Dispenza Becoming</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Before reaching for the phone. Activate the energy centers, rehearse the new self, generate
                gratitude for what hasn't yet arrived. Walk into the day as the future you.
              </p>
            </article>
            <article className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Evening · 15–20 min</p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">Watts Releasing</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                After the day is done. Sit, listen, drop the watcher, let thoughts be birds. Rest as the
                awareness in which the whole day arose and passed. Sleep follows naturally.
              </p>
            </article>
          </div>
        </div>
      </section>

      <p className="mt-12 text-center text-sm italic text-muted-foreground">
        New teachings are added with each cycle. Visit the center for full study circles and guided discussions.
      </p>
    </PageShell>
  );
}
