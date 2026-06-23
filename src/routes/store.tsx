import { createFileRoute } from "@tanstack/react-router";
import { makeRouteMeta } from "../components/PageShell";
import soulTrueLogoAsset from "@/assets/soul-true-logo-tagline.png.asset.json";
const soulTrueLogo = soulTrueLogoAsset.url;
import classicTee from "@/assets/store-classic-tee.jpg";
import longSleeve from "@/assets/store-long-sleeve.jpg";
import hoodie from "@/assets/store-hoodie.jpg";
import mug from "@/assets/store-mug.jpg";
import tumbler from "@/assets/store-tumbler.jpg";
import classicTeeWhite from "@/assets/store-classic-tee-white.jpg";
import longSleeveWhite from "@/assets/store-long-sleeve-white.jpg";
import hoodieWhite from "@/assets/store-hoodie-white.jpg";
import mugWhite from "@/assets/store-mug-white.jpg";
import tumblerWhite from "@/assets/store-tumbler-white.jpg";

export const Route = createFileRoute("/store")({
  head: () =>
    makeRouteMeta({
      title: "Soul True Store — Wear Your Truth",
      description:
        "Soul True Collection — sacred apparel and ceremonial goods for the seeker. Let's Go Deeper.",
    }),
  component: StorePage,
});

const C = {
  bg: "#0A0B09",
  gold: "#C9A84C",
  goldAlt: "#D4A017",
  text: "#F5F0E8",
  glow: "#E8821A",
  border: "rgba(201,168,76,0.28)",
};
const fonts = {
  display: '"Cormorant Garamond", serif',
  body: '"Outfit", sans-serif',
};

type Product = {
  name: string;
  image: string;
  description: string;
  url: string;
};

const products: Product[] = [
  {
    name: "Classic Tee — Black/Gold",
    image: classicTee,
    description:
      "Ultra-soft, lightweight tee for the seeker who wears their truth. Simple on the outside. Everything on the inside. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Long Sleeve Tee — Black/Gold",
    image: longSleeve,
    description:
      "For the ones who go further than most. Premium soft long sleeve built for comfort on the journey inward. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Hoodie — Black/Gold",
    image: hoodie,
    description:
      "Wrap yourself in the work. Our signature heavyweight hoodie for the soul doing the real thing. Wear it like armor. Wear it like a reminder. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Coffee Mug — Black/Gold",
    image: mug,
    description:
      "Every morning is an invitation. Start yours with intention. Because the inner work begins before the world wakes up. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Tumbler — Black/Gold",
    image: tumbler,
    description:
      "Stay hydrated on the journey. Double-wall insulated tumbler keeps your drink cold or hot — wherever the path takes you. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
];

const productsWhite: Product[] = [
  {
    name: "Classic Tee — White/Gold",
    image: classicTeeWhite,
    description:
      "Ultra-soft, lightweight tee for the seeker who wears their truth. Simple on the outside. Everything on the inside. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Long Sleeve Tee — White/Gold",
    image: longSleeveWhite,
    description:
      "For the ones who go further than most. Premium soft long sleeve built for comfort on the journey inward. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Hoodie — White/Gold",
    image: hoodieWhite,
    description:
      "Wrap yourself in the work. Our signature heavyweight hoodie for the soul doing the real thing. Wear it like armor. Wear it like a reminder. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Coffee Mug — White/Gold",
    image: mugWhite,
    description:
      "Every morning is an invitation. Start yours with intention. Because the inner work begins before the world wakes up. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
  {
    name: "Tumbler — White/Gold",
    image: tumblerWhite,
    description:
      "Stay hydrated on the journey. Double-wall insulated tumbler keeps your drink cold or hot — wherever the path takes you. Let's Go Deeper. — Soul-True.com",
    url: "#",
  },
];

function StorePage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: fonts.body }}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(232,130,26,0.18) 0%, rgba(201,168,76,0.08) 35%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
          <img
            src={soulTrueLogo}
            alt="Soul True"
            className="h-40 w-auto md:h-56"
            style={{ filter: `drop-shadow(0 0 40px rgba(232,130,26,0.35))` }}
          />
          <p
            className="mt-10 text-sm font-light uppercase tracking-[0.3em] md:text-base"
            style={{ color: C.text, opacity: 0.75 }}
          >
            Soul-True.com
          </p>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="mx-auto h-px w-32"
          style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
        />
      </section>

      {/* SOUL TRUE COLLECTION */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-[11px] font-normal uppercase tracking-[0.32em]"
            style={{ color: C.gold }}
          >
            The Collection
          </p>
          <h2
            className="mt-6 text-4xl font-light md:text-5xl"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            Soul True Collection
          </h2>
          <p
            className="mt-5 text-lg italic md:text-xl"
            style={{ fontFamily: fonts.display, color: C.gold, opacity: 0.9 }}
          >
            Wear your truth.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* SOUL TRUE COLLECTION — WHITE/GOLD */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div
          aria-hidden
          className="mx-auto mb-20 h-px w-32"
          style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
        />
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-[11px] font-normal uppercase tracking-[0.32em]"
            style={{ color: C.gold }}
          >
            The Collection
          </p>
          <h2
            className="mt-6 text-4xl font-light md:text-5xl"
            style={{ fontFamily: fonts.display, color: C.text }}
          >
            Soul True Collection — White/Gold
          </h2>
          <p
            className="mt-5 text-lg italic md:text-xl"
            style={{ fontFamily: fonts.display, color: C.gold, opacity: 0.9 }}
          >
            Light bearer. Same truth.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {productsWhite.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="flex flex-col transition-shadow"
      style={{
        backgroundColor: C.bg,
        border: `1px solid ${C.border}`,
        boxShadow: "0 0 30px rgba(232,130,26,0.06) inset",
      }}
    >
      <div className="aspect-square w-full overflow-hidden" style={{ backgroundColor: "#000" }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-7 py-8">
        <h3
          className="text-2xl font-light md:text-3xl"
          style={{ fontFamily: fonts.display, color: C.gold }}
        >
          {product.name}
        </h3>
        <p
          className="mt-4 text-sm font-light leading-relaxed md:text-base"
          style={{ color: C.text, opacity: 0.78 }}
        >
          {product.description}
        </p>
        <p
          className="mt-6 text-[11px] uppercase tracking-[0.28em]"
          style={{ color: C.text, opacity: 0.55 }}
        >
          [Price Placeholder]
        </p>
        <a
          href={product.url}
          className="mt-6 inline-block px-6 py-3 text-center text-[11px] font-normal uppercase tracking-[0.22em] transition hover:shadow-[0_0_22px_rgba(232,130,26,0.5)]"
          style={{
            color: "#0A0A0A",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldAlt})`,
            border: `1px solid ${C.gold}`,
          }}
        >
          Buy Now
        </a>
      </div>
    </article>
  );
}
