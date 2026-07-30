import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { p as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/States-Bm53OCIH.js
var import_jsx_runtime = require_jsx_runtime();
function ProductGridSkeleton({ count = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-5 lg:grid-cols-4",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square animate-pulse bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 animate-pulse rounded bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4/5 animate-pulse rounded bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-1/2 animate-pulse rounded bg-muted" })
				]
			})]
		}, i))
	});
}
function Spinner({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-accent" }), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: label
		})]
	});
}
function EmptyState({ icon, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card flex flex-col items-center gap-3 px-6 py-16 text-center",
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-accent",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: description
			}),
			action
		]
	});
}
function ErrorState({ message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card flex flex-col items-center gap-3 px-6 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: "No se pudieron cargar los datos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted-foreground",
				children: message
			}),
			onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRetry,
				className: "mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
				children: "Reintentar"
			})
		]
	});
}
//#endregion
export { Spinner as i, ErrorState as n, ProductGridSkeleton as r, EmptyState as t };
