import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/book-of-enoch")({
  head: () => ({
    meta: [
      { title: "The Book of Enoch — The Scroll Rome Couldn't Silence | Soul True" },
      { name: "description", content: "The forbidden text that was once scripture — and the angels, calendars, and cosmic truths it carried." },
      { property: "og:title", content: "The Book of Enoch — Soul True" },
      { property: "og:description", content: "The forbidden scroll they removed from your Bible — and why the angels still speak through it." },
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
          The Book of Enoch — <em style={{ color: C.gold }}>The Scroll Rome Couldn't Silence</em>
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The forbidden text that was once scripture — and the angels, calendars, and cosmic truths it carried.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>The Book They Removed From Your Bible</H>
        <P>The Book of Enoch — also called 1 Enoch — is one of the oldest texts in human history. It was written in the centuries before the birth of Jeshua, and for the first three hundred years of the early Church, it was quoted, revered, and treated as scripture by the very communities who would later define what counted as the Bible.</P>
        <P>It is the only book ever quoted in the New Testament that did not survive the final cut. Jude — the brother of Jeshua — directly cites the Book of Enoch in his epistle (Jude 1:14–15). The text was known, read, and considered authoritative. Then it was removed.</P>
        <P>What you are about to read is not a fringe text. It is a foundational document of early Christianity that was deliberately erased from the canon — and the reasons why matter now more than ever.</P>

        <H>The Author and the Era</H>
        <P>The Book of Enoch is attributed to Enoch — the great-grandfather of Noah. In the genealogy of Genesis 5, Enoch is one of only two figures in the entire Bible who "walked with God" and was taken directly — not dying, but translated. The text claims to be his testimony, written down for his son Methuselah and preserved through the generations that followed.</P>
        <P>The oldest surviving fragments — found among the Dead Sea Scrolls at Qumran in 1947 — date to the 3rd century BCE. The complete text was preserved in Ethiopic (Ge'ez) by the Ethiopian Orthodox Church, which still includes it in its official biblical canon to this day. The Ethiopian Bible has 81 books — not 66.</P>
        <P>The Book of Enoch is not a lost or hidden text. It is a text that was deliberately removed from Western Bibles while remaining scripture for millions of Christians in Africa for nearly two thousand years.</P>

        <H>The 200 Angels Who Came Down</H>
        <P>The most famous — and most suppressed — portion of the Book of Enoch is the Book of the Watchers (1 Enoch 1–36). It tells the story of 200 angels, called the Watchers, who descended to Mount Hermon in the days of Jared — the father of Enoch. Their leader was Semyaza. Their names are recorded: Azazel, Shamsiel, Sariel, Turiel, Kokabiel, Tamiel, Ramiel, Danel, Ezeqiel, Baraqijal, and others.</P>
        <P>These angels made a pact. They swore an oath on Mount Hermon. They descended to Earth. And they took human wives.</P>
        <P>From their union came the Nephilim — a word meaning "the fallen ones" or "those who descended." The same word appears in Genesis 6:4, where it is usually mistranslated as "giants." The Nephilim were not giants in stature. They were beings of mixed origin — part angelic, part human — and they carried knowledge that did not belong to the human realm.</P>
        <P>The Watchers taught their wives and children forbidden knowledge: metallurgy, cosmetics, weapons, sorcery, astrology, the reading of stars, the cutting of roots, the making of charms. Azazel specifically taught the use of metals and the making of weapons. The text is explicit: this knowledge corrupted the Earth.</P>

        <H>What the Angels Brought — and Why It Was Forbidden</H>
        <P>The Book of Enoch names the specific teachings the Watchers brought to humanity:</P>
        <L items={[
          "Azazel: taught metallurgy, weapons, the use of metals, and the making of ornaments — the knowledge of the Earth itself",
          "Semyaza: taught enchantments and the cutting of roots",
          "Armaros: taught the resolving of enchantments",
          "Raphael: taught the knowledge of the signs of the Earth, Sun, and Moon",
          "Kokabiel: taught the science of the stars (astrology)",
          "Tamiel: taught astronomy",
          "Asradel: taught the course of the Moon",
        ]} />
        <P>This is not a fairy tale. It is a cosmology. The text describes a deliberate transmission of cosmic and earthly knowledge from a non-human source to humanity — knowledge that, according to the text itself, was never meant to be given all at once.</P>
        <P>The Watchers were judged. Bound. Cast into a place of punishment. Their children — the Nephilim — became the spirits, demons, and energies that the later religious traditions would spend millennia trying to control.</P>

        <H>The 364-Day Calendar Rome Rejected</H>
        <P>The Book of Enoch contains a detailed solar calendar of 364 days — exactly 52 weeks, with no remainder. This is not the lunar calendar of the Hebrew tradition (354 days) and not the solar-lunar compromise of the later rabbinic calendar. It is a pure solar calendar, and it is the calendar the Qumran community (the Essenes) used to determine their holy days.</P>
        <P>The solar calendar was the basis for the dispute between the Essenes and the Jerusalem Temple priesthood. The Temple used a lunar calendar. The Essenes — and the Book of Enoch — used the solar one. This calendar dispute was one of the core reasons the Essenes were considered heretics by the Temple authorities.</P>
        <P>The Book of Jubilees, closely related to Enoch, expands this calendar system. The solar calendar is also embedded in the structure of the Dead Sea Scrolls themselves — the community organized its entire liturgical life around it.</P>

        <H>What Enoch Saw</H>
        <P>The Book of Enoch is also a visionary text. Enoch is taken on a tour of the cosmos — through the heavens, the angelic realms, the places of punishment, and the places of the righteous dead. He sees:</P>
        <L items={[
          "The Sheol — the place of the dead, divided into sections for the righteous and the wicked",
          "The Abyss — the prison of the fallen angels",
          "The Garden of the Righteous — a place of rest for those who lived in truth",
          "The Tree of Life — at the center of the garden, where the righteous will eat",
          "The Seven Mountains — and the throne of God at the center",
          "The First and Final Judgment — the coming of the Messiah, the resurrection of the dead, the new creation",
        ]} />
        <P>This is not mythology. It is a structured cosmology that influenced early Christianity, early Judaism, and the Gnostic traditions. The vision of Enoch is the foundation for the apocalyptic literature that would follow — including the Book of Revelation.</P>

        <H>The Council That Erased It</H>
        <P>The Book of Enoch was known, read, and quoted by the early Church. Tertullian (c. 200 CE) explicitly accepted it as scripture. Jude quoted it as authoritative. The Ethiopian Orthodox Church still includes it in its canon.</P>
        <P>But when the Council of Nicaea (325 CE) and the later Council of Laodicea (363 CE) met to determine the official canon of the Bible, the Book of Enoch was excluded. The reasons were not doctrinal purity. The reasons were political:</P>
        <L items={[
          "It described angels marrying human women — a cosmology that contradicted the emerging doctrine of angelic separation",
          "It described a solar calendar that contradicted the lunar calendar the Roman Church had adopted",
          "It described a cosmology with multiple heavens, angelic hierarchies, and a structured afterlife that did not fit the simplified Roman model",
          "It gave too much authority to visionary experience and direct angelic contact — the very things the institutional Church wanted to control",
        ]} />
        <P>The Book of Enoch was not removed because it was false. It was removed because it was too true — and too dangerous to centralized power.</P>

        <H>Why It Matters Now</H>
        <P>The Book of Enoch is not ancient history. It is a living text. The Dead Sea Scrolls were hidden in caves for two thousand years and rediscovered in 1947. The complete text of 1 Enoch was translated into English and made widely available in the 20th century. The text is now in the public domain and freely accessible.</P>
        <P>What it offers the modern seeker:</P>
        <L items={[
          "A cosmology that includes the angelic realm — not as metaphor, but as a structured part of reality",
          "A calendar that aligns with the solar cycle — and a different way of marking sacred time",
          "A history of human consciousness — that includes the transmission of knowledge from non-human sources",
          "A vision of the afterlife — that is more complex, more beautiful, and more just than the simplified heaven-and-hell of later tradition",
          "A reminder that the canon was a choice — and that other choices were made",
        ]} />
        <P><em style={{ color: C.gold, fontFamily: fonts.display, fontSize: 22 }}>The Book of Enoch is the scroll Rome couldn't silence. It is still speaking. And the angels it names are still being remembered.</em></P>

        <H>Where to Go Deeper</H>
        <ul className="space-y-3 text-[16px]" style={{ color: "rgba(245,240,232,0.8)" }}>
          {[
            ["The Ethiopic Text", "1 Enoch in the Ge'ez language, preserved by the Ethiopian Orthodox Church"],
            ["The Dead Sea Scrolls", "4QEnoch fragments at Qumran, dating to the 3rd century BCE"],
            ["R.H. Charles", "The Book of Enoch (1917) — the standard English translation, now public domain"],
            ["George W.E. Nickelsburg", "1 Enoch 1: A Commentary on the Book of 1 Enoch (Hermeneia series)"],
            ["Judd Burton", "Interview with the Giant: Ethnohistorical Notes on the Nephilim (2010)"],
            ["The Book of Jubilees", "Closely related to Enoch — expands the solar calendar and angelic cosmology"],
            ["The Book of Giants", "Dead Sea Scroll text — the story of the Nephilim from their own perspective"],
          ].map(([author, work]) => (
            <li key={author} className="flex gap-3">
              <span style={{ color: C.gold }}>◆</span>
              <span><strong style={{ color: C.text, fontWeight: 400 }}>{author}</strong> — <em>{work}</em></span>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[11px] italic text-center leading-relaxed" style={{ color: "rgba(245,240,232,0.45)" }}>
          The content on this page is intended for educational and consciousness-expansion purposes only. The Book of Enoch is a historical text preserved across multiple traditions. Soul True does not claim divine authority for any interpretation. Always engage with ancient texts through study, discernment, and your own inner knowing.
        </p>
      </div>
    </article>
  );
}
