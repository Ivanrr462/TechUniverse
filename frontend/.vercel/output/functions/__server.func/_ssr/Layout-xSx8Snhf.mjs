import { o as __toESM } from "../_runtime.mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, s as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as LogOut, m as Heart, n as UserRound, o as ShoppingBag, t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-xSx8Snhf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "TechUniverse",
						className: "h-15 w-15 rounded-xl border border-border bg-background p-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: "TechUniverse"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-muted-foreground",
					children: "Tecnología seleccionada con criterio: smartphones, portátiles, audio y más, con envío rápido y garantía oficial."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold",
					children: "Tienda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/productos",
							search: {
								categoria: "",
								buscar: "",
								orden: "novedad",
								page: 1
							},
							className: "hover:text-foreground",
							children: "Todos los productos"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/ofertas",
							className: "hover:text-foreground",
							children: "Ofertas"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categorias",
							className: "hover:text-foreground",
							children: "Categorías"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold",
					children: "Cuenta"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "hover:text-foreground",
							children: "Iniciar sesión"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/registro",
							className: "hover:text-foreground",
							children: "Registro"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/carrito",
							className: "hover:text-foreground",
							children: "Mi cesta"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border py-6 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" TechUniverse. Todos los derechos reservados."
			]
		})]
	});
}
var API_URL = "https://ivan123.alwaysdata.net/api";
var TOKEN_KEY = "techuniverse_token";
function getStoredToken() {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(TOKEN_KEY);
}
function setStoredToken(token) {
	if (typeof window === "undefined") return;
	if (token) window.localStorage.setItem(TOKEN_KEY, token);
	else window.localStorage.removeItem(TOKEN_KEY);
}
var api = axios.create({
	baseURL: API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});
api.interceptors.request.use((config) => {
	const token = getStoredToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
api.interceptors.response.use((response) => response, (error) => {
	if (axios.isAxiosError(error) && error.response?.status === 401) {
		setStoredToken(null);
		if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("techuniverse:unauthenticated"));
	}
	return Promise.reject(error);
});
function getApiErrorMessage(error, fallback = "Algo ha salido mal") {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data;
		return (data?.errors ? Object.values(data.errors)[0]?.[0] : void 0) ?? data?.mensaje ?? data?.message ?? error.message ?? fallback;
	}
	if (error instanceof Error) return error.message;
	return fallback;
}
async function login(payload) {
	const { data } = await api.post("/login", payload);
	return data;
}
async function register(payload) {
	const { data } = await api.post("/register", payload);
	return data;
}
async function logout() {
	await api.post("/logout");
}
async function fetchCurrentUser() {
	const { data } = await api.get("/user");
	return data;
}
var useAuthStore = create()(persist((set) => ({
	token: null,
	user: null,
	hydrated: false,
	setSession: (token, user) => {
		setStoredToken(token);
		set({
			token,
			user
		});
	},
	setUser: (user) => set({ user }),
	clear: () => {
		setStoredToken(null);
		set({
			token: null,
			user: null
		});
	},
	setHydrated: () => set({ hydrated: true })
}), {
	name: "techuniverse_auth",
	storage: createJSONStorage(() => localStorage),
	partialize: (state) => ({
		token: state.token,
		user: state.user
	}),
	onRehydrateStorage: () => (state) => {
		if (state?.token) localStorage.setItem(TOKEN_KEY, state.token);
		state?.setHydrated();
	}
}));
function useAuth() {
	const { token, user, hydrated, setSession, setUser, clear } = useAuthStore();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const meQuery = useQuery({
		queryKey: ["user"],
		queryFn: fetchCurrentUser,
		enabled: Boolean(token),
		retry: false
	});
	(0, import_react.useEffect)(() => {
		if (meQuery.data) setUser(meQuery.data);
	}, [meQuery.data, setUser]);
	const signIn = async (payload) => {
		const res = await login(payload);
		setSession(res.access_token, res.user);
		await queryClient.invalidateQueries();
		toast.success(res.mensaje ?? `Bienvenido de nuevo, ${res.user.name}`);
	};
	const signUp = async (payload) => {
		await register(payload);
		await signIn({
			email: payload.email,
			password: payload.password
		});
	};
	const signOut = async () => {
		try {
			await logout();
		} catch (error) {
			console.warn(getApiErrorMessage(error));
		}
		await queryClient.cancelQueries();
		queryClient.clear();
		clear();
		toast.success("Sesión cerrada");
		navigate({
			to: "/",
			replace: true
		});
	};
	return {
		user,
		token,
		hydrated,
		isAuthenticated: Boolean(token),
		isLoadingUser: meQuery.isLoading,
		signIn,
		signUp,
		signOut
	};
}
async function fetchCart() {
	const { data } = await api.get("/cesta");
	return data;
}
async function addToCart(producto_id, cantidad = 1) {
	await api.post("/cesta/productos", {
		producto_id,
		cantidad
	});
}
async function updateCartItem(producto_id, cantidad) {
	await api.put(`/cesta/productos/${producto_id}`, { cantidad });
}
async function removeCartItem(producto_id) {
	await api.delete(`/cesta/productos/${producto_id}`);
}
function useCart() {
	const token = useAuthStore((s) => s.token);
	return useQuery({
		queryKey: ["cesta"],
		queryFn: fetchCart,
		enabled: Boolean(token)
	});
}
function useCartActions() {
	const queryClient = useQueryClient();
	const token = useAuthStore((s) => s.token);
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["cesta"] });
	return {
		add: useMutation({
			mutationFn: ({ id, cantidad = 1 }) => addToCart(id, cantidad),
			onSuccess: () => {
				toast.success("Producto añadido a la cesta");
				invalidate();
			},
			onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo añadir a la cesta"))
		}),
		update: useMutation({
			mutationFn: ({ id, cantidad }) => updateCartItem(id, cantidad),
			onSuccess: invalidate,
			onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo actualizar la cantidad"))
		}),
		remove: useMutation({
			mutationFn: (id) => removeCartItem(id),
			onSuccess: () => {
				toast.success("Producto eliminado de la cesta");
				invalidate();
			},
			onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo eliminar el producto"))
		}),
		isAuthenticated: Boolean(token)
	};
}
var NAV = [
	{
		to: "/",
		label: "Inicio"
	},
	{
		to: "/productos",
		label: "Tienda"
	},
	{
		to: "/ofertas",
		label: "Ofertas"
	},
	{
		to: "/categorias",
		label: "Categorías"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user, isAuthenticated, signOut } = useAuth();
	const { data: cart } = useCart();
	const navigate = useNavigate();
	const count = cart?.cantidad_total ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "TechUniverse",
						className: "h-10 w-10 rounded-xl border border-border bg-background p-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold tracking-tight",
						children: "TechUniverse"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						activeOptions: { exact: item.to === "/" },
						activeProps: { className: "bg-secondary text-foreground" },
						inactiveProps: { className: "text-muted-foreground" },
						className: "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wishlist",
							"aria-label": "Wishlist",
							className: "inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/carrito",
							"aria-label": "Carrito",
							className: "relative inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-accent absolute right-1 top-1 min-w-4 rounded-full px-1 text-[10px] font-bold leading-4 text-accent-foreground",
								children: count
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cuenta",
							className: "hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-24 truncate",
								children: user?.name ?? "Mi cuenta"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Cerrar sesión",
							onClick: () => void signOut(),
							className: "inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" })
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({ to: "/login" }),
						className: "hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex",
						children: "Iniciar sesión"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/registro",
						className: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
						children: "Crear cuenta"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Menú",
						onClick: () => setOpen((v) => !v),
						className: "inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground md:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "border-t border-border bg-background px-4 pb-4 pt-2 md:hidden",
			children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				onClick: () => setOpen(false),
				className: "block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
				children: item.label
			}, item.to)), !isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				onClick: () => setOpen(false),
				className: "block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
				children: "Iniciar sesión"
			})]
		})]
	});
}
function Layout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function PageHeader({ eyebrow, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-rise",
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-bold sm:text-4xl",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: description
			})
		]
	});
}
//#endregion
export { useAuth as a, useCartActions as c, getApiErrorMessage as i, PageHeader as n, useAuthStore as o, api as r, useCart as s, Layout as t };
