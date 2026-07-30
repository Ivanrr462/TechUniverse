import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Layout, PageHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState, ErrorState, ProductGridSkeleton } from "@/components/States";
import { useWishlist } from "@/hooks/useWishlist";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/wishlist")({
  head: () => ({
    meta: [
      { title: "Tu wishlist | TechUniverse" },
      {
        name: "description",
        content: "Consulta y gestiona los productos que has guardado en tu lista de deseos.",
      },
      { property: "og:title", content: "Tu wishlist | TechUniverse" },
      { property: "og:description", content: "Tus productos favoritos guardados en TechUniverse." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { data, isLoading, isError, error, refetch } = useWishlist();
  const items = data ?? [];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <PageHeader
          eyebrow="Favoritos"
          title="Tu wishlist"
          description={isLoading ? "Cargando…" : `${items.length} productos guardados`}
        />
        <div className="mt-8">
          {isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : isError ? (
            <ErrorState message={getApiErrorMessage(error)} onRetry={() => refetch()} />
          ) : items.length === 0 ? (
            <EmptyState
              icon={<Heart className="size-8" />}
              title="Tu wishlist está vacía"
              description="Guarda productos con el corazón para encontrarlos aquí más tarde."
              action={
                <Link
                  to="/productos"
                  search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
                  className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Explorar productos
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} wishlisted />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
