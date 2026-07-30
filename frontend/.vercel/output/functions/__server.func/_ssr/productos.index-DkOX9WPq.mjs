import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/productos.index-DkOX9WPq.js
var ORDENES = [
	{
		value: "novedad",
		label: "Novedades"
	},
	{
		value: "precio_asc",
		label: "Precio: menor a mayor"
	},
	{
		value: "precio_desc",
		label: "Precio: mayor a menor"
	}
];
var $$splitComponentImporter = () => import("./productos.index-PXEQzPrG.mjs");
var Route = createFileRoute("/productos/")({
	validateSearch: (search) => ({
		categoria: typeof search.categoria === "string" ? search.categoria : "",
		buscar: typeof search.buscar === "string" ? search.buscar : "",
		orden: ORDENES.some((o) => o.value === search.orden) ? search.orden : "novedad",
		page: Number(search.page) > 0 ? Number(search.page) : 1
	}),
	head: () => ({ meta: [
		{ title: "Catálogo de productos | TechUniverse" },
		{
			name: "description",
			content: "Explora todo el catálogo TechUniverse: filtra por categoría, ordena por precio o novedad y compra en segundos."
		},
		{
			property: "og:title",
			content: "Catálogo de productos | TechUniverse"
		},
		{
			property: "og:description",
			content: "Filtra, ordena y descubre cientos de productos tecnológicos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, ORDENES as t };
