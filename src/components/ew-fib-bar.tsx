"use client";

interface FibBarProps {
  retracementDepth: number; // 0 = at low, 1 = at ATH
  width?: number;
  height?: number;
}

const FIB_TICKS = [
  { ratio: 0.236, label: "23.6" },
  { ratio: 0.382, label: "38.2" },
  { ratio: 0.5, label: "50" },
  { ratio: 0.618, label: "61.8" },
  { ratio: 0.786, label: "78.6" },
];

export function EWFibBar({ retracementDepth, width = 180, height = 28 }: FibBarProps) {
  const barY = 8;
  const barH = 4;
  const padding = 4;
  const barW = width - padding * 2;

  // Clamp depth to 0-1.2 range for display
  const clampedDepth = Math.max(0, Math.min(1.2, retracementDepth));
  const markerX = padding + (clampedDepth / 1.2) * barW;

  // Golden zone (38.2% - 61.8%)
  const gzStart = padding + (0.382 / 1.2) * barW;
  const gzEnd = padding + (0.618 / 1.2) * barW;

  return (
    <svg width={width} height={height} className="block">
      {/* Background bar */}
      <rect
        x={padding}
        y={barY}
        width={barW}
        height={barH}
        rx={2}
        fill="#262626"
      />

      {/* Golden zone highlight */}
      <rect
        x={gzStart}
        y={barY - 1}
        width={gzEnd - gzStart}
        height={barH + 2}
        rx={1}
        fill="rgba(234, 179, 8, 0.2)"
      />

      {/* Fib tick marks */}
      {FIB_TICKS.map(({ ratio, label }) => {
        const x = padding + (ratio / 1.2) * barW;
        return (
          <g key={ratio}>
            <line
              x1={x}
              y1={barY - 2}
              x2={x}
              y2={barY + barH + 2}
              stroke="#444"
              strokeWidth={0.5}
            />
            <text
              x={x}
              y={barY + barH + 10}
              textAnchor="middle"
              fill="#555"
              fontSize={7}
              fontFamily="monospace"
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Current position marker */}
      <circle
        cx={markerX}
        cy={barY + barH / 2}
        r={3.5}
        fill={
          retracementDepth >= 0.382 && retracementDepth <= 0.618
            ? "#eab308"
            : "#5ba3e6"
        }
        stroke="#1a1a1a"
        strokeWidth={1}
      />
    </svg>
  );
}
