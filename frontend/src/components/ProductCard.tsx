import { Link } from "@tanstack/react-router";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCartActions } from "@/hooks/useCart";
import { useWishlistActions } from "@/hooks/useWishlist";
import { useAuthStore } from "@/store/auth.store";
import type { Producto } from "@/types";

interface Props {
  product: Producto;
  wishlisted?: boolean;
  index?: number;
}

export function ProductCard({ product, wishlisted, index = 0 }: Props) {
  const { add: addCart } = useCartActions();
  const { add: addWish, remove: removeWish } = useWishlistActions();
  const isAuthenticated = Boolean(useAuthStore((s) => s.token));

  const hasDiscount = product.descuento > 0;
  const outOfStock = product.stock <= 0;
  const wishPending = addWish.isPending || removeWish.isPending;

  return (
    <article
      className="surface-card hover-lift animate-rise group flex flex-col overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <Link
        to="/productos/$id"
        params={{ id: String(product.id) }}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        {product.foto ? (
          <img
            src={product.foto}
            alt={product.nombre}
            loading="lazy"
            className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sin imagen
          </div>
        )}
        {hasDiscount && (
          <span className="gradient-accent absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            -{product.descuento}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-ink-foreground">
            Agotado
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.categoria?.nombre ?? "TechUniverse"}
          </p>
          <Link
            to="/productos/$id"
            params={{ id: String(product.id) }}
            className="mt-1 line-clamp-2 block font-display text-base font-semibold transition-colors hover:text-accent"
          >
            {product.nombre}
          </Link>
        </div>

        <div className="flex items-end gap-2">
          <span className="font-display text-lg font-bold">
            {formatPrice(product.precioDescuento)}
          </span>
          {hasDiscount && (
            <span className="pb-0.5 text-sm text-muted-foreground line-through">
              {formatPrice(product.precio)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={outOfStock || addCart.isPending}
            onClick={() => addCart.mutate({ id: product.id })}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addCart.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ShoppingBag className="size-4" />
            )}
            Añadir
          </button>
          {isAuthenticated && (
            <button
              type="button"
              aria-label={wishlisted ? "Quitar de la wishlist" : "Añadir a la wishlist"}
              disabled={wishPending}
              onClick={() =>
                wishlisted ? removeWish.mutate(product.id) : addWish.mutate(product.id)
              }
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              <Heart className={`size-4 ${wishlisted ? "fill-accent text-accent" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
