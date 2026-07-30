import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState, ErrorState, ProductGridSkeleton } from "@/components/States";
import { useCatalog } from "@/hooks/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas y descuentos | TechUniverse" },
      {
        name: "description",
        content:
          "Todos los productos rebajados de TechUniverse con su descuento aplicado: ahorra en tecnología de primeras marcas.",
      },
      { property: "og:title", content: "Ofertas y descuentos | TechUniverse" },
      {
        property: "og:description",
        content: "Descuentos activos en smartphones, portátiles, audio y más.",
      },
    ],
  }),
  component: Ofertas,
});

function Ofertas() {
  const [page, setPage] = useState(1);
  const catalog = useCatalog({ orden: "precio_desc", page, soloOfertas: true, pageSize: 12 });
  const { data: wishlist } = useWishlist();
  const wishIds = new Set((wishlist ?? []).map((p) => p.id));

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <PageHeader
          eyebrow="Descuentos"
          title="Ofertas activas"
          description={
            catalog.isLoading ? "Buscando descuentos…" : `${catalog.total} productos rebajados`
          }
        />
        <div className="mt-8">
          {catalog.isLoading ? (
            <ProductGridSkeleton count={12} />
          ) : catalog.isError ? (
            <ErrorState message={getApiErrorMessage(catalog.error)} onRetry={() => catalog.refetch()} />
          ) : catalog.items.length === 0 ? (
            <EmptyState title="No hay ofertas ahora mismo" description="Vuelve pronto, actualizamos los descuentos con frecuencia." />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {catalog.items.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} wishlisted={wishIds.has(p.id)} />
                ))}
              </div>
              <Pagination page={catalog.page} totalPages={catalog.totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
