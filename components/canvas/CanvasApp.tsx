'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, Textbox, Rect, Circle, Image as FabricImage } from 'fabric';

import { Button } from '@/components/ui/button';
import {
  Circle as CircleIcon,
  Square,
  Type,
  LayoutGrid,
  Trash
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useSession } from 'next-auth/react';

import Settings from '@/components/canvas/Settings';
import Images from './Images';
import CanvasSettings from './CanvasSettings';
import StyleEditor from './StyleEditor';
import Templates from './Templates';
import * as snappingHelpers from '@/components/lib/snappingHelpers';
import SaveLoad from '@/components/canvas/SaveLoad';
import type { FabricObject, Guideline } from '@/components/canvas/types/canvas';
import type { ObjectMovingEvent } from '@/components/canvas/types/events';
import { customFontMap } from './utils/fonts';
import Inputs from './Inputs';
import { applyTextValuesToCanvas } from './utils/applyTextValuesToCanvas';

export interface YourSpecificTemplateType {
  id?: string;
  name?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fabricJSON?: string;
  outsideJSON?: string;
  insideJSON?: string;
  style?: string;
}

type ViewSide = 'outside' | 'inside';

interface CanvasAppProps {
  templateData?: YourSpecificTemplateType | null;
  initialTextValues?: {
    name_of_deceased?: string;
    sunrise_date?: string;
    sunset_date?: string;
    service_date?: string;
    deceased_cover_photo?: string;
  };
  viewSide?: ViewSide;
}

export default function CanvasApp({
  templateData,
  initialTextValues,
  viewSide
}: CanvasAppProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const guidelinesRef = useRef<Guideline[]>([]);
  const [guidelines, setGuidelines] = useState<Guideline[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const { data: session } = useSession();

  const resizeCanvasAction = () => {
    if (!canvasRef.current || !canvas) return;
    const wrapper = canvasRef.current.parentElement;
    if (!wrapper) return;

    const origWidth = canvas.getWidth();
    const rawScale = wrapper.clientWidth / origWidth;
    const scale = Math.min(1, rawScale);

    canvas.setZoom(scale);
    canvas.setDimensions(
      { width: origWidth * scale, height: canvas.getHeight() * scale },
      { backstoreOnly: false }
    );
    canvas.calcOffset();
    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const initCanvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: '#ffffff'
    });
    setCanvas(initCanvas);
    resizeCanvasAction();
    window.addEventListener('resize', resizeCanvasAction);

    const onObjectMoving = (event: ObjectMovingEvent) => {
      const target = event.target;
      snappingHelpers.handleObjectMoving(
        initCanvas,
        target,
        guidelinesRef.current,
        (newGuides: Guideline[]) => {
          guidelinesRef.current = newGuides;
          setGuidelines(newGuides);
        }
      );
    };

    const onModificationOrMouseUp = () => {
      snappingHelpers.clearGuidelines(initCanvas);
      guidelinesRef.current = [];
      setGuidelines([]);
    };

    initCanvas.on('object:moving', onObjectMoving);
    initCanvas.on('object:modified', onModificationOrMouseUp);
    initCanvas.on('mouse:up', onModificationOrMouseUp);

    return () => {
      window.removeEventListener('resize', resizeCanvasAction);
      initCanvas.off('object:moving', onObjectMoving);
      initCanvas.off('object:modified', onModificationOrMouseUp);
      initCanvas.off('mouse:up', onModificationOrMouseUp);
      initCanvas.dispose();
      setCanvas(null);
    };
  }, []);

  useEffect(() => {
    if (!canvas || !initialTextValues) return;
    applyTextValuesToCanvas(canvas, initialTextValues);
  }, [canvas, initialTextValues]);

  useEffect(() => {
    if (!canvas) return;

    const loadTemplate = async () => {
      if (!templateData) return;

      const { width, height } = templateData;
      if (typeof width === 'number' && typeof height === 'number') {
        canvas.setDimensions({ width, height }, { cssOnly: true });
        canvas.setDimensions({ width, height }, { backstoreOnly: true });
      }

      const newBg = templateData.backgroundColor || '#ffffff';
      canvas.backgroundColor = newBg;
      canvas.renderAll();

      const sideJSON =
        viewSide === 'inside'
          ? templateData?.insideJSON
          : templateData?.outsideJSON || templateData?.fabricJSON;

      if (!sideJSON) {
        canvas.clear();
        canvas.backgroundImage = undefined;
        canvas.renderAll();
        resizeCanvasAction();
        return;
      }

      try {
        canvas.clear();
        canvas.backgroundColor = newBg;

        const cleanedJSON = sideJSON.replaceAll('http://localhost:3000', '');
        const parsed = JSON.parse(cleanedJSON);
        const bgImageInfo = parsed.backgroundImage;
        delete parsed.backgroundImage;

        const fonts = new Set<string>();
        parsed.objects?.forEach((obj: any) => {
          if (obj.fontFamily && customFontMap[obj.fontFamily]) {
            fonts.add(obj.fontFamily);
          }
        });

        await Promise.all(
          Array.from(fonts).map(async (fontName) => {
            const fontFace = new FontFace(
              fontName,
              `url(${customFontMap[fontName]})`
            );
            await fontFace.load();
            document.fonts.add(fontFace);
          })
        );

        canvas.loadFromJSON(parsed, () => {
          if (bgImageInfo?.src) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = bgImageInfo.src;
            img.onload = () => {
              const fabricImg = new FabricImage(img, {
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0
              });

              const scale = Math.max(
                canvas.width! / img.naturalWidth,
                canvas.height! / img.naturalHeight
              );

              fabricImg.set({
                scaleX: scale,
                scaleY: scale
              });

              canvas.set('backgroundImage', fabricImg);
              canvas.renderAll();

              requestAnimationFrame(() => {
                resizeCanvasAction();
                if (initialTextValues) {
                  applyTextValuesToCanvas(canvas, initialTextValues);
                }
                if (initialTextValues?.deceased_cover_photo) {
                  const imgObj = canvas
                    .getObjects()
                    .find(
                      (obj) =>
                        obj.type === 'image' &&
                        (obj as any).name === 'deceased_cover_photo'
                    ) as any;

                  if (imgObj) {
                    const imgElement = new Image();
                    imgElement.crossOrigin = 'anonymous';
                    imgElement.onload = () => {
                      imgObj.setElement(imgElement);
                      canvas.requestRenderAll();
                    };
                    imgElement.src = initialTextValues.deceased_cover_photo;
                  }
                }
                canvas.requestRenderAll();
              });
            };
            img.onerror = () => {
              console.warn('Background image failed to load:', bgImageInfo.src);
              canvas.renderAll();
            };
          } else {
            canvas.renderAll();
          }
        });
      } catch (err) {
        console.error('Error loading template JSON:', err);
        toast.error('Failed to load template.');
        canvas.clear();
        canvas.backgroundColor = '#ffffff';
        canvas.setDimensions({ width: 500, height: 500 });
        canvas.renderAll();
        resizeCanvasAction();
      }
    };

    loadTemplate();
  }, [canvas, templateData, initialTextValues]);

  const addRectangle = () => {
    if (!canvas) return;
    const rect = new Rect({
      top: 100,
      left: 50,
      width: 100,
      height: 60,
      fill: '#D84D42'
    });
    canvas.add(rect);
    canvas.requestRenderAll();
  };

  const addCircle = () => {
    if (!canvas) return;
    const circle = new Circle({
      top: 150,
      left: 150,
      radius: 50,
      fill: '#0000FF'
    });
    canvas.add(circle);
    canvas.requestRenderAll();
  };

  const addText = () => {
    if (!canvas) return;
    const textbox = new Textbox('New Text', {
      left: 100,
      top: 100,
      fill: '#D84D42',
      width: 200,
      minWidth: 50
    });
    const resizeText = () => {
      const rawWidth = textbox.calcTextWidth();
      const newW = Math.max(50, rawWidth + 10);
      textbox.set({ width: newW });
      textbox.setCoords();
      canvas.requestRenderAll();
    };
    textbox.on('changed', resizeText);
    textbox.on('editing:exited', resizeText);
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    textbox.enterEditing();
  };

  const deleteSelectedObject = () => {
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (obj) {
      canvas.remove(obj);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    } else {
      toast.error('No object selected');
    }
  };

  return (
    <div className="App">
      <div className="flex flex-col gap-2 bg-[#333] p-2 rounded fixed top-1/2 -translate-y-1/2 left-4 empty:hidden z-50">
        <div className="grid grid-cols-3">
          <Button
            onClick={addRectangle}
            variant="ghost"
            className="text-amber-50"
          >
            <Square />
          </Button>
          <Button onClick={addCircle} variant="ghost" className="text-amber-50">
            <CircleIcon />
          </Button>
          <Button onClick={addText} variant="ghost" className="text-amber-50">
            <Type />
          </Button>
          <Images canvas={canvas} canvasRef={canvasRef} />
          <Button
            onClick={() => setShowTemplates(!showTemplates)}
            variant="ghost"
            className="text-amber-50"
          >
            <LayoutGrid />
          </Button>
          <Button
            onClick={deleteSelectedObject}
            variant="ghost"
            className="text-amber-50"
          >
            <Trash />
          </Button>
        </div>
        <SaveLoad
          canvas={canvas}
          session={session}
          templateId={templateData?.id}
          resizeCanvasAction={resizeCanvasAction}
        />
        <Inputs canvas={canvas} />
      </div>

      <div className="flex-grow flex justify-center items-center p-4">
        <canvas ref={canvasRef} id="canvas" />
      </div>

      {showTemplates && (
        <Templates canvas={canvas} onClose={() => setShowTemplates(false)} />
      )}
      <Settings canvas={canvas} />
      <CanvasSettings canvas={canvas} />
      <StyleEditor canvas={canvas} />
      <Toaster />
    </div>
  );
}
