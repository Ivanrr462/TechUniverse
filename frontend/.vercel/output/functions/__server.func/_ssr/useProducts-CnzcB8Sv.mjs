import { o as __toESM } from "../_runtime.mjs";
import { n as queryOptions, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as api } from "./Layout-xSx8Snhf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProducts-CnzcB8Sv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CACHE_PREFIX = "techuniverse_cache_";
function getCache(key, ttlMs) {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(CACHE_PREFIX + key);
		if (!raw) return null;
		const entry = JSON.parse(raw);
		if (Date.now() - entry.timestamp > ttlMs) {
			localStorage.removeItem(CACHE_PREFIX + key);
			return null;
		}
		return entry.data;
	} catch {
		return null;
	}
}
function setCache(key, data) {
	if (typeof window === "undefined") return;
	try {
		const entry = {
			data,
			timestamp: Date.now()
		};
		localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
	} catch {}
}
var CACHE_KEY_PRODUCTOS = "productos";
var CACHE_KEY_PRODUCTO = (id) => `producto_${id}`;
var TTL_PRODUCTOS = 1800 * 1e3;
var TTL_PRODUCTO = 3600 * 1e3;
async function fetchProductPage(page) {
	const { data } = await api.get("/productos", { params: { page } });
	return data;
}
async function fetchAllProducts() {
	const cached = getCache(CACHE_KEY_PRODUCTOS, TTL_PRODUCTOS);
	if (cached) return cached;
	const first = await fetchProductPage(1);
	const lastPage = first.meta?.last_page ?? 1;
	const all = lastPage <= 1 ? first.data : [...first.data, ...(await Promise.all(Array.from({ length: lastPage - 1 }, (_, i) => fetchProductPage(i + 2)))).flatMap((p) => p.data)];
	setCache(CACHE_KEY_PRODUCTOS, all);
	return all;
}
async function fetchProduct(id) {
	const cacheKey = CACHE_KEY_PRODUCTO(id);
	const cached = getCache(cacheKey, TTL_PRODUCTO);
	if (cached) return cached;
	const { data } = await api.get(`/productos/${id}`);
	setCache(cacheKey, data);
	return data;
}
var productsQueryOptions = queryOptions({
	queryKey: ["productos"],
	queryFn: fetchAllProducts,
	staleTime: 300 * 1e3
});
var productQueryOptions = (id) => queryOptions({
	queryKey: ["producto", id],
	queryFn: () => fetchProduct(id),
	staleTime: 300 * 1e3
});
function useProducts() {
	return useQuery(productsQueryOptions);
}
function useProduct(id) {
	return useQuery(productQueryOptions(id));
}
function sortProducts(items, orden) {
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
function useCatalog({ categoria, buscar, orden, page, soloOfertas, pageSize = 12 }) {
	const query = useProducts();
	const result = (0, import_react.useMemo)(() => {
		const all = query.data ?? [];
		const term = buscar?.trim().toLowerCase();
		const sorted = sortProducts(all.filter((p) => {
			if (categoria && p.categoria?.nombre !== categoria) return false;
			if (soloOfertas && !(p.descuento > 0)) return false;
			if (term && !`${p.nombre} ${p.descripcion}`.toLowerCase().includes(term)) return false;
			return true;
		}), orden);
		const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
		const safePage = Math.min(Math.max(1, page), totalPages);
		return {
			items: sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
			total: sorted.length,
			totalPages,
			page: safePage,
			totalCatalog: all.length
		};
	}, [
		query.data,
		categoria,
		buscar,
		orden,
		page,
		soloOfertas,
		pageSize
	]);
	return {
		...query,
		...result
	};
}
//#endregion
export { useProduct as a, useCatalog as i, setCache as n, useProducts as o, sortProducts as r, getCache as t };
