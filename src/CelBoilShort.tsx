import React, { useEffect, useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

// Deterministic pseudo-random generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Draw hand-inked line with deterministic line boil
const drawBoilLine = (
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  boilStep: number,
  jitterAmount: number,
  lineWidth: number,
  color: string
) => {
  if (points.length < 2) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();

  points.forEach(([x, y], idx) => {
    const jx = (seededRandom(boilStep * 100 + idx * 7) - 0.5) * jitterAmount;
    const jy = (seededRandom(boilStep * 200 + idx * 13) - 0.5) * jitterAmount;
    if (idx === 0) ctx.moveTo(x + jx, y + jy);
    else ctx.lineTo(x + jx, y + jy);
  });

  ctx.stroke();
  ctx.restore();
};

export const CelBoilShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Palette from prompt
    const PAPER_CREAM = '#F5EFE2';
    const INK_BLACK = '#1E191A';
    const TOMATO_RED = '#E63926';
    const SUNNY_YELLOW = '#F7B519';

    // Clear background with warm paper tone
    ctx.fillStyle = PAPER_CREAM;
    ctx.fillRect(0, 0, width, height);

    // Rhythm quantization: 1s for strike (0-24), 2s for dance (25-179), 3s for title hold (180-240)
    let holdFrames = 2;
    if (frame < 24) holdFrames = 1; // Fast smear action on 1s
    else if (frame >= 180) holdFrames = 3; // Title hold on 3s

    const steppedFrame = Math.floor(frame / holdFrames) * holdFrames;
    const boilCycle = Math.floor(frame / 2) % 4; // 4-variant boil cycle every 2 frames

    // --- BEAT 1: Matchstick Strike & Smear (Frames 0 - 36) ---
    if (frame < 36) {
      const progress = Math.min(1, frame / 18);
      const startX = 200;
      const startY = 1400;
      const endX = 540;
      const endY = 960;

      const curX = startX + (endX - startX) * progress;
      const curY = startY + (endY - startY) * progress;

      // Smear frame elongation (150%-250%) during fast strike (frames 6-14)
      const isSmear = frame >= 6 && frame <= 14;
      const stickLength = isSmear ? 480 : 220;

      // Off-register fill
      ctx.fillStyle = '#D9B382';
      ctx.fillRect(curX - 10 + 6, curY + 6, 20, stickLength);

      // Ink outline with boil
      drawBoilLine(
        ctx,
        [
          [curX - 10, curY],
          [curX + 10, curY],
          [curX + 10, curY + stickLength],
          [curX - 10, curY + stickLength],
          [curX - 10, curY],
        ],
        boilCycle,
        5,
        6,
        INK_BLACK
      );

      // Match head (Tomato Red)
      ctx.fillStyle = TOMATO_RED;
      ctx.beginPath();
      ctx.ellipse(curX + 5, curY - 10 + 4, 24, isSmear ? 55 : 32, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- BEAT 2: Flame Spirit Character Dance on 2s (Frames 24 - 165) ---
    if (frame >= 24 && frame < 165) {
      const localT = (steppedFrame - 24) / fps;
      const bounceY = Math.abs(Math.sin(localT * 6)) * 140;
      const squashX = 1 + Math.cos(localT * 12) * 0.15;
      const stretchY = 1 - Math.cos(localT * 12) * 0.15;

      const cx = width / 2 + Math.sin(localT * 3) * 120;
      const cy = 960 - bounceY;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(squashX, stretchY);

      // Off-register outer flame (Tomato Red)
      ctx.fillStyle = TOMATO_RED;
      ctx.beginPath();
      ctx.moveTo(10, -160);
      ctx.bezierCurveTo(130, -40, 120, 110, 10, 130);
      ctx.bezierCurveTo(-100, 110, -110, -40, 10, -160);
      ctx.fill();

      // Inner core (Sunny Yellow)
      ctx.fillStyle = SUNNY_YELLOW;
      ctx.beginPath();
      ctx.moveTo(-4, -80);
      ctx.bezierCurveTo(60, -10, 55, 80, -4, 95);
      ctx.bezierCurveTo(-65, 80, -70, -10, -4, -80);
      ctx.fill();

      // Boiling ink outline around flame character
      const outlinePts: [number, number][] = [];
      for (let i = 0; i <= 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const rX = 105;
        const rY = angle > Math.PI ? 160 : 120;
        outlinePts.push([Math.cos(angle) * rX, Math.sin(angle) * rY]);
      }
      drawBoilLine(ctx, outlinePts, boilCycle, 8, 7, INK_BLACK);

      // Expressive cartoon eyes
      ctx.fillStyle = INK_BLACK;
      ctx.beginPath();
      ctx.arc(-28, 20, 12, 0, Math.PI * 2);
      ctx.arc(28, 20, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // --- BEAT 3: Cel FX Explosion — Sparks, Speed Lines, Smoke Puffs (Frames 150 - 195) ---
    if (frame >= 150 && frame < 195) {
      const burstProgress = (steppedFrame - 150) / 45;
      const cx = width / 2;
      const cy = 920;

      // Speed lines & sparks radiating outward
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + seededRandom(i) * 0.2;
        const innerR = 80 + burstProgress * 320;
        const outerR = innerR + 90 + seededRandom(i + 50) * 80;

        drawBoilLine(
          ctx,
          [
            [cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR],
            [cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR],
          ],
          boilCycle,
          6,
          6,
          i % 2 === 0 ? TOMATO_RED : INK_BLACK
        );
      }

      // Hand-drawn smoke puffs
      for (let p = 0; p < 8; p++) {
        const pAngle = (p / 8) * Math.PI * 2;
        const dist = 120 + burstProgress * 260;
        const px = cx + Math.cos(pAngle) * dist;
        const py = cy + Math.sin(pAngle) * dist;
        const radius = (1 - burstProgress) * 55 + 15;

        const puffPts: [number, number][] = [];
        for (let s = 0; s <= 12; s++) {
          const a = (s / 12) * Math.PI * 2;
          puffPts.push([px + Math.cos(a) * radius, py + Math.sin(a) * radius]);
        }
        drawBoilLine(ctx, puffPts, boilCycle, 7, 5, INK_BLACK);
      }
    }

    // --- BEAT 4: Hand-Lettered Title Hold on 3s (Frames 180 - 240) ---
    if (frame >= 180) {
      const cx = width / 2;
      const cy = 940;

      // Off-register yellow highlight block
      ctx.fillStyle = SUNNY_YELLOW;
      ctx.fillRect(cx - 340 + 12, cy - 110 + 12, 680, 220);

      // Boiling ink frame box
      drawBoilLine(
        ctx,
        [
          [cx - 340, cy - 110],
          [cx + 340, cy - 110],
          [cx + 340, cy + 110],
          [cx - 340, cy + 110],
          [cx - 340, cy - 110],
        ],
        boilCycle,
        9,
        8,
        INK_BLACK
      );

      // Hand-drawn title typography with slight per-boil-cycle jitter
      const textJitterX = (seededRandom(boilCycle * 31) - 0.5) * 6;
      const textJitterY = (seededRandom(boilCycle * 47) - 0.5) * 6;

      ctx.fillStyle = INK_BLACK;
      ctx.font = '900 96px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('手作 · HAND MADE', cx + textJitterX, cy + textJitterY);
    }

    // --- GLOBAL PAPER GRAIN OVERLAY (12% Multiply feel) ---
    ctx.fillStyle = 'rgba(30, 25, 26, 0.04)';
    for (let g = 0; g < 600; g++) {
      const gx = seededRandom(g * 3 + boilCycle) * width;
      const gy = seededRandom(g * 7 + boilCycle) * height;
      ctx.fillRect(gx, gy, 3, 3);
    }
  }, [frame, width, height, fps]);

  return (
    <AbsoluteFill>
      <canvas ref={canvasRef} width={width} height={height} />
    </AbsoluteFill>
  );
};
