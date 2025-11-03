'use client';

import { useForm } from 'react-hook-form';
import type { ProductInput } from '@Types/product';

type Props = {
  defaultValues?: ProductInput;
  onSubmit: (data: ProductInput) => void;
};

export default function ProductForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<ProductInput>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      {/* Ürün Adı */}
      <div className="flex items-center gap-4">
        <label className="w-32 font-medium text-gray-700">Ürün Adı</label>
        <input
          {...register('name', { required: 'Bu alan zorunlu' })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Fiyat */}
      <div className="flex items-center gap-4">
        <label className="w-32 font-medium text-gray-700">Fiyat</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { required: 'Bu alan zorunlu' })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Görsel URL */}
      <div className="flex items-center gap-4">
        <label className="w-32 font-medium text-gray-700">Görsel URL</label>
        <input
          {...register('imageUrl', { required: 'Bu alan zorunlu' })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Kategori */}
      <div className="flex items-center gap-4">
        <label className="w-32 font-medium text-gray-700">Kategori</label>
        <input
          {...register('category', { required: 'Bu alan zorunlu' })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Açıklama */}
      <div className="flex items-start gap-4">
        <label className="w-32 font-medium text-gray-700 mt-2">Açıklama</label>
        <textarea
          {...register('description', { required: 'Bu alan zorunlu' })}
          rows={4}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Ürünü Kaydet
        </button>
      </div>
    </form>
  );
}
