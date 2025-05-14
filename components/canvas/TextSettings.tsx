'use client';

import React, { useState, useLayoutEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { TextSettingsProps } from '@/components/canvas/types/textSettings';
import { fontFamilyDefaults } from '@/components/canvas/constants/fontOptions';

const normalizeSelectValue = (value: unknown): string => {
  return typeof value === 'string' && value.trim() !== '' ? value : '';
};

const TextSettings: React.FC<TextSettingsProps> = ({
  canvas,
  selectedObject
}) => {
  const [fontSize, setFontSize] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('');
  const [textAlign, setTextAlign] = useState<string>('left');
  const [color, setColor] = useState<string>('#000000');

  useLayoutEffect(() => {
    if (!selectedObject) return;
    setFontSize(selectedObject.fontSize?.toString() ?? '');
    setFontFamily(normalizeSelectValue(selectedObject.fontFamily));
    setTextAlign(selectedObject.textAlign ?? 'left');
    setColor((selectedObject.fill as string) ?? '#000000');
  }, [selectedObject]);

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFontSize(value);
    if (selectedObject) {
      selectedObject.set({ fontSize: parseInt(value, 10) });
      canvas?.requestRenderAll();
    }
  };

  const handleFontFamilyChange = async (value: string) => {
    setFontFamily(value);
    if (selectedObject) {
      selectedObject.set({ fontFamily: value });

      try {
        await document.fonts.load(`16px "${value}"`);
      } catch (e) {
        console.warn('Font load error:', e);
      }

      canvas?.requestRenderAll();
    }
  };

  const handleTextAlignChange = (value: string) => {
    setTextAlign(value);
    if (selectedObject) {
      selectedObject.set({ textAlign: value });
      canvas?.requestRenderAll();
    }
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
    if (selectedObject) {
      selectedObject.set({ fill: value });
      canvas?.requestRenderAll();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {selectedObject && (
        <>
          <div>
            <span className="font-bold">Text Settings</span>
          </div>

          <Input
            type="number"
            value={fontSize}
            id="fontSize"
            onChange={handleFontSizeChange}
            placeholder="Font Size"
          />

          <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="w-full text-amber">
              <SelectValue
                placeholder="Select a font family"
                className="text-amber"
              />
            </SelectTrigger>
            <SelectContent>
              {fontFamilyDefaults.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={textAlign} onValueChange={handleTextAlignChange}>
            <SelectTrigger className="w-full text-amber">
              <SelectValue placeholder="Text Alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="justify">Justify</SelectItem>
            </SelectContent>
          </Select>

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
