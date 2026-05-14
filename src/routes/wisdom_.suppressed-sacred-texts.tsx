import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/suppressed-sacred-texts")({
  head: () => ({
    meta: [
      { title: "What They Removed — The Sacred Texts That Were Never Meant to Survive | Soul True" },
      { name: "description", content: "The Essenes, Mary Magdalene, the Gospel of Thomas, the Council of Nicaea, and the Gnostic core truth — what was buried, and why." },
      { property: "og:title", content: "Suppressed Sacred Texts — Soul True" },
      { property: "og:description", content: "The sacred texts that were never meant to survive — restored." },
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
          What They Removed
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The sacred texts that were never meant to survive.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>Who Were the Essenes</H>
        <P>Before there was a church, there was a mystery school. The Essenes were a Jewish sect living in the desert communities of Qumran and Mount Carmel in the centuries surrounding the life of Jeshua. They were not mainstream. They did not participate in the Temple economy. They did not recognize the authority of the Sanhedrin. They lived in intentional community, practiced ritual purification, studied the stars, honored the divine feminine, and understood the human body as a temple of living light. Both Jeshua and Mary were born into and educated within this tradition. What he later taught publicly was the inner teaching of the Essenes — taken out of the desert and given to the world.</P>

        <H>What the Essenes Actually Taught</H>
        <P>The Essene teaching was simple and revolutionary: God is not outside you. God is the living intelligence within every cell of your being. The Kingdom of Heaven is not a place you go when you die — it is a state of consciousness available to you right now. They taught direct communion with the divine requiring no intermediary, no priest, no institution. They honored both the masculine and feminine aspects of God. They understood the body, emotions, mind, and spirit as an integrated system requiring care and alignment. They were, in every sense, the original holistic practitioners and the original sovereign spiritual teachers.</P>

        <H>Mary Magdalene's True Role</H>
        <P>The most deliberately distorted figure in Western spiritual history is Mary Magdalene. She was not a prostitute. That characterization was introduced by Pope Gregory I in 591 AD — a political decision, not a spiritual one. The Gnostic Gospels, unavailable to the public for nearly two thousand years, describe Mary as Jeshua's closest disciple, his spiritual equal, and the one to whom he revealed his deepest teachings. The Gospel of Mary, one of the most significant documents ever discovered, shows her leading the other disciples after the resurrection — until Peter's ego intervened. The suppression of Mary Magdalene was the suppression of the divine feminine from Western spirituality. That suppression ends here.</P>

        <H>The Gospel of Thomas</H>
        <P>The Gospel of Thomas contains 114 direct sayings attributed to Jeshua. No miracles. No resurrection narrative. No theology. Just his words. It was excluded from the canonical Bible entirely. Saying 3 reads:</P>
        <blockquote className="my-8 pl-6 text-[18px] italic" style={{ borderLeft: `2px solid ${C.gold}`, color: C.text, fontFamily: fonts.display }}>
          "The Kingdom of God is inside of you and outside of you. When you come to know yourselves, then you will be known, and you will realize that you are the sons of the living Father."
        </blockquote>
        <P>This is not the message of an institution that requires your dependence. This is the message of a teacher who came to set you free.</P>

        <H>The Council of Nicaea — 325 AD</H>
        <P>In 325 AD, Emperor Constantine convened the Council of Nicaea. Three hundred bishops gathered to vote on the nature of God, the divinity of Jeshua, and which texts would constitute the official Bible of the Roman Empire. Documents were debated, voted on, and selected — not by divine revelation but by political consensus. Texts that emphasized inner divinity, direct God connection, and the authority of the individual soul were excluded. What remained was a version of the story that required institutional mediation between humanity and God. The excluded texts did not disappear. They were hidden. Some were buried in the Egyptian desert near Nag Hammadi, where they were discovered in 1945. Others survived in fragments. All of them point to the same truth that was voted out of the official record.</P>

        <H>The Gnostic Core Truth</H>
        <P>Gnosis means direct knowledge — not belief, not faith, not doctrine, but direct personal experience of the divine. The Gnostic tradition, which predates Christianity and runs through it like an underground river, teaches one central truth: you are a divine spark of God having a human experience. You did not fall from grace. You are not broken. You do not need to be saved by an external authority. You need to remember what you are. Every Gnostic text, every Essene teaching, every suppressed gospel points to the same door — and that door opens from the inside.</P>

        <H>Why It Was Buried</H>
        <P>A humanity that knows it is divine cannot be controlled through guilt. A humanity with direct access to God does not need to tithe to an institution. A humanity that understands its own sovereignty does not submit to emperors, kings, or systems of debt. The suppression of these teachings was not theological. It was strategic. And it has been the most consequential act of information control in human history. Until now.</P>

        <p className="mt-16 text-[11px] italic text-center" style={{ color: "rgba(245,240,232,0.4)" }}>
          For educational and inspirational purposes only.
        </p>
      </div>
    </article>
  );
}
