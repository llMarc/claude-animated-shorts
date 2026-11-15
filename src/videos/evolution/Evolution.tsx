import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

import { SHOTS, CAMS, DOF_AT } from './story';



export const EvolutionShort = () => {

  const frame = useCurrentFrame();



  // Find the active shot based on the current frame

  let currentShot = SHOTS[0];

  for (const shot of SHOTS) {

    if (frame >= shot.startFrame && frame < shot.startFrame + shot.duration) {

      currentShot = shot;

      break;

    }

  }



  // Calculate local frame time within the current shot

  const localFrame = frame - currentShot.startFrame;

  const shotConfig = CAMS[currentShot.id as keyof typeof CAMS];

  const camera = shotConfig ? shotConfig(localFrame) : { pos: [0, 8, 25], roll: 4.2 };



  return (

    <AbsoluteFill style={{ backgroundColor: '#f4efe6', color: '#241726', overflow: 'hidden' }}>

      {/* Background & Aesthetic Theme (Plum Ink Outlines / Warm Paper Tone) */}

      <div

        style={{

          position: 'absolute',

          inset: 0,

          display: 'flex',

          flexDirection: 'column',

          justifyContent: 'flex-end',

          padding: '80px',

          boxSizing: 'border-box',

          border: '12px solid #241726',

        }}

      >

        <div style={{ marginBottom: '40px' }}>

          <span

            style={{

              fontSize: '28px',

              textTransform: 'uppercase',

              letterSpacing: '2px',

              fontWeight: 800,

              background: '#241726',

              color: '#f4efe6',

              padding: '6px 16px',

              display: 'inline-block',

              marginBottom: '16px',

            }}

          >

            Evolutionary Shift

          </span>

          <h1 style={{ fontSize: '64px', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>

            The Great Downhill Climb

          </h1>

        </div>



        {/* Real-time telemetry overlay for testing camera glides & roll */}

        <div

          style={{

            background: 'rgba(36, 23, 38, 0.05)',

            border: '2px dashed #241726',

            padding: '24px',

            borderRadius: '12px',

            fontSize: '22px',

            fontFamily: 'monospace',

          }}

        >

          <div><strong>Shot:</strong> {currentShot.id}</div>

          <div><strong>Frame:</strong> {frame} (Local: {localFrame})</div>

          <div><strong>Camera Roll:</strong> {camera.roll}°</div>

        </div>

      </div>

    </AbsoluteFill>

  );

}; 
