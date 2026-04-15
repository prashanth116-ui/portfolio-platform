export interface TradingSystem {
  name: string;
  status: "ACTIVE" | "IN_DEVELOPMENT" | "EXPERIMENTAL";
  version: string;
  instruments: string[];
  tagline: string;
  tech_stack: string[];
  strategies: string[];
}

export const tradingSystems: TradingSystem[] = [
  {
    name: "tradovate-futures-bot",
    status: "ACTIVE",
    version: "V10.16",
    instruments: ["ES", "NQ", "MES", "MNQ", "SPY", "QQQ", "IWM"],
    tagline: "ICT intraday — 4 entry types, 82.5% WR, per-symbol trail optimization",
    tech_stack: ["Python", "TradingView", "Tradovate", "Telegram"],
    strategies: ["ICT FVG Quad Entry", "ICT State Machine", "ICT Liquidity Sweep", "ICT Optimal Trade Entry"],
  },
  {
    name: "htf-swing-strategy",
    status: "IN_DEVELOPMENT",
    version: "V1",
    instruments: ["ES", "NQ", "CL", "GC", "SPY", "QQQ"],
    tagline: "Multi-TF swing trading (Daily/4H/1H/15m) with Pine Script indicators",
    tech_stack: ["Python", "TradingView", "Pine Script"],
    strategies: ["ICT Multi-Timeframe Swing"],
  },
  {
    name: "ttfm-strategy",
    status: "EXPERIMENTAL",
    version: "V2.0",
    instruments: ["ES", "NQ", "MES", "MNQ"],
    tagline: "Mechanical fractal model — C3/C4 candle patterns with CISD confirmation",
    tech_stack: ["Python", "TradingView"],
    strategies: ["TTFM Fractal Model"],
  },
];
