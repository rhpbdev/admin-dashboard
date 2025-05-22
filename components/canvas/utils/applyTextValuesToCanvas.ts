// utils/applyTextValuesToCanvas.ts
import { Textbox } from 'fabric';
import type { FabricCanvas } from '@/components/canvas/types/canvas';

interface InitialTextValues {
  [key: string]: string | undefined;
}

export function applyTextValuesToCanvas(
  canvas: FabricCanvas,
  values: InitialTextValues
) {
  if (!canvas || !values) return;

  canvas.getObjects().forEach((obj) => {
    if (obj.type === 'textbox') {
      const name = (obj as any).name;
      if (name && typeof values[name] === 'string') {
        (obj as Textbox).set({ text: values[name] || '' });
      }
    }
  });

  canvas.requestRenderAll();
}
