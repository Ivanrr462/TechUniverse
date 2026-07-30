import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowRight, h as BadgePercent, r as Truck, s as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as getApiErrorMessage, t as Layout } from "./Layout-xSx8Snhf.mjs";
import { n as ErrorState, r as ProductGridSkeleton, t as EmptyState } from "./States-Bm53OCIH.mjs";
import { t as useWishlist } from "./useWishlist-CzPKqOae.mjs";
import { t as ProductCard } from "./ProductCard-BrfVhCZ5.mjs";
import { i as useCatalog, o as useProducts, r as sortProducts } from "./useProducts-CnzcB8Sv.mjs";
import { t as useCategories } from "./useCategories-CLkQY_rD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BxoEAcwU.js
var import_jsx_runtime = require_jsx_runtime();
var hero_tech_default = "/assets/hero-tech-Dc2yuzxG.jpg";
function Home() {
	const productsQuery = useProducts();
	const categoriesQuery = useCategories();
	const { data: wishlist } = useWishlist();
	const wishIds = new Set((wishlist ?? []).map((p) => p.id));
	const all = productsQuery.data ?? [];
	const offers = sortProducts(all.filter((p) => p.descuento > 0), "precio_desc").slice(0, 4);
	const novedades = useCatalog({
		orden: "novedad",
		page: 1,
		pageSize: 8
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "gradient-hero relative overflow-hidden text-ink-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-rise",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]",
							children: "Nueva temporada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl",
							children: ["Tecnología que ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: "merece la pena"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 max-w-lg text-base text-ink-foreground/75",
							children: [
								productsQuery.isLoading ? "Cargando catálogo…" : `${all.length} productos seleccionados`,
								" ",
								"entre smartphones, portátiles, audio y hogar. Precios claros, ofertas reales y entrega en 24/48h."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/productos",
								search: {
									categoria: "",
									buscar: "",
									orden: "novedad",
									page: 1
								},
								className: "gradient-accent inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5",
								children: ["Explorar tienda ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ofertas",
								className: "inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10",
								children: "Ver ofertas"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-ink-foreground/60",
									children: "Productos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-xl font-bold",
									children: all.length || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-ink-foreground/60",
									children: "En oferta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-xl font-bold",
									children: all.filter((p) => p.descuento > 0).length || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-ink-foreground/60",
									children: "Categorías"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-xl font-bold",
									children: categoriesQuery.data?.length ?? "—"
								})] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-rise relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_tech_default,
						alt: "Selección de dispositivos tecnológicos de TechUniverse",
						className: "w-full rounded-3xl object-cover shadow-2xl"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					{
						icon: Truck,
						title: "Envío 24/48h",
						text: "Gratis en pedidos superiores a 50 €"
					},
					{
						icon: ShieldCheck,
						title: "Garantía oficial",
						text: "2 años en todos los productos"
					},
					{
						icon: BadgePercent,
						title: "Ofertas reales",
						text: "Descuentos aplicados al instante"
					}
				].map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card flex items-start gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: text
					})] })]
				}, title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent",
					children: "Ofertas destacadas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-bold sm:text-3xl",
					children: "Precios rebajados hoy"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ofertas",
					className: "hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex",
					children: ["Ver todas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: productsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 4 }) : productsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					message: getApiErrorMessage(productsQuery.error),
					onRetry: () => productsQuery.refetch()
				}) : offers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Sin ofertas activas",
					description: "Vuelve pronto para nuevos descuentos."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-5 lg:grid-cols-4",
					children: offers.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						index: i,
						wishlisted: wishIds.has(p.id)
					}, p.id))
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold sm:text-3xl",
				children: "Compra por categoría"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: categoriesQuery.isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-32 animate-pulse rounded-full bg-muted" }, i)) : (categoriesQuery.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/productos",
					search: {
						categoria: c.nombre,
						orden: "novedad",
						page: 1,
						buscar: ""
					},
					className: "surface-card hover-lift px-5 py-3 text-sm font-medium",
					children: c.nombre
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold sm:text-3xl",
					children: "Novedades del catálogo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/productos",
					search: {
						categoria: "",
						buscar: "",
						orden: "novedad",
						page: 1
					},
					className: "hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex",
					children: ["Ver catálogo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: novedades.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-5 lg:grid-cols-4",
					children: novedades.items.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product: p,
						index: i,
						wishlisted: wishIds.has(p.id)
					}, p.id))
				})
			})]
		})
	] });
}
//#endregion
export { Home as component };
