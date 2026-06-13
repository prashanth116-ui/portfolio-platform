// ── Content Block Types ────────────────────────────────────────────

export interface StatItem {
  label: string;
  value: string;
  subtitle?: string;
}

export interface GapDimension {
  name: string;
  score: number; // 1-10
}

export interface Gap {
  rank: number;
  name: string;
  score: number; // composite 1-10
  summary: string;
  dimensions: GapDimension[];
  addressableMarket?: string;
  timeWindow?: string;
}

export interface Competitor {
  name: string;
  category: string;
  description: string;
  funding?: string;
  stage?: string;
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
  sections: ContentBlock[];
}

// ── Stablecoin Research Data ───────────────────────────────────────

export const researchContent: Record<string, ResearchContent> = {
  stablecoin_research: {
    projectId: "stablecoin_research",
    subtitle: "Deep market audit cross-referenced across 150+ sources",
    date: "June 2026",
    sections: [
      // ── Executive Summary ──
      {
        type: "stats",
        title: "Executive Summary",
        items: [
          { label: "Total Market Cap", value: "$235B+", subtitle: "June 2026" },
          { label: "Monthly Volume", value: "$4.1T+", subtitle: "On-chain transfers" },
          { label: "VC Deployed", value: "$2.8B+", subtitle: "2025-2026 stablecoin infra" },
          { label: "Gaps Identified", value: "7", subtitle: "Rated & ranked" },
          { label: "Competitors Mapped", value: "40+", subtitle: "Across all categories" },
          { label: "Top Opportunity Score", value: "8.7/10", subtitle: "Merchant checkout SDK" },
        ],
      },

      // ── Rated Opportunities ──
      {
        type: "gaps",
        title: "Rated Opportunities",
        items: [
          {
            rank: 1,
            name: "Merchant Checkout SDK",
            score: 8.7,
            summary:
              "No Stripe-simple checkout for stablecoin payments. Merchants want 3-line integration, instant settlement, and fiat off-ramp — nobody offers all three today.",
            addressableMarket: "$45B+",
            timeWindow: "12-18 months",
            dimensions: [
              { name: "Opportunity", score: 9 },
              { name: "Feasibility", score: 8 },
              { name: "Timing", score: 9 },
              { name: "Competition", score: 9 },
              { name: "Capital Req.", score: 8 },
            ],
          },
          {
            rank: 2,
            name: "Off-Ramp Aggregation",
            score: 8.2,
            summary:
              "Fiat off-ramps are fragmented across 20+ providers with inconsistent KYC, fees (1-5%), and settlement times (instant to 5 days). An aggregator that routes optimally by jurisdiction + amount would capture significant flow.",
            addressableMarket: "$12B+",
            timeWindow: "12 months",
            dimensions: [
              { name: "Opportunity", score: 9 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 9 },
              { name: "Competition", score: 8 },
              { name: "Capital Req.", score: 8 },
            ],
          },
          {
            rank: 3,
            name: "Compliance-as-a-Service",
            score: 8.0,
            summary:
              "GENIUS Act (signed Jul 2025) and MiCA (EU Jul 2026) create mandatory compliance burdens. No turnkey middleware exists for stablecoin issuers and payment apps to handle reserve reporting, travel rule, and sanctions screening.",
            addressableMarket: "$8B+",
            timeWindow: "18 months",
            dimensions: [
              { name: "Opportunity", score: 8 },
              { name: "Feasibility", score: 8 },
              { name: "Timing", score: 9 },
              { name: "Competition", score: 7 },
              { name: "Capital Req.", score: 8 },
            ],
          },
          {
            rank: 4,
            name: "Yield Aggregation Layer",
            score: 7.8,
            summary:
              "DeFi yields on stablecoins range 2-12% across 50+ protocols, but there's no unified routing layer that auto-allocates by risk/return profile with institutional-grade reporting.",
            addressableMarket: "$6B+",
            timeWindow: "12 months",
            dimensions: [
              { name: "Opportunity", score: 8 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 8 },
              { name: "Competition", score: 8 },
              { name: "Capital Req.", score: 8 },
            ],
          },
          {
            rank: 5,
            name: "AI Agent Payment Rails",
            score: 7.5,
            summary:
              "AI agents need programmable payment infrastructure: escrow, micropayments, usage-based billing, and autonomous wallet management. Current solutions are ad-hoc.",
            addressableMarket: "$4B+",
            timeWindow: "24 months",
            dimensions: [
              { name: "Opportunity", score: 9 },
              { name: "Feasibility", score: 6 },
              { name: "Timing", score: 7 },
              { name: "Competition", score: 8 },
              { name: "Capital Req.", score: 7 },
            ],
          },
          {
            rank: 6,
            name: "Dispute Resolution Protocol",
            score: 7.2,
            summary:
              "Stablecoin payments lack chargeback and dispute mechanisms. A smart-contract escrow layer with arbitration would unlock e-commerce adoption for merchants concerned about fraud.",
            addressableMarket: "$3B+",
            timeWindow: "18 months",
            dimensions: [
              { name: "Opportunity", score: 7 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 8 },
              { name: "Competition", score: 8 },
              { name: "Capital Req.", score: 6 },
            ],
          },
          {
            rank: 7,
            name: "Non-USD Stablecoins",
            score: 6.8,
            summary:
              "99% of stablecoin market cap is USD-denominated. EUR, GBP, BRL, and INR stablecoins have thin liquidity and limited on/off-ramp support — opportunity in emerging market corridors.",
            addressableMarket: "$2B+",
            timeWindow: "24+ months",
            dimensions: [
              { name: "Opportunity", score: 7 },
              { name: "Feasibility", score: 6 },
              { name: "Timing", score: 7 },
              { name: "Competition", score: 7 },
              { name: "Capital Req.", score: 7 },
            ],
          },
        ],
      },

      // ── Competitor Landscape ──
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
          // Checkout & Payments
          { name: "Coinbase Commerce", category: "Checkout & Payments", description: "Crypto payment gateway for merchants — limited stablecoin focus, high fees", funding: "$573M+", stage: "Public" },
          { name: "BitPay", category: "Checkout & Payments", description: "Oldest crypto payment processor — supports USDC but clunky UX", funding: "$72M", stage: "Series B" },
          { name: "MoonPay", category: "Checkout & Payments", description: "Fiat on-ramp with checkout widget — no merchant settlement", funding: "$555M", stage: "Series A" },
          { name: "Helio", category: "Checkout & Payments", description: "Solana-native checkout for merchants — small scale, Solana-only", funding: "$3.3M", stage: "Seed" },
          { name: "Coinflow", category: "Checkout & Payments", description: "Stablecoin checkout with instant settlement — early stage", funding: "$1.5M", stage: "Pre-seed" },
          { name: "Sphere", category: "Checkout & Payments", description: "Stablecoin payment API for businesses — API-first approach", funding: "$2.5M", stage: "Seed" },

          // Off-Ramp
          { name: "Ramp Network", category: "Off-Ramp", description: "SDK for fiat on/off-ramp — enterprise focused, limited geography", funding: "$73M", stage: "Series B" },
          { name: "Transak", category: "Off-Ramp", description: "On/off-ramp aggregator — 150+ countries but inconsistent UX", funding: "$26M", stage: "Series A" },
          { name: "Sardine", category: "Off-Ramp", description: "Fraud prevention + on-ramp — compliance-first approach", funding: "$75M", stage: "Series B" },
          { name: "Unlimit", category: "Off-Ramp", description: "Fiat-crypto bridge — strong in LATAM and Asia", funding: "$10M", stage: "Series A" },
          { name: "Onramp Money", category: "Off-Ramp", description: "India-focused on/off-ramp — UPI integration", funding: "$1.6M", stage: "Seed" },
          { name: "Offramp", category: "Off-Ramp", description: "Dedicated fiat off-ramp — low fees, limited coverage", stage: "Seed" },

          // Compliance
          { name: "Chainalysis", category: "Compliance", description: "Blockchain analytics & AML — leader but expensive ($100K+ / yr)", funding: "$536M", stage: "Series F" },
          { name: "Elliptic", category: "Compliance", description: "Crypto compliance & risk — travel rule support, enterprise pricing", funding: "$60M", stage: "Series C" },
          { name: "TRM Labs", category: "Compliance", description: "Blockchain intelligence — fast-growing Chainalysis competitor", funding: "$80M", stage: "Series B" },
          { name: "Notabene", category: "Compliance", description: "Travel rule compliance — VASP-to-VASP messaging", funding: "$28M", stage: "Series B" },
          { name: "Comply Advantage", category: "Compliance", description: "AML/KYC data — not crypto-native but entering space", funding: "$120M", stage: "Series C" },
          { name: "Solidus Labs", category: "Compliance", description: "Market surveillance & compliance — crypto-native", funding: "$45M", stage: "Series B" },

          // Yield
          { name: "Yearn Finance", category: "Yield", description: "DeFi yield aggregator — automated vault strategies", stage: "Decentralized" },
          { name: "Aave", category: "Yield", description: "Lending protocol — large stablecoin deposits, variable rates", stage: "Decentralized" },
          { name: "Compound", category: "Yield", description: "Lending protocol — institutional-grade, lower rates", stage: "Decentralized" },
          { name: "Maple Finance", category: "Yield", description: "Institutional DeFi lending — fixed-rate stablecoin pools", funding: "$15M", stage: "Series B" },
          { name: "Ondo Finance", category: "Yield", description: "Tokenized treasuries + stablecoin yield — RWA-backed", funding: "$34M", stage: "Series A" },
          { name: "Mountain Protocol", category: "Yield", description: "Yield-bearing stablecoin (USDM) — T-bill backed", funding: "$8M", stage: "Seed" },

          // AI Payments
          { name: "Skyfire", category: "AI Payments", description: "AI agent payment infrastructure — USDC-based, early traction", funding: "$9.5M", stage: "Seed" },
          { name: "Payman AI", category: "AI Payments", description: "Payment rail for AI agents — task-based payments", funding: "$3M", stage: "Pre-seed" },
          { name: "Coinbase AgentKit", category: "AI Payments", description: "Developer toolkit for AI agent wallets — limited to Coinbase ecosystem", stage: "Beta" },
          { name: "Circle Programmable Wallets", category: "AI Payments", description: "API-managed wallets for automated flows — not AI-specific", stage: "GA" },
          { name: "NEAR AI", category: "AI Payments", description: "Chain-abstracted AI agent framework — payment rails included", stage: "Beta" },

          // Dispute Resolution
          { name: "Kleros", category: "Dispute Resolution", description: "Decentralized arbitration protocol — crypto-native, small scale", stage: "Decentralized" },
          { name: "Aragon Court", category: "Dispute Resolution", description: "DAO dispute resolution — limited to DAO governance", stage: "Decentralized" },
          { name: "Request Network", category: "Dispute Resolution", description: "Crypto invoicing with basic escrow — no arbitration", funding: "$35M", stage: "ICO" },

          // Non-USD
          { name: "Circle EURC", category: "Non-USD", description: "Euro stablecoin by Circle — MiCA-compliant, growing liquidity", stage: "GA" },
          { name: "Tether EURT", category: "Non-USD", description: "Euro stablecoin by Tether — thin liquidity, uncertain compliance", stage: "GA" },
          { name: "AAVE GHO", category: "Non-USD", description: "Multi-collateral stablecoin — potential for non-USD variants", stage: "Decentralized" },
          { name: "Celo cREAL", category: "Non-USD", description: "Brazilian Real stablecoin — low volume, Celo ecosystem only", stage: "Decentralized" },
          { name: "BRLA Digital", category: "Non-USD", description: "Brazilian Real stablecoin — fiat-backed, growing in LATAM", funding: "$2M", stage: "Seed" },
          { name: "Mento Labs", category: "Non-USD", description: "Multi-currency stablecoins on Celo — cEUR, cBRL", funding: "$10M", stage: "Series A" },
        ],
      },

      // ── Regulatory Landscape ──
      {
        type: "regulations",
        title: "Regulatory Landscape",
        items: [
          {
            name: "GENIUS Act",
            jurisdiction: "United States",
            status: "Signed into law",
            impact:
              "Federal stablecoin framework — requires 1:1 reserves, monthly attestations, and registration for issuers over $10B. Creates a clear regulatory path for payment stablecoins and pre-empts state patchwork.",
            date: "July 2025",
          },
          {
            name: "MiCA (Markets in Crypto-Assets)",
            jurisdiction: "European Union",
            status: "Enforcement deadline Jul 2026",
            impact:
              "Comprehensive crypto regulation — stablecoin issuers need e-money licenses, cap on non-EUR stablecoin transaction volumes, mandatory whitepaper publication. Forces compliance infrastructure buildout.",
            date: "July 2026",
          },
          {
            name: "CLARITY Act",
            jurisdiction: "United States",
            status: "Proposed",
            impact:
              "Would create a rewards loophole allowing stablecoin issuers to offer yield directly to holders — potentially disruptive to traditional savings. If passed, supercharges yield-bearing stablecoin adoption.",
          },
        ],
      },

      // ── Market & VC Data ──
      {
        type: "stats",
        title: "Market & VC Data",
        items: [
          { label: "USDT Market Cap", value: "$145B+", subtitle: "~62% dominance" },
          { label: "USDC Market Cap", value: "$60B+", subtitle: "~26% dominance" },
          { label: "DAI / USDS", value: "$8B+", subtitle: "Decentralized" },
          { label: "Monthly Settlement", value: "$4.1T+", subtitle: "Surpasses Visa" },
          { label: "Active Wallets", value: "30M+", subtitle: "Monthly transacting" },
          { label: "YoY Growth", value: "58%", subtitle: "Market cap 2025 vs 2024" },
          { label: "Bridge Capital (2025)", value: "$1.4B+", subtitle: "Stablecoin infra rounds" },
          { label: "Bridge Capital (2026 YTD)", value: "$1.4B+", subtitle: "Pace accelerating" },
        ],
      },

      // ── Next Steps ──
      {
        type: "list",
        title: "Next Steps",
        items: [
          "Select gap to pursue — Merchant Checkout SDK (8.7/10) is the top-ranked opportunity",
          "Define MVP scope: 3-line checkout widget, USDC settlement, fiat off-ramp to merchant bank",
          "Build technical architecture: smart contract escrow, webhook notifications, merchant dashboard",
          "Identify 5-10 pilot merchants (Shopify stores, SaaS companies with international customers)",
          "Prototype checkout SDK with testnet deployment and sandbox merchant environment",
          "Validate with merchant interviews: willingness to pay, pain points, integration requirements",
          "Estimate unit economics: transaction fees (0.5-1%) vs off-ramp costs vs infrastructure",
          "Assess regulatory requirements under GENIUS Act for payment processor classification",
        ],
      },
    ],
  },
};
