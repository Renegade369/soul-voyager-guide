import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, makeRouteMeta } from "../components/PageShell";

export const Route = createFileRoute("/services")({
  head: () => makeRouteMeta({
    title: "Services & Modalities — Sacred Journey",
    description: "Bodywork, energy work, sound, breath, ceremony, and nature medicine — held with reverence at Sacred Journey.",
  }),
  component: ServicesPage,
});

const intake = {
  t: "Intake & Initial Consultation",
  d: "Every soul who comes to Sacred Journey begins here. A deep-listening intake — body, mind, spirit — followed by a customized healing plan built for you alone. No cookie-cutter approaches.",
  duration: "90–120 min",
};

const energyAndBody = [
  { t: "Reiki & Energy Healing", d: "Hands-on Reiki and intuitive biofield work to clear, restore, and balance your energetic system at cellular and soul level." },
  { t: "Rife Frequency Therapy", d: "Targeted frequency-based therapy for cellular healing — used in supportive protocols across a wide range of conditions." },
  { t: "BioWell 2.0 Assessment", d: "Bioenergetic field reading that maps your chakras, organ energy, stress levels, and vitality — a baseline for your healing plan." },
  { t: "Heart-Brain Coherence", d: "HeartMath-based and somatic practices to align heart and mind, reduce stress, and access higher states of awareness." },
];

const bodywork = [
  { t: "Swedish Massage", d: "Foundational relaxation, circulation, and nervous system reset." },
  { t: "Deep Tissue", d: "Targeted work on chronic tension, adhesions, and structural holding patterns." },
  { t: "Hot Stone Therapy", d: "Heat as medicine — melting deep layers, calming the nervous system at root level." },
  { t: "Craniosacral Therapy", d: "Subtle, profound work with the rhythm of the cerebrospinal fluid — powerful for trauma, migraines, and nervous system dysregulation." },
  { t: "Lymphatic Drainage", d: "Gentle, precise strokes to move lymph, reduce inflammation, and support immune function." },
  { t: "Myofascial Release", d: "Sustained pressure into the connective tissue web — releasing what no amount of stretching can reach." },
  { t: "Somatic Bodywork", d: "Body-centered trauma release integrating breath, sensation, and awareness — where the physical and emotional meet." },
];

const soundAndBreath = [
  { t: "Sound Healing", d: "Crystal and Himalayan bowls, gongs, and tuning forks — sacred frequencies that drop the body into theta restoration." },
  { t: "Breathwork Journeys", d: "Transformational breathwork — Holotropic-style, Wim Hof, and pranayama traditions — for release and expanded states." },
  { t: "Guided Meditation", d: "Individual, group, and recorded sessions — adaptive practices for nervous-system regulation and inner stillness." },
  { t: "Trauma-Informed Yoga", d: "Individual and small group sessions oriented toward spiritual embodiment and somatic safety." },
];

const spiritAndSoul = [
  { t: "Spiritual Mentorship", d: "One-on-one guidance with William for awakening, integration, and walking the path with someone who has walked it." },
  { t: "Soul Purpose Discovery", d: "Guided 1:1 and group work to reconnect with your soul's calling, identify your gifts, and find clarity on why you are here." },
  { t: "Mediumship & Intuitive Readings", d: "Connection with vetted, gifted channels and medical intuitives in our practitioner network." },
  { t: "Equine-Assisted Healing", d: "Held sessions with horses on the land — nervous system, presence, and heart awakening through the animal kingdom." },
  { t: "Nature Immersion", d: "Held experiences on the land — grounding, plant communion, and the simple medicine of being outside." },
  { t: "Holistic Recovery", d: "Lived-experience guidance combining inner work, community, and physical and energetic restoration." },
];

const plantMedicine = [
  { t: "Private Ceremony", d: "An intimate, one-on-one ceremony held with deep reverence — tailored to your intention, lineage, and readiness. Preparation and integration included." },
  { t: "Group Ceremony", d: "A held container of fellow seekers gathering in sacred circle. Songs, prayer, and skilled facilitation guide the journey from opening to closing of the space." },
  { t: "Preparation & Integration", d: "The medicine begins before the ceremony and continues long after. Dedicated 1:1 work to prepare your container and integrate what arrives." },
];

function NumberedGrid({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 border-t border-border md:grid-cols-2">
      {items.map((s, i) => {
        const isLast = i === items.length - 1;
        const isOdd = items.length % 2 === 1;
        return (
          <article
            key={s.t}
            className={[
              "px-2 py-12 md:px-10 md:py-14",
              "border-b border-border",
              i % 2 === 0 ? "md:border-r" : "",
              isLast && isOdd ? "md:border-b-0" : "",
              !isLast && i === items.length - 2 && !isOdd ? "md:border-b-0" : "",
              isLast ? "border-b-0" : "",
            ].join(" ")}
          >
            <p className="font-serif text-sm font-light italic text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-serif text-2xl font-normal text-foreground md:text-3xl">
              {s.t}
            </h3>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
              {s.d}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function ServiceSection({
  title,
  subtitle,
  intro,
  items,
}: {
  title: string;
  subtitle?: string;
  intro?: string;
  items: { t: string; d: string }[];
}) {
  return (
    <section className="mt-32 md:mt-40">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">{title}</h2>
        {subtitle && (
          <p className="mt-6 font-serif text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
            {subtitle}
          </p>
        )}
        {intro && (
          <p className="mx-auto mt-8 max-w-2xl text-left text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            {intro}
          </p>
        )}
      </div>
      <NumberedGrid items={items} />
    </section>
  );
}

function ServicesPage() {
  return (
    <PageShell
      eyebrow="Offerings"
      title="Services & Modalities"
      intro="Sacred Journey works the whole person — root cause, not symptoms. Every path begins with a deep intake and a customized healing plan built around you."
    >
      {/* Intake — the doorway */}
      <section className="border-y border-border py-16 text-center md:py-20">
        <p className="text-[11px] font-light uppercase tracking-[0.28em] text-foreground/55">
          Where Every Journey Begins
        </p>
        <h2 className="mt-6 font-serif text-3xl font-light text-foreground md:text-4xl">
          {intake.t}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
          {intake.d}
        </p>
        <p className="mt-5 text-[11px] font-light uppercase tracking-[0.22em] text-muted-foreground">
          {intake.duration}
        </p>
        <Link
          to="/discovery"
          className="mt-9 inline-block border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
        >
          Begin with Soul Discovery
        </Link>
      </section>

      <ServiceSection
        title="Energy & Biofield Work"
        subtitle="Where the unseen meets the body."
        intro="Subtle systems carry profound information. These modalities clear, restore, and align the energetic field — often the doorway to deeper physical healing."
        items={energyAndBody}
      />

      <ServiceSection
        title="Bodywork & Massage Therapy"
        subtitle="The body remembers everything. These modalities help it finally let go."
        intro="The nervous system cannot heal in a state of tension. Bodywork is often the first medicine — and sometimes the most profound. Sacred Journey offers a full spectrum of therapeutic and healing-focused bodywork, delivered by licensed therapists and specialized practitioners on staff and within our vetted network."
        items={bodywork}
      />

      <ServiceSection
        title="Sound, Breath & Stillness"
        subtitle="Frequency, breath, and silence — the oldest medicines."
        intro="These practices drop the nervous system into states where deep healing can happen on its own."
        items={soundAndBreath}
      />

      <ServiceSection
        title="Spirit, Soul & Nature"
        subtitle="The deeper layers — purpose, lineage, and the wisdom of the natural world."
        items={spiritAndSoul}
      />

      {/* Nature & Animal Healing — text-led, no gradient cards */}
      <section className="mt-32 md:mt-40">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">
            Nature & Animal Healing
          </h2>
          <p className="mt-6 font-serif text-xl font-light italic leading-snug text-muted-foreground md:text-2xl">
            The original medicine — and still the most intelligent.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-left text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            Before there were therapists, temples, or pharmacies, there were forests, oceans, and the steady heartbeat of animals beside us. Nature and the animal kingdom were our first healers — and they remain among the most accessible, intelligent medicines on Earth.
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-14 border-t border-border pt-14 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl font-normal text-foreground">How Nature Heals</h3>
            <ul className="mt-6 space-y-5 text-sm font-light leading-relaxed text-muted-foreground">
              <li><span className="text-foreground">Grounding.</span> Direct contact with the earth discharges built-up static, lowers inflammation, and synchronizes the body to the planet's natural pulse.</li>
              <li><span className="text-foreground">Forest medicine.</span> Trees release phytoncides — airborne compounds that lower cortisol and raise immune activity.</li>
              <li><span className="text-foreground">Ocean and water.</span> Negative ions near moving water lift mood, sharpen focus, and reset the nervous system.</li>
              <li><span className="text-foreground">Sunlight.</span> Morning sun on bare skin and eyes regulates circadian rhythm, melatonin, vitamin D, and metabolic health.</li>
              <li><span className="text-foreground">Awe and vastness.</span> Time spent under big sky and old trees dissolves rumination and reawakens reverence.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-normal text-foreground">How Animals Heal</h3>
            <ul className="mt-6 space-y-5 text-sm font-light leading-relaxed text-muted-foreground">
              <li><span className="text-foreground">Co-regulation.</span> Animals regulate their nervous systems faster than ours — when we're near them, our heart, breath, and brainwaves entrain to theirs.</li>
              <li><span className="text-foreground">Unconditional presence.</span> Animals don't judge or perform. They meet us exactly as we are.</li>
              <li><span className="text-foreground">Touch and oxytocin.</span> Petting and being beside an animal releases oxytocin in both creatures and lowers cortisol.</li>
              <li><span className="text-foreground">Mirror medicine.</span> Horses, cats, and dogs reflect what we are unconsciously carrying — biofeedback no machine can match.</li>
              <li><span className="text-foreground">Soul companionship.</span> Animals are luminous beings with their own intelligence and purpose. They choose us.</li>
            </ul>
          </div>
        </div>

        <NumberedGrid
          items={[
            { t: "Equine-Assisted Healing", d: "Held sessions with horses on the land. Horses are master mirrors of the human heart — they show you, without words, where you are armored and where presence is asking to return." },
            { t: "Horse Reiki", d: "Energy work offered with and through the horses — a sacred triangulation of practitioner, animal, and seeker. Profound for trauma, grief, and reawakening trust." },
            { t: "Forest & Land Immersion", d: "Guided 'forest bathing' walks on the sanctuary grounds. Slow, sensory, prayerful — relearning how to listen to the trees, the wind, and your own footsteps." },
            { t: "Earthing & Grounding", d: "Barefoot practice on earth, often combined with breathwork and coherence training. A simple, free medicine most modern bodies are starving for." },
            { t: "Ocean & Water Ceremony", d: "South Florida-based saltwater ceremonies — ocean immersion, prayer, and integration. The sea is one of our oldest healers." },
            { t: "Animal Companionship", d: "Guidance for those whose path includes adopting, working with, or grieving an animal companion — honoring the bond as part of the healing journey." },
          ]}
        />

        <div className="mt-12 text-center">
          <Link
            to="/nature-booking"
            search={{ modality: "equine" }}
            className="inline-block border border-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background"
          >
            Book a Nature & Animal Session
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-2xl border-t border-border pt-12 text-center">
          <p className="font-serif text-xl font-light italic text-foreground">
            A note from William
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Two Siamese cats — Spirit and Mia — have been some of my greatest teachers. Animals have walked with me through the darkest passages of my life. The Sacred Journey property is being built around this truth: land, horses, and animals are not amenities. They are the medicine.
          </p>
        </div>
      </section>

      <ServiceSection
        title="Sacred Plant Medicine"
        subtitle="Held with the deepest reverence for the plants, the lineages, and the souls who come to sit with them."
        intro="William speaks from lived experience — and every container is built around proper set, setting, and intention. Plant medicine work requires a preparation conversation. We honor discernment, safety, and the sovereignty of every soul who sits with us."
        items={plantMedicine}
      />

      {/* Closing CTA */}
      <section className="mt-32 border-t border-border py-20 text-center md:py-24">
        <p className="font-serif text-2xl font-light italic text-foreground md:text-3xl">
          All sessions are by appointment and built into your customized plan.
        </p>
        <Link
          to="/discovery"
          className="mt-10 inline-block border border-foreground bg-foreground px-9 py-3.5 text-[11px] font-normal uppercase tracking-[0.22em] text-background transition hover:bg-transparent hover:text-foreground"
        >
          Begin Your Discovery
        </Link>
      </section>
    </PageShell>
  );
}
