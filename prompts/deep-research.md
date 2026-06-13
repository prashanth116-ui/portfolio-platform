# Deep Research & Gap Analysis Prompt

Use this prompt at the START of any market research or gap analysis. Replace `[TOPIC]` with your subject area. This prompt forces validation as part of the initial research — not as a follow-up.

---

## The Prompt

```
I need a comprehensive market research and gap analysis for [TOPIC].

CRITICAL RULES — follow these exactly:

### 1. NEVER use training data as ground truth
- Your training data is stale. Every claim about market size, competitor status, funding, pricing, or adoption MUST be verified via live web search before presenting.
- If you cannot verify a number, say "unverified" — do not present stale data as current fact.
- Always cite the source and date for every data point.

### 2. Incumbent threat assessment FIRST
Before identifying gaps or opportunities, research what the top 5-10 incumbents in the adjacent space are doing:
- For payments: check Stripe, Visa, Mastercard, PayPal, Block/Square, Shopify, Adyen
- For fintech: check the above plus Coinbase, Circle, Revolut, Wise
- For AI: check OpenAI, Anthropic, Google, Microsoft, AWS, Meta
- For [TOPIC-SPECIFIC]: check [relevant incumbents]

For EACH incumbent, search for:
- Recent acquisitions (last 18 months)
- New product launches in this space
- Partnerships or integrations
- Pricing and availability (countries, default-on vs opt-in)
- Patent filings or strategic signals

### 3. New entrant discovery
Run explicit searches for:
- "[TOPIC] startup 2025" and "[TOPIC] startup 2026"
- "[TOPIC] funding round 2025" and "[TOPIC] funding round 2026"
- "[TOPIC] seed round" and "[TOPIC] Series A"
- "Y Combinator [TOPIC]" and "a16z [TOPIC]"
- Crunchbase / Tracxn / PitchBook data where available

### 4. M&A and consolidation check
Search for:
- "[TOPIC] acquisition 2025" and "[TOPIC] acquisition 2026"
- Major player name + "acquires" for each key company
- "stablecoin M&A" / "[TOPIC] M&A" for consolidation patterns
- Check if any competitors from your list have been acquired, merged, or shut down

### 5. Regulatory verification
For every regulation mentioned:
- Verify current status (proposed vs passed vs signed vs enforced)
- Check exact dates (signed date, enforcement date, comment period)
- Search for amendments, delays, or legal challenges since passage
- Cross-reference with official government sources (congress.gov, EUR-Lex, etc.)

### 6. Market data verification
For every market size or volume claim:
- Cross-reference with at least 2 independent sources
- Distinguish between TAM, SAM, and SOM
- Note the date of the data point — markets change fast
- For crypto/fintech: check CoinGecko, DefiLlama, Artemis, Dune Analytics
- For VC data: check Crunchbase, PitchBook, Galaxy Research

### 7. Scoring methodology
When rating opportunities, use these 5 dimensions (1-10 each):
- **Opportunity**: Market size, growth rate, pain severity
- **Feasibility**: Technical complexity, regulatory barriers, team requirements
- **Timing**: Is the window open? How long? Are incumbents moving?
- **Competition**: Number of funded competitors, incumbent activity, defensibility
- **Capital Requirements**: Funding needed to reach product-market fit

For EACH dimension, explain the specific evidence behind the score. Do not round up optimistically.

Apply these deductions:
- If an incumbent has a live product: Competition score cannot exceed 5
- If an incumbent spent >$500M acquiring in this space: Timing score cannot exceed 4
- If 3+ well-funded startups exist ($10M+ raised): Competition score cannot exceed 6
- If the window phrase is "closing" or "compressed": Timing score cannot exceed 6

### 8. Confidence levels
Assign confidence to every major claim:
- **HIGH**: Verified by 2+ independent sources with dates
- **MEDIUM**: Verified by 1 source, or sources conflict on specifics
- **LOW**: Based on extrapolation, single data point, or training data only

### 9. What-did-I-miss check
Before presenting final results, explicitly search for:
- "[TOPIC] that nobody is talking about"
- "[TOPIC] contrarian view" or "[TOPIC] bear case"
- "[TOPIC] failed startup" or "[TOPIC] shutdown 2025/2026"
- Conference talks or podcasts from the last 6 months on this topic
- Any innovation or approach not covered in your analysis

### 10. Output format
Structure the output as:
1. **Executive Summary** — key metrics (all verified with sources)
2. **Incumbent Landscape** — what big players are doing (the MOST important section)
3. **Startup Landscape** — new entrants with funding, stage, differentiation
4. **Regulatory Environment** — verified status of relevant laws/frameworks
5. **Gap Analysis** — ranked opportunities with scores, confidence, and evidence
6. **M&A & Consolidation** — deals that reshaped the landscape
7. **Bear Case** — reasons each gap might NOT work
8. **Recommended Next Steps** — ranked by score, adjusted for realistic timing

DO NOT present any gap as viable without first confirming that no incumbent has already solved it.
```

---

## Why this prompt exists

In June 2026, an initial stablecoin infrastructure audit identified "Merchant Checkout SDK" as the #1 opportunity (8.7/10, $45B+ TAM, "12-18 month window"). After validation:

- Stripe had acquired Bridge for $1.1B and had stablecoin checkout ON BY DEFAULT in 70+ countries
- Mastercard had acquired BVNK for $1.8B
- Shopify had native USDC payments in 34 countries
- A joint Visa/Mastercard/Stripe platform was reportedly forming
- The actual score was 5.5/10 — the window was CLOSED

The revised #1 was Compliance-as-a-Service (8.5/10), which wasn't even in the original top 3.

**The initial audit would have led to building a product in a space already dominated by $3B+ in incumbent acquisitions.** This prompt prevents that by forcing incumbent and validation checks upfront.

---

## Quick checklist (for any research)

- [ ] Searched for what incumbents are doing (not just startups)
- [ ] Verified every market size number with live web search
- [ ] Checked M&A activity in the last 18 months
- [ ] Searched for new startups funded in 2025-2026
- [ ] Verified regulatory status against official sources
- [ ] Checked if any identified competitors have shut down or been acquired
- [ ] Searched for contrarian/bear case arguments
- [ ] Applied scoring deductions for incumbent activity
- [ ] Assigned confidence levels to every major claim
- [ ] Ran "what did I miss" searches before finalizing
