"use client";

import { Plot, LAYOUT_DEFAULTS } from "./plotly-wrapper";
import type { Trade } from "@/lib/utils";

export function TradeDistribution({
  trades,
  showDollars,
  avgRisk,
}: {
  trades: Trade[];
  showDollars: boolean;
  avgRisk: number;
}) {
  const pnls = trades.map((t) =>
    showDollars ? t.total_dollars : t.total_dollars / avgRisk
  );

  const label = showDollars ? "Trade P/L ($)" : "Trade P/L (R)";

  return (
    <Plot
      data={[
        {
          x: pnls,
          type: "histogram",
          marker: { color: "#2c7be5", opacity: 0.8 },
        } as Partial<Plotly.PlotData>,
      ]}
      layout={{
        ...LAYOUT_DEFAULTS,
        title: { text: "Trade P/L Distribution" },
        xaxis: { ...LAYOUT_DEFAULTS.xaxis, title: { text: label } },
        yaxis: { ...LAYOUT_DEFAULTS.yaxis, title: { text: "Count" } },
        height: 300,
      }}
      config={{ displayModeBar: false, responsive: true }}
      className="w-full"
    />
  );
}
