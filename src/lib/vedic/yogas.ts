/**
 * Basic Yoga detection for Vedic astrology.
 * Yogas are special planetary combinations that indicate specific life themes.
 */

import type { PlanetPosition, YogaResult } from "./types";

type PlanetMap = Record<string, PlanetPosition>;

function buildPlanetMap(planets: PlanetPosition[]): PlanetMap {
  const map: PlanetMap = {};
  for (const p of planets) {
    map[p.planet] = p;
  }
  return map;
}

/**
 * Check if two planets are in the same sign or in kendras (1,4,7,10) from each other.
 */
function inKendraFrom(house1: number, house2: number): boolean {
  const diff = Math.abs(house1 - house2) % 12;
  return diff === 0 || diff === 3 || diff === 6 || diff === 9;
}

/**
 * Check if a planet is in a kendra house (1, 4, 7, 10).
 */
function isInKendra(house: number): boolean {
  return house === 1 || house === 4 || house === 7 || house === 10;
}

/**
 * Check if a planet is in a trikona house (1, 5, 9).
 */
function isInTrikona(house: number): boolean {
  return house === 1 || house === 5 || house === 9;
}

/**
 * Detect common yogas in the chart.
 */
export function detectYogas(
  planets: PlanetPosition[],
  ascendantSignIndex: number
): YogaResult[] {
  const pm = buildPlanetMap(planets);
  const results: YogaResult[] = [];

  // 1. Gaja Kesari Yoga: Jupiter in kendra from Moon
  if (pm.Jupiter && pm.Moon) {
    const isPresent = inKendraFrom(pm.Jupiter.house, pm.Moon.house);
    results.push({
      name: "Gaja Kesari Yoga",
      description:
        "Jupiter in a kendra from Moon. Grants wisdom, fame, and prosperity. The native is blessed with good fortune and respected in society.",
      planets: ["Jupiter", "Moon"],
      isPresent,
    });
  }

  // 2. Budha-Aditya Yoga: Mercury conjunct Sun (same house)
  if (pm.Mercury && pm.Sun) {
    const isPresent = pm.Mercury.house === pm.Sun.house;
    results.push({
      name: "Budha-Aditya Yoga",
      description:
        "Mercury conjunct Sun. Grants intelligence, communication skills, and analytical ability. Strong in education and business.",
      planets: ["Mercury", "Sun"],
      isPresent,
    });
  }

  // 3. Chandra-Mangala Yoga: Moon conjunct Mars
  if (pm.Moon && pm.Mars) {
    const isPresent = pm.Moon.house === pm.Mars.house;
    results.push({
      name: "Chandra-Mangala Yoga",
      description:
        "Moon conjunct Mars. Grants wealth through enterprise, courage, and emotional drive. The native is determined and resourceful.",
      planets: ["Moon", "Mars"],
      isPresent,
    });
  }

  // 4. Pancha Mahapurusha Yogas (5 great person yogas)
  // Mars in own sign (Aries/Scorpio) or exalted (Capricorn) in kendra
  if (pm.Mars) {
    const marsSign = pm.Mars.sign;
    const inOwnOrExalted =
      marsSign === "Aries" || marsSign === "Scorpio" || marsSign === "Capricorn";
    const isPresent = inOwnOrExalted && isInKendra(pm.Mars.house);
    results.push({
      name: "Ruchaka Yoga",
      description:
        "Mars in own sign or exalted in a kendra. Grants courage, leadership, physical strength, and military/athletic prowess.",
      planets: ["Mars"],
      isPresent,
    });
  }

  // Jupiter in own sign (Sagittarius/Pisces) or exalted (Cancer) in kendra
  if (pm.Jupiter) {
    const jupSign = pm.Jupiter.sign;
    const inOwnOrExalted =
      jupSign === "Sagittarius" || jupSign === "Pisces" || jupSign === "Cancer";
    const isPresent = inOwnOrExalted && isInKendra(pm.Jupiter.house);
    results.push({
      name: "Hamsa Yoga",
      description:
        "Jupiter in own sign or exalted in a kendra. Grants wisdom, spirituality, respect, and devotion. The native is righteous and charitable.",
      planets: ["Jupiter"],
      isPresent,
    });
  }

  // Saturn in own sign (Capricorn/Aquarius) or exalted (Libra) in kendra
  if (pm.Saturn) {
    const satSign = pm.Saturn.sign;
    const inOwnOrExalted =
      satSign === "Capricorn" || satSign === "Aquarius" || satSign === "Libra";
    const isPresent = inOwnOrExalted && isInKendra(pm.Saturn.house);
    results.push({
      name: "Shasha Yoga",
      description:
        "Saturn in own sign or exalted in a kendra. Grants authority, discipline, and success through hard work. The native is a natural leader.",
      planets: ["Saturn"],
      isPresent,
    });
  }

  // Venus in own sign (Taurus/Libra) or exalted (Pisces) in kendra
  if (pm.Venus) {
    const venSign = pm.Venus.sign;
    const inOwnOrExalted =
      venSign === "Taurus" || venSign === "Libra" || venSign === "Pisces";
    const isPresent = inOwnOrExalted && isInKendra(pm.Venus.house);
    results.push({
      name: "Malavya Yoga",
      description:
        "Venus in own sign or exalted in a kendra. Grants beauty, artistic talent, luxury, and a happy married life.",
      planets: ["Venus"],
      isPresent,
    });
  }

  // Mercury in own sign (Gemini/Virgo) or exalted (Virgo) in kendra
  if (pm.Mercury) {
    const merSign = pm.Mercury.sign;
    const inOwnOrExalted =
      merSign === "Gemini" || merSign === "Virgo";
    const isPresent = inOwnOrExalted && isInKendra(pm.Mercury.house);
    results.push({
      name: "Bhadra Yoga",
      description:
        "Mercury in own sign or exalted in a kendra. Grants eloquence, intellect, business acumen, and skill in communication.",
      planets: ["Mercury"],
      isPresent,
    });
  }

  // 5. Dharma-Karmadhipati Yoga: Lords of 9th and 10th in conjunction or mutual aspect
  // Simplified: planets in both 9th and 10th houses
  const ninthHousePlanets = planets.filter((p) => p.house === 9);
  const tenthHousePlanets = planets.filter((p) => p.house === 10);
  if (ninthHousePlanets.length > 0 && tenthHousePlanets.length > 0) {
    results.push({
      name: "Dharma-Karmadhipati Yoga",
      description:
        "Planets in both 9th (dharma) and 10th (karma) houses. Grants success in career aligned with life purpose, recognition, and fortune through righteous action.",
      planets: [
        ...ninthHousePlanets.map((p) => p.planet),
        ...tenthHousePlanets.map((p) => p.planet),
      ],
      isPresent: true,
    });
  }

  // 6. Raja Yoga: Kendra lord + Trikona lord conjunction
  const kendraPlanets = planets.filter((p) => isInKendra(p.house));
  const trikonaPlanets = planets.filter((p) => isInTrikona(p.house));
  const kendraNames = new Set(kendraPlanets.map((p) => p.planet));
  const trikonaNames = new Set(trikonaPlanets.map((p) => p.planet));
  // Planets in both kendra and trikona form Raja Yoga
  const rajaPlanets = planets.filter(
    (p) => kendraNames.has(p.planet) && trikonaNames.has(p.planet) && p.house === 1
  );
  // Also check for conjunction of kendra and trikona planets in same house
  const houseGroups: Record<number, string[]> = {};
  for (const p of planets) {
    if (!houseGroups[p.house]) houseGroups[p.house] = [];
    houseGroups[p.house].push(p.planet);
  }
  let rajaYogaPresent = false;
  for (const [, group] of Object.entries(houseGroups)) {
    if (group.length >= 2) {
      const hasKendra = group.some((name) =>
        kendraPlanets.some((p) => p.planet === name)
      );
      const hasTrikona = group.some((name) =>
        trikonaPlanets.some((p) => p.planet === name)
      );
      if (hasKendra && hasTrikona) {
        rajaYogaPresent = true;
        break;
      }
    }
  }

  if (kendraPlanets.length > 0 && trikonaPlanets.length > 0) {
    results.push({
      name: "Raja Yoga",
      description:
        "Kendra and trikona planets in conjunction. Grants power, authority, and rise in status. The native achieves prominence in their field.",
      planets: [
        ...new Set([
          ...kendraPlanets.map((p) => p.planet),
          ...trikonaPlanets.map((p) => p.planet),
        ]),
      ],
      isPresent: rajaYogaPresent,
    });
  }

  return results;
}
