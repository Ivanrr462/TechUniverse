import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Sparkles, p as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as useAuth, i as getApiErrorMessage, t as Layout } from "./Layout-xSx8Snhf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CzoOI-qU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { signIn } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const validate = () => {
		const next = {};
		if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Introduce un email válido";
		if (password.length < 6) next.password = "Mínimo 6 caracteres";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);
		try {
			await signIn({
				email,
				password
			});
			navigate({ to: "/cuenta" });
		} catch (error) {
			toast.error(getApiErrorMessage(error, "Credenciales incorrectas"));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex max-w-md flex-col px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-rise surface-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gradient-accent inline-flex size-10 items-center justify-center rounded-xl text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-2xl font-bold",
					children: "Bienvenido de nuevo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Inicia sesión para acceder a tu cesta y tu wishlist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-7 space-y-4",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "email",
								className: "text-sm font-medium",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
								placeholder: "tu@email.com"
							}),
							errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.email
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "password",
								className: "text-sm font-medium",
								children: "Contraseña"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
								placeholder: "••••••••"
							}),
							errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.password
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Iniciar sesión"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"¿No tienes cuenta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/registro",
							className: "font-medium text-accent hover:underline",
							children: "Regístrate"
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { LoginPage as component };
