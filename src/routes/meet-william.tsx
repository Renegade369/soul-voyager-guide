import { createFileRoute, Link } from "@tanstack/react-router";
import { WilliamIntro, PartnerCallout } from "@/components/WilliamIntro";
import williamPhoto from "@/assets/william-rythmia.png";

export const Route = createFileRoute("/meet-william")({
  head: () => ({
    meta: [
      { title: "Meet William — Founder of Soul True" },
      {
        name: "description",
        content:
          "Meet William — founder of Soul True. Truth-teller, guide, warrior. Real story, no filters.",
      },
      { property: "og:title", content: "Meet William — Founder of Soul True" },
      {
        property: "og:description",
        content:
          "Meet William — founder of Soul True. Truth-teller, guide, warrior. Real story, no filters.",
      },
    ],
  }),
  component: MeetWilliamPage,
});

function MeetWilliamPage() {
  return (
    <div style={{ backgroundColor: "#0A0B09", minHeight: "100vh" }}>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center sm:pt-24">
          {/* William's Rythmia photo — taken after an all-night ayahuasca ceremony.
              Both William and the shaman intentionally in frame. No heavy filters. */}
          <div
            className="relative mx-auto mb-10 w-full max-w-md overflow-hidden"
            style={{
              border: "1px solid rgba(201,168,76,0.35)",
              boxShadow: "0 30px 80px -30px rgba(201,168,76,0.35)",
            }}
          >
            <img
              src={williamPhoto}
              alt="William with a shaman at Rythmia Life Advancement Center, Costa Rica, after an all-night ceremony"
              className="block h-auto w-full"
              loading="eager"
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

          <h1
            className="text-5xl sm:text-6xl"
            style={{
              color: "#C9A84C",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            William
          </h1>
          <p
            className="mt-3 text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(245,240,232,0.7)" }}
          >
            Founder · Soul True
          </p>
          <p
            className="mt-2 text-lg italic"
            style={{
              color: "#F5F0E8",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Truth-teller. Guide. Warrior.
          </p>
        </div>
      </section>

      {/* INTRO COPY */}
      <section className="px-6 py-16">
        <WilliamIntro />
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div
          className="mx-auto max-w-2xl px-8 py-12 text-center"
          style={{
            backgroundColor: "#1A1209",
            border: "1px solid rgba(201,168,76,0.35)",
          }}
        >
          <h2
            className="text-4xl"
            style={{
              color: "#C9A84C",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
            }}
          >
            Ready to sit with William?
          </h2>
          <p
            className="mt-4 text-base"
            style={{
              color: "#F5F0E8",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
            }}
          >
            One session. No filters. Just truth.
          </p>
          <Link
            to="/book-session"
            className="mt-8 inline-block w-full px-8 py-4 text-[11px] uppercase tracking-[0.22em] transition hover:shadow-[0_0_24px_rgba(232,130,26,0.55)] sm:w-auto"
            style={{
              color: "#0A0A0A",
              background: "linear-gradient(135deg,#C9A84C,#D4A017)",
              border: "1px solid #C9A84C",
              fontWeight: 600,
            }}
          >
            Book a 1-on-1 Session
          </Link>
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
