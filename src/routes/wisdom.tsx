import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.35)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/wisdom")({
  head: () => ({
    meta: [
      { title: "Wisdom — Soul True" },
      { name: "description", content: "Matrix Origins, suppressed sacred texts, and the true story of Jeshua. Ancient teachings for the awakening mind." },
      { property: "og:title", content: "Wisdom — Soul True" },
      { property: "og:description", content: "Ancient teachings for the awakening mind." },
    ],
  }),
  component: WisdomPage,
});

type CodexCard = {
  to: string;
  image: string;
  title: string;
  tagline: string;
  tags: string[];
};

const cards: CodexCard[] = [
  {
    to: "/wisdom/matrix-origins",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782248125945.png",
    title: "Matrix Origins",
    tagline: "The hidden architecture of control — how the ancient blueprint became the modern cage.",
    tags: ["The Ancient Blueprint", "The Handoff", "The Modern Matrix", "The Awakening"],
  },
  {
    to: "/wisdom/suppressed-sacred-texts",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782248123755.png",
    title: "Suppressed Sacred Texts",
    tagline: "The gospels, scrolls, and teachings they removed from the canon — and why.",
    tags: ["The Essenes", "Mary Magdalene's True Role", "The Gospel of Thomas", "The Council of Nicaea"],
  },
  {
    to: "/wisdom/the-true-story-of-jeshua",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782248125055.png",
    title: "The True Story of Jeshua",
    tagline: "His name, his Essene roots, what he actually taught — and why the true story was buried.",
    tags: ["His Name", "His Essene Roots", "The Missing Years", "What He Actually Taught"],
  },
  {
    to: "/sacred-plants",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782249056192.png",
    title: "Sacred Plant Allies",
    tagline: "The ancient frequencies they tried to silence — and why they matter now.",
    tags: ["The Suppression", "Cannabis", "The War on Consciousness", "Reclaiming the Frequencies"],
  },
  {
    to: "/wisdom/the-3d-world",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782249057418.png",
    title: "The 3D World",
    tagline: "The hidden architecture of life on Earth — history rewritten, the nature of money and matter, the body as a sacred instrument.",
    tags: ["The Veiled Nature of Money", "The Body as Antenna", "Lost Human History"],
  },
  {
    to: "/wisdom/beyond-the-stars",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782249058873.png",
    title: "Beyond the Stars",
    tagline: "Other planets, star systems, and the civilizations seeded across the cosmos — what the elders and the new contactees agree upon.",
    tags: ["Pleiadian, Sirian & Arcturian Lineages", "The Galactic Federation", "Star Seeds & Soul Origins"],
  },
  {
    to: "/wisdom/book-of-enoch",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782244787586.png",
    title: "The Book of Enoch",
    tagline: "The forbidden scroll they removed from your Bible — and why the angels still speak through it.",
    tags: ["The Watchers", "The Nephilim", "The 200 Angels", "Solar Calendar", "Why Rome Removed It"],
  },
  {
    to: "/wisdom/mary-magdalene",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782244791642.png",
    title: "Mary Magdalene",
    tagline: "The apostle to the apostles — and the woman they tried to erase from the story.",
    tags: ["The Apostle to the Apostles", "The Gospel of Mary", "The Sacred Feminine", "The Holy Grail", "The Bride of Christ"],
  },
];

function WisdomPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Wisdom</p>
        <h1 className="mt-4 text-5xl font-light leading-tight md:text-6xl" style={{ fontFamily: fonts.display }}>
          Ancient Truth, <em className="italic" style={{ color: C.gold }}>Restored.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "rgba(245,240,232,0.8)", fontWeight: 300 }}>
          What was buried, edited, or dismissed is being remembered. Begin where your soul pulls you.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((f) => (
            <a
              key={f.to}
              href={f.to}
              data-animate="fade-up"
              className="group flex flex-col overflow-hidden rounded-lg border transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-14px_rgba(201,168,76,0.45)]"
              style={{ backgroundColor: C.overlay, borderColor: C.border }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85) 100%)" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-3xl leading-tight" style={{ fontFamily: fonts.display, fontWeight: 400 }}>
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] italic leading-relaxed" style={{ color: "rgba(245,240,232,0.78)", fontFamily: fonts.display }}>
                  {f.tagline}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <li
                      key={t}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]"
                      style={{ border: `1px solid ${C.border}`, color: "rgba(245,240,232,0.7)", borderRadius: 2 }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
