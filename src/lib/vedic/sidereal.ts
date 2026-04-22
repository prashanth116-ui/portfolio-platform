/**
 * Tropical to Sidereal conversion using Lahiri ayanamsa.
 */

import { lahiriAyanamsa } from "./ayanamsa";

/**
 * Convert tropical longitude to sidereal longitude.
 * Sidereal = Tropical - Ayanamsa
 */
export function tropicalToSidereal(
  tropicalLongitude: number,
  jd: number
): number {
  const ayanamsa = lahiriAyanamsa(jd);
  let sidereal = tropicalLongitude - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  return sidereal % 360;
}
