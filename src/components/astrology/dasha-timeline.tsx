"use client";

import type { DashaResult } from "@/lib/vedic/types";

interface DashaTimelineProps {
  dashas: DashaResult;
}

const PLANET_COLORS: Record<string, string> = {
  Ketu: "#8b5cf6",
  Venus: "#ec4899",
  Sun: "#f59e0b",
  Moon: "#e5e7eb",
  Mars: "#ef4444",
  Rahu: "#a855f7",
  Jupiter: "#eab308",
  Saturn: "#6366f1",
  Mercury: "#22c55e",
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function DashaTimeline({ dashas }: DashaTimelineProps) {
  const totalYears = dashas.mahaDashas.reduce((sum, d) => sum + d.years, 0);

  return (
    <div className="space-y-4">
      {/* Birth Nakshatra Info */}
      <div className="rounded-md border border-[#2a2a2a] bg-[#0f0f0f] p-3">
        <p className="text-sm text-[#a0a0a0]">
          <span className="font-medium text-white">Birth Nakshatra:</span>{" "}
          {dashas.birthNakshatra} (Lord: {dashas.birthNakshatraLord})
        </p>
        <p className="mt-1 text-sm text-[#a0a0a0]">
          <span className="font-medium text-white">Balance at Birth:</span>{" "}
          {dashas.balanceAtBirth.toFixed(1)} years of{" "}
          {dashas.birthNakshatraLord} Dasha
        </p>
      </div>

      {/* Current Period */}
      {dashas.currentMahaDasha && (
        <div className="rounded-md border border-[#185FA5]/30 bg-[#185FA5]/10 p-3">
          <p className="text-sm font-medium text-[#5ba3e6]">
            Current Maha Dasha: {dashas.currentMahaDasha.planet}
          </p>
          <p className="mt-1 text-xs text-[#a0a0a0]">
            {formatDate(dashas.currentMahaDasha.startDate)} &mdash;{" "}
            {formatDate(dashas.currentMahaDasha.endDate)}
          </p>
          {dashas.currentAntarDasha && (
            <p className="mt-1 text-xs text-[#a0a0a0]">
              Antar Dasha: {dashas.currentAntarDasha.planet} (
              {formatDate(dashas.currentAntarDasha.startDate)} &mdash;{" "}
              {formatDate(dashas.currentAntarDasha.endDate)})
            </p>
          )}
        </div>
      )}

      {/* Horizontal Timeline */}
      <div className="space-y-1">
        <div className="flex h-10 overflow-hidden rounded-md">
          {dashas.mahaDashas.map((dasha) => {
            const widthPct = (dasha.years / totalYears) * 100;
            const color = PLANET_COLORS[dasha.planet] || "#666";

            return (
              <div
                key={`${dasha.planet}-${dasha.startDate}`}
                className="relative flex items-center justify-center overflow-hidden text-xs font-medium transition-opacity hover:opacity-80"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: dasha.isActive ? color : `${color}33`,
                  color: dasha.isActive ? "#fff" : color,
                  borderRight: "1px solid #0f0f0f",
                }}
                title={`${dasha.planet}: ${formatDate(dasha.startDate)} - ${formatDate(dasha.endDate)} (${dasha.years.toFixed(1)} yrs)`}
              >
                {widthPct > 6 && (
                  <span className="truncate px-1">{dasha.planet.slice(0, 3)}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dasha List */}
      <div className="space-y-1">
        {dashas.mahaDashas.map((dasha) => (
          <div
            key={`${dasha.planet}-${dasha.startDate}`}
            className={`flex items-center justify-between rounded px-3 py-1.5 text-sm ${
              dasha.isActive
                ? "border border-[#185FA5]/30 bg-[#185FA5]/10 text-white"
                : "text-[#a0a0a0]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: PLANET_COLORS[dasha.planet] || "#666",
                }}
              />
              <span className={dasha.isActive ? "font-medium" : ""}>
                {dasha.planet}
              </span>
              {dasha.isActive && (
                <span className="rounded bg-[#185FA5]/20 px-1.5 py-0.5 text-xs text-[#5ba3e6]">
                  Active
                </span>
              )}
            </div>
            <div className="text-xs">
              {formatDate(dasha.startDate)} &mdash;{" "}
              {formatDate(dasha.endDate)}{" "}
              <span className="text-[#666]">
                ({dasha.years.toFixed(1)}y)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
