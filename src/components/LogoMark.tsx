import soulTrueLogoAsset from "@/assets/soul-true-logo-tagline.png.asset.json";

/**
 * Small Soul True lockup (wordmark + Tree + "Let's Go Deeper." baked into the image)
 * used as a brand signature in the corner of result cards, program cards, etc.
 * Renders the whole lockup as a single unit — never render the tagline as separate text.
 */
export function LogoMark({
  size = 44,
  className = "",
  opacity = 1,
  position = "top-right",
}: {
  size?: number;
  className?: string;
  opacity?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "none";
}) {
  const posClasses: Record<string, string> = {
    "top-right": "absolute top-3 right-3 md:top-4 md:right-4",
    "top-left": "absolute top-3 left-3 md:top-4 md:left-4",
    "bottom-right": "absolute bottom-3 right-3 md:bottom-4 md:right-4",
    "bottom-left": "absolute bottom-3 left-3 md:bottom-4 md:left-4",
    none: "",
  };
  return (
    <img
      src={soulTrueLogoAsset.url}
      alt="Soul True — Let's Go Deeper."
      aria-hidden="true"
      className={`${posClasses[position]} pointer-events-none select-none ${className}`}
      style={{ width: size, height: "auto", opacity }}
    />
  );
}

/**
 * Large, low-opacity watermark mark for hero backgrounds and empty states.
 * The whole lockup renders as one image — no separate tagline text underneath.
 */
export function LogoWatermark({
  size = 320,
  opacity = 0.08,
  className = "",
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <img
      src={soulTrueLogoAsset.url}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: "auto", opacity }}
    />
  );
}

export default LogoMark;
