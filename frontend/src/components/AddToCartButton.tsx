'use client';

import { useAppDispatch } from '@store/hooks';
import { addToCart } from '@store/features/cartSlice';

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
    >
      Sepete Ekle
    </button>
  );
}
