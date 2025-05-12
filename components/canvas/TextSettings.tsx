'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Canvas as FabricCanvas, Textbox } from 'fabric';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TextSettingsProps {
  canvas: FabricCanvas | null;
  selectedObject: Textbox | null;
}

const TextSettings: React.FC<TextSettingsProps> = ({
  canvas,
  selectedObject
}) => {
  const [fontSize, setFontSize] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [textAlign, setTextAlign] = useState<string>('left');
  const [color, setColor] = useState<string>('#000000');

  useEffect(() => {
    if (!selectedObject) return;
    setFontSize(selectedObject.fontSize?.toString() || '');
    setFontFamily(selectedObject.fontFamily || 'Arial');
    setTextAlign(selectedObject.textAlign || 'left');
    setColor((selectedObject.fill as string) || '#000000');
  }, [selectedObject]);

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFontSize(value);
    if (selectedObject) {
      selectedObject.set({ fontSize: parseInt(value, 10) });
      canvas?.renderAll();
    }
  };

  // now accepts the new font as a string directly:
  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    if (selectedObject) {
      selectedObject.set({ fontFamily: value });
      canvas?.renderAll();
    }
  };

  const handleTextAlignChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTextAlign(value);
    if (selectedObject) {
      selectedObject.set({ textAlign: value });
      canvas?.renderAll();
    }
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
    if (selectedObject) {
      selectedObject.set({ fill: value });
      canvas?.renderAll();
    }
  };

  return (
    <div className="TextSettings dark">
      {selectedObject && (
        <>
          {/* Font size */}
          <Input
            type="number"
            value={fontSize}
            id="fontSize"
            onChange={handleFontSizeChange}
            placeholder="Font Size"
          />

          {/* ShadCN/UI Select for Font Family */}
          <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times</SelectItem>
              <SelectItem value="Courier New">Courier</SelectItem>
              <SelectItem value="Verdana">Verdana</SelectItem>
            </SelectContent>
          </Select>

          {/* Text alignment (native for now) */}
          <select
            value={textAlign}
            id="textAlign"
            onChange={handleTextAlignChange}
            className="align-select"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          {/* Color picker */}
          <Input
            type="color"
            value={color}
            id="textColor"
            onChange={handleColorChange}
          />
        </>
      )}
    </div>
  );
};

export default TextSettings;
