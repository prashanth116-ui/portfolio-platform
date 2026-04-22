/**
 * Lahiri (Chitrapaksha) Ayanamsa calculation.
 * The ayanamsa is the angular difference between tropical and sidereal zodiacs.
 * Lahiri is the standard used by the Indian government and most Vedic astrologers.
 */

/**
 * Calculate Julian Date from a UTC Date object.
 */
export function dateToJulianDate(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d =
    date.getUTCDate() +
    date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400;

  let yr = y;
  let mo = m;
  if (mo <= 2) {
    yr -= 1;
    mo += 12;
  }

  const A = Math.floor(yr / 100);
  const B = 2 - A + Math.floor(A / 4);

  return (
    Math.floor(365.25 * (yr + 4716)) +
    Math.floor(30.6001 * (mo + 1)) +
    d +
    B -
    1524.5
  );
}

/**
 * Calculate Lahiri Ayanamsa for a given Julian Date.
 * Based on the Chitrapaksha standard: the star Chitra (Spica) is fixed at 0 Libra sidereal.
 * Reference epoch: J2000.0 (JD 2451545.0), ayanamsa = 23.853 degrees.
 * Precession rate: ~50.29 arcseconds per year.
 */
export function lahiriAyanamsa(jd: number): number {
  // Centuries from J2000.0
  const T = (jd - 2451545.0) / 36525.0;

  // Lahiri ayanamsa at J2000.0 epoch
  const ayanamsaJ2000 = 23.853;

  // Precession rate in degrees per century (~50.29"/yr)
  const precessionRate = 50.29 / 3600; // convert arcsec to degrees

  // Linear approximation (accurate to ~1 arcminute for modern dates)
  const ayanamsa = ayanamsaJ2000 + precessionRate * T * 100;

  return ayanamsa;
}
