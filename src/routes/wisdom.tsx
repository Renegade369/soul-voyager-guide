import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ScrollText, Star, Flame, Leaf } from "lucide-react";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
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

const cards = [
  { to: "/wisdom/origins", icon: Flame, title: "Origins", desc: "The truth they buried. The history they rewrote. The lineage you forgot." },
  { to: "/wisdom/matrix-origins", icon: BookOpen, title: "Matrix Origins", desc: "How the system was built — and how to see through it with clear eyes." },
  { to: "/wisdom/suppressed-sacred-texts", icon: ScrollText, title: "Suppressed Sacred Texts", desc: "What the gatekeepers removed, hid, or rewrote — and why it matters now." },
  { to: "/wisdom/the-true-story-of-jeshua", icon: Star, title: "The True Story of Jeshua", desc: "The teacher, the man, the frequency — restored beyond institutional distortion." },
  { to: "/wisdom/sacred-plants", icon: Leaf, title: "Sacred Plant Allies", desc: "The ancient frequencies they tried to silence — and why they matter now." },
  { to: "/wisdom/plant-medicines", icon: Leaf, title: "The Plant Allies", desc: "An encyclopedia of Earth's ancient consciousness frequencies." },
];

const featureCards = [
  {
    to: "/wisdom/book-of-enoch",
    image: "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/871ba365-dcd8-4243-9d95-49574c518a8b/generated/1782244787586.png",
    title: "The Book of Enoch",
    tagline: "The forbidden scroll they removed from your Bible — and why the angels still speak through it.",
    tags: ["The Watchers", "The Nephilim", "The 200 Angels", "Solar calendar", "Why Rome removed it"],
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

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group flex flex-col rounded-lg border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(201,168,76,0.35)]"
                style={{ backgroundColor: C.overlay, borderColor: C.border }}
              >
                <span style={{ color: C.gold }}><Icon size={26} /></span>
                <h3 className="mt-5 text-2xl" style={{ fontFamily: fonts.display }}>{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                  Enter <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>New in the Codex</p>
        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((f) => (
            <Link
              key={f.to}
              to={f.to}
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
