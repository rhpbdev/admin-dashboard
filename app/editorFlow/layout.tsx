// app/editorFlow/layout.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import StepTracker from '@/components/StepTracker';
import './styles.css';

export default function EditorFlowLayout({
  children
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const step = params.step as 'program' | 'accessory' | 'finalize';

  const handleBack = () => {
    router.back(); // Optional: replace with custom routing logic
  };

  return (
    <div className="min-h-screen">
      <div className="w-full bg-[rgb(206,206,206)]">
        <div className="flex justify-center items-center px-4 pt-24 space-x-16">
          {step !== 'finalize' ? (
            <Button variant="outline" onClick={handleBack}>
              ← Back
            </Button>
          ) : (
            <div />
          )}
          <StepTracker currentStep={step} />
        </div>
        {children}
      </div>
    </div>
  );
}
