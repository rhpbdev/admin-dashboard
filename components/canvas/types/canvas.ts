// components/canvas/types/canvas.ts

import type {
  Object as FabricBaseObject,
  Canvas as FabricCanvasClass
} from 'fabric';

/**
 * Represents a snapping guideline.
 * Add additional fields if your snapping system expands.
 */
export type Guideline = {
  x: number;
  y: number;
  // Optionally: type?: 'horizontal' | 'vertical'; color?: string;
};

/**
 * Extends Fabric's base Object to include your custom canvas object properties.
 * The 'name' property is commonly used for custom identification.
 */
export type FabricObject = FabricBaseObject & {
  name?: string;
  // Add any additional custom fields you attach to fabric objects
};

/**
 * Typing for Fabric canvas instance in your app.
 * This keeps your component state and refs strongly typed.
 */
export type FabricCanvas = FabricCanvasClass;
