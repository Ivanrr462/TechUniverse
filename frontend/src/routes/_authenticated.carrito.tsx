import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Layout, PageHeader } from "@/components/Layout";
import { EmptyState, ErrorState, Spinner } from "@/components/States";
import { useCart, useCartActions } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/carrito")({
  head: () => ({
    meta: [
      { title: "Tu cesta | TechUniverse" },
      {
        name: "description",
        content: "Revisa los productos de tu cesta, actualiza cantidades y finaliza tu compra.",
      },
      { property: "og:title", content: "Tu cesta | TechUniverse" },
      { property: "og:description", content: "Gestiona los productos de tu cesta TechUniverse." },
    ],
  }),
  component: CarritoPage,
});

function CarritoPage() {
  const { data: cart, isLoading, isError, error, refetch } = useCart();
  const { update, remove } = useCartActions();
  const items = cart?.productos ?? [];

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <PageHeader eyebrow="Tu compra" title="Cesta" />

        <div className="mt-8">
          {isLoading ? (
            <Spinner label="Cargando tu cesta…" />
          ) : isError ? (
            <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />
          ) : items.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag className="size-8" />}
              title="Tu cesta está vacía"
              description="Añade productos desde el catálogo para verlos aquí."
              action={
                <Link
                  to="/productos"
                  search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
                  className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Ir a la tienda
                </Link>
              }
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="surface-card animate-rise flex gap-4 p-4">
                    <Link
                      to="/productos/$id"
                      params={{ id: String(item.id) }}
                      className="size-24 shrink-0 overflow-hidden rounded-lg bg-surface"
                    >
                      {item.foto && (
                        <img
                          src={item.foto}
                          alt={item.nombre}
                          className="h-full w-full object-contain p-2"
                        />
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to="/productos/$id"
                            params={{ id: String(item.id) }}
                            className="font-medium hover:text-accent"
                          >
                            {item.nombre}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.precioDescuento)} / ud.
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Eliminar"
                          onClick={() => remove.mutate(item.id)}
                          disabled={remove.isPending}
                          className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            type="button"
                            aria-label="Restar"
                            disabled={update.isPending || item.cantidad <= 1}
                            onClick={() =>
                              update.mutate({ id: item.id, cantidad: item.cantidad - 1 })
                            }
                            className="inline-flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm font-medium">
                            {update.isPending ? (
                              <Loader2 className="mx-auto size-3.5 animate-spin" />
                            ) : (
                              item.cantidad
                            )}
                          </span>
                          <button
                            type="button"
                            aria-label="Sumar"
                            disabled={update.isPending}
                            onClick={() =>
                              update.mutate({ id: item.id, cantidad: item.cantidad + 1 })
                            }
                            className="inline-flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-display font-semibold">
                          {formatPrice(item.subtotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="surface-card h-fit p-6 lg:sticky lg:top-24">
                <h2 className="font-display text-lg font-semibold">Resumen</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Artículos</dt>
                    <dd>{cart?.cantidad_total ?? 0}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Envío</dt>
                    <dd className="text-success">Gratis</dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-2xl font-bold">
                    {formatPrice(cart?.precio_total)}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Finalizar compra
                </button>
                <Link
                  to="/productos"
                  search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
                  className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
                >
                  Seguir comprando
                </Link>
              </aside>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
