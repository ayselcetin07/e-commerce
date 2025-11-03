import { api } from "../api";
import type { ProductInput } from "@Types/product";



export async function createProduct(data: ProductInput, token: string) {
  const res = await api.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateProduct(id: string, data: ProductInput, token: string) {
  const res = await api.put(`/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteProduct(id: string, token: string) {
  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
