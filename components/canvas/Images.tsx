// components/Images.tsx
'use client';

import React, { useRef, ChangeEvent } from 'react';
import { Canvas as FabricCanvas, Image as FabricImage } from 'fabric';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImagesProps {
  canvas: FabricCanvas | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const Images: React.FC<ImagesProps> = ({ canvas, canvasRef }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas || !canvasRef.current) {
      toast.error('Canvas not ready or no file selected');
      return;
    }

    const canvasEl = canvasRef.current;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;

      try {
        // load as a data-URL → FabricImage
        const img = await FabricImage.fromURL(dataUrl, {
          crossOrigin: 'anonymous'
        });

        // measure the actual <canvas> size
        const cw = canvasEl.width;
        const ch = canvasEl.height;

        // compute scale
        const scale = Math.min(
          cw / (img.width ?? cw),
          ch / (img.height ?? ch),
          1
        );

        // apply scale and position separately
        img.scale(scale);
        img.set({
          left: (cw - img.getScaledWidth()) / 2,
          top: (ch - img.getScaledHeight()) / 2
        });

        // add to Fabric and final render
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();

        toast.success('Image uploaded');
      } catch (err) {
        console.error('Error loading image:', err);
        toast.error('Upload failed');
      }
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <Button
        onClick={openFilePicker}
        variant="ghost"
        className="text-amber-50"
      >
        <ImageIcon />
      </Button>
    </div>
  );
};

export default Images;
