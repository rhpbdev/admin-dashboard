import { Gradient } from 'fabric';

export const goldGradient = new Gradient({
  type: 'linear',
  gradientUnits: 'pixels',
  coords: { x1: 0, y1: 0, x2: 375, y2: 0 },
  colorStops: [
    { offset: 0, color: 'rgb(180,137,13)' },
    { offset: 0.25, color: 'rgb(240,224,132)' },
    { offset: 0.5, color: 'rgb(181,137,13)' },
    { offset: 0.75, color: 'rgb(240,224,132)' },
    { offset: 1, color: 'rgb(180,137,13)' }
  ]
});
