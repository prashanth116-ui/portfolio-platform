-- Seed data for scanner demo
-- Insert a sample completed run with sample results

INSERT INTO scanner_runs (started_at, completed_at, status, total_symbols, source)
VALUES (
  NOW() - INTERVAL '5 minutes',
  NOW() - INTERVAL '4 minutes',
  'completed',
  20,
  'tradingview'
);

-- Get the run_id we just created
DO $$
DECLARE
  v_run_id BIGINT;
BEGIN
  SELECT id INTO v_run_id FROM scanner_runs ORDER BY id DESC LIMIT 1;

  INSERT INTO scanner_results (run_id, symbol, name, price, change_pct, volume, market_cap, sector, signal, rsi_14, sma_20, sma_50, atr_14, relative_volume)
  VALUES
    (v_run_id, 'AAPL',  'Apple Inc.',             228.50,  1.25, 52340000, 3520000000000, 'Technology',      'Bullish',  62.3, 225.40, 218.30, 3.20, 1.15),
    (v_run_id, 'MSFT',  'Microsoft Corp.',        445.20,  0.85, 24560000, 3310000000000, 'Technology',      'Bullish',  58.7, 440.10, 432.50, 5.10, 0.95),
    (v_run_id, 'NVDA',  'NVIDIA Corp.',           142.80,  2.45, 98760000, 3480000000000, 'Technology',      'Bullish',  71.2, 138.20, 128.50, 4.80, 1.45),
    (v_run_id, 'GOOGL', 'Alphabet Inc.',          178.30,  0.42, 18230000, 2190000000000, 'Technology',      'Neutral',  52.1, 176.80, 172.40, 3.40, 0.88),
    (v_run_id, 'AMZN',  'Amazon.com Inc.',        208.60,  1.82, 45670000, 2170000000000, 'Consumer Cycl.',  'Bullish',  64.8, 204.30, 196.20, 4.20, 1.22),
    (v_run_id, 'META',  'Meta Platforms Inc.',     612.40, -0.35, 15890000, 1560000000000, 'Technology',      'Neutral',  48.3, 618.20, 598.70, 8.50, 0.78),
    (v_run_id, 'TSLA',  'Tesla Inc.',             285.70,  3.15, 87650000,  911000000000, 'Consumer Cycl.',  'Bullish',  68.4, 275.40, 258.30, 9.20, 1.65),
    (v_run_id, 'BRK.B', 'Berkshire Hathaway B',   478.20,  0.18,  3450000,  985000000000, 'Financial',       'Neutral',  55.2, 475.60, 468.30, 4.80, 0.72),
    (v_run_id, 'JPM',   'JPMorgan Chase & Co.',   238.40,  0.95, 12340000,  686000000000, 'Financial',       'Bullish',  60.1, 234.80, 228.50, 3.60, 1.05),
    (v_run_id, 'V',     'Visa Inc.',              316.80,  0.52,  6780000,  640000000000, 'Financial',       'Neutral',  54.6, 314.20, 308.40, 3.80, 0.92),
    (v_run_id, 'UNH',   'UnitedHealth Group',     528.30, -1.20,  4560000,  487000000000, 'Healthcare',      'Bearish',  38.4, 542.10, 538.60, 8.40, 1.35),
    (v_run_id, 'JNJ',   'Johnson & Johnson',      158.40,  0.32,  8920000,  381000000000, 'Healthcare',      'Neutral',  51.8, 157.20, 155.80, 2.10, 0.85),
    (v_run_id, 'XOM',   'Exxon Mobil Corp.',      112.60, -0.75, 15670000,  475000000000, 'Energy',          'Bearish',  42.3, 115.40, 118.20, 2.40, 1.12),
    (v_run_id, 'PG',    'Procter & Gamble Co.',   172.80,  0.45,  7890000,  407000000000, 'Consumer Def.',   'Neutral',  56.2, 171.40, 168.90, 2.30, 0.88),
    (v_run_id, 'MA',    'Mastercard Inc.',        528.60,  0.68,  3210000,  488000000000, 'Financial',       'Bullish',  59.4, 524.30, 516.80, 6.20, 0.95),
    (v_run_id, 'HD',    'Home Depot Inc.',        398.40,  1.42,  4560000,  393000000000, 'Consumer Cycl.',  'Bullish',  63.7, 392.80, 384.50, 5.40, 1.18),
    (v_run_id, 'ABBV',  'AbbVie Inc.',            192.30, -0.55,  6780000,  340000000000, 'Healthcare',      'Neutral',  47.8, 194.60, 191.20, 3.20, 0.95),
    (v_run_id, 'CRM',   'Salesforce Inc.',        328.40,  1.95, 5670000,   315000000000, 'Technology',      'Bullish',  66.2, 320.40, 308.60, 6.80, 1.32),
    (v_run_id, 'COST',  'Costco Wholesale',       938.20,  0.28,  2340000,  416000000000, 'Consumer Def.',   'Neutral',  53.4, 935.60, 928.40, 10.20, 0.82),
    (v_run_id, 'AMD',   'Advanced Micro Devices',  178.90,  2.85, 42560000,  290000000000, 'Technology',      'Bullish',  69.8, 172.40, 162.80, 5.60, 1.55);
END $$;

-- Insert a sample watchlist
INSERT INTO watchlists (name, symbols)
VALUES ('Tech Leaders', ARRAY['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'META', 'AMZN']);
