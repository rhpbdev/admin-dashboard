// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      setIsSubmitting(false);
    }, 2000); // simulate API delay
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePlaceOrder();
        }}
        className="space-y-8"
      >
        {/* Billing Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="First Name" required />
            <Input placeholder="Last Name" required />
            <Input placeholder="Email Address" type="email" required />
            <Input placeholder="Phone Number" required />
          </div>
        </section>

        {/* Shipping Address */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Street Address"
              required
              className="md:col-span-2"
            />
            <Input placeholder="City" required />
            <Input placeholder="State" required />
            <Input placeholder="Zip Code" required />
            <Input placeholder="Country" required />
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <p className="text-gray-500 mb-2">For demo purposes only.</p>
          <div className="space-y-2">
            <Input placeholder="Card Number" required />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/YY" required />
              <Input placeholder="CVV" required />
            </div>
          </div>
        </section>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </div>
  );
}
