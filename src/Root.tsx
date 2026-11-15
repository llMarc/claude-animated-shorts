import { Composition, registerRoot } from 'remotion';
import { CelBoilShort } from './CelBoilShort';

export const Root = () => {
  return (
    <Composition
      id="CelBoilShort"
      component={CelBoilShort}
      durationInFrames={240}
      fps={24}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(Root);
