// Drop this into your EW Scanner page — e.g. as a collapsible "Learn" section
// Tailwind classes assumed. Adjust to match your design system.

export default function ElliottWaveLearningModule() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <header>
        <h1 className="text-3xl font-semibold mb-2">Elliott Wave Learning Module</h1>
        <p className="text-neutral-600">
          A progressive guide from first principles to professional-grade analysis.
          Work through it in order — each section builds on the last.
        </p>
      </header>

      {/* MODULE 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 1 — Foundations</h2>

        <h3 className="text-lg font-medium">1.1 What Elliott Wave Theory Says</h3>
        <p>
          Markets move in repeating 8-wave cycles driven by crowd psychology: a{" "}
          <strong>5-wave impulse</strong> in the direction of the trend, followed by a{" "}
          <strong>3-wave correction</strong> against it.
        </p>
        <pre className="bg-neutral-100 p-3 rounded text-sm font-mono">
{`Impulse (trend):     1 — 2 — 3 — 4 — 5
Correction:          A — B — C`}
        </pre>
        <p>
          This pattern is <strong>fractal</strong> — it repeats at every timeframe, from
          monthly charts down to one-minute bars.
        </p>

        <h3 className="text-lg font-medium">1.2 The 5-Wave Impulse</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 w-20">Wave</th>
              <th className="text-left p-2">Character</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-medium">1</td><td className="p-2">Initial move; often unnoticed, looks like noise</td></tr>
            <tr className="border-b"><td className="p-2 font-medium">2</td><td className="p-2">Retraces wave 1 (typically 50–61.8%); never retraces 100%</td></tr>
            <tr className="border-b"><td className="p-2 font-medium">3</td><td className="p-2">The powerhouse — usually longest, strongest, never the shortest</td></tr>
            <tr className="border-b"><td className="p-2 font-medium">4</td><td className="p-2">Sideways/shallow pullback (typically 23.6–38.2% of wave 3)</td></tr>
            <tr className="border-b"><td className="p-2 font-medium">5</td><td className="p-2">Final push; often weaker momentum than wave 3 (divergence)</td></tr>
          </tbody>
        </table>

        <h3 className="text-lg font-medium">1.3 The 3-Wave Correction</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 w-20">Wave</th>
              <th className="text-left p-2">Character</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2 font-medium">A</td><td className="p-2">First move against the prior trend</td></tr>
            <tr className="border-b"><td className="p-2 font-medium">B</td><td className="p-2">Counter-rally (often traps traders thinking trend resumed)</td></tr>
            <tr className="border-b"><td className="p-2 font-medium">C</td><td className="p-2">Final leg; typically equal to wave A or 1.618× wave A</td></tr>
          </tbody>
        </table>

        <h3 className="text-lg font-medium">1.4 The Three Unbreakable Rules</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Wave 2 never retraces more than 100% of wave 1</strong></li>
          <li><strong>Wave 3 is never the shortest</strong> of waves 1, 3, and 5</li>
          <li><strong>Wave 4 never overlaps wave 1's price territory</strong> (in standard impulses)</li>
        </ol>
        <p className="text-neutral-600 italic">If any rule breaks, your count is wrong. Recount.</p>
      </section>

      {/* MODULE 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 2 — The Math</h2>

        <h3 className="text-lg font-medium">2.1 Fibonacci Retracements (where waves end)</h3>
        <p><strong>Wave 2 retracement of wave 1:</strong></p>
        <ul className="list-disc pl-6">
          <li>Shallow: 38.2% (rare, suggests strong trend)</li>
          <li>Typical: 50% or 61.8%</li>
          <li>Deep: 78.6% (last-chance entry)</li>
        </ul>
        <p><strong>Wave 4 retracement of wave 3:</strong></p>
        <ul className="list-disc pl-6">
          <li>Typical: 23.6% or 38.2% of wave 3</li>
          <li>Must stop above wave 1's peak (rule 3)</li>
        </ul>

        <h3 className="text-lg font-medium">2.2 Fibonacci Projections (where waves go)</h3>
        <p><strong>Wave 3 projection from wave 2:</strong></p>
        <ul className="list-disc pl-6">
          <li>Minimum: 1.618 × wave 1</li>
          <li>Common: 2.618 × wave 1</li>
          <li>Extended: 4.236 × wave 1</li>
        </ul>
        <p><strong>Wave 5 projection — three methods, use them together:</strong></p>
        <ul className="list-disc pl-6">
          <li>Equal to wave 1 (common when wave 3 extended)</li>
          <li>0.618 × the net distance of waves 1–3</li>
          <li>1.618 × wave 1 (when wave 5 itself extends)</li>
        </ul>
        <p><strong>Correction targets:</strong></p>
        <ul className="list-disc pl-6">
          <li>Zigzag wave C: 1.0 or 1.618 × wave A</li>
          <li>Flat wave C: 1.0 or 1.382 × wave A</li>
        </ul>

        <h3 className="text-lg font-medium">2.3 The Confluence Method</h3>
        <p>
          Draw all three projections for your target wave. Where two or more cluster,
          that's your high-probability reversal zone. Combine with prior structural
          support/resistance for confluence.
        </p>
      </section>

      {/* MODULE 3 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 3 — Reading Corrections</h2>

        <h3 className="text-lg font-medium">3.1 Identify the First Leg</h3>
        <p>The first leg of any correction tells you what pattern you're in:</p>
        <ul className="list-disc pl-6">
          <li><strong>5-wave first leg</strong> → you're in a <strong>zigzag</strong></li>
          <li><strong>3-wave first leg</strong> → you're in a <strong>flat or triangle</strong></li>
        </ul>

        <h3 className="text-lg font-medium">3.2 The Three Correction Families</h3>
        <p><strong>Zigzag (5-3-5)</strong> — sharp, trending correction. Wave C usually equals wave A or extends to 1.618× A. Common in wave 2 positions.</p>
        <p><strong>Flat (3-3-5)</strong> — sideways correction with three sub-variants:</p>
        <ul className="list-disc pl-6">
          <li><em>Regular flat:</em> B ≈ 90–100% of A; C ≈ A</li>
          <li><em>Expanded flat:</em> B exceeds the start of A (&gt;100%); C extends beyond A. Very common in wave 4.</li>
          <li><em>Running flat:</em> C fails to reach end of A. Rare. Shows strong underlying trend.</li>
        </ul>
        <p>
          <strong>Triangle (3-3-3-3-3)</strong> — five overlapping legs (A-B-C-D-E),
          each itself a 3-wave move, contracting into an apex. Almost always appears
          in wave 4 or wave B, never in wave 2. Breakout direction matches the prior trend.
        </p>
        <p>
          <strong>Combinations (W-X-Y or W-X-Y-X-Z)</strong> — two or three corrective
          patterns linked by X waves. Appear when price needs to consume time rather than distance.
        </p>

        <h3 className="text-lg font-medium">3.3 Real-Time Correction Checklist</h3>
        <ul className="list-disc pl-6">
          <li>Is the first leg impulsive (5) or corrective (3)?</li>
          <li>Is wave B retracing deeply (&gt;61.8% suggests flat) or shallowly (&lt;61.8% suggests zigzag)?</li>
          <li>Are legs overlapping heavily? → triangle</li>
          <li>Is momentum weakening progressively? → correction nearing end</li>
        </ul>
      </section>

      {/* MODULE 4 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 4 — Spotting Wave 3 vs Wave 5</h2>
        <p className="italic text-neutral-600">
          The single most valuable skill in Elliott analysis. Wave 3s are where money
          is made. Wave 5s are where it's lost.
        </p>

        <h3 className="text-lg font-medium">4.1 Wave 3 Fingerprints</h3>
        <ul className="list-disc pl-6">
          <li>Strongest momentum reading of the entire sequence (RSI, MACD at extremes)</li>
          <li>Highest volume</li>
          <li>Gaps in the direction of the trend (breakaway or measuring gaps)</li>
          <li>News catches up to price; fundamentals "suddenly" look great</li>
          <li>Breadth confirms (most stocks participating)</li>
          <li><strong>No divergences on oscillators</strong></li>
        </ul>

        <h3 className="text-lg font-medium">4.2 Wave 5 Fingerprints</h3>
        <ul className="list-disc pl-6">
          <li>Momentum <strong>diverges</strong> — price makes a new high, RSI/MACD does not</li>
          <li>Volume <strong>lower</strong> than wave 3</li>
          <li>Breadth <strong>narrows</strong> — fewer stocks making new highs</li>
          <li>Sentiment euphoric; retail FOMO peaks</li>
          <li>Often forms an <strong>ending diagonal</strong> (wedge pattern with overlapping waves)</li>
          <li>Terminal "throwover" above trendline, then sharp reversal</li>
        </ul>

        <h3 className="text-lg font-medium">4.3 The "Third of a Third" Principle</h3>
        <p>
          The middle of wave 3 (wave 3 of wave 3 at any degree) is the most violent,
          most directional point in any impulse. If price is accelerating with no
          divergence, you're probably there. Stay in the trade.
        </p>
      </section>

      {/* MODULE 5 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 5 — Advanced Patterns</h2>

        <h3 className="text-lg font-medium">5.1 Diagonals (Wedge Impulses)</h3>
        <p>
          Diagonals are wedge-shaped 5-wave patterns where rules bend slightly. They
          appear in specific positions only.
        </p>
        <p><strong>Leading diagonal</strong> — appears in wave 1 position or wave A of a zigzag. Signals the start of a new trend.</p>
        <p><strong>Ending diagonal</strong> — appears in wave 5 or wave C. Signals the trend is exhausted. The more famous and tradeable of the two.</p>
        <p><strong>Structure (both):</strong></p>
        <ul className="list-disc pl-6">
          <li>Five waves labeled 1-2-3-4-5</li>
          <li>Sub-wave counts: <strong>5-3-5-3-5</strong> (ending) or <strong>3-3-3-3-3</strong> (leading)</li>
          <li>Wave 4 <strong>overlaps</strong> wave 1 (the only impulse where this is allowed)</li>
          <li>Converging trendlines (wedge)</li>
          <li>Each wave typically shorter than the previous</li>
        </ul>
        <p>
          <strong>Trading ending diagonals:</strong> wait for the throwover above the
          upper trendline, then a reversal back inside → that's your entry. Stop just
          beyond the throwover. Target: the start of the diagonal. Reversals are violent.
        </p>

        <h3 className="text-lg font-medium">5.2 Extensions</h3>
        <p>
          In any impulse, <strong>one of waves 1, 3, or 5 typically extends</strong> —
          meaning it's noticeably longer than the other two with clearly visible internal
          sub-waves.
        </p>
        <p><strong>Wave 3 extension (~60% of cases)</strong> — the textbook impulse. Waves 1 and 5 roughly equal.</p>
        <p>
          <strong>Wave 5 extension (~30%)</strong> — common in commodities and late
          bull runs. Classic blow-off top. Critical: post-impulse correction retraces
          deeply, often back to wave 2 of the extended fifth. Tighten stops aggressively.
        </p>
        <p>
          <strong>Wave 1 extension (~10%)</strong> — rare. First wave is the strongest.
          Often seen off major bear-market lows.
        </p>
        <p><strong>Practical use:</strong></p>
        <ul className="list-disc pl-6">
          <li>After wave 3, measure it against wave 1</li>
          <li>If wave 3 &lt; 1.618 × wave 1 → suspect wave 5 will extend</li>
          <li>If wave 3 &gt; 2.618 × wave 1 → wave 3 was the extension; expect a subdued wave 5</li>
        </ul>

        <h3 className="text-lg font-medium">5.3 Truncations (Failed Fifths)</h3>
        <p>
          A truncation is when wave 5 fails to exceed the end of wave 3 — price makes
          a lower high in an uptrend before reversing. Signals <strong>extreme underlying
          weakness</strong> and almost always precedes a severe reversal.
        </p>
        <p><strong>Fingerprints:</strong></p>
        <ul className="list-disc pl-6">
          <li>Wave 3 was unusually strong / extended</li>
          <li>Wave 4 was sharp and deep</li>
          <li>Severe momentum divergence on wave 5</li>
          <li>Wave 5 still completes a full 5-wave structure internally — it just falls short</li>
        </ul>
        <p>
          <strong>Trading:</strong> entry on break of wave 4's low (in an uptrend
          truncation). Stop above wave 5's high. Targets are aggressive — these reversals run.
        </p>
      </section>

      {/* MODULE 6 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 6 — Multi-Timeframe Analysis</h2>
        <p className="italic text-neutral-600">
          This is where amateurs get destroyed and professionals separate themselves.
        </p>

        <h3 className="text-lg font-medium">6.1 The Nine Degrees of Trend</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Degree</th>
              <th className="text-left p-2">Duration</th>
              <th className="text-left p-2">Notation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Grand Supercycle</td><td className="p-2">multi-century</td><td className="p-2">ⓘ ⓘⓘ ⓘⓘⓘ</td></tr>
            <tr className="border-b"><td className="p-2">Supercycle</td><td className="p-2">decades</td><td className="p-2">(I) (II) (III)</td></tr>
            <tr className="border-b"><td className="p-2">Cycle</td><td className="p-2">years</td><td className="p-2">I II III</td></tr>
            <tr className="border-b"><td className="p-2">Primary</td><td className="p-2">months–years</td><td className="p-2">① ② ③</td></tr>
            <tr className="border-b"><td className="p-2">Intermediate</td><td className="p-2">weeks–months</td><td className="p-2">(1) (2) (3)</td></tr>
            <tr className="border-b"><td className="p-2">Minor</td><td className="p-2">weeks</td><td className="p-2">1 2 3</td></tr>
            <tr className="border-b"><td className="p-2">Minute</td><td className="p-2">days</td><td className="p-2">(i) (ii) (iii)</td></tr>
            <tr className="border-b"><td className="p-2">Minuette</td><td className="p-2">hours</td><td className="p-2">i ii iii</td></tr>
            <tr className="border-b"><td className="p-2">Subminuette</td><td className="p-2">minutes</td><td className="p-2">small letters</td></tr>
          </tbody>
        </table>

        <h3 className="text-lg font-medium">6.2 Why Degree Matters</h3>
        <p>
          Every wave is made of smaller waves. A Primary wave 3 contains five
          Intermediate waves. Each Intermediate wave 3 contains five Minor waves. And so on.
        </p>
        <p>
          <strong>Degree mismatch is the #1 source of bad counts.</strong> If you're
          counting a "wave 5 top" on a 5-minute chart, you're probably looking at a
          subwave of a larger wave 3 with much further to run.
        </p>

        <h3 className="text-lg font-medium">6.3 Top-Down Workflow</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Weekly chart</strong> — identify the largest trend you care about. Are we in a higher-degree wave 3 (extended trend ahead) or wave 5 (ending soon)?</li>
          <li><strong>Daily chart</strong> — zoom into the current subwave. This is your "working degree."</li>
          <li><strong>4-hour / hourly chart</strong> — look for subwaves of the daily count. Entries live here.</li>
          <li><strong>15-minute chart</strong> — fine-tune stops and scaling. Don't count at this degree unless scalping.</li>
        </ol>

        <h3 className="text-lg font-medium">6.4 The Golden Rule</h3>
        <blockquote className="border-l-4 border-neutral-300 pl-4 italic">
          Trade the working degree, confirm with the higher, time with the lower.
        </blockquote>
        <p>Before every trade, run the three-chart check:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>What degree am I trading? (Define it explicitly.)</li>
          <li>Does the degree above support my direction?</li>
          <li>Does the degree below show a completed pattern triggering entry now?</li>
        </ol>
        <p>If all three align → take the trade. If any conflict → pass.</p>
      </section>

      {/* MODULE 7 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 7 — Trading Application</h2>

        <h3 className="text-lg font-medium">7.1 The Highest-Probability Setups</h3>
        <p>
          <strong>Wave 2 entry</strong> — enter at 50–61.8% retracement of wave 1.
          Stop just below wave 1's start. Target: wave 3 extension. Risk/reward often
          1:3 or better. <strong>The best Elliott setup, period.</strong>
        </p>
        <p>
          <strong>Wave 4 entry</strong> — enter at 38.2% retracement of wave 3. Stop
          below wave 1's peak (the rule). Target: wave 5 projection. Lower reward than
          wave 2 entry, but high win rate.
        </p>
        <p>
          <strong>End-of-C entry</strong> — counter-trend setup. When wave C reaches
          1.0 or 1.618 × A and momentum diverges, enter in the direction of the larger
          trend. Stop beyond the Fib extension.
        </p>

        <h3 className="text-lg font-medium">7.2 Stop Placement (Hard Rules)</h3>
        <ul className="list-disc pl-6">
          <li>Long in wave 3: stop <strong>below wave 2 low</strong>. Break = wrong count.</li>
          <li>Long in wave 5: stop <strong>below wave 4 low</strong>.</li>
          <li>Short in wave C: stop <strong>above wave B high</strong>.</li>
        </ul>

        <h3 className="text-lg font-medium">7.3 Position Management</h3>
        <ul className="list-disc pl-6">
          <li>Scale in at Fib clusters, not single levels</li>
          <li>Move stop to breakeven once wave 3 breaks above wave 1's peak</li>
          <li>Take partial profits at wave 3's minimum target (1.618 × wave 1)</li>
          <li>Exit fully on wave 5 divergence or trendline break</li>
        </ul>

        <h3 className="text-lg font-medium">7.4 The Invalidation Mindset</h3>
        <p>
          Every count has a price level that proves it wrong.{" "}
          <strong>Know that level before entering.</strong> When it breaks, exit
          immediately — don't argue with the chart.
        </p>

        <h3 className="text-lg font-medium">7.5 The Alternate Count Discipline</h3>
        <p>
          Always maintain a primary count <strong>and</strong> an alternate. If the
          primary invalidates, the alternate should already tell you what's happening.
          Analysts who marry one count get destroyed in corrections.
        </p>
      </section>

      {/* MODULE 8 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">Module 8 — Mindset</h2>
        <p>
          Elliott Wave is <strong>probabilistic, not deterministic</strong>. The
          patterns recur because of crowd psychology — but any single count can fail.
        </p>
        <p>Three principles to internalize:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>The market is the final authority.</strong> Your count is a hypothesis, not a prediction.</li>
          <li><strong>Size positions so being wrong costs little and being right pays well.</strong> The math does the rest.</li>
          <li><strong>Patience compounds.</strong> Most setups are noise. The ones where multiple degrees align, Fibonacci levels cluster, and momentum confirms are rare — and they pay for the waiting.</li>
        </ol>
      </section>

      {/* QUICK REFERENCE */}
      <section className="bg-neutral-50 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Quick Reference Card</h2>

        <div>
          <h4 className="font-semibold">Rules (never broken):</h4>
          <ul className="list-disc pl-6">
            <li>Wave 2 ≤ 100% of wave 1</li>
            <li>Wave 3 is never shortest</li>
            <li>Wave 4 doesn't overlap wave 1</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Most common ratios:</h4>
          <ul className="list-disc pl-6">
            <li>Wave 2: 50% or 61.8% of wave 1</li>
            <li>Wave 3: 1.618 × wave 1</li>
            <li>Wave 4: 38.2% of wave 3</li>
            <li>Wave 5: equal to wave 1, or 0.618 × waves 1–3</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Pattern positions:</h4>
          <ul className="list-disc pl-6">
            <li>Triangles → wave 4 or wave B (never wave 2)</li>
            <li>Ending diagonals → wave 5 or wave C</li>
            <li>Leading diagonals → wave 1 or wave A</li>
            <li>Truncations → after extended wave 3</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Three-chart check before every trade:</h4>
          <ol className="list-decimal pl-6">
            <li>What degree am I trading?</li>
            <li>Does the higher degree confirm direction?</li>
            <li>Does the lower degree trigger entry?</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
