import { api } from "@/lib/api";
import type { Cart } from "@/types";

export async function fetchCart(): Promise<Cart> {
  const { data } = await api.get<Cart>("/cesta");
  return data;
}

export async function addToCart(producto_id: number, cantidad = 1): Promise<void> {
  await api.post("/cesta/productos", { producto_id, cantidad });
}

export async function updateCartItem(producto_id: number, cantidad: number): Promise<void> {
  await api.put(`/cesta/productos/${producto_id}`, { cantidad });
}

export async function removeCartItem(producto_id: number): Promise<void> {
  await api.delete(`/cesta/productos/${producto_id}`);
}
