import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { drawCanvasToCanvas, drawStretchCanvas } from "../../helpers/helpers";

export default function Artwork({ sourceImg, frameCount }) {
  const [spokenColour, setSpokenColour] = useState(null);
  const experimentCanvasRef = React.useRef(null);

  const commands = [
    {
      command: ["red", "green", "yellow", "blue"],
      callback: (colour) => setSpokenColour(colour),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
  ];

  useSpeechRecognition({ commands });

  useEffect(() => {
    if (!sourceImg || !experimentCanvasRef) return;

    const expDisplayCanvas = experimentCanvasRef.current;

    const stretchProps = {
      sourceCanvas: sourceImg,
      targStretchW: 320,
      targStretchH: 320,
      srcStretchW: 100,
      srcStretchH: 100,
    };

    const stretchCanvas = drawStretchCanvas(stretchProps);
    drawCanvasToCanvas(
      stretchCanvas,
      expDisplayCanvas,
      1024,
      768,
      spokenColour
    );

    // eslint-disable-next-line
  }, [sourceImg, frameCount]);

  const doSetUp = () => {
    console.log("Hello");
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div onClick={doSetUp}>
      <canvas ref={experimentCanvasRef} style={{ cursor: "none" }} />
    </div>
  );
}
