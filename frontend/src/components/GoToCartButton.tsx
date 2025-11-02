'use client';

import { useRouter } from 'next/navigation';

export default function GoToCartButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/cart')}
      className="px-6 py-3 border border-pink-500 text-pink-600 rounded hover:bg-pink-200 transition"
    >
      Sepete Git
    </button>
  );
}
