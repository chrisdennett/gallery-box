export const drawCanvasToCanvas = (srcCanvas, targCanvas, scale = 1) => {
  targCanvas.width = srcCanvas.width * scale;
  targCanvas.height = srcCanvas.height * scale;

  const ctx = targCanvas.getContext("2d");
  ctx.drawImage(
    srcCanvas,
    0,
    0,
    srcCanvas.width,
    srcCanvas.height,
    0,
    0,
    targCanvas.width,
    targCanvas.height
  );
};

export const createInkCanvas = (inputCanvas) => {
  if (!inputCanvas) return;

  const { width: inputW, height: inputH } = inputCanvas;
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = inputW;
  tempCanvas.height = inputH;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(inputCanvas, 0, 0);

  const inputCtx = tempCanvas.getContext("2d");
  if (!inputCtx) return;

  let imgData = inputCtx.getImageData(0, 0, inputW, inputH);
  let pixels = imgData.data;
  let r, g, b, outColour;
  for (let i = 0; i < pixels.length; i += 4) {
    r = pixels[i];
    g = pixels[i + 1];
    b = pixels[i + 2];

    if (r === 0 && g === 0 && b === 0) {
      outColour = 0;
    } else {
      outColour = 255;
    }

    pixels[i] = outColour;
    pixels[i + 1] = outColour;
    pixels[i + 2] = outColour;
  }

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = inputW;
  outputCanvas.height = inputH;
  const outputCtx = outputCanvas.getContext("2d");
  outputCtx.putImageData(imgData, 0, 0);

  return outputCanvas;
};
