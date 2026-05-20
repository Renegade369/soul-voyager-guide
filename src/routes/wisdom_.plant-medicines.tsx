import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Leaf } from "lucide-react";

const C = { bg: "#0A0B09", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/plant-medicines")({
  head: () => ({
    meta: [
      { title: "The Sacred Plant Allies — An Encyclopedia of Earth's Ancient Frequencies | Soul True" },
      { name: "description", content: "An educational reference guide to sacred plant allies: ayahuasca, psilocybin, peyote, San Pedro, cannabis, iboga, kambo, rapé, sananga, kanna, and DMT." },
      { property: "og:title", content: "The Sacred Plant Allies — Soul True" },
      { property: "og:description", content: "An encyclopedia of Earth's ancient consciousness frequencies." },
    ],
  }),
  component: Page,
});

type Plant = {
  name: string;
  header: string;
  origin: string;
  teaser: string;
  sections: { heading: string; body: React.ReactNode }[];
  legal: string;
};

const plants: Plant[] = [
  {
    name: "Ayahuasca",
    header: "Ayahuasca — The Vine of the Soul",
    origin: "Amazon Basin (South America)",
    teaser: "The great revealer — a brew that has guided souls through the deep for millennia.",
    sections: [
      { heading: "What it is", body: "Ayahuasca is a sacred ceremonial brew made from two plants native to the Amazon: the Banisteriopsis caapi vine (the \"vine of the soul\") and the leaves of the Psychotria viridis shrub (chacruna). The combination activates DMT — a naturally occurring compound in the human body — and creates an extended, visionary experience typically lasting 4–8 hours." },
      { heading: "Origins & Ceremonial Use", body: "Ayahuasca has been used by Amazonian and Andean indigenous nations — including the Shipibo-Conibo, Shuar, and Quechua peoples — for at least 1,000 years and likely much longer. It is central to the practices of trained wisdom keepers called ayahuasceros or curanderos. Ceremonies are conducted at night, led by a facilitator who uses icaros (sacred songs) to guide participants through their inner landscapes." },
      { heading: "Frequencies it carries", body: "Ayahuasca is widely understood to facilitate deep emotional purging, ancestral contact, ego dissolution, and direct confrontation with patterns, fears, and unresolved soul material. Many who have sat with this ally describe encounters with intelligence — plant, cosmic, or otherwise — that fundamentally shifted their understanding of reality." },
      { heading: "Modern Context", body: "Ayahuasca is legal in several South American countries and in certain religious contexts in the USA (under the Santo Daime and União do Vegetal churches). Research institutions including MAPS and Johns Hopkins have conducted peer-reviewed studies on its potential role in supporting consciousness work related to depression, PTSD, and addiction recovery." },
    ],
    legal: "Varies by country. Schedule I in the USA outside of protected religious use.",
  },
  {
    name: "Psilocybin Mushrooms",
    header: "Psilocybin — The Sacred Mushroom",
    origin: "Worldwide (most concentrated traditions in Mesoamerica)",
    teaser: "The fungal teacher — death, rebirth, and the mycelial web of all things.",
    sections: [
      { heading: "What it is", body: "Psilocybin is the primary active compound found in over 200 species of fungi, most commonly Psilocybe cubensis, Psilocybe semilanceata, and others. When consumed, psilocybin converts to psilocin in the body, producing consciousness-expanding experiences ranging from 3–6 hours in duration." },
      { heading: "Origins & Ceremonial Use", body: "The Mazatec people of Oaxaca, Mexico — particularly through the legendary wisdom keeper María Sabina — are the most widely documented lineage of sacred mushroom work. Known as teonanácatl (\"flesh of the gods\") in Nahuatl, mushrooms were used in veladas (night ceremonies) for divination, energetic alignment, and soul guidance. Cave paintings in Algeria suggest mushroom use may date back 9,000+ years." },
      { heading: "Frequencies it carries", body: "Psilocybin is known for dissolving the default mode network — the part of the brain associated with the ego and self-narrative — producing a sense of interconnectedness, awe, and profound clarity. Common experiences include contact with inner wisdom, resolution of deep grief, access to creative states, and what researchers call \"mystical-type experiences\" — peak states of unity consciousness." },
      { heading: "Modern Context", body: "Oregon and Colorado have legalized supervised psilocybin sessions. Johns Hopkins, NYU, and Imperial College London have published significant research. Decriminalize Nature has successfully decriminalized psilocybin in dozens of US cities." },
    ],
    legal: "Schedule I in the USA federally. Decriminalized in several cities and states.",
  },
  {
    name: "Peyote",
    header: "Peyote — The Sacred Cactus of the Deer",
    origin: "Chihuahuan Desert (Mexico / Southern USA)",
    teaser: "Grandfather frequency — the slow, ancient vibration of the land itself.",
    sections: [
      { heading: "What it is", body: "Peyote (Lophophora williamsii) is a small, spineless cactus native to the Chihuahuan Desert. Its primary active compound is mescaline — a naturally occurring consciousness-expanding alkaloid. Peyote ceremonies are multi-hour, often all-night experiences involving prayer, song, and deep introspective states." },
      { heading: "Origins & Ceremonial Use", body: "Peyote has been used ceremonially by indigenous peoples of Mexico and the southwestern United States for at least 5,700 years — confirmed by archaeological finds in Texas. It is considered a sacred ancestor by the Huichol (Wixáritari), Tarahumara, and Comanche nations, among others. In the USA, the Native American Church legally uses peyote as a sacrament in prayer ceremonies, and it is protected under the American Indian Religious Freedom Act." },
      { heading: "Frequencies it carries", body: "Peyote is considered a slow, deeply grounding frequency — associated with the Earth, the ancestors, and the land. Participants often report encounters with animal spirits, ancestral guidance, and a profound reorientation of priorities. It is considered by many traditions to be one of the most demanding and most rewarding of the plant allies." },
    ],
    legal: "Schedule I in the USA. Protected for Native American Church members. Illegal for general use.",
  },
  {
    name: "San Pedro (Huachuma)",
    header: "San Pedro / Huachuma — The Cactus of the Four Winds",
    origin: "Andes Mountains (Peru, Bolivia, Ecuador)",
    teaser: "The heart opener — the daytime frequency of love, clarity, and ancient Andean vision.",
    sections: [
      { heading: "What it is", body: "San Pedro (Echinopsis pachanoi), also known as Huachuma, is a columnar cactus native to the Andes. Like peyote, its primary active compound is mescaline. San Pedro ceremonies are traditionally conducted during the day, often in nature, and last 8–12 hours." },
      { heading: "Origins & Ceremonial Use", body: "Archaeological evidence places San Pedro use in Andean cultures at over 3,000 years. The Chavin civilization of Peru left behind iconography depicting the cactus alongside condors and jaguars — symbols of cosmic sight. Andean curanderos use San Pedro alongside other ceremonial tools (mesa altars, sound, prayer) to facilitate deep soul work and energetic alignment." },
      { heading: "Frequencies it carries", body: "San Pedro is widely described as a heart-opening frequency — warm, expansive, and grounding simultaneously. Unlike the often intense inner journey of ayahuasca, San Pedro is considered more visual and external — deeply connecting participants to nature, beauty, and the sacredness of ordinary life. Many describe it as the frequency of unconditional love." },
    ],
    legal: "The cactus itself is legal to grow in most countries. Mescaline extraction is Schedule I in the USA.",
  },
  {
    name: "Cannabis",
    header: "Cannabis — The Sacred Hemp Plant",
    origin: "Central Asia (globally distributed for millennia)",
    teaser: "The ancient companion — relaxation, creativity, and the quiet expansion of the senses.",
    sections: [
      { heading: "What it is", body: "Cannabis (Cannabis sativa / Cannabis indica) is a flowering plant with psychoactive and non-psychoactive varieties. Its primary active compounds are THC (tetrahydrocannabinol) and CBD (cannabidiol). Used in both ceremonial and everyday contexts for thousands of years." },
      { heading: "Origins & Ceremonial Use", body: "Cannabis has been documented in spiritual and ceremonial contexts across Hindu traditions (Shiva's sacred herb, consumed as bhang during Holi and Shivratri), Rastafari (sacramental use of ganja), Scythian burial rituals (2,500 BCE), and ancient Chinese, Egyptian, and Greek texts. It is one of the most globally distributed of all sacred plants." },
      { heading: "Frequencies it carries", body: "Cannabis works through the body's endocannabinoid system — a regulatory system involved in mood, sleep, appetite, memory, and stress response. Ceremonially, it is used to quiet mental noise, access creative and intuitive states, deepen prayer and meditation, and facilitate emotional release. CBD-dominant varieties are used for nervous system regulation and energetic calming without consciousness alteration." },
      { heading: "Modern Context", body: "Cannabis is now legal for adult use in 24 US states and many countries worldwide. Medical programs exist in most US states. Research into cannabinoids continues to grow rapidly." },
    ],
    legal: "Federally Schedule I in the USA. State laws vary widely. Legal in many countries.",
  },
  {
    name: "Iboga / Ibogaine",
    header: "Iboga — The Root of the Bwiti",
    origin: "Central West Africa (Gabon, Cameroon, Congo)",
    teaser: "The confronter — the most demanding of the plant allies, and perhaps the most transformative.",
    sections: [
      { heading: "What it is", body: "Iboga (Tabernanthe iboga) is a perennial rainforest shrub native to Central West Africa. Its bark contains ibogaine and a range of related alkaloids. Full iboga ceremonies are extraordinarily long — often 24–36 hours — and are considered one of the most physically and psychologically demanding experiences in the plant ally world." },
      { heading: "Origins & Ceremonial Use", body: "Iboga is the central sacrament of the Bwiti spiritual tradition of the Fang, Mitsogo, and related peoples of Gabon and Cameroon. Initiates consume large amounts of iboga root bark in multi-day ceremonies overseen by trained nganga (wisdom keepers). The experience is understood as a symbolic death and rebirth — a direct encounter with the ancestors and the true self." },
      { heading: "Frequencies it carries", body: "Iboga is not considered a recreational or gentle frequency. It is described as a \"flood\" — confrontational, relentless, and deeply honest. Participants often experience vivid life review sequences, ancestral encounters, and the direct confrontation of the root causes of suffering, addiction, and self-deception. Many describe it as 10 years of inner work compressed into one night." },
      { heading: "Modern Context", body: "Significant research exists on ibogaine's potential role in interrupting addiction patterns — particularly for opioids. Clinics operate legally in Mexico, Canada, Costa Rica, and other countries. It remains Schedule I in the USA." },
    ],
    legal: "Schedule I in the USA. Legal in several other countries. Medical ibogaine clinics operate internationally.",
  },
  {
    name: "Kambo",
    header: "Kambo — The Frog Purge",
    origin: "Amazon Basin (Peru, Brazil, Colombia)",
    teaser: "The warrior's cleanse — a fierce physical reset that indigenous hunters have used for generations.",
    sections: [
      { heading: "What it is", body: "Kambo is not a plant — it is the secretion of the giant monkey frog (Phyllomedusa bicolor), applied to small burns on the skin. It is not psychoactive. Its effects are intensely physical — nausea, purging, and a strong physiological reset — lasting 20–40 minutes." },
      { heading: "Origins & Ceremonial Use", body: "Kambo is used by numerous Amazonian tribes, including the Matsés, Yawanapi, and Marubo peoples. Hunters traditionally used it to sharpen physical senses, build endurance, and remove what they called panema — a heaviness or bad luck that clouds clarity and vitality. It is not a visionary ally — it is a physical and energetic purge." },
      { heading: "Frequencies it carries", body: "Kambo contains a complex cocktail of bioactive peptides that interact with the body's own receptors. Ceremonially, it is understood to clear stagnant energetic residue from the body, sharpen focus, and restore vitality. Many participants report feeling profoundly clear and light after the purge has passed. It is commonly used alongside other plant ally work as a preparation or clearing." },
    ],
    legal: "Legal in most countries. Not a controlled substance. Should only be administered by trained practitioners due to physiological intensity.",
  },
  {
    name: "Rapé (Hape)",
    header: "Rapé — The Sacred Snuff",
    origin: "Amazon Basin (Brazil, Peru)",
    teaser: "The grounding force — a breath of the forest blown directly into the center of the mind.",
    sections: [
      { heading: "What it is", body: "Rapé (pronounced \"ha-PAY\") is a sacred snuff made from powdered tobacco (Nicotiana rustica — a far more potent variety than commercial tobacco) blended with the ashes of sacred trees, seeds, and plants. It is administered through the nostrils using a V-shaped pipe called a tepi (when blown by another) or a kuripe (self-administered)." },
      { heading: "Origins & Ceremonial Use", body: "Rapé is used by dozens of Amazonian tribes — the Huni Kuin, Yawanapi, Katukina, and others — as a grounding, centering, and clearing ally. It is often used at the beginning of ceremony to clear the mind and the energetic field, or between other plant ally experiences to ground and reorient. Different tribes have different recipes — each blend carries a distinct frequency." },
      { heading: "Frequencies it carries", body: "The effect of rapé is rapid and intense — immediate mental silence, physical grounding, and a sharp clearing of the energetic field. Users describe it as a \"reset button\" for the mind — cutting through mental chatter and returning awareness to the body and the present moment. It is also used for prayer and intention-setting." },
    ],
    legal: "Legal in most countries. Nicotiana rustica is not a controlled substance.",
  },
  {
    name: "Sananga",
    header: "Sananga — The Eye of the Forest",
    origin: "Amazon Basin (Brazil, Peru)",
    teaser: "The sight restorer — sacred eye drops that sharpen both physical and inner vision.",
    sections: [
      { heading: "What it is", body: "Sananga is a sacred eye drop made from the roots and bark of the Tabernaemontana undulata shrub, native to the Amazon. It is not psychoactive. Applied directly to the eyes, it produces an intense burning sensation lasting 5–10 minutes, followed by a period of profound visual clarity." },
      { heading: "Origins & Ceremonial Use", body: "Sananga is used by Amazonian hunting tribes — the Matsés, Huni Kuin, and others — to sharpen visual acuity before hunts and to clear panema (energetic heaviness) from the eyes and the field of perception. In ceremonial contexts, it is used before visionary plant ally work to cleanse the lens through which the experience is perceived." },
      { heading: "Frequencies it carries", body: "Sananga is understood as a cleanser of visual and energetic perception — both literally and symbolically. Indigenous tradition holds that it clears accumulated emotional and energetic residue from the eyes, allowing clearer sight in both the physical and spiritual dimensions. Many users report heightened color perception, mental clarity, and emotional release following administration." },
    ],
    legal: "Legal worldwide. Not a controlled substance.",
  },
  {
    name: "Kanna (Sceletium)",
    header: "Kanna — The Plant of Relaxation",
    origin: "Southern Africa (South Africa)",
    teaser: "The ancient mood lifter of the San people — gentle, clear, and quietly profound.",
    sections: [
      { heading: "What it is", body: "Kanna (Sceletium tortuosum) is a succulent plant native to South Africa. Its primary active compounds are mesembrine and related alkaloids, which act as serotonin reuptake inhibitors (similar in mechanism to some pharmaceutical antidepressants, but naturally occurring). It can be consumed as a tea, chewed, or inhaled as a snuff." },
      { heading: "Origins & Ceremonial Use", body: "Kanna has been used by the San (Bushmen) and Khoikhoi peoples of southern Africa for thousands of years — documented in 17th-century Dutch colonial records, and present in San rock art traditions. It was used to elevate mood, relieve stress, suppress appetite on long hunts, and facilitate social bonding. It remains a legal and widely used botanical in South Africa." },
      { heading: "Frequencies it carries", body: "Kanna is one of the gentler plant allies — not psychedelic, not visionary, but a quiet, warm expansion of the emotional field. Users describe reduced anxiety, elevated mood, increased empathy and sociability, and a soft sense of peace and presence. It is often described as the \"African cacao\" — a heart-softening frequency rather than a soul-expanding one." },
    ],
    legal: "Legal worldwide. Not a controlled substance in any major jurisdiction.",
  },
  {
    name: "DMT (Dimethyltryptamine)",
    header: "DMT — The Spirit Molecule",
    origin: "Worldwide (endogenous to the human body; present in hundreds of plant species)",
    teaser: "The most potent consciousness-expanding frequency known — and it already lives inside you.",
    sections: [
      { heading: "What it is", body: "DMT (dimethyltryptamine) is a naturally occurring tryptamine compound found in hundreds of plant and animal species across the globe — and produced endogenously in the human body, particularly in the pineal gland. In its isolated, smokable or injectable form, DMT produces one of the most intense and brief consciousness-expanding experiences known — typically lasting 5–20 minutes when smoked, or several hours when combined with an MAO inhibitor (as in ayahuasca). It is sometimes called \"the spirit molecule\" — a term made widely known by researcher Dr. Rick Strassman's landmark clinical studies at the University of New Mexico in the 1990s." },
      { heading: "Origins & Ceremonial Use", body: "DMT has been a component of sacred ceremonial practices for millennia — primarily through plant-based brews. The most well-known is ayahuasca, where the DMT in chacruna leaves is activated by the MAO-inhibiting alkaloids in the Banisteriopsis caapi vine. Various Amazonian and Caribbean traditions have also used DMT-containing snuffs — called yopo (from Anadenanthera peregrina seeds) and vilca — in shamanic ceremony for divination, ancestor contact, and cosmic navigation. Archaeological evidence of DMT-containing snuff kits in South America dates back over 1,000 years." },
      { heading: "Frequencies it carries", body: (
        <>
          <p className="mb-4">DMT is widely described as a direct transmission rather than an experience — a complete shift in consciousness so total and so rapid that it bypasses the ego entirely. Common reported phenomena include:</p>
          <ul className="mb-4 list-disc space-y-2 pl-6">
            <li>Encounter with non-human intelligences, entities, or presences</li>
            <li>Travel through geometric or crystalline dimensional spaces</li>
            <li>Life review and soul-level clarity</li>
            <li>The overwhelming conviction of having accessed a deeper reality than ordinary waking life</li>
            <li>Profound peace, awe, and a dissolution of the fear of death</li>
          </ul>
          <p>Many who have encountered DMT — in ceremonial, clinical, or near-death contexts — describe it as the most significant event of their lives. Researcher and philosopher Terence McKenna dedicated much of his life's work to exploring and articulating the nature of the DMT state.</p>
        </>
      ) },
      { heading: "The Endogenous Mystery", body: "Perhaps the most remarkable aspect of DMT is that the human body makes it. Trace amounts are found in human blood, urine, and cerebrospinal fluid. Some researchers theorize that the pineal gland — long associated with the \"third eye\" in spiritual traditions — produces elevated DMT during deep meditation, dreaming, birth, and death. This has not been conclusively proven, but the philosophical implications are profound: the gateway to expanded consciousness may be built into our biology by design." },
      { heading: "Modern Context", body: "Dr. Rick Strassman's research at the University of New Mexico (1990–1995) was the first government-approved clinical study of a psychedelic compound in 20 years. His book DMT: The Spirit Molecule (2000) brought widespread awareness to DMT's potential role in consciousness research. Current research continues at institutions including Johns Hopkins and Imperial College London, often within broader psychedelic research programs." },
    ],
    legal: "Schedule I in the USA and most countries. Illegal to isolate, synthesize, or possess in most jurisdictions. Present naturally in the human body and in many legal plant species. Its presence in ayahuasca brews is legally complex and varies by country and context.",
  },
];

function PlantCard({ plant }: { plant: Plant }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-lg border transition-all hover:shadow-[0_12px_40px_-12px_rgba(201,168,76,0.35)]"
      style={{ background: C.overlay, borderColor: C.border }}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full flex-col gap-3 p-6 text-left md:flex-row md:items-center md:justify-between"
        aria-expanded={open}
      >
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl" style={{ fontFamily: fonts.display, color: C.gold, fontWeight: 500 }}>
            {plant.header}
          </h3>
          <p className="mt-2 text-[15px] italic" style={{ color: "rgba(245,240,232,0.7)", fontFamily: fonts.display }}>
            {plant.teaser}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
            style={{ borderColor: C.gold, color: C.gold, background: "rgba(201,168,76,0.05)" }}
          >
            {plant.origin}
          </span>
          <ChevronDown
            size={20}
            style={{ color: C.gold, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
          />
        </div>
      </button>
      {open && (
        <div className="border-t px-6 pb-7 pt-5" style={{ borderColor: C.border }}>
          {plant.sections.map((s) => (
            <div key={s.heading} className="mt-5">
              <h4 className="mb-2 text-lg" style={{ fontFamily: fonts.display, color: C.gold, fontWeight: 500 }}>
                {s.heading}
              </h4>
              <div className="text-[15.5px] leading-[1.8]" style={{ color: "rgba(245,240,232,0.85)", fontWeight: 300 }}>
                {s.body}
              </div>
            </div>
          ))}
          <p className="mt-6 text-[13px] italic" style={{ color: "rgba(245,240,232,0.55)" }}>
            <span style={{ color: C.gold }}>Legal status:</span> {plant.legal}
          </p>
        </div>
      )}
    </div>
  );
}

function Page() {
  return (
    <article style={{ background: C.bg, color: C.text, fontFamily: fonts.body }}>
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <div className="mb-6 text-left">
          <Link to="/wisdom" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
            ← Back to Wisdom
          </Link>
        </div>
        <div className="mb-6 inline-flex items-center justify-center" style={{ color: C.gold }}>
          <Leaf size={32} />
        </div>
        <h1 className="text-5xl md:text-6xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 300 }}>
          The Sacred Plant Allies
        </h1>
        <p className="mt-5 text-lg italic" style={{ color: C.gold, fontFamily: fonts.display }}>
          An Encyclopedia of Earth's Ancient Frequencies
        </p>
        <p className="mx-auto mt-8 max-w-[700px] text-[16px] italic leading-[1.85]" style={{ color: "rgba(245,240,232,0.78)" }}>
          For thousands of years, indigenous cultures across every continent maintained living relationships with the plants of their land. These were not recreational encounters. They were sovereign, sacred, and deeply intentional — a technology of consciousness that predates written history. What follows is a reference guide to the most widely known sacred plant allies: where they come from, how they have been used ceremonially, and what frequencies they are understood to carry. This page is for education only. Soul True does not recommend, facilitate, or advise on the use of any substance.
        </p>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="flex flex-col gap-4">
          {plants.map((p) => (
            <PlantCard key={p.name} plant={p} />
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <p className="text-[12px] italic leading-relaxed" style={{ color: C.gold, opacity: 0.85 }}>
          The information on this page is provided for educational and consciousness-expansion purposes only. Soul True does not recommend, promote, facilitate, or advise on the use of any substance — sacred, plant-based, or otherwise. Many of the plant allies described here are controlled substances in various jurisdictions. Always know and respect the laws of your location. Soul True honors the indigenous traditions that have stewarded this wisdom — please approach these traditions with deep respect and reciprocity.
        </p>
        <div className="mt-10">
          <Link to="/wisdom" className="text-[11px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>
            ← Back to Wisdom
          </Link>
        </div>
      </footer>
    </article>
  );
}
