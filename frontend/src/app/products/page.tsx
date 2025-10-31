import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
};

export default async function ProductsPage() {
  const res = await fetch('http://localhost:5011/api/products', {
    cache: 'no-store',
  });

  const products: Product[] = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ürünler</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition">
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={300}
                height={300}
                className="object-cover rounded"
              />
              <h2 className="mt-2 font-semibold text-lg">{p.name}</h2>
              <p className="text-gray-700">{p.price} ₺</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
