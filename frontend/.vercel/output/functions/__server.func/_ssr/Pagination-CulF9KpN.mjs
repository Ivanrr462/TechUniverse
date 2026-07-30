import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Pagination-CulF9KpN.js
var import_jsx_runtime = require_jsx_runtime();
function Pagination({ page, totalPages, onChange }) {
	if (totalPages <= 1) return null;
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "mt-10 flex flex-wrap items-center justify-center gap-2",
		"aria-label": "Paginación",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(page - 1),
				disabled: page <= 1,
				className: "rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-40",
				children: "Anterior"
			}),
			pages.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2",
				children: [i > 0 && p - pages[i - 1] > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: "…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(p),
					"aria-current": p === page ? "page" : void 0,
					className: `min-w-10 rounded-lg border px-3 py-2 text-sm transition-colors ${p === page ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`,
					children: p
				})]
			}, p)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(page + 1),
				disabled: page >= totalPages,
				className: "rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-40",
				children: "Siguiente"
			})
		]
	});
}
//#endregion
export { Pagination as t };
