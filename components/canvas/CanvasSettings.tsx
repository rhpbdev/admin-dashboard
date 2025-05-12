import React, { ChangeEvent, useState, useEffect } from 'react';
import { Canvas as FabricCanvas } from 'fabric';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CanvasSettingsProps {
  canvas: FabricCanvas | null;
}

const CanvasSettings = ({ canvas }: CanvasSettingsProps) => {
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [canvasWidth, setCanvasWidth] = useState(500);

  useEffect(() => {
    if (!canvas) return;

    // canvas.setWidth(canvasWidth);
    // canvas.setHeight(canvasHeight);
    canvas.setDimensions({ width: canvasWidth, height: canvasHeight });
    canvas.renderAll();
  }, [canvasHeight, canvasWidth, canvas]);

  useEffect(() => {
    if (canvas) {
      setCanvasWidth(canvas.getWidth());
      setCanvasHeight(canvas.getHeight());
    }
  }, [canvas]); // Initialize from canvas when it's available

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const intValue = parseInt(value, 10);
    if (intValue >= 0) {
      setCanvasWidth(intValue);
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const intValue = parseInt(value, 10);

    if (intValue >= 0) {
      setCanvasHeight(intValue);
    }
  };

  return (
    <div className="CanvasSettings dark p-4 gap-4 space-x-4 flex flex-col bottom-4 rounded-s">
      <div>
        <span className="font-bold">Canvas Dimensions</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full max-w-xs">
          <Label htmlFor="canvasWidth">Width</Label>
          <Input
            type="number"
            id="canvasWidth"
            value={canvasWidth}
            onChange={handleWidthChange}
            className="mt-2"
          />
        </div>
        <div className="w-full max-w-xs">
          <Label htmlFor="canvasHeight">Height</Label>
          <Input
            id="canvasHeight"
            type="number"
            value={canvasHeight}
            onChange={handleHeightChange}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasSettings;
