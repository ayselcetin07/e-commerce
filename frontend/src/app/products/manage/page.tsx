'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductForm from '@components/ProductForm';
import { useRouter } from 'next/navigation';
import type { ProductInput } from '@Types/product';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
};

export default function ManageProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5011/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  async function handleSubmit(data: ProductInput) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Giriş yapılmamış');
      return;
    }

    try {
      await fetch('http://localhost:5011/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      alert('✅ Ürün başarıyla eklendi');
      router.push('/products'); // ürünler sayfasına yönlendir
    } catch (err) {
      console.error('Ürün eklenemedi:', err);
      alert('❌ Ürün eklenirken bir hata oluştu');
    }
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Giriş yapılmamış');
      return;
    }

    const confirmed = confirm('Bu ürünü silmek istiyor musunuz?');
    if (!confirmed) return;

    try {
      await fetch(`http://localhost:5011/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Silme hatası:', err);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Ürün Yönetimi
      </h1>

      {/* Mevcut Ürünler */}
      <h2 className="text-2xl font-semibold mb-4">Mevcut Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="aspect-square relative w-full mb-2">
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-contain rounded"
              />
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 text-center">
              {p.name}
            </h3>
            <p className="text-sm text-gray-600 text-center">{p.category}</p>
            <p className="text-sm text-gray-500 text-center line-clamp-2">
              {p.description}
            </p>
            <p className="text-green-700 font-bold text-right mt-2">
              {p.price} ₺
            </p>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => router.push(`/products/update/${p.id}`)}
                className="text-blue-600 hover:underline"
              >
                Güncelle
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600 hover:underline"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ürün Ekleme Formu */}
      <h2 className="text-2xl font-semibold mb-4">Yeni Ürün Ekle</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
