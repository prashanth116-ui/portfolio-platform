"use client";

import dynamic from "next/dynamic";
import type { PlotParams } from "react-plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
}) as React.ComponentType<PlotParams>;

const LAYOUT_DEFAULTS: Partial<Plotly.Layout> = {
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: { color: "#e6e6e6", size: 12 },
  margin: { l: 50, r: 20, t: 40, b: 40 },
  xaxis: { gridcolor: "rgba(255,255,255,0.05)" },
  yaxis: { gridcolor: "rgba(255,255,255,0.1)" },
};

export { Plot, LAYOUT_DEFAULTS };
