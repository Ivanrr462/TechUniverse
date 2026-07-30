import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as Mail, f as LogOut, m as Heart, n as UserRound, o as ShoppingBag } from "./_libs/lucide-react.mjs";
import { a as useAuth, n as PageHeader, s as useCart, t as Layout } from "./_ssr/Layout-xSx8Snhf.mjs";
import { i as Spinner } from "./_ssr/States-Bm53OCIH.mjs";
import { t as formatPrice } from "./_ssr/format-BriYeBBV.mjs";
import { t as useWishlist } from "./_ssr/useWishlist-CzPKqOae.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.cuenta-D3ZL7HKf.js
var import_jsx_runtime = require_jsx_runtime();
function CuentaPage() {
	const { user, isLoadingUser, signOut } = useAuth();
	const { data: cart } = useCart();
	const { data: wishlist } = useWishlist();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Panel",
			title: "Mi cuenta"
		}), isLoadingUser && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Cargando tus datos…" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card animate-rise p-6 md:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-accent inline-flex size-14 items-center justify-center rounded-2xl text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-bold",
									children: user?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
										" ",
										user?.email
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide",
								children: user?.rol ?? "usuario"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void signOut(),
								className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-destructive hover:text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Cerrar sesión"]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/carrito",
					className: "surface-card hover-lift animate-rise flex items-center gap-4 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-6 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg font-semibold",
						children: [cart?.cantidad_total ?? 0, " artículos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: ["Total ", formatPrice(cart?.precio_total)]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/wishlist",
					className: "surface-card hover-lift animate-rise flex items-center gap-4 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-6 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg font-semibold",
						children: [wishlist?.length ?? 0, " favoritos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Tu lista de deseos"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/productos",
					search: {
						categoria: "",
						buscar: "",
						orden: "novedad",
						page: 1
					},
					className: "surface-card hover-lift animate-rise flex items-center gap-4 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-6 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: "Seguir comprando"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Explorar el catálogo"
					})] })]
				})
			]
		})]
	}) });
}
//#endregion
export { CuentaPage as component };
