import { Composition } from 'remotion';
import { BridgeShort } from './videos/bridge/Bridge';
import { EvolutionShort } from './videos/evolution/Evolution'; // Import your custom short component

export const Root = () => {
  return (
    <>
      {/* Reference Bridge Short from the repository */}
      <Composition
        id="BridgeShort"
        component={BridgeShort}
        durationInFrames={2010} // 67 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Your Custom Evolution Short */}
      <Composition
        id="EvolutionShort"
        component={EvolutionShort}
        durationInFrames={840} // Total frames of your combined shots in story.ts
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
