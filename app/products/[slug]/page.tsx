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
import { Checkbox } from '@/components/ui/checkbox';
import { sampleProgramTemplates } from '@/components/lib/sampleTemplateData';

const availableAccessories = [
  { id: 'thank-you-cards', name: 'Thank You Cards', price: 15 },
  { id: 'bookmarks', name: 'Bookmarks', price: 8 },
  { id: 'glass-plaque', name: 'Glass Plaque', price: 25 }
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';

  const [programSize, setProgramSize] = useState<string>('');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const handleAccessoryChange = (accessoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccessories((prev) => [...prev, accessoryId]);
    } else {
      setSelectedAccessories((prev) => prev.filter((id) => id !== accessoryId));
    }
  };

  const calculateTotal = () => {
    const accessoryTotal = selectedAccessories.reduce((total, accessoryId) => {
      const accessory = availableAccessories.find((a) => a.id === accessoryId);
      return total + (accessory?.price || 0);
    }, 0);
    return accessoryTotal;
  };

  const handleCustomize = () => {
    if (!programSize || selectedAccessories.length === 0) {
      alert('Please select a program size and at least one accessory');
      return;
    }

    const programTemplate = sampleProgramTemplates.find((t) => t.id === slug);
    const style = programTemplate?.style || '';

    // Navigate to program design first
    const accessoriesParam = selectedAccessories.join(',');
    router.push(
      `/editorFlow/program/${slug}?size=${programSize}&accessories=${accessoriesParam}&style=${style}`
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
          <label className="font-semibold mb-3 block">
            Accessories (Select multiple)
          </label>
          <div className="space-y-3">
            {availableAccessories.map((accessory) => (
              <div
                key={accessory.id}
                className="flex items-center space-x-3 p-3 border rounded-lg"
              >
                <Checkbox
                  id={accessory.id}
                  checked={selectedAccessories.includes(accessory.id)}
                  onCheckedChange={(checked) =>
                    handleAccessoryChange(accessory.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={accessory.id}
                  className="flex-1 font-medium cursor-pointer"
                >
                  {accessory.name}
                </label>
                <span className="font-semibold text-green-600">
                  +${accessory.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {selectedAccessories.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Selected Accessories:</h3>
            <ul className="space-y-1">
              {selectedAccessories.map((id) => {
                const accessory = availableAccessories.find((a) => a.id === id);
                return (
                  <li key={id} className="flex justify-between">
                    <span>{accessory?.name}</span>
                    <span>${accessory?.price}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t mt-2 pt-2 font-bold">
              <div className="flex justify-between">
                <span>Accessories Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        <Button
          className="w-full mt-8"
          size="lg"
          onClick={handleCustomize}
          disabled={!programSize || selectedAccessories.length === 0}
        >
          Start Customizing ({selectedAccessories.length} item
          {selectedAccessories.length !== 1 ? 's' : ''})
        </Button>
      </div>
    </div>
  );
}
