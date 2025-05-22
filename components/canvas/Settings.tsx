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
import { Label } from '@/components/ui/label';

interface SettingsProps {
  canvas: FabricCanvas | null;
}

const Settings: React.FC<SettingsProps> = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [hoveredObject, setHoveredObject] = useState<FabricObject | null>(null);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [opacity, setOpacity] = useState<string>('');
  const [scale, setScale] = useState<string>('');

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
        const o = Number(object.opacity!);
        setOpacity(o.toString());
      } else if (object.type === 'circle') {
        const d = Math.round((object as any).radius! * 2 * object.scaleX!);
        setDiameter(d.toString());
        setColor(object.fill as string);
        setWidth('');
        setHeight('');
        const o = Number(object.opacity!);
        setOpacity(o.toString());
      }
    };

    const clearSettings = () => {
      setSelectedObject(null);
      setWidth('');
      setHeight('');
      setDiameter('');
      setColor('');
      setOpacity('');
      setScale('');
    };

    const handleHover = (object: FabricObject) => {
      if (!object) return;
      setHoveredObject(object);

      if (object.type === 'rect' || object.type === 'circle') {
        // Store original shadow for later restoration
        if (!(object as any).__originalShadow) {
          (object as any).__originalShadow = object.shadow;
        }

        object.set({
          shadow: {
            color: 'rgba(30, 144, 255, 0.6)', // DodgerBlue glow
            blur: 20,
            offsetX: 0,
            offsetY: 0
          }
        });

        canvas.requestRenderAll();
      }
    };

    const handleMouseOut = (object: FabricObject) => {
      if (!object) return;
      setHoveredObject(null);

      if (object.type === 'rect' || object.type === 'circle') {
        const originalShadow = (object as any).__originalShadow || null;
        object.set({ shadow: originalShadow });
        canvas.requestRenderAll();
      }
    };

    const onCreated = (e: any) => handleSelection(e.selected[0]);
    const onUpdated = (e: any) => handleSelection(e.selected[0]);
    const onCleared = () => clearSettings();
    const onModified = (e: any) => handleSelection(e.target);
    const onScaling = (e: any) => handleSelection(e.target);
    const onHover = (e: any) => handleHover(e.target);
    const onUnhover = (e: any) => handleMouseOut(e.target);

    canvas.on('selection:created', onCreated);
    canvas.on('selection:updated', onUpdated);
    canvas.on('selection:cleared', onCleared);
    canvas.on('object:modified', onModified);
    canvas.on('object:scaling', onScaling);
    canvas.on('mouse:over', onHover);
    canvas.on('mouse:out', onUnhover);

    return () => {
      canvas.off('selection:created', onCreated);
      canvas.off('selection:updated', onUpdated);
      canvas.off('selection:cleared', onCleared);
      canvas.off('object:modified', onModified);
      canvas.off('object:scaling', onScaling);
      canvas.off('mouse:over', onHover);
      canvas.off('mouse:out', onUnhover);
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

  const handleOpacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setOpacity(val);
    if (selectedObject) {
      selectedObject.set({ opacity: parseFloat(val) });
      canvas?.renderAll();
    }
  };

  const handleHoverChange = (e: ChangeEvent<HTMLInputElement>) => {};

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
          <Label>Opacity</Label>
          <Input
            type="number"
            value={opacity}
            id="opacity"
            onChange={handleOpacityChange}
            step={0.1}
            max={1}
            min={0}
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
          <Label>Opacity</Label>
          <Input
            type="number"
            value={opacity}
            id="opacity"
            onChange={handleOpacityChange}
            step={0.1}
            max={1}
            min={0}
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
