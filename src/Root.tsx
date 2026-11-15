import { Composition, registerRoot } from 'remotion';
import { Evolution } from './videos/evolution/Evolution'; // (Keep your existing imports)

export const Root = () => {
  return (
    <>
      <Composition
        id="EvolutionShort"
        component={Evolution}
        durationInFrames={300} // (Keep your existing properties)
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

// This line is what Remotion is looking for!
registerRoot(Root);
