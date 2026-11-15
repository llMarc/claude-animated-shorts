// src/videos/evolution/story.ts
// Shot plan, camera glides, DOF triggers, and impact keys for the evolution short.

export const SHOTS = [
  { id: 'hook_canopy', startFrame: 0, duration: 150, light: 'day', crowd: 'sparse' },
  { id: 'setting_savanna', startFrame: 150, duration: 180, light: 'golden', crowd: 'normal' },
  { id: 'escalation_stretch', startFrame: 330, duration: 150, light: 'day', crowd: 'normal' },
  { id: 'snap_run', startFrame: 480, duration: 180, light: 'day', crowd: 'dense' },
  { id: 'callback_chair', startFrame: 660, duration: 180, light: 'day', crowd: 'sparse' },
];

export const XFADE = [150, 330, 480, 660];

export const FLASH_AT = [155]; // White flash right after the hook beat

// Lens blur (DOF) per beat: closer focus on inserts/CUs, wider on establishing shots
export const DOF_AT = {
  0: 15,    // CU canopy trees
  150: 8,   // Wide savanna establishing shot
  330: 12,  // Close-up stretch
  480: 10,  // Action running sequence
  660: 14,  // Final chair callback
};

// Foreground framing props to add depth (~1/3 of shots)
export const FOREGROUND = [
  { frame: 20, prop: 'branch_leaf' },
  { frame: 190, prop: 'tall_grass_blade' },
  { frame: 490, prop: 'stone_boulder' },
];

// Impact flip-shakes that decay over 7 frames on major beats
export const KICKS = [
  { frame: 485, intensity: 1.2 }, 
];

export const CAMS = {
  hook_canopy: {
    dur: 150,
    s: (f: number) => {
      // Smootherstep glide forward into the jungle branches
      const progress = f / 150;
      return {
        pos: [0, 8, 25 - progress * 4] as [number, number, number],
        look: [0, 6, 0] as [number, number, number],
        fov: 45,
        roll: 4.2, // Standard camera roll range (4-4.6°)
      };
    },
  },
  setting_savanna: {
    dur: 180,
    s: (f: number) => {
      const progress = (f - 150) / 180;
      return {
        pos: [10, 12, 40 + progress * 3] as [number, number, number], // Creeping push-in (no static holds)
        look: [0, 3, 0] as [number, number, number],
        fov: 42,
        roll: 4.0,
      };
    },
  },
  escalation_stretch: {
    dur: 150,
    s: (f: number) => {
      const progress = (f - 330) / 150;
      return {
        pos: [-5, 6, 18 - progress * 2.5] as [number, number, number],
        look: [0, 4, 0] as [number, number, number],
        fov: 40,
        roll: 4.5,
      };
    },
  },
  snap_run: {
    dur: 180,
    s: (f: number) => {
      const progress = (f - 480) / 180;
      return {
        pos: [2, 5, 12 + progress * 7] as [number, number, number],
        look: [0, 2, -2] as [number, number, number],
        fov: 48,
        roll: 4.3,
      };
    },
  },
  callback_chair: {
    dur: 180,
    s: (f: number) => {
      const progress = (f - 660) / 180;
      return {
        pos: [0, 10, 22 - progress * 1.5] as [number, number, number],
        look: [0, 3, 0] as [number, number, number],
        fov: 42,
        roll: 4.1,
      };
    },
  },
};
               
