import { Line } from 'fabric';

const snappingDistance = 10;
const margin = 20; // 👈 adjust this to your desired margin snap distance

export const handleObjectMoving = (canvas, obj, guidelines, setGuidelines) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const left = obj.left;
  const top = obj.top;
  const right = left + obj.width * obj.scaleX;
  const bottom = top + obj.height * obj.scaleY;
  const centerX = left + (obj.width * obj.scaleX) / 2;
  const centerY = top + (obj.height * obj.scaleY) / 2;
  const centerCanvasX = canvasWidth / 2;
  const centerCanvasY = canvasHeight / 2;

  let newGuidelines = [];
  clearGuidelines(canvas);

  let snapped = false;

  // 👉 Edge snapping
  snapped =
    snapToEdge(
      canvas,
      obj,
      newGuidelines,
      left,
      top,
      right,
      bottom,
      canvasWidth,
      canvasHeight
    ) || snapped;

  // 👉 Margin snapping
  snapped =
    snapToMargins(
      canvas,
      obj,
      newGuidelines,
      left,
      top,
      right,
      bottom,
      canvasWidth,
      canvasHeight,
      margin
    ) || snapped;

  // 👉 Center snapping
  snapped =
    snapToCenter(
      canvas,
      obj,
      newGuidelines,
      centerX,
      centerY,
      centerCanvasX,
      centerCanvasY
    ) || snapped;

  if (!snapped) {
    clearGuidelines(canvas);
  } else {
    setGuidelines(newGuidelines);
  }

  canvas.renderAll();
};

// 🔧 HELPER FUNCTIONS

const snapToEdge = (
  canvas,
  obj,
  guidelines,
  left,
  top,
  right,
  bottom,
  canvasWidth,
  canvasHeight
) => {
  let snapped = false;

  if (Math.abs(left) < snappingDistance) {
    obj.set({ left: 0 });
    addGuideline(
      canvas,
      guidelines,
      createVerticalGuideline(canvas, 0, 'vertical-left')
    );
    snapped = true;
  }

  if (Math.abs(top) < snappingDistance) {
    obj.set({ top: 0 });
    addGuideline(
      canvas,
      guidelines,
      createHorizontalGuideline(canvas, 0, 'horizontal-top')
    );
    snapped = true;
  }

  if (Math.abs(right - canvasWidth) < snappingDistance) {
    obj.set({ left: canvasWidth - obj.width * obj.scaleX });
    addGuideline(
      canvas,
      guidelines,
      createVerticalGuideline(canvas, canvasWidth, 'vertical-right')
    );
    snapped = true;
  }

  if (Math.abs(bottom - canvasHeight) < snappingDistance) {
    obj.set({ top: canvasHeight - obj.height * obj.scaleY });
    addGuideline(
      canvas,
      guidelines,
      createHorizontalGuideline(canvas, canvasHeight, 'horizontal-bottom')
    );
    snapped = true;
  }

  return snapped;
};

const snapToMargins = (
  canvas,
  obj,
  guidelines,
  left,
  top,
  right,
  bottom,
  canvasWidth,
  canvasHeight,
  margin
) => {
  let snapped = false;

  if (Math.abs(left - margin) < snappingDistance) {
    obj.set({ left: margin });
    addGuideline(
      canvas,
      guidelines,
      createVerticalGuideline(canvas, margin, 'margin-left')
    );
    snapped = true;
  }

  if (Math.abs(right - (canvasWidth - margin)) < snappingDistance) {
    obj.set({ left: canvasWidth - margin - obj.width * obj.scaleX });
    addGuideline(
      canvas,
      guidelines,
      createVerticalGuideline(canvas, canvasWidth - margin, 'margin-right')
    );
    snapped = true;
  }

  if (Math.abs(top - margin) < snappingDistance) {
    obj.set({ top: margin });
    addGuideline(
      canvas,
      guidelines,
      createHorizontalGuideline(canvas, margin, 'margin-top')
    );
    snapped = true;
  }

  if (Math.abs(bottom - (canvasHeight - margin)) < snappingDistance) {
    obj.set({ top: canvasHeight - margin - obj.height * obj.scaleY });
    addGuideline(
      canvas,
      guidelines,
      createHorizontalGuideline(canvas, canvasHeight - margin, 'margin-bottom')
    );
    snapped = true;
  }

  return snapped;
};

const snapToCenter = (
  canvas,
  obj,
  guidelines,
  centerX,
  centerY,
  centerCanvasX,
  centerCanvasY
) => {
  let snapped = false;

  if (Math.abs(centerX - centerCanvasX) < snappingDistance) {
    obj.set({ left: centerCanvasX - (obj.width * obj.scaleX) / 2 });
    addGuideline(
      canvas,
      guidelines,
      createVerticalGuideline(canvas, centerCanvasX, 'vertical-center')
    );
    snapped = true;
  }

  if (Math.abs(centerY - centerCanvasY) < snappingDistance) {
    obj.set({ top: centerCanvasY - (obj.height * obj.scaleY) / 2 });
    addGuideline(
      canvas,
      guidelines,
      createHorizontalGuideline(canvas, centerCanvasY, 'horizontal-center')
    );
    snapped = true;
  }

  return snapped;
};

const addGuideline = (canvas, guidelines, line) => {
  if (!guidelineExists(canvas, line.id)) {
    guidelines.push(line);
    canvas.add(line);
  }
};

export const createVerticalGuideline = (canvas, x, id) => {
  return new Line([x, 0, x, canvas.height], {
    id,
    stroke: 'red',
    strokeWidth: 2,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8
  });
};

export const createHorizontalGuideline = (canvas, y, id) => {
  return new Line([0, y, canvas.width, y], {
    id,
    stroke: 'red',
    strokeWidth: 2,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8
  });
};

export const clearGuidelines = (canvas) => {
  const lines = canvas.getObjects('line');
  lines.forEach((line) => {
    if (
      line.id?.startsWith('vertical-') ||
      line.id?.startsWith('horizontal-') ||
      line.id?.startsWith('margin-')
    ) {
      canvas.remove(line);
    }
  });
  canvas.renderAll();
};

const guidelineExists = (canvas, id) => {
  return canvas.getObjects('line').some((obj) => obj.id === id);
};
