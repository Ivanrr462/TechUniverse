import { api } from "@/lib/api";
import type { Producto } from "@/types";

export async function fetchWishlist(userId: number): Promise<Producto[]> {
  const { data } = await api.get<{ desea: Producto[] }>(`/deseos/${userId}`);
  return data.desea ?? [];
}

export async function addToWishlist(producto_id: number): Promise<void> {
  await api.post("/deseos", { producto_id });
}

export async function removeFromWishlist(producto_id: number): Promise<void> {
  await api.delete(`/deseos/${producto_id}`);
}
