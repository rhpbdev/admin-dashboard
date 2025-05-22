// components/StepTracker.tsx
'use client';

import { cn } from '@/lib/utils';

interface StepTrackerProps {
  currentStep: 'program' | 'accessory' | 'finalize';
}

const steps = ['program', 'accessory', 'finalize'];

const labels: Record<StepTrackerProps['currentStep'], string> = {
  program: 'Program',
  accessory: 'Accessory',
  finalize: 'Finalize'
};

export default function StepTracker({ currentStep }: StepTrackerProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center space-x-4 py-6">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center space-x-2">
          <div
            className={cn(
              'w-4 h-4 rounded-full border-2',
              idx <= currentIndex
                ? 'bg-blue-600 border-blue-600'
                : 'border-gray-300'
            )}
          />
          <span
            className={cn(
              'text-sm font-medium',
              idx <= currentIndex ? 'text-blue-700' : 'text-gray-500'
            )}
          >
            {labels[step as keyof typeof labels]}
          </span>
          {idx < steps.length - 1 && <div className="w-8 h-0.5 bg-gray-300" />}
        </div>
      ))}
    </div>
  );
}
