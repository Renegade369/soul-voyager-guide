import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/matrix-origins")({
  head: () => ({
    meta: [
      { title: "The Matrix Origins — The Slave System From the Beginning | Soul True" },
      { name: "description", content: "The architecture of human control is ancient, designed, and still operating today. The blueprint, the handoff, the modern matrix, and the awakening." },
      { property: "og:title", content: "The Matrix Origins — Soul True" },
      { property: "og:description", content: "The ancient architecture of control — and the awakening that ends it." },
    ],
  }),
  component: Page,
});

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 mb-5 text-3xl md:text-4xl" style={{ fontFamily: fonts.display, color: C.gold, fontWeight: 400 }}>{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-[17px] leading-[1.85]" style={{ color: "rgba(245,240,232,0.85)", fontWeight: 300 }}>{children}</p>;
}

function Page() {
  return (
    <article style={{ background: C.bg, color: C.text, fontFamily: fonts.body }}>
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <Link to="/wisdom" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>← Wisdom</Link>
        <h1 className="mt-6 text-5xl md:text-6xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 300 }}>
          The Matrix Origins
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The slave system from the beginning.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>The Ancient Blueprint</H>
        <P>The story of human control did not begin with governments or corporations. It began in the ancient world — written in clay, carved in stone, encoded in myth. The Sumerian cuneiform tablets, among the oldest written records on Earth, describe a ruling class of beings who organized human labor into hierarchical systems of service. The Epic of Gilgamesh reveals a king who owned his people's bodies and time. The Pyramid Texts of Egypt map a cosmic order in which divine bloodlines ruled by divine right — and everyone else served.</P>
        <P>The Book of Enoch, removed from the canonical Bible, describes the Watchers — a class of beings who descended, intermingled with humanity, and introduced systems of war, vanity, and control that altered the trajectory of human civilization. The Dead Sea Scrolls, hidden for nearly two thousand years, preserve the voices of communities who withdrew from the control system entirely because they saw it clearly.</P>
        <P>The Hindu Vedic texts speak of cycles of ages — the Yugas — in which consciousness descends and humanity forgets its divine nature. The current age, the Kali Yuga, is described as the age of darkness, materialism, and spiritual amnesia. We are living in its final chapter.</P>
        <P>Researchers including Michael Tellinger, Anton Parks, and Gerald Clark have spent decades cross-referencing these ancient sources and arriving at the same conclusion: the architecture of control is not modern. It is ancient. And it was designed.</P>

        <H>The Handoff</H>
        <P>Every empire falls. But the system never does. It transfers. From Sumer to Egypt. From Egypt to Rome. From Rome to the Vatican. From the Vatican to the Crown. From the Crown to the central banking system. The faces change. The bloodlines do not. The same families who held power in the ancient world hold it today — not through accident but through deliberate, multigenerational strategy. They understood something humanity forgot: whoever controls the money, the narrative, and the calendar controls the people.</P>

        <H>The Modern Matrix</H>
        <P>The modern version of the slave system requires no chains. It requires debt, distraction, and disconnection from self. It operates through financial systems designed to keep the average person perpetually working to survive. Through media that tells you what to think, what to fear, and what to want. Through education that produces compliant workers, not sovereign thinkers. Through religion, in its institutional form, that places God outside of you and a human authority between you and the divine. The game board looks different. The game is identical.</P>

        <H>The Awakening</H>
        <P>Something is shifting. It has been building for decades and it is now undeniable. Millions of people across the world are simultaneously waking up to the same truth — that the reality they were handed is a construct, and that something deeper and more real exists beneath it. This is not coincidence. Ancient traditions predicted this moment. The end of the Kali Yuga. The return of the age of truth. The veils are thinning. The system is revealing itself through its own desperation. And a humanity that can see the cage is a humanity that can choose to walk out of it.</P>
        <P><em style={{ color: C.gold, fontFamily: fonts.display, fontSize: 22 }}>You are not here by accident. You woke up for a reason.</em></P>

        <H>Sources &amp; Rabbit Holes</H>
        <ul className="space-y-3 text-[16px]" style={{ color: "rgba(245,240,232,0.8)" }}>
          {[
            ["Michael Tellinger", "Ubuntu and Slave Species of the Gods"],
            ["Anton Parks", "The Secret of the Dark Stars"],
            ["Gerald Clark", "The Anunnaki of Nibiru"],
            ["The Sumerian cuneiform tablets", "British Museum digital archive"],
            ["The Book of Enoch", "R.H. Charles translation, public domain"],
            ["The Dead Sea Scrolls", "Leon Levy Dead Sea Scrolls Digital Library"],
            ["Zecharia Sitchin", "The Earth Chronicles series"],
            ["The Pyramid Texts", "University of Chicago Oriental Institute translations"],
          ].map(([author, work]) => (
            <li key={author} className="flex gap-3">
              <span style={{ color: C.gold }}>◆</span>
              <span><strong style={{ color: C.text, fontWeight: 400 }}>{author}</strong> — <em>{work}</em></span>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[11px] italic text-center" style={{ color: "rgba(245,240,232,0.4)" }}>
          For educational and inspirational purposes only.
        </p>
      </div>
    </article>
  );
}
