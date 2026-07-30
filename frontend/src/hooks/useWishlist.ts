import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";
import { getApiErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

export function useWishlist() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["deseos", user?.id],
    queryFn: () => fetchWishlist(user!.id),
    enabled: Boolean(token && user?.id),
  });
}

export function useWishlistActions() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["deseos", user?.id] });

  const add = useMutation({
    mutationFn: (id: number) => addToWishlist(id),
    onSuccess: () => {
      toast.success("Añadido a tu wishlist");
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo añadir a la wishlist")),
  });

  const remove = useMutation({
    mutationFn: (id: number) => removeFromWishlist(id),
    onSuccess: () => {
      toast.success("Eliminado de tu wishlist");
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo eliminar de la wishlist")),
  });

  return { add, remove, isAuthenticated: Boolean(token) };
}
