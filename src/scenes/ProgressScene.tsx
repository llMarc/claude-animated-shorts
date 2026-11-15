import React, { useEffect, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const ProgressScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steppedFrame = Math.floor(frame / 2) * 2;
  const boilCycle = Math.floor(frame / 2) % 4;

  const PAPER_CREAM = '#F5EFE2';
  const INK_BLACK = '#1E191A';
  const SUNNY_YELLOW = '#F7B519';
  const TOMATO_RED = '#E63926';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = PAPER_CREAM;
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2 - 80;

    // --- FLUID MOMENTUM PATHS ---
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.strokeStyle = i % 2 === 0 ? SUNNY_YELLOW : TOMATO_RED;
      ctx.lineWidth = 18 + i * 4;
      ctx.lineCap = 'round';
      ctx.beginPath();

      const startX = 100;
      const yBase = cy - 200 + i * 110;
      const progressFactor = ((frame * 8 + i * 50) % (width + 200)) - 100;

      ctx.moveTo(startX, yBase);
      ctx.bezierCurveTo(
        cx,
        yBase + Math.sin(frame * 0.1 + i) * 120,
        cx + 200,
        yBase - Math.cos(frame * 0.1 + i) * 120,
        progressFactor,
        yBase + Math.sin(i) * 60
      );
      ctx.stroke();
      ctx.restore();
    }

    // --- BOUNCY HERO CHARACTER ---
    const charX = cx + Math.sin(frame * 0.15) * 220;
    const charY = cy + Math.cos(frame * 0.2) * 100;

    ctx.save();
    ctx.fillStyle = SUNNY_YELLOW;
    ctx.strokeStyle = INK_BLACK;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(charX, charY, 75, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Expressive face
    ctx.fillStyle = INK_BLACK;
    ctx.beginPath();
    ctx.arc(charX - 22, charY - 10, 10, 0, Math.PI * 2);
    ctx.arc(charX + 22, charY - 10, 10, 0, Math.PI * 2);
    ctx.fill();

    // Big confident smile
    ctx.beginPath();
    ctx.arc(charX, charY + 10, 28, 0, Math.PI);
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();

    // --- ACT TITLE ---
    ctx.fillStyle = INK_BLACK;
    ctx.font = '900 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ACT II: MOMENTUM TRAIL', cx, cy + 340);

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
