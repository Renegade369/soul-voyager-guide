import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Eye, Droplet, HelpCircle, Orbit, Hash, Star, KeyRound } from "lucide-react";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", overlay: "#1A1209", border: "rgba(201,168,76,0.22)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/readings")({
  head: () => ({
    meta: [
      { title: "Readings — Soul True" },
      { name: "description", content: "Six readers. One free Soul Quiz, five paid readings. Or unlock the full bundle for $29.99." },
      { property: "og:title", content: "Readings — Soul True" },
      { property: "og:description", content: "Six readers. One free Soul Quiz, five paid." },
    ],
  }),
  component: ReadingsPage,
});

type Card = { id: string; to: string; icon: React.ComponentType<{ size?: number }>; title: string; desc: string; cta: string; price: "Free" | "$0.99" | "$9.99" | "$9.36"; };

const cards: Card[] = [
  { id: "horoscope", to: "/horoscope", icon: Star, title: "Daily Horoscope", desc: "A free oracle preview every day — theme, energy, shadow, and a soul activation. Go deeper for the full transmission.", cta: "Read My Day", price: "$0.99" },
  { id: "gene-keys", to: "/gene-keys", icon: KeyRound, title: "Gene Key Reading", desc: "Discover the 6 sacred keys encoded in your birth — Life's Work, Evolution, Radiance, Purpose, Pearl, Venus.", cta: "Reveal My Keys", price: "$9.36" },
  { id: "soul-quiz", to: "/soul-quiz", icon: HelpCircle, title: "Soul Quiz", desc: "Discover your soul type in 5 minutes. No payment, no account.", cta: "Take The Quiz", price: "Free" },
  { id: "aura", to: "/aura-reader", icon: Eye, title: "Aura Reader", desc: "Map your 3-layer energy field — emotional core, social presence, spiritual depth — plus full chakra alignment.", cta: "Read My Aura", price: "$9.99" },
  { id: "blood-type", to: "/blood-type", icon: Droplet, title: "Blood Type", desc: "Unlock your ancestral blueprint — nourishment, immune signature, stress response, emotional architecture.", cta: "Discover My Type", price: "$9.99" },
  { id: "birth-chart", to: "/birth-chart", icon: Orbit, title: "Birth Chart", desc: "Your soul's blueprint at first breath — Sun, Moon, Rising, inner planets, karmic themes.", cta: "Decode My Chart", price: "$9.99" },
  { id: "numerology", to: "/numerology", icon: Hash, title: "Numerology", desc: "The frequency encoded in your name and birth date — Life Path, Expression, Soul Urge, Personal Year.", cta: "Calculate My Numbers", price: "$9.99" },
  { id: "astrology", to: "/astrology", icon: Star, title: "Astrology", desc: "A precision energetic forecast from your natal chart against the current sky.", cta: "Read The Sky", price: "$9.99" },
];

function ReadingsPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>Readings</p>
        <h1 className="mt-4 text-5xl font-light leading-tight md:text-6xl" style={{ fontFamily: fonts.display }}>
          Your Soul, <em className="italic" style={{ color: C.gold }}>Mirrored.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "rgba(245,240,232,0.8)", fontWeight: 300 }}>
          Six readers. One free Soul Quiz, five paid readings. Each is a different frequency through which your truth becomes visible.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-xs italic" style={{ color: "rgba(245,240,232,0.5)" }}>
          For educational and inspirational purposes only.
        </p>
      </section>

      {/* Featured: Frequency Transmissions — signature offering */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <Link to="/transmissions"
          className="group relative block overflow-hidden rounded-none border p-8 transition-all hover:-translate-y-1 md:p-12"
          style={{
            borderColor: C.gold,
            background: "linear-gradient(135deg, rgba(201,168,76,0.10), rgba(232,130,26,0.06) 60%, rgba(10,10,10,0.9))",
            boxShadow: "0 0 60px -20px rgba(232,130,26,0.45)",
            animation: "transmissionGlow 4s ease-in-out infinite",
          }}>
          <span className="absolute right-4 top-4 rounded-none border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: C.gold, borderColor: C.gold, background: "rgba(201,168,76,0.1)" }}>
            ✦ Signature
          </span>
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: C.gold }}>The Soul True Signature Offering</p>
          <h2 className="mt-3 text-4xl font-light leading-tight md:text-5xl" style={{ fontFamily: fonts.display }}>
            Frequency <em className="italic" style={{ color: C.gold }}>Transmissions.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-base italic md:text-lg" style={{ color: "rgba(245,240,232,0.85)", fontFamily: fonts.display }}>
            A personalized spoken transmission drawn from the depths of your soul profile.
          </p>
          <p className="mt-3 max-w-2xl text-sm" style={{ color: "rgba(245,240,232,0.65)" }}>
            Check in. Set your intention. Receive your unique frequency — spoken aloud, sealed for you alone.
          </p>
          <span className="mt-7 inline-flex items-center gap-2 rounded-none px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition group-hover:shadow-[0_0_24px_rgba(232,130,26,0.6)]"
            style={{ background: `linear-gradient(135deg, ${C.gold}, #D4A017)`, color: C.bg }}>
            Receive My Transmission →
          </span>
        </Link>
        <style>{`
          @keyframes transmissionGlow {
            0%, 100% { box-shadow: 0 0 40px -22px rgba(232,130,26,0.35); }
            50% { box-shadow: 0 0 70px -16px rgba(232,130,26,0.6); }
          }
        `}</style>
      </section>

      {/* Bundle banner */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="rounded-none border p-7 text-center md:flex md:items-center md:justify-between md:text-left"
          style={{ borderColor: C.gold, background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(232,130,26,0.05))" }}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: C.gold }}>The Bundle · $29.99</p>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: fonts.display, color: C.text }}>
              Unlock <em className="italic" style={{ color: C.gold }}>Everything.</em>
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(245,240,232,0.75)" }}>
              Birth Chart + Aura + Numerology + Blood Type. Your complete soul map.
            </p>
          </div>
          <button disabled
            className="mt-5 cursor-not-allowed rounded-none px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] opacity-70 md:mt-0"
            style={{ background: C.gold, color: C.bg }}
            title="Payments coming soon">
            Get the Bundle →
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(245,240,232,0.45)" }}>
          Payments coming soon. Have an access code? Enter it on any reader.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            const isFree = c.price === "Free";
            return (
              <article key={c.id} id={c.id}
                className="relative flex flex-col rounded-none border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(201,168,76,0.35)]"
                style={{ backgroundColor: C.overlay, borderColor: C.border, scrollMarginTop: "100px" }}>
                <span className="absolute right-4 top-4 rounded-none border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: isFree ? "#5BC97D" : C.gold,
                    borderColor: isFree ? "rgba(91,201,125,0.5)" : `${C.gold}66`,
                    background: isFree ? "rgba(91,201,125,0.08)" : "rgba(201,168,76,0.06)",
                  }}>
                  {c.price}
                </span>
                <span style={{ color: C.gold }}><Icon size={26} /></span>
                <h3 className="mt-5 text-2xl" style={{ fontFamily: fonts.display }}>{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>{c.desc}</p>
                <Link to={c.to}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition-all hover:shadow-[0_0_24px_rgba(232,130,26,0.5)]"
                  style={{ backgroundColor: C.gold, color: C.bg }}>
                  {c.cta} <ArrowRight size={12} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/soul-profile" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] hover:underline" style={{ color: C.gold }}>
            <Sparkles size={14} /> Want all frameworks in one reading? Get the Soul Profile →
          </Link>
        </div>
      </section>
    </div>
  );
}
