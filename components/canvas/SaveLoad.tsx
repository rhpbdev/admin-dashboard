'use client';

import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Save as SaveIcon, Download as LoadIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { Canvas } from 'fabric';

interface SaveLoadProps {
  canvas: Canvas | null;
  session: { user?: { id?: string } } | null;
  templateId?: string;
  resizeCanvas: () => void;
  autoSave?: boolean;
  debounceDelay?: number;
}

export default function SaveLoad({
  canvas,
  session,
  templateId,
  resizeCanvas
}: SaveLoadProps) {
  // Get unique key for localStorage
  const getSaveKey = useCallback(() => {
    const id = templateId ?? 'newDesign';
    return session?.user?.id
      ? `canvas_${session.user.id}_${id}`
      : `anonymous_${id}`;
  }, [session, templateId]);

  // Safe localStorage getter
  const safeGetItem = useCallback((key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }, []);

  // Safe localStorage setter
  const safeSetItem = useCallback((key: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      toast.error('Unable to save to localStorage.');
    }
  }, []);

  // Save canvas state
  const handleSaveCanvas = useCallback(() => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }
    const json = JSON.stringify(canvas.toJSON());
    localStorage.setItem(getSaveKey(), json);

    safeSetItem(getSaveKey(), json);
    toast.success('Design saved');
  }, [canvas, getSaveKey, safeSetItem]);

  // Load canvas state
  const handleLoadCanvas = useCallback(() => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }
    const saved = safeGetItem(getSaveKey());
    if (saved) {
      canvas.loadFromJSON(saved, () => {
        canvas.renderAll();
        resizeCanvas();
        toast.success('Design loaded');
      });
    } else {
      toast.info('No saved design found');
    }
  }, [canvas, getSaveKey, resizeCanvas, safeGetItem]);

  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={handleSaveCanvas} variant="outline" title="Save">
        <SaveIcon className="" />
      </Button>
      <Button onClick={handleLoadCanvas} variant="outline" title="Load">
        <LoadIcon className="" />
      </Button>
    </div>
  );
}
