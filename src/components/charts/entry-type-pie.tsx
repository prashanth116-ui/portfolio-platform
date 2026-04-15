"use client";

import { Plot, LAYOUT_DEFAULTS } from "./plotly-wrapper";
import type { Trade } from "@/lib/utils";

export function EntryTypePie({ trades }: { trades: Trade[] }) {
  const counts: Record<string, number> = {};
  for (const t of trades) {
    const et = t.entry_type ?? "UNKNOWN";
    counts[et] = (counts[et] ?? 0) + 1;
  }

  const labels = Object.keys(counts);
  const values = Object.values(counts);
  const pieColors = ["#2c7be5", "#00d97e", "#f6c343", "#e63757", "#6e84a3"];

  return (
    <Plot
      data={[
        {
          labels,
          values,
          type: "pie",
          marker: { colors: pieColors.slice(0, labels.length) },
          hole: 0.4,
          textinfo: "label+percent",
          textfont: { size: 12 },
        },
      ]}
      layout={{
        ...LAYOUT_DEFAULTS,
        title: { text: "Entry Type Breakdown" },
        showlegend: false,
        height: 300,
      }}
      config={{ displayModeBar: false, responsive: true }}
      className="w-full"
    />
  );
}
