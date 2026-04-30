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

      <p className="mt-12 text-center text-sm italic text-muted-foreground">
        New teachings are added with each cycle. Visit the center for full study circles and guided discussions.
      </p>
    </PageShell>
  );
}
