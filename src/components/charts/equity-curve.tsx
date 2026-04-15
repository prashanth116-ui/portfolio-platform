"use client";

import { Plot, LAYOUT_DEFAULTS } from "./plotly-wrapper";
import type { DailyData } from "@/lib/utils";

export function EquityCurve({
  data,
  showDollars,
  avgRisk,
}: {
  data: DailyData[];
  showDollars: boolean;
  avgRisk: number;
}) {
  const dates = data.map((d) => d.date);
  const cumulative: number[] = [];
  let running = 0;
  for (const d of data) {
    running += d.summary.total_pnl;
    cumulative.push(showDollars ? running : running / avgRisk);
  }

  const label = showDollars ? "Cumulative P/L ($)" : "Cumulative P/L (R)";

  return (
    <Plot
      data={[
        {
          x: dates,
          y: cumulative,
          type: "scatter",
          mode: "lines+markers",
          line: { color: "#2c7be5", width: 2 },
          marker: { size: 5 },
          fill: "tozeroy",
          fillcolor: "rgba(44,123,229,0.1)",
          name: "Cumulative P/L",
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
