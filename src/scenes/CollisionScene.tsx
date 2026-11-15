import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const CollisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const boilCycle = Math.floor(frame / 2) % 4;
  const INK_BLACK = '#1E191A';
  const TOMATO_RED = '#E63926';

  return (
    <AbsoluteFill style={{ backgroundColor: '#F5EFE2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 120, textAlign: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: '36px', color: INK_BLACK, letterSpacing: '2px' }}>
          ACT III: THE MESSY MASTERPIECE
        </span>
      </div>

      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        {/* Exploding Cel FX sparks */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const dist = 80 + (frame * 4) % 350;
          const cx = width / 2 + Math.cos(angle) * dist;
          const cy = height / 2 + Math.sin(angle) * dist;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={12 + seededRandom(i) * 15}
              fill={i % 2 === 0 ? TOMATO_RED : INK_BLACK}
            />
          );
        })}

        {/* Central burst box */}
        <rect
          x={width / 2 - 320}
          y={height / 2 - 140}
          width={640}
          height={280}
          rx={20}
          fill="#FFF"
          stroke={INK_BLACK}
          strokeWidth={10 + seededRandom(boilCycle) * 4}
        />
        <text
          x={width / 2}
          y={height / 2 + 15}
          fill={INK_BLACK}
          fontSize="52"
          fontWeight="900"
          textAnchor="middle"
        >
          SHIP IT.
        </text>
      </svg>
    </AbsoluteFill>
  );
};
