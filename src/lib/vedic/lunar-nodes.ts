/**
 * Mean Lunar Node (Rahu/Ketu) calculation using Meeus formula.
 * Rahu = Mean North Node (ascending), Ketu = exactly opposite (descending).
 * astronomy-engine doesn't provide lunar nodes directly, so we use
 * the standard Meeus algorithm for the mean node.
 */

/**
 * Calculate the mean longitude of the ascending lunar node (Rahu).
 * Based on Jean Meeus, "Astronomical Algorithms" Chapter 47.
 * @param jd Julian Date
 * @returns longitude in degrees (0-360)
 */
export function meanLunarNode(jd: number): number {
  // Centuries from J2000.0
  const T = (jd - 2451545.0) / 36525.0;

  // Mean longitude of ascending node (Meeus, Chapter 47)
  let omega =
    125.0445479 -
    1934.1362891 * T +
    0.0020754 * T * T +
    (T * T * T) / 467441.0 -
    (T * T * T * T) / 60616000.0;

  // Normalize to 0-360
  omega = ((omega % 360) + 360) % 360;

  return omega;
}

/**
 * Calculate Rahu (North Node) longitude.
 */
export function getRahuLongitude(jd: number): number {
  return meanLunarNode(jd);
}

/**
 * Calculate Ketu (South Node) longitude - always 180 degrees from Rahu.
 */
export function getKetuLongitude(jd: number): number {
  return (meanLunarNode(jd) + 180) % 360;
}
