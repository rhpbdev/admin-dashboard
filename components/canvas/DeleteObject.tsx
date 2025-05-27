import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import { CanvasProp } from './types/canvas';

const DeleteObject = ({ canvas }: CanvasProp) => {
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
  return (
    <Button
      onClick={deleteSelectedObject}
      variant="ghost"
      className="text-amber-50"
    >
      <Trash />
    </Button>
  );
};

export default DeleteObject;
