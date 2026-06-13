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
// Round 2 deep-dive validated June 13, 2026 — top 3 gaps re-validated against 200+ sources

export const researchContent: Record<string, ResearchContent> = {
  stablecoin_research: {
    projectId: "stablecoin_research",
    subtitle: "Multi-round market audit with deep-dive validation across 300+ sources",
    date: "June 2026",
    lastValidated: "June 13, 2026 (Round 2: Deep-Dive)",
    sections: [
      // ── Executive Summary ──
      {
        type: "stats",
        title: "Executive Summary",
        items: [
          { label: "Total Market Cap", value: "$320B+", subtitle: "June 2026", revised: "was $235B+" },
          { label: "Monthly Volume", value: "$7.2T+", subtitle: "On-chain transfers", revised: "was $4.1T+" },
          { label: "VC Deployed", value: "$2.8B+", subtitle: "2025-2026 stablecoin infra" },
          { label: "Gaps Identified", value: "7", subtitle: "Re-ranked twice after validation" },
          { label: "Deep-Dives Completed", value: "3 of 7", subtitle: "All 3 scored lower after deep-dive" },
          { label: "Top Opportunity", value: "7.8/10", subtitle: "Dispute Resolution (not yet deep-dived)", revised: "was Compliance 8.5" },
          { label: "Competitors Mapped", value: "80+", subtitle: "Across all categories", revised: "was 70+" },
          { label: "Key Pattern", value: "\u22121.7 avg", subtitle: "Deep-dive score drop vs surface audit" },
        ],
      },

      // ── Deep-Dive Methodology ──
      {
        type: "text",
        title: "Deep-Dive Validation (Round 2)",
        body: "Three parallel research agents validated the top 3 ranked opportunities against 200+ web sources using the deep-research methodology (incumbent-first analysis, bear case checks, unit economics validation). All three were significantly downgraded: Compliance-as-a-Service (8.5\u21926.5), Yield Aggregation (8.3\u21926.3), AI Agent Middleware (8.0\u21926.5). The consistent pattern: incumbents are further along than surface-level analysis revealed, existing startups already occupy these niches, and unit economics are thinner than expected. Dispute Resolution Protocol (7.8) and Non-USD Stablecoins (7.8) \u2014 not yet deep-dived \u2014 are now the top-ranked opportunities, but should be treated with skepticism given the pattern.",
      },

      // ── Validated Opportunities (re-ranked after deep-dive) ──
      {
        type: "gaps",
        title: "Validated Opportunities",
        items: [
          {
            rank: 1,
            name: "Dispute Resolution Protocol",
            score: 7.8,
            originalScore: 7.2,
            confidence: "MEDIUM",
            direction: "UP",
            summary:
              "Circle launched Refund Protocol (Apr 2025) \u2014 production, open-source, non-custodial escrow with trustless arbiters. Stripe/Shopify integration created millions of merchant endpoints needing dispute mechanisms. Traditional players (Chargebacks911, Verifi) have NOT entered crypto \u2014 confirmed gap.",
            keyChange: "Circle validated space with production protocol. Stripe/Shopify creating merchant base. Near-term TAM $200-500M, growing to $3B+ by 2030. [Not yet deep-dived \u2014 score may drop]",
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
            rank: 2,
            name: "Non-USD Stablecoins",
            score: 7.8,
            originalScore: 6.8,
            confidence: "MEDIUM-HIGH",
            direction: "UP",
            summary:
              "37 European banks (BNP Paribas, ING, UniCredit, BBVA) formed Qivalis consortium for MiCA-compliant euro stablecoin (H2 2026). Japan\u2019s 3 megabanks ($8T+ combined assets) signed MOU for joint yen stablecoin (Mar 2027). SoFi launched first US bank-issued stablecoin (15M users, 4.2% yield).",
            keyChange: "Institutional validation from 37 EU banks + 3 JP megabanks. EURC grew from 17% to 41% of euro stablecoin market. Africa 9.3% adoption rate. [Not yet deep-dived \u2014 score may drop]",
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
            rank: 3,
            name: "Off-Ramp Aggregation",
            score: 6.8,
            originalScore: 8.2,
            confidence: "MEDIUM-HIGH",
            direction: "DOWN",
            summary:
              "Stripe/Bridge ($1.1B acquisition) and Mastercard/BVNK ($1.8B) built captive full-stack off-ramp platforms. Onramper launched first pure-play off-ramp aggregator (7+ providers). No dominant independent \u2018Plaid for off-ramps\u2019 exists, but window compressed from 12mo to 6-9mo.",
            keyChange: "$3B+ in incumbent acquisitions. Bridge/Stripe captive to ecosystem. Onramper is closest neutral aggregator but early-stage. [Not yet deep-dived \u2014 score may drop]",
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
            rank: 4,
            name: "Compliance-as-a-Service",
            score: 6.5,
            originalScore: 8.5,
            confidence: "HIGH",
            direction: "DOWN",
            summary:
              "Regulatory tailwind confirmed \u2014 MiCA enforcing July 1, GENIUS Act rules due July 18, FinCEN/OFAC NPRM proposed. But Chainalysis/Elliptic/TRM Labs control ~70% of enterprise compliance with massive data moats. Chainalysis partnered with Chainlink for at-execution enforcement (Q2 2026). Elliptic raised $120M specifically for stablecoin monitoring. Only ~17 licensed EU stablecoin issuers \u2014 narrow customer base. Entropy (a16z-backed) shut down with $25M raised.",
            keyChange: "Deep-dive revealed incumbents aggressively pivoting: Elliptic $120M Series D at $670M, TRM Labs $70M at $1B, Chainalysis/Chainlink ACE partnership. Gap is real but narrow: multi-jurisdictional orchestration for issuers, not general compliance.",
            addressableMarket: "$1.2-2.2B",
            timeWindow: "18 months",
            dimensions: [
              { name: "Opportunity", score: 8 },
              { name: "Feasibility", score: 6 },
              { name: "Timing", score: 8 },
              { name: "Competition", score: 4 },
              { name: "Capital Req.", score: 5 },
            ],
          },
          {
            rank: 5,
            name: "AI Agent Payment Middleware",
            score: 6.5,
            originalScore: 8.0,
            confidence: "HIGH",
            direction: "DOWN",
            summary:
              "6+ competing protocols (x402, MPP, ACP, AP2, AP4M, Visa IC) create real fragmentation, but Crossmint ($23.6M raised, 40K developers, 1,100% revenue growth) and Nevermined (1.38M transactions) already build multi-protocol middleware. x402 moved to Linux Foundation with backing from Google, Microsoft, AWS, Visa, Stripe, Mastercard \u2014 may converge to one standard. Stripe running dual-track (ACP + MPP + x402) means incumbents ARE the middleware. Unit economics thin on sub-cent micropayments.",
            keyChange: "Deep-dive found Crossmint and Nevermined already occupy this exact niche. x402 convergence under Linux Foundation may eliminate middleware need. Stripe\u2019s dual-track strategy = incumbent as middleware. Nevermined\u2019s 1.38M tx at $0.001 = ~$1,380 revenue \u2014 unit economics don\u2019t work without SaaS layer.",
            addressableMarket: "$5-50M (middleware) / $8-12B (total agent payments)",
            timeWindow: "12-18 months",
            dimensions: [
              { name: "Opportunity", score: 7 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 6 },
              { name: "Competition", score: 4 },
              { name: "Capital Req.", score: 5 },
            ],
          },
          {
            rank: 6,
            name: "Yield Aggregation Layer",
            score: 6.3,
            originalScore: 8.3,
            confidence: "HIGH",
            direction: "DOWN",
            summary:
              "Veda (BoringVault) has $3.7B TVL powering Kraken DeFi Earn with ~100 lines of code and near-zero fees. Gauntlet manages $2B+ in risk-curated Morpho vaults. Yearn yvUSD launched cross-chain zero-fee aggregation. ERC-4626 standardization commoditizes vault integration. April 2026 was worst DeFi hack month ($635M) \u2014 aggregation multiplies attack surface. CLARITY Act ambiguity on \u2018activity-based\u2019 yield adds regulatory risk. The standalone yield aggregator window has largely closed.",
            keyChange: "Deep-dive found Veda ($3.7B TVL, $18M raised, powers Kraken), Gauntlet ($2B+), and Yearn yvUSD already dominate. ERC-4626 commoditizes integration. Zero-fee competition. On $100M TVL at 10-20 bps, revenue is only $100K-200K/year \u2014 not VC-scale.",
            addressableMarket: "$35B addressable capital / $1.75-7M revenue at scale",
            timeWindow: "Window largely closed",
            dimensions: [
              { name: "Opportunity", score: 7 },
              { name: "Feasibility", score: 7 },
              { name: "Timing", score: 5 },
              { name: "Competition", score: 4 },
              { name: "Capital Req.", score: 6 },
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

      // ── Competitor Landscape (expanded with deep-dive discoveries) ──
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
          { name: "Stripe (Bridge)", category: "Checkout & Payments", description: "Stablecoin checkout ON BY DEFAULT \u2014 70+ countries, 1.5% flat, OCC bank charter", funding: "$1.1B acq.", stage: "Incumbent", isNew: true },
          { name: "Coinbase Commerce", category: "Checkout & Payments", description: "Rebuilt on Onchain Payment Protocol \u2014 x402 for AI payments, authorize-and-capture model", funding: "$573M+", stage: "Public" },
          { name: "Eco (Beam)", category: "Checkout & Payments", description: "#1 stablecoin payment provider for startups \u2014 intent-routed, 15+ chains, sub-second settlement", funding: "$95M", stage: "Series B", isNew: true },
          { name: "MoonPay + Helio", category: "Checkout & Payments", description: "Acquired Helio ($175M) + Iron ($100M) \u2014 full-stack on/off-ramp + merchant checkout", funding: "$555M+", stage: "Series A" },
          { name: "Coinflow", category: "Checkout & Payments", description: "23x revenue growth \u2014 170+ countries, cards/bank in, USDC out, ACH/SEPA/PIX off-ramps", funding: "$25M", stage: "Series A", isNew: true },
          { name: "Sphere", category: "Checkout & Payments", description: "Stablecoin payment API \u2014 160+ markets, EURC/USDC on Base/Ethereum/Solana", funding: "$5M", stage: "Seed" },
          { name: "Shopify + Coinbase", category: "Checkout & Payments", description: "Native USDC on Base \u2014 live in 34 countries via Commerce Payments Protocol", stage: "Live", isNew: true },
          { name: "BitPay", category: "Checkout & Payments", description: "Oldest crypto payment processor \u2014 supports USDC but losing ground to Stripe", funding: "$72M", stage: "Series B" },
          { name: "Checker", category: "Checkout & Payments", description: "Single API for banks/remittance to stablecoin liquidity \u2014 Africa/Asia focus", funding: "$8M", stage: "Seed", isNew: true },

          // Off-Ramp
          { name: "Bridge (Stripe)", category: "Off-Ramp", description: "Full-stack stablecoin infra \u2014 Visa card partnership, 100+ countries planned, OCC charter", funding: "$1.1B acq.", stage: "Incumbent", isNew: true },
          { name: "BVNK (Mastercard)", category: "Off-Ramp", description: "$30B+ annualized volume, 130+ countries \u2014 acquired by Mastercard for $1.8B", funding: "$1.8B acq.", stage: "Acquired", isNew: true },
          { name: "Onramper", category: "Off-Ramp", description: "Pure-play off-ramp aggregator \u2014 7+ providers, 46 fiat currencies, 200 countries", stage: "Live", isNew: true },
          { name: "Zero Hash", category: "Off-Ramp", description: "Rejected Mastercard\u2019s ~$2B offer \u2014 staying independent, seeking new round", stage: "Growth", isNew: true },
          { name: "Transak", category: "Off-Ramp", description: "On/off-ramp \u2014 64+ countries, 11 US state licenses, Tether-backed $16M raise", funding: "$37M", stage: "Series A" },
          { name: "Sardine", category: "Off-Ramp", description: "Fraud prevention + on-ramp \u2014 ARR up 130%, $70M Series C", funding: "$145M", stage: "Series C" },
          { name: "Ramp Network", category: "Off-Ramp", description: "SDK for fiat on/off-ramp \u2014 enterprise focused", funding: "$73M", stage: "Series B" },
          { name: "Eco", category: "Off-Ramp", description: "Intent-routed liquidity \u2014 onchain bridges + offchain market makers, 15 chains", funding: "$95M", stage: "Series B", isNew: true },

          // Compliance
          { name: "Chainalysis", category: "Compliance", description: "Leader but valuation halved (~$2.5B implied). Partnered with Chainlink for at-execution enforcement (ACE). 1,500+ clients, ~70% market share", funding: "$536M", stage: "Series F" },
          { name: "Elliptic", category: "Compliance", description: "$120M Series D (May 2026) at $670M \u2014 explicitly targeting $33T stablecoin volume. Screens 1B+ tx/week, 700+ customers, 100+ blockchains", funding: "$180M+", stage: "Series D", isNew: true },
          { name: "TRM Labs", category: "Compliance", description: "$70M Series C (Feb 2026) at $1B valuation \u2014 150%+ annual revenue growth. DOD, FBI, IRS clients", funding: "$220M", stage: "Series C", isNew: true },
          { name: "Solidus Labs", category: "Compliance", description: "Full-lifecycle stablecoin monitoring \u2014 fiat deposits, mint/burn, on-chain transfers, secondary market. Most stablecoin-specific product", funding: "$68-83M", stage: "Series B" },
          { name: "Notabene", category: "Compliance", description: "Travel Rule TAP protocol \u2014 2,000+ institutions. Launched Notabene Flow (Sept 2025) for B2B stablecoin payments authorization", funding: "$26.6M", stage: "Series B" },
          { name: "ComplyAdvantage", category: "Compliance", description: "AML/KYC data \u2014 broadly focused, limited stablecoin-specific products", funding: "$120M", stage: "Series C" },
          { name: "Merkle Science", category: "Compliance", description: "MiCAR compliance certification for stablecoin issuers \u2014 active in stablecoin-specific oversight", stage: "Growth", isNew: true },

          // Yield (expanded with aggregators)
          { name: "Veda (BoringVault)", category: "Yield", description: "$3.7B TVL vault infrastructure \u2014 powers Kraken DeFi Earn. ~100 lines of code, minimal attack surface, near-zero fees", funding: "$18M", stage: "Series A", isNew: true },
          { name: "Gauntlet", category: "Yield", description: "$2B+ in risk-curated Morpho/Drift/Kamino vaults \u2014 7-year track record, Prime/Core/Frontier risk tiers", funding: "$50M+", stage: "Growth", isNew: true },
          { name: "BlackRock BUIDL", category: "Yield", description: "Tokenized Treasury fund \u2014 $2.5B AUM, Moody\u2019s Aaa-mf rating, tradable on UniswapX since Feb 2026", stage: "Institutional", isNew: true },
          { name: "Fidelity FILQ", category: "Yield", description: "Tokenized Treasury fund (May 2026) \u2014 Moody\u2019s Aaa-mf, Chainlink-powered, 24/7 stablecoin settlement", stage: "Institutional", isNew: true },
          { name: "Ondo Finance", category: "Yield", description: "USDY+OUSG $3.5B combined TVL \u2014 J.P. Morgan pilot, $200M SWEEP fund with State Street", funding: "$34M", stage: "Series A" },
          { name: "Pendle Finance", category: "Yield", description: "~$5B TVL \u2014 50-60% of DeFi yield-sector TVL, yield tokenization (PT/YT), stUSDS pool launched", stage: "Decentralized", isNew: true },
          { name: "Morpho Blue", category: "Yield", description: "Modular lending \u2014 $4.9-6.8B TVL, 200+ markets, curated by Gauntlet/Bitwise/Steakhouse", stage: "Decentralized", isNew: true },
          { name: "Spark Protocol", category: "Yield", description: "Sky/Maker lending arm \u2014 $6.4B Savings + $3.6B SparkLend, $2.6B Liquidity Layer", stage: "Decentralized", isNew: true },
          { name: "Aave V4", category: "Yield", description: "Largest DeFi lending \u2014 $14.5B TVL, GHO $584M supply with sGHO yield-bearing version", stage: "Decentralized" },
          { name: "Maple Finance", category: "Yield", description: "Institutional DeFi lending \u2014 $2.1B TVL (10x growth), syrupUSDC yield-bearing stablecoin", funding: "$15M", stage: "Series B" },
          { name: "Yearn Finance", category: "Yield", description: "yvUSD V3 cross-chain vault \u2014 zero fees, 9 strategies, ERC-4626 compliant", stage: "Decentralized" },
          { name: "Ethena", category: "Yield", description: "USDe/sUSDe $5.5-6B supply \u2014 3.7-11.8% variable yield, funding-rate dependent, largest synthetic dollar", stage: "Decentralized", isNew: true },
          { name: "Circle/Hashnote (USYC)", category: "Yield", description: "Largest tokenized MMF \u2014 ~$2.2B AUM, acquired by Circle Jan 2025", stage: "Institutional", isNew: true },
          { name: "Franklin Templeton BENJI", category: "Yield", description: "First US-registered tokenized mutual fund \u2014 $1.98B AUM, 5-year track record, 8 chains", stage: "Institutional", isNew: true },
          { name: "Superstate USTB", category: "Yield", description: "~$967M AUM \u2014 Invesco taking over portfolio mgmt Q2 2026, Spark Grand Prix winner", stage: "Institutional", isNew: true },

          // AI Payments (expanded with deep-dive discoveries)
          { name: "Crossmint", category: "AI Payments", description: "Multi-protocol middleware \u2014 x402 + Visa IC + AP4M + ACP + AP2. 40K developers, 1,100% revenue growth. The leading middleware player", funding: "$23.6M", stage: "Series A", isNew: true },
          { name: "Stripe MPP + ACP", category: "AI Payments", description: "Dual-track: MPP on Tempo blockchain ($0.0001/req) + ACP with OpenAI/Meta. Also supports x402. 100+ services", stage: "Live", isNew: true },
          { name: "Mastercard AP4M", category: "AI Payments", description: "Agent Pay for Machines (launched June 10, 2026) \u2014 on-chain credentials on Polygon/Solana/Base, 31 partners incl. Coinbase/Stripe/Aave", stage: "Live", isNew: true },
          { name: "Visa + OpenAI", category: "AI Payments", description: "Intelligent Commerce (June 2026) \u2014 tokenized credentials bound to agents, spending limits, 100+ partners. Trusted Agent Protocol on GitHub", stage: "Live", isNew: true },
          { name: "Circle Agent Stack", category: "AI Payments", description: "Nanopayments ($0.000001 USDC), gas-free \u2014 Agent Wallets + CLI + Marketplace. Launched May 2026", stage: "Live", isNew: true },
          { name: "Coinbase x402", category: "AI Payments", description: "69K agents, 165M+ transactions, ~$600M annualized \u2014 moved to Linux Foundation (Apr 2026) with Google/Microsoft/AWS/Visa/Stripe backing", stage: "Live" },
          { name: "Nevermined", category: "AI Payments", description: "Multi-protocol (x402, A2A, AP2, MCP, Visa IC) \u2014 1.38M transactions, sub-cent micropayments. \u2018PayPal for AI Commerce\u2019", funding: "$7M", stage: "Series A", isNew: true },
          { name: "Skyfire", category: "AI Payments", description: "AI agent payment network \u2014 USDC-based, Visa/F5 partnerships, Consumer Reports pilot", funding: "$9.5M", stage: "Seed" },
          { name: "Payman AI", category: "AI Payments", description: "Agentic banking automation \u2014 voice/text payments for regulated institutions", funding: "$13.8M", stage: "Series A" },
          { name: "Google A2A + AP2", category: "AI Payments", description: "A2A (agent coordination, 150+ orgs, Linux Foundation) + AP2 (payment layer, 60+ partners incl. Mastercard, PayPal, Coinbase)", stage: "Live", isNew: true },
          { name: "NEAR AI", category: "AI Payments", description: "Agent Market (May 2026) \u2014 escrow-based task marketplace with NEAR Intents", stage: "Live" },

          // Dispute Resolution
          { name: "Circle Refund Protocol", category: "Dispute Resolution", description: "Non-custodial smart contract escrow \u2014 trustless arbiters, open-source, production-grade", stage: "Live", isNew: true },
          { name: "Coinbase Commerce", category: "Dispute Resolution", description: "Built-in on-chain escrow \u2014 conditional release + automatic refund logic", stage: "Live", isNew: true },
          { name: "Kleros 2.0", category: "Dispute Resolution", description: "Decentralized arbitration \u2014 deployed on Arbitrum, Certora audit underway", stage: "Beta" },
          { name: "RebelFi", category: "Dispute Resolution", description: "Smart escrow for marketplaces \u2014 milestone-based payments, delivery confirmation", stage: "Seed", isNew: true },
          { name: "Request Network", category: "Dispute Resolution", description: "Crypto invoicing \u2014 $1.2B+ platform volume, 88% stablecoin, basic escrow", funding: "$35M", stage: "ICO" },
          { name: "Mural Pay", category: "Dispute Resolution", description: "LATAM corridor specialist \u2014 chargeback risk on stablecoin pay-ins for Colombia/Mexico", stage: "Seed", isNew: true },

          // Non-USD
          { name: "Qivalis Consortium", category: "Non-USD", description: "37 European banks (BNP Paribas, ING, UniCredit, BBVA) \u2014 MiCA-compliant EUR stablecoin H2 2026", stage: "Pre-launch", isNew: true },
          { name: "Japan Megabanks", category: "Non-USD", description: "MUFG + Mizuho + SMBC ($8T+ assets) \u2014 joint JPY stablecoin on Progmat, March 2027 target", stage: "MOU signed", isNew: true },
          { name: "SoFiUSD", category: "Non-USD", description: "First US bank-issued stablecoin \u2014 15M users, 4.2% yield, Ethereum + Solana", stage: "Live", isNew: true },
          { name: "Circle EURC", category: "Non-USD", description: "Euro stablecoin \u2014 grew from 17% to 41% of EUR stablecoin market, MiCA-compliant", stage: "Live" },
          { name: "BRLA Digital", category: "Non-USD", description: "Brazilian Real \u2014 $400M/mo transfer volume, PIX integrated, growing in LATAM", funding: "$2M", stage: "Seed" },
          { name: "Mento Labs", category: "Non-USD", description: "8 currency stablecoins \u2014 cKES, cCOP, PUSO, cGHS + others, 1.2M monthly active users", funding: "$10M", stage: "Series A" },
          { name: "JPYC", category: "Non-USD", description: "Japan\u2019s first legally recognized yen stablecoin \u2014 launched Oct 2025", stage: "Live", isNew: true },
          { name: "B3 Exchange (Brazil)", category: "Non-USD", description: "Brazilian stock exchange launching BRL-pegged stablecoin + tokenization platform", stage: "Pre-launch", isNew: true },
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
              "Federal stablecoin framework \u2014 1:1 reserves, BSA compliance, monthly audits, CEO/CFO attestation, freeze/seize capability. Only permitted entities may issue payment stablecoins. OCC published NPRM March 2026, regulations due July 18, 2026.",
            date: "July 18, 2025",
          },
          {
            name: "MiCA (Markets in Crypto-Assets)",
            jurisdiction: "European Union",
            status: "Full enforcement July 1, 2026",
            impact:
              "Stablecoin issuers need e-money licenses, 1:1 liquid asset backing, redemption at par. ESMA authorization deadline forces compliance or delisting. MiCA + GENIUS Act create incompatible dual compliance regimes \u2014 doubling demand for compliance tooling.",
            date: "July 1, 2026",
          },
          {
            name: "CLARITY Act",
            jurisdiction: "United States",
            status: "Passed committee 15-9 (May 14, 2026)",
            impact:
              "Bans yield on idle stablecoin balances (\u2018deposit equivalents\u2019) but allows \u2018bona fide activity-based\u2019 rewards. Ambiguity on DeFi lending/vault yield. 8,000+ bank lobbying letters sent to Senate. Floor vote pending.",
            date: "May 2026",
          },
          {
            name: "FinCEN/OFAC Stablecoin NPRM",
            jurisdiction: "United States",
            status: "Comments closed June 9, 2026",
            impact:
              "Joint proposed rule requiring PPSIs to deploy technical controls to block, freeze, and reject sanctioned transactions. Enhanced due diligence, transaction monitoring for all stablecoin flows.",
            date: "April 2026",
          },
          {
            name: "FATF Travel Rule",
            jurisdiction: "Global (85/117 jurisdictions)",
            status: "Enforcement deadline July 1, 2026",
            impact:
              "VASP-to-VASP information sharing for transfers. 85 of 117 jurisdictions have passed legislation but only ~41% actively enforcing. Notabene TAP standard has 2,000+ institutions.",
          },
        ],
      },

      // ── Market & VC Data ──
      {
        type: "stats",
        title: "Market & VC Data",
        items: [
          { label: "USDT Market Cap", value: "$188B+", subtitle: "~59% dominance", revised: "was $145B+" },
          { label: "USDC Market Cap", value: "$75B+", subtitle: "~24% dominance", revised: "was $60B+" },
          { label: "PYUSD (PayPal)", value: "$4.1B", subtitle: "680% YoY growth \u2014 70 markets", revised: "not tracked" },
          { label: "RLUSD (Ripple)", value: "$1.78B", subtitle: "Deutsche Bank, JPMorgan partners", revised: "not tracked" },
          { label: "Monthly Settlement", value: "$7.2T+", subtitle: "Surpasses US ACH network", revised: "was $4.1T+" },
          { label: "Active Wallets", value: "10M+ daily", subtitle: "150M+ nonzero balances", revised: "was 30M+/mo" },
          { label: "Tokenized Treasuries", value: "$15B+ TVL", subtitle: "BlackRock BUIDL $2.5B leads", revised: "not tracked" },
          { label: "VC Deployed (2025-26)", value: "$2.8B+", subtitle: "Rain $338M, Elliptic $120M, TRM $70M" },
        ],
      },

      // ── Key M&A Activity ──
      {
        type: "stats",
        title: "Key M&A Activity",
        items: [
          { label: "Stripe / Bridge", value: "$1.1B", subtitle: "Feb 2025 \u2014 stablecoin infra" },
          { label: "Mastercard / BVNK", value: "$1.8B", subtitle: "Mar 2026 \u2014 130+ country settlement" },
          { label: "MoonPay / Helio", value: "$175M", subtitle: "Jan 2025 \u2014 merchant checkout" },
          { label: "MoonPay / Iron", value: "~$100M", subtitle: "Mar 2025 \u2014 settlement APIs" },
          { label: "Chainalysis / Alterya", value: "~$150M", subtitle: "Jan 2025 \u2014 AI fraud detection" },
          { label: "Elliptic Series D", value: "$120M", subtitle: "May 2026 \u2014 stablecoin analytics at $670M val" },
          { label: "TRM Labs Series C", value: "$70M", subtitle: "Feb 2026 \u2014 blockchain analytics at $1B val" },
          { label: "Circle / Hashnote", value: "Undisclosed", subtitle: "Jan 2025 \u2014 USYC tokenized MMF ($2.2B)" },
        ],
      },

      // ── Regulatory Compression Timeline (NEW) ──
      {
        type: "stats",
        title: "Regulatory Compression Timeline",
        items: [
          { label: "FinCEN/OFAC Comments", value: "June 9, 2026", subtitle: "Closed \u2014 stablecoin AML/sanctions rules" },
          { label: "MiCA Full Enforcement", value: "July 1, 2026", subtitle: "EU \u2014 issuers must comply or delist" },
          { label: "FATF Travel Rule", value: "July 1, 2026", subtitle: "Enforcement deadline in 85 jurisdictions" },
          { label: "GENIUS Act Final Rules", value: "July 18, 2026", subtitle: "OCC/FDIC/NCUA rulemaking deadline" },
          { label: "CLARITY Act Floor Vote", value: "TBD", subtitle: "On Senate calendar since June 1, 2026" },
          { label: "GENIUS Act Effective", value: "Jan 18, 2027", subtitle: "Or 120 days after final rules published" },
          { label: "HK Stablecoin License", value: "After Aug 1, 2025", subtitle: "Criminal offence without licence" },
        ],
      },

      // ── Deep-Dive: Bear Case Analysis (NEW) ──
      {
        type: "list",
        title: "Bear Case Analysis",
        items: [
          "Compliance: Chainalysis/Elliptic/TRM Labs control ~70% of enterprise crypto compliance. Elliptic raised $120M (May 2026) specifically for stablecoin monitoring. Chainalysis/Chainlink ACE partnership directly targets at-execution enforcement gap.",
          "Compliance: Only ~17 licensed EU stablecoin issuers as of Jan 2026. Total global issuers likely in the low hundreds \u2014 narrow TAM, high-ACV enterprise sale. Entropy (a16z-backed) shut down with $25M raised after \u2018several pivots and two rounds of layoffs.\u2019",
          "Yield: Veda (BoringVault) has $3.7B TVL, charges near-zero fees, and powers Kraken DeFi Earn. Yearn yvUSD also charges zero. New aggregators face fee compression from day one. On $100M TVL at 10-20 bps, annual revenue is only $100K-200K.",
          "Yield: April 2026 was worst DeFi hack month ever ($635M in 30+ attacks). Aggregation multiplies attack surface \u2014 a hack in any downstream protocol cascades to depositors. $840M+ lost to hacks in first 5 months of 2026.",
          "Yield: CLARITY Act bans passive yield on stablecoins. \u2018Activity-based\u2019 exemption is ambiguous. Mountain Protocol wound down USDM citing \u2018evolving regulatory landscape.\u2019 Usual Protocol USD0++ collapsed from $1.87B TVL. 8,000+ bank lobbying letters oppose yield provisions.",
          "AI Middleware: Crossmint ($23.6M raised, 1,100% revenue growth, 40K developers) already builds multi-protocol payment middleware across x402 + Visa IC + AP4M + ACP + AP2. Nevermined has 1.38M transactions. This is NOT a greenfield.",
          "AI Middleware: x402 moved to Linux Foundation with backing from Google, Microsoft, AWS, Visa, Stripe, Mastercard, Circle \u2014 if it becomes the standard, middleware across protocols becomes unnecessary.",
          "AI Middleware: Sub-cent micropayment middleware has razor-thin margins. Nevermined\u2019s 1.38M transactions at $0.001/tx = ~$1,380 total revenue. Only 24% of consumers trust AI to make purchases on their behalf (Forrester). Only 11% of agentic use cases reached production.",
        ],
      },

      // ── Adjacent Opportunities Identified (NEW) ──
      {
        type: "list",
        title: "Adjacent Opportunities Identified",
        items: [
          "Multi-jurisdictional compliance orchestration \u2014 unified dashboard mapping stablecoin arrangements to GENIUS Act + MiCA + UK/SG/HK/UAE/JP requirements simultaneously. Different buyer persona (CCO/CFO) than Chainalysis/Elliptic (compliance analyst).",
          "Real-time reserve verification \u2014 automated continuous monitoring of stablecoin backing (not point-in-time attestations). GENIUS Act requires CEO/CFO-certified monthly reports. Only Chainlink Proof of Reserve and a few startups building here.",
          "DeFi insurance aggregation \u2014 bundling Nexus Mutual/InsurAce coverage automatically with yield positions. No existing aggregator offers integrated insurance.",
          "Compliance middleware for DeFi yield \u2014 KYC/AML layer enabling regulated entities (banks, fintechs) to participate in DeFi yield while satisfying CLARITY Act \u2018activity-based\u2019 requirements.",
          "Crypto-to-card agent payment bridge \u2014 specifically bridging x402 (stablecoin) and Visa IC/AP4M (card network) rails. Narrower than \u2018general middleware\u2019 but more defensible.",
          "Institutional yield reporting \u2014 cost basis, 1099 generation, NAV tracking for tokenized treasury + DeFi yield positions. Tax/reporting infrastructure for the $15B+ tokenized treasury market.",
          "Vault curation-as-a-service \u2014 institutional risk modeling for mid-tier DeFi protocols (like Gauntlet, but white-labeled for exchanges and neobanks that can\u2019t build in-house).",
        ],
      },

      // ── Next Steps (updated after deep-dive) ──
      {
        type: "list",
        title: "Next Steps",
        items: [
          "Deep-dive remaining gaps: Dispute Resolution (7.8) and Non-USD Stablecoins (7.8) are now top-ranked but unvalidated. Both could drop ~1.7 points (the average deep-dive correction).",
          "Pattern recognition: every surface-level \u2018top opportunity\u2019 dropped 1.5-2.0 points after deep-dive. Apply this skepticism to ALL unvalidated scores.",
          "Adjacent plays may outperform direct gaps: multi-jurisdiction compliance orchestration, DeFi insurance aggregation, and crypto-to-card payment bridge emerged from deep-dives as potentially stronger wedges.",
          "Intersection opportunities: compliance + yield (regulated yield access layer) or compliance + AI payments (agent payment compliance) may be more defensible than any single gap.",
          "Unit economics are critical: all three deep-dived gaps had weaker-than-expected revenue potential. Any next step must include a credible path to $5M+ ARR within 18 months.",
          "Validate with potential customers before further research \u2014 5-10 interviews with stablecoin issuers (compliance), DeFi protocols (yield), and AI agent platforms (middleware) to confirm pain points.",
        ],
      },
    ],
  },
};
