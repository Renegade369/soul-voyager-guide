import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import MUSHROOM_FOREST from "@/assets/rainbow-mushroom-forest.png";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/origins")({
  head: () => ({
    meta: [
      { title: "Origins — The Truth They Buried | Soul True" },
      { name: "description", content: "The truth they buried. The history they rewrote. The lineage you forgot. Seven sacred teachings on human origins, the Anunnaki, and your sovereign lineage." },
      { property: "og:title", content: "Origins — The Truth They Buried | Soul True" },
      { property: "og:description", content: "Seven sacred teachings on human origins, the Anunnaki, and the lineage you forgot." },
    ],
  }),
  component: OriginsPage,
});

function CardNumber({ n }: { n: string }) {
  return (
    <span
      className="inline-block rounded-none px-3 py-1 text-[10px] font-normal uppercase tracking-[0.3em]"
      style={{ color: C.gold, border: `1px solid ${C.border}` }}
    >
      {n}
    </span>
  );
}

function TruthMarker({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 border-l-2 pl-5 pr-4 py-4"
      style={{
        borderColor: C.gold,
        background: "rgba(201,168,76,0.06)",
      }}
    >
      <div className="flex items-start gap-2">
        <Flame size={14} className="mt-0.5 shrink-0" style={{ color: C.gold }} />
        <p className="text-[15px] italic leading-[1.75]" style={{ color: "rgba(245,240,232,0.88)", fontWeight: 300 }}>
          {children}
        </p>
      </div>
    </div>
  );
}

function TeachingCard({
  number,
  title,
  subtitle,
  children,
  truthMarker,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  truthMarker: React.ReactNode;
}) {
  return (
    <article
      className="mx-auto max-w-[800px] rounded-none border p-8 md:p-10"
      style={{ backgroundColor: C.overlay, borderColor: C.border }}
    >
      <CardNumber n={number} />
      <h2
        className="mt-5 text-3xl font-light leading-tight md:text-4xl"
        style={{ fontFamily: fonts.display, color: C.text }}
      >
        {title}
      </h2>
      <p
        className="mt-2 text-lg italic"
        style={{ fontFamily: fonts.display, color: "rgba(245,240,232,0.65)" }}
      >
        {subtitle}
      </p>
      <div className="mt-6 space-y-5">
        {children}
      </div>
      <TruthMarker>{truthMarker}</TruthMarker>
    </article>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16.5px] leading-[1.85]" style={{ color: "rgba(245,240,232,0.85)", fontWeight: 300 }}>
      {children}
    </p>
  );
}

function MushroomDivider() {
  return (
    <section className="relative mx-auto max-w-[900px] overflow-hidden px-6" aria-hidden>
      <img
        src={MUSHROOM_FOREST}
        alt=""
        className="block w-full"
        style={{
          height: 320,
          objectFit: "cover",
          maskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />
    </section>
  );
}

const teachings = [
  {
    number: "01",
    title: "The First Lie",
    subtitle: "You were taught a history that was never true.",
    body: (
      <>
        <P>You were told humanity evolved slowly — from cave-dwelling primates scratching in the dirt, over millions of years, until finally arriving at civilization. That story is comfortable. It is also false.</P>
        <P>The evidence does not support gradual progression. What the archaeological and genetic record actually shows is a series of abrupt, unexplained leaps — moments where human capacity, biology, and civilization jumped forward in ways that natural selection alone cannot account for.</P>
        <P>The question has never been <em>whether</em> the official narrative is incomplete. The question is: <em>what are they not telling you, and why?</em></P>
        <P>True awakening begins here — not on a meditation cushion, but in the decision to stop accepting inherited stories and start asking the questions that were always forbidden.</P>
      </>
    ),
    truthMarker: "Every ancient culture on Earth — Sumerian, Egyptian, Vedic, Mayan, Hebrew — shares the same story of gods who came from the sky, created humanity, and one day departed. This is not mythology. This is suppressed history.",
  },
  {
    number: "02",
    title: "The Sumerians",
    subtitle: "A civilization that appeared from nowhere — fully formed.",
    body: (
      <>
        <P>Around 3,800 BCE in Mesopotamia (modern-day Iraq), the Sumerian civilization appeared. Not slowly. Not through incremental development. Fully formed.</P>
        <P>They arrived with: a complete written language (cuneiform — one of the earliest known), advanced mathematics including base-60 calculation (still used today in our 60-minute hours and 360-degree circles), precise astronomical knowledge of all planets in the solar system — including planets not "officially" rediscovered until the 18th and 19th centuries, complex legal codes, architectural engineering, agricultural systems, and a cosmological worldview of extraordinary detail.</P>
        <P>No known predecessor civilization explains them. Their language has no confirmed root connection to surrounding peoples. Their DNA tells a story of origin that mainstream science has no clean answer for.</P>
        <P>The Sumerians themselves were clear about where their knowledge came from: <em>the Anunnaki taught us.</em></P>
      </>
    ),
    truthMarker: "The Sumerian King List records kings who ruled for tens of thousands of years before the Great Flood — then shorter reigns after. Ancient scribes recorded this without apology. Modern historians call it myth. The Sumerians called it their history.",
  },
  {
    number: "03",
    title: "The Anunnaki",
    subtitle: "They came from the sky. They created a workforce. They called them human.",
    body: (
      <>
        <P>The word <strong>Anunnaki</strong> translates from ancient Sumerian as <em>"those who from the heavens came"</em> — or in some interpretations, <em>"royal blood"</em> or <em>"princely seed."</em></P>
        <P>According to the Sumerian tablets — thousands of clay tablets found in the ruins of ancient Mesopotamia, many now housed in the British Museum, the Oriental Institute of Chicago, and other institutions — the Anunnaki were an advanced civilization that arrived on Earth from a planetary body called <strong>Nibiru</strong>. Their mission: mine gold. Their solution: create a labor force capable of doing it.</P>
        <P>The tablets describe a being called <strong>Enki</strong> (chief scientist) combining their own genetic material with that of existing hominids to create a new species — <em>Adamu</em> — the first humans. The Sumerian creation text <em>Enuma Elish</em> describes this process in detail that reads less like mythology and more like a lab report.</P>
        <P>Zecharia Sitchin, scholar of ancient Semitic languages, spent decades translating these tablets and documenting this account in <em>The Earth Chronicles</em> series. His translations remain controversial precisely because they are specific, consistent, and difficult to dismiss.</P>
      </>
    ),
    truthMarker: "The Anunnaki did not disappear — they departed and left management systems in place. Those systems — bloodlines, hierarchies, religions, and control structures — are still running today.",
  },
  {
    number: "04",
    title: "The Human Blueprint",
    subtitle: "The evolutionary jump that science cannot explain.",
    body: (
      <>
        <P>The transition from Neanderthal to anatomically modern human (<em>Homo sapiens sapiens</em>) happened in a window of approximately 50,000–60,000 years.</P>
        <P>In evolutionary terms, that is instantaneous.</P>
        <P>Natural selection — the mechanism mainstream science uses to explain all biological change — requires millions of years to produce the kind of neurological, physiological, and cognitive complexity that separates modern humans from our nearest primate relatives. The math does not work.</P>
        <P>Beyond the speed: modern humans contain a segment of DNA — sometimes called <strong>junk DNA</strong> — that has no identified evolutionary origin and no match in any other species on Earth. Lloyd Pye, researcher and author of <em>Everything You Know Is Wrong</em>, documented the anomalous genetic signature of the human species and argued it is the clearest evidence of deliberate genetic engineering.</P>
        <P>The blueprint of the human being — our capacity for language, abstract thought, spiritual perception, creativity, and self-awareness — did not emerge from random mutation. It was <em>designed.</em></P>
      </>
    ),
    truthMarker: "You are not an accident of evolution. You are not a mistake. You are a deliberately constructed being with encoded potential that most humans never access — because they were never told it exists.",
  },
  {
    number: "05",
    title: "The Global Fingerprint",
    subtitle: "Pyramids on every continent. No explanation. No coincidence.",
    body: (
      <>
        <P>Pyramids exist in Egypt. In Sudan. In Mexico (Teotihuacán, Chichén Itzá). In Guatemala, Honduras, Peru, Bolivia. In China (the white pyramids near Xi'an, long hidden from public knowledge). In Bosnia. Underwater off the coast of Japan (the Yonaguni Monument). And on the ocean floor in regions that were above water during the last ice age.</P>
        <P>These structures were built by civilizations that — according to the official timeline — had no contact with one another, no shared language, no shared trade routes, and no shared technology.</P>
        <P>Yet the mathematical ratios encoded in the Great Pyramid of Giza (pi, phi, the precise dimensions of the Earth's circumference) appear again in Mesoamerican structures. The same star alignments. The same acoustic engineering. The same orientation to specific celestial points.</P>
        <P>This is not coincidence. It is a fingerprint — left by the same source civilization, seeding knowledge globally.</P>
        <P>Every ancient culture also shares: a creation story involving sky beings, a Great Flood narrative, a golden age before a cataclysm, and the promise of the return of the original teachers.</P>
      </>
    ),
    truthMarker: "The mainstream explanation for the pyramids — that humans with bronze tools and rope dragged 2.5-million-pound stones into perfect mathematical alignment using only muscle power — has never been successfully demonstrated or replicated. The official story is a placeholder, not a conclusion.",
  },
  {
    number: "06",
    title: "The Bloodline Agenda",
    subtitle: "The same families. Different centuries. Same agenda.",
    body: (
      <>
        <P>When the Anunnaki established civilization, they installed governing structures: kings appointed by divine authority, priestly classes with exclusive access to knowledge, and legal systems that enforced compliance. Before they departed, they ensured the continuation of their agenda through carefully maintained bloodlines.</P>
        <P>Those bloodlines run the world today.</P>
        <P>This is not speculation — it is genealogy. Research organizations and independent genealogists have documented the genetic and familial connections running through European royal houses, into American presidential lineages, through the heads of major banking institutions, media conglomerates, pharmaceutical manufacturers, and military-industrial complexes.</P>
        <P>The mechanisms of control have evolved: from open theocracy to constitutional governments, from temple priests to media anchors, from physical servitude to financial debt systems and information suppression. The function has not changed.</P>
        <P>Education teaches you what to think, not how to think. Media shapes perception before you have the chance to form your own. Religion provides a controlled spiritual narrative that keeps the individual disempowered. All of it — by design.</P>
      </>
    ),
    truthMarker: "You were not born into freedom. You were born into a management system. Recognizing the system is not paranoia — it is the first act of sovereignty.",
  },
  {
    number: "07",
    title: "Your Sovereign Lineage",
    subtitle: "You are not a product of the system. You are older than it.",
    body: (
      <>
        <P>Here is what they do not want you to know:</P>
        <P>The same beings who engineered the human genome encoded something into the design that was not intended for the workforce. A capacity for direct spiritual perception. A connection to source consciousness that bypasses every intermediary — every priest, every algorithm, every authority structure. A sovereign lineage that predates every government, every religion, and every bloodline currently running this planet.</P>
        <P>You feel it as the persistent sense that something is wrong with the world as presented. As the hunger for a deeper truth. As the moments of inexplicable knowing, synchronicity, and connection that the official worldview has no category for.</P>
        <P>That signal is not malfunction. That signal is your actual nature trying to break through the programming.</P>
        <P>The work of Soul True is not relaxation. It is not entertainment. It is <strong>deprogramming and re-sovereignization</strong> — returning each person to direct access to their own truth, their own lineage, and their own encoded potential.</P>
        <P>The readers. The sound. The plant medicines. The bodywork. The teachings. All of it is in service of one thing: <em>remembering who you actually are.</em></P>
      </>
    ),
    truthMarker: "Your soul is not a product of this civilization. It arrived here with a mission. The system was designed to make you forget that. You are here because some part of you refused to.",
  },
];

function OriginsPage() {
  return (
    <article style={{ background: C.bg, color: C.text, fontFamily: fonts.body }}>
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <Link to="/wisdom" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>← Wisdom</Link>
        <h1 className="mt-6 text-5xl md:text-6xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 300 }}>
          Origins
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The truth they buried. The history they rewrote. The lineage you forgot.
        </p>
      </header>

      <div className="mx-auto max-w-[860px] px-6 pb-28 space-y-12">
        {teachings.map((t, i) => (
          <div key={t.number}>
            <TeachingCard
              number={t.number}
              title={t.title}
              subtitle={t.subtitle}
              truthMarker={t.truthMarker}
            >
              {t.body}
            </TeachingCard>
            {(i === 2 || i === 5) && <div className="mt-12"><MushroomDivider /></div>}
          </div>
        ))}

        <p className="mt-16 text-[11px] italic text-center" style={{ color: "rgba(245,240,232,0.4)" }}>
          For educational and inspirational purposes only.
        </p>
      </div>
    </article>
  );
}
