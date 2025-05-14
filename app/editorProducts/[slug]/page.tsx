// app/editor/[slug]/page.tsx
'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CanvasApp from '@/components/canvas/CanvasApp';

export default function EditorPage() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const router = useRouter();

  const slug = params.slug ?? '';
  const size = search.get('size') ?? '';
  const accessory = search.get('accessory') ?? '';

  const [designApproved, setDesignApproved] = useState(false);
  const [designId, setDesignId] = useState<string | null>(null);

  const handleApproveDesign = () => {
    // ✅ In your CanvasApp you would generate a design ID or file path after approval
    // For now simulate it
    const fakeDesignId = `design-${Date.now()}`;
    setDesignId(fakeDesignId);
    setDesignApproved(true);
  };

  const handleAddToCart = () => {
    if (!designApproved || !designId) return;

    // ✅ Your cart logic here
    // Example: pass product + options + design reference
    const cartItem = {
      productSlug: slug,
      programSize: size,
      accessory,
      designId
    };

    console.log('Added to Cart:', cartItem);

    // Example: redirect to cart page
    router.push('/cart');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Design: {slug.replace(/-/g, ' ')}
      </h1>
      <p className="text-center mb-4">
        Program Size: {size}, Accessory: {accessory}
      </p>

      {/* 🎨 Your CanvasApp */}
      <CanvasApp />

      <div className="flex flex-col items-center mt-8 gap-4">
        {!designApproved && (
          <Button size="lg" onClick={handleApproveDesign}>
            Approve Design
          </Button>
        )}

        {designApproved && (
          <>
            <p className="text-green-600 font-semibold">Design Approved ✅</p>
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
