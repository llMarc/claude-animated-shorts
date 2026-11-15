import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

// Deterministic random for line boil
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const PerfectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const steppedFrame = Math.floor(frame / 2) * 2; // Line boil on 2s
  const boilCycle = Math.floor(frame / 2) % 4;

  const INK_BLACK = '#1E191A';
  const TOMATO_RED = '#E63926';

  return (
    <AbsoluteFill style={{ backgroundColor: '#F5EFE2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Scene Title Header */}
      <div style={{ position: 'absolute', top: 120, textAlign: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '36px', color: INK_BLACK, letterSpacing: '2px' }}>
          ACT I: THE ENDLESS ERASE
        </span>
      </div>

      {/* Interactive Canvas or SVG representation of an anxious character trying to draw a circle */}
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        {/* Nervous shaking circle outline */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={220}
          fill="none"
          stroke={INK_BLACK}
          strokeWidth={8 + (seededRandom(boilCycle) * 4)}
          strokeDasharray="1400"
          strokeDashoffset={Math.max(0, 1400 - (frame * 5))}
        />

        {/* Frantic Eraser Hand */}
        <g transform={`translate(${width / 2 + Math.sin(frame * 0.8) * 80}, ${height / 2 + Math.cos(frame * 0.5) * 60})`}>
          <rect x={-40} y={-20} width={80} height={40} rx={8} fill={TOMATO_RED} stroke={INK_BLACK} strokeWidth={6} />
          <text x={0} y={8} fill="#F5EFE2" fontSize="20" fontWeight="bold" textAnchor="middle">RE-DO</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
