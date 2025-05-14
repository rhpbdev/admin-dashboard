'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Canvas as FabricCanvasClass,
  Textbox,
  Rect,
  Circle,
  Image as FabricImage
} from 'fabric';
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
import type {
  FabricObject,
  Guideline,
  FabricCanvas
} from '@/components/canvas/types/canvas';
import type { ObjectMovingEvent } from '@/components/canvas/types/events';
import { customFontMap } from './utils/fonts';

export interface YourSpecificTemplateType {
  id?: string;
  name?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fabricJSON?: string;
}

interface CanvasAppProps {
  templateData?: YourSpecificTemplateType | null;
}

export default function CanvasApp({ templateData }: CanvasAppProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
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
    const initCanvas = new FabricCanvasClass(canvasRef.current, {
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
    if (!canvas) return;

    const loadTemplate = async () => {
      if (templateData) {
        if (
          typeof templateData.width === 'number' &&
          typeof templateData.height === 'number'
        ) {
          canvas.setDimensions(
            { width: templateData.width, height: templateData.height },
            { cssOnly: true }
          );
          canvas.setDimensions(
            { width: templateData.width, height: templateData.height },
            { backstoreOnly: true }
          );
        }

        const newBg = templateData.backgroundColor || '#ffffff';
        canvas.backgroundColor = newBg;
        canvas.renderAll();

        if (templateData.fabricJSON) {
          try {
            canvas.clear();
            canvas.backgroundColor = newBg;

            const cleanedJSON = templateData.fabricJSON.replaceAll(
              'http://localhost:3000',
              ''
            );

            // ✅ FontFace preload before loadFromJSON
            const fonts = new Set<string>();
            JSON.parse(cleanedJSON).objects?.forEach((obj: any) => {
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

            canvas.loadFromJSON(cleanedJSON, () => {
              const bgImg = canvas.backgroundImage;
              if (bgImg instanceof FabricImage) {
                const imgElement = bgImg.getElement();
                if (imgElement instanceof HTMLImageElement) {
                  const canvasWidth = canvas.width ?? 0;
                  const canvasHeight = canvas.height ?? 0;
                  const naturalWidth = imgElement.naturalWidth;
                  const naturalHeight = imgElement.naturalHeight;

                  if (
                    naturalWidth > 0 &&
                    naturalHeight > 0 &&
                    canvasWidth > 0 &&
                    canvasHeight > 0
                  ) {
                    const scaleX = canvasWidth / naturalWidth;
                    const scaleY = canvasHeight / naturalHeight;

                    bgImg.set({
                      width: naturalWidth,
                      height: naturalHeight,
                      scaleX,
                      scaleY,
                      originX: 'left',
                      originY: 'top',
                      left: 0,
                      top: 0
                    });
                  }
                }
              }

              // ✅ First pass fix
              canvas.getObjects().forEach((obj) => {
                if (obj.type === 'textbox') {
                  // const textbox = obj as fabric.Textbox;
                  // const minWidth = 50;
                  // const textWidth = textbox.calcTextWidth();
                  // const newWidth = Math.max(minWidth, textWidth + 10);
                  // textbox.set({ width: newWidth });
                  // textbox.setCoords();
                }
              });

              canvas.renderAll();

              // ✅ Double pass after fonts applied
              requestAnimationFrame(() => {
                canvas.getObjects().forEach((obj) => {
                  if (obj.type === 'textbox') {
                    // const textbox = obj as fabric.Textbox;
                    // const minWidth = 50;
                    // const textWidth = textbox.calcTextWidth();
                    // const newWidth = Math.max(minWidth, textWidth + 10);
                    // textbox.set({ width: newWidth });
                    // textbox.setCoords();
                  }
                });

                canvas.requestRenderAll();
                requestAnimationFrame(() => {
                  resizeCanvasAction();
                  canvas.requestRenderAll();
                });
              });
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
        } else {
          canvas.getObjects().forEach((o) => canvas.remove(o));
          canvas.backgroundImage = undefined;
          canvas.renderAll();
          resizeCanvasAction();
        }
      } else {
        canvas.clear();
        canvas.setDimensions({ width: 500, height: 500 });
        canvas.backgroundColor = '#ffffff';
        canvas.renderAll();
        resizeCanvasAction();
      }
    };

    loadTemplate();
  }, [canvas, templateData]);

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
      <div className="toolbar">
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
        <SaveLoad
          canvas={canvas}
          session={session}
          templateId={templateData?.id}
          resizeCanvasAction={resizeCanvasAction}
        />
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
