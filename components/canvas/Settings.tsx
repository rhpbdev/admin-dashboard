// components/Settings.tsx

'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Canvas as FabricCanvas,
  Object as FabricObject,
  Textbox
} from 'fabric';
import { Input } from '@/components/ui/input';
import TextSettings from './TextSettings';

interface SettingsProps {
  canvas: FabricCanvas | null;
}

const Settings: React.FC<SettingsProps> = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (object: FabricObject) => {
      if (!object) return;
      setSelectedObject(object);

      if (object.type === 'rect') {
        const w = Math.round(object.width! * object.scaleX!);
        const h = Math.round(object.height! * object.scaleY!);
        setWidth(w.toString());
        setHeight(h.toString());
        setColor(object.fill as string);
        setDiameter('');
      } else if (object.type === 'circle') {
        const d = Math.round((object as any).radius! * 2 * object.scaleX!);
        setDiameter(d.toString());
        setColor(object.fill as string);
        setWidth('');
        setHeight('');
      }
    };

    const clearSettings = () => {
      setSelectedObject(null);
      setWidth('');
      setHeight('');
      setDiameter('');
      setColor('');
    };

    const onCreated = (e: any) => handleSelection(e.selected[0]);
    const onUpdated = (e: any) => handleSelection(e.selected[0]);
    const onCleared = () => clearSettings();
    const onModified = (e: any) => handleSelection(e.target);
    const onScaling = (e: any) => handleSelection(e.target);

    canvas.on('selection:created', onCreated);
    canvas.on('selection:updated', onUpdated);
    canvas.on('selection:cleared', onCleared);
    canvas.on('object:modified', onModified);
    canvas.on('object:scaling', onScaling);

    return () => {
      canvas.off('selection:created', onCreated);
      canvas.off('selection:updated', onUpdated);
      canvas.off('selection:cleared', onCleared);
      canvas.off('object:modified', onModified);
      canvas.off('object:scaling', onScaling);
    };
  }, [canvas]);

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setWidth(val);
    if (selectedObject?.type === 'rect') {
      const intVal = parseInt(val, 10);
      selectedObject.set({ width: intVal / selectedObject.scaleX! });
      canvas?.renderAll();
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setHeight(val);
    if (selectedObject?.type === 'rect') {
      const intVal = parseInt(val, 10);
      selectedObject.set({ height: intVal / selectedObject.scaleY! });
      canvas?.renderAll();
    }
  };

  const handleDiameterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setDiameter(val);
    if (selectedObject?.type === 'circle') {
      const intVal = parseInt(val, 10);
      selectedObject.set({ radius: intVal / 2 / selectedObject.scaleX! });
      canvas?.renderAll();
    }
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColor(val);
    if (selectedObject) {
      selectedObject.set({ fill: val });
      canvas?.renderAll();
    }
  };

  return (
    <div className="Settings dark w-[225px]">
      {selectedObject?.type === 'rect' && (
        <>
          <Input
            type="number"
            value={width}
            id="width"
            onChange={handleWidthChange}
            placeholder="Width"
          />
          <Input
            type="number"
            value={height}
            id="height"
            onChange={handleHeightChange}
            placeholder="Height"
          />
          <Input
            type="color"
            value={color}
            id="color"
            onChange={handleColorChange}
          />
        </>
      )}

      {selectedObject?.type === 'circle' && (
        <>
          <Input
            type="number"
            value={diameter}
            id="diameter"
            onChange={handleDiameterChange}
            placeholder="Diameter"
          />
          <Input
            type="color"
            value={color}
            id="circleColor"
            onChange={handleColorChange}
          />
        </>
      )}

      {selectedObject?.type === 'textbox' && (
        <TextSettings
          canvas={canvas}
          selectedObject={selectedObject as Textbox}
        />
      )}
    </div>
  );
};

export default Settings;
