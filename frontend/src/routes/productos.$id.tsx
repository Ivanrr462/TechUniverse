import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Loader2, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ErrorState, Spinner } from "@/components/States";
import { useProduct } from "@/hooks/useProducts";
import { useCartActions } from "@/hooks/useCart";
import { useWishlist, useWishlistActions } from "@/hooks/useWishlist";
import { useAuthStore } from "@/store/auth.store";
import { formatPrice } from "@/lib/format";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/productos/$id")({
  head: () => ({
    meta: [
      { title: "Detalle de producto | TechUniverse" },
      {
        name: "description",
        content:
          "Precio, descuento, stock, especificaciones técnicas y descripción completa del producto en TechUniverse.",
      },
      { property: "og:title", content: "Detalle de producto | TechUniverse" },
      {
        property: "og:description",
        content: "Ficha completa con especificaciones, stock y precio con descuento.",
      },
    ],
  }),
  component: DetalleProducto,
});

function DetalleProducto() {
  const { id } = Route.useParams();
  const { data: product, isLoading, isError, error, refetch } = useProduct(id);
  const [cantidad, setCantidad] = useState(1);
  const { add: addCart } = useCartActions();
  const { add: addWish, remove: removeWish } = useWishlistActions();
  const { data: wishlist } = useWishlist();
  const isAuthenticated = Boolean(useAuthStore((s) => s.token));
  const wishlisted = (wishlist ?? []).some((p) => p.id === Number(id));

  if (isLoading) {
    return (
      <Layout>
        <Spinner label="Cargando producto…" />
      </Layout>
    );
  }

  if (isError || !product) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <ErrorState message={getApiErrorMessage(error, "Producto no encontrado")} onRetry={() => refetch()} />
        </div>
      </Layout>
    );
  }

  const hasDiscount = product.descuento > 0;
  const outOfStock = product.stock <= 0;

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link
          to="/productos"
          search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Volver al catálogo
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="surface-card animate-rise flex aspect-square items-center justify-center overflow-hidden bg-surface p-8">
            {product.foto ? (
              <img
                src={product.foto}
                alt={product.nombre}
                className="max-h-full w-full object-contain"
              />
            ) : (
              <span className="text-muted-foreground">Sin imagen</span>
            )}
          </div>

          <div className="animate-rise">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {product.categoria?.nombre ?? "TechUniverse"}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{product.nombre}</h1>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <span className="font-display text-4xl font-bold">
                {formatPrice(product.precioDescuento)}
              </span>
              {hasDiscount && (
                <>
                  <span className="pb-1 text-lg text-muted-foreground line-through">
                    {formatPrice(product.precio)}
                  </span>
                  <span className="gradient-accent mb-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    -{product.descuento}%
                  </span>
                </>
              )}
            </div>

            <p
              className={`mt-3 text-sm font-medium ${outOfStock ? "text-destructive" : "text-success"}`}
            >
              {outOfStock ? "Sin stock disponible" : `${product.stock} unidades en stock`}
            </p>

            <p className="mt-5 leading-relaxed text-muted-foreground">{product.descripcion}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  type="button"
                  aria-label="Restar"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-medium">{cantidad}</span>
                <button
                  type="button"
                  aria-label="Sumar"
                  onClick={() => setCantidad((c) => Math.min(product.stock || 99, c + 1))}
                  className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={outOfStock || addCart.isPending}
                onClick={() => addCart.mutate({ id: product.id, cantidad })}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 sm:flex-none"
              >
                {addCart.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ShoppingBag className="size-4" />
                )}
                Añadir a la cesta
              </button>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() =>
                    wishlisted ? removeWish.mutate(product.id) : addWish.mutate(product.id)
                  }
                  disabled={addWish.isPending || removeWish.isPending}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                >
                  <Heart className={`size-4 ${wishlisted ? "fill-accent text-accent" : ""}`} />
                  {wishlisted ? "En tu wishlist" : "Wishlist"}
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Truck className="size-4 text-accent" /> Envío 24/48h
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-accent" /> Garantía 2 años
              </span>
            </div>

            {product.especificaciones && product.especificaciones.length > 0 && (
              <div className="surface-card mt-8 overflow-hidden">
                <h2 className="border-b border-border px-5 py-4 font-display text-base font-semibold">
                  Especificaciones
                </h2>
                <dl className="divide-y divide-border">
                  {product.especificaciones.map((spec) => (
                    <div key={spec.nombre} className="flex justify-between gap-6 px-5 py-3 text-sm">
                      <dt className="text-muted-foreground">{spec.nombre}</dt>
                      <dd className="text-right font-medium">{spec.valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
