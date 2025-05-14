// app/cart/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// TEMPORARY mock cart items (replace later with global store or local storage)
const mockCartItems = [
  { productName: 'Large Trifold Program', quantity: 1, price: 99.99 },
  { productName: 'Glass Plaque', quantity: 1, price: 29.99 }
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(mockCartItems);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const clearCart = () => setItems([]);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}
