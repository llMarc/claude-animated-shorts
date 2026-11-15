export interface Shot {
  id: string;
  title: string;
  durationInFrames: number; // e.g., 300 frames = 12.5 seconds per scene
}

export const SHOTS: Shot[] = [
  { id: 'intro', title: 'The Hook & Awakening', durationInFrames: 300 },
  { id: 'journey', title: 'The Transformation Loop', durationInFrames: 450 },
  { id: 'climax', title: 'The Hero Explosion', durationInFrames: 360 },
  { id: 'outro', title: 'Call to Action / Title Card', durationInFrames: 330 },
];
// Total: 1,440 frames = exactly 60 seconds (expandable up to 2,880 for 2 mins)
