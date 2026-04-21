import type { SavedScan, EnhancedScoredCandidate, ScannerMode } from "./ew-types";

const STORAGE_KEY = "ew-scanner-saved-scans";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function saveScan(
  name: string,
  mode: ScannerMode,
  universe: string,
  filters: { minDecline: number; minMonths: number; minRecovery: number },
  candidates: EnhancedScoredCandidate[],
  labels: Record<string, string>
): SavedScan | null {
  if (!isClient()) return null;

  // Strip series data to keep storage small
  const stripped = candidates.map(({ series, ...rest }) => rest);

  const scan: SavedScan = {
    id: `scan_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name,
    savedAt: new Date().toISOString(),
    mode,
    universe,
    filters,
    candidateCount: candidates.length,
    candidates: stripped,
    labels,
  };

  const existing = loadScans();
  existing.unshift(scan);
  // Keep max 20 saved scans
  const trimmed = existing.slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));

  return scan;
}

export function loadScans(): SavedScan[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedScan[];
  } catch {
    return [];
  }
}

export function deleteScan(id: string): void {
  if (!isClient()) return;
  const scans = loadScans().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
}
