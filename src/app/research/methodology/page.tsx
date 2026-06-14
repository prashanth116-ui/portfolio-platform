import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Deep Research Methodology — Prashanth Sundaram",
  description:
    "Battle-tested prompt framework for market research: 6 phases, 12 anti-bias rules, built after 14 V1 failures in stablecoin gap analysis.",
};
import {
  CorrectionChart,
  CollapsiblePhase,
  VerdictBadge,
  FailureFixTable,
  RuleCard,
  RoundSummary,
} from "@/components/research/methodology-blocks";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const ALL_GAPS = [
  { rank: 1, name: "Merchant Checkout SDK", original: 8.7, validated: 5.5, verdict: "NO-GO" },
  { rank: 2, name: "Compliance-as-a-Service", original: 8.5, validated: 6.5, verdict: "CONDITIONAL" },
  { rank: 3, name: "Yield Optimization", original: 8.3, validated: 6.3, verdict: "CONDITIONAL" },
  { rank: 4, name: "AI Middleware", original: 8.0, validated: 6.5, verdict: "CONDITIONAL" },
  { rank: 5, name: "Dispute Resolution", original: 7.8, validated: 4.8, verdict: "KILL" },
  { rank: 6, name: "Non-USD Stablecoins", original: 7.8, validated: 5.5, verdict: "NO-GO" },
  { rank: 7, name: "Off-Ramp Aggregation", original: 6.8, validated: 3.9, verdict: "KILL" },
];

const FAILURE_FIXES = [
  { failure: "Scored gaps before validating them", fix: "Phase 3 validates BEFORE scoring" },
  { failure: "Checked incumbents globally, not per-gap", fix: "Per-gap incumbent search required" },
  { failure: "No unit economics analysis", fix: "Revenue model validation forced" },
  { failure: 'Accepted analogies uncritically ("Plaid for X")', fix: "Structural analogy stress-test" },
  { failure: 'Didn\'t check if the "problem" was intentional', fix: "Tests if pain is actually a feature" },
  { failure: "Didn't search for failed companies per gap", fix: "Per-gap failed startup autopsy" },
  { failure: "Didn't verify demand exists", fix: "Organic demand signal search" },
  { failure: "Scoring caps were too lenient", fix: "Aggressive stacking caps" },
  { failure: "Allowed optimism to persist across rounds", fix: "Anti-bias rules applied throughout" },
  { failure: "Treated TAM as meaningful", fix: 'SOM only; TAM fallacy explicitly banned' },
  { failure: 'Hedged conclusions with "could potentially"', fix: "Brutal honesty: be direct, be right" },
  { failure: "Felt obligated to find opportunities", fix: '"Nothing viable" is a valid output' },
  { failure: "No VC stress-test", fix: "Hard VC questions with evidence required" },
  { failure: "No cost-of-being-wrong analysis", fix: "Real cost of pursuing dead gaps calculated" },
];

const ANTI_BIAS_RULES = [
  { name: "No Optimism Bias", description: "If evidence is ambiguous, round DOWN. False positives waste months; false negatives miss one opportunity among many." },
  { name: "No Sunk Cost Bias", description: "If research reveals the space is closed, say so. Don't try to salvage analysis to justify time already spent." },
  { name: "No Narrative Bias", description: "Don't construct compelling stories around weak opportunities. Markets don't care about your story. Data over narrative." },
  { name: "No Analogy Bias", description: 'Every "X for Y" analogy must be structurally validated. Most fail because conditions don\'t transfer.' },
  { name: "No Survivorship Bias", description: "Search for failed companies in each gap, not just successes. Failures contain more useful information." },
  { name: "No TAM Fallacy", description: "TAM is irrelevant. Only SOM matters. Quoting a $45B TAM to make a weak gap look attractive is self-deception." },
  { name: "No Feature-vs-Product Confusion", description: "If the gap can be solved as a feature of a larger product, it is not a standalone market." },
  { name: "Assume You Are Wrong", description: "Spend EQUAL effort trying to disprove each gap as you do supporting it. Disproving a bad idea is a win." },
  { name: "No Authority Bias", description: "Don't trust analyst reports or VC blog posts at face value. They have incentives to inflate opportunities." },
  { name: "No Recency Bias", description: "A seed round doesn't validate a market. $10M ARR validates a market. Distinguish trying from working." },
  { name: "No Politeness Bias", description: '"This is a dead market" is more helpful than "presents significant challenges requiring careful navigation."' },
  { name: "No Completion Bias", description: "Don't feel obligated to find opportunities just because you were asked. \"Nothing viable\" is the correct answer when nothing is viable." },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ResearchMethodologyPage() {
  return (
    <div className="space-y-12">
      {/* Back link */}
      <Link
        href="/research"
        className="inline-flex items-center gap-1.5 text-sm text-[#5ba3e6] hover:text-[#7bb8ed]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Research
      </Link>

      {/* ---- Section 1: Header ---- */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Deep Research Methodology
        </h1>
        <p className="mt-2 max-w-2xl text-[#a0a0a0]">
          A battle-tested prompt framework for market research and gap analysis
          &mdash; built after 3 rounds of stablecoin research proved that
          surface-level scoring hides fatal flaws.
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-[#666]">
          <span>V2.1</span>
          <span>&middot;</span>
          <span>June 2026</span>
          <span className="rounded-full bg-[#00d97e]/10 px-2 py-0.5 text-[10px] font-medium text-[#00d97e]">
            Open Source
          </span>
        </div>
      </section>

      {/* ---- Section 2: The $3B Lesson ---- */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white">The $3B Lesson</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#c0c0c0]">
            In June 2026, I ran a stablecoin infrastructure audit to find viable
            startup opportunities. The first pass identified 7 gaps &mdash; the
            top-ranked scored 8.7/10 with a &quot;$45B+ TAM&quot; and an
            &quot;18-month window.&quot; It was wrong. Every score was inflated
            because validation happened after scoring, not before. Three
            progressively deeper rounds exposed the truth: $5B+ in incumbent M&amp;A
            had already closed most gaps.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <RoundSummary
            round={1}
            label="Surface-Level Scoring"
            gapsTested={7}
            avgCorrection="N/A"
            finding="Scores ranged 6.8 to 8.7 — all looked viable"
            details={[
              "Top gap: Merchant Checkout SDK at 8.7/10",
              '"$45B+ TAM" cited without SOM calculation',
              "Stripe's $1.1B Bridge acquisition not factored into scores",
              "No per-gap incumbent validation performed",
            ]}
          />
          <RoundSummary
            round={2}
            label="Deep-Dive Top 3"
            gapsTested={3}
            avgCorrection="-1.7 pts"
            finding="All three top gaps dropped on validation"
            details={[
              "Compliance: 8.5 \u2192 6.5 (Elliptic raised $120M, incumbents at 70%)",
              "Yield: 8.3 \u2192 6.3 (Veda had $3.7B TVL, zero-fee competition)",
              "AI Middleware: 8.0 \u2192 6.5 (Crossmint $23.6M funding, 1,100% growth)",
            ]}
          />
          <RoundSummary
            round={3}
            label="Deep-Dive Remaining 3"
            gapsTested={3}
            avgCorrection="-2.7 pts"
            finding="Largest corrections — fundamental thesis failures"
            details={[
              "Dispute Resolution: 7.8 \u2192 4.8 (\u20183no chargebacks\u2019 is the feature, not a bug)",
              "Non-USD Stablecoins: 7.8 \u2192 5.5 (only 0.24% of market, declining)",
              'Off-Ramp Aggregation: 6.8 \u2192 3.9 ("Plaid for crypto" analogy broken)',
            ]}
          />
        </div>
      </section>

      {/* ---- Section 3: The Correction Visual ---- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Every Gap, Corrected
          </h2>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            All 7 gaps with original scores struck through and validated scores
            applied. Average correction: -2.3 points. Zero gaps reached
            INVESTIGATE or GO.
          </p>
        </div>
        <CorrectionChart gaps={ALL_GAPS} />
      </section>

      {/* ---- Section 4: What Went Wrong ---- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">What V1 Got Wrong</h2>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            14 specific failures in the V1 methodology and how V2 fixes each
            one. The core problem: scoring before validating.
          </p>
        </div>
        <FailureFixTable rows={FAILURE_FIXES} />
      </section>

      {/* ---- Section 5: The Methodology ---- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">The Methodology</h2>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            6 phases, executed in strict order. No gap receives a score until it
            survives every validation gate.
          </p>
        </div>

        <div className="space-y-2">
          <CollapsiblePhase
            title="Phase 1: Landscape Mapping"
            summary="Map incumbents, startups, M&A, regulations, and market data BEFORE identifying any gaps."
          >
            <div className="space-y-3">
              <p>
                <strong className="text-white">1.1 Training data is unreliable.</strong>{" "}
                Every claim about market size, competitor status, funding, pricing,
                or adoption must be verified via live web search. Unverified data is
                labeled [UNVERIFIED].
              </p>
              <p>
                <strong className="text-white">1.2 Incumbent landscape</strong> &mdash;{" "}
                the most important step. For each of the top 5-10 incumbents: search
                for acquisitions, product launches, partnerships, pricing, patents,
                API openness, and free tiers. Document what they&apos;ve built, how fast
                they&apos;re expanding, and whether they could add any gap as a feature in
                one quarter.
              </p>
              <p>
                <strong className="text-white">1.3 Startup discovery.</strong>{" "}
                Search YC, a16z, Crunchbase, Tracxn, PitchBook, Product Hunt.
                Verify employee count, follow-on funding, and traction. Call out
                lifestyle businesses and inflated metrics.
              </p>
              <p>
                <strong className="text-white">1.4 M&amp;A and consolidation.</strong>{" "}
                If total M&amp;A spend exceeds $3B, the space is likely closed to new
                entrants. Document failures and shutdowns &mdash; these are the most
                valuable data points.
              </p>
              <p>
                <strong className="text-white">1.5 Regulatory environment.</strong>{" "}
                Verify every regulation against official sources. Don&apos;t cite a
                regulation as a &quot;tailwind&quot; without confirming it&apos;s in force.
              </p>
              <p>
                <strong className="text-white">1.6 Market data verification.</strong>{" "}
                Cross-reference every market size with 2+ sources. Distinguish TAM
                vs SAM vs SOM. TAM is a vanity metric &mdash; only SOM matters.
              </p>
            </div>
          </CollapsiblePhase>

          <CollapsiblePhase
            title="Phase 2: Gap Identification & Kill Gate"
            summary="Identify candidates, then immediately kill obvious non-starters before wasting analysis time."
          >
            <div className="space-y-3">
              <p>
                <strong className="text-white">Identify candidate gaps</strong>{" "}
                based on the landscape mapping. For each, write one sentence
                describing the thesis.
              </p>
              <p>
                <strong className="text-white">Kill criteria</strong> (any one
                triggers immediate elimination):
              </p>
              <ul className="ml-4 list-disc space-y-1 text-[#a0a0a0]">
                <li>Incumbent has a live product covering &gt;50% of market</li>
                <li>M&amp;A spend by incumbents in this gap exceeds $500M</li>
                <li>The gap is actually a feature, not a standalone market</li>
                <li>The &quot;problem&quot; is the intended design</li>
                <li>An incumbent could build this in one quarter</li>
                <li>The only customers are the incumbents themselves</li>
              </ul>
              <p className="text-[#f6c343]">
                Report the kill count. If 5 of 7 gaps die in Phase 2, that itself
                is a finding: the space is mature.
              </p>
            </div>
          </CollapsiblePhase>

          <CollapsiblePhase
            title="Phase 3: Per-Gap Deep Validation"
            summary="The step V1 skipped entirely. Every surviving gap gets 7 sub-validations before any score is assigned."
            badge="Key Innovation"
          >
            <div className="space-y-3">
              <p className="text-[#f6c343]">
                This phase is the core fix. V1 scored first, validated later &mdash;
                costing 3 rounds of wasted analysis. V2 embeds validation into the
                scoring process.
              </p>
              <p>
                <strong className="text-white">3.1 Thesis stress-test.</strong>{" "}
                Write 3-5 explicit assumptions. Try to disprove each one. Mark
                HOLDS / FAILS / UNVERIFIABLE. Hard rule: 2+ failures cap the score
                at 5.0. 3+ failures cap at 4.0.
              </p>
              <p>
                <strong className="text-white">3.2 Per-gap incumbent check.</strong>{" "}
                Search for incumbents in THIS specific gap. If an incumbent has a
                live, free product: competition score capped at 3.
              </p>
              <p>
                <strong className="text-white">3.3 Unit economics.</strong>{" "}
                Calculate realistic revenue at 5% market share after 3 years. If
                &lt;$5M ARR, this is not venture-scale.
              </p>
              <p>
                <strong className="text-white">3.4 Failed startup autopsy.</strong>{" "}
                Find companies that tried this specific gap and failed. If a
                well-funded company tried and failed, you need a specific reason
                you&apos;d succeed.
              </p>
              <p>
                <strong className="text-white">3.5 Demand verification.</strong>{" "}
                Search for organic demand signals: forums, RFPs, job postings. If
                you can&apos;t find demand after 5+ searches, it&apos;s a solution looking for
                a problem.
              </p>
              <p>
                <strong className="text-white">3.6 Analogy stress-test.</strong>{" "}
                If the gap uses an &quot;X for Y&quot; analogy, validate the structural
                conditions: fragmentation, switching costs, network effects,
                regulatory moat, data moat. If 3+ don&apos;t match, the analogy is
                broken.
              </p>
              <p>
                <strong className="text-white">3.7 Timing and window.</strong>{" "}
                How fast are incumbents expanding? When will they cover 80%+ of
                the addressable market? If the window is &lt;12 months, timing
                score capped at 5.
              </p>
            </div>
          </CollapsiblePhase>

          <CollapsiblePhase
            title="Phase 4: Scoring with Hard Caps"
            summary="5 dimensions scored 1-10, with aggressive caps that stack. No gaming the system."
          >
            <div className="space-y-3">
              <p>
                <strong className="text-white">Dimensions:</strong> Opportunity,
                Feasibility, Timing, Competition, Capital Requirements &mdash; each
                scored 1-10 with the single strongest piece of evidence.
              </p>
              <p>
                <strong className="text-white">Scoring psychology rule:</strong>{" "}
                Before finalizing any score, ask: &quot;What evidence would make me
                score this LOWER?&quot; If you can think of evidence, search for it.
              </p>
              <p>
                <strong className="text-white">Hard caps (examples):</strong>
              </p>
              <ul className="ml-4 list-disc space-y-1 text-[#a0a0a0]">
                <li>Incumbent has live product in gap &rarr; Competition max 4</li>
                <li>Incumbent product is free &rarr; Competition max 3</li>
                <li>3-year revenue at 5% share &lt;$5M &rarr; Opportunity max 4</li>
                <li>Window &lt;12 months &rarr; Timing max 5</li>
                <li>2+ thesis assumptions failed &rarr; Overall max 5.0</li>
                <li>3+ thesis assumptions failed &rarr; Overall max 4.0</li>
              </ul>
              <p className="text-[#a0a0a0]">
                Caps stack. A gap can hit multiple caps simultaneously, driving
                the score down aggressively.
              </p>
            </div>
          </CollapsiblePhase>

          <CollapsiblePhase
            title="Phase 5: Cross-Validation & Bear Case"
            summary="Per-gap bear case, VC stress-test, cost-of-being-wrong, and a 'what did I miss' search."
          >
            <div className="space-y-3">
              <p>
                <strong className="text-white">Bear case</strong> (required for
                every gap &gt;5.0): most likely failure reason, strongest incumbent
                response, unit economics trap, regulatory risk, demand risk.
              </p>
              <p>
                <strong className="text-white">VC stress-test</strong> (required
                for every gap &gt;6.0): answer as a skeptical VC. &quot;Why hasn&apos;t anyone
                built this?&quot; &quot;What happens when the biggest incumbent enters with
                a free product?&quot;
              </p>
              <p>
                <strong className="text-white">Cost of being wrong:</strong> How
                many months before you learn it&apos;s a dead end? What&apos;s the
                opportunity cost? What&apos;s the minimum viable test (&lt;2 weeks)?
              </p>
              <p>
                <strong className="text-white">Pattern check:</strong> Are all
                gaps clustered? Do they share a failure mode? In the stablecoin
                research, all 7 gaps failed for the same reason: incumbents had
                already moved.
              </p>
            </div>
          </CollapsiblePhase>

          <CollapsiblePhase
            title="Anti-Bias Rules"
            summary="12 cognitive bias countermeasures applied throughout the entire analysis."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {ANTI_BIAS_RULES.map((rule, i) => (
                <RuleCard
                  key={i}
                  number={i + 1}
                  name={rule.name}
                  description={rule.description}
                />
              ))}
            </div>
          </CollapsiblePhase>
        </div>
      </section>

      {/* ---- Section 6: Verdict System ---- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Verdict System</h2>
          <p className="mt-1 text-sm text-[#a0a0a0]">
            Every gap gets exactly one verdict. No hedging.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              verdict: "KILL",
              range: "< 5.0",
              desc: "Do not pursue. Do not revisit.",
            },
            {
              verdict: "NO-GO",
              range: "5.0 - 5.9",
              desc: "Not viable standalone. Might be a feature.",
            },
            {
              verdict: "CONDITIONAL",
              range: "6.0 - 6.9",
              desc: "Only viable under specific conditions.",
            },
            {
              verdict: "INVESTIGATE",
              range: "7.0 - 7.9",
              desc: "Worth customer discovery.",
            },
            {
              verdict: "GO",
              range: "8.0+",
              desc: "Strong opportunity. Move to MVP.",
            },
          ].map((v) => (
            <div
              key={v.verdict}
              className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 text-center"
            >
              <VerdictBadge verdict={v.verdict} />
              <p className="mt-2 text-lg font-bold text-white">{v.range}</p>
              <p className="mt-1 text-xs text-[#a0a0a0]">{v.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#666]">
          In 3 rounds of stablecoin research, zero gaps reached INVESTIGATE or
          GO. Most research should expect zero GOs.
        </p>
      </section>

      {/* ---- Section 7: Use It Yourself ---- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Use It Yourself</h2>
        <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
          <p className="text-sm leading-relaxed text-[#c0c0c0]">
            The full V2.1 prompt is open source. Copy it, replace{" "}
            <code className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-xs text-[#5ba3e6]">
              [TOPIC]
            </code>{" "}
            with your market, and run it with any model that supports deep
            research (Claude, ChatGPT, Gemini). The prompt works best with
            web-search-enabled models that can verify claims in real time.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://github.com/prashanth116-ui/portfolio-platform/blob/master/prompts/deep-research.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#185FA5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a6dba]"
            >
              View Raw Prompt on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-[#a0a0a0]">How to use:</p>
            <ol className="ml-4 list-decimal space-y-1 text-xs text-[#a0a0a0]">
              <li>
                Copy the prompt from the GitHub link above
              </li>
              <li>
                Replace <code className="rounded bg-[#2a2a2a] px-1 text-[#5ba3e6]">[TOPIC]</code> with
                your market (e.g., &quot;stablecoin infrastructure&quot;, &quot;AI developer tools&quot;)
              </li>
              <li>
                Paste into a model with web search enabled (Claude with tool use,
                ChatGPT with browsing, Gemini with grounding)
              </li>
              <li>
                Let it run through all 6 phases &mdash; do not interrupt or skip phases
              </li>
              <li>
                Expect most gaps to score below 7.0. That&apos;s the prompt working correctly.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ---- Section 8: See It In Action ---- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">See It In Action</h2>
        <Link
          href="/research/stablecoin"
          className="group flex items-center gap-4 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5 transition-colors hover:border-[#5ba3e6]/30 hover:bg-[#1f1f1f]"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#5ba3e6]/15">
            <span className="text-lg">$</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white group-hover:text-[#5ba3e6]">
              Stablecoin Infrastructure Research
            </p>
            <p className="mt-0.5 text-xs text-[#a0a0a0]">
              The case study that created this methodology &mdash; 7 gaps
              analyzed across 3 rounds, all corrected downward by an average of
              2.3 points.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
