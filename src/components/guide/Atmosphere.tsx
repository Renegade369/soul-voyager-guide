/* Atmospheric imagery helpers — candlelit sacred aesthetic.
   All photos sourced from Unsplash (free, royalty-free).
   We pin to specific photo IDs so the look is stable. */

export const ATMOSPHERE = {
  // Dark candles glowing in a moody space
  candles: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=70",
  // Soft golden bokeh / candle flames
  bokeh: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=1920&q=70",
  // Amethyst geode close-up
  amethyst: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?auto=format&fit=crop&w=600&q=70",
  // Clear quartz cluster
  quartz: "https://images.unsplash.com/photo-1611425143678-08fc480cafde?auto=format&fit=crop&w=600&q=70",
  // Selenite / pale crystal wand
  selenite: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=600&q=70",
  // Dark stone / candlelight texture
  stone: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?auto=format&fit=crop&w=1600&q=70",
} as const;

/* Fixed full-screen parallax backdrop placed behind all content. */
export function SacredBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.18), transparent 55%),
          radial-gradient(ellipse at 80% 100%, rgba(201,168,76,0.10), transparent 60%),
          linear-gradient(rgba(26,20,16,0.86), rgba(26,20,16,0.94)),
          url(${ATMOSPHERE.candles})
        `,
        backgroundSize: "cover, cover, cover, cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    />
  );
}

/* Hero overlay: atmospheric candle/crystal image with heavy dark wash. */
export function HeroAtmosphere({ image = ATMOSPHERE.candles }: { image?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(26,20,16,0.55) 0%, rgba(26,20,16,0.85) 70%, rgba(26,20,16,1) 100%),
          url(${image})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

/* Glowing gold particle / light-ray divider with a small crystal shard. */
export function CrystalDivider() {
  return (
    <div className="relative my-12 flex items-center justify-center" aria-hidden>
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)",
          boxShadow: "0 0 18px rgba(201,168,76,0.35)",
        }}
      />
      <div
        className="relative h-10 w-10 rounded-full"
        style={{
          backgroundImage: `url(${ATMOSPHERE.quartz})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid rgba(201,168,76,0.45)",
          boxShadow:
            "0 0 24px rgba(201,168,76,0.45), inset 0 0 12px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}

/* Tiny crystal accent for card corners. */
export function CrystalCorner({
  image = ATMOSPHERE.amethyst,
  position = "tr",
  size = 56,
}: {
  image?: string;
  position?: "tl" | "tr" | "bl" | "br";
  size?: number;
}) {
  const pos: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${pos[position]} rounded-full opacity-50 mix-blend-screen`}
      style={{
        width: size,
        height: size,
        transform: "translate(25%, -25%)",
        backgroundImage: `radial-gradient(circle at center, rgba(201,168,76,0.35), transparent 70%), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(0.5px)",
      }}
    />
  );
}
