import { o as __toESM } from "../_runtime.mjs";
import { i as QueryClientProvider, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$11 } from "./productos._id-tKCqjDoa.mjs";
import { n as Route$12 } from "./productos.index-DkOX9WPq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BE4DGVsS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CxV6wpK-.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error(error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TechUniverse — Tecnología premium con envío rápido" },
			{
				name: "description",
				content: "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial."
			},
			{
				property: "og:title",
				content: "TechUniverse — Tecnología premium con envío rápido"
			},
			{
				property: "og:description",
				content: "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "TechUniverse — Tecnología premium con envío rápido"
			},
			{
				name: "twitter:description",
				content: "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial."
			},
			{
				property: "og:image",
				content: "/logo.png"
			},
			{
				name: "twitter:image",
				content: "/logo.png"
			}
		],
		links: [
			{
				rel: "icon",
				href: "/logo.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/logo.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-BxoEAcwU.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "TechUniverse — Tecnología premium con envío rápido" },
		{
			name: "description",
			content: "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial."
		},
		{
			property: "og:title",
			content: "TechUniverse — Tecnología premium con envío rápido"
		},
		{
			property: "og:description",
			content: "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_authenticated-BHV6ByXC.mjs");
var Route$8 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./categorias-BD1vfvPK.mjs");
var Route$7 = createFileRoute("/categorias")({
	head: () => ({ meta: [
		{ title: "Categorías de productos | TechUniverse" },
		{
			name: "description",
			content: "Navega el catálogo TechUniverse por categorías: smartphones, portátiles, tablets, audio, televisores y más."
		},
		{
			property: "og:title",
			content: "Categorías de productos | TechUniverse"
		},
		{
			property: "og:description",
			content: "Encuentra más rápido lo que buscas explorando por categoría."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./login-CzoOI-qU.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Iniciar sesión | TechUniverse" },
		{
			name: "description",
			content: "Accede a tu cuenta TechUniverse para gestionar tu cesta, tu wishlist y tus datos."
		},
		{
			property: "og:title",
			content: "Iniciar sesión | TechUniverse"
		},
		{
			property: "og:description",
			content: "Entra en tu cuenta TechUniverse."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./ofertas-CdmvODd4.mjs");
var Route$5 = createFileRoute("/ofertas")({
	head: () => ({ meta: [
		{ title: "Ofertas y descuentos | TechUniverse" },
		{
			name: "description",
			content: "Todos los productos rebajados de TechUniverse con su descuento aplicado: ahorra en tecnología de primeras marcas."
		},
		{
			property: "og:title",
			content: "Ofertas y descuentos | TechUniverse"
		},
		{
			property: "og:description",
			content: "Descuentos activos en smartphones, portátiles, audio y más."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./registro-ClSSptRz.mjs");
var Route$4 = createFileRoute("/registro")({
	head: () => ({ meta: [
		{ title: "Crear cuenta | TechUniverse" },
		{
			name: "description",
			content: "Crea tu cuenta gratuita en TechUniverse y guarda productos en tu wishlist y tu cesta de compra."
		},
		{
			property: "og:title",
			content: "Crear cuenta | TechUniverse"
		},
		{
			property: "og:description",
			content: "Regístrate en TechUniverse en menos de un minuto."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var BASE_URL = "";
var Route$3 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "daily",
				priority: "1.0"
			},
			{
				path: "/productos",
				changefreq: "daily",
				priority: "0.9"
			},
			{
				path: "/ofertas",
				changefreq: "daily",
				priority: "0.8"
			},
			{
				path: "/categorias",
				changefreq: "weekly",
				priority: "0.7"
			},
			{
				path: "/login",
				changefreq: "yearly",
				priority: "0.3"
			},
			{
				path: "/registro",
				changefreq: "yearly",
				priority: "0.3"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$2 = () => import("../_authenticated.carrito-D53YPftL.mjs");
var Route$2 = createFileRoute("/_authenticated/carrito")({
	head: () => ({ meta: [
		{ title: "Tu cesta | TechUniverse" },
		{
			name: "description",
			content: "Revisa los productos de tu cesta, actualiza cantidades y finaliza tu compra."
		},
		{
			property: "og:title",
			content: "Tu cesta | TechUniverse"
		},
		{
			property: "og:description",
			content: "Gestiona los productos de tu cesta TechUniverse."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_authenticated.cuenta-D3ZL7HKf.mjs");
var Route$1 = createFileRoute("/_authenticated/cuenta")({
	head: () => ({ meta: [
		{ title: "Mi cuenta | TechUniverse" },
		{
			name: "description",
			content: "Consulta tus datos de usuario, el estado de tu cesta y tu lista de deseos."
		},
		{
			property: "og:title",
			content: "Mi cuenta | TechUniverse"
		},
		{
			property: "og:description",
			content: "Panel de usuario de TechUniverse."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_authenticated.wishlist-CT8SL2jA.mjs");
var Route = createFileRoute("/_authenticated/wishlist")({
	head: () => ({ meta: [
		{ title: "Tu wishlist | TechUniverse" },
		{
			name: "description",
			content: "Consulta y gestiona los productos que has guardado en tu lista de deseos."
		},
		{
			property: "og:title",
			content: "Tu wishlist | TechUniverse"
		},
		{
			property: "og:description",
			content: "Tus productos favoritos guardados en TechUniverse."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AuthenticatedRoute = Route$8.update({
	id: "/_authenticated",
	getParentRoute: () => Route$10
});
var CategoriasRoute = Route$7.update({
	id: "/categorias",
	path: "/categorias",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var OfertasRoute = Route$5.update({
	id: "/ofertas",
	path: "/ofertas",
	getParentRoute: () => Route$10
});
var RegistroRoute = Route$4.update({
	id: "/registro",
	path: "/registro",
	getParentRoute: () => Route$10
});
var SitemapDotxmlRoute = Route$3.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$10
});
var AuthenticatedCarritoRoute = Route$2.update({
	id: "/carrito",
	path: "/carrito",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedCuentaRoute = Route$1.update({
	id: "/cuenta",
	path: "/cuenta",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedWishlistRoute = Route.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => AuthenticatedRoute
});
var ProductosIndexRoute = Route$12.update({
	id: "/productos/",
	path: "/productos/",
	getParentRoute: () => Route$10
});
var ProductosIdRoute = Route$11.update({
	id: "/productos/$id",
	path: "/productos/$id",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteChildren = {
	AuthenticatedCarritoRoute,
	AuthenticatedCuentaRoute,
	AuthenticatedWishlistRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRoute: AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren),
	CategoriasRoute,
	LoginRoute,
	OfertasRoute,
	RegistroRoute,
	SitemapDotxmlRoute,
	ProductosIdRoute,
	ProductosIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 300 * 1e3,
	gcTime: 1800 * 1e3,
	refetchOnWindowFocus: false,
	refetchOnReconnect: false,
	refetchOnMount: false,
	retry: false
} } });
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
