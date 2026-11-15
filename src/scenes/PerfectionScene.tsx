import React, { useEffect, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const PerfectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steppedFrame = Math.floor(frame / 2) * 2; // Line boil on 2s
  const boilCycle = Math.floor(frame / 2) % 4;

  const PAPER_CREAM = '#F5EFE2';
  const INK_BLACK = '#1E191A';
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
    const radius = 240;

    // --- ANXIOUS CIRCLE TRACING & ERASING ---
    const progress = Math.min(1, (frame % 180) / 120);
    const angleLimit = progress * Math.PI * 2;

    ctx.save();
    ctx.strokeStyle = INK_BLACK;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();

    for (let a = 0; a <= angleLimit; a += 0.1) {
      const jx = (seededRandom(boilCycle * 10 + a) - 0.5) * 8;
      const jy = (seededRandom(boilCycle * 20 + a) - 0.5) * 8;
      const x = cx + Math.cos(a) * (radius + jx);
      const y = cy + Math.sin(a) * (radius + jy);
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    // --- FRANTIC ERASER HAND ---
    if (progress < 1) {
      const eraserAngle = angleLimit;
      const ex = cx + Math.cos(eraserAngle) * radius;
      const ey = cy + Math.sin(eraserAngle) * radius;

      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(eraserAngle + Math.PI / 2);
      ctx.fillStyle = TOMATO_RED;
      ctx.fillRect(-35, -20, 70, 40);
      ctx.strokeStyle = INK_BLACK;
      ctx.lineWidth = 6;
      ctx.strokeRect(-35, -20, 70, 40);

      ctx.fillStyle = '#FFF';
      ctx.font = '900 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('FIX', 0, 0);
      ctx.restore();
    }

    // --- ACT TITLE & TYPOGRAPHY ---
    ctx.fillStyle = INK_BLACK;
    ctx.font = '900 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ACT I: THE ENDLESS ERASE', cx, cy + 340);

    // Paper grain multiply layer
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
