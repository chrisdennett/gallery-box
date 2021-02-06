import React, { useEffect, useState } from "react";
// import fx from "glfx";
import { createInkCanvas, drawCanvasToCanvas } from "./helpers";
import SoundMonitor from "../soundMonitor/SoundMonitor";

export default function Artwork({ sourceImg, frameCount }) {
  const [volume, setVolume] = useState(0);
  const [showControls, setShowControls] = useState(false);
  // const [glCanvas, setGlCanvas] = useState(null);
  const [denoiseLevel, setDenoiseLevel] = useState(25);
  const [inkLevel, setInkLevel] = useState(0.7);

  const experimentCanvasRef = React.useRef(null);

  const onInkLevelChange = (e) => setInkLevel(e.target.value);
  const onDenoiseLevel = (e) => setDenoiseLevel(e.target.value);

  useEffect(() => {
    if (!sourceImg || !experimentCanvasRef) return;

    const expDisplayCanvas = experimentCanvasRef.current;
    const expCanvas = createInkCanvas(sourceImg);
    drawCanvasToCanvas(sourceImg, expDisplayCanvas, 1);

    // eslint-disable-next-line
  }, [sourceImg, frameCount, inkLevel]);

  return (
    <div>
      <SoundMonitor onVolumeChange={setVolume} volume={volume} />

      <div>
        {showControls && (
          <>
            INK:{" "}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={inkLevel}
              onChange={onInkLevelChange}
            />
            DENOISE:{" "}
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={denoiseLevel}
              onChange={onDenoiseLevel}
            />
          </>
        )}
      </div>
      <div onClick={() => setShowControls((prev) => !prev)}>
        <canvas ref={experimentCanvasRef} />
      </div>
    </div>
  );
}
