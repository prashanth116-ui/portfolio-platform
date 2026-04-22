/**
 * Cross-validation: re-calculate Sun and Moon positions independently
 * and check they match within tolerance.
 */

import * as Astronomy from "astronomy-engine";
import { lahiriAyanamsa, dateToJulianDate } from "./ayanamsa";
import type { PlanetPosition, ValidationResult } from "./types";

/**
 * Independent Sun longitude calculation for validation.
 */
function independentSunLongitude(utcDate: Date, jd: number): number {
  const sunPos = Astronomy.SunPosition(utcDate);
  let tropical = sunPos.elon;
  if (tropical < 0) tropical += 360;
  const ayanamsa = lahiriAyanamsa(jd);
  let sidereal = tropical - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  return sidereal % 360;
}

/**
 * Independent Moon longitude calculation for validation.
 */
function independentMoonLongitude(utcDate: Date, jd: number): number {
  const moonPos = Astronomy.EclipticGeoMoon(utcDate);
  let tropical = moonPos.lon;
  if (tropical < 0) tropical += 360;
  const ayanamsa = lahiriAyanamsa(jd);
  let sidereal = tropical - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  return sidereal % 360;
}

/**
 * Validate chart by re-computing Sun and Moon positions and comparing.
 * Tolerance: 0.5 degrees (30 arcminutes).
 */
export function validateChart(
  planets: PlanetPosition[],
  utcDate: Date
): ValidationResult {
  const jd = dateToJulianDate(utcDate);
  const tolerance = 0.5; // degrees

  const sun = planets.find((p) => p.planet === "Sun");
  const moon = planets.find((p) => p.planet === "Moon");

  const expectedSun = sun ? sun.siderealLongitude : 0;
  const actualSun = independentSunLongitude(utcDate, jd);

  const expectedMoon = moon ? moon.siderealLongitude : 0;
  const actualMoon = independentMoonLongitude(utcDate, jd);

  // Handle wrap-around
  let sunDiff = Math.abs(expectedSun - actualSun);
  if (sunDiff > 180) sunDiff = 360 - sunDiff;

  let moonDiff = Math.abs(expectedMoon - actualMoon);
  if (moonDiff > 180) moonDiff = 360 - moonDiff;

  return {
    passed: sunDiff <= tolerance && moonDiff <= tolerance,
    sunCheck: { expected: expectedSun, actual: actualSun, diff: sunDiff },
    moonCheck: { expected: expectedMoon, actual: actualMoon, diff: moonDiff },
    tolerance,
  };
}
