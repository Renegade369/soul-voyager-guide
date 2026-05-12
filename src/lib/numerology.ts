// Pythagorean numerology
const LETTER: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

function reduceSimple(n: number): number {
  while (n > 9) n = String(n).split("").reduce((s, d) => s + Number(d), 0);
  return n;
}

export function lifePath(birthDate: string): number {
  // birthDate like 1973-07-14 or 07/14/1973
  const digits = birthDate.replace(/\D/g, "");
  const sum = digits.split("").reduce((s, d) => s + Number(d), 0);
  return reduce(sum);
}

function nameValue(name: string, filter: (ch: string) => boolean): number {
  const sum = name.toLowerCase().split("").filter((ch) => /[a-z]/.test(ch) && filter(ch)).reduce((s, ch) => s + (LETTER[ch] ?? 0), 0);
  return reduce(sum);
}

export function expression(fullName: string): number {
  return nameValue(fullName, () => true);
}
export function soulUrge(fullName: string): number {
  return nameValue(fullName, (ch) => VOWELS.has(ch));
}
export function personality(fullName: string): number {
  return nameValue(fullName, (ch) => !VOWELS.has(ch));
}
export function personalYear(birthDate: string, currentYear = new Date().getFullYear()): number {
  const digits = birthDate.replace(/\D/g, "");
  // Expect YYYYMMDD or MMDDYYYY — just take month+day digits (first 4 of MMDD or last 4 of YYYYMMDD)
  const d = new Date(birthDate);
  const month = isNaN(d.getTime()) ? Number(digits.slice(0, 2)) : d.getMonth() + 1;
  const day = isNaN(d.getTime()) ? Number(digits.slice(2, 4)) : d.getDate();
  const yearDigits = String(currentYear).split("").reduce((s, x) => s + Number(x), 0);
  const monthDigits = reduceSimple(month);
  const dayDigits = reduceSimple(day);
  return reduce(monthDigits + dayDigits + yearDigits);
}

export function calculateAll(fullName: string, birthDate: string, currentYear = new Date().getFullYear()) {
  return {
    life_path: lifePath(birthDate),
    expression: expression(fullName),
    soul_urge: soulUrge(fullName),
    personality: personality(fullName),
    personal_year: personalYear(birthDate, currentYear),
  };
}
