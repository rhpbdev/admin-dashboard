// app/products/[slug]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// Lookup program style from sampleProgramTemplates
import { sampleProgramTemplates } from '@/components/lib/sampleTemplateData';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';

  const [programSize, setProgramSize] = useState<string>('');
  const [accessory, setAccessory] = useState<string>('');
  const [deceasedName, setDeceasedName] = useState<string>('');

  const handleCustomize = () => {
    if (!programSize || !accessory) {
      alert('Please make a selection');
      return;
    }

    const programTemplate = sampleProgramTemplates.find((t) => t.id === slug);
    const style = programTemplate?.style || '';

    router.push(
      `/editorFlow/program/${slug}?size=${programSize}&accessory=${accessory}&style=${style}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-12 pt-20 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {slug.replace(/-/g, ' ').toUpperCase()}
      </h1>

      <div className="flex flex-col gap-6">
        <div>
          <label className="font-semibold">Program Size</label>
          <Select value={programSize} onValueChange={setProgramSize}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="large-trifold">Large Trifold</SelectItem>
              <SelectItem value="small-trifold">Small Trifold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="font-semibold">Accessory</label>
          <Select value={accessory} onValueChange={setAccessory}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select accessory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thank-you-cards">Thank You Cards</SelectItem>
              <SelectItem value="bookmarks">Bookmarks</SelectItem>
              <SelectItem value="glass-plaque">Glass Plaque</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* <div>
          <label className="font-semibold">Name of Deceased</label>
          <Input
            type="text"
            placeholder="Name"
            value={deceasedName}
            onChange={(e) => setDeceasedName(e.target.value)}
          />
        </div> */}

        <Button
          className="w-full mt-8"
          size="lg"
          onClick={handleCustomize}
          disabled={!programSize || !accessory}
        >
          Customize Now
        </Button>
      </div>
    </div>
  );
}
