import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, LogOut, Mail, ShoppingBag, User2 } from "lucide-react";
import { Layout, PageHeader } from "@/components/Layout";
import { Spinner } from "@/components/States";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/cuenta")({
  head: () => ({
    meta: [
      { title: "Mi cuenta | TechUniverse" },
      {
        name: "description",
        content: "Consulta tus datos de usuario, el estado de tu cesta y tu lista de deseos.",
      },
      { property: "og:title", content: "Mi cuenta | TechUniverse" },
      { property: "og:description", content: "Panel de usuario de TechUniverse." },
    ],
  }),
  component: CuentaPage,
});

function CuentaPage() {
  const { user, isLoadingUser, signOut } = useAuth();
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <PageHeader eyebrow="Panel" title="Mi cuenta" />

        {isLoadingUser && !user ? (
          <Spinner label="Cargando tus datos…" />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="surface-card animate-rise p-6 md:col-span-3">
              <div className="flex flex-wrap items-center gap-4">
                <span className="gradient-accent inline-flex size-14 items-center justify-center rounded-2xl text-accent-foreground">
                  <User2 className="size-6" />
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold">{user?.name}</h2>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4" /> {user?.email}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide">
                  {user?.rol ?? "usuario"}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-destructive hover:text-destructive"
                >
                  <LogOut className="size-4" /> Cerrar sesión
                </button>
              </div>
            </div>

            <Link
              to="/carrito"
              className="surface-card hover-lift animate-rise flex items-center gap-4 p-6"
            >
              <ShoppingBag className="size-6 text-accent" />
              <div>
                <p className="font-display text-lg font-semibold">
                  {cart?.cantidad_total ?? 0} artículos
                </p>
                <p className="text-sm text-muted-foreground">
                  Total {formatPrice(cart?.precio_total)}
                </p>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="surface-card hover-lift animate-rise flex items-center gap-4 p-6"
            >
              <Heart className="size-6 text-accent" />
              <div>
                <p className="font-display text-lg font-semibold">
                  {wishlist?.length ?? 0} favoritos
                </p>
                <p className="text-sm text-muted-foreground">Tu lista de deseos</p>
              </div>
            </Link>

            <Link
              to="/productos"
              search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
              className="surface-card hover-lift animate-rise flex items-center gap-4 p-6"
            >
              <User2 className="size-6 text-accent" />
              <div>
                <p className="font-display text-lg font-semibold">Seguir comprando</p>
                <p className="text-sm text-muted-foreground">Explorar el catálogo</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
