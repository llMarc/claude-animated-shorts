import { AbsoluteFill, Sequence } from 'remotion';
import { SHOTS } from './story';
import { PerfectionScene } from './scenes/PerfectionScene';
import { ProgressScene } from './scenes/ProgressScene';
import { CollisionScene } from './scenes/CollisionScene';
import { OutroScene } from './scenes/OutroScene';

export const MainVideo = () => {
  let accumulatedFrames = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F5EFE2' }}>
      {/* Scene 1: The Perfectionist */}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[0].durationInFrames}>
        <PerfectionScene />
      </Sequence>
      
      {/* Scene 2: The Pragmatist */}
      {(accumulatedFrames += SHOTS[0].durationInFrames) && null}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[1].durationInFrames}>
        <ProgressScene />
      </Sequence>

      {/* Scene 3: The Collision */}
      {(accumulatedFrames += SHOTS[1].durationInFrames) && null}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[2].durationInFrames}>
        <CollisionScene />
      </Sequence>

      {/* Scene 4: The Outro Title Card */}
      {(accumulatedFrames += SHOTS[2].durationInFrames) && null}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[3].durationInFrames}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
