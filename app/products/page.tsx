import { getProducts } from '@/lib/db';

type ProductsPageSearchParams = { [key: string]: string | string[] };

export default async function ProductsPage({
  searchParams
}: {
  searchParams?: ProductsPageSearchParams;
}) {
  const search = Array.isArray(searchParams?.q)
    ? searchParams.q[0]
    : (searchParams?.q ?? '');

  const offsetStr = Array.isArray(searchParams?.offset)
    ? searchParams.offset[0]
    : (searchParams?.offset ?? '0');

  const offset = parseInt(offsetStr, 10);

  const { products } = await getProducts(search, offset);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ul className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border rounded p-4 shadow-sm flex items-center gap-4 h-32"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              <p className="text-sm text-gray-600">Status: {product.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
