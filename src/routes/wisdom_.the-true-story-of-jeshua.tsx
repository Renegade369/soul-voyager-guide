import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom_/the-true-story-of-jeshua")({
  head: () => ({
    meta: [
      { title: "Jeshua — The True Story of the Most Misunderstood Man in History | Soul True" },
      { name: "description", content: "His name, his Essene roots, the missing years, what he actually taught, the table flip, multiple honest perspectives on the crucifixion, and what happened after." },
      { property: "og:title", content: "Jeshua — The True Story | Soul True" },
      { property: "og:description", content: "The teacher, the man, the frequency — restored beyond institutional distortion." },
    ],
  }),
  component: Page,
});

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 mb-5 text-3xl md:text-4xl" style={{ fontFamily: fonts.display, color: C.gold, fontWeight: 400 }}>{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 mb-3 text-xl" style={{ fontFamily: fonts.display, color: C.text, fontWeight: 400 }}>{children}</h3>;
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
          Jeshua
        </h1>
        <p className="mt-4 text-lg italic" style={{ color: "rgba(245,240,232,0.65)", fontFamily: fonts.display }}>
          The true story of the most misunderstood man in history.
        </p>
        <p className="mt-8 mx-auto max-w-xl text-[12px] italic leading-relaxed" style={{ color: "rgba(245,240,232,0.55)" }}>
          Soul True presents this material with deep reverence and intellectual honesty. We draw from historical scholarship, ancient texts, and preserved oral traditions. We present the evidence — you decide what you believe.
        </p>
      </header>

      <div className="mx-auto max-w-[680px] px-6 pb-28">
        <H>His Name</H>
        <P>His name was Jeshua ben Joseph. Not Jesus — that is a Latinized Greek construct that did not exist in his lifetime. He was a Jewish man from the Galilee region, born into a tradition of mystics, raised in a community of seekers, and executed by an empire that feared what he represented. Everything else — the theology, the institution, the wars fought in his name — came after. What follows is the story as the evidence presents it.</P>

        <H>His Essene Roots</H>
        <P>Jeshua was born into the Essene tradition — the same desert mystery school described in our previous section. His mother Miriam, known as Mary, was an Essene initiate. The community at Mount Carmel was known for producing teachers of extraordinary spiritual depth. From birth, Jeshua was immersed in a tradition that understood the divine nature of the human soul, the energetic power of intention, and the direct relationship between the individual and the living God. His later ministry was not a departure from this tradition. It was its fullest public expression.</P>

        <H>The Missing Years — Ages 12 to 30</H>
        <P>The canonical Gospels account for two periods of Jeshua's life: his birth and early childhood, and his public ministry beginning around age 30. Eighteen years are absent from the official record. Ancient texts, oral traditions, and historical accounts from multiple cultures fill that gap with a consistent story: he traveled. Accounts place him in Egypt, where he studied in the mystery schools of Alexandria and the temples of the Nile. In India, where Hindu and Buddhist traditions record the presence of a teacher called Issa who studied with Brahmin priests and Buddhist monks in Kashmir and Ladakh. In Tibet, where the manuscript discovered by Nicolas Notovitch in 1887 at the Hemis monastery describes his studies in detail. In Persia, where he encountered Zoroastrian fire teachings. He did not spend eighteen years in Nazareth working as a carpenter. He spent them becoming the most comprehensively educated spiritual teacher the ancient world had ever produced.</P>

        <H>What He Actually Taught</H>
        <P>Strip away the theology and what remains is radical, simple, and eternal. The Kingdom of God is within you. Love God with everything you have and love your neighbor as yourself — on these two commandments hang everything else. Judge not. Forgive endlessly. The pure in heart will see God — not after death, but now. He did not teach religion. He taught direct mystical experience of the divine available to every human being regardless of status, gender, or sin history. He ate with outcasts. He touched lepers. He spoke to women as equals in a culture that did not. Every action was a demonstration of the same teaching: you are more than the system tells you you are.</P>

        <H>Mary Magdalene — His Closest Spiritual Equal</H>
        <P>The Gnostic Gospels describe her as the disciple Jeshua loved most — not romantically as some have speculated, but spiritually. She understood his teachings at a depth the other disciples struggled to reach. After the crucifixion it was Mary who went to the tomb. Mary who encountered him first. Mary who carried the teaching forward. The suppression of her role was the suppression of the feminine principle from the heart of Western spirituality. In the true story she stands exactly where she always stood — at his side.</P>

        <H>The Table Flip</H>
        <P>One of the most politically significant moments in Jeshua's ministry has been spiritualized into harmlessness. When he overturned the money changers' tables in the Temple, he was not having a bad day. He was making a direct political and economic statement. The Temple in Jerusalem was the central bank of the ancient Jewish world. The money changers held a monopoly on the official Temple currency required for sacrificial offerings. The priests who ran the Temple — the Sanhedrin — were extraordinarily wealthy, deeply connected to Roman power, and completely invested in maintaining the system. Jeshua walked into the center of that system and called it what it was. That act sealed his fate. It was not theology that got him killed. It was economics and power.</P>
        <p className="mb-8 text-center italic text-lg" style={{ color: C.gold, fontFamily: fonts.display }}>The parallel to today is not subtle.</p>

        <H>The Crucifixion — Multiple Honest Perspectives</H>
        <H3>The Orthodox Account</H3>
        <P>Jeshua was crucified, died, was buried, and physically rose from the dead on the third day. This is the foundation of Christian theology and the sincere belief of billions.</P>
        <H3>The Swoon Theory</H3>
        <P>Crucifixion was designed for prolonged death — typically taking days. Jeshua was on the cross for hours before being taken down, still alive. The vinegar-soaked sponge offered to him may have contained a sedative. He was placed in the tomb of Joseph of Arimathea — a wealthy Essene with resources and connections. The Essenes were skilled practitioners of energy and frequency wellness. The resurrection accounts describe a physical, walking, eating man — not a spirit. He survived, recovered, and continued his life elsewhere.</P>
        <H3>The Substitution Theory</H3>
        <P>Present in early Gnostic texts and in the Quran, this account holds that another man — possibly Simon of Cyrene — was crucified in his place while Jeshua escaped. The Romans were executing a political threat, not a specific individual.</P>
        <H3>The Symbolic Theory</H3>
        <P>The crucifixion and resurrection are a mythological framework — the dying and rising god archetype present in virtually every ancient tradition before Jeshua. Osiris, Dionysus, Mithras, Tammuz — all share the same story structure. In this reading the power of the account is its archetypal truth, not its literal historicity.</P>
        <p className="mb-8 text-center italic text-lg" style={{ color: C.gold, fontFamily: fonts.display }}>We present the evidence. You decide.</p>

        <H>Who Wanted Him Dead and Why</H>
        <P>The Sanhedrin ran the Temple economy — the most powerful financial institution in the Jewish world. Roman occupation was tolerable as long as the tax revenue flowed and civil order was maintained. Jeshua threatened both. He undermined the Sanhedrin's religious authority by teaching direct access to God. He undermined their financial authority by attacking the Temple money system. He drew massive crowds — the kind that made Roman governors nervous. Pilate's famous hand-washing was not moral confusion. It was political calculation. The Sanhedrin needed a death. Rome needed stability. Their interests intersected at one man.</P>

        <H>What Happened After</H>
        <P>Accounts of Jeshua's life after the crucifixion exist across multiple cultures and are too consistent to dismiss. In southern France, a strong tradition holds that Mary Magdalene arrived by boat carrying the bloodline and the teaching — the root of the Cathar tradition and the Black Madonna veneration that persists to this day. In Kashmir, a tomb in Srinagar called Rozabal is maintained by locals who have always identified it as the resting place of Yuz Asaf — a prophet who came from the west. In India, the Ahmadiyya Muslim tradition holds detailed accounts of his continued ministry. In Tibet, the Hemis monastery manuscripts describe his return after the crucifixion. None of these accounts are mainstream. All of them deserve honest examination.</P>

        <H>Why The True Story Was Buried</H>
        <P>The institutional church required a theology of exclusive salvation — one path, one institution, one authority. A Jeshua who studied in India and Egypt undermined the exclusivity claim. A Jeshua who survived the crucifixion undermined the resurrection theology. A Jeshua who taught that every human being is already divine undermined the need for the institution entirely. The true story was not buried because it was false. It was buried because it was too powerful to control.</P>

        <H>The Invitation</H>
        <P>Whatever you believe about who he was — the evidence of what he taught is consistent across every source that has survived, official and suppressed alike. Go within. The Kingdom is already inside you. Love is the only law. You are divine. You do not need permission, institution, or intermediary to access God. You never did. That teaching did not die on a cross. It cannot be voted out of a council. It cannot be buried in a desert. It lives in you right now — waiting for you to remember it.</P>

        <p className="mt-16 text-[11px] italic text-center" style={{ color: "rgba(245,240,232,0.4)" }}>
          For educational and inspirational purposes only.
        </p>
      </div>
    </article>
  );
}
