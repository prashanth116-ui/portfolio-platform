/**
 * Vimshottari Dasha calculation.
 * The Vimshottari Dasha is a 120-year planetary period system based on the Moon's nakshatra at birth.
 * Each nakshatra lord rules a specific number of years.
 */

import type { DashaPeriod, DashaResult } from "./types";
import { getNakshatra, NAKSHATRAS } from "./nakshatras";

// Vimshottari Dasha sequence and year allocations
const DASHA_SEQUENCE = [
  { planet: "Ketu", years: 7 },
  { planet: "Venus", years: 20 },
  { planet: "Sun", years: 6 },
  { planet: "Moon", years: 10 },
  { planet: "Mars", years: 7 },
  { planet: "Rahu", years: 18 },
  { planet: "Jupiter", years: 16 },
  { planet: "Saturn", years: 19 },
  { planet: "Mercury", years: 17 },
] as const;

const TOTAL_DASHA_YEARS = 120;
const NAKSHATRA_SPAN = 360 / 27; // 13.3333... degrees

/**
 * Find the starting index in DASHA_SEQUENCE for a given nakshatra lord.
 */
function getDashaStartIndex(nakshatraLord: string): number {
  return DASHA_SEQUENCE.findIndex((d) => d.planet === nakshatraLord);
}

/**
 * Calculate the balance of the first dasha at birth.
 * The amount consumed depends on how far the Moon has traveled through its nakshatra.
 */
function calculateBirthBalance(
  moonDegreeInNakshatra: number,
  dashaYears: number
): number {
  const fractionRemaining = 1 - moonDegreeInNakshatra / NAKSHATRA_SPAN;
  return fractionRemaining * dashaYears;
}

/**
 * Calculate antar dashas (sub-periods) for a maha dasha.
 */
function calculateAntarDashas(
  mahaDasha: DashaPeriod,
  now: Date
): DashaPeriod[] {
  const antarDashas: DashaPeriod[] = [];
  const startIndex = DASHA_SEQUENCE.findIndex(
    (d) => d.planet === mahaDasha.planet
  );
  const totalMahaMs =
    mahaDasha.endDate.getTime() - mahaDasha.startDate.getTime();

  let currentStart = mahaDasha.startDate.getTime();

  for (let i = 0; i < 9; i++) {
    const idx = (startIndex + i) % 9;
    const antarPlanet = DASHA_SEQUENCE[idx];
    // Antar dasha duration is proportional to its years / total dasha years
    const fractionOfMaha = antarPlanet.years / TOTAL_DASHA_YEARS;
    const antarMs = totalMahaMs * fractionOfMaha;
    const antarEnd = currentStart + antarMs;

    const startDate = new Date(currentStart);
    const endDate = new Date(antarEnd);
    const isActive =
      now.getTime() >= startDate.getTime() &&
      now.getTime() < endDate.getTime();

    antarDashas.push({
      planet: antarPlanet.planet,
      startDate,
      endDate,
      years: antarMs / (365.25 * 24 * 3600000),
      isActive,
    });

    currentStart = antarEnd;
  }

  return antarDashas;
}

/**
 * Calculate the full Vimshottari Dasha system from Moon's sidereal longitude.
 */
export function calculateDashas(
  moonSiderealLongitude: number,
  birthDate: Date,
  now: Date = new Date()
): DashaResult {
  const moonNak = getNakshatra(moonSiderealLongitude);
  const startIndex = getDashaStartIndex(moonNak.nakshatraLord);
  const birthBalance = calculateBirthBalance(
    moonNak.degreeInNakshatra,
    DASHA_SEQUENCE[startIndex].years
  );

  const mahaDashas: DashaPeriod[] = [];
  let currentStart = birthDate.getTime();
  let currentMahaDasha: DashaPeriod | null = null;
  let currentAntarDasha: DashaPeriod | null = null;

  for (let i = 0; i < 9; i++) {
    const idx = (startIndex + i) % 9;
    const dasha = DASHA_SEQUENCE[idx];

    // First dasha uses birth balance, rest use full years
    const years = i === 0 ? birthBalance : dasha.years;
    const ms = years * 365.25 * 24 * 3600000;
    const endTime = currentStart + ms;

    const startDate = new Date(currentStart);
    const endDate = new Date(endTime);
    const isActive =
      now.getTime() >= startDate.getTime() &&
      now.getTime() < endDate.getTime();

    const period: DashaPeriod = {
      planet: dasha.planet,
      startDate,
      endDate,
      years,
      isActive,
    };

    // Calculate sub-periods for active or near-active dashas
    period.subPeriods = calculateAntarDashas(period, now);

    if (isActive) {
      currentMahaDasha = period;
      currentAntarDasha =
        period.subPeriods.find((sp) => sp.isActive) || null;
    }

    mahaDashas.push(period);
    currentStart = endTime;
  }

  return {
    birthNakshatra: moonNak.nakshatra,
    birthNakshatraLord: moonNak.nakshatraLord,
    moonDegreeInNakshatra: moonNak.degreeInNakshatra,
    balanceAtBirth: birthBalance,
    mahaDashas,
    currentMahaDasha,
    currentAntarDasha,
  };
}
