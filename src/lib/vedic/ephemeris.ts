/**
 * Wrapper around astronomy-engine for tropical planetary positions.
 * Calculates positions for the 7 traditional Vedic planets (grahas):
 * Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
 */

import * as Astronomy from "astronomy-engine";

export interface TropicalPosition {
  planet: string;
  longitude: number; // 0-360 ecliptic longitude
  isRetrograde: boolean;
}

const PLANET_MAP: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mars: Astronomy.Body.Mars,
  Mercury: Astronomy.Body.Mercury,
  Jupiter: Astronomy.Body.Jupiter,
  Venus: Astronomy.Body.Venus,
  Saturn: Astronomy.Body.Saturn,
};

/**
 * Get the ecliptic longitude of a planet at a given time.
 */
function getPlanetLongitude(body: Astronomy.Body, date: Date): number {
  if (body === Astronomy.Body.Sun) {
    const sunPos = Astronomy.SunPosition(date);
    let lon = sunPos.elon;
    if (lon < 0) lon += 360;
    return lon % 360;
  }

  if (body === Astronomy.Body.Moon) {
    const moonPos = Astronomy.EclipticGeoMoon(date);
    let lon = moonPos.lon;
    if (lon < 0) lon += 360;
    return lon % 360;
  }

  // For other planets, use geocentric ecliptic coordinates
  const equ = Astronomy.Equator(body, date, null!, true, true);
  const ecl = Astronomy.Ecliptic(equ.vec);
  let lon = ecl.elon;
  if (lon < 0) lon += 360;
  return lon % 360;
}

/**
 * Detect if a planet is retrograde by comparing positions 1 day apart.
 */
function isRetrograde(body: Astronomy.Body, date: Date): boolean {
  // Sun and Moon are never retrograde
  if (body === Astronomy.Body.Sun || body === Astronomy.Body.Moon) {
    return false;
  }

  const dayBefore = new Date(date.getTime() - 86400000);
  const dayAfter = new Date(date.getTime() + 86400000);

  const lonBefore = getPlanetLongitude(body, dayBefore);
  const lonAfter = getPlanetLongitude(body, dayAfter);

  // Handle wrap-around at 0/360 boundary
  let diff = lonAfter - lonBefore;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  return diff < 0;
}

/**
 * Calculate tropical positions for all 7 traditional planets.
 */
export function calculateTropicalPositions(utcDate: Date): TropicalPosition[] {
  const positions: TropicalPosition[] = [];

  for (const [name, body] of Object.entries(PLANET_MAP)) {
    const longitude = getPlanetLongitude(body, utcDate);
    const retrograde = isRetrograde(body, utcDate);

    positions.push({
      planet: name,
      longitude,
      isRetrograde: retrograde,
    });
  }

  return positions;
}
