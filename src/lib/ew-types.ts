/** Central types for EW Scanner V2 */

export interface PriceSeries {
  timestamps: number[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

export interface EnrichedQuote {
  ticker: string;
  name: string;
  sector?: string;
  ath: number;
  low: number;
  current: number;
  athYear: number;
  lowYear: number;
  series?: PriceSeries;
}

export interface SwingPoint {
  index: number;
  price: number;
  type: "high" | "low";
  timestamp?: number;
}

export interface FibLevel {
  ratio: number;
  label: string;
  price: number;
}

export interface FibAnalysis {
  levels: FibLevel[];
  nearestLevel: FibLevel | null;
  withinGoldenZone: boolean;
  retracementDepth: number;
  depthLabel: string;
}

export interface VolumeAnalysis {
  declineAvgVol: number;
  recoveryAvgVol: number;
  volumeTrend: "expanding" | "contracting" | "neutral";
  confirmation: boolean;
}

export interface MomentumAnalysis {
  declineRoc: number;
  recoveryRoc: number;
  divergence: boolean;
  score: number; // -1 to 1
}

export interface StructureAnalysis {
  swingCount: number;
  classification: "impulsive" | "corrective" | "unclear";
  swings: SwingPoint[];
}

export type ScannerMode = "wave2" | "wave4" | "wave5" | "breakout";

export interface DeepAnalysisResult {
  wavePosition: string;
  confidence: "high" | "medium" | "low";
  primaryCount: string;
  alternateCount: string;
  nextTarget: number | null;
  invalidation: number | null;
  keyLevels: { label: string; price: number }[];
  riskLevel: "Low" | "Medium" | "High";
  summary: string;
}

export type ConfidenceTier = "high" | "probable" | "speculative";

export interface EnhancedScoredCandidate {
  ticker: string;
  name: string;
  sector?: string;
  // Base scoring (original 7-pt)
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
  // Enhanced scoring (20-pt)
  enhancedScore: number;
  enhancedMax: number;
  enhancedNormalized: number;
  confidenceTier: ConfidenceTier;
  // Analysis results
  fibAnalysis?: FibAnalysis;
  volumeAnalysis?: VolumeAnalysis;
  momentumAnalysis?: MomentumAnalysis;
  structureAnalysis?: StructureAnalysis;
  relativeStrength?: number;
  // Series for sparkline
  series?: PriceSeries;
}

export interface SavedScan {
  id: string;
  name: string;
  savedAt: string;
  mode: ScannerMode;
  universe: string;
  filters: {
    minDecline: number;
    minMonths: number;
    minRecovery: number;
  };
  candidateCount: number;
  candidates: Omit<EnhancedScoredCandidate, "series">[];
  labels: Record<string, string>;
}
