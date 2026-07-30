import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as getApiErrorMessage, o as useAuthStore, r as api } from "./Layout-xSx8Snhf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useWishlist-CzPKqOae.js
async function fetchWishlist(userId) {
	const { data } = await api.get(`/deseos/${userId}`);
	return data.desea ?? [];
}
async function addToWishlist(producto_id) {
	await api.post("/deseos", { producto_id });
}
async function removeFromWishlist(producto_id) {
	await api.delete(`/deseos/${producto_id}`);
}
function useWishlist() {
	const user = useAuthStore((s) => s.user);
	const token = useAuthStore((s) => s.token);
	return useQuery({
		queryKey: ["deseos", user?.id],
		queryFn: () => fetchWishlist(user.id),
		enabled: Boolean(token && user?.id)
	});
}
function useWishlistActions() {
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);
	const token = useAuthStore((s) => s.token);
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["deseos", user?.id] });
	return {
		add: useMutation({
			mutationFn: (id) => addToWishlist(id),
			onSuccess: () => {
				toast.success("Añadido a tu wishlist");
				invalidate();
			},
			onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo añadir a la wishlist"))
		}),
		remove: useMutation({
			mutationFn: (id) => removeFromWishlist(id),
			onSuccess: () => {
				toast.success("Eliminado de tu wishlist");
				invalidate();
			},
			onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo eliminar de la wishlist"))
		}),
		isAuthenticated: Boolean(token)
	};
}
//#endregion
export { useWishlistActions as n, useWishlist as t };
