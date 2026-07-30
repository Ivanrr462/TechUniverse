import { o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, i as Trash2, l as Minus, o as ShoppingBag, p as LoaderCircle } from "./_libs/lucide-react.mjs";
import { c as useCartActions, i as getApiErrorMessage, n as PageHeader, s as useCart, t as Layout } from "./_ssr/Layout-xSx8Snhf.mjs";
import { i as Spinner, n as ErrorState, t as EmptyState } from "./_ssr/States-Bm53OCIH.mjs";
import { t as formatPrice } from "./_ssr/format-BriYeBBV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.carrito-D53YPftL.js
var import_jsx_runtime = require_jsx_runtime();
function CarritoPage() {
	const { data: cart, isLoading, isError, error, refetch } = useCart();
	const { update, remove } = useCartActions();
	const items = cart?.productos ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Tu compra",
			title: "Cesta"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Cargando tu cesta…" }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: getApiErrorMessage(error),
				onRetry: () => refetch()
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-8" }),
				title: "Tu cesta está vacía",
				description: "Añade productos desde el catálogo para verlos aquí.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/productos",
					search: {
						categoria: "",
						buscar: "",
						orden: "novedad",
						page: 1
					},
					className: "mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Ir a la tienda"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[1fr_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "surface-card animate-rise flex gap-4 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/productos/$id",
							params: { id: String(item.id) },
							className: "size-24 shrink-0 overflow-hidden rounded-lg bg-surface",
							children: item.foto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.foto,
								alt: item.nombre,
								className: "h-full w-full object-contain p-2"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/productos/$id",
									params: { id: String(item.id) },
									className: "font-medium hover:text-accent",
									children: item.nombre
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [formatPrice(item.precioDescuento), " / ud."]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Eliminar",
									onClick: () => remove.mutate(item.id),
									disabled: remove.isPending,
									className: "text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded-lg border border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "Restar",
											disabled: update.isPending || item.cantidad <= 1,
											onClick: () => update.mutate({
												id: item.id,
												cantidad: item.cantidad - 1
											}),
											className: "inline-flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-9 text-center text-sm font-medium",
											children: update.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto size-3.5 animate-spin" }) : item.cantidad
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "Sumar",
											disabled: update.isPending,
											onClick: () => update.mutate({
												id: item.id,
												cantidad: item.cantidad + 1
											}),
											className: "inline-flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display font-semibold",
									children: formatPrice(item.subtotal)
								})]
							})]
						})]
					}, item.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "surface-card h-fit p-6 lg:sticky lg:top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Resumen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Artículos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: cart?.cantidad_total ?? 0 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Envío"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-success",
									children: "Gratis"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-end justify-between border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-bold",
								children: formatPrice(cart?.precio_total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
							children: "Finalizar compra"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/productos",
							search: {
								categoria: "",
								buscar: "",
								orden: "novedad",
								page: 1
							},
							className: "mt-3 block text-center text-sm text-muted-foreground hover:text-foreground",
							children: "Seguir comprando"
						})
					]
				})]
			})
		})]
	}) });
}
//#endregion
export { CarritoPage as component };
