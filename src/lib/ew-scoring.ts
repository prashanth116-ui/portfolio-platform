import type {
  PriceSeries,
  EnhancedScoredCandidate,
  FibAnalysis,
  VolumeAnalysis,
  MomentumAnalysis,
  StructureAnalysis,
  ConfidenceTier,
  ScannerMode,
} from "./ew-types";
import { analyzeFibonacci } from "./ew-fibonacci";
import { analyzeVolume } from "./ew-volume";
import { analyzeMomentum } from "./ew-momentum";
import { classifyStructure } from "./ew-swing";

// ── Original types and functions (unchanged) ──

export interface QuoteData {
  ticker: string;
  name: string;
  ath: number;
  low: number;
  current: number;
  athYear: number;
  lowYear: number;
}

export interface ScoredCandidate {
  ticker: string;
  name: string;
  score: number;
  normalizedScore: number;
  ath: number;
  low: number;
  current: number;
  athYear: number;
  lowYear: number;
  declinePct: number;
  monthsDecline: number;
  recoveryPct: number;
  passed: boolean;
}

interface ScoringParams {
  minDecline: number;
  minDuration: number;
  minRecovery: number;
  passThreshold?: number;
}

const MAX_SCORE = 7;

export function scoreCandidate(
  q: QuoteData,
  params: ScoringParams
): ScoredCandidate {
  const { minDecline, minDuration, minRecovery, passThreshold = 0.4 } = params;

  const declinePct = q.ath > 0 ? ((q.ath - q.low) / q.ath) * 100 : 0;
  const monthsDecline = Math.max(0, (q.lowYear - q.athYear) * 12);
  const recoveryPct = q.low > 0 ? ((q.current - q.low) / q.low) * 100 : 0;

  let score = 0;

  // Decline >= threshold: 2pts
  if (declinePct >= minDecline) score += 2;

  // ATH before or same year as low (correct direction): 1pt
  if (q.athYear <= q.lowYear) score += 1;

  // Duration >= threshold: 2pts
  if (monthsDecline >= minDuration) score += 2;

  // Recovery from low >= threshold: 2pts
  if (recoveryPct >= minRecovery) score += 2;

  const normalizedScore = score / MAX_SCORE;

  return {
    ticker: q.ticker,
    name: q.name,
    score,
    normalizedScore,
    ath: q.ath,
    low: q.low,
    current: q.current,
    athYear: q.athYear,
    lowYear: q.lowYear,
    declinePct,
    monthsDecline,
    recoveryPct,
    passed: normalizedScore >= passThreshold,
  };
}

export function scoreBatch(
  quotes: QuoteData[],
  params: ScoringParams
): ScoredCandidate[] {
  return quotes
    .map((q) => scoreCandidate(q, params))
    .sort((a, b) => b.normalizedScore - a.normalizedScore || b.declinePct - a.declinePct);
}

// ── Enhanced scoring (new, additive) ──

export interface EnrichedQuoteInput {
  ticker: string;
  name: string;
  sector?: string;
  ath: number;
  low: number;
  current: number;
  athYear: number;
  lowYear: number;
  series?: PriceSeries;
  athIdx?: number;
  lowIdx?: number;
}

interface EnhancedScoringParams extends ScoringParams {
  mode?: ScannerMode;
}

interface ModeWeights {
  base: number;
  fibonacci: number;
  volume: number;
  structure: number;
  relativeStrength: number;
}

const MODE_WEIGHTS: Record<ScannerMode, ModeWeights> = {
  wave2: {
    base: 1.0,
    fibonacci: 1.0,
    volume: 1.0,
    structure: 1.0,
    relativeStrength: 1.0,
  },
  wave4: {
    base: 0.5,
    fibonacci: 2.5,
    volume: 1.0,
    structure: 0.5,
    relativeStrength: 1.5,
  },
  wave5: {
    base: 0.5,
    fibonacci: 1.0,
    volume: 1.5,
    structure: 1.0,
    relativeStrength: 2.0,
  },
  breakout: {
    base: 0.5,
    fibonacci: 0.5,
    volume: 2.0,
    structure: 1.0,
    relativeStrength: 2.0,
  },
};

const ENHANCED_MAX = 20;

export function scoreEnhanced(
  q: EnrichedQuoteInput,
  params: EnhancedScoringParams
): EnhancedScoredCandidate {
  const base = scoreCandidate(q, params);
  const weights = MODE_WEIGHTS[params.mode ?? "wave2"];

  // If no series data, return base scoring with defaults
  if (!q.series || q.athIdx == null || q.lowIdx == null) {
    const baseWeighted = (base.score / MAX_SCORE) * 7 * weights.base;
    return {
      ...base,
      sector: q.sector,
      enhancedScore: Math.round(baseWeighted * 10) / 10,
      enhancedMax: ENHANCED_MAX,
      enhancedNormalized: baseWeighted / ENHANCED_MAX,
      confidenceTier: assignConfidenceTier(baseWeighted / ENHANCED_MAX),
      series: q.series,
    };
  }

  // Run analyses
  const fibAnalysis = analyzeFibonacci(q.ath, q.low, q.current);
  const volumeAnalysis = analyzeVolume(q.series, q.athIdx, q.lowIdx);
  const momentumAnalysis = analyzeMomentum(q.series, q.athIdx, q.lowIdx);
  const structureAnalysis = classifyStructure(q.series, q.athIdx, q.lowIdx);

  // Base score (0-7, weighted)
  const baseWeighted = (base.score / MAX_SCORE) * 7 * weights.base;

  // Fibonacci score (0-4, weighted)
  let fibScore = 0;
  if (fibAnalysis.withinGoldenZone) fibScore += 2;
  else if (fibAnalysis.retracementDepth >= 0.236 && fibAnalysis.retracementDepth <= 0.786) fibScore += 1;
  if (fibAnalysis.nearestLevel) fibScore += 1;
  if (fibAnalysis.retracementDepth >= 0.382 && fibAnalysis.retracementDepth <= 0.618) fibScore += 1;
  const fibWeighted = fibScore * weights.fibonacci;

  // Volume score (0-3, weighted)
  let volScore = 0;
  if (volumeAnalysis.confirmation) volScore += 2;
  else if (volumeAnalysis.volumeTrend === "neutral") volScore += 1;
  if (volumeAnalysis.recoveryAvgVol > 0) volScore += 1;
  const volWeighted = volScore * weights.volume;

  // Structure score (0-3, weighted)
  let structScore = 0;
  if (structureAnalysis.classification === "impulsive") structScore += 3;
  else if (structureAnalysis.classification === "corrective") structScore += 2;
  else if (structureAnalysis.swingCount >= 2) structScore += 1;
  const structWeighted = structScore * weights.structure;

  // Relative strength placeholder (set in batch processing: 0-3)
  const rsWeighted = 0;

  const totalRaw = baseWeighted + fibWeighted + volWeighted + structWeighted + rsWeighted;
  const enhancedNormalized = Math.min(totalRaw / ENHANCED_MAX, 1);

  return {
    ...base,
    sector: q.sector,
    enhancedScore: Math.round(totalRaw * 10) / 10,
    enhancedMax: ENHANCED_MAX,
    enhancedNormalized,
    confidenceTier: assignConfidenceTier(enhancedNormalized),
    fibAnalysis,
    volumeAnalysis,
    momentumAnalysis,
    structureAnalysis,
    series: q.series,
  };
}

export function scoreBatchEnhanced(
  quotes: EnrichedQuoteInput[],
  params: EnhancedScoringParams
): EnhancedScoredCandidate[] {
  const scored = quotes.map((q) => scoreEnhanced(q, params));

  // Compute relative strength across batch
  if (scored.length > 1) {
    const maxRecovery = Math.max(...scored.map((s) => s.recoveryPct), 1);
    const minDecline = Math.min(...scored.map((s) => s.declinePct), 0);
    const maxDecline = Math.max(...scored.map((s) => s.declinePct), 1);
    const weights = MODE_WEIGHTS[params.mode ?? "wave2"];

    for (const s of scored) {
      // RS = blend of recovery strength + decline resilience (smaller decline = better)
      const recoveryRank = s.recoveryPct / maxRecovery;
      const declineRange = maxDecline - minDecline || 1;
      const declineRank = 1 - (s.declinePct - minDecline) / declineRange;
      const rs = (recoveryRank * 0.6 + declineRank * 0.4) * 3;
      const rsWeighted = rs * weights.relativeStrength;

      s.relativeStrength = Math.round(rs * 100) / 100;
      s.enhancedScore =
        Math.round((s.enhancedScore + rsWeighted) * 10) / 10;
      s.enhancedNormalized = Math.min(s.enhancedScore / ENHANCED_MAX, 1);
      s.confidenceTier = assignConfidenceTier(s.enhancedNormalized);
    }
  }

  return scored.sort(
    (a, b) =>
      b.enhancedNormalized - a.enhancedNormalized ||
      b.declinePct - a.declinePct
  );
}

export function assignConfidenceTier(normalized: number): ConfidenceTier {
  if (normalized >= 0.75) return "high";
  if (normalized >= 0.5) return "probable";
  return "speculative";
}
