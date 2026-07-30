import { api } from "@/lib/api";
import { getCache, setCache } from "@/lib/cache";
import type { Categoria } from "@/types";

const CACHE_KEY = "categorias"
const TTL = 60 * 60 * 1000

export async function fetchCategories(): Promise<Categoria[]> {
  const cached = getCache<Categoria[]>(CACHE_KEY, TTL)
  if (cached) return cached

  const { data } = await api.get<{ data: Categoria[] }>("/categoria");
  const result = data.data
  setCache(CACHE_KEY, result)
  return result
}
