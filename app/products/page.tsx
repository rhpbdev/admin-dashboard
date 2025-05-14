// app/products/page.tsx
import Link from 'next/link';

const products = [
  { name: 'Green Elegance Trifold', slug: 'green-elegance-trifold' },
  { name: 'Blue Horizon Bifold', slug: 'blue-horizon-bifold' },
  { name: 'Purple Serenity Trifold', slug: 'purple-serenity-trifold' }
];

export default function ProductsPage() {
  return (
    <div className="p-8 pt-20 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Funeral Programs</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="text-blue-600 underline text-lg"
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
