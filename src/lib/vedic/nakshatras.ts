/**
 * 27 Nakshatras (lunar mansions) and 12 Rashis (zodiac signs) lookup.
 * Each nakshatra spans 13°20' (13.333...°) and has 4 padas of 3°20' each.
 */

export const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu" },
  { name: "Bharani", lord: "Venus" },
  { name: "Krittika", lord: "Sun" },
  { name: "Rohini", lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" },
  { name: "Ardra", lord: "Rahu" },
  { name: "Punarvasu", lord: "Jupiter" },
  { name: "Pushya", lord: "Saturn" },
  { name: "Ashlesha", lord: "Mercury" },
  { name: "Magha", lord: "Ketu" },
  { name: "Purva Phalguni", lord: "Venus" },
  { name: "Uttara Phalguni", lord: "Sun" },
  { name: "Hasta", lord: "Moon" },
  { name: "Chitra", lord: "Mars" },
  { name: "Swati", lord: "Rahu" },
  { name: "Vishakha", lord: "Jupiter" },
  { name: "Anuradha", lord: "Saturn" },
  { name: "Jyeshtha", lord: "Mercury" },
  { name: "Moola", lord: "Ketu" },
  { name: "Purva Ashadha", lord: "Venus" },
  { name: "Uttara Ashadha", lord: "Sun" },
  { name: "Shravana", lord: "Moon" },
  { name: "Dhanishta", lord: "Mars" },
  { name: "Shatabhisha", lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" },
  { name: "Uttara Bhadrapada", lord: "Saturn" },
  { name: "Revati", lord: "Mercury" },
] as const;

const NAKSHATRA_SPAN = 360 / 27; // 13.3333... degrees
const PADA_SPAN = NAKSHATRA_SPAN / 4; // 3.3333... degrees

/**
 * Get the zodiac sign from sidereal longitude.
 */
export function getSign(siderealLongitude: number): {
  sign: string;
  signIndex: number;
  degree: number;
} {
  const signIndex = Math.floor(siderealLongitude / 30) % 12;
  const degree = siderealLongitude % 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    signIndex,
    degree,
  };
}

/**
 * Get the nakshatra from sidereal longitude.
 */
export function getNakshatra(siderealLongitude: number): {
  nakshatra: string;
  nakshatraIndex: number;
  nakshatraPada: number;
  nakshatraLord: string;
  degreeInNakshatra: number;
} {
  const nakshatraIndex = Math.floor(siderealLongitude / NAKSHATRA_SPAN) % 27;
  const degreeInNakshatra = siderealLongitude % NAKSHATRA_SPAN;
  const pada = Math.floor(degreeInNakshatra / PADA_SPAN) + 1;

  return {
    nakshatra: NAKSHATRAS[nakshatraIndex].name,
    nakshatraIndex,
    nakshatraPada: Math.min(pada, 4),
    nakshatraLord: NAKSHATRAS[nakshatraIndex].lord,
    degreeInNakshatra,
  };
}
