import { o as __toESM } from "./_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, d as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as useAuthStore, t as Layout } from "./_ssr/Layout-xSx8Snhf.mjs";
import { i as Spinner } from "./_ssr/States-Bm53OCIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-BHV6ByXC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthenticatedLayout() {
	const token = useAuthStore((s) => s.token);
	const hydrated = useAuthStore((s) => s.hydrated);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (hydrated && !token) navigate({
			to: "/login",
			replace: true
		});
	}, [
		hydrated,
		token,
		navigate
	]);
	if (!hydrated || !token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: "Comprobando tu sesión…" }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AuthenticatedLayout as component };
