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

export function drawStretchCanvas(
  sourceCanvas,
  stretchHorizontal = 50,
  stretchVertical = 300,
  srcStretchW = 100,
  srcStretchH = 50
) {
  const outCanvas = document.createElement("canvas");
  const { width: srcW, height: srcH } = sourceCanvas;

  outCanvas.width = srcW + stretchHorizontal - srcStretchW;
  outCanvas.height = srcW + stretchVertical - srcStretchH;

  const ctx = outCanvas.getContext("2d");
  const srcMidX = Math.round(srcW / 2);
  const srcStretchX = srcMidX - srcStretchW / 2;
  const srcLeftSideW = srcStretchX;
  const srcRightX = srcLeftSideW + srcStretchW;
  const targRightX = srcLeftSideW + stretchHorizontal;
  const srcRightSideW = srcW + srcRightX;

  // left side
  drawSlice(sourceCanvas, ctx, 0, srcH, srcLeftSideW, 0, srcLeftSideW);

  // stretch
  drawSlice(
    sourceCanvas,
    ctx,
    srcStretchX,
    srcH,
    srcStretchW,
    srcStretchX,
    stretchHorizontal,
    srcH
  );

  // right side
  drawSlice(
    sourceCanvas,
    ctx,
    srcRightX,
    srcH,
    srcRightSideW,
    targRightX,
    srcRightSideW
  );

  return outCanvas;
}

function drawSlice(src, ctx, srcX, srcH, srcW, targX, targW) {
  ctx.drawImage(src, srcX, 0, srcW, srcH, targX, 0, targW, srcH);
}

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
