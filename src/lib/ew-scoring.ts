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
