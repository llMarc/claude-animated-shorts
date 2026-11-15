import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const INK_BLACK = '#1E191A';
  const SUNNY_YELLOW = '#F7B519';

  return (
    <AbsoluteFill style={{ backgroundColor: '#F5EFE2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        {/* Background highlight block */}
        <rect
          x={width / 2 - 380}
          y={height / 2 - 200}
          width={760}
          height={400}
          rx={30}
          fill={SUNNY_YELLOW}
          stroke={INK_BLACK}
          strokeWidth={12}
        />
        
        <text
          x={width / 2}
          y={height / 2 - 30}
          fill={INK_BLACK}
          fontSize="64"
          fontWeight="900"
          textAnchor="middle"
        >
          DONE
        </text>
        <text
          x={width / 2}
          y={height / 2 + 50}
          fill={INK_BLACK}
          fontSize="48"
          fontWeight="700"
          textAnchor="middle"
        >
          &gt;
        </text>
        <text
          x={width / 2}
          y={height / 2 + 130}
          fill={INK_BLACK}
          fontSize="64"
          fontWeight="900"
          textAnchor="middle"
        >
          PERFECT
        </text>
      </svg>
    </AbsoluteFill>
  );
};
