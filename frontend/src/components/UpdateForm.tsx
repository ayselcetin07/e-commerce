'use client';

import { useForm } from 'react-hook-form';
import type { ProductInput } from '@Types/product';
import { useEffect } from 'react';

type Props = {
  values: ProductInput;
  onSubmit: (data: ProductInput) => void;
};

export default function UpdateForm({ values, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInput>();

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label className="block font-medium text-gray-700 mb-1">Ürün Adı</label>
        <input
          {...register('name', { required: 'Bu alan zorunlu' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Fiyat</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { required: 'Bu alan zorunlu' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Görsel URL</label>
        <input
          {...register('imageUrl', { required: 'Bu alan zorunlu' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Kategori</label>
        <input
          {...register('category', { required: 'Bu alan zorunlu' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Açıklama</label>
        <textarea
          {...register('description', { required: 'Bu alan zorunlu' })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Güncellemeyi Kaydet
        </button>
      </div>
    </form>
  );
}
