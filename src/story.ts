export interface Shot {
  id: string;
  title: string;
  durationInFrames: number; // 360 frames = 15 seconds per scene
}

export const SHOTS: Shot[] = [
  { id: 'perfection', title: 'The Endless Eraser', durationInFrames: 360 },
  { id: 'progress', title: 'The Momentum Trail', durationInFrames: 360 },
  { id: 'collision', title: 'The Messy Masterpiece', durationInFrames: 360 },
  { id: 'outro', title: 'Done > Perfect', durationInFrames: 360 },
];
