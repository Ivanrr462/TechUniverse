import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as Heart } from "./_libs/lucide-react.mjs";
import { i as getApiErrorMessage, n as PageHeader, t as Layout } from "./_ssr/Layout-xSx8Snhf.mjs";
import { n as ErrorState, r as ProductGridSkeleton, t as EmptyState } from "./_ssr/States-Bm53OCIH.mjs";
import { t as useWishlist } from "./_ssr/useWishlist-CzPKqOae.mjs";
import { t as ProductCard } from "./_ssr/ProductCard-BrfVhCZ5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.wishlist-CT8SL2jA.js
var import_jsx_runtime = require_jsx_runtime();
function WishlistPage() {
	const { data, isLoading, isError, error, refetch } = useWishlist();
	const items = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Favoritos",
			title: "Tu wishlist",
			description: isLoading ? "Cargando…" : `${items.length} productos guardados`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 4 }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: getApiErrorMessage(error),
				onRetry: () => refetch()
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-8" }),
				title: "Tu wishlist está vacía",
				description: "Guarda productos con el corazón para encontrarlos aquí más tarde.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/productos",
					search: {
						categoria: "",
						buscar: "",
						orden: "novedad",
						page: 1
					},
					className: "mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Explorar productos"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-5 lg:grid-cols-4",
				children: items.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
					product: p,
					index: i,
					wishlisted: true
				}, p.id))
			})
		})]
	}) });
}
//#endregion
export { WishlistPage as component };
