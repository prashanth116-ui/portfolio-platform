/**
 * Orchestrator: calculateFullChart()
 * Combines all Vedic calculation modules into a single chart.
 */

import type { BirthInput, ChartData, PlanetPosition, GeoLocation } from "./types";
import { calculateTropicalPositions } from "./ephemeris";
import { getRahuLongitude, getKetuLongitude } from "./lunar-nodes";
import { lahiriAyanamsa, dateToJulianDate } from "./ayanamsa";
import { tropicalToSidereal } from "./sidereal";
import { getSign, getNakshatra } from "./nakshatras";
import { getAscendantLongitude } from "./ascendant";
import { calculateHouses, getHouseNumber, assignPlanetsToHouses } from "./houses";
import { calculateDashas } from "./dashas";
import { detectYogas } from "./yogas";
import { validateChart } from "./validation";

/**
 * Convert birth input to UTC Date.
 */
function birthToUTC(input: BirthInput): Date {
  const [year, month, day] = input.birthDate.split("-").map(Number);
  const [hours, minutes] = input.birthTime.split(":").map(Number);

  // Create local time then adjust for timezone to get UTC
  const localMs = Date.UTC(year, month - 1, day, hours, minutes, 0, 0);
  const utcMs = localMs - input.timezoneOffset * 3600000;

  return new Date(utcMs);
}

/**
 * Build a PlanetPosition from tropical longitude.
 */
function buildPlanetPosition(
  planet: string,
  tropicalLon: number,
  jd: number,
  ascendantSignIndex: number,
  isRetrograde: boolean
): PlanetPosition {
  const siderealLon = tropicalToSidereal(tropicalLon, jd);
  const signData = getSign(siderealLon);
  const nakData = getNakshatra(siderealLon);
  const house = getHouseNumber(signData.signIndex, ascendantSignIndex);

  return {
    planet,
    tropicalLongitude: tropicalLon,
    siderealLongitude: siderealLon,
    sign: signData.sign,
    signIndex: signData.signIndex,
    degree: signData.degree,
    house,
    nakshatra: nakData.nakshatra,
    nakshatraPada: nakData.nakshatraPada,
    nakshatraLord: nakData.nakshatraLord,
    isRetrograde,
  };
}

/**
 * Calculate the full Vedic birth chart.
 */
export function calculateFullChart(
  input: BirthInput,
  location: GeoLocation
): ChartData {
  const utcDate = birthToUTC(input);
  const jd = dateToJulianDate(utcDate);
  const ayanamsa = lahiriAyanamsa(jd);

  // 1. Ascendant
  const ascResult = getAscendantLongitude(
    utcDate,
    location.latitude,
    location.longitude
  );
  const ascSidereal = tropicalToSidereal(ascResult.tropicalLongitude, jd);
  const ascSign = getSign(ascSidereal);
  const ascNak = getNakshatra(ascSidereal);

  // 2. Planetary positions (7 traditional planets)
  const tropicalPositions = calculateTropicalPositions(utcDate);

  // 3. Lunar nodes (Rahu/Ketu)
  const rahuTropical = getRahuLongitude(jd);
  const ketuTropical = getKetuLongitude(jd);

  // 4. Build all planet positions with sidereal conversion
  const planets: PlanetPosition[] = [];

  for (const tp of tropicalPositions) {
    planets.push(
      buildPlanetPosition(
        tp.planet,
        tp.longitude,
        jd,
        ascSign.signIndex,
        tp.isRetrograde
      )
    );
  }

  // Add Rahu and Ketu (always retrograde in Vedic astrology)
  planets.push(
    buildPlanetPosition("Rahu", rahuTropical, jd, ascSign.signIndex, true)
  );
  planets.push(
    buildPlanetPosition("Ketu", ketuTropical, jd, ascSign.signIndex, true)
  );

  // 5. Houses (Whole Sign)
  const houses = calculateHouses(ascSign.signIndex);
  const populatedHouses = assignPlanetsToHouses(houses, planets);

  // 6. Dashas (from Moon's sidereal position)
  const moon = planets.find((p) => p.planet === "Moon")!;
  const birthDate = new Date(
    parseInt(input.birthDate.split("-")[0]),
    parseInt(input.birthDate.split("-")[1]) - 1,
    parseInt(input.birthDate.split("-")[2])
  );
  const dashas = calculateDashas(moon.siderealLongitude, birthDate);

  // 7. Yogas
  const yogas = detectYogas(planets, ascSign.signIndex);

  // 8. Validation
  const validation = validateChart(planets, utcDate);

  return {
    input,
    location,
    ayanamsa,
    julianDate: jd,
    localSiderealTime: ascResult.lst,
    planets,
    houses: populatedHouses,
    ascendant: {
      siderealLongitude: ascSidereal,
      sign: ascSign.sign,
      signIndex: ascSign.signIndex,
      degree: ascSign.degree,
      nakshatra: ascNak.nakshatra,
      nakshatraPada: ascNak.nakshatraPada,
    },
    dashas,
    yogas,
    validation,
  };
}

export { geocodePlace } from "./geocoding";
export type * from "./types";
