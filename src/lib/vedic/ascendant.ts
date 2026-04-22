/**
 * Ascendant (Lagna) calculation.
 * The ascendant is the zodiac sign rising on the eastern horizon at the time of birth.
 * Calculated from Local Sidereal Time (LST), obliquity of the ecliptic, and geographic latitude.
 */

import { dateToJulianDate } from "./ayanamsa";

/**
 * Calculate Greenwich Mean Sidereal Time (GMST) from Julian Date.
 * Based on Meeus, "Astronomical Algorithms".
 */
export function calculateGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;

  // GMST in degrees
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;

  gmst = ((gmst % 360) + 360) % 360;
  return gmst;
}

/**
 * Calculate Local Sidereal Time from GMST and longitude.
 * @param gmst Greenwich Mean Sidereal Time in degrees
 * @param longitude Geographic longitude in degrees (east positive)
 */
export function calculateLST(gmst: number, longitude: number): number {
  let lst = gmst + longitude;
  lst = ((lst % 360) + 360) % 360;
  return lst;
}

/**
 * Calculate the mean obliquity of the ecliptic.
 * @param jd Julian Date
 * @returns obliquity in degrees
 */
function meanObliquity(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  // IAU formula
  const eps =
    23.439291111 -
    0.0130042 * T -
    1.64e-7 * T * T +
    5.036e-7 * T * T * T;
  return eps;
}

/**
 * Calculate the tropical ascendant longitude.
 * Uses the standard formula: tan(ASC) = -cos(LST) / (sin(eps) * tan(lat) + cos(eps) * sin(LST))
 * @param lst Local Sidereal Time in degrees
 * @param latitude Geographic latitude in degrees
 * @param jd Julian Date (for obliquity calculation)
 * @returns tropical ascendant longitude in degrees (0-360)
 */
export function calculateAscendant(
  lst: number,
  latitude: number,
  jd: number
): number {
  const eps = meanObliquity(jd);

  const lstRad = (lst * Math.PI) / 180;
  const latRad = (latitude * Math.PI) / 180;
  const epsRad = (eps * Math.PI) / 180;

  const y = -Math.cos(lstRad);
  const x =
    Math.sin(epsRad) * Math.tan(latRad) +
    Math.cos(epsRad) * Math.sin(lstRad);

  let ascRad = Math.atan2(y, x);
  let ascDeg = (ascRad * 180) / Math.PI;

  // Normalize to 0-360
  ascDeg = ((ascDeg % 360) + 360) % 360;

  return ascDeg;
}

/**
 * Full ascendant calculation from birth data.
 */
export function getAscendantLongitude(
  utcDate: Date,
  latitude: number,
  longitude: number
): { tropicalLongitude: number; lst: number; jd: number } {
  const jd = dateToJulianDate(utcDate);
  const gmst = calculateGMST(jd);
  const lst = calculateLST(gmst, longitude);
  const tropicalLongitude = calculateAscendant(lst, latitude, jd);

  return { tropicalLongitude, lst, jd };
}
