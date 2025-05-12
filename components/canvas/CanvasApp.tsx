// components/canvas/CanvasApp.tsx
// version: 2.0 — full rewrite with proper resizing and template loading
'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Canvas,
  Textbox,
  Rect,
  Circle,
  Line,
  Image,
  Object as FabricObject,
  IEvent
} from 'fabric';
import { Button } from '@/components/ui/button';
import {
  Circle as CircleIcon,
  Square,
  Type,
  Image as ImageIconLucide,
  LayoutGrid,
  Trash,
  Save as SaveIcon,
  Download as LoadIcon
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useSession } from 'next-auth/react';

import Settings from '@/components/canvas/Settings';
import Images from './Images';
import CanvasSettings from './CanvasSettings';
import StyleEditor from './StyleEditor';
import Templates from './Templates';
import * as snappingHelpers from '@/components/lib/snappingHelpers';

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
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  // Use a ref to always have the latest guidelines array in callbacks
  const guidelinesRef = useRef<Line[]>([]);
  const [guidelines, setGuidelines] = useState<Line[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const { data: session } = useSession();

  // Helper to resize & zoom canvas to fit its container
  const resizeCanvas = () => {
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

  // Initialize Fabric canvas and event listeners
  useEffect(() => {
    if (!canvasRef.current) return;
    const initCanvas = new Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: '#ffffff'
    });
    setCanvas(initCanvas);
    // initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // snapping handlers
    const onObjectMoving = (event: IEvent) => {
      const target = event.target as FabricObject | undefined;
      if (target) {
        snappingHelpers.handleObjectMoving(
          initCanvas,
          target,
          guidelinesRef.current,
          (newGuides) => {
            guidelinesRef.current = newGuides;
            setGuidelines(newGuides);
          }
        );
      }
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
      window.removeEventListener('resize', resizeCanvas);
      initCanvas.off('object:moving', onObjectMoving);
      initCanvas.off('object:modified', onModificationOrMouseUp);
      initCanvas.off('mouse:up', onModificationOrMouseUp);
      initCanvas.dispose();
      setCanvas(null);
    };
  }, []);

  // Load and render templates; re-scale after load
  useEffect(() => {
    if (!canvas) return;

    if (templateData) {
      // 1) raw template dimensions (set before loading JSON)
      if (
        typeof templateData.width === 'number' &&
        typeof templateData.height === 'number'
      ) {
        // Temporarily set dimensions without triggering resize/zoom yet
        canvas.setDimensions(
          {
            width: templateData.width,
            height: templateData.height
          },
          { cssOnly: true }
        ); // Use cssOnly to avoid scaling issues before zoom adjustment
        // Ensure the underlying backing store matches if needed, or rely on loadFromJSON
        canvas.setDimensions(
          {
            width: templateData.width,
            height: templateData.height
          },
          { backstoreOnly: true }
        );
      }
      // 2) background color
      const newBg = templateData.backgroundColor || '#ffffff';
      if (canvas.backgroundColor !== newBg) {
        canvas.backgroundColor = newBg;
        // Need to render if only background color changes and no JSON loads
        canvas.renderAll();
      }

      // 3) Clear existing objects ONLY IF loading new JSON
      // Moved clearing inside the loadFromJSON logic if JSON exists

      // 4) load JSON
      if (templateData.fabricJSON) {
        try {
          // Clear canvas *before* loading new JSON content
          canvas.clear(); // Clear objects, but keep background color/image reference if needed

          // Ensure background color is reapplied if clear removed it (it shouldn't normally)
          canvas.backgroundColor = newBg;

          canvas.loadFromJSON(templateData.fabricJSON, () => {
            // --- Background Image Scaling Logic START ---
            const bgImg = canvas.backgroundImage;

            // Use instanceof fabric.Image for robust type checking
            if (bgImg instanceof Image && bgImg.getElement()) {
              const canvasWidth = canvas.width ?? 0;
              const canvasHeight = canvas.height ?? 0;
              const imgElement = bgImg.getElement(); // HTMLImageElement

              // Use naturalWidth/Height to get original dimensions
              const naturalWidth = imgElement.naturalWidth;
              const naturalHeight = imgElement.naturalHeight;

              // Ensure we have valid dimensions before scaling
              if (
                naturalWidth > 0 &&
                naturalHeight > 0 &&
                canvasWidth > 0 &&
                canvasHeight > 0
              ) {
                // Calculate scale factors to fit canvas exactly (stretching/squashing allowed)
                const scaleX = canvasWidth / naturalWidth;
                const scaleY = canvasHeight / naturalHeight;

                // Apply scaling
                // Reset width/height to natural dimensions before applying scale
                bgImg.set({
                  width: naturalWidth,
                  height: naturalHeight,
                  scaleX: scaleX,
                  scaleY: scaleY,
                  // Ensure it's positioned correctly at top-left
                  originX: 'left',
                  originY: 'top',
                  left: 0,
                  top: 0
                });
                // Optional: Make background unselectable
                // bgImg.selectable = false;
                // bgImg.evented = false;
              } else {
                console.warn(
                  'CanvasApp: Could not get natural dimensions for background image, or canvas dimensions are zero. Background may not scale correctly.'
                );
              }
            } else if (bgImg) {
              // Handle cases where backgroundImage is a color string or other type
              console.log(
                'CanvasApp: Background is not an Image object, skipping scaling.'
              );
            }
            // --- Background Image Scaling Logic END ---

            canvas.renderAll(); // Render canvas AFTER scaling background and loading objects
            // then fit to container (adjusts zoom)
            resizeCanvas();
          });
        } catch (err) {
          console.error('Error loading template JSON:', err);
          toast.error('Failed to load template.');
          // Reset to a known state or clear canvas if loading fails badly
          canvas.clear();
          canvas.backgroundColor = '#ffffff'; // Reset background
          canvas.setDimensions({ width: 500, height: 500 }); // Reset dimensions
          canvas.renderAll();
          resizeCanvas(); // Fit the reset canvas
        }
      } else {
        // No fabricJSON in templateData: clear objects, keep dimensions/bg color, then render/resize
        canvas.getObjects().forEach((o) => canvas.remove(o)); // Clear objects only
        canvas.backgroundImage = undefined; // Remove potential old background image
        canvas.renderAll();
        resizeCanvas();
      }
    } else {
      // No templateData provided: reset to a default blank state
      canvas.clear();
      canvas.setDimensions({ width: 500, height: 500 });
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
      resizeCanvas();
    }
  }, [canvas, templateData]); // Keep dependencies

  // helpers to add shapes/text
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

  // save/load localStorage
  const getSaveKey = () => {
    const id = templateData?.id || 'newDesign';
    return session?.user?.id
      ? `canvas_${session.user.id}_${id}`
      : `anonymous_${id}`;
  };

  const handleSaveCanvas = () => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }
    const json = JSON.stringify(canvas.toJSON(['name']));
    localStorage.setItem(getSaveKey(), json);
    toast.success('Design saved');
  };

  const handleLoadCanvas = () => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }
    const saved = localStorage.getItem(getSaveKey());
    if (saved) {
      canvas.loadFromJSON(saved, () => {
        canvas.renderAll();
        resizeCanvas();
        toast.success('Design loaded');
      });
    } else {
      toast.info('No saved design found');
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
          <Square className="" />
        </Button>
        <Button onClick={addCircle} variant="ghost" className="text-amber-50">
          <CircleIcon />
        </Button>
        <Button onClick={addText} variant="ghost" className="text-amber-50">
          <Type />
        </Button>
        <Images canvas={canvas} canvasRef={canvasRef} />
        {/* <Video
					canvas={canvas}
					canvasRef={canvasRef}
				/> */}
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
        <div className="flex flex-col space-y-2">
          <Button onClick={handleSaveCanvas} variant="outline" title="Save">
            <SaveIcon className="mr-1 h-4 w-4" /> Save
          </Button>
          <Button onClick={handleLoadCanvas} variant="outline" title="Load">
            <LoadIcon className="mr-1 h-4 w-4" /> Load
          </Button>
        </div>
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
