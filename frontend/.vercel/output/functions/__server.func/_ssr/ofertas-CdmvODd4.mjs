import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as getApiErrorMessage, n as PageHeader, t as Layout } from "./Layout-xSx8Snhf.mjs";
import { n as ErrorState, r as ProductGridSkeleton, t as EmptyState } from "./States-Bm53OCIH.mjs";
import { t as useWishlist } from "./useWishlist-CzPKqOae.mjs";
import { t as ProductCard } from "./ProductCard-BrfVhCZ5.mjs";
import { i as useCatalog } from "./useProducts-CnzcB8Sv.mjs";
import { t as Pagination } from "./Pagination-CulF9KpN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ofertas-CdmvODd4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Ofertas() {
	const [page, setPage] = (0, import_react.useState)(1);
	const catalog = useCatalog({
		orden: "precio_desc",
		page,
		soloOfertas: true,
		pageSize: 12
	});
	const { data: wishlist } = useWishlist();
	const wishIds = new Set((wishlist ?? []).map((p) => p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Descuentos",
			title: "Ofertas activas",
			description: catalog.isLoading ? "Buscando descuentos…" : `${catalog.total} productos rebajados`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: catalog.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 12 }) : catalog.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: getApiErrorMessage(catalog.error),
				onRetry: () => catalog.refetch()
			}) : catalog.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No hay ofertas ahora mismo",
				description: "Vuelve pronto, actualizamos los descuentos con frecuencia."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-5 lg:grid-cols-4",
				children: catalog.items.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					index: i,
					wishlisted: wishIds.has(p.id)
				}, p.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				page: catalog.page,
				totalPages: catalog.totalPages,
				onChange: setPage
			})] })
		})]
	}) });
}
//#endregion
export { Ofertas as component };
