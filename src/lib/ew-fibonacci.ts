import type { FibLevel, FibAnalysis } from "./ew-types";

const FIB_RATIOS = [
  { ratio: 0.236, label: "23.6%" },
  { ratio: 0.382, label: "38.2%" },
  { ratio: 0.5, label: "50.0%" },
  { ratio: 0.618, label: "61.8%" },
  { ratio: 0.786, label: "78.6%" },
  { ratio: 1.0, label: "100%" },
];

/**
 * Calculate Fibonacci retracement levels from ATH to Low,
 * and analyze where current price sits relative to them.
 */
export function analyzeFibonacci(
  ath: number,
  low: number,
  current: number
): FibAnalysis {
  const range = ath - low;
  if (range <= 0) {
    return {
      levels: [],
      nearestLevel: null,
      withinGoldenZone: false,
      retracementDepth: 0,
      depthLabel: "N/A",
    };
  }

  // Fib retracement levels (from low going up toward ATH)
  const levels: FibLevel[] = FIB_RATIOS.map(({ ratio, label }) => ({
    ratio,
    label,
    price: Math.round((low + range * ratio) * 100) / 100,
  }));

  // How much of the decline has been retraced (0 = at low, 1 = at ATH)
  const retracementDepth = (current - low) / range;

  // Find nearest Fib level (within 3%)
  let nearestLevel: FibLevel | null = null;
  let minDistance = Infinity;
  for (const level of levels) {
    const distance = Math.abs(retracementDepth - level.ratio);
    if (distance < minDistance && distance <= 0.03) {
      minDistance = distance;
      nearestLevel = level;
    }
  }

  // Golden zone: 38.2% - 61.8% retracement
  const withinGoldenZone =
    retracementDepth >= 0.382 && retracementDepth <= 0.618;

  // Depth label
  let depthLabel: string;
  if (retracementDepth < 0) depthLabel = "Below low (new low)";
  else if (retracementDepth < 0.236) depthLabel = "Shallow (<23.6%)";
  else if (retracementDepth < 0.382) depthLabel = "Light (23.6-38.2%)";
  else if (retracementDepth < 0.5) depthLabel = "Golden low (38.2-50%)";
  else if (retracementDepth < 0.618) depthLabel = "Golden high (50-61.8%)";
  else if (retracementDepth < 0.786) depthLabel = "Deep (61.8-78.6%)";
  else if (retracementDepth < 1.0) depthLabel = "Very deep (>78.6%)";
  else depthLabel = "Full retrace (100%+)";

  return {
    levels,
    nearestLevel,
    withinGoldenZone,
    retracementDepth: Math.round(retracementDepth * 1000) / 1000,
    depthLabel,
  };
}

/**
 * Get the Fibonacci zone label for display.
 */
export function getFibZoneLabel(depth: number): string {
  if (depth < 0.236) return "<23.6%";
  if (depth < 0.382) return "23.6-38.2%";
  if (depth < 0.5) return "38.2-50%";
  if (depth < 0.618) return "50-61.8%";
  if (depth < 0.786) return "61.8-78.6%";
  if (depth < 1.0) return "78.6-100%";
  return ">100%";
}
