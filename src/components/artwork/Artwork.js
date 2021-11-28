import React, { useEffect, useState } from "react";
import { drawCanvasToCanvas, drawStretchCanvas } from "../../helpers/helpers";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Controls from "../controls/Controls";

export default function Artwork({ sourceImg, frameCount }) {
  const [showControls, setShowControls] = useState(false);
  const [settings, setSettings] = useLocalStorage("galleryBoxSettings", {
    fromWidth: 100,
    toWidth: 320,
    fromHeight: 100,
    toHeight: 320,
  });

  const experimentCanvasRef = React.useRef(null);

  useEffect(() => {
    if (!sourceImg || !experimentCanvasRef) return;

    const expDisplayCanvas = experimentCanvasRef.current;

    const stretchProps = {
      sourceCanvas: sourceImg,
      srcStretchW: settings.fromWidth,
      targStretchW: settings.toWidth,
      srcStretchH: settings.fromHeight,
      targStretchH: settings.toHeight,
    };

    const stretchCanvas = drawStretchCanvas(stretchProps);
    drawCanvasToCanvas(
      stretchCanvas,
      expDisplayCanvas,
      1024,
      768,
      true,
      frameCount
    );

    // eslint-disable-next-line
  }, [sourceImg, frameCount]);

  const hiddenCursorClass = frameCount > 1000 ? "hiddenCursor" : "";

  return (
    <div className={hiddenCursorClass}>
      {showControls && (
        <Controls settings={settings} setSettings={setSettings} />
      )}

      <canvas
        ref={experimentCanvasRef}
        onClick={() => setShowControls(!showControls)}
      />
    </div>
  );
}
