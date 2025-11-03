'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import UpdateForm from '@components/UpdateForm';
import type { ProductInput } from '@Types/product';

export default function UpdateProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductInput | null>(null);

  // Ürünü API'den çek
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5011/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ürün alınamadı');
        return res.json();
      })
      .then(setProduct)
      .catch((err) => {
        console.error('Hata:', err);
        alert('Ürün bilgileri alınamadı');
      });
  }, [id]);

  // Güncelleme işlemi
  async function handleUpdate(data: ProductInput) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Giriş yapılmamış');
      return;
    }

    try {
    const response = await fetch(`http://localhost:5011/api/products/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ ...data, id }), // 👈 ID'yi ekle
});


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Güncelleme başarısız: ' + errorText);
      }

      const result = await response.json();
      alert(result.message); //  "Ürün başarıyla güncellendi"
      router.push('/products'); //  ürünler sayfasına yönlendir
    } catch (err) {
     
    }
  }

  // Yüklenme durumu
  if (!product) {
    return <p className="text-center py-10 text-gray-600">Ürün bilgileri yükleniyor...</p>;
  }

  // Sayfa içeriği
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Ürünü Güncelle
      </h1>
      <UpdateForm values={product} onSubmit={handleUpdate} />
    </div>
  );
}
