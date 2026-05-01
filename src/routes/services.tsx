import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/services")({
  head: () => makeRouteMeta({
    title: "Services & Modalities — Sacred Journey",
    description: "Plant medicine guidance, Reiki, Rife frequency therapy, BioWell assessment, sound healing, breathwork, heart-brain coherence, soul purpose discovery and more — held with reverence at Sacred Journey.",
  }),
  component: ServicesPage,
});

const intake = {
  t: "Intake Assessment & Initial Consultation",
  d: "Every soul who comes to Sacred Journey begins here. A deep-listening intake — body, mind, spirit — followed by a customized healing plan built for you alone. No cookie-cutter approaches.",
  duration: "90–120 min",
};

const energyAndBody = [
  { t: "Reiki & Energy Healing", d: "Hands-on Reiki (Level 2 certified) and intuitive biofield work to clear, restore, and balance your energetic system at cellular and soul level." },
  { t: "Rife Frequency Therapy (Spooky2)", d: "Targeted frequency-based therapy for cellular healing — currently used in supportive cancer protocols and a wide range of conditions." },
  { t: "BioWell 2.0 Energy Assessment", d: "Bioenergetic field reading that maps your chakras, organ energy, stress levels, and vitality — a baseline for your healing plan." },
  { t: "Bodywork & Massage Therapy", d: "Therapeutic, somatic, and healing-focused bodywork — releasing what the tissue has remembered." },
  { t: "Heart-Brain Coherence Training", d: "HeartMath-based and somatic practices to align heart and mind, reduce stress, and access higher states of awareness." },
];

const soundAndBreath = [
  { t: "Sound Healing & Singing Bowls", d: "Crystal and Himalayan bowls, gongs, tuning forks, and sacred frequencies to drop you into theta restoration." },
  { t: "Breathwork Journeys", d: "Transformational breathwork — Holotropic-style, Wim Hof, and pranayama traditions — for trauma release and expanded states." },
  { t: "Guided Meditation", d: "Individual, group, and recorded sessions — adaptive practices for nervous system regulation and inner stillness." },
  { t: "Yoga (trauma-informed)", d: "Individual and small group sessions oriented toward spiritual embodiment and somatic safety." },
];

const spiritAndSoul = [
  { t: "Spiritual Mentorship", d: "One-on-one guidance with William for awakening, integration, discernment, and walking the path with someone who has walked it." },
  { t: "Soul Purpose Discovery", d: "Guided 1:1 and group work helping you reconnect with your soul's calling, identify your unique gifts, and find clarity on why you are here." },
  { t: "Mediumship & Intuitive Readings", d: "Connection with vetted, gifted channels and medical intuitives in our practitioner network." },
  { t: "Horse Reiki & Equine-Assisted Healing", d: "Sacred work with horses on the land — nervous system, presence, and heart awakening through the animal kingdom." },
  { t: "Nature Immersion Healing", d: "Held experiences on the land — grounding, plant communion, and the simple medicine of being outside." },
  { t: "Addiction Recovery (Holistic & Root Cause)", d: "Lived-experience guidance combining inner work, community, and physical/energetic restoration. William has walked this path himself." },
];

const plantMedicine = [
  { t: "Private Plant Medicine Ceremony", d: "An intimate, one-on-one ceremony held with deep reverence — tailored to your intention, lineage, and readiness. Pre-ceremony preparation and post-ceremony integration included.", duration: "Full day" },
  { t: "Group Plant Medicine Ceremony", d: "A held container of fellow seekers gathering in sacred circle. Songs, prayer, and skilled facilitation guide the journey from opening to closing of the space.", duration: "Overnight" },
  { t: "Preparation & Integration Coaching", d: "The medicine begins before the ceremony and continues long after. Dedicated 1:1 work to prepare your container and integrate what arrives.", duration: "Multi-session" },
];

function Card({ t, d, duration, accent = false }: { t: string; d: string; duration?: string; accent?: boolean }) {
  return (
    <article className={`group rounded-2xl border p-7 transition ${
      accent
        ? "border-primary/30 bg-[image:var(--gradient-sanctuary)] hover:shadow-[var(--shadow-glow)]"
        : "border-border bg-card hover:shadow-[var(--shadow-soft)]"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-xl text-foreground">{t}</h3>
        {duration && (
          <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${
            accent ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
          }`}>{duration}</span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
    </article>
  );
}

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">{title}</h2>
        {intro && <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{intro}</p>}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{children}</div>
    </section>
  );
}

function ServicesPage() {
  return (
    <PageShell
      eyebrow="Offerings · Mind · Body · Spirit"
      title="Services & Modalities"
      intro="Sacred Journey works the whole person — root cause, not symptoms. Every path begins with a deep intake and a customized healing plan built around you."
    >
      {/* Intake — the doorway */}
      <div className="rounded-2xl border border-primary/40 bg-[image:var(--gradient-warm)] p-8 text-primary-foreground shadow-[var(--shadow-warm)]">
        <p className="text-xs uppercase tracking-[0.3em] opacity-90">Where Every Journey Begins</p>
        <h2 className="mt-2 font-serif text-3xl">{intake.t}</h2>
        <p className="mt-3 max-w-2xl opacity-90">{intake.d}</p>
        <p className="mt-3 text-sm opacity-80">Duration: {intake.duration}</p>
        <Link
          to="/discovery"
          className="mt-5 inline-block rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-background/90"
        >
          Begin with Soul Discovery →
        </Link>
      </div>

      <Section title="Energy, Body & Coherence" intro="The body is the temple — these modalities clear, restore, and align it.">
        {energyAndBody.map((s) => <Card key={s.t} {...s} />)}
      </Section>

      <Section title="Sound, Breath & Stillness" intro="Frequencies and practices that drop the nervous system into healing states.">
        {soundAndBreath.map((s) => <Card key={s.t} {...s} />)}
      </Section>

      <Section title="Spirit, Soul & Nature" intro="The deeper layers — purpose, lineage, and the wisdom of the natural world.">
        {spiritAndSoul.map((s) => <Card key={s.t} {...s} />)}
      </Section>

      {/* Nature & Animal Medicine — dedicated deep-dive section */}
      <section className="mt-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">The Original Medicine</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Nature & Animal Healing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Before there were therapists, temples, or pharmacies, there were forests, oceans, and the steady heartbeat of animals beside us. Nature and the animal kingdom were our first healers — and they remain the most accessible, intelligent medicine on Earth.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-7">
            <h3 className="font-serif text-2xl text-foreground">How Nature Heals</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Grounding (earthing).</strong> Direct contact with the earth — bare feet on soil, sand, or grass — discharges built-up static, lowers inflammation, and synchronizes the body to the planet's natural pulse (the Schumann resonance, ~7.83 Hz).</li>
              <li><strong className="text-foreground">Forest medicine.</strong> Trees release phytoncides — airborne compounds that lower cortisol and blood pressure while raising natural killer cell activity in the immune system.</li>
              <li><strong className="text-foreground">Ocean & water.</strong> Negative ions near moving water (waves, rivers, waterfalls) lift mood, sharpen focus, and reset the nervous system. Saltwater itself is one of the oldest known anti-inflammatories.</li>
              <li><strong className="text-foreground">Sunlight.</strong> Morning sun on bare skin and eyes regulates circadian rhythm, melatonin, vitamin D, mood, and metabolic health.</li>
              <li><strong className="text-foreground">Awe & vastness.</strong> Time spent under big sky, old trees, or open ocean shrinks the ego, dissolves rumination, and reawakens reverence — a documented antidepressant effect.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-primary/30 bg-[image:var(--gradient-sanctuary)] p-7">
            <h3 className="font-serif text-2xl text-foreground">How Animals Heal</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Co-regulation.</strong> Animals regulate their own nervous systems faster than ours — and when we are near them, our heart rhythm, breath, and brainwaves entrain to theirs. The body remembers safety.</li>
              <li><strong className="text-foreground">Unconditional presence.</strong> Animals do not judge, perform, or hold grudges. They meet us exactly as we are — a depth of acceptance many humans have never known.</li>
              <li><strong className="text-foreground">Touch & oxytocin.</strong> Petting, holding, and being beside an animal releases oxytocin in both creatures, lowers cortisol, and reduces blood pressure and heart rate.</li>
              <li><strong className="text-foreground">Mirror medicine.</strong> Horses, cats, and dogs reflect what we are unconsciously carrying. Their reactions show us what is true beneath our story — a form of biofeedback no machine can match.</li>
              <li><strong className="text-foreground">Soul companionship.</strong> Animals are luminous beings with their own intelligence and purpose. They choose us. Many recovering souls credit an animal with keeping them alive.</li>
            </ul>
          </article>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { v: "equine", t: "Equine-Assisted Healing", d: "Held sessions with horses on the land. Horses are master mirrors of the human heart — they show you, without words, where you are armored, where you are open, and where presence is asking to return. No riding required; the medicine lives in the relationship." },
            { v: "horse_reiki", t: "Horse Reiki", d: "Energy work offered with and through the horses — a sacred triangulation of practitioner, animal, and seeker. Profound for trauma, grief, and reawakening trust." },
            { v: "forest", t: "Forest & Land Immersion", d: "Guided 'forest bathing'-style walks on the sanctuary grounds. Slow, sensory, prayerful — relearning how to listen to the trees, the wind, and your own footsteps." },
            { v: "earthing", t: "Earthing & Grounding Sessions", d: "Barefoot practice on earth, often combined with breathwork and coherence training. A simple, free medicine most modern bodies are starving for." },
            { v: "ocean", t: "Ocean & Water Ceremony", d: "South Florida-based saltwater ceremonies — ocean immersion, prayer, and integration. The sea remembers everything; she is one of our oldest healers." },
            { v: "animal_companionship", t: "Animal Companionship Integration", d: "Guidance for those whose path includes adopting, working with, or grieving an animal companion — honoring the bond as part of the healing journey." },
          ].map((s) => (
            <Link
              key={s.v}
              to="/nature-booking"
              search={{ modality: s.v }}
              className="group block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg text-foreground">{s.t}</h3>
                <span className="text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">Book →</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">Request a session →</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/nature-booking"
            search={{ modality: "equine" }}
            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Book a Nature & Animal Healing Session
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-7 text-center">
          <p className="font-serif text-lg text-foreground">A note from William</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Two Siamese cats — Spirit and Mia — have been some of my greatest teachers. Animals have walked with me through the darkest passages of my life. The Sacred Journey property is being built around this truth: land, horses, and animals are not amenities. They are the medicine.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Sacred Medicine</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Sacred Plant Medicine</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Held with the deepest reverence for the plants, the lineages, and the souls who come to sit with them. William speaks from lived experience — and every container is built around proper set, setting, and intention.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plantMedicine.map((s) => <Card key={s.t} {...s} accent />)}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic text-muted-foreground">
          Plant medicine work requires a preparation conversation. We honor discernment, safety, and the sovereignty of every soul who sits with us.
        </p>
      </section>

      <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
        <p className="text-muted-foreground">All sessions are by appointment and built into your customized plan.</p>
        <Link to="/discovery" className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Begin Your Discovery
        </Link>
      </div>
    </PageShell>
  );
}
