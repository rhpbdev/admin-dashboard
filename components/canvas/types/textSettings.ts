// components/canvas/types/textSettings.ts

import type { Canvas as FabricCanvas, Textbox } from 'fabric';

export interface TextSettingsProps {
  canvas: FabricCanvas | null;
  selectedObject: Textbox | null;
}
