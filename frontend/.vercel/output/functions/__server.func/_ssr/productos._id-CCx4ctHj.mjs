import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft, c as Plus, l as Minus, m as Heart, o as ShoppingBag, p as LoaderCircle, r as Truck, s as ShieldCheck } from "../_libs/lucide-react.mjs";
import { c as useCartActions, i as getApiErrorMessage, o as useAuthStore, t as Layout } from "./Layout-xSx8Snhf.mjs";
import { i as Spinner, n as ErrorState } from "./States-Bm53OCIH.mjs";
import { t as formatPrice } from "./format-BriYeBBV.mjs";
import { n as useWishlistActions, t as useWishlist } from "./useWishlist-CzPKqOae.mjs";
import { a as useProduct } from "./useProducts-CnzcB8Sv.mjs";
import { t as Route } from "./productos._id-tKCqjDoa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/productos._id-CCx4ctHj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DetalleProducto() {
	const { id } = Route.useParams();
	const { data: product, isLoading, isError, error, refetch } = useProduct(id);
	const [cantidad, setCantidad] = (0, import_react.useState)(1);
	const { add: addCart } = useCartActions();
	const { add: addWish, remove: removeWish } = useWishlistActions();
	const { data: wishlist } = useWishlist();
	const isAuthenticated = Boolean(useAuthStore((s) => s.token));
	const wishlisted = (wishlist ?? []).some((p) => p.id === Number(id));
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Cargando producto…" }) });
	if (isError || !product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			message: getApiErrorMessage(error, "Producto no encontrado"),
			onRetry: () => refetch()
		})
	}) });
	const hasDiscount = product.descuento > 0;
	const outOfStock = product.stock <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/productos",
			search: {
				categoria: "",
				buscar: "",
				orden: "novedad",
				page: 1
			},
			className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Volver al catálogo"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card animate-rise flex aspect-square items-center justify-center overflow-hidden bg-surface p-8",
				children: product.foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.foto,
					alt: product.nombre,
					className: "max-h-full w-full object-contain"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "Sin imagen"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-rise",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent",
						children: product.categoria?.nombre ?? "TechUniverse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl font-bold sm:text-4xl",
						children: product.nombre
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl font-bold",
							children: formatPrice(product.precioDescuento)
						}), hasDiscount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pb-1 text-lg text-muted-foreground line-through",
							children: formatPrice(product.precio)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "gradient-accent mb-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-accent-foreground",
							children: [
								"-",
								product.descuento,
								"%"
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-3 text-sm font-medium ${outOfStock ? "text-destructive" : "text-success"}`,
						children: outOfStock ? "Sin stock disponible" : `${product.stock} unidades en stock`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 leading-relaxed text-muted-foreground",
						children: product.descripcion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-lg border border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Restar",
										onClick: () => setCantidad((c) => Math.max(1, c - 1)),
										className: "inline-flex size-11 items-center justify-center text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-center font-medium",
										children: cantidad
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Sumar",
										onClick: () => setCantidad((c) => Math.min(product.stock || 99, c + 1)),
										className: "inline-flex size-11 items-center justify-center text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: outOfStock || addCart.isPending,
								onClick: () => addCart.mutate({
									id: product.id,
									cantidad
								}),
								className: "inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 sm:flex-none",
								children: [addCart.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), "Añadir a la cesta"]
							}),
							isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => wishlisted ? removeWish.mutate(product.id) : addWish.mutate(product.id),
								disabled: addWish.isPending || removeWish.isPending,
								className: "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 ${wishlisted ? "fill-accent text-accent" : ""}` }), wishlisted ? "En tu wishlist" : "Wishlist"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-accent" }), " Envío 24/48h"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-accent" }), " Garantía 2 años"]
						})]
					}),
					product.especificaciones && product.especificaciones.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card mt-8 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "border-b border-border px-5 py-4 font-display text-base font-semibold",
							children: "Especificaciones"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "divide-y divide-border",
							children: product.especificaciones.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-6 px-5 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: spec.nombre
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right font-medium",
									children: spec.valor
								})]
							}, spec.nombre))
						})]
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { DetalleProducto as component };
