"use client";

import { Plot, LAYOUT_DEFAULTS } from "./plotly-wrapper";
import type { DailyData } from "@/lib/utils";

export function DailyPnlBars({
  data,
  showDollars,
  avgRisk,
}: {
  data: DailyData[];
  showDollars: boolean;
  avgRisk: number;
}) {
  const dates = data.map((d) => d.date);
  const pnls = data.map((d) =>
    showDollars ? d.summary.total_pnl : d.summary.total_pnl / avgRisk
  );
  const colors = pnls.map((p) => (p >= 0 ? "#00d97e" : "#e63757"));

  const label = showDollars ? "Daily P/L ($)" : "Daily P/L (R)";

  return (
    <Plot
      data={[
        {
          x: dates,
          y: pnls,
          type: "bar",
          marker: { color: colors },
          name: "Daily P/L",
        },
      ]}
      layout={{
        ...LAYOUT_DEFAULTS,
        title: { text: label },
        yaxis: { ...LAYOUT_DEFAULTS.yaxis, title: { text: label } },
        xaxis: { ...LAYOUT_DEFAULTS.xaxis, title: { text: "Date" } },
        height: 350,
      }}
      config={{ displayModeBar: false, responsive: true }}
      className="w-full"
    />
  );
}
