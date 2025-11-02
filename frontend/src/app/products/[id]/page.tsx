import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
};

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5011/api/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="p-6 text-red-500 text-center">Ürün bulunamadı.</div>;
  }

  const product: Product = await res.json();

  if (!product || !product.id) {
    return (
      <div className="p-6 text-red-500 text-center">
        Ürün bulunamadı. ID: <code>{id}</code>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-[#f8f8f8] via-[#f0f0f0] to-[#fafafa] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{product.name}</h1>

        <div className="flex justify-center mb-6">
          <div className="relative w-[400px] h-[300px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              unoptimized
            />
          </div>
        </div>

        <div className="space-y-4 text-gray-700 text-center">
          <p className="text-xl font-semibold">💰 {product.price.toLocaleString('tr-TR')} ₺</p>
          <p className="text-sm text-gray-500">📦 Kategori: {product.category}</p>
          <p className="text-base leading-relaxed">{product.description}</p>
        </div>
      </div>
    </main>
  );
}
