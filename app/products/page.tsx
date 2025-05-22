// app/products/page.tsx
import { Button } from '@/components/ui/button';
import { db, products, getProducts } from '@/lib/db';
import { ProductsTable } from 'app/(dashboard)/products-table';
import Image from 'next/image';
import Link from 'next/link';

// const products = [
//   { name: 'Green Elegance Trifold', slug: 'trifold-green-elegance' },
//   { name: 'Blue Horizon Bifold', slug: 'blue-horizon-bifold' },
//   { name: 'Purple Serenity Trifold', slug: 'purple-serenity-trifold' }
// ];

export default async function ProductsPage() {
  const allProducts = await db.select().from(products);

  return (
    <main className="p-6 pt-24">
      <div className="max-w-6xl m-auto">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={300}
                className="object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-1">
                Status: {product.status}
              </p>
              <p className="text-gray-800 font-bold">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              {product.isCustomizable && product.slug ? (
                <Button asChild>
                  <Link href={`/products/${product.slug}`}>Customize</Link>
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {/* <ProductsTable
        products={products}
        offset={newOffset ?? 0}
        totalProducts={totalProducts}
      /> */}
    </main>
  );
}
