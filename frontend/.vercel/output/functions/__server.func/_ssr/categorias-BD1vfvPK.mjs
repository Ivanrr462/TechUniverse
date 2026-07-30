import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as getApiErrorMessage, n as PageHeader, t as Layout } from "./Layout-xSx8Snhf.mjs";
import { n as ErrorState } from "./States-Bm53OCIH.mjs";
import { o as useProducts } from "./useProducts-CnzcB8Sv.mjs";
import { t as useCategories } from "./useCategories-CLkQY_rD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categorias-BD1vfvPK.js
var import_jsx_runtime = require_jsx_runtime();
function Categorias() {
	const categoriesQuery = useCategories();
	const productsQuery = useProducts();
	const products = productsQuery.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Explorar",
			title: "Categorías",
			description: "Selecciona una categoría para filtrar el catálogo al instante."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: categoriesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-muted" }, i))
			}) : categoriesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: getApiErrorMessage(categoriesQuery.error),
				onRetry: () => categoriesQuery.refetch()
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: (categoriesQuery.data ?? []).map((c, i) => {
					const count = products.filter((p) => p.categoria?.nombre === c.nombre).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/productos",
						search: {
							categoria: c.nombre,
							buscar: "",
							orden: "novedad",
							page: 1
						},
						style: { animationDelay: `${Math.min(i, 8) * 45}ms` },
						className: "surface-card hover-lift animate-rise group flex items-center justify-between gap-4 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: c.nombre
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: productsQuery.isLoading ? "Cargando…" : `${count} productos`
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5 text-accent transition-transform group-hover:translate-x-1" })]
					}, c.id);
				})
			})
		})]
	}) });
}
//#endregion
export { Categorias as component };
