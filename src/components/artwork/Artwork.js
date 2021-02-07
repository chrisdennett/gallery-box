import React, { useEffect } from "react";
import { drawCanvasToCanvas, drawStretchCanvas } from "./helpers";
import SoundMonitor from "../soundMonitor/SoundMonitor";

export default function Artwork({ sourceImg, frameCount }) {
  const experimentCanvasRef = React.useRef(null);

  useEffect(() => {
    if (!sourceImg || !experimentCanvasRef) return;

    const expDisplayCanvas = experimentCanvasRef.current;

    const stretchProps = {
      sourceCanvas: sourceImg,
      targStretchW: 300,
      targStretchH: 300,
      srcStretchW: 100,
      srcStretchH: 100,
    };

    const stretchCanvas = drawStretchCanvas(stretchProps);
    drawCanvasToCanvas(stretchCanvas, expDisplayCanvas, 1024, 768);

    // eslint-disable-next-line
  }, [sourceImg, frameCount]);

  const setVolume = (vol) => {
    // setStretchSize(300 - vol * 3);
  };

  return (
    <div>
      <SoundMonitor onVolumeChange={setVolume} />

      <div>
        <canvas ref={experimentCanvasRef} />
      </div>
    </div>
  );
}
