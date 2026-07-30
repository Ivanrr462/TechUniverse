import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Layout, PageHeader } from "@/components/Layout";
import { ErrorState } from "@/components/States";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorías de productos | TechUniverse" },
      {
        name: "description",
        content:
          "Navega el catálogo TechUniverse por categorías: smartphones, portátiles, tablets, audio, televisores y más.",
      },
      { property: "og:title", content: "Categorías de productos | TechUniverse" },
      {
        property: "og:description",
        content: "Encuentra más rápido lo que buscas explorando por categoría.",
      },
    ],
  }),
  component: Categorias,
});

function Categorias() {
  const categoriesQuery = useCategories();
  const productsQuery = useProducts();
  const products = productsQuery.data ?? [];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <PageHeader
          eyebrow="Explorar"
          title="Categorías"
          description="Selecciona una categoría para filtrar el catálogo al instante."
        />

        <div className="mt-8">
          {categoriesQuery.isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : categoriesQuery.isError ? (
            <ErrorState
              message={getApiErrorMessage(categoriesQuery.error)}
              onRetry={() => categoriesQuery.refetch()}
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(categoriesQuery.data ?? []).map((c, i) => {
                const count = products.filter((p) => p.categoria?.nombre === c.nombre).length;
                return (
                  <Link
                    key={c.id}
                    to="/productos"
                    search={{ categoria: c.nombre, buscar: "", orden: "novedad", page: 1 }}
                    style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
                    className="surface-card hover-lift animate-rise group flex items-center justify-between gap-4 p-6"
                  >
                    <div>
                      <h2 className="font-display text-lg font-semibold">{c.nombre}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {productsQuery.isLoading ? "Cargando…" : `${count} productos`}
                      </p>
                    </div>
                    <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
