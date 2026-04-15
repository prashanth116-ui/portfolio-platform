"use client";

import { Plot, LAYOUT_DEFAULTS } from "./plotly-wrapper";
import type { Trade } from "@/lib/utils";

export function WinRateByEntry({ trades }: { trades: Trade[] }) {
  const typeStats: Record<string, { wins: number; total: number }> = {};
  for (const t of trades) {
    const et = t.entry_type ?? "UNKNOWN";
    if (!typeStats[et]) typeStats[et] = { wins: 0, total: 0 };
    typeStats[et].total++;
    if ((t.total_dollars ?? 0) > 0) typeStats[et].wins++;
  }

  const labels = Object.keys(typeStats);
  const winRates = labels.map(
    (l) => (typeStats[l].wins / typeStats[l].total) * 100
  );
  const counts = labels.map((l) => typeStats[l].total);
  const barColors = winRates.map((wr) =>
    wr >= 70 ? "#00d97e" : wr >= 50 ? "#f6c343" : "#e63757"
  );

  return (
    <Plot
      data={[
        {
          x: labels,
          y: winRates,
          type: "bar",
          marker: { color: barColors },
          text: winRates.map(
            (wr, i) => `${wr.toFixed(0)}% (${counts[i]})`
          ),
          textposition: "auto",
        },
      ]}
      layout={{
        ...LAYOUT_DEFAULTS,
        title: { text: "Win Rate by Entry Type" },
        xaxis: { ...LAYOUT_DEFAULTS.xaxis, title: { text: "Entry Type" } },
        yaxis: {
          ...LAYOUT_DEFAULTS.yaxis,
          title: { text: "Win Rate (%)" },
          range: [0, 100],
        },
        height: 300,
      }}
      config={{ displayModeBar: false, responsive: true }}
      className="w-full"
    />
  );
}
