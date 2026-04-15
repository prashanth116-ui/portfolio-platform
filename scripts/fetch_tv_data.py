"""
Fetch TradingView screener data and push to Supabase.

Usage:
    python scripts/fetch_tv_data.py

Requires:
    pip install tradingview-screener supabase python-dotenv

Environment variables (from .env or .env.local):
    NEXT_PUBLIC_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY
"""

import os
import sys
from datetime import datetime, timezone

try:
    from tradingview_screener import Query, Column
except ImportError:
    print("Install: pip install tradingview-screener")
    sys.exit(1)

try:
    from supabase import create_client
except ImportError:
    print("Install: pip install supabase")
    sys.exit(1)

try:
    from dotenv import load_dotenv
    # Try loading from project root .env.local first, then .env
    for env_file in [".env.local", ".env"]:
        env_path = os.path.join(os.path.dirname(__file__), "..", env_file)
        if os.path.exists(env_path):
            load_dotenv(env_path)
            break
except ImportError:
    pass


def get_supabase():
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        print("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        sys.exit(1)
    return create_client(url, key)


def fetch_screener_data():
    """Fetch stock data from TradingView screener."""
    print("Fetching TradingView screener data...")

    columns = [
        Column.TICKER,
        Column.NAME,
        Column.CLOSE,
        Column.CHANGE,
        Column.VOLUME,
        Column.MARKET_CAP,
        Column.SECTOR,
        Column.RSI,
        Column.SMA20,
        Column.SMA50,
        Column.ATR,
        Column.RELATIVE_VOLUME,
    ]

    query = (
        Query()
        .select(*columns)
        .set_markets("america")
        .where(Column.MARKET_CAP > 1_000_000_000)  # $1B+ market cap
        .where(Column.VOLUME > 500_000)              # 500K+ daily volume
        .where(Column.CLOSE > 5)                     # Price > $5
        .order_by(Column.CHANGE, ascending=False)
        .limit(200)
    )

    try:
        count, rows = query.get_scanner_data()
        print(f"  Fetched {count} symbols")
        return rows
    except Exception as e:
        print(f"  Error fetching data: {e}")
        return []


def classify_signal(row: dict) -> str:
    """Classify a stock as Bullish/Bearish/Neutral based on technicals."""
    rsi = row.get("RSI", 50)
    close = row.get("close", 0)
    sma20 = row.get("SMA20", 0)
    sma50 = row.get("SMA50", 0)
    change = row.get("change", 0)

    bullish_signals = 0
    bearish_signals = 0

    # RSI
    if rsi and rsi > 55:
        bullish_signals += 1
    elif rsi and rsi < 45:
        bearish_signals += 1

    # Price vs SMA20
    if close and sma20 and close > sma20:
        bullish_signals += 1
    elif close and sma20 and close < sma20:
        bearish_signals += 1

    # Price vs SMA50
    if close and sma50 and close > sma50:
        bullish_signals += 1
    elif close and sma50 and close < sma50:
        bearish_signals += 1

    # Daily change
    if change and change > 1:
        bullish_signals += 1
    elif change and change < -1:
        bearish_signals += 1

    if bullish_signals >= 3:
        return "Bullish"
    elif bearish_signals >= 3:
        return "Bearish"
    return "Neutral"


def push_to_supabase(rows: list):
    """Push screener results to Supabase."""
    if not rows:
        print("No data to push")
        return

    supabase = get_supabase()

    # Create a run record
    now = datetime.now(timezone.utc).isoformat()
    run_resp = supabase.table("scanner_runs").insert({
        "started_at": now,
        "status": "running",
        "source": "tradingview",
    }).execute()

    run_id = run_resp.data[0]["id"]
    print(f"  Created run {run_id}")

    # Transform and insert results
    results = []
    for row in rows:
        ticker = row.get("ticker", row.get("TICKER", ""))
        if not ticker:
            continue

        signal = classify_signal(row)

        results.append({
            "run_id": run_id,
            "symbol": ticker,
            "name": row.get("name", row.get("NAME", ticker)),
            "price": row.get("close", row.get("CLOSE", 0)),
            "change_pct": round(row.get("change", row.get("CHANGE", 0)), 2),
            "volume": int(row.get("volume", row.get("VOLUME", 0))),
            "market_cap": row.get("market_cap_basic", row.get("MARKET_CAP", None)),
            "sector": row.get("sector", row.get("SECTOR", None)),
            "signal": signal,
            "rsi_14": row.get("RSI", None),
            "sma_20": row.get("SMA20", None),
            "sma_50": row.get("SMA50", None),
            "atr_14": row.get("ATR", None),
            "relative_volume": row.get("relative_volume_10d_calc",
                                       row.get("RELATIVE_VOLUME", None)),
        })

    # Insert in batches of 50
    for i in range(0, len(results), 50):
        batch = results[i:i + 50]
        supabase.table("scanner_results").insert(batch).execute()
        print(f"  Inserted batch {i // 50 + 1} ({len(batch)} rows)")

    # Mark run as completed
    supabase.table("scanner_runs").update({
        "status": "completed",
        "completed_at": datetime.now(timezone.utc).isoformat(),
        "total_symbols": len(results),
    }).eq("id", run_id).execute()

    print(f"  Run {run_id} completed: {len(results)} symbols")


def main():
    rows = fetch_screener_data()
    push_to_supabase(rows)
    print("Done!")


if __name__ == "__main__":
    main()
