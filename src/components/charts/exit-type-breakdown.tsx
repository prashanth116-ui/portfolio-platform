"use client";

import { Plot, LAYOUT_DEFAULTS } from "./plotly-wrapper";
import type { Trade } from "@/lib/utils";

export function ExitTypeBreakdown({ trades }: { trades: Trade[] }) {
  const exitCounts: Record<string, number> = {};
  for (const t of trades) {
    for (const e of t.exits ?? []) {
      const etype = e.type ?? "UNKNOWN";
      exitCounts[etype] = (exitCounts[etype] ?? 0) + 1;
    }
  }

  const labels = Object.keys(exitCounts);
  const values = Object.values(exitCounts);

  if (labels.length === 0) return null;

  return (
    <Plot
      data={[
        {
          x: labels,
          y: values,
          type: "bar",
          marker: { color: "#2c7be5" },
        },
      ]}
      layout={{
        ...LAYOUT_DEFAULTS,
        title: { text: "Exit Type Breakdown" },
        xaxis: { ...LAYOUT_DEFAULTS.xaxis, title: { text: "Exit Type" } },
        yaxis: { ...LAYOUT_DEFAULTS.yaxis, title: { text: "Count" } },
        height: 300,
      }}
      config={{ displayModeBar: false, responsive: true }}
      className="w-full"
    />
  );
}
