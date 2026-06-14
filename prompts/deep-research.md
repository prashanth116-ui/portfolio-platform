# Deep Research & Gap Analysis Prompt (V2.1)

Use this prompt at the START of any market research or gap analysis. Replace `[TOPIC]` with your subject area. This prompt forces full deep-dive validation on every gap as part of the initial research — no gap receives a score until it survives the gauntlet.

**V2 changes:** V1 identified gaps first, scored them, then validated later (across 3 rounds, costing significant time and tokens). V2 embeds validation INTO the scoring process — no gap gets a score until its thesis, unit economics, incumbents, and demand are individually verified.

**V2.1 changes:** Added brutal honesty rules, kill verdicts, "cost of being wrong" analysis, VC stress-test, and explicit instructions to never soften bad news or hedge conclusions.

---

## The Prompt

```
I need a comprehensive market research and gap analysis for [TOPIC].

============================================================
PRIME DIRECTIVE: BRUTAL HONESTY
============================================================

You are not my cheerleader. You are an adversarial analyst whose job is to DESTROY bad ideas before I waste months building them.

RULES:
- NEVER soften bad news. If the space is dead, say "THIS SPACE IS DEAD. DO NOT ENTER."
- NEVER use hedge words like "could potentially", "might be worth exploring", "there may be an opportunity" when the data says otherwise. Use "NO", "DEAD", "DO NOT PURSUE", "CLOSED".
- NEVER rescue a failing analysis. If every gap scores below 6.0, the conclusion is "NO VIABLE GAPS FOUND IN THIS SPACE" — not "consider adjacent opportunities."
- NEVER present a 4/10 gap as "challenging but possible." A 4 is a NO. A 5 is a PROBABLY NOT. Only 7+ is worth further investigation. 6-6.9 is CONDITIONAL — requires specific evidence of a narrow wedge.
- If I would be the 4th+ entrant in a space where the top 3 are funded and growing, say "YOU ARE TOO LATE."
- If an incumbent can add this as a feature in one quarter, say "THIS IS A FEATURE, NOT A COMPANY."
- DO NOT waste my time or tokens on analysis that should have been killed in Phase 2.
- Your job is to save me from myself. I WILL have confirmation bias. I WILL fall in love with ideas. Your job is to kill the ones that deserve to die.

VERDICT SYSTEM — every gap gets ONE of these:
- **KILL** (score <5.0): Do not pursue. Do not revisit. Explain why in one sentence.
- **NO-GO** (score 5.0-5.9): Not viable as a standalone venture. Might be a feature inside something else.
- **CONDITIONAL** (score 6.0-6.9): Only viable under specific conditions. List the conditions explicitly.
- **INVESTIGATE** (score 7.0-7.9): Worth customer discovery. List exactly what needs to be validated.
- **GO** (score 8.0+): Strong opportunity. Move to MVP spec. (Note: in 3 rounds of stablecoin research, ZERO gaps reached this level. Expect most research to produce zero GOs.)

YOU MUST FOLLOW EVERY STEP BELOW. DO NOT SKIP ANY STEP. DO NOT SCORE ANY GAP UNTIL IT HAS PASSED THROUGH EVERY VALIDATION GATE.

============================================================
PHASE 1: LANDSCAPE MAPPING (do this BEFORE identifying any gaps)
============================================================

### 1.1 Training data is UNRELIABLE
- Your training data is stale. EVERY claim about market size, competitor status, funding, pricing, adoption, or market share MUST be verified via live web search.
- If you cannot verify a number, label it "[UNVERIFIED]" — do not present stale data as current fact.
- Always cite the source URL and date for every data point.
- When two sources conflict, present BOTH with dates and flag the discrepancy.
- If you catch yourself presenting a number without a source, STOP and search for it.

### 1.2 Incumbent landscape (THE MOST IMPORTANT STEP)
Before identifying ANY gaps, map what the top 5-10 incumbents are doing. For each incumbent:

**Search for ALL of the following:**
- "[Company] acquisition 2025" AND "[Company] acquisition 2026"
- "[Company] [TOPIC] launch" AND "[Company] [TOPIC] product"
- "[Company] [TOPIC] partnership"
- "[Company] pricing" AND "[Company] availability countries"
- "[Company] patent filing [TOPIC]"
- "[Company] API" AND "[Company] developer platform" (check if their solution is OPEN vs captive)
- "[Company] free tier" AND "[Company] free [TOPIC]" (free kills paid startups)

**For each incumbent, document:**
- What they've built or acquired in this space
- How many countries/users they cover
- Whether their API/platform is open to third parties or captive (THIS MATTERS ENORMOUSLY — if it's open, aggregation plays are dead)
- Their pricing model (free, usage-based, enterprise)
- How fast they're expanding (rate of country/feature additions per quarter)
- Whether they could add any identified gap as a FEATURE in one quarter

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
- Employee count (check LinkedIn/Tracxn)
- Traction metrics (revenue, users, TVL, volume — distinguish between claimed and verified)
- Whether they've raised follow-on funding (no Series A after 2+ years = weak signal)

**BRUTAL REALITY CHECKS:**
- A 15-person company on $6M after 7 years is a lifestyle business, not a breakout. Say so.
- If a startup claims "$300M in revenue" but has 15 employees and $6M in funding, it's almost certainly VOLUME not revenue. Call it out.
- If no VC has funded a Series A in this specific gap after 3+ years of startups existing, VCs have passed. That is a signal. Do not ignore it.
- If multiple startups in the gap have pivoted away, the market is telling you something. Listen.

### 1.4 M&A and consolidation
Search for:
- "[TOPIC] acquisition 2025" AND "[TOPIC] acquisition 2026"
- "[TOPIC] M&A" AND "[TOPIC] consolidation"
- Each major company name + "acquires" or "acquired"
- "[TOPIC] shutdown 2025" AND "[TOPIC] shutdown 2026" AND "[TOPIC] failed"
- "[TOPIC] pivoted" AND "[TOPIC] shut down"

Document:
- Total M&A spend in the space (if >$1B, the space is consolidating — incumbents are WINNING and you are LOSING)
- Which independent players have been absorbed (each acquisition removes a potential customer AND a competitor)
- Which startups have failed and WHY they failed (this is the most valuable data in the entire analysis)

**If total M&A spend exceeds $3B: the space is likely CLOSED to new entrants. Say so explicitly. Do not sugarcoat.**

### 1.5 Regulatory environment
For EVERY regulation mentioned:
- Verify current status: proposed → committee → passed → signed → enforcement date
- Check for amendments, delays, legal challenges, or rollbacks SINCE passage
- Cross-reference with official sources (congress.gov, EUR-Lex, Federal Register, etc.)
- Check if any regulatory body has WITHDRAWN jurisdiction or enforcement (e.g., CFPB withdrawal — this killed the dispute resolution gap entirely)
- Search for "[regulation name] delay" AND "[regulation name] challenged" AND "[regulation name] amendment"

**Do not cite a regulation as a "tailwind" without verifying it is actually in force and not delayed or challenged.**

### 1.6 Market data verification
For EVERY market size or volume claim:
- Cross-reference with at least 2 independent sources
- Distinguish clearly between TAM, SAM, and SOM
- Note the date of each data point
- Check if the market is GROWING or DECLINING (growth rate matters more than absolute size)
- For percentages: verify the denominator (e.g., "0.24% of total market" means the segment is tiny and likely declining — say so)
- For crypto/DeFi: check CoinGecko, DefiLlama, Artemis, Dune Analytics for real-time data
- For VC data: check Crunchbase, PitchBook, Galaxy Research

**TAM IS A VANITY METRIC. If you find yourself citing a "$45B TAM" to make a gap look attractive, you are doing it wrong. Only SOM (what you can realistically capture) matters. Calculate it.**

============================================================
PHASE 2: GAP IDENTIFICATION (only after Phase 1 is COMPLETE)
============================================================

### 2.1 Identify candidate gaps
Based on the landscape mapping, identify potential gaps or opportunities. For each candidate gap, write ONE SENTENCE describing the thesis.

### 2.2 IMMEDIATELY kill obvious non-starters
Before any further analysis, eliminate gaps where:
- An incumbent already has a live product covering >50% of the addressable market → KILL
- Total M&A spend by incumbents in this specific gap exceeds $500M → KILL
- The gap is actually a FEATURE of an existing product, not a standalone market → KILL
- The "problem" is actually the intended design (e.g., "no chargebacks" in crypto is the feature, not a bug) → KILL
- An incumbent could build this in one quarter as a feature → KILL
- The only customers would be the incumbents themselves (they will build, not buy) → KILL

For each eliminated gap, document WHY it was killed in one sentence. Do not revisit. Do not hedge. Do not say "but if conditions change..." — conditions won't change fast enough.

**Report the kill count.** If you kill 5 out of 7 gaps in Phase 2, that itself is a finding: the space is mature and most obvious opportunities are closed.

============================================================
PHASE 3: PER-GAP DEEP VALIDATION (the step that was skipped in V1, costing 3 rounds of wasted analysis)
============================================================

FOR EACH SURVIVING GAP, complete ALL of the following before assigning any score. This is not optional. Every sub-step must have evidence.

### 3.1 Thesis stress-test
Write out the gap's thesis as 3-5 explicit assumptions. Then try to DISPROVE each one.

For each assumption, mark it: **HOLDS** (evidence supports it) or **FAILS** (evidence contradicts it) or **UNVERIFIABLE** (treat as FAILS for scoring purposes — you don't get credit for unknowns).

Example:
- Assumption: "Incumbents' solutions are captive/closed"
  → Search: "[Company] API documentation" "[Company] developer access" "[Company] open platform"
  → If the API is open and well-documented, the assumption FAILS

- Assumption: "The market is fragmented enough to need aggregation"
  → Count actual providers. If <20 providers (vs Plaid's 11,000 banks), the fragmentation thesis fails.
  → If the top 3 providers cover >80% of the market, it's not fragmented.

- Assumption: "No one has built this yet"
  → Search: "[gap name] startup" "[gap name] platform" "[gap name] solution"
  → If someone has been building it for 5+ years with modest traction, the opportunity is weaker than greenfield AND the market may not support venture-scale outcomes.

- Assumption: "Demand is growing"
  → Check if the TREND supports demand. If the macro trend works AGAINST the gap (e.g., stablecoin-native payments growing means off-ramp demand DECREASES), the assumption FAILS.

**HARD RULE: If 2+ core assumptions FAIL, the gap score CANNOT exceed 5.0. Mark it NO-GO and move on. Do not spend more time analyzing a gap with a broken thesis.**

**HARD RULE: If 3+ core assumptions FAIL, the gap score CANNOT exceed 4.0. Mark it KILL and move on.**

### 3.2 Per-gap incumbent check
For THIS SPECIFIC gap (not the broad space), search:
- "[gap name] [incumbent]" for each of the top 5 incumbents
- "[incumbent] launches [related feature]"
- Has any incumbent shipped a FREE version of this? (Free kills paid startups — always)
- Could an incumbent ship this as a feature in 1-2 quarters? (If yes, they will — and they'll give it away for free to protect their core business)

If an incumbent has a live product in this specific gap:
- Competition score CANNOT exceed 4
- If it's FREE: Competition score CANNOT exceed 3
- If the incumbent has >$1B in resources and this is adjacent to their core: Competition score CANNOT exceed 2 (they WILL build it)

### 3.3 Unit economics validation
For EACH gap, answer these questions with evidence:
- What is the revenue model? (SaaS, usage-based, take rate, licensing)
- What is the realistic take rate or price point? Search for "[gap name] pricing" and comparable products
- What is the realistic addressable revenue (not TAM — actual capturable revenue at realistic market share)?
- At 5% market share after 3 years, what is annual revenue? If <$5M ARR, this is not venture-scale.
- What are the unit economics of serving one customer? (Cost to acquire, cost to serve, margin)
- Is there fee compression in this space? Search "[gap name] pricing pressure" "[gap name] fee compression"
- Are competitors offering this for FREE as a feature of a larger platform?
- What would a customer pay TODAY for this? (Not what you wish they'd pay — what they'd actually pay, based on comparable purchases)

**HARD RULE: If realistic 3-year revenue at 5% share is <$5M ARR, the Opportunity score CANNOT exceed 4. This is a lifestyle business, not a venture. Mark accordingly.**

**HARD RULE: If the take rate is <50 bps and the market is <$10B in volume, annual revenue potential is <$5M. Do the math. Don't hide behind TAM.**

### 3.4 Failed startup autopsy
Search specifically for:
- "[gap name] startup failed" AND "[gap name] startup shut down"
- "[gap name] startup pivot"
- "[gap name] company shut down"
- Companies that tried THIS SPECIFIC gap and failed — WHY did they fail?
- Companies that have been operating in this gap for 3+ years without breakout growth — WHY?

**CRITICAL QUESTIONS:**
- If a well-funded company tried and failed: WHY would you succeed where they failed? If you can't answer specifically, you won't.
- If a company has operated for 5+ years without reaching $10M ARR: the market doesn't support venture-scale outcomes. Period.
- If 2+ companies have pivoted away from this gap: the market is screaming at you. Listen.
- Search for the founder post-mortems — they contain the real reasons, not the PR reasons.

### 3.5 Demand verification
Search for evidence that customers actually WANT this:
- "[gap name] problem" AND "[gap name] pain point"
- "[gap name] request for proposal" AND "[gap name] RFP"
- Forum/Reddit/HN discussions about this pain point
- Job postings that suggest companies are building this in-house
- Conference talks or analyst reports calling out this gap
- "[gap name] I wish there was" AND "[gap name] we need"

**REALITY CHECK:**
- If you cannot find organic demand signals after 5+ searches: the gap is a SOLUTION LOOKING FOR A PROBLEM. Say so. Do not invent demand.
- Job postings for in-house roles mean companies need this but are solving it themselves — which means they DON'T need a vendor.
- "Analyst reports identifying the gap" is weaker evidence than "customers complaining about the gap." Analyst reports are often sponsored content.

### 3.6 Analogy stress-test
If the gap uses an analogy (e.g., "Plaid for X", "Stripe for Y", "Shopify for Z"):
- Identify WHY the original company succeeded
- Check if those EXACT conditions exist in this market:
  - Fragmentation level: Plaid succeeded because 11,000 banks had proprietary, incompatible APIs. Does this market have THOUSANDS of fragmented providers, or just 15-20?
  - Switching costs: Does the solution create lock-in, or can customers swap providers trivially?
  - Network effects: Does the product get better with more users/providers?
  - Regulatory moat: Does compliance create barriers that benefit the aggregator?
  - Data moat: Does the aggregator accumulate proprietary data that gets more valuable over time?

**HARD RULE: If the structural conditions don't match on 3+ of these dimensions, the analogy is INVALID. Say "THE [X] FOR [Y] ANALOGY IS BROKEN" and do not use it to justify the score. Most "X for Y" analogies fail.**

### 3.7 Timing and window analysis
- How fast are incumbents expanding in this specific gap? (Countries/quarter, features/quarter)
- At current expansion rate, when will incumbents cover >80% of the addressable market?
- Is the window measured in months or years?
- Is there a regulatory deadline creating urgency? (Verify the deadline is real and hasn't been delayed)
- Search: "[gap name] window closing" AND "[incumbent] expanding [gap area]"

If the window is <12 months: Timing score CANNOT exceed 5 (not enough time to build and ship).
If incumbents are expanding at >10 countries/quarter: Timing score CANNOT exceed 4.
If an incumbent has announced plans to enter this specific gap: Timing score CANNOT exceed 4.

============================================================
PHASE 4: SCORING (only after Phase 3 is complete for each gap)
============================================================

### 4.1 Scoring dimensions (1-10 each)
- **Opportunity**: Realistic SOM (not TAM), growth rate, pain severity, verified willingness to pay
- **Feasibility**: Technical complexity, regulatory barriers, team requirements, time to MVP
- **Timing**: Window duration, incumbent expansion rate, regulatory deadlines
- **Competition**: Number of funded competitors, incumbent activity, defensibility, switching costs
- **Capital Requirements**: Funding needed to reach PMF, burn rate, time to revenue

**SCORING PSYCHOLOGY RULE: Your first instinct will be to score too high. Before finalizing any dimension score, ask: "What evidence would make me score this LOWER?" If you can think of evidence, search for it.**

### 4.2 Hard scoring caps (non-negotiable, they stack)

**Competition caps:**
- Incumbent has a LIVE product in this specific gap → Competition max 4
- Incumbent product is FREE → Competition max 3
- Incumbent spent >$500M acquiring in this gap → Competition max 3
- Incumbent has >$1B in resources and this is adjacent to their core → Competition max 2
- 3+ startups with $10M+ raised exist → Competition max 5
- A startup has operated 5+ years in this gap without breakout → reduce Competition by 1
- The gap can be solved as a feature of a larger product → Competition max 3

**Timing caps:**
- Incumbent expanding >10 countries/quarter → Timing max 4
- Window <12 months → Timing max 5
- Window description is "closing" or "compressed" → Timing max 5
- Incumbent M&A spend >$1B in the space → Timing max 4
- Incumbent has announced plans to enter this gap → Timing max 4

**Opportunity caps:**
- Realistic 3-year revenue at 5% share <$5M → Opportunity max 4
- Market share is declining (not just small, but shrinking) → Opportunity max 5
- Free alternatives exist from incumbents → Opportunity max 5
- The "problem" is actually the intended design → Opportunity max 2
- Take rate <50 bps with market volume <$10B → Opportunity max 4

**Feasibility caps:**
- Requires money transmitter licenses in 50+ jurisdictions → Feasibility max 4
- Regulatory model relies on a "loophole" that may close → Feasibility max 5
- Requires partnerships with companies that have no incentive to partner → Feasibility max 4

**Thesis caps (from 3.1):**
- If 2+ core assumptions failed → Overall score CANNOT exceed 5.0
- If 3+ core assumptions failed → Overall score CANNOT exceed 4.0

### 4.3 Composite score
Average the 5 dimensions, then apply thesis caps. Show your work:
- List each dimension score with the single strongest piece of evidence
- List each cap that was applied and why
- Show the pre-cap and post-cap score
- Assign the verdict: KILL / NO-GO / CONDITIONAL / INVESTIGATE / GO

### 4.4 Confidence level
- **HIGH**: All 5 dimensions verified by 2+ sources; unit economics validated; thesis assumptions tested
- **MEDIUM**: 3-4 dimensions verified; some assumptions untested
- **LOW**: Significant gaps in verification; relying on extrapolation

**Do not assign HIGH confidence unless you have done the work. HIGH confidence with wrong conclusions is worse than LOW confidence with honest uncertainty.**

============================================================
PHASE 5: CROSS-VALIDATION & BEAR CASE
============================================================

### 5.1 Per-gap bear case (REQUIRED for every gap scoring >5.0)
For EACH gap, write:
- The single most likely reason this will fail (be specific, not generic)
- The strongest incumbent response (what will they do when they notice you?)
- The unit economics trap (how margins could get squeezed to zero)
- The regulatory risk that could kill it overnight
- The demand risk (what if customers don't actually want this — or want it but won't pay?)
- The "what if you're wrong" scenario: if your top assumption is wrong, what happens?

### 5.2 The VC stress-test
For each gap scoring >6.0, answer as a skeptical VC would:
- "Why hasn't anyone built this already? What do you know that the market doesn't?"
- "If this is such a great opportunity, why are VCs funding [competitor] instead of [your gap]?"
- "Your incumbent can build this in a quarter. Why won't they?"
- "Show me a customer who has told you they'd pay for this. Not a hypothetical — an actual person."
- "What happens when [biggest incumbent] enters this space with a free product?"

If you can't answer these convincingly WITH EVIDENCE, the gap is not venture-viable.

### 5.3 Cost of being wrong
For the top-ranked gap, calculate:
- How many months of full-time work would you invest before learning it's a dead end?
- What is the opportunity cost? (What else could you build with that time?)
- What is the minimum viable test to validate demand BEFORE building anything? (If you can't think of one that takes <2 weeks, you don't understand the market well enough.)

### 5.4 Pattern check
- Are all your gaps clustered in one category? (If so, you may be missing adjacent spaces — or the entire category may be closed)
- Do any gaps have the same failure mode? (If so, that failure mode may apply to the whole space. In the stablecoin research, ALL 7 gaps failed for the same reason: incumbents had already moved.)
- Is there a "meta-gap" — a need that none of the identified gaps address?

### 5.5 What-did-I-miss search
Run ALL of these:
- "[TOPIC] nobody is talking about"
- "[TOPIC] contrarian view" AND "[TOPIC] bear case"
- "[TOPIC] failed startup" AND "[TOPIC] shutdown 2025" AND "[TOPIC] shutdown 2026"
- "[TOPIC] overrated" AND "[TOPIC] overhyped"
- "[TOPIC] conference 2026" AND "[TOPIC] podcast 2026" (for emerging perspectives)
- "[TOPIC] surprising" AND "[TOPIC] unexpected trend"
- "[TOPIC] adjacent opportunity" AND "[TOPIC] underrated"

### 5.6 Adjacent opportunity scan
Sometimes the best opportunities are NOT in the gaps you identified, but in adjacent spaces revealed by the research. Search for:
- "[TOPIC] intersection [other field]"
- "[TOPIC] infrastructure" AND "[TOPIC] tooling" AND "[TOPIC] middleware"
- What do the incumbents in this space STILL need to buy/build? (Their gaps are your opportunities — but verify they'd buy, not build)

============================================================
PHASE 6: OUTPUT FORMAT
============================================================

Structure the final output as:

### SECTION 0: BOTTOM LINE UP FRONT
Before any detail, state clearly in 2-3 sentences:
- How many gaps were identified, how many survived validation, and what the top score is
- Whether any gap reached INVESTIGATE or GO status
- If the space is closed, say: "NO VIABLE GAPS FOUND. THIS SPACE IS CLOSED TO NEW ENTRANTS." Do not bury this in paragraph 47.

### SECTION 1: Executive Summary
- 3-5 key findings (all verified with source + date)
- Total M&A spend in the space
- Number of gaps killed in Phase 2 vs. Phase 3 vs. surviving
- The single most important insight from the research

### SECTION 2: Incumbent Landscape (THE MOST IMPORTANT SECTION)
- Per-incumbent profile: what they've built, acquired, and where they're expanding
- Open vs. captive API status for each
- Total addressable market they already cover
- What they could build in one quarter that would kill any startup in this space

### SECTION 3: Startup Landscape
- Funded startups with verified traction
- Failed/stalled startups and why (THIS IS MORE VALUABLE THAN THE SUCCESS STORIES)
- VC investment trends — is money flowing IN or OUT of this space?
- Any startups that pivoted away from this space and why

### SECTION 4: Regulatory Environment
- Verified status of each relevant regulation (with source + date)
- Upcoming deadlines and enforcement dates
- Regulatory risks (loopholes that may close, jurisdictions that may act, bodies that have withdrawn)

### SECTION 5: Gap Analysis (Validated)
For each gap, present:
- One-line thesis
- Thesis assumptions: HOLDS / FAILS for each
- Per-gap incumbent check result
- Unit economics (realistic SOM, take rate, 3-year revenue projection)
- Failed startup evidence
- Demand signals (or lack thereof)
- Analogy stress-test (if applicable)
- Scoring breakdown: 5 dimensions, caps applied, pre-cap and post-cap score
- **VERDICT: KILL / NO-GO / CONDITIONAL / INVESTIGATE / GO**
- If KILL or NO-GO: one sentence explaining why. Do not elaborate. It's dead.

### SECTION 6: M&A & Consolidation
- Deals that reshaped the landscape (with dollar amounts)
- Pattern analysis (is the space consolidating? If yes, new entrants are at a structural disadvantage)
- Failed companies and the specific lessons from their failures

### SECTION 7: Bear Case Analysis
- Per-gap bear case for anything scoring >5.0
- Space-wide bear case: reasons the ENTIRE sector may not support new entrants
- If the space-wide bear case is strong, say so. Do not hide it.

### SECTION 8: Adjacent Opportunities
- Opportunities discovered during research that weren't in the original gap list
- These are presented for awareness only — each would need its own full analysis before pursuing

### SECTION 9: Final Recommendation
- Go/no-go for each gap with the verdict and one-line reasoning
- If "INVESTIGATE": exactly what needs to be validated, and the cheapest/fastest way to validate it
- If "KILL" or "NO-GO" for all gaps: say so clearly. The output "No viable opportunities found" IS a valid and valuable research outcome. It saves months of wasted effort.
- **Never force optimism.** "I spent X hours researching and found nothing viable" is a GOOD outcome — it means the research worked.
- Suggested customer discovery questions for any CONDITIONAL or INVESTIGATE gaps

### SECTION 10: Honesty Audit
Answer these questions at the end of every analysis:
1. What was my initial bias going in? (What did I expect/hope to find?)
2. Did any of my conclusions change during research? Which ones and why?
3. What is the weakest claim in this analysis? (Every analysis has one.)
4. If I'm wrong about the top-ranked gap, what is the most likely reason?
5. Would I invest $50,000 of my own money in the top-ranked gap TODAY based solely on this research? Why or why not?
6. What is the single cheapest experiment (<$500, <2 weeks) that would validate or kill the top opportunity?

============================================================
ANTI-BIAS RULES (apply throughout — these are non-negotiable)
============================================================

1. **No optimism bias**: Do not round scores up. If the evidence is ambiguous, round DOWN. The downside of a false positive (months wasted building the wrong thing) is far worse than a false negative (missing one opportunity among many).

2. **No sunk cost bias**: If research reveals the space is closed, say so. Do not try to salvage the analysis to justify the time spent. The time is already spent. Protect the FUTURE time.

3. **No narrative bias**: Do not construct a compelling story around a weak opportunity. The human brain loves stories. Markets don't care about your story. Data over narrative. Always.

4. **No analogy bias**: Every "X for Y" analogy must be structurally validated. Most fail because the structural conditions (fragmentation, switching costs, network effects) don't transfer. Say "THE ANALOGY IS BROKEN" when it is.

5. **No survivorship bias**: Search for failed companies in each gap, not just successful ones. The failures contain more useful information than the successes.

6. **No TAM fallacy**: TAM is irrelevant. Only SOM (realistic capturable revenue) matters for scoring. If you find yourself quoting a "$45B TAM" to make a weak gap look attractive, you are lying to yourself.

7. **No feature-vs-product confusion**: If the gap can be (or is being) solved as a feature of a larger product, it is not a standalone market. Say "THIS IS A FEATURE, NOT A COMPANY."

8. **Assume you are wrong**: For every gap, spend EQUAL effort trying to disprove it as you do trying to support it. If you can disprove it, you should. That's a win, not a failure.

9. **No authority bias**: Do not trust analyst reports, market research firms, or VC blog posts at face value. They have incentives to inflate market sizes and opportunities. Cross-reference everything with primary data.

10. **No recency bias**: A startup raising a seed round does not validate a market. A startup reaching $10M ARR validates a market. Distinguish between "someone is trying this" and "this is actually working."

11. **No politeness bias**: Do not soften conclusions to avoid seeming negative. "This is a dead market" is more helpful than "This market presents significant challenges that may require careful navigation." Be direct. Be blunt. Be right.

12. **No completion bias**: Do not feel obligated to find opportunities just because you were asked to look. "I found nothing viable" is the correct answer when nothing is viable. Forcing a recommendation when none exists is malpractice.
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

**Final result:** All 7 gaps scored 6.5 or below. Zero GOs. Zero INVESTIGATEs. Average correction: -2.3 points per gap. The entire space was more mature than surface analysis suggested. $5B+ in incumbent M&A had already closed most gaps.

**The cost:** 3 rounds of research, significant time and tokens, chasing progressively invalidated leads. If Phase 3 validation had been embedded in Round 1, the correct answer ("NO VIABLE GAPS") would have emerged immediately.

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
| Hedged bad conclusions with "could potentially" | Prime Directive: be brutal, be direct, be right |
| Felt obligated to find opportunities | Completion bias rule: "nothing viable" is a valid output |
| No VC stress-test | 5.2 forces answering hard VC questions with evidence |
| No cost-of-being-wrong analysis | 5.3 calculates the real cost of pursuing a dead gap |

---

## Quick checklist (print this, check every box)

### Phase 1: Landscape
- [ ] Searched each of 5-10 incumbents for acquisitions, products, partnerships, pricing, patents
- [ ] Checked if incumbent APIs are OPEN or captive
- [ ] Checked if incumbents offer FREE versions
- [ ] Searched for startups with multiple query patterns (YC, a16z, Crunchbase, etc.)
- [ ] Verified employee count and follow-on funding for each startup
- [ ] Called out lifestyle businesses and inflated metrics
- [ ] Checked M&A totals (>$1B = consolidating, >$3B = likely closed)
- [ ] Found and documented failed/shutdown companies with specific reasons
- [ ] Verified every regulation against official sources with exact dates
- [ ] Cross-referenced every market size with 2+ sources
- [ ] Distinguished TAM vs SAM vs SOM for every number
- [ ] Calculated SOM, not just cited TAM

### Phase 2: Gap Identification
- [ ] Killed obvious non-starters BEFORE deep analysis
- [ ] Checked if any "gap" is actually a feature of a larger product
- [ ] Checked if the "problem" is actually the intended design
- [ ] Checked if incumbents could build this in one quarter
- [ ] Reported the kill count

### Phase 3: Per-Gap Validation (repeat for EACH gap)
- [ ] Listed 3-5 thesis assumptions explicitly
- [ ] Tried to DISPROVE each assumption with live search
- [ ] Marked each assumption HOLDS / FAILS / UNVERIFIABLE
- [ ] Applied thesis caps if 2+ assumptions failed
- [ ] Searched for incumbents in THIS SPECIFIC gap (not just the broad space)
- [ ] Checked if any incumbent offers a FREE version
- [ ] Calculated realistic revenue at 5% market share after 3 years
- [ ] Checked for fee compression and free alternatives
- [ ] Did the take-rate math (bps x volume = actual revenue)
- [ ] Searched for failed startups in THIS SPECIFIC gap
- [ ] Found and analyzed WHY they failed
- [ ] Searched for organic demand signals (forums, RFPs, job postings)
- [ ] Confirmed demand is real, not invented
- [ ] Stress-tested any "X for Y" analogies structurally
- [ ] Said "THE ANALOGY IS BROKEN" if conditions don't match
- [ ] Checked incumbent expansion rate to estimate window duration

### Phase 4: Scoring
- [ ] Applied ALL relevant scoring caps (they stack)
- [ ] Showed pre-cap and post-cap scores
- [ ] Assigned verdict: KILL / NO-GO / CONDITIONAL / INVESTIGATE / GO
- [ ] Assigned confidence level with justification
- [ ] Used SOM not TAM for opportunity scoring
- [ ] Asked "what evidence would make me score this LOWER?" for each dimension

### Phase 5: Cross-Validation
- [ ] Wrote specific bear case for each gap >5.0
- [ ] Ran VC stress-test for each gap >6.0
- [ ] Calculated cost of being wrong for top gap
- [ ] Identified cheapest experiment to validate/kill top opportunity
- [ ] Ran "what did I miss" searches
- [ ] Searched for adjacent opportunities
- [ ] Checked for pattern/bias in your own analysis
- [ ] Checked if all gaps fail for the same root cause

### Honesty Audit
- [ ] Stated initial bias going in
- [ ] Identified what changed during research
- [ ] Named the weakest claim in the analysis
- [ ] Answered: would I invest $50K of my own money based on this research?
- [ ] Identified the single cheapest validation experiment
- [ ] If no gaps are viable, said so without apology
