-- Scanner Schema for Supabase
-- Run this in the Supabase SQL editor to set up the scanner tables.

-- Scanner runs: tracks each data fetch execution
CREATE TABLE IF NOT EXISTS scanner_runs (
  id            BIGSERIAL PRIMARY KEY,
  started_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at  TIMESTAMPTZ,
  status        TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  total_symbols INTEGER NOT NULL DEFAULT 0,
  source        TEXT NOT NULL DEFAULT 'tradingview',
  error_message TEXT
);

-- Scanner results: one row per symbol per run
CREATE TABLE IF NOT EXISTS scanner_results (
  id               BIGSERIAL PRIMARY KEY,
  run_id           BIGINT NOT NULL REFERENCES scanner_runs(id) ON DELETE CASCADE,
  symbol           TEXT NOT NULL,
  name             TEXT NOT NULL DEFAULT '',
  price            NUMERIC(12,4) NOT NULL,
  change_pct       NUMERIC(8,4) NOT NULL DEFAULT 0,
  volume           BIGINT NOT NULL DEFAULT 0,
  market_cap       NUMERIC(16,0),
  sector           TEXT,
  signal           TEXT,
  rsi_14           NUMERIC(6,2),
  sma_20           NUMERIC(12,4),
  sma_50           NUMERIC(12,4),
  atr_14           NUMERIC(12,4),
  relative_volume  NUMERIC(8,4),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_scanner_results_run_id ON scanner_results(run_id);
CREATE INDEX IF NOT EXISTS idx_scanner_results_symbol ON scanner_results(symbol);
CREATE INDEX IF NOT EXISTS idx_scanner_results_sector ON scanner_results(sector);
CREATE INDEX IF NOT EXISTS idx_scanner_results_created_at ON scanner_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scanner_runs_status ON scanner_runs(status);
CREATE INDEX IF NOT EXISTS idx_scanner_runs_started_at ON scanner_runs(started_at DESC);

-- Watchlists: user-defined symbol lists
CREATE TABLE IF NOT EXISTS watchlists (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  symbols    TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS) — open read, restrict write to service role
ALTER TABLE scanner_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scanner_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read scanner_runs" ON scanner_runs FOR SELECT USING (true);
CREATE POLICY "Public read scanner_results" ON scanner_results FOR SELECT USING (true);
CREATE POLICY "Public read watchlists" ON watchlists FOR SELECT USING (true);

-- Service role write access
CREATE POLICY "Service write scanner_runs" ON scanner_runs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service write scanner_results" ON scanner_results FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Public write watchlists" ON watchlists FOR ALL USING (true) WITH CHECK (true);

-- Function to get latest scan results (most recent completed run)
CREATE OR REPLACE FUNCTION get_latest_scan()
RETURNS TABLE (
  symbol           TEXT,
  name             TEXT,
  price            NUMERIC,
  change_pct       NUMERIC,
  volume           BIGINT,
  market_cap       NUMERIC,
  sector           TEXT,
  signal           TEXT,
  rsi_14           NUMERIC,
  sma_20           NUMERIC,
  sma_50           NUMERIC,
  atr_14           NUMERIC,
  relative_volume  NUMERIC,
  scanned_at       TIMESTAMPTZ
) AS $$
  SELECT
    r.symbol,
    r.name,
    r.price,
    r.change_pct,
    r.volume,
    r.market_cap,
    r.sector,
    r.signal,
    r.rsi_14,
    r.sma_20,
    r.sma_50,
    r.atr_14,
    r.relative_volume,
    r.created_at AS scanned_at
  FROM scanner_results r
  INNER JOIN scanner_runs sr ON sr.id = r.run_id
  WHERE sr.id = (
    SELECT id FROM scanner_runs
    WHERE status = 'completed'
    ORDER BY completed_at DESC
    LIMIT 1
  )
  ORDER BY r.change_pct DESC;
$$ LANGUAGE sql STABLE;

-- Cleanup function: remove scan data older than 30 days
CREATE OR REPLACE FUNCTION cleanup_old_scans()
RETURNS void AS $$
  DELETE FROM scanner_runs
  WHERE started_at < NOW() - INTERVAL '30 days';
$$ LANGUAGE sql;

-- ============================================================
-- Astrology Reports
-- ============================================================

CREATE TABLE IF NOT EXISTS astrology_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','calculating','generating','complete','error')),
  name            TEXT NOT NULL,
  birth_date      DATE NOT NULL,
  birth_time      TIME NOT NULL,
  birth_place     TEXT NOT NULL,
  latitude        NUMERIC(10,6) NOT NULL,
  longitude       NUMERIC(10,6) NOT NULL,
  timezone_offset NUMERIC(5,2) NOT NULL,
  email           TEXT,
  context         TEXT,
  chart_data      JSONB,
  validation_pass BOOLEAN DEFAULT FALSE,
  report_html     TEXT,
  report_sections JSONB,
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_astrology_reports_status ON astrology_reports(status);
CREATE INDEX IF NOT EXISTS idx_astrology_reports_created_at ON astrology_reports(created_at DESC);

ALTER TABLE astrology_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read astrology_reports" ON astrology_reports FOR SELECT USING (true);
CREATE POLICY "Service write astrology_reports" ON astrology_reports FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
