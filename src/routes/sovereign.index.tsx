import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

const C = {
  bg: "#0A0A0A",
  card: "#1A1209",
  gold: "#C9A84C",
  goldAlt: "#D4A017",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.7)",
  amber: "#E8821A",
};
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

const DISCLAIMER =
  "The Sovereignty Code is an educational and consciousness-expansion program. It is not medical, psychological, or therapeutic advice. Always consult qualified professionals about your health.";

const DIGITAL_FEATURES: Array<[string, boolean]> = [
  ["6 core modules — self-paced lifetime access", true],
  ["Daily practices and written reflections", true],
  ["Workbook + integration prompts (PDF)", true],
  ["Completion certificate", true],
  ["Guided audio transmissions library", false],
  ["Live group calls with William", false],
  ["Private community access", false],
  ["AI-guided Companion reflections", false],
];

const COMPLETE_FEATURES: Array<[string, boolean]> = [
  ["Everything in Digital, plus:", true],
  ["Guided audio transmissions library", true],
  ["Monthly live group calls with William", true],
  ["Private community of fellow initiates", true],
  ["AI-guided Companion reflections", true],
  ["Priority email support", true],
  ["First access to in-person VIP retreats", true],
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "What exactly do I get when I enroll?",
    a: "Immediate access to the program portal, all 6 core modules, daily practices, and the workbook. Complete tier members also unlock audio transmissions, live calls, and the private community.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. We offer a 14-day refund window from your purchase date — no questions asked. See our Terms for details.",
  },
  {
    q: "Can I upgrade from Digital to Complete later?",
    a: "Yes. You can upgrade at any time by paying the $200 difference. Email us once you're ready.",
  },
  {
    q: "How long do I have access?",
    a: "Lifetime access to the modules you purchased. The work is yours.",
  },
  {
    q: "Will there be live in-person experiences?",
    a: "Yes — VIP in-person retreats are coming. Complete members get first access. Join the waitlist to be notified.",
  },
];

export const Route = createFileRoute("/sovereign/")({
  head: () => ({
    meta: [
      { title: "The Sovereignty Code — Soul True" },
      {
        name: "description",
        content:
          "Exit the Matrix. A 6-module program for the awakening soul. Two paths. One journey. Lifetime access.",
      },
      { property: "og:title", content: "The Sovereignty Code — Soul True" },
      {
        property: "og:description",
        content:
          "Exit the Matrix. A 6-module program for the awakening soul. Two paths. One journey.",
      },
    ],
  }),
  component: SovereignPage,
});

function SovereignPage() {
  const [checkoutPrice, setCheckoutPrice] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "100vh" }}>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <p
          className="text-[11px] uppercase tracking-[0.32em]"
          style={{ color: C.gold }}
        >
          A Soul True Program
        </p>
        <h1
          className="mt-6 text-5xl md:text-7xl font-light leading-tight"
          style={{ fontFamily: fonts.display }}
        >
          The <em style={{ color: C.gold }}>Sovereignty</em> Code
        </h1>
        <p
          className="mt-6 text-xl md:text-2xl font-light italic"
          style={{ fontFamily: fonts.display, color: C.muted }}
        >
          Exit the Matrix.
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-base md:text-lg font-light leading-relaxed" style={{ color: C.muted }}>
          A 6-module journey for the awakening soul. Daily practices, sacred frameworks, and the
          tools to remember who you were before the world told you who to be. Two paths. One
          journey. The work is yours.
        </p>
        <div className="mt-10">
          <a
            href="#tiers"
            className="inline-block px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-all"
            style={{ background: C.gold, color: C.bg }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 30px rgba(232,130,26,0.5)`)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Choose Your Path
          </a>
        </div>
      </section>

      {/* The Promise */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-t" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <h2
          className="text-3xl md:text-4xl font-light italic text-center"
          style={{ fontFamily: fonts.display }}
        >
          What this program is.
        </h2>
        <div className="mt-10 space-y-6 text-base md:text-lg font-light leading-relaxed" style={{ color: C.muted }}>
          <p>
            You did not come here to be managed. You came here to be free. Not in the small,
            permission-based way the world allows — but in the deep, cellular, irrevocable way that
            no system can undo once you remember.
          </p>
          <p>
            The Sovereignty Code is six modules of structured remembering. Each module is a layer of
            the architecture they used to put you to sleep — and the exact frequency that wakes you
            back up. You do the work. The work changes you.
          </p>
          <p style={{ color: C.text }}>
            This is not entertainment. This is not relaxation. This is deprogramming.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="mx-auto max-w-6xl px-6 py-20">
        <h2
          className="text-3xl md:text-4xl font-light italic text-center"
          style={{ fontFamily: fonts.display }}
        >
          Two paths. One journey.
        </h2>
        <p className="mt-4 text-center text-sm" style={{ color: C.muted }}>
          Both paths grant lifetime access. Upgrade from Digital → Complete anytime for $200.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <TierCard
            label="Digital"
            price="$196.33"
            tagline="The complete written journey, self-paced."
            features={DIGITAL_FEATURES}
            ctaLabel="Enroll — Digital"
            onClick={() => setCheckoutPrice("sovereign_digital_onetime")}
            highlight={false}
          />
          <TierCard
            label="Complete"
            price="$396.33"
            tagline="The full transmission — audio, live calls, community."
            features={COMPLETE_FEATURES}
            ctaLabel="Enroll — Complete"
            onClick={() => setCheckoutPrice("sovereign_complete_onetime")}
            highlight={true}
          />
        </div>

        <p className="mt-8 text-center text-xs" style={{ color: C.muted }}>
          14-day refund window. See{" "}
          <Link to="/sovereign/terms" className="underline" style={{ color: C.gold }}>
            Terms
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20 border-t" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <h2
          className="text-3xl md:text-4xl font-light italic text-center"
          style={{ fontFamily: fonts.display }}
        >
          Questions.
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={i}
                className="border"
                style={{ borderColor: "rgba(201,168,76,0.25)", background: C.card }}
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-base font-light" style={{ fontFamily: fonts.display, color: C.text }}>
                    {item.q}
                  </span>
                  {open ? (
                    <ChevronUp size={18} color={C.gold} />
                  ) : (
                    <ChevronDown size={18} color={C.gold} />
                  )}
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm font-light leading-relaxed" style={{ color: C.muted }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* VIP Waitlist callout */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-light italic" style={{ fontFamily: fonts.display }}>
          In-person VIP retreats are coming.
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: C.muted }}>
          Small, intentional gatherings with William. Complete members get first access. Add your
          name to the waitlist to be notified.
        </p>
        <Link
          to="/sovereign/vip-waitlist"
          className="mt-8 inline-block border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ borderColor: C.gold, color: C.gold }}
        >
          Join VIP Waitlist
        </Link>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="text-xs leading-relaxed" style={{ color: C.muted }}>
          {DISCLAIMER}
        </p>
      </section>

      {/* Checkout modal */}
      {checkoutPrice && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
        >
          <div
            className="relative w-full max-w-2xl mt-10 mb-10"
            style={{ background: C.bg, border: `1px solid ${C.gold}` }}
          >
            <button
              onClick={() => setCheckoutPrice(null)}
              className="absolute right-3 top-3 z-10 p-2"
              style={{ color: C.gold }}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div className="p-2">
              <StripeEmbeddedCheckout
                priceId={checkoutPrice}
                returnUrl={`${window.location.origin}/sovereign/welcome?session_id={CHECKOUT_SESSION_ID}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TierCard({
  label,
  price,
  tagline,
  features,
  ctaLabel,
  onClick,
  highlight,
}: {
  label: string;
  price: string;
  tagline: string;
  features: Array<[string, boolean]>;
  ctaLabel: string;
  onClick: () => void;
  highlight: boolean;
}) {
  return (
    <div
      className="relative flex flex-col p-8"
      style={{
        background: C.card,
        border: `1px solid ${highlight ? C.gold : "rgba(201,168,76,0.25)"}`,
        boxShadow: highlight ? `0 0 40px rgba(232,130,26,0.15)` : "none",
      }}
    >
      {highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ background: C.gold, color: C.bg }}
        >
          Most Chosen
        </div>
      )}
      <p
        className="text-[11px] uppercase tracking-[0.32em]"
        style={{ color: C.gold }}
      >
        {label}
      </p>
      <p
        className="mt-3 text-5xl font-light"
        style={{ fontFamily: fonts.display, color: C.text }}
      >
        {price}
      </p>
      <p className="mt-2 text-sm font-light italic" style={{ fontFamily: fonts.display, color: C.muted }}>
        {tagline}
      </p>
      <p className="mt-1 text-[11px]" style={{ color: C.muted }}>
        One-time payment · Lifetime access
      </p>

      <ul className="mt-8 space-y-3 flex-1">
        {features.map(([text, included], i) => (
          <li key={i} className="flex items-start gap-3 text-sm font-light leading-relaxed">
            {included ? (
              <Check size={16} className="mt-1 shrink-0" color={C.gold} />
            ) : (
              <X size={16} className="mt-1 shrink-0" style={{ color: "rgba(245,240,232,0.3)" }} />
            )}
            <span style={{ color: included ? C.text : "rgba(245,240,232,0.4)" }}>{text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className="mt-8 w-full px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-all"
        style={{
          background: highlight ? C.gold : "transparent",
          color: highlight ? C.bg : C.gold,
          border: `1px solid ${C.gold}`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 30px rgba(232,130,26,0.4)`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
