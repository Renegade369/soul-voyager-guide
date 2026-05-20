import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const C = { bg: "#0A0B09", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/sacred-plants")({
  head: () => ({
    meta: [
      { title: "Sacred Plant Allies & The Suppression of Ancient Wisdom | Soul True" },
      { name: "description", content: "The ancient frequencies they tried to silence — and why they matter now. The history of sacred plant suppression and the path to reclaiming sovereign vibrational wellness." },
      { property: "og:title", content: "Sacred Plant Allies — Soul True" },
      { property: "og:description", content: "The ancient frequencies they tried to silence — and why they matter now." },
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
function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 pl-6 text-[22px] md:text-[24px] italic leading-[1.5]" style={{ borderLeft: `2px solid ${C.gold}`, color: C.gold, fontFamily: fonts.display }}>
      {children}
    </blockquote>
  );
}
function Divider() {
  return <hr className="my-14 border-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}66, transparent)` }} />;
}

function Page() {
  return (
    <article style={{ background: C.bg, color: C.text, fontFamily: fonts.body }}>
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <Link to="/wisdom" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>← Back to Wisdom</Link>
        <h1 className="mt-6 text-5xl md:text-6xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 300 }}>
          Sacred Plant Allies <em className="italic" style={{ color: C.gold }}>& the Suppression of Ancient Wisdom</em>
        </h1>
        <p className="mt-5 text-lg italic" style={{ color: "rgba(245,240,232,0.7)", fontFamily: fonts.display }}>
          The frequencies they tried to silence — and why they matter now.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-20">
        <H>The Ancient Frequencies Were Always Ours</H>
        <P>The use of sacred plant allies for vibrational wellness and consciousness expansion has been woven into human culture since the beginning of time. These plant frequencies — gifted by the Earth herself — were not fringe practices. They were the foundation of sovereign spiritual life for countless civilizations across every continent.</P>
        <P>That foundation was deliberately dismantled.</P>
        <P>What you are about to read is not conspiracy. It is history. And reclaiming this knowledge is part of waking up.</P>

        <Divider />

        <H>How the Suppression Began</H>
        <P>Centralized religious and governmental powers understood something crucial: a person who can access altered states of consciousness, commune with nature, and access their own inner knowing — cannot easily be controlled.</P>
        <Pull>"The intent was not public safety. The intent was the consolidation of power."</Pull>
        <P>During the Inquisition and colonial expansion, indigenous plant wisdom was violently suppressed. Shamans were persecuted. Ceremonies were outlawed. Libraries of oral tradition were burned or forgotten.</P>
        <P>This is not ancient history. The same pattern continued — and accelerated — into the modern era.</P>

        <Divider />

        <H>When Profit Replaced Plant Wisdom</H>
        <P>With the rise of industrial pharmaceutical culture, the economics of vibrational wellness shifted dramatically. Plants cannot be patented. You cannot own a frequency that the Earth produces freely. That is a problem — not for humanity, but for those whose financial empires depend on owning the solutions to human suffering.</P>
        <P>Pharmaceutical interests lobbied governments, shaped research funding, and influenced regulatory agencies to marginalize plant-based frequency work. Not because the plants don't work. Because they work too well — and they're free.</P>
        <P>The result: generations of people disconnected from their own natural allies, dependent instead on synthetic compounds that suppress symptoms without addressing the soul.</P>

        <Divider />

        <H>Cannabis — The Sacred Ally They Criminalized</H>
        <P>Cannabis is perhaps the most documented example of sacred plant suppression in modern history. Used ceremonially and for vibrational support across thousands of years and dozens of cultures, it was criminalized in the 20th century through a coordinated campaign rooted in political and corporate interests — not science.</P>
        <Pull>"The plant itself never changed. Only the story told about it did."</Pull>
        <P>The suppression of cannabis did not just remove a plant. It removed an entire modality of consciousness support from public access. It imprisoned healers, shamans, and everyday people seeking natural vibrational alignment. It silenced decades of legitimate inquiry into the plant's energetic and physiological gifts.</P>

        <Divider />

        <H>The War on Drugs Was a War on Consciousness</H>
        <P>The so-called "War on Drugs" — launched in earnest in the 1970s and still active today — is, at its core, a war on expanded consciousness. It targeted indigenous healers, ceremonial practitioners, and plant medicine communities with disproportionate legal force.</P>
        <Pull>"Cultural knowledge that took millennia to develop was interrupted in a single generation."</Pull>
        <P>Elders were jailed. Lineages were broken. Communities were criminalized for practicing what their ancestors had always known. This is the wound we are now being called to address — not with anger, but with awareness.</P>

        <Divider />

        {/* Call to action block */}
        <section
          className="my-14 rounded-none border p-8"
          style={{ borderColor: C.gold, background: C.overlay }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The Path Forward</p>
          <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: fonts.display, color: C.text, fontWeight: 400 }}>
            Reclaiming the Frequencies
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
            Waking up means remembering what was taken — and choosing to reclaim it. Here is how you can stand with this work:
          </p>
          <ul className="mt-6 space-y-5 text-[15.5px] leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
            <li><span className="font-semibold" style={{ color: C.gold, fontFamily: fonts.display, fontSize: 18 }}>Decriminalization & Legalization</span><br />Advocate for sovereign access to sacred plant allies, starting with cannabis, so that research, ceremony, and vibrational support can flow freely.</li>
            <li><span className="font-semibold" style={{ color: C.gold, fontFamily: fonts.display, fontSize: 18 }}>Support Indigenous Wisdom</span><br />Amplify the voices of indigenous communities who have protected this knowledge at great cost. Their wisdom belongs to all of us.</li>
            <li><span className="font-semibold" style={{ color: C.gold, fontFamily: fonts.display, fontSize: 18 }}>Integrative Frequency Wellness</span><br />Champion approaches that honor both ancient plant wisdom and modern understanding — not one instead of the other.</li>
            <li><span className="font-semibold" style={{ color: C.gold, fontFamily: fonts.display, fontSize: 18 }}>Educate & Share</span><br />Counter the narrative. Share what you know. Break the stigma. The frequency of truth spreads faster than the frequency of fear.</li>
          </ul>
        </section>

        <Divider />

        <H>Add Your Voice</H>
        <P>Share your experiences and knowledge. Use these tags to find your people and grow the conversation:</P>
        <div className="mt-4 flex flex-wrap gap-2">
          {["#SacredPlants", "#PlantFrequencies", "#DecriminalizeNature", "#SpiritualRevolution", "#IndigenousWisdom", "#ConsciousnessExpansion", "#VibrationalWellness"].map((t) => (
            <span key={t} className="rounded-full border px-4 py-1.5 text-[12px] tracking-wide" style={{ borderColor: C.border, color: C.gold, background: "rgba(201,168,76,0.06)" }}>
              {t}
            </span>
          ))}
        </div>
        <P><span style={{ color: "rgba(245,240,232,0.7)" }}>Platform suggestion: </span><a href="https://brighteon.social" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: C.gold }}>Brighteon.social</a> — a free-speech platform for conscious communities.</P>

        <Divider />

        <H>Organizations Doing the Work</H>
        <div className="mt-6 grid gap-5 grid-cols-1 md:[grid-template-columns:repeat(3,minmax(0,1fr))]">
          {[
            { name: "MAPS", url: "https://maps.org", domain: "maps.org", desc: "Multidisciplinary Association for Psychedelic Studies — pioneering research and policy work on psychedelic-assisted vibrational support." },
            { name: "Decriminalize Nature", url: "https://decriminalizenature.org", domain: "decriminalizenature.org", desc: "A grassroots movement working to decriminalize sacred plant allies at the municipal and state level." },
            { name: "Chacruna Institute", url: "https://chacruna.net", domain: "chacruna.net", desc: "Advancing plant sacrament policy reform and indigenous reciprocity." },
          ].map((o) => (
            <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 flex-col overflow-hidden rounded-lg border p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(201,168,76,0.35)] [overflow-wrap:anywhere] [word-break:break-word]" style={{ background: C.overlay, borderColor: C.border }}>
              <span style={{ color: C.gold }}><Leaf size={22} /></span>
              <h3 className="mt-4 text-xl [overflow-wrap:anywhere] [word-break:break-word]" style={{ fontFamily: fonts.display, color: C.text }}>{o.name}</h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] [overflow-wrap:anywhere] [word-break:break-all]" style={{ color: C.gold }}>{o.domain}</p>
              <p className="mt-3 text-sm leading-relaxed [overflow-wrap:anywhere] [word-break:break-word]" style={{ color: "rgba(245,240,232,0.7)" }}>{o.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/wisdom" className="text-[11px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>← Back to Wisdom</Link>
        </div>

        <p className="mt-14 text-[11px] italic text-center leading-relaxed" style={{ color: "rgba(245,240,232,0.4)" }}>
          The content on this page is intended for educational and consciousness-expansion purposes only. Soul True does not provide vibrational wellness advice, frequency treatment, or guidance on the use of any substance. Always consult qualified professionals and know the laws in your jurisdiction. Soul True supports sovereignty, education, and the honoring of indigenous wisdom traditions.
        </p>
      </div>
    </article>
  );
}
