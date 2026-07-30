//#region node_modules/.nitro/vite/services/ssr/assets/format-BriYeBBV.js
var currency = new Intl.NumberFormat("es-ES", {
	style: "currency",
	currency: "EUR"
});
function formatPrice(value) {
	return currency.format(Number(value ?? 0));
}
//#endregion
export { formatPrice as t };
