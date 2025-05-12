import type { TPointerEvent } from 'fabric';
import type { FabricObject } from './canvas';

export type ObjectMovingEvent = {
  e: TPointerEvent;
  target: FabricObject;
};
