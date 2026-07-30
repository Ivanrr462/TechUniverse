import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Heart, o as ShoppingBag, p as LoaderCircle } from "../_libs/lucide-react.mjs";
import { c as useCartActions, o as useAuthStore } from "./Layout-xSx8Snhf.mjs";
import { t as formatPrice } from "./format-BriYeBBV.mjs";
import { n as useWishlistActions } from "./useWishlist-CzPKqOae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-BrfVhCZ5.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product, wishlisted, index = 0 }) {
	const { add: addCart } = useCartActions();
	const { add: addWish, remove: removeWish } = useWishlistActions();
	const isAuthenticated = Boolean(useAuthStore((s) => s.token));
	const hasDiscount = product.descuento > 0;
	const outOfStock = product.stock <= 0;
	const wishPending = addWish.isPending || removeWish.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface-card hover-lift animate-rise group flex flex-col overflow-hidden",
		style: { animationDelay: `${Math.min(index, 8) * 45}ms` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/productos/$id",
			params: { id: String(product.id) },
			className: "relative block aspect-square overflow-hidden bg-surface",
			children: [
				product.foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.foto,
					alt: product.nombre,
					loading: "lazy",
					className: "h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: "Sin imagen"
				}),
				hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "gradient-accent absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-accent-foreground",
					children: [
						"-",
						product.descuento,
						"%"
					]
				}),
				outOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-ink-foreground",
					children: "Agotado"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: product.categoria?.nombre ?? "TechUniverse"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/productos/$id",
						params: { id: String(product.id) },
						className: "mt-1 line-clamp-2 block font-display text-base font-semibold transition-colors hover:text-accent",
						children: product.nombre
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: formatPrice(product.precioDescuento)
					}), hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pb-0.5 text-sm text-muted-foreground line-through",
						children: formatPrice(product.precio)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: outOfStock || addCart.isPending,
						onClick: () => addCart.mutate({ id: product.id }),
						className: "inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
						children: [addCart.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), "Añadir"]
					}), isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": wishlisted ? "Quitar de la wishlist" : "Añadir a la wishlist",
						disabled: wishPending,
						onClick: () => wishlisted ? removeWish.mutate(product.id) : addWish.mutate(product.id),
						className: "inline-flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:border-accent hover:text-accent disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 ${wishlisted ? "fill-accent text-accent" : ""}` })
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
