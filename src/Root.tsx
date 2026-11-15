import { Composition, registerRoot } from 'remotion';
import { MainVideo } from './MainVideo';
import { SHOTS } from './story';

const totalFrames = SHOTS.reduce((acc, shot) => acc + shot.durationInFrames, 0);

export const Root = () => {
  return (
    <Composition
      id="PerfectionVsProgress"
      component={MainVideo}
      durationInFrames={totalFrames}
      fps={24}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(Root);
