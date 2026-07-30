import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Sparkles, p as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as useAuth, i as getApiErrorMessage, t as Layout } from "./Layout-xSx8Snhf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registro-ClSSptRz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const { signUp } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		confirm: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const set = (key) => (e) => setForm((f) => ({
		...f,
		[key]: e.target.value
	}));
	const validate = () => {
		const next = {};
		if (form.name.trim().length < 3) next.name = "Introduce tu nombre completo";
		if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Introduce un email válido";
		if (form.password.length < 8) next.password = "Mínimo 8 caracteres";
		if (form.password !== form.confirm) next.confirm = "Las contraseñas no coinciden";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);
		try {
			await signUp({
				name: form.name.trim(),
				email: form.email.trim(),
				password: form.password,
				password_confirmation: form.confirm
			});
			navigate({ to: "/cuenta" });
		} catch (error) {
			toast.error(getApiErrorMessage(error, "No se pudo completar el registro"));
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
					children: "Crea tu cuenta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Guarda favoritos, gestiona tu cesta y compra más rápido."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-7 space-y-4",
					noValidate: true,
					children: [[
						{
							key: "name",
							label: "Nombre",
							type: "text",
							placeholder: "Ada Lovelace"
						},
						{
							key: "email",
							label: "Email",
							type: "email",
							placeholder: "tu@email.com"
						},
						{
							key: "password",
							label: "Contraseña",
							type: "password",
							placeholder: "••••••••"
						},
						{
							key: "confirm",
							label: "Repetir contraseña",
							type: "password",
							placeholder: "••••••••"
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: f.key,
							className: "text-sm font-medium",
							children: f.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: f.key,
							type: f.type,
							value: form[f.key],
							onChange: set(f.key),
							placeholder: f.placeholder,
							className: "mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
						}),
						errors[f.key] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors[f.key]
						})
					] }, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading,
						className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Crear cuenta"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"¿Ya tienes cuenta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "font-medium text-accent hover:underline",
							children: "Inicia sesión"
						})
					]
				})
			]
		})
	}) });
}
//#endregion
export { RegisterPage as component };
