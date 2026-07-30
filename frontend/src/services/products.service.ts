import { api } from "@/lib/api";
import { getCache, setCache } from "@/lib/cache";
import type { Paginated, Producto } from "@/types";

const CACHE_KEY_PRODUCTOS = "productos"
const CACHE_KEY_PRODUCTO = (id: number | string) => `producto_${id}`
const TTL_PRODUCTOS = 30 * 60 * 1000
const TTL_PRODUCTO = 60 * 60 * 1000

export async function fetchProductPage(page: number): Promise<Paginated<Producto>> {
  const { data } = await api.get<Paginated<Producto>>("/productos", { params: { page } });
  return data;
}

export async function fetchAllProducts(): Promise<Producto[]> {
  const cached = getCache<Producto[]>(CACHE_KEY_PRODUCTOS, TTL_PRODUCTOS)
  if (cached) return cached

  const first = await fetchProductPage(1);
  const lastPage = first.meta?.last_page ?? 1;
  const all = lastPage <= 1
    ? first.data
    : [
        ...first.data,
        ...(await Promise.all(
          Array.from({ length: lastPage - 1 }, (_, i) => fetchProductPage(i + 2)),
        )).flatMap((p) => p.data),
      ]

  setCache(CACHE_KEY_PRODUCTOS, all)
  return all
}

export async function fetchProduct(id: number | string): Promise<Producto> {
  const cacheKey = CACHE_KEY_PRODUCTO(id)
  const cached = getCache<Producto>(cacheKey, TTL_PRODUCTO)
  if (cached) return cached

  const { data } = await api.get<Producto>(`/productos/${id}`);
  setCache(cacheKey, data)
  return data
}
