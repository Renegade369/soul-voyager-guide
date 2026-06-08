import { createFileRoute, Link } from "@tanstack/react-router";

const C = { bg: "#0A0A0A", gold: "#C9A84C", text: "#F5F0E8", muted: "rgba(245,240,232,0.75)" };
const fonts = { display: '"Cormorant Garamond", serif', body: '"Outfit", sans-serif' };

export const Route = createFileRoute("/sovereign/terms")({
  head: () => ({
    meta: [
      { title: "Terms — The Sovereignty Code" },
      {
        name: "description",
        content: "Terms, refund policy, and program agreement for The Sovereignty Code by Soul True.",
      },
    ],
  }),
  component: SovereignTerms,
});

function SovereignTerms() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: fonts.body, minHeight: "85vh" }}>
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: C.gold }}>
          The Sovereignty Code
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-light" style={{ fontFamily: fonts.display }}>
          Terms <em style={{ color: C.gold }}>& Agreement</em>
        </h1>
        <div className="mt-10 space-y-8 text-base font-light leading-relaxed" style={{ color: C.muted }}>
          <Section title="1. Enrollment">
            By enrolling in The Sovereignty Code (Digital or Complete tier), you receive
            lifetime access to the digital materials of the tier you purchased. Access is
            granted to the email address used at checkout.
          </Section>

          <Section title="2. 14-Day Refund Window">
            We honor a 14-day refund window from the date of your purchase. If for any
            reason the program is not the right fit, email <a href="mailto:hello@soul-true.com" style={{ color: C.gold }}>hello@soul-true.com</a>{" "}
            within 14 days and we will issue a full refund — no questions asked. After 14
            days, all sales are final.
          </Section>

          <Section title="3. Upgrades">
            Digital tier members may upgrade to Complete at any time by paying the $200
            difference. Contact us to arrange the upgrade.
          </Section>

          <Section title="4. Personal Use Only">
            Program materials, audio transmissions, and community access are licensed to
            you for personal use. You may not redistribute, resell, or publicly share the
            content.
          </Section>

          <Section title="5. Community Guidelines (Complete tier)">
            The private community is a space for respectful, intentional dialogue.
            Harassment, hate speech, spam, or repeated violations will result in removal
            from the community without refund.
          </Section>

          <Section title="6. Educational Only — Not Medical Advice">
            The Sovereignty Code is an educational and consciousness-expansion program. It
            is not medical, psychological, or therapeutic advice and is not a substitute
            for care from a qualified professional. By enrolling you acknowledge that you
            are responsible for your own well-being and decisions.
          </Section>

          <Section title="7. Changes">
            We may update these terms from time to time. Material changes will be
            communicated to enrolled members by email.
          </Section>

          <p className="text-sm pt-4">
            Questions? Email <a href="mailto:hello@soul-true.com" style={{ color: C.gold }}>hello@soul-true.com</a>.
          </p>

          <div className="pt-6">
            <Link
              to="/sovereign"
              className="inline-block border px-7 py-3 text-[11px] uppercase tracking-[0.22em]"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              Back to Sovereignty Code
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-light italic mb-3" style={{ fontFamily: fonts.display, color: C.text }}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
