import soulTrueLogoAsset from "@/assets/soul-true-logo-tagline.png.asset.json";

interface BrandLoaderProps {
  size?: number;
  className?: string;
  label?: string;
}

/**
 * Sacred loading state — Soul True logo pulsing softly in gold.
 * Use anywhere a spinner is needed (page transitions, generations, form submits).
 */
export function BrandLoader({ size = 56, className = "", label = "Loading" }: BrandLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={soulTrueLogoAsset.url}
        alt=""
        aria-hidden="true"
        style={{
          width: size,
          height: "auto",
          animation: "soulTruePulse 2.4s ease-in-out infinite",
          filter: "drop-shadow(0 0 12px rgba(232,130,26,0.45))",
        }}
      />
      <span className="sr-only">{label}</span>
      <style>{`
        @keyframes soulTruePulse {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}

export default BrandLoader;
