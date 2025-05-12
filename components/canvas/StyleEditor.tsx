import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';

interface ColorItem {
  id: string;
  color: string;
}

interface Props {
  canvas: any;
}

interface SaveColorProps {
  color: string;
  id: string;
}

const StyleEditor: React.FC<Props> = ({ canvas }) => {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [newColor, setNewColor] = useState<string>('#000000');
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedStyles = JSON.parse(
      localStorage.getItem('canvasStyles') || '[]'
    ) as ColorItem[];
    setColors(savedStyles);
  }, []); // ← run only once

  const addColor = () => {
    const id = `color${Date.now()}`;
    const updatedColors = [...colors, { id, color: newColor }];
    setColors(updatedColors);
    console.log(updatedColors);
  };

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  const saveColors = () => {
    localStorage.setItem('canvasStyles', JSON.stringify(colors));
  };

  const applyStyle = ({ color, id }: SaveColorProps): void => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.set('fill', color);
      activeObject.set('styleID', id);
      canvas.renderAll();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4 fixed bottom-4 bg-dark rounded-sm">
        <h2 className="text-lg font-semibold">Style Editor</h2>
        <Input
          ref={colorInputRef}
          type="color"
          value={newColor}
          id="color"
          onChange={(e) => setNewColor(e.target.value)}
          style={{
            pointerEvents: 'none',
            width: 0,
            height: 0,
            opacity: 0,
            padding: 0
          }}
        />

        <div className="grid grid-cols-2 gap-2">
          {/* color picker square */}
          <div
            onClick={openColorPicker}
            className="h-8 w-8 rounded border flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: newColor }}
          />
          <Button
            variant="outline"
            onClick={addColor}
            className="bg-transparent"
          >
            Add Color
          </Button>
        </div>

        {/* saved colors */}
        <div className="flex gap-2">
          {colors.map(({ id, color }) => (
            <div
              key={id}
              onClick={() => applyStyle({ color, id })}
              className="h-8 w-8 rounded border flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: color }}
            >
              +
            </div>
          ))}
        </div>
        <Button onClick={saveColors}>Save Colors</Button>
      </div>
    </>
  );
};

export default StyleEditor;
