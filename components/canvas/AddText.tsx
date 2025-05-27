import { CanvasProp } from './types/canvas';
import { Textbox } from 'fabric';
import { Button } from '../ui/button';
import { Type } from 'lucide-react';

const AddText = ({ canvas }: CanvasProp) => {
  const addText = () => {
    if (!canvas) return;
    const textbox = new Textbox('New Text', {
      left: 100,
      top: 100,
      fill: '#D84D42',
      width: 200,
      minWidth: 50
    });
    const resizeText = () => {
      const rawWidth = textbox.calcTextWidth();
      const newW = Math.max(50, rawWidth + 10);
      textbox.set({ width: newW });
      textbox.setCoords();
      canvas.requestRenderAll();
    };
    textbox.on('changed', resizeText);
    textbox.on('editing:exited', resizeText);
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    textbox.enterEditing();
  };
  return (
    <Button onClick={addText} variant="ghost" className="text-amber-50">
      <Type />
    </Button>
  );
};

export default AddText;
