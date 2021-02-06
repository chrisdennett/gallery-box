import React, { useEffect, useState } from "react";
// import fx from "glfx";
import { drawCanvasToCanvas, drawStretchCanvas } from "./helpers";
import SoundMonitor from "../soundMonitor/SoundMonitor";

export default function Artwork({ sourceImg, frameCount }) {
  const [stretchSize, setStretchSize] = useState(280);
  const experimentCanvasRef = React.useRef(null);

  useEffect(() => {
    if (!sourceImg || !experimentCanvasRef) return;

    const expDisplayCanvas = experimentCanvasRef.current;
    const stretchCanvas = drawStretchCanvas(sourceImg, stretchSize);
    drawCanvasToCanvas(stretchCanvas, expDisplayCanvas, 1);

    // eslint-disable-next-line
  }, [sourceImg, frameCount]);

  const setVolume = (vol) => {
    setStretchSize(300 - vol * 3);
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
