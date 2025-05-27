// components/canvas/types/canvas.ts

import type {
  Object as FabricBaseObject,
  Canvas as FabricCanvasClass,
  Canvas
} from 'fabric';

export interface CanvasProp {
  canvas: Canvas | null;
}

/**
 * Represents a snapping guideline.
 */
export type Guideline = {
  x: number;
  y: number;
};

/**
 * Extends Fabric's base Object to include your custom canvas object properties.
 */
export type FabricObject = FabricBaseObject & {
  name?: string;
};

/**
 * Typing for Fabric canvas instance in your app.
 */
export type FabricCanvas = FabricCanvasClass;

/**
 * Editor flow step types for the multi-step design process.
 */
export type EditorStep = 'program' | 'accessory' | 'review' | 'finalize';

/**
 * Template metadata used for program/accessory designs.
 */
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
  flipBackgroundOnInside?: boolean;
  accessoryType?: string; // Added this since you're using it for accessories
}

export interface AccessoryTemplateType {
  id?: string;
  name?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fabricJSON?: string;
  outsideJSON?: string;
  insideJSON?: string;
  style?: string;
  flipBackgroundOnInside?: boolean;
  accessoryType?: string;
}

/**
 * Valid sides of a two-sided canvas template.
 */
export type ViewSide = 'outside' | 'inside';

/**
 * User input mapped to canvas text/image objects.
 */
export interface CanvasTextValues {
  name_of_deceased?: string;
  sunrise_date?: string;
  sunset_date?: string;
  service_date?: string;
  deceased_cover_photo?: string;
  [key: string]: string | undefined;
}

/**
 * Props passed into the CanvasApp component.
 */
export interface CanvasAppProps {
  templateData?: YourSpecificTemplateType | null;
  initialTextValues?: CanvasTextValues;
  viewSide?: ViewSide;
}
