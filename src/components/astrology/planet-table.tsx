"use client";

import type { PlanetPosition } from "@/lib/vedic/types";

interface PlanetTableProps {
  planets: PlanetPosition[];
}

function formatDegree(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.round((deg - d) * 60);
  return `${d}\u00B0${m}'`;
}

const PLANET_COLORS: Record<string, string> = {
  Sun: "text-amber-400",
  Moon: "text-gray-200",
  Mars: "text-red-400",
  Mercury: "text-green-400",
  Jupiter: "text-yellow-400",
  Venus: "text-pink-400",
  Saturn: "text-indigo-400",
  Rahu: "text-violet-400",
  Ketu: "text-violet-400",
};

export default function PlanetTable({ planets }: PlanetTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a2a] text-left text-[#a0a0a0]">
            <th className="px-3 py-2 font-medium">Planet</th>
            <th className="px-3 py-2 font-medium">Sign</th>
            <th className="px-3 py-2 font-medium">Degree</th>
            <th className="px-3 py-2 font-medium">House</th>
            <th className="px-3 py-2 font-medium">Nakshatra</th>
            <th className="px-3 py-2 font-medium">Pada</th>
            <th className="px-3 py-2 font-medium">Lord</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr
              key={planet.planet}
              className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]"
            >
              <td className="px-3 py-2">
                <span className={PLANET_COLORS[planet.planet] || "text-white"}>
                  {planet.planet}
                  {planet.isRetrograde && (
                    <span className="ml-1 text-xs text-red-400">(R)</span>
                  )}
                </span>
              </td>
              <td className="px-3 py-2 text-[#e6e6e6]">{planet.sign}</td>
              <td className="px-3 py-2 font-mono text-[#e6e6e6]">
                {formatDegree(planet.degree)}
              </td>
              <td className="px-3 py-2 text-center text-[#e6e6e6]">
                {planet.house}
              </td>
              <td className="px-3 py-2 text-[#e6e6e6]">{planet.nakshatra}</td>
              <td className="px-3 py-2 text-center text-[#e6e6e6]">
                {planet.nakshatraPada}
              </td>
              <td className="px-3 py-2 text-[#a0a0a0]">
                {planet.nakshatraLord}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
