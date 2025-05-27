import { Circle } from 'fabric';
import { CanvasProp } from './types/canvas';
import { Button } from '../ui/button';
import { CircleIcon } from 'lucide-react';

const AddCircle = ({ canvas }: CanvasProp) => {
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
  return (
    <Button onClick={addCircle} variant="ghost" className="text-amber-50">
      <CircleIcon />
    </Button>
  );
};

export default AddCircle;
