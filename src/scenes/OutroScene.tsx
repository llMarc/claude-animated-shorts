import React, { useEffect, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steppedFrame = Math.floor(frame / 3) * 3; // Hold on 3s for final title
  const boilCycle = Math.floor(frame / 3) % 4;

  const PAPER_CREAM = '#F5EFE2';
  const INK_BLACK = '#1E191A';
  const SUNNY_YELLOW = '#F7B519';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = PAPER_CREAM;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    const jx = (seededRandom(boilCycle * 11) - 0.5) * 5;
    const jy = (seededRandom(boilCycle * 17) - 0.5) * 5;

    // --- OUTRO STAMP BOX ---
    const boxW = 740;
    const boxH = 420;

    ctx.save();
    ctx.fillStyle = SUNNY_YELLOW;
    ctx.fillRect(cx - boxW / 2 + 14 + jx, cy - boxH / 2 + 14 + jy, boxW, boxH);

    ctx.strokeStyle = INK_BLACK;
    ctx.lineWidth = 14;
    ctx.strokeRect(cx - boxW / 2 + jx, cy - boxH / 2 + jy, boxW, boxH);

    // --- TYPOGRAPHY ---
    ctx.fillStyle = INK_BLACK;
    ctx.font = '900 72px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('DONE', cx, cy - 80);
    
    ctx.font = '900 54px sans-serif';
    ctx.fillText('>', cx, cy + 10);

    ctx.font = '900 72px sans-serif';
    ctx.fillText('PERFECT', cx, cy + 100);
    ctx.restore();

    // Paper grain
    ctx.fillStyle = 'rgba(30, 25, 26, 0.05)';
    for (let g = 0; g < 400; g++) {
      const gx = seededRandom(g * 3 + boilCycle) * width;
      const gy = seededRandom(g * 7 + boilCycle) * height;
      ctx.fillRect(gx, gy, 3, 3);
    }
  }, [frame, width, height, boilCycle, steppedFrame]);

  return (
    <AbsoluteFill>
      <canvas ref={canvasRef} width={width} height={height} />
    </AbsoluteFill>
  );
};
