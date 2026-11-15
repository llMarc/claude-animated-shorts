import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const ProgressScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const boilCycle = Math.floor(frame / 2) % 4;
  const INK_BLACK = '#1E191A';
  const SUNNY_YELLOW = '#F7B519';

  return (
    <AbsoluteFill style={{ backgroundColor: '#F5EFE2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 120, textAlign: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '36px', color: INK_BLACK, letterSpacing: '2px' }}>
          ACT II: MOMENTUM TRAIL
        </span>
      </div>

      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        {/* Fast swooping lines representing messy progress */}
        {[...Array(6)].map((_, i) => {
          const startX = 100 + i * 150;
          const yOffset = height / 2 + (i - 3) * 80 + Math.sin(frame * 0.2 + i) * 40;
          return (
            <path
              key={i}
              d={`M ${startX} ${yOffset} Q ${startX + 300} ${yOffset - 120 + (seededRandom(boilCycle + i) * 40)} ${startX + 600} ${yOffset}`}
              fill="none"
              stroke={SUNNY_YELLOW}
              strokeWidth={16 + seededRandom(i) * 8}
              strokeLinecap="round"
            />
          );
        })}

        {/* Moving character rocket / brush */}
        <g transform={`translate(${150 + (frame * 6) % (width - 300)}, ${height / 2 + Math.sin(frame * 0.3) * 100})`}>
          <circle cx={0} cy={0} r={45} fill={SUNNY_YELLOW} stroke={INK_BLACK} strokeWidth={8} />
          <text x={0} y={10} fill={INK_BLACK} fontSize="28" fontWeight="bold" textAnchor="middle">⚡</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
