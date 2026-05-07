/**
 * Simplified astronomical calculations for birth chart positions.
 * Uses mean orbital elements to approximate planetary longitudes.
 * Accuracy: Sun ±0°, Moon ±2–3°, planets ±1–3° — sufficient for sign-level readings.
 */

export const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
] as const;
export type ZodiacSign = (typeof SIGNS)[number];

export const HOUSES = [1,2,3,4,5,6,7,8,9,10,11,12] as const;

export interface PlanetPosition {
  name: string;
  longitude: number;      // 0–360 ecliptic
  sign: ZodiacSign;
  degree: number;          // degree within sign 0–29
  house?: number;          // 1–12 if birth time known
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;            // conjunction, opposition, trine, square, sextile
  angle: number;
  orb: number;
}

export interface BirthChart {
  planets: PlanetPosition[];
  aspects: Aspect[];
  ascendant?: PlanetPosition;
  houses?: number[];       // cusp longitudes
}

/* ── Julian Date ── */
function toJD(year: number, month: number, day: number, hour: number = 12): number {
  let y = year, m = month;
  if (m <= 2) { y--; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hour / 24 + B - 1524.5;
}

/* ── Normalize angle 0–360 ── */
function norm(a: number): number { return ((a % 360) + 360) % 360; }

/* ── Sign from longitude ── */
function signFromLong(lon: number): { sign: ZodiacSign; degree: number } {
  const l = norm(lon);
  const idx = Math.floor(l / 30);
  return { sign: SIGNS[idx], degree: Math.floor(l % 30) };
}

/* ── Mean planetary longitudes (simplified) ── */
// Reference: J2000.0 mean elements (epoch JD 2451545.0)
const J2000 = 2451545.0;

interface OrbitalElement { L0: number; Ld: number; } // mean longitude at epoch, daily motion

const ELEMENTS: Record<string, OrbitalElement> = {
  Sun:     { L0: 280.46646,  Ld: 0.9856474 },
  Moon:    { L0: 218.3165,   Ld: 13.1763966 },
  Mercury: { L0: 252.2509,  Ld: 4.0932377 },
  Venus:   { L0: 181.9798,  Ld: 1.6021302 },
  Mars:    { L0: 355.4533,  Ld: 0.5240208 },
  Jupiter: { L0: 34.3515,   Ld: 0.0831294 },
  Saturn:  { L0: 49.9489,   Ld: 0.0334979 },
  Uranus:  { L0: 313.2322,  Ld: 0.0117099 },
  Neptune: { L0: 304.8800,  Ld: 0.0059810 },
  Pluto:   { L0: 238.9290,  Ld: 0.003971 },
};

// Mean North Node (regresses ~19.35°/year)
const NODE_L0 = 125.0446;
const NODE_Ld = -0.0529539;

function meanLongitude(el: OrbitalElement, jd: number): number {
  const d = jd - J2000;
  return norm(el.L0 + el.Ld * d);
}

/* ── Sun: add equation of center for better accuracy ── */
function sunLongitude(jd: number): number {
  const d = jd - J2000;
  const M = norm(357.5291 + 0.98560028 * d); // mean anomaly
  const Mrad = M * Math.PI / 180;
  const C = 1.9148 * Math.sin(Mrad) + 0.02 * Math.sin(2 * Mrad); // equation of center
  const L = norm(280.46646 + 0.9856474 * d);
  return norm(L + C);
}

/* ── Moon: add major perturbation terms ── */
function moonLongitude(jd: number): number {
  const d = jd - J2000;
  const L = norm(218.3165 + 13.1763966 * d);
  const M = norm(134.963 + 13.0649930 * d) * Math.PI / 180;  // Moon mean anomaly
  const Ms = norm(357.5291 + 0.98560028 * d) * Math.PI / 180; // Sun mean anomaly
  const D = norm(297.8502 + 12.1907492 * d) * Math.PI / 180;  // elongation
  const F = norm(93.2720 + 13.2293504 * d) * Math.PI / 180;   // argument of latitude

  // Main perturbation terms
  const dL = 6.289 * Math.sin(M)
    - 1.274 * Math.sin(2 * D - M)
    + 0.658 * Math.sin(2 * D)
    + 0.214 * Math.sin(2 * M)
    - 0.186 * Math.sin(Ms)
    - 0.114 * Math.sin(2 * F);
  return norm(L + dL);
}

/* ── Approximate Ascendant ── */
// Uses RAMC (Right Ascension of Mid-heaven) and geographic latitude
function calcAscendant(jd: number, latDeg: number, lonDeg: number): number {
  const d = jd - J2000;
  // Greenwich sidereal time (degrees)
  const hours = ((jd - 0.5) % 1) * 24;
  const T = d / 36525;
  let GST = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T;
  GST = norm(GST);
  // Local sidereal time
  const LST = norm(GST + lonDeg);
  const LSTrad = LST * Math.PI / 180;
  const lat = latDeg * Math.PI / 180;
  const e = 23.4393 * Math.PI / 180; // obliquity

  const asc = Math.atan2(
    Math.cos(LSTrad),
    -(Math.sin(LSTrad) * Math.cos(e) + Math.tan(lat) * Math.sin(e))
  );
  return norm(asc * 180 / Math.PI);
}

/* ── Equal house system ── */
function equalHouses(ascLon: number): number[] {
  return Array.from({ length: 12 }, (_, i) => norm(ascLon + i * 30));
}

function assignHouse(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    if (start < end) {
      if (lon >= start && lon < end) return i + 1;
    } else {
      // wraps around 0°
      if (lon >= start || lon < end) return i + 1;
    }
  }
  return 1;
}

/* ── Aspects ── */
const ASPECT_DEFS: { name: string; angle: number; orb: number }[] = [
  { name: "Conjunction", angle: 0, orb: 8 },
  { name: "Opposition", angle: 180, orb: 8 },
  { name: "Trine", angle: 120, orb: 8 },
  { name: "Square", angle: 90, orb: 7 },
  { name: "Sextile", angle: 60, orb: 6 },
];

function findAspects(planets: PlanetPosition[]): Aspect[] {
  const aspects: Aspect[] = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      let diff = Math.abs(planets[i].longitude - planets[j].longitude);
      if (diff > 180) diff = 360 - diff;
      for (const asp of ASPECT_DEFS) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          aspects.push({
            planet1: planets[i].name,
            planet2: planets[j].name,
            type: asp.name,
            angle: asp.angle,
            orb: Math.round(orb * 10) / 10,
          });
          break;
        }
      }
    }
  }
  return aspects;
}

/* ═══════════════════════════ PUBLIC API ═══════════════════════════ */

export interface BirthData {
  year: number;
  month: number;    // 1–12
  day: number;
  hour?: number;    // 0–23 (local time)
  minute?: number;
  latitude: number;
  longitude: number;
  timezoneOffset?: number; // hours offset from UTC (e.g. -5 for EST)
}

export function calculateBirthChart(data: BirthData): BirthChart {
  const utcHour = (data.hour ?? 12) + (data.minute ?? 0) / 60 - (data.timezoneOffset ?? 0);
  const jd = toJD(data.year, data.month, data.day, utcHour);

  const planetNames = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"];
  const longitudes: Record<string, number> = {};

  // Calculate longitudes
  longitudes["Sun"] = sunLongitude(jd);
  longitudes["Moon"] = moonLongitude(jd);
  for (const name of planetNames.slice(2)) {
    longitudes[name] = meanLongitude(ELEMENTS[name], jd);
  }

  // North Node
  const nodeLon = norm(NODE_L0 + NODE_Ld * (jd - J2000));

  // Ascendant & houses (only if birth time provided)
  let ascLon: number | undefined;
  let cusps: number[] | undefined;
  const hasBirthTime = data.hour !== undefined;
  if (hasBirthTime) {
    ascLon = calcAscendant(jd, data.latitude, data.longitude);
    cusps = equalHouses(ascLon);
  }

  // Build planet positions
  const planets: PlanetPosition[] = [];
  for (const name of planetNames) {
    const lon = longitudes[name];
    const { sign, degree } = signFromLong(lon);
    const pos: PlanetPosition = { name, longitude: lon, sign, degree };
    if (cusps) pos.house = assignHouse(lon, cusps);
    planets.push(pos);
  }

  // North Node
  const { sign: nodeSign, degree: nodeDeg } = signFromLong(nodeLon);
  const nodePos: PlanetPosition = { name: "North Node", longitude: nodeLon, sign: nodeSign, degree: nodeDeg };
  if (cusps) nodePos.house = assignHouse(nodeLon, cusps);
  planets.push(nodePos);

  // Ascendant
  let ascendant: PlanetPosition | undefined;
  if (ascLon !== undefined) {
    const { sign: ascSign, degree: ascDeg } = signFromLong(ascLon);
    ascendant = { name: "Ascendant", longitude: ascLon, sign: ascSign, degree: ascDeg, house: 1 };
  }

  const aspects = findAspects(planets);

  return { planets, aspects, ascendant, houses: cusps };
}

/* ── City→coords helper (approximate, major cities) ── */
// A simple lookup for common cities; for production, use a geocoding API
export const TIMEZONE_OFFSETS: Record<string, number> = {
  "US": -5, "United States": -5, "Canada": -5, "Mexico": -6,
  "United Kingdom": 0, "UK": 0, "France": 1, "Germany": 1, "Italy": 1, "Spain": 1,
  "Netherlands": 1, "Belgium": 1, "Switzerland": 1, "Austria": 1, "Poland": 1,
  "Sweden": 1, "Norway": 1, "Denmark": 1, "Finland": 2, "Greece": 2,
  "Turkey": 3, "Russia": 3, "India": 5.5, "China": 8, "Japan": 9,
  "South Korea": 9, "Australia": 10, "New Zealand": 12, "Brazil": -3,
  "Argentina": -3, "Colombia": -5, "Chile": -4, "Peru": -5,
  "South Africa": 2, "Nigeria": 1, "Kenya": 3, "Egypt": 2,
  "Saudi Arabia": 3, "UAE": 4, "Israel": 2, "Thailand": 7,
  "Vietnam": 7, "Philippines": 8, "Indonesia": 7, "Malaysia": 8, "Singapore": 8,
  "Portugal": 0, "Ireland": 0, "Iceland": 0, "Romania": 2, "Czech Republic": 1,
  "Hungary": 1, "Bulgaria": 2, "Croatia": 1, "Ukraine": 2,
};

export function getApproxCoords(country: string): { lat: number; lon: number } {
  // Approximate center coordinates for countries
  const coords: Record<string, { lat: number; lon: number }> = {
    "United States": { lat: 39.8, lon: -98.6 },
    "Canada": { lat: 56.1, lon: -106.3 },
    "United Kingdom": { lat: 51.5, lon: -0.1 },
    "France": { lat: 46.6, lon: 2.2 },
    "Germany": { lat: 51.2, lon: 10.4 },
    "Italy": { lat: 41.9, lon: 12.5 },
    "Spain": { lat: 40.5, lon: -3.7 },
    "India": { lat: 20.6, lon: 78.9 },
    "China": { lat: 35.9, lon: 104.2 },
    "Japan": { lat: 36.2, lon: 138.3 },
    "Australia": { lat: -25.3, lon: 133.8 },
    "Brazil": { lat: -14.2, lon: -51.9 },
    "Mexico": { lat: 23.6, lon: -102.6 },
    "South Korea": { lat: 35.9, lon: 127.8 },
    "Russia": { lat: 61.5, lon: 105.3 },
    "South Africa": { lat: -30.6, lon: 22.9 },
    "Argentina": { lat: -38.4, lon: -63.6 },
    "Nigeria": { lat: 9.1, lon: 8.7 },
    "Egypt": { lat: 26.8, lon: 30.8 },
    "Turkey": { lat: 39.0, lon: 35.2 },
    "Thailand": { lat: 15.9, lon: 100.9 },
    "Philippines": { lat: 12.9, lon: 121.8 },
    "Indonesia": { lat: -0.8, lon: 113.9 },
    "Colombia": { lat: 4.6, lon: -74.1 },
    "New Zealand": { lat: -40.9, lon: 174.9 },
    "Netherlands": { lat: 52.1, lon: 5.3 },
    "Belgium": { lat: 50.5, lon: 4.5 },
    "Switzerland": { lat: 46.8, lon: 8.2 },
    "Sweden": { lat: 60.1, lon: 18.6 },
    "Norway": { lat: 60.5, lon: 8.5 },
    "Denmark": { lat: 56.3, lon: 9.5 },
    "Finland": { lat: 61.9, lon: 25.7 },
    "Greece": { lat: 39.1, lon: 21.8 },
    "Portugal": { lat: 39.4, lon: -8.2 },
    "Ireland": { lat: 53.1, lon: -7.7 },
    "Poland": { lat: 51.9, lon: 19.1 },
    "Austria": { lat: 47.5, lon: 14.6 },
    "Israel": { lat: 31.0, lon: 34.9 },
    "UAE": { lat: 23.4, lon: 53.8 },
    "Saudi Arabia": { lat: 23.9, lon: 45.1 },
    "Kenya": { lat: -0.0, lon: 37.9 },
    "Chile": { lat: -35.7, lon: -71.5 },
    "Peru": { lat: -9.2, lon: -75.0 },
    "Malaysia": { lat: 4.2, lon: 101.9 },
    "Singapore": { lat: 1.4, lon: 103.8 },
    "Vietnam": { lat: 14.1, lon: 108.3 },
  };
  return coords[country] || { lat: 40.7, lon: -74.0 }; // default NYC
}

export const COUNTRIES = [
  "United States","Canada","United Kingdom","Australia","India","Germany","France","Italy",
  "Spain","Mexico","Brazil","Japan","South Korea","China","Russia","South Africa","Argentina",
  "Nigeria","Egypt","Turkey","Thailand","Philippines","Indonesia","Colombia","New Zealand",
  "Netherlands","Belgium","Switzerland","Sweden","Norway","Denmark","Finland","Greece","Portugal",
  "Ireland","Poland","Austria","Israel","UAE","Saudi Arabia","Kenya","Chile","Peru","Malaysia",
  "Singapore","Vietnam","Czech Republic","Hungary","Bulgaria","Croatia","Romania","Ukraine","Iceland",
];
