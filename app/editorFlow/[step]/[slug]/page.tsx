// app/editorFlow/[step]/[slug]/page.tsx
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import StepTracker from '@/components/StepTracker';
import CanvasApp from '@/components/canvas/CanvasApp';
import { sampleProgramTemplates } from '@/components/lib/sampleTemplateData';
import { accessoryTemplates } from '@/components/lib/accessoryTemplateData';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useDeceasedInfo } from 'hooks/useDeceasedInfo';

export interface YourSpecificTemplateType {
  id?: string;
  name?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  fabricJSON?: string;
  outsideJSON?: string;
  insideJSON?: string;
  style?: string;
}

export default function EditorFlowPage() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();

  const step = params.step as 'program' | 'accessory' | 'finalize';
  const slug = params.slug as string;

  const size = search.get('size') ?? '';
  const accessory = search.get('accessory') ?? '';
  const product = search.get('product') ?? slug;

  const templates =
    step === 'accessory' ? accessoryTemplates : sampleProgramTemplates;

  const style = search.get('style') ?? '';

  let template: YourSpecificTemplateType | undefined;

  if (step === 'accessory') {
    template = accessoryTemplates.find((t) => t.style === style);
  } else {
    template = sampleProgramTemplates.find((t) => t.id === slug);
  }

  const [viewSide, setViewSide] = useState<'outside' | 'inside'>('outside');

  const handleNextStep = () => {
    if (step === 'program') {
      router.push(
        `/editorFlow/accessory/${accessory}?size=${size}&product=${slug}&style=${template?.style}`
      );
    } else if (step === 'accessory') {
      router.push(
        `/editorFlow/finalize/${product}?size=${size}&accessory=${template?.id}`
      );
    }
  };

  if (!template) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Template Not Found</h2>
      </div>
    );
  }

  const { getCanvasValues } = useDeceasedInfo();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {step === 'program' && (
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={viewSide === 'outside' ? 'default' : 'outline'}
            onClick={() => setViewSide('outside')}
          >
            Outside
          </Button>
          <Button
            variant={viewSide === 'inside' ? 'default' : 'outline'}
            onClick={() => setViewSide('inside')}
          >
            Inside
          </Button>
        </div>
      )}
      {/* <p className="text-sm text-gray-500 text-center mb-4">
        Currently Editing:{' '}
        {viewSide === 'outside' ? 'Front (Outside)' : 'Back (Inside)'}
      </p> */}
      <CanvasApp
        templateData={template}
        initialTextValues={getCanvasValues()}
        viewSide={viewSide}
      />

      {step !== 'finalize' && (
        <div className="flex justify-center mt-6">
          <Button size="lg" onClick={handleNextStep}>
            {step === 'program'
              ? 'Approve Program Design'
              : 'Approve Accessory Design'}
          </Button>
        </div>
      )}
    </div>
  );
}
