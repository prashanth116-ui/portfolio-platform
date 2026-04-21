import type { ScoredCandidate } from "./ew-scoring";

export async function exportToExcel(
  candidates: ScoredCandidate[],
  labels: Record<string, string>
) {
  const XLSX = await import("xlsx");

  // Sheet 1: Summary
  const summaryData = candidates.map((c) => ({
    Ticker: c.ticker,
    Name: c.name,
    "Score (0-7)": c.score,
    "Score %": `${(c.normalizedScore * 100).toFixed(0)}%`,
    "Decline %": `${c.declinePct.toFixed(1)}%`,
    "Duration (months)": c.durationMonths.toFixed(1),
    "Recovery %": `${c.recoveryPct.toFixed(1)}%`,
    Passed: c.passed ? "Yes" : "No",
  }));
  const ws1 = XLSX.utils.json_to_sheet(summaryData);

  // Sheet 2: Price Data
  const priceData = candidates.map((c) => ({
    Ticker: c.ticker,
    Name: c.name,
    ATH: c.ath.toFixed(2),
    "ATH Date": c.athDate.toLocaleDateString(),
    Low: c.low.toFixed(2),
    "Low Date": c.lowDate.toLocaleDateString(),
    Current: c.current.toFixed(2),
  }));
  const ws2 = XLSX.utils.json_to_sheet(priceData);

  // Sheet 3: EW Labels
  const labelData = candidates.map((c) => ({
    Ticker: c.ticker,
    Name: c.name,
    "EW Label": labels[c.ticker] || "—",
  }));
  const ws3 = XLSX.utils.json_to_sheet(labelData);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws1, "Summary");
  XLSX.utils.book_append_sheet(wb, ws2, "Price Data");
  XLSX.utils.book_append_sheet(wb, ws3, "EW Labels");

  XLSX.writeFile(wb, `ew-scan-${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export function exportToCsv(
  candidates: ScoredCandidate[],
  labels: Record<string, string>
) {
  const header = [
    "Ticker",
    "Name",
    "Score",
    "Score %",
    "Decline %",
    "Duration (months)",
    "Recovery %",
    "ATH",
    "ATH Date",
    "Low",
    "Low Date",
    "Current",
    "EW Label",
    "Passed",
  ].join(",");

  const rows = candidates.map((c) =>
    [
      c.ticker,
      `"${c.name}"`,
      c.score,
      `${(c.normalizedScore * 100).toFixed(0)}%`,
      `${c.declinePct.toFixed(1)}%`,
      c.durationMonths.toFixed(1),
      `${c.recoveryPct.toFixed(1)}%`,
      c.ath.toFixed(2),
      c.athDate.toLocaleDateString(),
      c.low.toFixed(2),
      c.lowDate.toLocaleDateString(),
      c.current.toFixed(2),
      `"${labels[c.ticker] || "—"}"`,
      c.passed ? "Yes" : "No",
    ].join(",")
  );

  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ew-scan-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
