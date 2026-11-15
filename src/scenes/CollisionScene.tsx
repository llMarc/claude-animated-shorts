import React, { useEffect, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const CollisionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steppedFrame = Math.floor(frame / 2) * 2;
  const boilCycle = Math.floor(frame / 2) % 4;

  const PAPER_CREAM = '#F5EFE2';
  const INK_BLACK = '#1E191A';
  const TOMATO_RED = '#E63926';
  const SUNNY_YELLOW = '#F7B519';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = PAPER_CREAM;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2 - 80;

    // --- EXPLODING CEL FX SPARKS & SPEED LINES ---
    const burstProgress = (frame % 180) / 180;
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + seededRandom(i) * 0.2;
      const innerR = 60 + burstProgress * 280;
      const outerR = innerR + 80;

      ctx.save();
      ctx.strokeStyle = i % 2 === 0 ? TOMATO_RED : INK_BLACK;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
      ctx.stroke();
      ctx.restore();
    }

    // --- CENTRAL SHIP IT BOX ---
    const boxWidth = 640;
    const boxHeight = 260;
    const jx = (seededRandom(boilCycle * 5) - 0.5) * 6;
    const jy = (seededRandom(boilCycle * 9) - 0.5) * 6;

    ctx.save();
    // Yellow background highlight
    ctx.fillStyle = SUNNY_YELLOW;
    ctx.fillRect(cx - boxWidth / 2 + 12 + jx, cy - boxHeight / 2 + 12 + jy, boxWidth, boxHeight);

    // Ink bounding box
    ctx.strokeStyle = INK_BLACK;
    ctx.lineWidth = 12;
    ctx.strokeRect(cx - boxWidth / 2 + jx, cy - boxHeight / 2 + jy, boxWidth, boxHeight);

    // Typography
    ctx.fillStyle = INK_BLACK;
    ctx.font = '900 68px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SHIP IT.', cx + jx, cy + jy);
    ctx.restore();

    // --- ACT TITLE ---
    ctx.fillStyle = INK_BLACK;
    ctx.font = '900 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ACT III: THE MESSY MASTERPIECE', cx, cy + 340);

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
