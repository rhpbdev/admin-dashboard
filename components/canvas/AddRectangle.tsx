import { Button } from '../ui/button';
import { CanvasProp } from './types/canvas';
import { Rect } from 'fabric';
import { Square } from 'lucide-react';

const AddRectangle = ({ canvas }: CanvasProp) => {
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
  return (
    <Button onClick={addRectangle} variant="ghost" className="text-amber-50">
      <Square />
    </Button>
  );
};

export default AddRectangle;
