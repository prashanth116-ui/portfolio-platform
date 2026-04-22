"use client";

import type { ChartData } from "@/lib/vedic/types";

/**
 * North Indian Diamond Chart (Kundli).
 * Standard diamond layout with 12 houses arranged in the traditional pattern.
 *
 * Layout:
 *        12  |  1   |  2
 *     -------|------|-------
 *       11   |      |  3
 *     -------|  ASC |-------
 *       10   |      |  4
 *     -------|------|-------
 *         9  |  7   |  5
 *            |  8   |  6
 */

interface ChartWheelProps {
  chart: ChartData;
}

const SIGN_ABBREVS: Record<string, string> = {
  Aries: "Ar",
  Taurus: "Ta",
  Gemini: "Ge",
  Cancer: "Ca",
  Leo: "Le",
  Virgo: "Vi",
  Libra: "Li",
  Scorpio: "Sc",
  Sagittarius: "Sg",
  Capricorn: "Cp",
  Aquarius: "Aq",
  Pisces: "Pi",
};

const PLANET_ABBREVS: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

// North Indian chart house positions (x, y coordinates for text placement)
// Center of chart is 200,200 in a 400x400 viewbox
const HOUSE_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: 200, y: 80 },
  2: { x: 310, y: 80 },
  3: { x: 350, y: 160 },
  4: { x: 350, y: 240 },
  5: { x: 310, y: 320 },
  6: { x: 200, y: 350 },
  7: { x: 200, y: 320 },
  8: { x: 90, y: 320 },
  9: { x: 50, y: 240 },
  10: { x: 50, y: 160 },
  11: { x: 90, y: 80 },
  12: { x: 200, y: 50 },
};

export default function ChartWheel({ chart }: ChartWheelProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <svg viewBox="0 0 400 400" className="w-full">
        {/* Background */}
        <rect width="400" height="400" fill="#0f0f0f" rx="8" />

        {/* Outer diamond */}
        <polygon
          points="200,10 390,200 200,390 10,200"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />

        {/* Inner diamond (center) */}
        <polygon
          points="200,100 300,200 200,300 100,200"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />

        {/* Diagonal lines creating 12 triangular houses */}
        {/* Top-left to bottom-right through inner diamond */}
        <line x1="10" y1="200" x2="200" y2="10" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="200" y1="10" x2="390" y2="200" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="390" y1="200" x2="200" y2="390" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="200" y1="390" x2="10" y2="200" stroke="#2a2a2a" strokeWidth="1" />

        {/* Cross lines */}
        <line x1="200" y1="10" x2="200" y2="100" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="200" y1="300" x2="200" y2="390" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="10" y1="200" x2="100" y2="200" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="300" y1="200" x2="390" y2="200" stroke="#2a2a2a" strokeWidth="1" />

        {/* Center label - Ascendant */}
        <text
          x="200"
          y="190"
          textAnchor="middle"
          fill="#5ba3e6"
          fontSize="12"
          fontWeight="bold"
        >
          {chart.ascendant.sign}
        </text>
        <text
          x="200"
          y="206"
          textAnchor="middle"
          fill="#a0a0a0"
          fontSize="10"
        >
          Lagna
        </text>
        <text
          x="200"
          y="220"
          textAnchor="middle"
          fill="#666"
          fontSize="9"
        >
          {Math.floor(chart.ascendant.degree)}&deg;
          {Math.round((chart.ascendant.degree % 1) * 60)}&apos;
        </text>

        {/* House numbers and signs */}
        {chart.houses.map((house) => {
          const pos = HOUSE_POSITIONS[house.house];
          if (!pos) return null;
          const signAbbr = SIGN_ABBREVS[house.sign] || house.sign.slice(0, 2);

          return (
            <g key={house.house}>
              {/* House number */}
              <text
                x={pos.x}
                y={pos.y - 14}
                textAnchor="middle"
                fill="#666"
                fontSize="9"
              >
                {house.house}
              </text>
              {/* Sign abbreviation */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fill="#a0a0a0"
                fontSize="10"
                fontWeight="500"
              >
                {signAbbr}
              </text>
              {/* Planets in this house */}
              {house.planets.map((planet, i) => {
                const planetData = chart.planets.find((p) => p.planet === planet);
                const abbr = PLANET_ABBREVS[planet] || planet.slice(0, 2);
                const retroLabel = planetData?.isRetrograde ? "R" : "";
                return (
                  <text
                    key={planet}
                    x={pos.x}
                    y={pos.y + 14 + i * 13}
                    textAnchor="middle"
                    fill={
                      planet === "Sun"
                        ? "#f59e0b"
                        : planet === "Moon"
                          ? "#e5e7eb"
                          : planet === "Mars"
                            ? "#ef4444"
                            : planet === "Mercury"
                              ? "#22c55e"
                              : planet === "Jupiter"
                                ? "#eab308"
                                : planet === "Venus"
                                  ? "#ec4899"
                                  : planet === "Saturn"
                                    ? "#6366f1"
                                    : planet === "Rahu"
                                      ? "#8b5cf6"
                                      : "#8b5cf6"
                    }
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {abbr}
                    {retroLabel && (
                      <tspan fontSize="8" fill="#ef4444">
                        {" "}
                        R
                      </tspan>
                    )}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
