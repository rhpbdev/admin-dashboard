import { Line } from 'fabric';

const snappingDistance = 10;

const VISUAL_GUIDELINE_STROKE_WIDTH = 5; // Try starting with 3px, 5px, or even 10px logical units
const VISUAL_GUIDELINE_DASH_VALUE = 15; // Make dash values larger too, e.g., 3-5x strokeWidth

export const handleObjectMoving = (canvas, obj, guidelines, setGuidelines) => {
  const canvasWidth = canvas.getWidth(); // Correct Fabric.js way
  const canvasHeight = canvas.getHeight(); // Correct Fabric.js way

  // object bounds
  const left = obj.left;
  const top = obj.top;
  const right = left + obj.width * obj.scaleX;
  const bottom = top + obj.height * obj.scaleY;

  // object center
  const centerX = left + (obj.width * obj.scaleX) / 2;
  const centerY = top + (obj.height * obj.scaleY) / 2;

  // canvas mid‐points
  const centerCanvasX = canvasWidth / 2;
  const centerCanvasY = canvasHeight / 2;

  let newGuidelines = [];
  clearGuidelines(canvas);

  let snapped = false;

  // —— Edge snapping (unchanged) —— //

  if (Math.abs(left) < snappingDistance) {
    obj.set({ left: 0 });
    if (!guidelineExists(canvas, 'vertical-left')) {
      const line = createVerticalGuideline(canvas, 0, 'vertical-left');
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  if (Math.abs(top) < snappingDistance) {
    obj.set({ top: 0 });
    if (!guidelineExists(canvas, 'horizontal-top')) {
      const line = createHorizontalGuideline(canvas, 0, 'horizontal-top');
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  if (Math.abs(right - canvasWidth) < snappingDistance) {
    obj.set({ left: canvasWidth - obj.width * obj.scaleX });
    if (!guidelineExists(canvas, 'vertical-right')) {
      const line = createVerticalGuideline(
        canvas,
        canvasWidth,
        'vertical-right'
      );
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  if (Math.abs(bottom - canvasHeight) < snappingDistance) {
    obj.set({ top: canvasHeight - obj.height * obj.scaleY });
    if (!guidelineExists(canvas, 'horizontal-bottom')) {
      const line = createHorizontalGuideline(
        canvas,
        canvasHeight,
        'horizontal-bottom'
      );
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  // —— Center snapping —— //

  // Snap object’s center to canvas vertical mid‐line
  if (Math.abs(centerX - centerCanvasX) < snappingDistance) {
    // position so object is exactly centered
    obj.set({ left: centerCanvasX - (obj.width * obj.scaleX) / 2 });
    if (!guidelineExists(canvas, 'vertical-center')) {
      const line = createVerticalGuideline(
        canvas,
        centerCanvasX,
        'vertical-center'
      );
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  // Snap object’s center to canvas horizontal mid‐line
  if (Math.abs(centerY - centerCanvasY) < snappingDistance) {
    obj.set({ top: centerCanvasY - (obj.height * obj.scaleY) / 2 });
    if (!guidelineExists(canvas, 'horizontal-center')) {
      const line = createHorizontalGuideline(
        canvas,
        centerCanvasY,
        'horizontal-center'
      );
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  // If nothing snapped, clear any leftover guides
  if (!snapped) {
    clearGuidelines(canvas);
  } else {
    setGuidelines(newGuidelines);
  }

  canvas.renderAll();
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

// export const clearGuidelines = (canvas) => {
// 	const objects = canvas.getObjects('line');
// 	objects.forEach((obj) => {
// 		if (
// 			(obj.id && obj.id.startsWith('vertical-')) ||
// 			obj.id.startsWith('horizontal-')
// 		) {
// 			canvas.remove(obj);
// 		}
// 	});
// 	canvas.renderAll();
// };

export const clearGuidelines = (canvas) => {
  const lines = canvas.getObjects('line');
  lines.forEach((line) => {
    if (line.id?.startsWith('vertical-') || line.id.startsWith('horizontal-')) {
      canvas.remove(line);
    }
  });
  canvas.renderAll();
};

const guidelineExists = (canvas, id) => {
  return canvas.getObjects('line').some((obj) => obj.id === id);
};
