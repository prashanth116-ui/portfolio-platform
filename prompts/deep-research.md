# Deep Research & Gap Analysis Prompt (V2)

Use this prompt at the START of any market research or gap analysis. Replace `[TOPIC]` with your subject area. This prompt forces full deep-dive validation on every gap as part of the initial research — no gap receives a score until it survives the gauntlet.

**V2 changes:** V1 identified gaps first, scored them, then validated later (across 3 rounds, costing significant time and tokens). V2 embeds validation INTO the scoring process — no gap gets a score until its thesis, unit economics, incumbents, and demand are individually verified.

---

## The Prompt

```
I need a comprehensive market research and gap analysis for [TOPIC].

YOU MUST FOLLOW EVERY STEP BELOW. DO NOT SKIP ANY STEP. DO NOT SCORE ANY GAP UNTIL IT HAS PASSED THROUGH EVERY VALIDATION GATE.

============================================================
PHASE 1: LANDSCAPE MAPPING (do this BEFORE identifying any gaps)
============================================================

### 1.1 Training data is UNRELIABLE
- Your training data is stale. EVERY claim about market size, competitor status, funding, pricing, adoption, or market share MUST be verified via live web search.
- If you cannot verify a number, label it "[UNVERIFIED]" — do not present stale data as current fact.
- Always cite the source URL and date for every data point.
- When two sources conflict, present BOTH with dates and flag the discrepancy.

### 1.2 Incumbent landscape (THE MOST IMPORTANT STEP)
Before identifying ANY gaps, map what the top 5-10 incumbents are doing. For each incumbent:

**Search for ALL of the following:**
- "[Company] acquisition 2025" AND "[Company] acquisition 2026"
- "[Company] [TOPIC] launch" AND "[Company] [TOPIC] product"
- "[Company] [TOPIC] partnership"
- "[Company] pricing" AND "[Company] availability countries"
- "[Company] patent filing [TOPIC]"
- "[Company] API" AND "[Company] developer platform" (check if their solution is OPEN vs captive)

**For each incumbent, document:**
- What they've built or acquired in this space
- How many countries/users they cover
- Whether their API/platform is open to third parties or captive
- Their pricing model (free, usage-based, enterprise)
- How fast they're expanding (rate of country/feature additions)

**Industry-specific incumbent lists:**
- Payments/Fintech: Stripe, Visa, Mastercard, PayPal, Block/Square, Shopify, Adyen, Coinbase, Circle, Revolut, Wise
- AI/ML: OpenAI, Anthropic, Google, Microsoft, AWS, Meta, Databricks, Snowflake
- Crypto/DeFi: Coinbase, Circle, Binance, Uniswap, Aave, MakerDAO, Tether
- SaaS/Enterprise: Salesforce, Microsoft, Google, AWS, ServiceNow, Workday
- Healthcare: Epic, Cerner, Veeva, Athenahealth, Change Healthcare
- For [TOPIC-SPECIFIC]: identify and check [relevant incumbents]

### 1.3 Startup & new entrant discovery
Run ALL of these searches:
- "[TOPIC] startup 2025" AND "[TOPIC] startup 2026"
- "[TOPIC] funding round 2025" AND "[TOPIC] funding round 2026"
- "[TOPIC] seed round" AND "[TOPIC] Series A" AND "[TOPIC] Series B"
- "Y Combinator [TOPIC]" AND "a16z [TOPIC]" AND "Sequoia [TOPIC]"
- "[TOPIC] Crunchbase" AND "[TOPIC] Tracxn" AND "[TOPIC] PitchBook"
- "[TOPIC] Product Hunt" AND "[TOPIC] launch 2026"

For EACH startup found, document:
- Funding amount and investors
- Employee count (check LinkedIn/Tracxn — a 15-person company on $6M after 7 years is a lifestyle business, not a breakout)
- Traction metrics (revenue, users, TVL, volume — distinguish between claimed and verified)
- Whether they've raised follow-on funding (no Series A after 2+ years = weak signal)

### 1.4 M&A and consolidation
Search for:
- "[TOPIC] acquisition 2025" AND "[TOPIC] acquisition 2026"
- "[TOPIC] M&A" AND "[TOPIC] consolidation"
- Each major company name + "acquires" or "acquired"
- "[TOPIC] shutdown 2025" AND "[TOPIC] shutdown 2026" AND "[TOPIC] failed"
- "[TOPIC] pivoted" AND "[TOPIC] shut down"

Document:
- Total M&A spend in the space (if >$1B, the space is consolidating and incumbents are winning)
- Which independent players have been absorbed
- Which startups have failed and WHY they failed (this is critical intelligence)

### 1.5 Regulatory environment
For EVERY regulation mentioned:
- Verify current status: proposed → committee → passed → signed → enforcement date
- Check for amendments, delays, legal challenges, or rollbacks SINCE passage
- Cross-reference with official sources (congress.gov, EUR-Lex, Federal Register, etc.)
- Check if any regulatory body has WITHDRAWN jurisdiction or enforcement (e.g., CFPB withdrawal)
- Search for "[regulation name] delay" AND "[regulation name] challenged" AND "[regulation name] amendment"

### 1.6 Market data verification
For EVERY market size or volume claim:
- Cross-reference with at least 2 independent sources
- Distinguish clearly between TAM, SAM, and SOM
- Note the date of each data point
- Check if the market is GROWING or DECLINING (growth rate matters more than absolute size)
- For percentages: verify the denominator (e.g., "0.24% of total market" means the segment is tiny)
- For crypto/DeFi: check CoinGecko, DefiLlama, Artemis, Dune Analytics for real-time data
- For VC data: check Crunchbase, PitchBook, Galaxy Research

============================================================
PHASE 2: GAP IDENTIFICATION (only after Phase 1 is COMPLETE)
============================================================

### 2.1 Identify candidate gaps
Based on the landscape mapping, identify potential gaps or opportunities. For each candidate gap, write ONE SENTENCE describing the thesis.

### 2.2 IMMEDIATELY kill obvious non-starters
Before any further analysis, eliminate gaps where:
- An incumbent already has a live product covering >50% of the addressable market
- Total M&A spend by incumbents in this specific gap exceeds $500M
- The gap is actually a FEATURE of an existing product, not a standalone market
- The "problem" is actually the intended design (e.g., "no chargebacks" in crypto is the feature, not a bug)

For each eliminated gap, document WHY it was killed. Do not revisit.

============================================================
PHASE 3: PER-GAP DEEP VALIDATION (the step V1 skipped)
============================================================

FOR EACH SURVIVING GAP, complete ALL of the following before assigning any score. This is not optional. Every sub-step must have evidence.

### 3.1 Thesis stress-test
Write out the gap's thesis as 3-5 explicit assumptions. Then try to DISPROVE each one:

Example:
- Assumption: "Incumbents' solutions are captive/closed"
  → Search: "[Company] API documentation" "[Company] developer access" "[Company] open platform"
  → If the API is open and well-documented, the assumption FAILS

- Assumption: "The market is fragmented"
  → Count actual providers. If <20 providers (vs Plaid's 11,000 banks), the analogy fails.

- Assumption: "No one has built this yet"
  → Search: "[gap name] startup" "[gap name] platform" "[gap name] solution"
  → If someone has been building it for 5+ years with modest traction, the opportunity is weaker than greenfield

- Assumption: "Demand is growing"
  → Check if the TREND supports demand (e.g., if stablecoin-native payments are growing, off-ramp demand may DECREASE)

**CRITICAL: If 2+ core assumptions fail, the gap score CANNOT exceed 5.0. Stop analysis and move to next gap.**

### 3.2 Per-gap incumbent check
For THIS SPECIFIC gap (not the broad space), search:
- "[gap name] [incumbent]" for each of the top 5 incumbents
- "[incumbent] launches [related feature]"
- Has any incumbent shipped a FREE version of this? (Free kills paid startups)

If an incumbent has a live product in this specific gap:
- Competition score CANNOT exceed 4
- If it's FREE: Competition score CANNOT exceed 3

### 3.3 Unit economics validation
For EACH gap, answer these questions with evidence:
- What is the revenue model? (SaaS, usage-based, take rate, licensing)
- What is the realistic take rate or price point? Search for "[gap name] pricing" and comparable products
- What is the realistic addressable revenue (not TAM — actual capturable revenue at realistic market share)?
- At 5% market share after 3 years, what is annual revenue? If <$5M ARR, this is not venture-scale.
- What are the unit economics of serving one customer? (Cost to acquire, cost to serve, margin)
- Is there fee compression in this space? Search "[gap name] pricing pressure" "[gap name] fee compression"
- Are competitors offering this for FREE as a feature of a larger platform?

**CRITICAL: If realistic 3-year revenue at 5% share is <$5M ARR, the Opportunity score CANNOT exceed 4.**

### 3.4 Failed startup autopsy
Search specifically for:
- "[gap name] startup failed" AND "[gap name] startup shut down"
- "[gap name] startup pivot"
- Companies that tried THIS SPECIFIC gap and failed — WHY did they fail?
- Companies that have been operating in this gap for 3+ years without breakout growth — WHY?

If a well-funded company tried and failed: document the failure reason and apply it to your assessment.
If a company has operated for 5+ years without reaching $10M ARR: the market may not support venture-scale outcomes.

### 3.5 Demand verification
Search for evidence that customers actually WANT this:
- "[gap name] problem" AND "[gap name] pain point"
- "[gap name] request for proposal" AND "[gap name] RFP"
- Forum/Reddit/HN discussions about this pain point
- Job postings that suggest companies are building this in-house (which means they need it but are solving it themselves)
- Conference talks or analyst reports calling out this gap

If you cannot find organic demand signals: the gap may be a solution looking for a problem.

### 3.6 Analogy stress-test
If the gap uses an analogy (e.g., "Plaid for X", "Stripe for Y"):
- Identify WHY the original company (Plaid, Stripe) succeeded
- Check if those same conditions exist in this market:
  - Fragmentation level: Plaid succeeded because 11,000 banks had proprietary APIs. Does this market have similar fragmentation?
  - Switching costs: Does the solution create lock-in, or can customers swap providers trivially?
  - Network effects: Does the product get better with more users/providers?
  - Regulatory moat: Does compliance create barriers that benefit the aggregator?
- If the structural conditions don't match, the analogy is INVALID — do not use it to justify the score

### 3.7 Timing and window analysis
- How fast are incumbents expanding in this specific gap? (Countries/quarter, features/quarter)
- At current expansion rate, when will incumbents cover >80% of the addressable market?
- Is the window measured in months or years?
- Is there a regulatory deadline creating urgency? (Verify the deadline is real and hasn't been delayed)
- Search: "[gap name] window closing" AND "[incumbent] expanding [gap area]"

If the window is <12 months: Timing score CANNOT exceed 5 (not enough time to build and ship).
If incumbents are expanding at >10 countries/quarter: Timing score CANNOT exceed 4.

============================================================
PHASE 4: SCORING (only after Phase 3 is complete for each gap)
============================================================

### 4.1 Scoring dimensions (1-10 each)
- **Opportunity**: Realistic addressable revenue (not TAM), growth rate, pain severity, willingness to pay
- **Feasibility**: Technical complexity, regulatory barriers, team requirements, time to MVP
- **Timing**: Window duration, incumbent expansion rate, regulatory deadlines
- **Competition**: Number of funded competitors, incumbent activity, defensibility, switching costs
- **Capital Requirements**: Funding needed to reach PMF, burn rate, time to revenue

### 4.2 Hard scoring caps (non-negotiable)
Apply ALL that apply — they stack:

**Competition caps:**
- Incumbent has a LIVE product in this specific gap → Competition max 4
- Incumbent product is FREE → Competition max 3
- Incumbent spent >$500M acquiring in this gap → Competition max 3
- 3+ startups with $10M+ raised exist → Competition max 5
- A startup has operated 5+ years in this gap without breakout → reduce Competition by 1

**Timing caps:**
- Incumbent expanding >10 countries/quarter → Timing max 4
- Window <12 months → Timing max 5
- Window description is "closing" or "compressed" → Timing max 5
- Incumbent M&A spend >$1B in the space → Timing max 4

**Opportunity caps:**
- Realistic 3-year revenue at 5% share <$5M → Opportunity max 4
- Market share is declining (not just small, but shrinking) → Opportunity max 5
- Free alternatives exist from incumbents → Opportunity max 5
- The "problem" is actually the intended design → Opportunity max 2

**Feasibility caps:**
- Requires money transmitter licenses in 50+ jurisdictions → Feasibility max 4
- Regulatory model relies on a "loophole" that may close → Feasibility max 5

**Thesis caps (from 3.1):**
- If 2+ core assumptions failed → Overall score CANNOT exceed 5.0
- If 3+ core assumptions failed → Overall score CANNOT exceed 4.0

### 4.3 Composite score
Average the 5 dimensions, then apply thesis caps. Show your work:
- List each dimension score with evidence
- List each cap that was applied and why
- Show the pre-cap and post-cap score

### 4.4 Confidence level
- **HIGH**: All 5 dimensions verified by 2+ sources; unit economics validated; thesis assumptions tested
- **MEDIUM**: 3-4 dimensions verified; some assumptions untested
- **LOW**: Significant gaps in verification; relying on extrapolation

============================================================
PHASE 5: CROSS-VALIDATION & BEAR CASE
============================================================

### 5.1 Per-gap bear case
For EACH gap that scored above 5.0, write a specific bear case:
- The single most likely reason this will fail
- The strongest incumbent response
- The unit economics trap (how margins could get squeezed to zero)
- The regulatory risk that could kill it
- The demand risk (what if customers don't actually want this?)

### 5.2 Pattern check
- Are all your gaps clustered in one category? (If so, you may be missing adjacent spaces)
- Do any gaps have the same failure mode? (If so, that failure mode may apply to the whole space)
- Is there a "meta-gap" — a need that none of the identified gaps address?

### 5.3 What-did-I-miss search
Run ALL of these:
- "[TOPIC] nobody is talking about"
- "[TOPIC] contrarian view" AND "[TOPIC] bear case"
- "[TOPIC] failed startup" AND "[TOPIC] shutdown 2025" AND "[TOPIC] shutdown 2026"
- "[TOPIC] overrated" AND "[TOPIC] overhyped"
- "[TOPIC] conference 2026" AND "[TOPIC] podcast 2026" (for emerging perspectives)
- "[TOPIC] surprising" AND "[TOPIC] unexpected trend"
- "[TOPIC] adjacent opportunity" AND "[TOPIC] underrated"

### 5.4 Adjacent opportunity scan
Sometimes the best opportunities are NOT in the gaps you identified, but in adjacent spaces revealed by the research. Search for:
- "[TOPIC] intersection [other field]"
- "[TOPIC] infrastructure" AND "[TOPIC] tooling" AND "[TOPIC] middleware"
- What do the incumbents in this space STILL need to buy/build? (Their gaps are your opportunities)

============================================================
PHASE 6: OUTPUT FORMAT
============================================================

Structure the final output as:

1. **Executive Summary**
   - 3-5 key findings (all verified with source + date)
   - Total M&A spend in the space
   - Number of gaps that survived validation (vs. total identified)
   - The single most important insight from the research

2. **Incumbent Landscape** (THE MOST IMPORTANT SECTION)
   - Per-incumbent profile: what they've built, acquired, and where they're expanding
   - Open vs. captive API status for each
   - Total addressable market they already cover

3. **Startup Landscape**
   - Funded startups with verified traction
   - Failed/stalled startups and why
   - VC investment trends in this space

4. **Regulatory Environment**
   - Verified status of each relevant regulation
   - Upcoming deadlines and enforcement dates
   - Regulatory risks (loopholes that may close, jurisdictions that may act)

5. **Gap Analysis (Validated)**
   - Ranked opportunities with full scoring breakdowns
   - Each gap must show: thesis assumptions (pass/fail), unit economics, incumbent check, demand signals
   - Pre-cap and post-cap scores visible
   - Confidence level for each gap

6. **M&A & Consolidation**
   - Deals that reshaped the landscape
   - Pattern analysis (is the space consolidating?)
   - Failed companies and lessons learned

7. **Bear Case Analysis**
   - Per-gap bear case for anything scoring >5.0
   - Space-wide bear case (reasons the entire sector may not support new entrants)

8. **Adjacent Opportunities**
   - Opportunities discovered during research that weren't in the original gap list
   - These sometimes outperform direct gaps

9. **Final Recommendation**
   - Go/no-go for each gap with clear reasoning
   - If "go": specific next steps (customer interviews, MVP spec, regulatory counsel)
   - If "no-go across the board": say so clearly — do not force optimism
   - Suggested customer discovery questions to validate the top opportunity

============================================================
ANTI-BIAS RULES (apply throughout)
============================================================

1. **No optimism bias**: Do not round scores up. If the evidence is ambiguous, round DOWN.
2. **No sunk cost bias**: If research reveals the space is closed, say so. Do not try to salvage the analysis.
3. **No narrative bias**: Do not construct a compelling story around a weak opportunity. Data over narrative.
4. **No analogy bias**: Every "X for Y" analogy must be structurally validated. Most fail.
5. **No survivorship bias**: Search for failed companies in each gap, not just successful ones.
6. **No TAM fallacy**: TAM is irrelevant. Only SOM (realistic capturable revenue) matters for scoring.
7. **No feature-vs-product confusion**: If the gap can be (or is being) solved as a feature of a larger product, it is not a standalone market.
8. **Assume you are wrong**: For every gap, spend equal effort trying to disprove it as you do trying to support it.
```

---

## Why this prompt exists

### The $3B lesson

In June 2026, a stablecoin infrastructure audit was conducted in 3 rounds:

**Round 1 (surface-level):** Identified 7 gaps. Top-ranked: Merchant Checkout SDK at 8.7/10 with "$45B+ TAM" and "12-18 month window."

**Reality:** Stripe had acquired Bridge for $1.1B, had stablecoin checkout ON BY DEFAULT in 70+ countries. Mastercard acquired BVNK for $1.8B. Shopify had native USDC. The actual score was 5.5/10 — the window was closed.

**Round 2 (deep-dive top 3):** The new top 3 (Compliance 8.5, Yield 8.3, AI Middleware 8.0) were deep-dived. ALL three dropped ~1.7 points:
- Compliance: 8.5 → 6.5 (Elliptic raised $120M, incumbents at 70% share)
- Yield: 8.3 → 6.3 (Veda had $3.7B TVL, zero-fee competition)
- AI Middleware: 8.0 → 6.5 (Crossmint had $23.6M funding, 1,100% growth)

**Round 3 (deep-dive remaining 3):** All three dropped even more:
- Dispute Resolution: 7.8 → 4.8 (-3.0) — "no chargebacks" IS the feature, not a bug
- Non-USD Stablecoins: 7.8 → 5.5 (-2.3) — only 0.24% of market, declining share
- Off-Ramp Aggregation: 6.8 → 3.9 (-2.9) — Plaid analogy structurally broken, Bridge API is open

**Final result:** All 7 gaps scored 6.5 or below. Average correction: -2.3 points. The entire space was more mature than surface analysis suggested. $5B+ in incumbent M&A had closed most gaps.

**The cost:** 3 rounds of research, significant time and tokens, chasing progressively invalidated leads. If the deep-dive validation had been embedded in Round 1, the correct answer would have emerged immediately.

### What V1 got wrong

| V1 Failure | V2 Fix |
|------------|--------|
| Scored gaps before validating them | Phase 3 validates BEFORE scoring |
| Checked incumbents globally, not per-gap | 3.2 requires per-gap incumbent search |
| No unit economics analysis | 3.3 forces revenue model validation |
| Accepted analogies uncritically ("Plaid for X") | 3.6 stress-tests every analogy structurally |
| Didn't check if the "problem" was intentional | 3.1 tests if the pain is actually a feature |
| Didn't search for failed companies per gap | 3.4 requires per-gap failed startup autopsy |
| Didn't verify demand exists | 3.5 searches for organic demand signals |
| Scoring caps were too lenient | 4.2 has aggressive, stacking caps |
| Allowed optimism to persist across rounds | Anti-bias rules applied throughout |
| Treated TAM as meaningful | 4.3 uses SOM; TAM fallacy is explicitly banned |

---

## Quick checklist (print this, check every box)

### Phase 1: Landscape
- [ ] Searched each of 5-10 incumbents for acquisitions, products, partnerships, pricing, patents
- [ ] Checked if incumbent APIs are OPEN or captive (this matters enormously)
- [ ] Searched for startups with multiple query patterns (YC, a16z, Crunchbase, etc.)
- [ ] Verified employee count and follow-on funding for each startup
- [ ] Checked M&A totals (>$1B = space is consolidating)
- [ ] Found and documented failed/shutdown companies with reasons
- [ ] Verified every regulation against official sources with exact dates
- [ ] Cross-referenced every market size with 2+ sources
- [ ] Distinguished TAM vs SAM vs SOM for every number

### Phase 2: Gap Identification
- [ ] Killed obvious non-starters BEFORE deep analysis
- [ ] Checked if any "gap" is actually a feature of a larger product
- [ ] Checked if the "problem" is actually the intended design

### Phase 3: Per-Gap Validation (repeat for EACH gap)
- [ ] Listed 3-5 thesis assumptions explicitly
- [ ] Tried to DISPROVE each assumption with live search
- [ ] Searched for incumbents in THIS SPECIFIC gap (not just the broad space)
- [ ] Checked if any incumbent offers a FREE version
- [ ] Calculated realistic revenue at 5% market share after 3 years
- [ ] Checked for fee compression and free alternatives
- [ ] Searched for failed startups in THIS SPECIFIC gap
- [ ] Searched for organic demand signals (forums, RFPs, job postings)
- [ ] Stress-tested any "X for Y" analogies structurally
- [ ] Checked incumbent expansion rate to estimate window duration

### Phase 4: Scoring
- [ ] Applied ALL relevant scoring caps (they stack)
- [ ] Showed pre-cap and post-cap scores
- [ ] Assigned confidence level with justification
- [ ] Used SOM not TAM for opportunity scoring

### Phase 5: Cross-Validation
- [ ] Wrote specific bear case for each gap >5.0
- [ ] Ran "what did I miss" searches
- [ ] Searched for adjacent opportunities
- [ ] Checked for pattern/bias in your own analysis

### Final Sanity Check
- [ ] Would you invest your own money in the top-ranked gap?
- [ ] If the top gap scores <6.0, have you said "no-go" clearly instead of forcing optimism?
- [ ] Have you spent equal effort disproving gaps as supporting them?
