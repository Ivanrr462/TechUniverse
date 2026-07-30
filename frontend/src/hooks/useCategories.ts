import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categories.service";

export const categoriesQueryOptions = queryOptions({
  queryKey: ["categorias"],
  queryFn: fetchCategories,
  staleTime: 10 * 60 * 1000,
});

export function useCategories() {
  return useQuery(categoriesQueryOptions);
}
