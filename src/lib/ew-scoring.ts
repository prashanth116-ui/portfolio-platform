export interface PriceData {
  ticker: string;
  name: string;
  timestamps: number[];
  highs: number[];
  lows: number[];
  closes: number[];
  current: number;
}

export interface ScoredCandidate {
  ticker: string;
  name: string;
  score: number;
  normalizedScore: number;
  ath: number;
  athDate: Date;
  low: number;
  lowDate: Date;
  current: number;
  declinePct: number;
  durationMonths: number;
  recoveryPct: number;
  passed: boolean;
}

interface ScoringParams {
  minDeclinePct: number;
  minMonths: number;
  minRecoveryPct: number;
  passThreshold?: number;
}

const MAX_SCORE = 7;

export function scoreCandidate(
  data: PriceData,
  params: ScoringParams
): ScoredCandidate {
  const { minDeclinePct, minMonths, minRecoveryPct, passThreshold = 0.4 } = params;

  // Find ATH (highest high)
  let athIdx = 0;
  let athValue = -Infinity;
  for (let i = 0; i < data.highs.length; i++) {
    if (data.highs[i] != null && data.highs[i] > athValue) {
      athValue = data.highs[i];
      athIdx = i;
    }
  }

  // Find lowest low AFTER ATH
  let lowIdx = athIdx;
  let lowValue = Infinity;
  for (let i = athIdx; i < data.lows.length; i++) {
    if (data.lows[i] != null && data.lows[i] < lowValue) {
      lowValue = data.lows[i];
      lowIdx = i;
    }
  }

  // If no valid low found after ATH, use the last value
  if (lowValue === Infinity) {
    lowValue = data.current;
    lowIdx = data.timestamps.length - 1;
  }

  const athDate = new Date(data.timestamps[athIdx] * 1000);
  const lowDate = new Date(data.timestamps[lowIdx] * 1000);
  const current = data.current;

  // Calculate metrics
  const declinePct = athValue > 0 ? ((athValue - lowValue) / athValue) * 100 : 0;
  const durationMonths = Math.max(
    0,
    (lowDate.getTime() - athDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );
  const recoveryPct = lowValue > 0 ? ((current - lowValue) / lowValue) * 100 : 0;

  // Scoring
  let score = 0;

  // Decline >= threshold: 2pts
  if (declinePct >= minDeclinePct) score += 2;

  // ATH before low (correct directional sequence): 1pt
  if (athIdx < lowIdx) score += 1;

  // Duration >= threshold: 2pts
  if (durationMonths >= minMonths) score += 2;

  // Recovery from low >= threshold: 2pts
  if (recoveryPct >= minRecoveryPct) score += 2;

  const normalizedScore = score / MAX_SCORE;

  return {
    ticker: data.ticker,
    name: data.name,
    score,
    normalizedScore,
    ath: athValue,
    athDate,
    low: lowValue,
    lowDate,
    current,
    declinePct,
    durationMonths,
    recoveryPct,
    passed: normalizedScore >= passThreshold,
  };
}

export function scoreBatch(
  dataArr: PriceData[],
  params: ScoringParams
): ScoredCandidate[] {
  return dataArr
    .map((d) => scoreCandidate(d, params))
    .sort((a, b) => b.normalizedScore - a.normalizedScore || b.declinePct - a.declinePct);
}
