import React, { useEffect, useState } from "react";
import fx from "glfx";
import { createInkCanvas, drawCanvasToCanvas } from "./helpers";

export default function Artwork({ sourceImg, frameCount }) {
  const [showControls, setShowControls] = useState(false);
  const [glCanvas, setGlCanvas] = useState(null);
  const [denoiseLevel, setDenoiseLevel] = useState(25);
  const [inkLevel, setInkLevel] = useState(0.7);

  const experimentCanvasRef = React.useRef(null);

  const onInkLevelChange = (e) => setInkLevel(e.target.value);
  const onDenoiseLevel = (e) => setDenoiseLevel(e.target.value);

  useEffect(() => {
    if (!sourceImg || !experimentCanvasRef) return;

    if (!glCanvas) {
      var canvas = fx.canvas();
      setGlCanvas(canvas);
    } else {
      var texture = glCanvas.texture(sourceImg);
      glCanvas.draw(texture).denoise(denoiseLevel).ink(inkLevel).update();
      const expDisplayCanvas = experimentCanvasRef.current;
      const expCanvas = createInkCanvas(glCanvas);
      drawCanvasToCanvas(expCanvas, expDisplayCanvas, 1);
    }

    // eslint-disable-next-line
  }, [sourceImg, frameCount, inkLevel]);

  return (
    <div>
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
