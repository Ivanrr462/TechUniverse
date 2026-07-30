import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addToCart, fetchCart, removeCartItem, updateCartItem } from "@/services/cart.service";
import { getApiErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

export function useCart() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["cesta"],
    queryFn: fetchCart,
    enabled: Boolean(token),
  });
}

export function useCartActions() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["cesta"] });

  const add = useMutation({
    mutationFn: ({ id, cantidad = 1 }: { id: number; cantidad?: number }) => addToCart(id, cantidad),
    onSuccess: () => {
      toast.success("Producto añadido a la cesta");
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo añadir a la cesta")),
  });

  const update = useMutation({
    mutationFn: ({ id, cantidad }: { id: number; cantidad: number }) => updateCartItem(id, cantidad),
    onSuccess: invalidate,
    onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo actualizar la cantidad")),
  });

  const remove = useMutation({
    mutationFn: (id: number) => removeCartItem(id),
    onSuccess: () => {
      toast.success("Producto eliminado de la cesta");
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, "No se pudo eliminar el producto")),
  });

  return { add, update, remove, isAuthenticated: Boolean(token) };
}
