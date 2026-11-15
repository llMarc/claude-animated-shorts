import { AbsoluteFill, Sequence } from 'remotion';
import { SHOTS } from './story';
import { IntroScene } from './scenes/IntroScene';
import { JourneyScene } from './scenes/JourneyScene';
import { ClimaxScene } from './scenes/ClimaxScene';
import { OutroScene } from './scenes/OutroScene';

export const MainVideo = () => {
  let accumulatedFrames = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F5EFE2' }}>
      {/* Scene 1: Intro */}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[0].durationInFrames}>
        <IntroScene />
      </Sequence>
      
      {/* Scene 2: Journey (automatically offsets start time) */}
      {(accumulatedFrames += SHOTS[0].durationInFrames) && null}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[1].durationInFrames}>
        <JourneyScene />
      </Sequence>

      {/* Scene 3: Climax */}
      {(accumulatedFrames += SHOTS[1].durationInFrames) && null}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[2].durationInFrames}>
        <ClimaxScene />
      </Sequence>

      {/* Scene 4: Outro */}
      {(accumulatedFrames += SHOTS[2].durationInFrames) && null}
      <Sequence from={accumulatedFrames} durationInFrames={SHOTS[3].durationInFrames}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
