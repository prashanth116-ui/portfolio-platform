export interface Diagram {
  id: string;
  title: string;
  description: string;
  mermaid: string;
}

export const diagrams: Diagram[] = [
  {
    id: "master_flow",
    title: "Master Strategy Flow",
    description: "End-to-end execution pipeline from market open to close. Shows how bars are processed, signals generated, and trades managed through the full session lifecycle.",
    mermaid: `flowchart TD
    START([Session Start 4:00 ET]) --> LOAD[Load 3m Bars Overnight + Session]
    LOAD --> FVG[Detect All FVGs from overnight + RTH bars]
    FVG --> INDICATORS[Calculate Indicators EMA 20/50, ADX 14, DI+/DI-]
    INDICATORS --> ENTRY_A{Entry Type A Creation}
    INDICATORS --> ENTRY_B{Entry Type B Retrace}
    INDICATORS --> ENTRY_C{Entry Type C BOS + Retrace}
    ENTRY_A --> COLLECT[Collect All Valid Entries Sort by Bar Index]
    ENTRY_B --> COLLECT
    ENTRY_C --> COLLECT
    COLLECT --> LOOP[/For Each Bar in Session/]
    LOOP --> MANAGE[Manage Active Trades Trail Updates + Exit Checks]
    MANAGE --> GATES{Entry Gates}
    GATES -->|Pass| SIZE[Position Sizing 3 cts / 2 cts / 1 ct]
    GATES -->|Fail| LOOP
    SIZE --> OPEN[Open Trade Entry + Stop + Targets]
    OPEN --> LOOP
    LOOP -->|EOD 16:00| EOD[Close All Remaining at Market Close]
    EOD --> SUMMARY([Print Results])`,
  },
  {
    id: "entry_types",
    title: "Entry Types (A/B1/B2/C)",
    description: "Four entry mechanisms: Creation (immediate FVG), Overnight Retrace (B1), Intraday Retrace (B2), and Break of Structure (C).",
    mermaid: `flowchart TD
    FVG_DETECTED([FVG Detected]) --> TYPE{Where was FVG created?}
    TYPE -->|During session bar| A[Entry A: CREATION Enter at FVG midpoint]
    TYPE -->|Before 9:30 AM| B1[Entry B1: OVERNIGHT RETRACE Wait for retrace into FVG]
    TYPE -->|During RTH 2+ bars ago| B2[Entry B2: INTRADAY RETRACE Wait for retrace into FVG]
    TYPE -->|After BOS within 5 bars| C[Entry C: BOS RETRACE Wait for retrace into FVG]
    A --> A_DISP{Displacement >= 3x avg body?}
    A_DISP -->|Yes| A_OVERRIDE[3x Override ADX >= 10 only]
    A_DISP -->|No| A_FILTER[Hybrid Filter Check]
    A_OVERRIDE --> VALID([Valid Entry])
    B1 --> B1_REJ{Rejection Candle? Wick >= 0.85x body}
    B2 --> B2_REJ{Rejection Candle? Wick >= 0.85x body}
    C --> C_TOUCH{Price touches FVG zone?}
    B1_REJ -->|Yes| B1_ADX{ADX >= 22?}
    B1_REJ -->|No| SKIP1([Skip])
    B1_ADX -->|Yes| B1_FILTER[Hybrid Filter Check]
    B1_ADX -->|No| SKIP2([Skip])
    B2_REJ -->|Yes| B2_FILTER[Hybrid Filter Check]
    B2_REJ -->|No| SKIP3([Skip])
    C_TOUCH -->|Yes| C_BOS{BOS enabled for symbol?}
    C_TOUCH -->|No| SKIP4([Skip])
    C_BOS -->|ES/MES: OFF| SKIP5([Skip])
    C_BOS -->|NQ/MNQ: ON| C_LOSS{BOS losses today < 1?}
    C_LOSS -->|Yes| C_FILTER[Hybrid Filter Check]
    C_LOSS -->|No| SKIP6([Skip])
    A_FILTER --> VALID
    B1_FILTER --> VALID
    B2_FILTER --> VALID
    C_FILTER --> VALID`,
  },
  {
    id: "hybrid_filters",
    title: "Hybrid Filter Pipeline",
    description: "Two-tier filter system: 2 mandatory gates (DI direction, FVG size) plus 2-of-3 optional checks (displacement, ADX, EMA trend).",
    mermaid: `flowchart TD
    ENTRY([Candidate Entry]) --> M1{MANDATORY 1 DI Direction}
    M1 -->|LONG: +DI > -DI| M2{MANDATORY 2 FVG Size >= 5 ticks}
    M1 -->|SHORT: -DI > +DI| M2
    M1 -->|Fail| REJECT([REJECT])
    M2 -->|Pass| OPT[OPTIONAL FILTERS Need 2 of 3 to pass]
    M2 -->|Fail| REJECT
    OPT --> O1{Displacement >= 1.0x avg body}
    OPT --> O2{ADX >= 11 or 3x disp + ADX >= 10}
    OPT --> O3{EMA Trend EMA20 vs EMA50}
    O1 -->|Pass| COUNT[Count Passes]
    O1 -->|Fail| COUNT
    O2 -->|Pass| COUNT
    O2 -->|Fail| COUNT
    O3 -->|Pass| COUNT
    O3 -->|Fail| COUNT
    COUNT --> CHECK{Passes >= 2?}
    CHECK -->|Yes| TIME[Time Filters]
    CHECK -->|No| REJECT
    TIME --> T1{Midday Cutoff 12:00-14:00?}
    T1 -->|In range| REJECT
    T1 -->|Outside| T2{NQ/MNQ PM After 14:00?}
    T2 -->|Yes + NQ| REJECT
    T2 -->|No| RISK{Min Risk Check ES: 1.5 pts NQ: 6 pts}
    RISK -->|Pass| ACCEPT([ACCEPT])
    RISK -->|Fail| REJECT`,
  },
  {
    id: "entry_gates",
    title: "Entry Gate Checks",
    description: "Pre-entry validation: circuit breaker (3 losses/direction/day), consecutive loss stop (ES/MES: 2), position limit (max 3 open), and BOS loss limit.",
    mermaid: `flowchart TD
    SIGNAL([Valid Entry Signal]) --> G1{Consecutive losses < max?}
    G1 -->|No| BLOCK1([Blocked: Consec Loss Stop])
    G1 -->|Yes| G2{Direction losses < 3 today?}
    G2 -->|No| BLOCK2([Blocked: Circuit Breaker])
    G2 -->|Yes| G3{BOS entry?}
    G3 -->|Yes| G4{BOS daily loss limit reached?}
    G3 -->|No| G5
    G4 -->|Yes| BLOCK3([Blocked: BOS Loss Limit])
    G4 -->|No| G5{Open trades < 3?}
    G5 -->|No| BLOCK4([Blocked: Max Open Trades])
    G5 -->|Yes| SIZING[Position Sizing]
    SIZING --> S1{How many trades open?}
    S1 -->|0 open| CT3[3 Contracts T1 + T2 + Runner]
    S1 -->|1+ open| CT2[2 Contracts T1 + T2 no Runner]
    CT3 --> RETRACE{Retrace entry? Risk > 8 pts? ES/MES only}
    CT2 --> RETRACE
    RETRACE -->|Yes| CT1[Force: 1 Contract V10.11 Risk Cap]
    RETRACE -->|No| ENTER([Open Trade])
    CT1 --> ENTER`,
  },
  {
    id: "exit_management",
    title: "Exit Management",
    description: "Three-phase exit: T1 fixed at 3R (1 ct), T2 structure trail after 4R, Runner structure trail (6-tick buffer, 1st trade only).",
    mermaid: `flowchart TD
    TRADE([Active Trade Entry at FVG midpoint]) --> PHASE1{Price hits Stop?}
    PHASE1 -->|Yes| FULL_STOP[FULL STOP All contracts exit at stop price]
    FULL_STOP --> LOSS([Loss recorded])
    PHASE1 -->|No| PHASE2{Price hits 3R target?}
    PHASE2 -->|No| PHASE1
    PHASE2 -->|Yes| T1_EXIT[T1 EXIT: 1 ct Fixed profit at 3R]
    T1_EXIT --> PHASE3{Price hits 4R target?}
    PHASE3 -->|No| T1_TRAIL{T1 trail stop hit?}
    T1_TRAIL -->|Yes| ALL_EXIT[ALL remaining exit at trail stop]
    T1_TRAIL -->|No| PHASE3
    PHASE3 -->|Yes| ACTIVATE[Activate T2 + Runner trails Floor at 3R profit]
    ACTIVATE --> T2_TRAIL{T2 trail stop hit? 4-tick buffer}
    T2_TRAIL -->|No| T2_TRAIL
    T2_TRAIL -->|Yes| T2_CHECK{Has Runner? 3-ct trade only}
    T2_CHECK -->|No runner| CLOSE_ALL[Close remaining T2 profit locked]
    T2_CHECK -->|Yes| T2_EXIT[T2 EXIT: 1 ct Runner continues]
    T2_EXIT --> RUNNER{Runner trail stop hit? 6-tick buffer}
    RUNNER -->|No| RUNNER
    RUNNER -->|Yes| RUNNER_EXIT[RUNNER EXIT: 1 ct at trail stop]
    RUNNER_EXIT --> DONE([Trade Complete])
    CLOSE_ALL --> DONE
    ALL_EXIT --> DONE`,
  },
  {
    id: "trail_logic",
    title: "Trail Stop Logic",
    description: "Structure-based trailing stops with swing high/low tracking. T2 uses 4-tick buffer, Runner uses 6-tick buffer.",
    mermaid: `flowchart TD
    BAR([New Bar]) --> SWING{Check bar at i-2 for swing point}
    SWING --> SL{Swing Low? lookback=2}
    SWING --> SH{Swing High? lookback=2}
    SL -->|LONG trade| SL_CHECK{Swing > last tracked swing?}
    SL_CHECK -->|Yes| SL_UPDATE[Update trail stop = swing - buffer]
    SL_CHECK -->|No| SKIP([Skip: not higher])
    SH -->|SHORT trade| SH_CHECK{Swing < last tracked swing?}
    SH_CHECK -->|Yes| SH_UPDATE[Update trail stop = swing + buffer]
    SH_CHECK -->|No| SKIP2([Skip: not lower])
    SL_UPDATE --> BUFFERS{Which trail?}
    SH_UPDATE --> BUFFERS
    BUFFERS -->|T1 trail 3R to 4R| B1[2-tick buffer]
    BUFFERS -->|T2 trail after 4R| B2[4-tick buffer]
    BUFFERS -->|Runner trail after 4R| B3[6-tick buffer]`,
  },
  {
    id: "symbol_config",
    title: "Per-Symbol Configuration",
    description: "Symbol-specific parameter matrix: tick values, risk limits, BOS control, retrace caps, and consecutive loss stops.",
    mermaid: `flowchart LR
    subgraph ES_MES [ES / MES]
        ES_BOS[BOS: OFF]
        ES_RISK[Min Risk: 1.5 pts]
        ES_BOS_CAP[Max BOS Risk: 8 pts]
        ES_RETRACE[Retrace Cap: 8 pts then 1ct]
        ES_CONSEC[Consec Loss: 2 then stop]
        ES_PM[PM Cutoff: No]
    end
    subgraph NQ_MNQ [NQ / MNQ]
        NQ_BOS[BOS: ON 1 loss/day]
        NQ_RISK[Min Risk: 6.0 pts]
        NQ_BOS_CAP[Max BOS Risk: 20 pts]
        NQ_RETRACE[Retrace Cap: None]
        NQ_CONSEC[Consec Loss: 3 then stop]
        NQ_PM[PM Cutoff: After 14:00]
    end`,
  },
  {
    id: "session_timeline",
    title: "Session Timeline",
    description: "Trading hours with entry windows and cutoff zones. Pre-market (04:00), RTH open (09:30), midday cutoff (12:00-14:00), NQ PM cutoff (14:00), market close (16:00).",
    mermaid: `gantt
    title Trading Session Timeline - EST
    dateFormat HH:mm
    axisFormat %H:%M
    section Pre-Market
    Overnight FVG Tracking     :04:00, 05:30
    section Pre-RTH
    All Entry Types Active     :04:00, 09:30
    section RTH Morning
    Full Trading All Types     :09:30, 12:00
    section Midday
    NO ENTRIES Lunch Lull      :crit, 12:00, 14:00
    section Afternoon
    ES Trading Resumes         :14:00, 16:00
    NQ MNQ CUTOFF              :crit, 14:00, 16:00
    section EOD
    Close All Positions        :milestone, 16:00, 0min`,
  },
  {
    id: "position_sizing",
    title: "Dynamic Position Sizing",
    description: "1st trade: 3 contracts (T1 + T2 + Runner). 2nd/3rd trades: 2 contracts (T1 + T2). Retrace risk > 8pts (ES/MES): force 1 contract.",
    mermaid: `flowchart TD
    ENTRY([New Entry Signal]) --> OPEN{How many trades currently open?}
    OPEN -->|0 trades| BASE[Base: 3 Contracts]
    OPEN -->|1+ trades| REDUCED[Reduced: 2 Contracts]
    BASE --> RETRACE1{Retrace entry? Risk > max_retrace_risk?}
    REDUCED --> RETRACE2{Retrace entry? Risk > max_retrace_risk?}
    RETRACE1 -->|ES/MES + risk > 8pts| FORCE1A[Force: 1 Contract]
    RETRACE1 -->|No| SPLIT3[Split: 1 T1 + 1 T2 + 1 Runner]
    RETRACE2 -->|ES/MES + risk > 8pts| FORCE1B[Force: 1 Contract]
    RETRACE2 -->|No| SPLIT2[Split: 1 T1 + 1 T2 + 0 Runner]
    SPLIT3 --> MAX[Max Exposure: 6 cts 3 open trades x 2 avg]
    SPLIT2 --> MAX
    FORCE1A --> MAX
    FORCE1B --> MAX`,
  },
];
