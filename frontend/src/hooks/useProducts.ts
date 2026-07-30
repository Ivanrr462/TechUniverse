import { useMemo } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProduct } from "@/services/products.service";
import type { Producto, SortOption } from "@/types";

export const productsQueryOptions = queryOptions({
  queryKey: ["productos"],
  queryFn: fetchAllProducts,
  staleTime: 5 * 60 * 1000,
});

export const productQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["producto", id],
    queryFn: () => fetchProduct(id),
    staleTime: 5 * 60 * 1000,
  });

export function useProducts() {
  return useQuery(productsQueryOptions);
}

export function useProduct(id: string) {
  return useQuery(productQueryOptions(id));
}

export const PAGE_SIZE = 12;

interface CatalogParams {
  categoria?: string;
  buscar?: string;
  orden: SortOption;
  page: number;
  soloOfertas?: boolean;
  pageSize?: number;
}

export function sortProducts(items: Producto[], orden: SortOption) {
  const copy = [...items];
  if (orden === "precio_asc") return copy.sort((a, b) => a.precioDescuento - b.precioDescuento);
  if (orden === "precio_desc") return copy.sort((a, b) => b.precioDescuento - a.precioDescuento);
  return copy.sort((a, b) => {
    const da = a.modificado ? Date.parse(a.modificado.replace(" ", "T")) : 0;
    const db = b.modificado ? Date.parse(b.modificado.replace(" ", "T")) : 0;
    if (db !== da) return db - da;
    return b.id - a.id;
  });
}

export function useCatalog({
  categoria,
  buscar,
  orden,
  page,
  soloOfertas,
  pageSize = PAGE_SIZE,
}: CatalogParams) {
  const query = useProducts();

  const result = useMemo(() => {
    const all = query.data ?? [];
    const term = buscar?.trim().toLowerCase();
    const filtered = all.filter((p) => {
      if (categoria && p.categoria?.nombre !== categoria) return false;
      if (soloOfertas && !(p.descuento > 0)) return false;
      if (term && !`${p.nombre} ${p.descripcion}`.toLowerCase().includes(term)) return false;
      return true;
    });
    const sorted = sortProducts(filtered, orden);
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    return {
      items: sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
      total: sorted.length,
      totalPages,
      page: safePage,
      totalCatalog: all.length,
    };
  }, [query.data, categoria, buscar, orden, page, soloOfertas, pageSize]);

  return { ...query, ...result };
}
