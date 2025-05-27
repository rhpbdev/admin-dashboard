// components/canvas/CanvasApp.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, Textbox, Rect, Circle, Image as FabricImage } from 'fabric';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useSession } from 'next-auth/react';
import Settings from '@/components/canvas/Settings';
import Images from './Images';
import CanvasSettings from './CanvasSettings';
import StyleEditor from './StyleEditor';
import Templates from './Templates';
import * as snappingHelpers from '@/components/lib/snappingHelpers';
import SaveLoad from '@/components/canvas/SaveLoad';
import type { ObjectMovingEvent } from '@/components/canvas/types/events';
import { customFontMap } from './utils/fonts';
import Inputs from './Inputs';
import { applyTextValuesToCanvas } from './utils/applyTextValuesToCanvas';
import { CanvasAppProps, Guideline } from '@/components/canvas/types/canvas';
import DeleteObject from './DeleteObject';
import AddText from './AddText';
import AddCircle from './AddCircle';
import AddRectangle from './AddRectangle';

// Debug flag - set to false in production
const DEBUG = true;

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

  const log = (message: string, data?: any) => {
    if (DEBUG) {
      console.log(`[CanvasApp] ${message}`, data || '');
    }
  };

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

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    log('Initializing canvas');
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

  // Apply initial text values
  useEffect(() => {
    if (!canvas || !initialTextValues) return;
    log('Applying initial text values', initialTextValues);
    applyTextValuesToCanvas(canvas, initialTextValues);
  }, [canvas, initialTextValues]);

  // Load template
  useEffect(() => {
    if (!canvas) return;

    const loadTemplate = async () => {
      if (!templateData) {
        log('No template data provided');
        return;
      }

      log('Loading template', {
        templateId: templateData.id,
        viewSide,
        hasInsideJSON: !!templateData.insideJSON,
        hasOutsideJSON: !!templateData.outsideJSON
      });

      // Set canvas dimensions
      const { width, height } = templateData;
      if (typeof width === 'number' && typeof height === 'number') {
        canvas.setDimensions({ width, height }, { cssOnly: true });
        canvas.setDimensions({ width, height }, { backstoreOnly: true });
        log('Set canvas dimensions', { width, height });
      }

      // Set initial background color from template
      const templateBgColor = templateData.backgroundColor || '#ffffff';
      canvas.backgroundColor = templateBgColor;
      log('Set initial background color from template', templateBgColor);
      canvas.renderAll();

      // Get the appropriate JSON for the current side
      const sideJSON =
        viewSide === 'inside'
          ? templateData?.insideJSON
          : templateData?.outsideJSON || templateData?.fabricJSON;

      if (!sideJSON) {
        log('No JSON data for side', viewSide);
        canvas.clear();
        canvas.backgroundImage = undefined;
        canvas.backgroundColor = templateBgColor;
        canvas.renderAll();
        resizeCanvasAction();
        return;
      }

      try {
        // Clear canvas first - including any background image
        canvas.clear();
        canvas.set('backgroundImage', null);
        canvas.backgroundImage = undefined;
        canvas.backgroundColor = templateBgColor;
        log('Cleared canvas completely, set background to', templateBgColor);

        // Parse JSON
        const cleanedJSON = sideJSON.replaceAll('http://localhost:3000', '');
        const parsed = JSON.parse(cleanedJSON);

        log('Parsed JSON', {
          hasBackgroundImage: !!parsed.backgroundImage,
          backgroundImageSrc: parsed.backgroundImage?.src,
          backgroundColor: parsed.backgroundColor,
          objectCount: parsed.objects?.length
        });

        // Store background info before deleting
        const bgImageInfo = parsed.backgroundImage;
        const parsedBgColor = parsed.backgroundColor;

        // Remove backgroundImage from parsed data before loading
        delete parsed.backgroundImage;
        // Also remove backgroundColor to prevent it from overriding our set value
        delete parsed.backgroundColor;

        // Load custom fonts
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

        // Load objects from JSON
        canvas.loadFromJSON(parsed, () => {
          log('Canvas loadFromJSON complete');

          // Set background color - prioritize parsed color, then template color
          const finalBgColor = parsedBgColor || templateBgColor;
          canvas.backgroundColor = finalBgColor;
          log('Set final background color', {
            parsedBgColor,
            templateBgColor,
            finalBgColor,
            currentBgColor: canvas.backgroundColor
          });

          // Handle background image
          if (bgImageInfo?.src) {
            log('Loading background image', bgImageInfo.src);
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = bgImageInfo.src;
            img.onload = () => {
              const fabricImg = new FabricImage(img, {
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0,
                flipX:
                  templateData?.flipBackgroundOnInside && viewSide === 'inside'
              });

              const scale = Math.max(
                canvas.width! / img.naturalWidth,
                canvas.height! / img.naturalHeight
              );

              fabricImg.set({
                scaleX: scale,
                scaleY: scale
              });

              (fabricImg as any).name = 'background';
              canvas.backgroundImage = fabricImg;

              // Preserve background color when setting background image
              canvas.backgroundColor = finalBgColor;
              log(
                'Background image loaded and set, preserved background color',
                finalBgColor
              );

              canvas.renderAll();

              // Apply text values after background image loads
              requestAnimationFrame(() => {
                resizeCanvasAction();
                applyTextValuesAndImages();
              });
            };
            img.onerror = () => {
              console.warn('Background image failed to load:', bgImageInfo.src);
              canvas.renderAll();
              requestAnimationFrame(() => {
                resizeCanvasAction();
                applyTextValuesAndImages();
              });
            };
          } else if (bgImageInfo === null || !bgImageInfo) {
            // Explicitly clear background image when it's null or undefined
            log('Clearing background image (bgImageInfo is null/undefined)');
            canvas.set('backgroundImage', null);
            canvas.backgroundImage = undefined;

            // Re-apply background color after clearing image
            const finalBgColor = parsedBgColor || templateBgColor || '#FFFFFF';
            canvas.set('backgroundColor', finalBgColor);
            canvas.backgroundColor = finalBgColor;
            log('Set background color after clearing image', {
              finalBgColor,
              canvasBackgroundColor: canvas.backgroundColor,
              canvasGetBackgroundColor: canvas.get('backgroundColor')
            });

            // Force render with background color
            canvas.renderAll();

            // Also set the background color on the canvas element itself
            if (canvas.getElement()) {
              canvas.getElement().style.backgroundColor = finalBgColor;
            }

            log(
              'Canvas rendered with background color',
              canvas.get('backgroundColor')
            );

            requestAnimationFrame(() => {
              resizeCanvasAction();
              applyTextValuesAndImages();
              // Double-check background color after render
              log(
                'Background color after render',
                canvas.get('backgroundColor')
              );
            });
          } else {
            // No background image
            log('No background image, clearing any existing');
            canvas.backgroundImage = undefined;

            // Force render with background color
            canvas.renderAll();
            log(
              'Canvas rendered with background color',
              canvas.backgroundColor
            );

            requestAnimationFrame(() => {
              resizeCanvasAction();
              applyTextValuesAndImages();
              // Double-check background color after render
              log('Background color after render', canvas.backgroundColor);
            });
          }

          // Helper function to apply text values and update images
          function applyTextValuesAndImages() {
            // Add null check at the beginning of the function
            if (!canvas) {
              log(
                'Canvas is null, skipping text values and images application'
              );
              return;
            }

            log('Applying text values and images');

            // Store the current background color before any operations
            const currentBgColor =
              canvas.backgroundColor ||
              parsedBgColor ||
              templateBgColor ||
              '#FFFFFF';

            if (initialTextValues && canvas) {
              applyTextValuesToCanvas(canvas, initialTextValues);

              if (initialTextValues.deceased_cover_photo) {
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
                    // Add null check here too since this is an async callback
                    if (!canvas) return;

                    imgObj.setElement(imgElement);
                    // Restore background color after image operations
                    canvas.backgroundColor = currentBgColor;
                    canvas.requestRenderAll();
                  };
                  imgElement.src = initialTextValues.deceased_cover_photo;
                }
              }
            }

            // Ensure background color is preserved after all operations
            canvas.backgroundColor = currentBgColor;

            canvas.requestRenderAll();
            // Final background color check with more details
            log('Final background color check', {
              backgroundColor: canvas.get('backgroundColor'),
              backgroundColorDirect: canvas.backgroundColor,
              backgroundImage: !!canvas.backgroundImage,
              backgroundImageType: canvas.backgroundImage
                ? canvas.backgroundImage.type
                : 'none',
              canvasElement: canvas.getElement().style.backgroundColor,
              preservedBgColor: currentBgColor
            });
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
  }, [canvas, templateData, viewSide]);

  return (
    <div className="App">
      <div className="flex flex-col gap-2 bg-[#333] p-2 rounded fixed top-1/2 -translate-y-1/2 left-4 empty:hidden z-50">
        <div className="grid grid-cols-3">
          <AddRectangle canvas={canvas} />
          <AddCircle canvas={canvas} />
          <AddText canvas={canvas} />
          <Images canvas={canvas} canvasRef={canvasRef} />
          <Button
            onClick={() => setShowTemplates(!showTemplates)}
            variant="ghost"
            className="text-amber-50"
          >
            <LayoutGrid />
          </Button>
          <DeleteObject canvas={canvas} />
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
