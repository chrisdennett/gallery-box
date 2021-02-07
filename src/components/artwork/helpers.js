export const drawCanvasToCanvas = (
  srcCanvas,
  targCanvas,
  targW = 1024,
  targH = 768,
  doDoubleScan = true
) => {
  targCanvas.width = targW;
  targCanvas.height = targH;

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

  if (doDoubleScan) {
    ctx.globalAlpha = 0.5;
    ctx.globalCompositeOperation = "overlay";
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
  }
};

export function drawStretchCanvas({
  sourceCanvas,
  targStretchW = 300,
  targStretchH = 300,
  srcStretchW = 100,
  srcStretchH = 100,
}) {
  const outCanvas = document.createElement("canvas");
  const { width: srcW, height: srcH } = sourceCanvas;

  outCanvas.width = srcW + targStretchW - srcStretchW;
  outCanvas.height = srcH + targStretchH - srcStretchH;

  const ctx = outCanvas.getContext("2d");

  // put stretch in middle
  const srcMidX = Math.round(srcW / 2);
  const srcMidY = Math.round(srcH / 2);
  const srcStretchX = srcMidX - srcStretchW / 2;
  const srcStretchY = srcMidY - srcStretchH / 2;
  const targStretchX = srcStretchX;
  const targStretchY = srcStretchY;
  const srcRightSegX = srcStretchX + srcStretchW;
  const targRightSegX = targStretchX + targStretchW;
  const srcBottomSegY = srcStretchY + srcStretchH;
  const targBottomSegY = targStretchY + targStretchH;

  const src = {};
  src.topLeft = {
    x: 0,
    y: 0,
    w: srcStretchX,
    h: srcStretchY,
  };
  src.topRight = {
    x: srcRightSegX,
    y: 0,
    w: srcW - srcRightSegX,
    h: src.topLeft.h,
  };
  src.bottomLeft = {
    x: 0,
    y: srcBottomSegY,
    w: src.topLeft.w,
    h: srcH - srcBottomSegY,
  };
  src.bottomRight = {
    x: src.topRight.x,
    y: src.bottomLeft.y,
    w: src.topRight.w,
    h: srcH - srcBottomSegY,
  };
  src.middleLeft = {
    x: 0,
    y: src.topLeft.h,
    h: srcStretchH,
    w: src.topLeft.w,
  };
  src.middleRight = {
    x: src.topRight.x,
    y: src.middleLeft.y,
    h: src.middleLeft.h,
    w: src.topRight.w,
  };
  src.topMiddle = {
    x: src.topLeft.w,
    y: 0,
    w: srcStretchW,
    h: src.topLeft.h,
  };
  src.bottomMiddle = {
    x: src.topMiddle.x,
    y: src.bottomLeft.y,
    w: src.topMiddle.w,
    h: src.bottomLeft.h,
  };
  src.middleMiddle = {
    x: src.topMiddle.x,
    y: src.middleLeft.y,
    w: src.topMiddle.w,
    h: src.middleLeft.h,
  };

  const targ = {};
  targ.topLeft = {
    x: src.topLeft.x,
    y: src.topLeft.y,
    w: src.topLeft.w,
    h: src.topLeft.h,
  };
  targ.topRight = {
    x: targRightSegX,
    y: src.topLeft.y,
    w: src.topLeft.w,
    h: src.topLeft.h,
  };
  targ.bottomLeft = {
    x: targ.topLeft.x,
    y: targBottomSegY,
    w: src.bottomLeft.w,
    h: src.bottomLeft.h,
  };
  targ.bottomRight = {
    x: targ.topRight.x,
    y: targ.bottomLeft.y,
    w: targ.topLeft.w,
    h: targ.bottomLeft.h,
  };
  targ.middleLeft = {
    x: 0,
    y: targ.topLeft.h,
    w: targ.topLeft.w,
    h: targStretchH,
  };
  targ.middleRight = {
    x: targ.topRight.x,
    y: targ.middleLeft.y,
    w: targ.topRight.w,
    h: targ.middleLeft.h,
  };
  targ.topMiddle = {
    x: targ.topLeft.w,
    y: 0,
    w: targStretchW,
    h: targ.topLeft.h,
  };
  targ.bottomMiddle = {
    x: targ.topMiddle.x,
    y: targ.bottomLeft.y,
    w: targ.topMiddle.w,
    h: targ.bottomLeft.h,
  };
  targ.middleMiddle = {
    x: targ.topMiddle.x,
    y: targ.middleLeft.y,
    w: targ.topMiddle.w,
    h: targ.middleLeft.h,
  };

  // draw top left "Normal"
  drawSegment(sourceCanvas, ctx, src.topLeft, targ.topLeft);

  // draw bottom left "Normal"
  drawSegment(sourceCanvas, ctx, src.bottomLeft, targ.bottomLeft);

  // draw top right "Normal"
  drawSegment(sourceCanvas, ctx, src.topRight, targ.topRight);

  // draw bottom right "Normal"
  drawSegment(sourceCanvas, ctx, src.bottomRight, targ.bottomRight);

  // draw middle left stretch
  drawSegment(sourceCanvas, ctx, src.middleLeft, targ.middleLeft);

  // draw middle right stretch
  drawSegment(sourceCanvas, ctx, src.middleRight, targ.middleRight);

  // draw top middle stretch
  drawSegment(sourceCanvas, ctx, src.topMiddle, targ.topMiddle);

  // draw bottom middle stretch
  drawSegment(sourceCanvas, ctx, src.bottomMiddle, targ.bottomMiddle);

  // draw middle middle stretch
  drawSegment(sourceCanvas, ctx, src.middleMiddle, targ.middleMiddle);

  return outCanvas;
}

function drawSegment(img, ctx, src, targ) {
  ctx.drawImage(
    img,
    src.x,
    src.y,
    src.w,
    src.h,
    targ.x,
    targ.y,
    targ.w,
    targ.h
  );
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
