// hooks/useDeceasedCoverPhoto.ts
import { useEffect, useState } from 'react';
import { Canvas as FabricCanvas } from 'fabric';

export function useDeceasedCoverPhoto(canvas: FabricCanvas | null) {
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  // Load image from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('deceasedInfo');
    if (!saved || !canvas) return;

    try {
      const { coverPhoto: savedPhoto } = JSON.parse(saved);
      if (!savedPhoto) return;

      const imageObject = canvas
        .getObjects()
        .find(
          (obj) =>
            obj.type === 'image' && (obj as any).name === 'deceased_cover_photo'
        ) as any;

      if (!imageObject) return;

      const imgElement = new Image();
      imgElement.crossOrigin = 'anonymous';
      imgElement.onload = () => {
        imageObject.setElement(imgElement);
        canvas.requestRenderAll();
      };
      imgElement.src = savedPhoto;

      setCoverPhoto(savedPhoto);
    } catch (err) {
      console.warn('Failed to restore cover photo:', err);
    }
  }, [canvas]);

  // Upload handler
  const handleCoverPhotoUpload = (file: File) => {
    if (!canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      console.log('FileReader event:', event);

      const dataUrl = event.target?.result as string;
      console.log('Generated dataUrl:', dataUrl);

      if (!dataUrl) {
        console.warn('Failed to read file as Data URL.');
        return;
      }

      setCoverPhoto(dataUrl);

      const saved = JSON.parse(localStorage.getItem('deceasedInfo') || '{}');
      localStorage.setItem(
        'deceasedInfo',
        JSON.stringify({ ...saved, coverPhoto: dataUrl })
      );

      const imageObject = canvas
        ?.getObjects()
        .find(
          (obj) =>
            obj.type === 'image' && (obj as any).name === 'deceased_cover_photo'
        ) as any;

      if (!imageObject) {
        console.warn('deceased_cover_photo image not found');
        return;
      }

      const imgElement = new Image();
      imgElement.crossOrigin = 'anonymous';
      imgElement.onload = () => {
        imageObject.setElement(imgElement);
        canvas.requestRenderAll();
      };
      imgElement.src = dataUrl;
    };

    reader.readAsDataURL(file);
  };

  return { coverPhoto, handleCoverPhotoUpload };
}
