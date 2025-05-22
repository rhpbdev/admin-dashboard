// app/editorAccessory/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { accessoryTemplates } from '@/components/lib/accessoryTemplateData';
import CanvasApp from '@/components/canvas/CanvasApp';
import StepTracker from '@/components/StepTracker';

export default function AccessoryEditorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const template = accessoryTemplates.find((t) => t.id === slug);

  const [initialTextValues, setInitialTextValues] = useState<{
    name_of_deceased?: string;
    sunrise_date?: string;
    sunset_date?: string;
  } | null>(null);

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const raw = localStorage.getItem('deceasedInfo');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setInitialTextValues({
          name_of_deceased: parsed.name,
          sunrise_date: parsed.sunrise,
          sunset_date: parsed.sunset
        });
      } catch (e) {
        console.error('Failed to parse localStorage deceasedInfo', e);
      }
    }
  }, []);

  if (!template || !initialTextValues) return null;

  <StepTracker currentStep="accessory" />;
  return <CanvasApp templateData={template} />;
}
