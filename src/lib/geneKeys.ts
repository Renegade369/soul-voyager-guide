// Approximate ephemeris for Gene Key calculation.
// Returns 6 Gene Key numbers (1–64) from a birth date/time.
// Uses simplified astronomy: low-precision Sun, mean-motion Venus & Jupiter.

const DEG = Math.PI / 180;

// Days since J2000.0 (2000-01-01 12:00 UT)
function julianDay(date: Date): number {
  return (date.getTime() / 86400000) + 2440587.5;
}
function daysSinceJ2000(date: Date): number {
  return julianDay(date) - 2451545.0;
}

// Sun's apparent ecliptic longitude in degrees (low precision, ±0.01°)
function sunLongitude(date: Date): number {
  const n = daysSinceJ2000(date);
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * DEG;
  let lam = L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g);
  lam = ((lam % 360) + 360) % 360;
  return lam;
}

// Mean longitudes (J2000.0) and daily mean motions for the slow planets
const VENUS_L0 = 181.97980;
const VENUS_DAILY = 1.6021303;
const JUPITER_L0 = 34.39644;
const JUPITER_DAILY = 0.0831294;

function venusLongitude(date: Date): number {
  const n = daysSinceJ2000(date);
  return (((VENUS_L0 + VENUS_DAILY * n) % 360) + 360) % 360;
}
function jupiterLongitude(date: Date): number {
  const n = daysSinceJ2000(date);
  return (((JUPITER_L0 + JUPITER_DAILY * n) % 360) + 360) % 360;
}

// Standard Human Design wheel: Gate 1 begins at ~62.25° from 0° Aries.
// Per spec, map gate index 1:1 to Gene Key number.
const GATE_OFFSET = 62.25;
const GATE_WIDTH = 360 / 64; // 5.625

function longitudeToGate(lonDeg: number): number {
  const shifted = ((lonDeg - GATE_OFFSET) % 360 + 360) % 360;
  const idx = Math.floor(shifted / GATE_WIDTH) + 1; // 1..64
  return idx < 1 ? 64 : idx > 64 ? 1 : idx;
}

export type GeneKeySet = {
  lifeWork: number;
  evolution: number;
  radiance: number;
  purpose: number;
  pearl: number;
  venus: number;
};

/**
 * Compute the 6 Gene Keys. Time is optional — defaults to solar noon UTC.
 */
export function calculateGeneKeys(birthDate: string, birthTime?: string): GeneKeySet {
  // birthDate: "YYYY-MM-DD", birthTime: "HH:MM" (optional)
  const time = birthTime && /^\d{2}:\d{2}/.test(birthTime) ? birthTime : "12:00";
  const iso = `${birthDate}T${time}:00Z`;
  const natal = new Date(iso);
  if (isNaN(natal.getTime())) {
    // Fallback: simple day-of-year mapping
    const fallback = simpleFallback(birthDate);
    return {
      lifeWork: fallback, evolution: ((fallback + 31) % 64) + 1,
      radiance: ((fallback + 15) % 64) + 1, purpose: ((fallback + 47) % 64) + 1,
      pearl: ((fallback + 7) % 64) + 1, venus: ((fallback + 23) % 64) + 1,
    };
  }

  // Design moment: ~88 days (≈ 88° of solar arc) before birth
  const design = new Date(natal.getTime() - 88 * 86400000);

  const sunNatal = sunLongitude(natal);
  const sunDesign = sunLongitude(design);
  const earthNatal = (sunNatal + 180) % 360;
  const earthDesign = (sunDesign + 180) % 360;
  const venus = venusLongitude(natal);
  const jupiter = jupiterLongitude(natal);

  return {
    lifeWork: longitudeToGate(sunNatal),
    evolution: longitudeToGate(earthNatal),
    radiance: longitudeToGate(sunDesign),
    purpose: longitudeToGate(earthDesign),
    pearl: longitudeToGate(jupiter),
    venus: longitudeToGate(venus),
  };
}

function simpleFallback(birthDate: string): number {
  const d = new Date(birthDate + "T12:00:00Z");
  if (isNaN(d.getTime())) return 1;
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 0));
  const day = Math.floor((d.getTime() - start.getTime()) / 86400000);
  return Math.max(1, Math.min(64, Math.ceil((day / 365) * 64)));
}

export const GENE_KEY_TITLES: Record<number, string> = {
  1: "Freshness", 2: "Unity", 3: "Innovation", 4: "Forgiveness", 5: "Patience",
  6: "Diplomacy", 7: "Guidance", 8: "Contribution", 9: "Determination", 10: "Being",
  11: "Idealism", 12: "Discrimination", 13: "Discernment", 14: "Competence",
  15: "Magnetism", 16: "Versatility", 17: "Omniscience", 18: "Integrity",
  19: "Sacrifice", 20: "The Now", 21: "Valour", 22: "Graciousness", 23: "Simplicity",
  24: "Invention", 25: "Universal Love", 26: "Invisibility", 27: "Altruism",
  28: "Totality", 29: "Devotion", 30: "Lightness", 31: "Leadership", 32: "Veneration",
  33: "Mindfulness", 34: "Power", 35: "Adventure", 36: "Compassion", 37: "Tenderness",
  38: "Perseverance", 39: "Dynamism", 40: "Resolve", 41: "Fantasy", 42: "Detachment",
  43: "Insight", 44: "Synarchy", 45: "Communion", 46: "Ecstasy", 47: "Transmutation",
  48: "Wisdom", 49: "Revolution", 50: "Harmony", 51: "Initiative", 52: "Stillness",
  53: "Expansion", 54: "Aspiration", 55: "Freedom", 56: "Enrichment", 57: "Acuity",
  58: "Vitality", 59: "Intimacy", 60: "Realism", 61: "Inspiration", 62: "Precision",
  63: "Truth", 64: "Imagination",
};

export const SPHERE_LABELS = {
  lifeWork: "Life's Work",
  evolution: "Evolution",
  radiance: "Radiance",
  purpose: "Purpose",
  pearl: "Pearl",
  venus: "Venus",
} as const;
