import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as getApiErrorMessage, n as PageHeader, t as Layout } from "./Layout-xSx8Snhf.mjs";
import { n as ErrorState, r as ProductGridSkeleton, t as EmptyState } from "./States-Bm53OCIH.mjs";
import { t as useWishlist } from "./useWishlist-CzPKqOae.mjs";
import { t as ProductCard } from "./ProductCard-BrfVhCZ5.mjs";
import { i as useCatalog } from "./useProducts-CnzcB8Sv.mjs";
import { t as useCategories } from "./useCategories-CLkQY_rD.mjs";
import { t as Pagination } from "./Pagination-CulF9KpN.mjs";
import { n as Route, t as ORDENES } from "./productos.index-DkOX9WPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/productos.index-PXEQzPrG.js
var import_jsx_runtime = require_jsx_runtime();
function Catalogo() {
	const { categoria, buscar, orden, page } = Route.useSearch();
	const navigate = Route.useNavigate();
	const categoriesQuery = useCategories();
	const { data: wishlist } = useWishlist();
	const wishIds = new Set((wishlist ?? []).map((p) => p.id));
	const catalog = useCatalog({
		categoria,
		buscar,
		orden,
		page
	});
	const current = {
		categoria,
		buscar,
		orden,
		page
	};
	const update = (patch) => navigate({
		to: "/productos",
		search: {
			...current,
			page: 1,
			...patch
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Tienda",
				title: "Catálogo completo",
				description: catalog.isLoading ? "Cargando productos…" : `${catalog.total} productos disponibles de ${catalog.totalCatalog} en total`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-8 grid gap-4 p-5 md:grid-cols-[1fr_220px_220px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: buscar,
						onChange: (e) => update({ buscar: e.target.value }),
						placeholder: "Buscar por nombre o descripción…",
						className: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: categoria,
						onChange: (e) => update({ categoria: e.target.value }),
						className: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Todas las categorías"
						}), (categoriesQuery.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.nombre,
							children: c.nombre
						}, c.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: orden,
						onChange: (e) => update({ orden: e.target.value }),
						className: "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
						children: ORDENES.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: o.value,
							children: o.label
						}, o.value))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: catalog.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 12 }) : catalog.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					message: getApiErrorMessage(catalog.error),
					onRetry: () => catalog.refetch()
				}) : catalog.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No hay resultados",
					description: "Prueba con otra búsqueda, categoría u orden diferente."
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
					onChange: (p) => {
						navigate({
							to: "/productos",
							search: {
								...current,
								page: p
							}
						});
						if (typeof window !== "undefined") window.scrollTo({
							top: 0,
							behavior: "smooth"
						});
					}
				})] })
			})
		]
	}) });
}
//#endregion
export { Catalogo as component };
