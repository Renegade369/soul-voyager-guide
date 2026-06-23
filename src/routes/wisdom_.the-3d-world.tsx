import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/the-3d-world")({
  head: () => ({
    meta: [
      { title: "The 3D World — The Hidden Architecture of Reality | Soul True" },
      { name: "description", content: "The veiled nature of money, the lost history of humanity, and the body as a sacred instrument." },
      { property: "og:title", content: "The 3D World — Soul True" },
      { property: "og:description", content: "The hidden architecture of life on Earth — money, history, and the body as antenna." },
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
        <Link to="/wisdom" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>← Back to Wisdom</Link>
        <h1 className="mt-6 text-5xl md:text-6xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 300 }}>
          The 3D World — <em style={{ color: C.gold }}>The Hidden Architecture of Reality</em>
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The veiled nature of money, the lost history of humanity, and the body as a sacred instrument.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>The Hidden Architecture of Reality</H>
        <P>Most of what we call reality was constructed — not discovered. The physical world we navigate daily is layered: a visible surface of cities, careers, economies, and social structures, and beneath it an invisible architecture of systems, frequencies, and agreements that most people never examine. The 3D world is not wrong or evil. It is simply incomplete. It is one layer of a much larger existence — and understanding how it was built is the first step to moving beyond its limitations.</P>

        <H>The Veiled Nature of Money</H>
        <P>Money is the most powerful belief system on Earth. Not because of what it is — it is paper, digits, agreed-upon abstraction — but because of what we have been convinced it means. The modern financial system was not designed for your freedom. It was designed for your perpetual participation. Debt-based currency ensures that more money is always owed than exists. Compound interest transfers wealth upward across generations. Inflation quietly taxes savings. None of this is hidden — it is in the textbooks of every economics department. What is hidden is the alternative: that sovereign individuals and communities have always had the capacity to create, exchange, and thrive outside the permission of central institutions.</P>
        <P>The veiled truth about money is not that it is evil. It is that it is optional — and the moment you understand its nature, your relationship with it changes entirely.</P>

        <H>Lost Human History</H>
        <P>The history taught in schools begins around 3,000 BCE with the first civilizations of Sumer and Egypt. But the archaeological record tells a different story. Göbekli Tepe in Turkey dates to at least 12,000 BCE — a complex of massive carved stone pillars built by a civilization that, according to official history, should not have existed. The Sphinx enclosure shows water erosion patterns consistent with a wetter climate 10,000–7,000 BCE. Underwater structures off the coasts of Japan, India, and Cuba suggest advanced civilizations predating the last great geological shift. The Piri Reis map of 1513 accurately depicts the coastline of Antarctica — free of ice — centuries before its official discovery, suggesting it was copied from far older source maps.</P>
        <P>The honest position is this: we do not know how old human civilization is. We know that what we have been taught is incomplete. And a humanity that does not know its true history cannot make sense of its present — or claim its full future.</P>

        <H>The Body as Antenna</H>
        <P>Your body is not a meat vehicle for your brain. It is a sophisticated electromagnetic instrument capable of receiving, transmitting, and processing frequencies far beyond what current mainstream science fully acknowledges. The heart generates an electromagnetic field 60 times stronger in amplitude than the brain — measurable several feet outside the body. The gut contains over 500 million neurons and produces more serotonin than the brain. The fascia — the connective tissue network running through the entire body — functions as a crystalline semiconductor, conducting piezoelectric signals throughout the system.</P>
        <P>Ancient traditions knew this. They built entire practices around the body as a sacred instrument: breathwork to alter consciousness, fasting to sharpen perception, movement to release trapped frequencies, sound to recalibrate the nervous system. Modern science is arriving at the same conclusions through different language. Your body is not a problem to be managed. It is a technology to be understood.</P>

        <H>The 3D World Is One Layer — Not the Whole</H>
        <P>Understanding the hidden architecture of the 3D world is not about rejecting it. It is about seeing it clearly. The money system is optional. The history is incomplete. The body is a sacred instrument. When you understand these three things, you stop being a passive participant in systems that were designed to extract your attention, your labor, and your vitality — and you start being a sovereign creator of your own reality.</P>
        <P><em style={{ color: C.gold, fontFamily: fonts.display, fontSize: 22 }}>The 3D world is one layer of existence. There are others. And the moment you remember that, everything changes.</em></P>

        <H>Where to Go Deeper</H>
        <ul className="space-y-3 text-[16px]" style={{ color: "rgba(245,240,232,0.8)" }}>
          {[
            ["The Creature from Jekyll Island (1994)", "the definitive book on the hidden architecture of the Federal Reserve"],
            ["Göbekli Tepe: The Temple of the Serpent", "Andrew Collins — the archaeological site that rewrote human history"],
            ["The Heart's Code (1998)", "Paul Pearsall — the science of the heart's electromagnetic field"],
            ["The Body Electric (1985)", "Robert Becker — the foundational text on the body's electromagnetic nature"],
            ["The Fascia Research Congress", "ongoing academic research into the body's crystalline semiconductor network"],
            ["The Piri Reis Map", "the 1513 map that shouldn't exist"],
          ].map(([title, note]) => (
            <li key={title} className="flex gap-3">
              <span style={{ color: C.gold }}>◆</span>
              <span><strong style={{ color: C.text, fontWeight: 400 }}>{title}</strong> — <em>{note}</em></span>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[11px] italic text-center leading-relaxed" style={{ color: "rgba(245,240,232,0.45)" }}>
          The content on this page is intended for educational and consciousness-expansion purposes only. Soul True does not provide financial, medical, or historical advice. Always engage with these topics through study, discernment, and your own inner knowing.
        </p>
      </div>
    </article>
  );
}
