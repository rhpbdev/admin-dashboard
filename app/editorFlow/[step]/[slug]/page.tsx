// editorFlow/[step]/[slug]/page.tsx
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import CanvasApp from '@/components/canvas/CanvasApp';
import { sampleProgramTemplates } from '@/components/lib/sampleTemplateData';
import { accessoryTemplates } from '@/components/lib/accessoryTemplateData';
import { Button } from '@/components/ui/button';
import { useDeceasedInfoContext } from 'context/DeceasedInfoContext';
import { EditorStep } from '@/components/canvas/types/canvas';

export default function EditorFlowPage() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();

  const step = params.step as string;
  const slug = params.slug as string;

  const size = search.get('size') ?? '';
  const accessoriesParam = search.get('accessories') ?? '';
  const accessories = accessoriesParam ? accessoriesParam.split(',') : [];
  const product = search.get('product') ?? slug;
  const style = search.get('style') ?? '';
  const currentAccessoryIndex = parseInt(search.get('accessoryIndex') ?? '0');

  console.log('Debug - Current params:', {
    step,
    slug,
    size,
    accessories,
    style,
    currentAccessoryIndex
  });

  // For accessory step, determine which accessory we're working on
  const currentAccessory = step === 'accessory' ? slug : '';

  const template = useMemo(() => {
    if (step === 'accessory') {
      console.log('Looking for accessory template:', {
        style,
        currentAccessory
      });
      const found = accessoryTemplates.find(
        (t) => t.style === style && t.accessoryType === currentAccessory
      );
      console.log('Found accessory template:', found?.id);
      return found;
    }
    console.log('Looking for program template:', slug);
    const found = sampleProgramTemplates.find((t) => t.id === slug);
    console.log('Found program template:', found?.id);
    return found;
  }, [step, style, currentAccessory, slug]);

  const [viewSide, setViewSide] = useState<'outside' | 'inside'>('outside');

  const handleNextStep = () => {
    if (step === 'program') {
      // Go to first accessory
      const firstAccessory = accessories[0];
      router.push(
        `/editorFlow/accessory/${firstAccessory}?size=${size}&product=${slug}&style=${style}&accessories=${accessoriesParam}&accessoryIndex=0`
      );
    } else if (step === 'accessory') {
      const nextIndex = currentAccessoryIndex + 1;

      if (nextIndex < accessories.length) {
        // Go to next accessory
        const nextAccessory = accessories[nextIndex];
        router.push(
          `/editorFlow/accessory/${nextAccessory}?size=${size}&product=${product}&style=${style}&accessories=${accessoriesParam}&accessoryIndex=${nextIndex}`
        );
      } else {
        // All accessories done, go to review
        router.push(
          `/editorFlow/review/${product}?size=${size}&accessories=${accessoriesParam}&style=${style}`
        );
      }
    }
  };

  const getButtonText = () => {
    if (step === 'program') {
      return 'Approve Program Design';
    } else if (step === 'accessory') {
      const nextIndex = currentAccessoryIndex + 1;
      if (nextIndex < accessories.length) {
        return `Next Accessory (${nextIndex + 1}/${accessories.length})`;
      } else {
        return 'Review All Designs';
      }
    }
    return 'Next';
  };

  const getProgressInfo = () => {
    if (step === 'program') {
      return `Step 1 of ${accessories.length + 1}: Program Design`;
    } else if (step === 'accessory') {
      return `Step ${currentAccessoryIndex + 2} of ${accessories.length + 1}: ${currentAccessory.replace('-', ' ')} Design`;
    } else if (step === 'review') {
      return `Review All Designs`;
    }
    return '';
  };

  if (!template && step !== 'review') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Template Not Found</h2>
        <p className="mt-2 text-gray-600">
          Looking for:{' '}
          {step === 'accessory' ? `${style} ${currentAccessory}` : slug}
        </p>
      </div>
    );
  }

  const { info } = useDeceasedInfoContext();

  const initialCanvasValues = useMemo(
    () => ({
      name_of_deceased: info.name || '',
      sunrise_date: info.sunrise || '',
      sunset_date: info.sunset || '',
      service_date: info.serviceFormatted || info.service || '',
      deceased_cover_photo: info.coverPhoto || ''
    }),
    [info]
  );

  // Review step - show all designs
  if (step === 'review') {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Your Designs</h1>
          <p className="text-gray-600">
            Review all your designs before proceeding to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Program preview */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Program Design</h3>
            <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
              Program Preview
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() =>
                router.push(
                  `/editorFlow/program/${product}?${search.toString()}`
                )
              }
            >
              Edit Program
            </Button>
          </div>

          {/* Accessory previews */}
          {accessories.map((accessory, index) => (
            <div key={accessory} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 capitalize">
                {accessory.replace('-', ' ')} Design
              </h3>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                {accessory} Preview
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() =>
                  router.push(
                    `/editorFlow/accessory/${accessory}?${search.toString()}&accessoryIndex=${index}`
                  )
                }
              >
                Edit {accessory.replace('-', ' ')}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => router.push(`/checkout?${search.toString()}`)}
            className="px-8"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Progress indicator */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {getProgressInfo()}
        </h2>
        <div className="flex justify-center mt-2">
          <div className="flex space-x-2">
            {Array.from({ length: accessories.length + 1 }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  (step === 'program' && i === 0) ||
                  (step === 'accessory' && i === currentAccessoryIndex + 1) ||
                  (step === 'review' && i === accessories.length)
                    ? 'bg-blue-500'
                    : i <
                        (step === 'accessory'
                          ? currentAccessoryIndex + 1
                          : step === 'review'
                            ? accessories.length + 1
                            : 0)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {step !== 'review' && (
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

      {template && (
        <CanvasApp
          templateData={template}
          initialTextValues={initialCanvasValues}
          viewSide={viewSide}
        />
      )}

      {step !== 'finalize' && step !== 'review' && (
        <div className="flex justify-center mt-6">
          <Button size="lg" onClick={handleNextStep}>
            {getButtonText()}
          </Button>
        </div>
      )}
    </div>
  );
}
