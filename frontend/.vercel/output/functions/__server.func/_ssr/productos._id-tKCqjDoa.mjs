import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/productos._id-tKCqjDoa.js
var $$splitComponentImporter = () => import("./productos._id-CCx4ctHj.mjs");
var Route = createFileRoute("/productos/$id")({
	head: () => ({ meta: [
		{ title: "Detalle de producto | TechUniverse" },
		{
			name: "description",
			content: "Precio, descuento, stock, especificaciones técnicas y descripción completa del producto en TechUniverse."
		},
		{
			property: "og:title",
			content: "Detalle de producto | TechUniverse"
		},
		{
			property: "og:description",
			content: "Ficha completa con especificaciones, stock y precio con descuento."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
