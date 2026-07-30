import { n as queryOptions, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { r as api } from "./Layout-xSx8Snhf.mjs";
import { n as setCache, t as getCache } from "./useProducts-CnzcB8Sv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCategories-CLkQY_rD.js
var CACHE_KEY = "categorias";
var TTL = 3600 * 1e3;
async function fetchCategories() {
	const cached = getCache(CACHE_KEY, TTL);
	if (cached) return cached;
	const { data } = await api.get("/categoria");
	const result = data.data;
	setCache(CACHE_KEY, result);
	return result;
}
var categoriesQueryOptions = queryOptions({
	queryKey: ["categorias"],
	queryFn: fetchCategories,
	staleTime: 600 * 1e3
});
function useCategories() {
	return useQuery(categoriesQueryOptions);
}
//#endregion
export { useCategories as t };
