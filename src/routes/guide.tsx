import { createFileRoute } from "@tanstack/react-router";
import {
  Mic,
  Sparkles,
  Send,
  Palette,
  Eye,
  Layers,
  Package,
  Users,
  Share2,
  Video,
  Briefcase,
  Heart,
  Code2,
  Link2,
  CreditCard,
  Mail,
  Compass,
  Flame,
  Lock,
  Wind,
  Crown,
} from "lucide-react";

const C = {
  bg: "#0A0B09",
  gold: "#C9A84C",
  goldSoft: "rgba(201,168,76,0.25)",
  text: "#F5F0E8",
  muted: "rgba(245,240,232,0.72)",
  deep: "#1A1209",
};
const fonts = {
  display: '"Cormorant Garamond", serif',
  body: '"Outfit", sans-serif',
};

const MUSHROOM_FOREST =
  "https://bruavyiflwngsurtjfet.supabase.co/storage/v1/object/public/ac-avatars/28235dc4-c0a4-4f98-9564-3437c82de253/generated/1778959448497_image.png";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "The Sovereign Creator Guide — Soul True" },
      {
        name: "description",
        content:
          "Tools and laws for the awakened entrepreneur. Amplify your voice, build your platform, and protect your sovereignty.",
      },
      { property: "og:title", content: "The Sovereign Creator Guide — Soul True" },
      {
        property: "og:description",
        content:
          "Use tools as weapons, not masters. The Sovereign Creator Guide for awakened entrepreneurs.",
      },
    ],
  }),
  component: SovereignCreatorGuide,
});

/* ---------- shared bits ---------- */

function SectionBadge({ n }: { n: string }) {
  return (
    <p
      className="text-[11px] uppercase tracking-[0.32em]"
      style={{ color: C.gold, fontFamily: fonts.body }}
    >
      {n}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-3 text-4xl font-light leading-[1.1] md:text-5xl"
      style={{ fontFamily: fonts.display, color: C.text }}
    >
      {children}
    </h2>
  );
}

function GoldPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mt-5 inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em]"
      style={{
        border: `1px solid ${C.gold}`,
        color: C.gold,
        fontFamily: fonts.body,
        background: "rgba(201,168,76,0.06)",
      }}
    >
      {children}
    </span>
  );
}

function Intro({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-6 max-w-3xl text-base font-light leading-relaxed md:text-lg"
      style={{ fontFamily: fonts.body, color: C.muted }}
    >
      {children}
    </p>
  );
}

function FeatureTile({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  body: string;
}) {
  return (
    <div
      className="rounded-none p-7"
      style={{ backgroundColor: C.bg, border: `1px solid ${C.goldSoft}` }}
    >
      <Icon size={26} style={{ color: C.gold }} />
      <h3
        className="mt-5 text-2xl font-normal"
        style={{ fontFamily: fonts.display, color: C.text }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-sm font-light leading-relaxed"
        style={{ fontFamily: fonts.body, color: C.muted }}
      >
        {body}
      </p>
    </div>
  );
}

function MushroomDivider({ height = 300 }: { height?: number }) {
  return (
    <div className="my-20 w-full">
      <img
        src={MUSHROOM_FOREST}
        alt=""
        aria-hidden
        className="w-full"
        style={{
          height,
          objectFit: "cover",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ---------- data ---------- */

const voiceTiles = [
  {
    icon: Mic,
    title: "Your Brand Story",
    body: "Craft messaging that sounds exactly like you — raw, real, and resonant. Not corporate. Not generic. You.",
  },
  {
    icon: Sparkles,
    title: "Your Offers",
    body: "Build service descriptions, sales pages, and pricing structures that reflect your true value — without underselling.",
  },
  {
    icon: Send,
    title: "Your Content",
    body: "Turn one idea into emails, posts, captions, and scripts in minutes. More reach. Less time. Full alignment.",
  },
];

const brandTiles = [
  {
    icon: Eye,
    title: "Stop the Scroll",
    body: "Create graphics that match your energy and command attention in a world full of noise.",
  },
  {
    icon: Palette,
    title: "Own Your Identity",
    body: "Build a cohesive visual brand — colors, fonts, layouts — that people recognize before they even read a word.",
  },
  {
    icon: Layers,
    title: "Create Without Limits",
    body: "Social posts, lead magnets, course covers, merch mockups — all of it in one place, built by you.",
  },
];

const incomePaths = [
  { icon: Package, title: "Digital Products", body: "Guides, courses, templates, and tools. Create once. Sell forever. No inventory. No overhead." },
  { icon: Users, title: "Coaching & Containers", body: "1:1 sessions, group programs, and mastermind containers. Your transformation is your product." },
  { icon: Share2, title: "Affiliate & Referral", body: "Promote tools and services you already use and believe in. Earn when your community takes action." },
  { icon: Video, title: "Content Monetization", body: "YouTube, podcasts, newsletters — build an audience and let the platforms pay you for your truth." },
  { icon: Briefcase, title: "Service-Based Offers", body: "Done-for-you services using your unique skills. High ticket. High impact. High alignment." },
  { icon: Heart, title: "Community & Membership", body: "Build a tribe around your mission. Recurring revenue. Collective energy. Lasting impact." },
];

const platformTools = [
  { icon: Code2, name: "Lovable", body: "Build full apps with no code. Describe what you want. Watch it appear. Own it completely. This is how Soul True was built." },
  { icon: Link2, name: "Beacons", body: "Your digital storefront. Link in bio meets full e-commerce. Sell digital products, services, and sessions — all in one link." },
  { icon: CreditCard, name: "Stripe", body: "Get paid, globally. Accept payments anywhere in the world. Subscriptions, one-time sales, invoices. Your money, your terms." },
  { icon: Mail, name: "Zoho Mail", body: "Own your communication. A professional email on your own domain. Not gmail. Not yahoo. Your name. Your brand. Your sovereignty." },
];

const sovereignLaws = [
  { icon: Crown, title: "You are the source. The tool is the channel.", body: "No tool creates your truth. It only helps you express what already lives inside you. The moment you outsource your voice entirely, you've lost the thing that made it worth listening to." },
  { icon: Compass, title: "Intuition before algorithm.", body: "If a tool tells you to do something that doesn't feel aligned — don't do it. Metrics are information. Your gut is wisdom. Wisdom wins." },
  { icon: Lock, title: "Own your platform. Rent nothing critical.", body: "Social media is borrowed land. Build on platforms you own — your website, your email list, your app. Algorithms change. Accounts get banned. Your owned assets never disappear." },
  { icon: Wind, title: "Speed is not the same as alignment.", body: "These tools move fast. Resist the urge to publish everything the moment it's created. Sit with it. Let it breathe. Aligned content outlasts viral content every time." },
  { icon: Flame, title: "Mastery over dependency.", body: "Learn how these tools work deeply enough that you could explain them to someone else. Dependency is a trap. Mastery is leverage. Know the tool. Don't be owned by it." },
];

/* ---------- page ---------- */

function SovereignCreatorGuide() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text }}>
      {/* Header */}
      <header className="mx-auto max-w-5xl px-6 pt-24 pb-10 text-center md:pt-32">
        <p
          className="text-[11px] uppercase tracking-[0.32em]"
          style={{ color: C.gold, fontFamily: fonts.body }}
        >
          A Resource for the Awakened
        </p>
        <h1
          className="mt-6 text-5xl font-light leading-[1.05] md:text-7xl"
          style={{ fontFamily: fonts.display, color: C.text }}
        >
          The Sovereign <em style={{ color: C.gold }}>Creator</em> Guide
        </h1>
        <p
          className="mx-auto mt-8 max-w-2xl text-lg font-light italic leading-relaxed"
          style={{ fontFamily: fonts.display, color: C.gold }}
        >
          You didn't wake up to stay small. These tools exist to amplify your mission, your voice, and your freedom. Use them as weapons — not masters.
        </p>

        <div
          className="mx-auto mt-12 w-full max-w-3xl"
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
            boxShadow: `0 0 12px ${C.gold}55`,
          }}
        />

        <blockquote
          className="mx-auto mt-12 max-w-3xl text-2xl font-light italic leading-snug md:text-3xl"
          style={{ fontFamily: fonts.display, color: C.text }}
        >
          “Your intuition leads. Technology follows. Never the other way around.”
        </blockquote>
      </header>

      <MushroomDivider height={300} />

      {/* SECTION 01 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionBadge n="01" />
        <SectionHeading>Your Voice, Amplified</SectionHeading>
        <GoldPill>Claude &amp; ChatGPT as Your Creative Partner</GoldPill>
        <Intro>
          Most people use these tools to replace their voice. Sovereign creators use them to multiply it. The difference is intention. You bring the truth, the experience, the fire. The tool helps you shape it into something the world can receive.
        </Intro>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {voiceTiles.map((t) => (
            <FeatureTile key={t.title} {...t} />
          ))}
        </div>
      </section>

      {/* SECTION 02 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionBadge n="02" />
        <SectionHeading>Your Brand, Visualized</SectionHeading>
        <GoldPill>Canva as Your Sacred Design Studio</GoldPill>
        <Intro>
          Your brand is a frequency. Every visual you put into the world either raises it or lowers it. You don't need a designer. You need intention, consistency, and the right tools.
        </Intro>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {brandTiles.map((t) => (
            <FeatureTile key={t.title} {...t} />
          ))}
        </div>
      </section>

      {/* SECTION 03 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionBadge n="03" />
        <SectionHeading>Your Income, Activated</SectionHeading>
        <p
          className="mt-4 text-base uppercase tracking-[0.22em]"
          style={{ color: C.gold, fontFamily: fonts.body }}
        >
          6 Income Paths for the Awakened Entrepreneur
        </p>
        <Intro>
          The matrix teaches you to trade time for money until you have nothing left. Sovereign income is built differently — multiple streams, each one aligned with your purpose, each one working even when you're not.
        </Intro>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {incomePaths.map((p, i) => (
            <div
              key={p.title}
              className="rounded-none p-7"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.goldSoft}` }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm"
                  style={{
                    border: `1px solid ${C.gold}`,
                    color: C.gold,
                    fontFamily: fonts.body,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p.icon size={22} style={{ color: C.gold }} />
              </div>
              <h3
                className="mt-5 text-2xl font-normal"
                style={{ fontFamily: fonts.display, color: C.text }}
              >
                {p.title}
              </h3>
              <p
                className="mt-3 text-sm font-light leading-relaxed"
                style={{ fontFamily: fonts.body, color: C.muted }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <MushroomDivider height={350} />

      {/* SECTION 04 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionBadge n="04" />
        <SectionHeading>Your Platform, Built</SectionHeading>
        <p
          className="mt-4 text-base uppercase tracking-[0.22em]"
          style={{ color: C.gold, fontFamily: fonts.body }}
        >
          No-Code Tools for the Sovereign Builder
        </p>
        <Intro>
          You don't need a developer. You don't need a tech degree. You need ownership — of your platform, your audience, and your data. These tools make that possible without asking permission from anyone.
        </Intro>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platformTools.map((t) => (
            <div
              key={t.name}
              className="rounded-none p-7"
              style={{ backgroundColor: C.bg, border: `1px solid ${C.goldSoft}` }}
            >
              <t.icon size={28} style={{ color: C.gold }} />
              <h3
                className="mt-5 text-2xl font-normal italic"
                style={{ fontFamily: fonts.display, color: C.gold }}
              >
                {t.name}
              </h3>
              <p
                className="mt-3 text-sm font-light leading-relaxed"
                style={{ fontFamily: fonts.body, color: C.muted }}
              >
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05 */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionBadge n="05" />
        <SectionHeading>Your Freedom, Protected</SectionHeading>
        <p
          className="mt-4 text-base uppercase tracking-[0.22em]"
          style={{ color: C.gold, fontFamily: fonts.body }}
        >
          The Sovereign Laws of Using These Tools
        </p>
        <Intro>
          Every tool can be a cage if you let it. These are the laws that keep you sovereign while you build.
        </Intro>
        <div className="mt-12 space-y-5">
          {sovereignLaws.map((l, i) => (
            <div
              key={l.title}
              className="rounded-none p-7"
              style={{
                backgroundColor: C.bg,
                border: `1px solid ${C.goldSoft}`,
                borderLeft: `4px solid ${C.gold}`,
              }}
            >
              <div className="flex items-start gap-5">
                <span
                  className="mt-1 text-xs uppercase tracking-[0.32em]"
                  style={{ color: C.gold, fontFamily: fonts.body }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3
                    className="text-2xl font-light italic md:text-3xl"
                    style={{ fontFamily: fonts.display, color: C.gold }}
                  >
                    {l.title}
                  </h3>
                  <p
                    className="mt-3 text-base font-light leading-relaxed"
                    style={{ fontFamily: fonts.body, color: C.muted }}
                  >
                    {l.body}
                  </p>
                </div>
                <l.icon size={22} style={{ color: C.gold, opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-32 pt-16">
        <div
          className="relative overflow-hidden rounded-none p-12 text-center md:p-16"
          style={{
            backgroundColor: C.deep,
            border: `1px solid ${C.goldSoft}`,
            borderTop: `2px solid ${C.gold}`,
            boxShadow: "0 0 60px rgba(232,130,26,0.08)",
          }}
        >
          <h2
            className="text-4xl font-light md:text-5xl"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            Ready to Go Deeper?
          </h2>
          <p
            className="mt-4 text-lg font-light italic"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            Your Transformation Begins Here.
          </p>
          <p
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed"
            style={{ fontFamily: fonts.body, color: C.muted }}
          >
            Soul True gives you the tools. Coaching gives you the breakthrough. Kim Alfano at Higher Vibes anchors everything you build here in real, lasting transformation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:highervibrations36@gmail.com?subject=Soul%20True%20sent%20me"
              className="rounded-none px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition hover:shadow-[0_0_18px_rgba(232,130,26,0.5)]"
              style={{
                color: "#0A0A0A",
                background: "linear-gradient(135deg,#C9A84C,#D4A017)",
                border: `1px solid ${C.gold}`,
                fontFamily: fonts.body,
              }}
            >
              Book a Session with Kim
            </a>
            <a
              href="https://beacons.ai/higher_vibes"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition hover:bg-[#1F1810]"
              style={{
                color: C.gold,
                background: "transparent",
                border: `1px solid ${C.gold}`,
                fontFamily: fonts.body,
              }}
            >
              Visit Higher Vibes
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
