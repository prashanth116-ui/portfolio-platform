"use client";

import { useMemo } from "react";
import { Plot } from "./charts/plotly-wrapper";
import type { PriceSeries } from "@/lib/ew-types";

interface SparklineProps {
  series: PriceSeries;
  athIdx?: number;
  lowIdx?: number;
  fibLevels?: { ratio: number; price: number }[];
  width?: number;
  height?: number;
}

export function EWSparkline({
  series,
  athIdx,
  lowIdx,
  fibLevels,
  width = 200,
  height = 60,
}: SparklineProps) {
  const { traces, layout } = useMemo(() => {
    const { close, timestamps } = series;
    const dates = timestamps.map((t) => new Date(t * 1000).toISOString().slice(0, 10));

    // Find effective indices — use provided or compute from data
    let aIdx = athIdx ?? 0;
    let lIdx = lowIdx ?? 0;

    if (athIdx == null || lowIdx == null) {
      // Fallback: find ATH and lowest-after-ATH from close data
      let maxVal = -Infinity;
      for (let i = 0; i < close.length; i++) {
        if (close[i] > maxVal) { maxVal = close[i]; aIdx = i; }
      }
      let minVal = Infinity;
      for (let i = aIdx; i < close.length; i++) {
        if (close[i] < minVal) { minVal = close[i]; lIdx = i; }
      }
    }

    // Clamp to valid range
    aIdx = Math.max(0, Math.min(aIdx, close.length - 1));
    lIdx = Math.max(aIdx, Math.min(lIdx, close.length - 1));

    // Pre-ATH segment: gray
    const preDates = dates.slice(0, aIdx + 1);
    const preClose = close.slice(0, aIdx + 1);

    // Decline segment (ATH -> Low): red
    const declineDates = dates.slice(aIdx, lIdx + 1);
    const declineClose = close.slice(aIdx, lIdx + 1);

    // Recovery segment (Low -> Current): green
    const recoveryDates = dates.slice(lIdx);
    const recoveryClose = close.slice(lIdx);

    const traces: Plotly.Data[] = [];

    if (preDates.length > 1) {
      traces.push({
        x: preDates,
        y: preClose,
        type: "scatter",
        mode: "lines",
        line: { color: "#555", width: 1 },
        hoverinfo: "skip",
        showlegend: false,
      });
    }

    if (declineDates.length > 1) {
      traces.push({
        x: declineDates,
        y: declineClose,
        type: "scatter",
        mode: "lines",
        line: { color: "#ef4444", width: 1.5 },
        hoverinfo: "skip",
        showlegend: false,
      });
    }

    if (recoveryDates.length > 1) {
      traces.push({
        x: recoveryDates,
        y: recoveryClose,
        type: "scatter",
        mode: "lines",
        line: { color: "#22c55e", width: 1.5 },
        hoverinfo: "skip",
        showlegend: false,
      });
    }

    // Fib level lines (golden zone only)
    if (fibLevels) {
      for (const fib of fibLevels) {
        if (fib.ratio === 0.382 || fib.ratio === 0.5 || fib.ratio === 0.618) {
          traces.push({
            x: [dates[0], dates[dates.length - 1]],
            y: [fib.price, fib.price],
            type: "scatter",
            mode: "lines",
            line: { color: "rgba(91,163,230,0.3)", width: 0.5, dash: "dot" },
            hoverinfo: "skip",
            showlegend: false,
          });
        }
      }
    }

    const layout: Partial<Plotly.Layout> = {
      width,
      height,
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 0, r: 0, t: 0, b: 0 },
      xaxis: { visible: false },
      yaxis: { visible: false },
    };

    return { traces, layout };
  }, [series, athIdx, lowIdx, fibLevels, width, height]);

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{ staticPlot: true, displayModeBar: false }}
      style={{ width, height }}
    />
  );
}
