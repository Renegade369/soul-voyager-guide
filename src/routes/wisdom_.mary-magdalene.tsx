import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/mary-magdalene")({
  head: () => ({
    meta: [
      { title: "Mary Magdalene — The Woman They Tried to Erase | Soul True" },
      { name: "description", content: "The apostle to the apostles, the keeper of the true teachings, and the sacred feminine they tried to bury." },
      { property: "og:title", content: "Mary Magdalene — Soul True" },
      { property: "og:description", content: "The apostle to the apostles — and the woman they tried to erase from the story." },
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
function L({ items }: { items: string[] }) {
  return (
    <ul className="mb-5 space-y-2 pl-1 text-[17px] leading-[1.8]" style={{ color: "rgba(245,240,232,0.85)", fontWeight: 300 }}>
      {items.map((it) => (
        <li key={it} className="flex gap-3"><span style={{ color: C.gold }}>◆</span><span>{it}</span></li>
      ))}
    </ul>
  );
}

function Page() {
  return (
    <article style={{ background: C.bg, color: C.text, fontFamily: fonts.body }}>
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <Link to="/wisdom" className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>← Back to Wisdom</Link>
        <h1 className="mt-6 text-5xl md:text-6xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 300 }}>
          Mary Magdalene — <em style={{ color: C.gold }}>The Woman They Tried to Erase</em>
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The apostle to the apostles, the keeper of the true teachings, and the sacred feminine they tried to bury.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>The Most Important Woman in Christianity You've Never Been Taught About</H>
        <P>Mary Magdalene is mentioned by name twelve times in the New Testament — more than most of the apostles. She was present at the crucifixion. She was the first person to see the risen Jeshua. She was sent by Jeshua himself to tell the other apostles the news of the resurrection. The early Church called her "the Apostle to the Apostles."</P>
        <P>Then the story changed.</P>
        <P>Over the course of several centuries, Mary Magdalene was transformed from a powerful spiritual leader into a repentant prostitute. The transformation was not based on scripture. It was based on a series of deliberate misreadings, conflations, and political decisions by the institutional Church — decisions designed to suppress the sacred feminine and centralize spiritual authority in a male hierarchy.</P>
        <P>What you are about to read is the true story of Mary Magdalene — and why her erasure is one of the most consequential acts of suppression in human history.</P>

        <H>The Historical Mary</H>
        <P>The historical Mary Magdalene — Miriam of Magdala — was a woman from the fishing village of Magdala on the western shore of the Sea of Galilee. Magdala was a wealthy town, known for its fish trade and its synagogue. Mary was likely a woman of means.</P>
        <P>The New Testament describes her as a woman from whom seven demons had been cast out by Jeshua (Luke 8:2). The Greek word is <em>daemonia</em> — and in the original context, this did not mean "evil spirits" in the modern sense. It meant energies, afflictions, or conditions that were considered outside the norm. Mary may have been a healer, a visionary, or a woman who had undergone a profound spiritual transformation.</P>
        <P>After her encounter with Jeshua, she became one of his most devoted followers. She traveled with him. She supported his ministry financially (along with other women). She was present at the crucifixion when most of the male apostles had fled. And she was the first witness to the resurrection.</P>
        <P>This is not a marginal figure. This is a central one.</P>

        <H>The First Person to See the Risen Christ</H>
        <P>In every Gospel account of the resurrection, Mary Magdalene is either the first or among the first to see the risen Jeshua:</P>
        <L items={[
          "Matthew 28: She and 'the other Mary' encounter the risen Christ on their way from the tomb",
          "Mark 16: She is the first to see him; he appears to her first",
          "Luke 24: She and the other women bring the news to the apostles, who do not believe them",
          "John 20: She is alone at the tomb, sees the risen Christ, and he sends her to tell the others",
        ]} />
        <P>In the Gospel of John, the scene is particularly striking. Mary is weeping at the tomb. She does not recognize Jeshua at first — she thinks he is the gardener. When he reveals himself, she cries out "Rabboni!" (Teacher). He tells her: "Do not cling to me, for I have not yet ascended to the Father. Go to my brothers and say to them: I am ascending to my Father and your Father, to my God and your God."</P>
        <P>Mary Magdalene was the first evangelist. The first person sent to proclaim the resurrection. The early Church honored her with the title "Apostle to the Apostles."</P>

        <H>The Text They Excluded From the Bible</H>
        <P>The Gospel of Mary (also called the Gospel of Mary Magdalene) is a 2nd-century text discovered in 1896 in a Greek manuscript in Cairo. It is a dialogue between Mary and the other apostles after the resurrection. In it, Mary shares a private vision she received from Jeshua — and the apostles initially do not believe her. Peter and Andrew are skeptical. Levi defends her. Mary is told to share what she has seen.</P>
        <P>The text is significant for several reasons:</P>
        <L items={[
          "It presents Mary as the recipient of private teachings from Jeshua — teachings not given to the male apostles",
          "It presents her as a spiritual authority whose vision is to be trusted",
          "It includes a Gnostic cosmology — the soul's ascent through the archons (rulers) of the material world",
          "It was excluded from the canon — along with the Gospels of Thomas, Philip, and Truth",
        ]} />
        <P>The Gospel of Mary is not a forgery. It is one of many early Christian texts that did not survive the canonization process. Its existence proves that there were multiple, competing versions of Christianity in the first centuries — and that the version that won was not the only one.</P>

        <H>What Mary Magdalene Represented</H>
        <P>Mary Magdalene was not just a historical figure. She was the embodiment of the sacred feminine in early Christianity — the principle that the divine is not exclusively male, that wisdom (Sophia) is feminine, that spiritual authority can flow through women as fully as through men.</P>
        <P>In the Gnostic traditions, Mary Magdalene was understood as the bride of Christ — not in a romantic sense, but in the mystical sense. The sacred marriage (<em>hieros gamos</em>) of the masculine and feminine principles within each soul. The union of wisdom and love. The completion of the divine image.</P>
        <P>The suppression of Mary Magdalene was not about one woman. It was about the suppression of the feminine principle itself in Western spirituality. When the institutional Church removed Mary from her position of authority, it removed the template for the sacred feminine in Christianity. What remained was a male-dominated hierarchy that mirrored the Roman political structure — not the original teaching of Jeshua.</P>

        <H>The Cup, the Blood, and the Bride</H>
        <P>The Holy Grail legend — the search for the cup Jeshua used at the Last Supper — is one of the most enduring myths in Western culture. But the original Grail was not a cup. The original Grail was a woman.</P>
        <P>In the medieval Grail romances — particularly Chrétien de Troyes' Perceval, the Story of the Grail (c. 1180) and the later Wolfram von Eschenbach's Parzival (c. 1200) — the Grail is described as a vessel that nourishes and heals. In some versions, it is explicitly identified with Mary Magdalene, who carried the blood of Christ (his teachings, his lineage, his children) out of Jerusalem and into Europe.</P>
        <P>The Cathar tradition of southern France (12th–13th centuries) explicitly taught that Mary Magdalene was the bride of Christ, that she fled to France after the crucifixion, that she bore his children, and that her lineage became the Merovingian dynasty of Frankish kings.</P>
        <P>The Catholic Church destroyed the Cathars in the Albigensian Crusade (1209–1229) — one of the most brutal religious wars in European history. Tens of thousands were killed. The teaching was erased. But the Grail legend survived — encoded in the romances, in the architecture of the cathedrals, in the paintings of the Renaissance.</P>

        <H>How They Turned an Apostle Into a Sinner</H>
        <P>The transformation of Mary Magdalene from apostle to prostitute happened in stages:</P>
        <P><strong style={{ color: C.gold }}>Stage 1 — The Conflation (591 CE):</strong> Pope Gregory the Great delivered a homily in which he explicitly conflated three separate women from the New Testament into one figure: Mary Magdalene (the apostle), the unnamed "sinful woman" who anointed Jeshua's feet in Luke 7, and Mary of Bethany (the sister of Martha and Lazarus). Gregory declared that the "sinful woman" was Mary Magdalene, and that her sin was sexual.</P>
        <P><strong style={{ color: C.gold }}>Stage 2 — The Tradition:</strong> Gregory's interpretation became Church tradition. For the next 1,400 years, Mary Magdalene was depicted in Western art as a repentant prostitute — long red hair covering her body, a jar of ointment (the jar from the anointing scene), tears streaming down her face.</P>
        <P><strong style={{ color: C.gold }}>Stage 3 — The Correction (1969 CE):</strong> The Catholic Church officially retracted Gregory's interpretation in 1969, acknowledging that the conflation was incorrect and that Mary Magdalene should not be identified as a prostitute. But by then, the damage was done. Fourteen centuries of art, theology, and popular imagination had been built on the lie.</P>
        <P>The repentant-prostitute myth was not an accident. It was a deliberate strategy to diminish the authority of the most important woman in early Christianity — and to suppress the sacred feminine in Western spirituality.</P>

        <H>Why It Matters Now</H>
        <P>The story of Mary Magdalene is not ancient history. It is the story of how the sacred feminine was suppressed in Western spirituality — and how it is now returning.</P>
        <P>What her true story offers the modern seeker:</P>
        <L items={[
          "A template for feminine spiritual authority — not as rebellion against the masculine, but as the completion of it",
          "A reminder that the canon was a choice — and that other choices were made",
          "A vision of Christianity that includes the feminine — Sophia, the bride, the wisdom tradition",
          "A model of devotion that is not passive — Mary was not waiting at the tomb. She was the first to act, the first to speak, the first to proclaim",
          "A reclamation of the sacred marriage — the union of masculine and feminine within each soul",
        ]} />
        <P><em style={{ color: C.gold, fontFamily: fonts.display, fontSize: 22 }}>Mary Magdalene was not a repentant sinner. She was the apostle to the apostles, the keeper of the true teachings, and the embodiment of the sacred feminine that the institutional Church tried to erase. Her story is still speaking. And the bride is still rising.</em></P>

        <H>Where to Go Deeper</H>
        <ul className="space-y-3 text-[16px]" style={{ color: "rgba(245,240,232,0.8)" }}>
          {[
            ["The Gospel of Mary", "2nd-century Gnostic text, discovered in Cairo in 1896"],
            ["The Gospel of Philip", "Nag Hammadi text — describes Mary as the companion of Jeshua"],
            ["The Pistis Sophia", "Detailed Gnostic text with extensive dialogues between Jeshua and Mary after the resurrection"],
            ["Esther de Boer", "The Gospel of Mary: Beyond a Gnostic and a Biblical Mary Magdalene (2004)"],
            ["Margaret Starbird", "The Woman with the Alabaster Jar: Mary Magdalene and the Holy Grail (1993)"],
            ["Baigent, Leigh & Lincoln", "The Holy Blood and the Holy Grail (1982)"],
            ["Dan Brown", "The Da Vinci Code (2003) — popular fiction that brought the Magdalene story to mainstream attention"],
            ["The Cathar tradition", "The medieval heresy that explicitly venerated Mary Magdalene"],
          ].map(([author, work]) => (
            <li key={author} className="flex gap-3">
              <span style={{ color: C.gold }}>◆</span>
              <span><strong style={{ color: C.text, fontWeight: 400 }}>{author}</strong> — <em>{work}</em></span>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[11px] italic text-center leading-relaxed" style={{ color: "rgba(245,240,232,0.45)" }}>
          The content on this page is intended for educational and consciousness-expansion purposes only. Mary Magdalene is a historical and spiritual figure whose story has been told in many ways across many traditions. Soul True does not claim exclusive authority for any interpretation. Always engage with sacred history through study, discernment, and your own inner knowing.
        </p>
      </div>
    </article>
  );
}
