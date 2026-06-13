// ── Content Block Types ────────────────────────────────────────────

export interface StatItem {
  label: string;
  value: string;
  subtitle?: string;
  revised?: string; // shows original value if corrected
}

export interface GapDimension {
  name: string;
  score: number; // 1-10
}

export interface Gap {
  rank: number;
  name: string;
  score: number; // composite 1-10
  originalScore?: number; // pre-validation score
  confidence: "HIGH" | "MEDIUM-HIGH" | "MEDIUM";
  direction: "UP" | "DOWN" | "SAME";
  summary: string;
  dimensions: GapDimension[];
  addressableMarket?: string;
  timeWindow?: string;
  keyChange?: string; // what changed in validation
}

export interface Competitor {
  name: string;
  category: string;
  description: string;
  funding?: string;
  stage?: string;
  isNew?: boolean; // added during validation
}

export interface Regulation {
  name: string;
  jurisdiction: string;
  status: string;
  impact: string;
  date?: string;
}

// Union content block type
export type ContentBlock =
  | { type: "stats"; title: string; items: StatItem[] }
  | { type: "text"; title: string; body: string }
  | { type: "gaps"; title: string; items: Gap[] }
  | { type: "competitors"; title: string; items: Competitor[]; categories: string[] }
  | { type: "regulations"; title: string; items: Regulation[] }
  | { type: "list"; title: string; items: string[] };

export interface ResearchContent {
  projectId: string;
  subtitle: string;
  date: string;
  lastValidated?: string;
  sections: ContentBlock[];
}

// ── Stablecoin Research Data ───────────────────────────────────────
// Validated June 13, 2026 — cross-checked against 80+ sources

export const researchContent: Record<string, ResearchContent> = {
  stablecoin_research: {
    projectId: "stablecoin_research",
    subtitle: "Deep market audit cross-referenced across 150+ sources",
    date: "June 2026",
    lastValidated: "June 13, 2026",
    sections: [
      // ── Executive Summary ──
      {
        type: "stats",
        title: "Executive Summary",
        items: [
          { label: "Total Market Cap", value: "$320B+", subtitle: "June 2026", revised: "was $235B+" },
          { label: "Monthly Volume", value: "$7.2T+", subtitle: "On-chain transfers", revised: "was $4.1T+" },
          { label: "VC Deployed", value: "$2.8B+", subtitle: "2025-2026 stablecoin infra" },
          { label: "Gaps Identified", value: "7", subtitle: "Validated & re-ranked" },
          { label: "Competitors Mapped", value: "70+", subtitle: "Across all categories", revised: "was 40+" },
          { label: "Top Opportunity Score", value: "8.5/10", subtitle: "Compliance-as-a-Service", revised: "was Checkout SDK" },
        ],
      },

      // ── Validated Opportunities (re-ranked) ──
      {
        type: "gaps",
        title: "Validated Opportunities",
        items: [
          {
            rank: 1,
            name: "Compliance-as-a-Service",
            score: 8.5,
            originalScore: 8.0,
            confidence: "HIGH",
            direction: "UP",
            summary:
              "MiCA enforcement deadline July 1, 2026 (days away) and GENIUS Act rulemaking create unavoidable compliance spend. No single vendor covers the full stablecoin compliance stack: reserves audit, sanctions screening, travel rule, freeze/seize capability, and cross-border regulatory reporting.",
            keyChange: "MiCA deadline imminent. Chainalysis valuation halved to ~$4.2B. Elliptic raised $120M Series D for stablecoin analytics. Solidus Labs launched dedicated stablecoin monitoring.",
            addressableMarket: "$8B+",
            timeWindow: "18 months",
            dimensions: [
              { name: "Opportunity", score: 9 },
              { name: "Feasibility", score: 8 },
              { name: "Timing", score: 9 },
              { name: "Competition", score: 7 },
              { name: "Capital Req.", score: 7 },
            ],
          },
          {
            rank: 2,
            name: "Yield Aggregation Layer",
            score: 8.3,
            originalScore: 7.8,
            confidence: "HIGH",
            direction: "UP",
            summary:
              "BlackRock BUIDL ($2.5B AUM) and Fidelity FILQ entered tokenized Treasury yield. Ondo Finance grew 15x to $3B+ TVL. No unified routing layer aggregates institutional-grade products (BUIDL, FILQ) alongside DeFi yield sources (Aave, Pendle, Morpho) with risk-adjusted allocation.",
            keyChange: "Mountain Protocol wound down. BlackRock & Fidelity entry. CLARITY Act 'buy and use' compromise favors active aggregators. TAM revised from $6B+ to $10-15B+.",
            addressableMarket: "$10-15B+",
            timeWindow: "12 months",
            dimensions: [
              { name: "Opportunity", score: 9 },
              { name: "Feasibility", score: 8 },
              { name: "Timing", score: 8 },
              { name: "Competition", score: 7 },
              { name: "Capital Req.", score: 8 },
            ],
          },
          {
            rank: 3,
            name: "AI Agent Payment Middleware",
            score: 8.0,
            originalScore: 7.5,
            confidence: "HIGH",
            direction: "UP",
            summary:
              "Visa, Mastercard, and Stripe all launched competing AI agent payment protocols in Q1-Q2 2026. The rails are being built by incumbents — the startup opportunity shifted from 'build the rails' to 'build the orchestration layer' across x402, MPP, AP4M, and Visa Intelligent Commerce.",
            keyChange: "TAM revised from $4B+ to $8-12B+. Stripe MPP, Mastercard AP4M, Visa+OpenAI all launched. Coinbase x402 hit $600M+ volume. Window compressed from 24mo to 12-18mo. Role shifted from rails to middleware.",
            addressableMarket: "$8-12B+",
            timeWindow: "12-18 months",
            dimensions: [
              { name: "Opportunity", score: 9 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 7 },
              { name: "Competition", score: 6 },
              { name: "Capital Req.", score: 7 },
            ],
          },
          {
            rank: 4,
            name: "Dispute Resolution Protocol",
            score: 7.8,
            originalScore: 7.2,
            confidence: "MEDIUM",
            direction: "UP",
            summary:
              "Circle launched Refund Protocol (Apr 2025) — production, open-source, non-custodial escrow with trustless arbiters. Stripe/Shopify integration created millions of merchant endpoints needing dispute mechanisms. Traditional players (Chargebacks911, Verifi) have NOT entered crypto — confirmed gap.",
            keyChange: "Circle validated space with production protocol. Stripe/Shopify creating merchant base. Near-term TAM $200-500M, growing to $3B+ by 2030 as merchant adoption scales.",
            addressableMarket: "$3B+",
            timeWindow: "18 months",
            dimensions: [
              { name: "Opportunity", score: 8 },
              { name: "Feasibility", score: 8 },
              { name: "Timing", score: 8 },
              { name: "Competition", score: 8 },
              { name: "Capital Req.", score: 7 },
            ],
          },
          {
            rank: 5,
            name: "Non-USD Stablecoins",
            score: 7.8,
            originalScore: 6.8,
            confidence: "MEDIUM-HIGH",
            direction: "UP",
            summary:
              "37 European banks (BNP Paribas, ING, UniCredit, BBVA) formed Qivalis consortium for MiCA-compliant euro stablecoin (H2 2026). Japan's 3 megabanks ($8T+ combined assets) signed MOU for joint yen stablecoin (Mar 2027). SoFi launched first US bank-issued stablecoin (15M users, 4.2% yield).",
            keyChange: "Institutional validation from 37 EU banks + 3 JP megabanks. EURC grew from 17% to 41% of euro stablecoin market. Africa 9.3% adoption rate. Brazil has 6 BRL stablecoins. Current non-USD cap only $533M but trajectory clear.",
            addressableMarket: "$2B+",
            timeWindow: "24+ months",
            dimensions: [
              { name: "Opportunity", score: 8 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 7 },
              { name: "Competition", score: 7 },
              { name: "Capital Req.", score: 7 },
            ],
          },
          {
            rank: 6,
            name: "Off-Ramp Aggregation",
            score: 6.8,
            originalScore: 8.2,
            confidence: "MEDIUM-HIGH",
            direction: "DOWN",
            summary:
              "Stripe/Bridge ($1.1B acquisition) and Mastercard/BVNK ($1.8B) built captive full-stack off-ramp platforms. Onramper launched first pure-play off-ramp aggregator (7+ providers). No dominant independent 'Plaid for off-ramps' exists, but window compressed from 12mo to 6-9mo.",
            keyChange: "$3B+ in incumbent acquisitions. Bridge/Stripe captive to ecosystem. Onramper is closest neutral aggregator but early-stage. MoonPay acquired Iron ($100M). Zero Hash rejected $2B Mastercard offer.",
            addressableMarket: "$12B+",
            timeWindow: "6-9 months",
            dimensions: [
              { name: "Opportunity", score: 7 },
              { name: "Feasibility", score: 6 },
              { name: "Timing", score: 6 },
              { name: "Competition", score: 6 },
              { name: "Capital Req.", score: 7 },
            ],
          },
          {
            rank: 7,
            name: "Merchant Checkout SDK",
            score: 5.5,
            originalScore: 8.7,
            confidence: "HIGH",
            direction: "DOWN",
            summary:
              "Stripe has stablecoin checkout ON BY DEFAULT in 70+ countries at 1.5% flat fee. Mastercard acquired BVNK for $1.8B. Shopify has native USDC on Base in 34 countries. A joint Visa/Mastercard/Stripe stablecoin platform is reportedly forming. The generalist SDK opportunity no longer exists.",
            keyChange: "Window closed. Stripe/Bridge $1.1B, Mastercard/BVNK $1.8B, Shopify USDC live. Only niche opportunities remain: emerging market corridors, cost undercutting, crypto-native verticals.",
            addressableMarket: "$45B+",
            timeWindow: "Closed",
            dimensions: [
              { name: "Opportunity", score: 6 },
              { name: "Feasibility", score: 5 },
              { name: "Timing", score: 3 },
              { name: "Competition", score: 3 },
              { name: "Capital Req.", score: 5 },
            ],
          },
        ],
      },

      // ── Competitor Landscape (expanded) ──
      {
        type: "competitors",
        title: "Competitor Landscape",
        categories: [
          "Checkout & Payments",
          "Off-Ramp",
          "Compliance",
          "Yield",
          "AI Payments",
          "Dispute Resolution",
          "Non-USD",
        ],
        items: [
          // Checkout & Payments (updated)
          { name: "Stripe (Bridge)", category: "Checkout & Payments", description: "Stablecoin checkout ON BY DEFAULT — 70+ countries, 1.5% flat, OCC bank charter", funding: "$1.1B acq.", stage: "Incumbent", isNew: true },
          { name: "Coinbase Commerce", category: "Checkout & Payments", description: "Rebuilt on Onchain Payment Protocol — x402 for AI payments, authorize-and-capture model", funding: "$573M+", stage: "Public" },
          { name: "Eco (Beam)", category: "Checkout & Payments", description: "#1 stablecoin payment provider for startups — intent-routed, 15+ chains, sub-second settlement", funding: "$95M", stage: "Series B", isNew: true },
          { name: "MoonPay + Helio", category: "Checkout & Payments", description: "Acquired Helio ($175M) + Iron ($100M) — full-stack on/off-ramp + merchant checkout", funding: "$555M+", stage: "Series A" },
          { name: "Coinflow", category: "Checkout & Payments", description: "23x revenue growth — 170+ countries, cards/bank in, USDC out, ACH/SEPA/PIX off-ramps", funding: "$25M", stage: "Series A", isNew: true },
          { name: "Sphere", category: "Checkout & Payments", description: "Stablecoin payment API — 160+ markets, EURC/USDC on Base/Ethereum/Solana", funding: "$5M", stage: "Seed" },
          { name: "Shopify + Coinbase", category: "Checkout & Payments", description: "Native USDC on Base — live in 34 countries via Commerce Payments Protocol", stage: "Live", isNew: true },
          { name: "BitPay", category: "Checkout & Payments", description: "Oldest crypto payment processor — supports USDC but losing ground to Stripe", funding: "$72M", stage: "Series B" },
          { name: "Checker", category: "Checkout & Payments", description: "Single API for banks/remittance to stablecoin liquidity — Africa/Asia focus", funding: "$8M", stage: "Seed", isNew: true },

          // Off-Ramp (updated)
          { name: "Bridge (Stripe)", category: "Off-Ramp", description: "Full-stack stablecoin infra — Visa card partnership, 100+ countries planned, OCC charter", funding: "$1.1B acq.", stage: "Incumbent", isNew: true },
          { name: "BVNK (Mastercard)", category: "Off-Ramp", description: "$30B+ annualized volume, 130+ countries — acquired by Mastercard for $1.8B", funding: "$1.8B acq.", stage: "Acquired", isNew: true },
          { name: "Onramper", category: "Off-Ramp", description: "Pure-play off-ramp aggregator — 7+ providers, 46 fiat currencies, 200 countries", stage: "Live", isNew: true },
          { name: "Zero Hash", category: "Off-Ramp", description: "Rejected Mastercard's ~$2B offer — staying independent, seeking new round", stage: "Growth", isNew: true },
          { name: "Transak", category: "Off-Ramp", description: "On/off-ramp — 64+ countries, 11 US state licenses, Tether-backed $16M raise", funding: "$37M", stage: "Series A" },
          { name: "Sardine", category: "Off-Ramp", description: "Fraud prevention + on-ramp — ARR up 130%, $70M Series C", funding: "$145M", stage: "Series C" },
          { name: "Ramp Network", category: "Off-Ramp", description: "SDK for fiat on/off-ramp — enterprise focused", funding: "$73M", stage: "Series B" },
          { name: "Eco", category: "Off-Ramp", description: "Intent-routed liquidity — onchain bridges + offchain market makers, 15 chains", funding: "$95M", stage: "Series B", isNew: true },

          // Compliance (updated)
          { name: "Chainalysis", category: "Compliance", description: "Leader but valuation halved (~$4.2B). Acquired Alterya ($150M), Hexagate ($60M), Nash", funding: "$536M", stage: "Series F" },
          { name: "Elliptic", category: "Compliance", description: "Raised $120M Series D (May 2026) for stablecoin analytics — Nasdaq + Deutsche Bank backed", funding: "$180M+", stage: "Series D", isNew: true },
          { name: "TRM Labs", category: "Compliance", description: "Found $141B in illicit stablecoin flows (2025). Referenced by NYDFS for banks", funding: "$80M", stage: "Series B" },
          { name: "Solidus Labs", category: "Compliance", description: "Dedicated stablecoin monitoring — full-lifecycle compliance, agentic AI for surveillance", funding: "$45M", stage: "Series B" },
          { name: "Notabene", category: "Compliance", description: "Travel Rule — launched TAP open standard, referenced in US Treasury March 2026 report", funding: "$28M", stage: "Series B" },
          { name: "ComplyAdvantage", category: "Compliance", description: "AML/KYC data — broadly focused, limited stablecoin-specific products", funding: "$120M", stage: "Series C" },

          // Yield (updated)
          { name: "BlackRock BUIDL", category: "Yield", description: "Tokenized Treasury fund — $2.5B AUM, Moody's Aaa-mf rating, DeFi-integrated", stage: "Institutional", isNew: true },
          { name: "Fidelity FILQ / FIDD", category: "Yield", description: "Tokenized Treasury fund + stablecoin — Moody's Aaa-mf, 24/7 stablecoin redemption", stage: "Institutional", isNew: true },
          { name: "Ondo Finance", category: "Yield", description: "USDY $740M outstanding at 4.65% APY — 15x TVL growth to $3B+, J.P. Morgan pilot", funding: "$34M", stage: "Series A" },
          { name: "Pendle Finance", category: "Yield", description: "Tokenized yield — $8.27B peak TVL, 50%+ of DeFi yield-sector TVL, 240% YTD growth", stage: "Decentralized", isNew: true },
          { name: "Morpho Blue", category: "Yield", description: "Modular lending layer — $4.9B TVL, between Aave and Compound", stage: "Decentralized", isNew: true },
          { name: "Spark Protocol", category: "Yield", description: "Sky/Maker lending arm — $6.8B TVL, stUSDS vault with Pendle", stage: "Decentralized", isNew: true },
          { name: "Aave V4", category: "Yield", description: "Largest DeFi lending — $19.4B TVL, GHO stablecoin $583M market cap", stage: "Decentralized" },
          { name: "Maple Finance", category: "Yield", description: "Institutional DeFi lending — $2.1B TVL (10x growth), syrupUSDC yield-bearing stablecoin", funding: "$15M", stage: "Series B" },
          { name: "Yearn Finance", category: "Yield", description: "yvUSD V3 cross-chain vault — zero fees, launched Jan 2026", stage: "Decentralized" },
          { name: "Compound V3", category: "Yield", description: "Lending protocol — $2.7B TVL, expanding to 4-6 new chains", stage: "Decentralized" },

          // AI Payments (updated)
          { name: "Stripe MPP", category: "AI Payments", description: "Machine Payments Protocol — enterprise-first, $5B Tempo blockchain, 100+ services", stage: "Live", isNew: true },
          { name: "Mastercard AP4M", category: "AI Payments", description: "Agent Pay for Machines — on-chain credentials, micropayments, 31 launch partners", stage: "Live", isNew: true },
          { name: "Visa + OpenAI", category: "AI Payments", description: "Intelligent Commerce — tokenized credentials, fraud monitoring, user-defined guardrails", stage: "Live", isNew: true },
          { name: "Circle Agent Stack", category: "AI Payments", description: "Nanopayments ($0.000001 USDC), gas-free, Agent Wallets + CLI + Marketplace", stage: "Live", isNew: true },
          { name: "Coinbase x402", category: "AI Payments", description: "$600M+ volume, 500K wallets, 69K agents — HTTP-native payments, ChatGPT/Claude integration", stage: "Live" },
          { name: "Skyfire", category: "AI Payments", description: "AI agent payment network — USDC-based, Visa/F5 partnerships", funding: "$11M", stage: "Seed" },
          { name: "Payman AI", category: "AI Payments", description: "Banking transaction automation for AI agents — Visa investor", funding: "$13.8M", stage: "Series A" },
          { name: "Nevermined", category: "AI Payments", description: "Multi-protocol support (x402, A2A, MCP) — Visa Intelligent Commerce integrated", stage: "Live", isNew: true },
          { name: "Google A2A", category: "AI Payments", description: "Agent-to-Agent protocol — Google Pay integration, PayPal planned", stage: "Live", isNew: true },
          { name: "NEAR AI", category: "AI Payments", description: "Decentralized AI Agent Market — NEAR Intents for multi-step agent strategies", stage: "Live" },

          // Dispute Resolution (updated)
          { name: "Circle Refund Protocol", category: "Dispute Resolution", description: "Non-custodial smart contract escrow — trustless arbiters, open-source, production-grade", stage: "Live", isNew: true },
          { name: "Coinbase Commerce", category: "Dispute Resolution", description: "Built-in on-chain escrow — conditional release + automatic refund logic", stage: "Live", isNew: true },
          { name: "Kleros 2.0", category: "Dispute Resolution", description: "Decentralized arbitration — deployed on Arbitrum, Certora audit underway", stage: "Beta" },
          { name: "RebelFi", category: "Dispute Resolution", description: "Smart escrow for marketplaces — milestone-based payments, delivery confirmation", stage: "Seed", isNew: true },
          { name: "Request Network", category: "Dispute Resolution", description: "Crypto invoicing — $1.2B+ platform volume, 88% stablecoin, basic escrow", funding: "$35M", stage: "ICO" },
          { name: "Mural Pay", category: "Dispute Resolution", description: "LATAM corridor specialist — chargeback risk on stablecoin pay-ins for Colombia/Mexico", stage: "Seed", isNew: true },

          // Non-USD (updated)
          { name: "Qivalis Consortium", category: "Non-USD", description: "37 European banks (BNP Paribas, ING, UniCredit, BBVA) — MiCA-compliant EUR stablecoin H2 2026", stage: "Pre-launch", isNew: true },
          { name: "Japan Megabanks", category: "Non-USD", description: "MUFG + Mizuho + SMBC ($8T+ assets) — joint JPY stablecoin on Progmat, March 2027 target", stage: "MOU signed", isNew: true },
          { name: "SoFiUSD", category: "Non-USD", description: "First US bank-issued stablecoin — 15M users, 4.2% yield, Ethereum + Solana", stage: "Live", isNew: true },
          { name: "Circle EURC", category: "Non-USD", description: "Euro stablecoin — grew from 17% to 41% of EUR stablecoin market, MiCA-compliant", stage: "Live" },
          { name: "BRLA Digital", category: "Non-USD", description: "Brazilian Real — $400M/mo transfer volume, PIX integrated, growing in LATAM", funding: "$2M", stage: "Seed" },
          { name: "Mento Labs", category: "Non-USD", description: "8 currency stablecoins — cKES, cCOP, PUSO, cGHS + others, 1.2M monthly active users", funding: "$10M", stage: "Series A" },
          { name: "JPYC", category: "Non-USD", description: "Japan's first legally recognized yen stablecoin — launched Oct 2025", stage: "Live", isNew: true },
          { name: "B3 Exchange (Brazil)", category: "Non-USD", description: "Brazilian stock exchange launching BRL-pegged stablecoin + tokenization platform", stage: "Pre-launch", isNew: true },
        ],
      },

      // ── Regulatory Landscape (updated) ──
      {
        type: "regulations",
        title: "Regulatory Landscape",
        items: [
          {
            name: "GENIUS Act",
            jurisdiction: "United States",
            status: "Signed into law",
            impact:
              "Federal stablecoin framework — 1:1 reserves, BSA compliance, monthly audits, CEO/CFO attestation, freeze/seize capability. Only permitted entities may issue payment stablecoins. OCC published NPRM March 2026, regulations due July 18, 2026.",
            date: "July 18, 2025",
          },
          {
            name: "MiCA (Markets in Crypto-Assets)",
            jurisdiction: "European Union",
            status: "Full enforcement July 1, 2026",
            impact:
              "Stablecoin issuers need e-money licenses, 1:1 liquid asset backing, redemption at par. ESMA authorization deadline forces compliance or delisting. MiCA + GENIUS Act create incompatible dual compliance regimes — doubling demand for compliance tooling.",
            date: "July 1, 2026",
          },
          {
            name: "CLARITY Act",
            jurisdiction: "United States",
            status: "Senate Banking markup May 2026",
            impact:
              "Passed House July 2025 (294-134). May 2026 compromise: bans yield equivalent to bank deposits but allows 'bona fide activities.' Forces 'buy and use' model — favors active yield aggregators over passive Treasury-backed stablecoins.",
            date: "May 2026",
          },
          {
            name: "FinCEN/OFAC Stablecoin NPRM",
            jurisdiction: "United States",
            status: "Proposed April 2026",
            impact:
              "AML/sanctions rules specifically for stablecoin issuers under GENIUS Act. Requires enhanced due diligence, transaction monitoring, and sanctions screening for all stablecoin flows.",
            date: "April 2026",
          },
          {
            name: "FATF Travel Rule",
            jurisdiction: "Global (50+ jurisdictions)",
            status: "Enacted but 59% not enforcing",
            impact:
              "VASP-to-VASP information sharing for transfers. Enforced in EU (Dec 2024), US (FinCEN), UK. 50+ jurisdictions enacted legislation but enforcement is lagging — creates compliance uncertainty.",
          },
        ],
      },

      // ── Market & VC Data (corrected) ──
      {
        type: "stats",
        title: "Market & VC Data",
        items: [
          { label: "USDT Market Cap", value: "$188B+", subtitle: "~59% dominance", revised: "was $145B+" },
          { label: "USDC Market Cap", value: "$75B+", subtitle: "~24% dominance", revised: "was $60B+" },
          { label: "PYUSD (PayPal)", value: "$4.1B", subtitle: "680% YoY growth — 70 markets", revised: "not tracked" },
          { label: "RLUSD (Ripple)", value: "$1.78B", subtitle: "Deutsche Bank, JPMorgan partners", revised: "not tracked" },
          { label: "Monthly Settlement", value: "$7.2T+", subtitle: "Surpasses US ACH network", revised: "was $4.1T+" },
          { label: "Active Wallets", value: "10M+ daily", subtitle: "150M+ nonzero balances", revised: "was 30M+/mo" },
          { label: "YoY Growth", value: "~49%", subtitle: "Market cap 2025 vs 2024", revised: "was 58%" },
          { label: "VC Deployed (2025-26)", value: "$2.8B+", subtitle: "Rain $338M, Elliptic $120M lead rounds" },
        ],
      },

      // ── Key M&A (new section) ──
      {
        type: "stats",
        title: "Key M&A Activity",
        items: [
          { label: "Stripe / Bridge", value: "$1.1B", subtitle: "Feb 2025 — stablecoin infra" },
          { label: "Mastercard / BVNK", value: "$1.8B", subtitle: "Mar 2026 — 130+ country settlement" },
          { label: "MoonPay / Helio", value: "$175M", subtitle: "Jan 2025 — merchant checkout" },
          { label: "MoonPay / Iron", value: "~$100M", subtitle: "Mar 2025 — settlement APIs" },
          { label: "Chainalysis / Alterya", value: "~$150M", subtitle: "Jan 2025 — AI fraud detection" },
          { label: "Elliptic Series D", value: "$120M", subtitle: "May 2026 — stablecoin analytics at $670M val" },
        ],
      },

      // ── Next Steps (updated) ──
      {
        type: "list",
        title: "Next Steps",
        items: [
          "Compliance-as-a-Service (8.5/10) is the new top-ranked opportunity — MiCA deadline creates immediate demand",
          "Yield Aggregation (8.3/10) strengthened by BlackRock/Fidelity entry — institutional + DeFi routing layer",
          "AI Agent Middleware (8.0/10) — build orchestration across x402, MPP, AP4M protocols, not the rails",
          "Merchant Checkout SDK (5.5/10) — window closed; Stripe has it on by default in 70+ countries",
          "Deep-dive the top 3: competitive moat analysis, MVP scope, unit economics, regulatory requirements",
          "Validate with 5-10 potential customers: stablecoin issuers (compliance), DeFi protocols (yield), AI companies (middleware)",
          "Assess build vs. integrate strategy — compliance middleware vs. yield aggregation have different capital profiles",
        ],
      },
    ],
  },
};
