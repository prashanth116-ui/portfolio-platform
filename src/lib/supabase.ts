import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey);
}

export interface ScannerResult {
  id: number;
  run_id: number;
  symbol: string;
  name: string;
  price: number;
  change_pct: number;
  volume: number;
  market_cap: number | null;
  sector: string | null;
  signal: string | null;
  rsi_14: number | null;
  sma_20: number | null;
  sma_50: number | null;
  atr_14: number | null;
  relative_volume: number | null;
  created_at: string;
}

export interface ScannerRun {
  id: number;
  started_at: string;
  completed_at: string | null;
  status: "running" | "completed" | "failed";
  total_symbols: number;
  source: string;
}
