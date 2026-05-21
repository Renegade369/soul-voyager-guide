import { createFileRoute } from "@tanstack/react-router";
import { WilliamIntro, PartnerCallout } from "@/components/WilliamIntro";
import williamPhoto from "@/assets/william-rythmia.png";

export const Route = createFileRoute("/book-session")({
  head: () => ({
    meta: [
      { title: "Sit With William — 1-on-1 Session · Soul True" },
      {
        name: "description",
        content:
          "A 1-on-1 session with William, founder of Soul True. For the soul ready to stop circling and start moving.",
      },
      {
        property: "og:title",
        content: "Sit With William — 1-on-1 Session · Soul True",
      },
      {
        property: "og:description",
        content:
          "A 1-on-1 session with William, founder of Soul True. For the soul ready to stop circling and start moving.",
      },
    ],
  }),
  component: BookSessionPage,
});

const expectCards = [
  {
    title: "No Performance",
    body:
      "This is not a motivational talk. William comes as he is — and meets you where you are. Expect truth over comfort.",
  },
  {
    title: "Soul-Level Clarity",
    body:
      "Every session is drawn from your unique soul profile — your readings, your patterns, your becoming. Nothing generic. Nothing recycled.",
  },
  {
    title: "Real Movement",
    body:
      "You will leave with more than inspiration. You will leave with clarity, a direction, and the inner authority to walk it.",
  },
  {
    title: "Sacred Container",
    body:
      "What you share stays between us. This is a sacred space — held with full integrity, full presence, and zero judgment.",
  },
];

const details: Array<[string, string]> = [
  ["Format", "1-on-1 private session via video call"],
  ["Length", "To be confirmed"],
  ["Investment", "To be confirmed"],
  ["Availability", "Limited — by application only"],
];

function GoldGlyph() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

export default function BookSessionPage() {
  return (
    <div style={{ backgroundColor: "#0A0B09", minHeight: "100vh" }}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(201,168,76,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
          <h1
            className="text-5xl sm:text-7xl"
            style={{
              color: "#C9A84C",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            Sit With William
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl"
            style={{
              color: "#F5F0E8",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            A 1-on-1 session built for the soul that is ready to stop circling
            and start moving.
          </p>

          {/* William's Rythmia photo — same image as /meet-william, both in frame, unedited */}
          <div
            className="relative mx-auto mt-12 w-full max-w-sm overflow-hidden"
            style={{
              border: "1px solid rgba(201,168,76,0.35)",
              boxShadow: "0 30px 80px -30px rgba(201,168,76,0.35)",
            }}
          >
            <img
              src={williamPhoto}
              alt="William with a shaman at Rythmia, Costa Rica"
              className="block h-auto w-full"
              loading="lazy"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,11,9,0.15) 0%, rgba(10,11,9,0) 35%, rgba(10,11,9,0.45) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-16">
        <WilliamIntro />
      </section>

      {/* WHAT TO EXPECT */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2
          className="text-center text-4xl sm:text-5xl"
          style={{
            color: "#C9A84C",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
          }}
        >
          What Our Time Together Looks Like
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {expectCards.map((c) => (
            <div
              key={c.title}
              className="p-8"
              style={{
                backgroundColor: "#1A1209",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <GoldGlyph />
              <h3
                className="mt-5 text-2xl"
                style={{
                  color: "#C9A84C",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                {c.title}
              </h3>
              <p
                className="mt-3 text-base leading-relaxed"
                style={{
                  color: "#F5F0E8",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1.7,
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SESSION DETAILS */}
      <section className="mx-auto max-w-2xl px-6 py-16">
        <div
          className="divide-y"
          style={{ borderTop: "1px solid rgba(201,168,76,0.25)", borderBottom: "1px solid rgba(201,168,76,0.25)" }}
        >
          {details.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[120px_1fr] gap-4 py-5"
              style={{ borderColor: "rgba(201,168,76,0.15)" }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#C9A84C" }}
              >
                {label}
              </span>
              <span
                className="text-base"
                style={{ color: "#F5F0E8", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div
          className="mx-auto max-w-2xl px-8 py-14 text-center"
          style={{
            backgroundColor: "#1A1209",
            border: "1px solid rgba(201,168,76,0.35)",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl"
            style={{
              color: "#C9A84C",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
            }}
          >
            You already know if you're ready.
          </h2>
          {/* TODO: Replace mailto with booking link when ready */}
          <a
            href="mailto:William@Soul-True.com?subject=1-on-1%20Session%20Request"
            className="mt-8 inline-block w-full px-10 py-5 text-[12px] uppercase tracking-[0.24em] transition hover:shadow-[0_0_28px_rgba(232,130,26,0.6)] sm:w-auto"
            style={{
              color: "#0A0A0A",
              background: "linear-gradient(135deg,#C9A84C,#D4A017)",
              border: "1px solid #C9A84C",
              fontWeight: 600,
            }}
          >
            Book My Session
          </a>
          <p
            className="mt-6 text-sm"
            style={{
              color: "rgba(245,240,232,0.75)",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
            }}
          >
            Sessions are limited. William works with a small number of souls at a time.
          </p>
        </div>
      </section>

      <PartnerCallout />

      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <p
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "rgba(201,168,76,0.7)" }}
        >
          For educational & inspirational purposes only
        </p>
      </section>
    </div>
  );
}
