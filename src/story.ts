export const SHOTS = [
  { id: 'shot1', startFrame: 0, duration: 150 },
  { id: 'shot2', startFrame: 150, duration: 150 },
];

export const CAMS = {
  shot1: (frame: number) => ({ pos: [0, 8, 25], roll: 4.2 }),
  shot2: (frame: number) => ({ pos: [0, 10, 20], roll: 0 }),
};

export const DOF_AT = 10;
