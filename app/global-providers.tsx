// app/global-providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@/components/ui/tooltip'; // You can include this here if it's needed globally
import React from 'react';

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/*
        If TooltipProvider is needed on all pages, include it here.
        If it's ONLY for the dashboard, keep it in app/(dashboard)/providers.tsx
        and that dashboard layout will use its own Providers component.
      */}
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
