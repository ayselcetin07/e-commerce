'use client';

import { useState, useEffect } from 'react';
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('http://localhost:5011/api/categories')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (sort) params.append('sort', sort);

    fetch(`http://localhost:5011/api/products?${params.toString()}`, {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then(setProducts);
  }, [category, minPrice, maxPrice, sort]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ürünler</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setShowFilter(!showFilter);
            setShowSort(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filtrele
        </button>
        <button
          onClick={() => {
            setShowSort(!showSort);
            setShowFilter(false);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sırala
        </button>
      </div>

      {showFilter && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Kategori Seç</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Fiyat"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Fiyat"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      )}

      {showSort && (
        <div className="mb-6">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sıralama Seç</option>
            <option value="asc">Fiyat Artan</option>
            <option value="desc">Fiyat Azalan</option>
          </select>
        </div>
      )}

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
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
