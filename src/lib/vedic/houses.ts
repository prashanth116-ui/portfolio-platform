/**
 * Whole Sign House System (traditional Vedic).
 * In Whole Sign houses, each house occupies exactly one sign.
 * The sign of the ascendant becomes the 1st house, the next sign is the 2nd house, etc.
 */

import type { PlanetPosition, HouseData } from "./types";
import { ZODIAC_SIGNS } from "./nakshatras";

/**
 * Assign houses using Whole Sign system.
 * @param ascendantSignIndex The zodiac sign index (0-11) of the ascendant
 * @returns Array of 12 houses with their signs
 */
export function calculateHouses(ascendantSignIndex: number): HouseData[] {
  const houses: HouseData[] = [];

  for (let i = 0; i < 12; i++) {
    const signIndex = (ascendantSignIndex + i) % 12;
    houses.push({
      house: i + 1,
      sign: ZODIAC_SIGNS[signIndex],
      signIndex,
      planets: [],
    });
  }

  return houses;
}

/**
 * Assign a planet to its house based on its sidereal sign.
 * In Whole Sign, the house number = (planet sign - ascendant sign) + 1
 */
export function getHouseNumber(
  planetSignIndex: number,
  ascendantSignIndex: number
): number {
  let house = planetSignIndex - ascendantSignIndex;
  if (house < 0) house += 12;
  return house + 1; // 1-indexed
}

/**
 * Populate houses with planets.
 */
export function assignPlanetsToHouses(
  houses: HouseData[],
  planets: PlanetPosition[]
): HouseData[] {
  const populated = houses.map((h) => ({ ...h, planets: [] as string[] }));

  for (const planet of planets) {
    const houseIndex = planet.house - 1;
    if (houseIndex >= 0 && houseIndex < 12) {
      populated[houseIndex].planets.push(planet.planet);
    }
  }

  return populated;
}
