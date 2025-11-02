'use client';

import { useAppSelector, useAppDispatch } from '@store/hooks';
import { removeFromCart, updateQuantity } from '@store/features/cartSlice';
import Image from 'next/image';

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Sepetim</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Sepetiniz şu anda boş.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="relative w-24 h-24 shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Fiyat: {item.price.toLocaleString('tr-TR')} ₺
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm">Adet:</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Number(e.target.value),
                            })
                          )
                        }
                        className="w-16 border rounded px-2 py-1 text-center"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Kaldır
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right text-xl font-bold text-gray-800">
              Toplam: {total.toLocaleString('tr-TR')} ₺
            </div>
          </>
        )}
      </div>
    </main>
  );
}
