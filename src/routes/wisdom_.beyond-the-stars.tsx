import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/beyond-the-stars")({
  head: () => ({
    meta: [
      { title: "Beyond the Stars — Civilizations Across the Cosmos | Soul True" },
      { name: "description", content: "Other planets, star systems, and the civilizations seeded across the cosmos — what the elders and the new contactees agree upon." },
      { property: "og:title", content: "Beyond the Stars — Soul True" },
      { property: "og:description", content: "Civilizations across the cosmos — Pleiadian, Sirian, Arcturian lineages, the Galactic Federation, and star seeds." },
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
          Beyond the Stars — <em style={{ color: C.gold }}>Civilizations Across the Cosmos</em>
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          Other planets, star systems, and the civilizations seeded across the cosmos — what the elders and the new contactees agree upon.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>The Question Has Already Been Answered</H>
        <P>The question of whether humanity is alone in the universe has been answered — not by governments, but by the convergence of indigenous elder traditions, ancient astronomical texts, credible whistleblowers, and the simple mathematics of probability. The Milky Way alone contains an estimated 400 billion stars. The observable universe contains more galaxies than there are grains of sand on every beach on Earth. The statistical likelihood of Earth being the singular location of conscious life is effectively zero. What remains is not whether other civilizations exist — but what their relationship to humanity has been, and what it is now.</P>

        <H>The Star Systems Our Ancestors Named</H>
        <P>Across dozens of unconnected indigenous traditions — the Hopi, the Dogon of Mali, the Cherokee, the ancient Egyptians, the Sumerians — specific star systems are named not as distant lights but as ancestral homelands. The Pleiades appear in the oral traditions of cultures on every inhabited continent, consistently described as a place of origin or a source of spiritual teaching. The Dogon people of Mali possessed detailed astronomical knowledge of the Sirius binary star system — including its invisible companion Sirius B — centuries before Western astronomy confirmed its existence.</P>
        <P>Contemporary accounts from credible sources — military personnel, aerospace engineers, government officials across multiple countries — describe contact with beings who identify themselves as originating from these same systems. The consistency across cultures and centuries is not coincidence. It is data.</P>

        <H>The Galactic Federation</H>
        <P>Multiple whistleblowers, channeled sources, and indigenous traditions reference a governing body of cosmic civilizations — variously called the Galactic Federation, the Confederation of Worlds, or the Council of Light. The accounts vary in detail but agree on core points: that this body operates on principles of non-interference with developing civilizations, that Earth has been under a form of quarantine during its current developmental cycle, and that this quarantine is in the process of being lifted as human consciousness reaches a threshold frequency. Whether this is literal cosmic governance or a metaphorical framework for understanding the organization of consciousness across dimensions — the concept points toward a universe that is structured, inhabited, and paying attention.</P>

        <H>Star Seeds & Soul Origins</H>
        <P>The concept of star seeds — souls that have incarnated in other star systems before choosing Earth — appears independently in Vedic cosmology, Gnostic texts, indigenous traditions, and contemporary spiritual communities. The common thread: some souls on Earth carry a cellular memory of other worlds, other dimensions, other forms of existence. They feel "homesick" for a place they cannot name. They are drawn to the stars. They know, in a way that precedes language, that they came from somewhere else.</P>
        <P>This is not a romantic fantasy. It is a framework that makes sense of the experience of millions of people who feel out of place on Earth — not because they don't belong here, but because they remember belonging somewhere else first.</P>

        <H>The Cosmos Is Paying Attention</H>
        <P>The question of whether we are alone in the universe is not just a scientific question. It is a spiritual question. It shapes how we see ourselves, how we treat each other, and how we relate to the larger cosmos we are part of. If we are alone, then everything we do is contained within this planet, and the only meaning is the meaning we make. If we are not alone — if the universe is structured, inhabited, and paying attention — then everything we do ripples outward into a larger field of consciousness.</P>
        <P><em style={{ color: C.gold, fontFamily: fonts.display, fontSize: 22 }}>The elders, the whistleblowers, and the mathematics all point in the same direction: we are not alone. We have never been alone. And the cosmos is paying attention to what happens next.</em></P>

        <H>Where to Go Deeper</H>
        <ul className="space-y-3 text-[16px]" style={{ color: "rgba(245,240,232,0.8)" }}>
          {[
            ["The Sirius Mystery (Robert Temple, 1976)", "the definitive book on the Dogon knowledge of the Sirius binary system"],
            ["The Pleiadian Agenda (Barbara Marciniak, 1995)", "channeled teachings from the Pleiades"],
            ["The Arcturian Anthology (Troy Dunham, 2014)", "channeled teachings from Arcturus"],
            ["Passport to Magonia (Jacques Vallée, 1969)", "the academic study of contact traditions across cultures"],
            ["The Council of Light", "channeled through various sources — teachings on the Galactic Federation"],
            ["Billy Meier's Pleiadian Contact Photos", "the most well-documented modern contact case"],
            ["The work of David Grusch, Luis Elizondo, and other modern whistleblowers", "congressional testimony and official disclosures on non-human contact"],
          ].map(([title, note]) => (
            <li key={title} className="flex gap-3">
              <span style={{ color: C.gold }}>◆</span>
              <span><strong style={{ color: C.text, fontWeight: 400 }}>{title}</strong> — <em>{note}</em></span>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[11px] italic text-center leading-relaxed" style={{ color: "rgba(245,240,232,0.45)" }}>
          The content on this page is intended for educational and consciousness-expansion purposes only. Soul True does not claim exclusive authority for any interpretation of cosmic civilizations or contact traditions. Always engage with these topics through study, discernment, and your own inner knowing.
        </p>
      </div>
    </article>
  );
}
