/**
 * Geocoding via Nominatim (OpenStreetMap).
 * Free, no API key required. Respects usage policy with proper User-Agent.
 */

import type { GeoLocation } from "./types";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

/**
 * Geocode a place name to lat/lon coordinates.
 * @param place Place name (e.g., "Mumbai, India" or "New York, NY")
 * @returns GeoLocation with latitude, longitude, and display name
 * @throws Error if place not found or geocoding fails
 */
export async function geocodePlace(place: string): Promise<GeoLocation> {
  const params = new URLSearchParams({
    q: place,
    format: "json",
    limit: "1",
  });

  const response = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: {
      "User-Agent": "VedicAstrologyApp/1.0 (portfolio-platform)",
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.statusText}`);
  }

  const results = await response.json();

  if (!results || results.length === 0) {
    throw new Error(`Could not find location: "${place}". Please try a more specific place name.`);
  }

  const result = results[0];
  return {
    latitude: parseFloat(result.lat),
    longitude: parseFloat(result.lon),
    displayName: result.display_name,
  };
}
