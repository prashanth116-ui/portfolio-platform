/**
 * Build structured prompt for Claude to generate Vedic astrology report.
 * Sends pre-calculated chart data (not raw ephemeris) to Claude.
 * Returns JSON with 8-9 report sections.
 */

import type { ChartData } from "./vedic/types";

function formatDegree(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.round((deg - d) * 60);
  return `${d}\u00B0${m}'`;
}

function formatPlanetTable(chart: ChartData): string {
  const lines = chart.planets.map((p) => {
    const retro = p.isRetrograde ? " (R)" : "";
    return `- ${p.planet}${retro}: ${p.sign} ${formatDegree(p.degree)} | House ${p.house} | ${p.nakshatra} Pada ${p.nakshatraPada} (Lord: ${p.nakshatraLord})`;
  });
  return lines.join("\n");
}

function formatHouseTable(chart: ChartData): string {
  const lines = chart.houses.map((h) => {
    const planets = h.planets.length > 0 ? h.planets.join(", ") : "Empty";
    return `- House ${h.house} (${h.sign}): ${planets}`;
  });
  return lines.join("\n");
}

function formatDashaInfo(chart: ChartData): string {
  const d = chart.dashas;
  const mahaLines = d.mahaDashas.map((md) => {
    const active = md.isActive ? " **[CURRENT]**" : "";
    const start = md.startDate.toISOString().split("T")[0];
    const end = md.endDate.toISOString().split("T")[0];
    return `- ${md.planet} Dasha (${md.years.toFixed(1)} yrs): ${start} to ${end}${active}`;
  });

  let antarInfo = "";
  if (d.currentMahaDasha && d.currentAntarDasha) {
    const antarStart = d.currentAntarDasha.startDate.toISOString().split("T")[0];
    const antarEnd = d.currentAntarDasha.endDate.toISOString().split("T")[0];
    antarInfo = `\nCurrent Antar Dasha: ${d.currentAntarDasha.planet} (${antarStart} to ${antarEnd})`;
  }

  return `Birth Nakshatra: ${d.birthNakshatra} (Lord: ${d.birthNakshatraLord})
Balance at birth: ${d.balanceAtBirth.toFixed(2)} years of ${d.birthNakshatraLord} dasha

Maha Dashas:
${mahaLines.join("\n")}${antarInfo}`;
}

function formatYogas(chart: ChartData): string {
  const present = chart.yogas.filter((y) => y.isPresent);
  const absent = chart.yogas.filter((y) => !y.isPresent);

  const presentLines = present.map(
    (y) => `- **${y.name}** (PRESENT): ${y.description} [Planets: ${y.planets.join(", ")}]`
  );
  const absentLines = absent.map(
    (y) => `- ${y.name} (not formed): ${y.planets.join(", ")}`
  );

  return `Active Yogas:\n${presentLines.length > 0 ? presentLines.join("\n") : "- None detected"}\n\nChecked but not present:\n${absentLines.join("\n")}`;
}

export function buildAstrologyPrompt(chart: ChartData): string {
  const { input, ascendant } = chart;

  const contextSection = input.context
    ? `\nThe querent has specifically asked about: "${input.context}"\nPlease address this area of life in a dedicated "home_context" section with specific, actionable insights.\n`
    : "";

  return `You are an expert Vedic astrologer (Jyotish practitioner) with 30+ years of experience. Analyze the following birth chart and provide a comprehensive Vedic astrology reading.

## Birth Details
- Name: ${input.name}
- Date: ${input.birthDate}
- Time: ${input.birthTime}
- Place: ${input.birthPlace} (${chart.location.latitude.toFixed(4)}N, ${chart.location.longitude.toFixed(4)}E)
- Timezone: UTC${input.timezoneOffset >= 0 ? "+" : ""}${input.timezoneOffset}
- Ayanamsa (Lahiri): ${chart.ayanamsa.toFixed(4)}°

## Ascendant (Lagna)
${ascendant.sign} ${formatDegree(ascendant.degree)} | ${ascendant.nakshatra} Pada ${ascendant.nakshatraPada}

## Planetary Positions (Sidereal - Lahiri)
${formatPlanetTable(chart)}

## House Placement (Whole Sign)
${formatHouseTable(chart)}

## Vimshottari Dasha
${formatDashaInfo(chart)}

## Yoga Analysis
${formatYogas(chart)}
${contextSection}
## Instructions
Provide your analysis as a JSON object with these sections. Each section should be a string containing rich, detailed HTML content (use <h3>, <p>, <ul>, <li>, <strong>, <em> tags). Be specific to THIS chart — reference actual planet positions, signs, houses, and nakshatras. Avoid generic descriptions.

Return ONLY valid JSON with these keys:
{
  "overview": "2-3 paragraph executive summary of the chart's key themes, strengths, and challenges",
  "planets": "Detailed analysis of each planet's placement, dignity (exalted/debilitated/own sign), and influence",
  "houses": "Analysis of key house placements and what they mean for different life areas",
  "dashas": "Current and upcoming dasha periods with predictions and timing of events",
  "nakshatras": "Analysis of key nakshatra placements (Moon, Ascendant, and significant planets)",
  "yogas": "Detailed explanation of active yogas and their effects on the native's life",
  "predictions": "Specific predictions for the next 2-3 years based on current dasha and transits"${input.context ? ',\n  "home_context": "Detailed analysis specifically addressing: ' + input.context + '"' : ""},
  "remedies": "Recommended remedies: gemstones, mantras, charitable acts, and lifestyle adjustments"
}`;
}
