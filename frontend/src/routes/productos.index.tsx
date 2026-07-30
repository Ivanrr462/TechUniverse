import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState, ErrorState, ProductGridSkeleton } from "@/components/States";
import { useCatalog } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useWishlist } from "@/hooks/useWishlist";
import { getApiErrorMessage } from "@/lib/api";
import type { SortOption } from "@/types";

interface CatalogSearch {
  categoria: string;
  buscar: string;
  orden: SortOption;
  page: number;
}

const ORDENES: { value: SortOption; label: string }[] = [
  { value: "novedad", label: "Novedades" },
  { value: "precio_asc", label: "Precio: menor a mayor" },
  { value: "precio_desc", label: "Precio: mayor a menor" },
];

export const Route = createFileRoute("/productos/")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    categoria: typeof search.categoria === "string" ? search.categoria : "",
    buscar: typeof search.buscar === "string" ? search.buscar : "",
    orden: ORDENES.some((o) => o.value === search.orden)
      ? (search.orden as SortOption)
      : "novedad",
    page: Number(search.page) > 0 ? Number(search.page) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de productos | TechUniverse" },
      {
        name: "description",
        content:
          "Explora todo el catálogo TechUniverse: filtra por categoría, ordena por precio o novedad y compra en segundos.",
      },
      { property: "og:title", content: "Catálogo de productos | TechUniverse" },
      {
        property: "og:description",
        content: "Filtra, ordena y descubre cientos de productos tecnológicos.",
      },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const { categoria, buscar, orden, page } = Route.useSearch();
  const navigate = Route.useNavigate();
  const categoriesQuery = useCategories();
  const { data: wishlist } = useWishlist();
  const wishIds = new Set((wishlist ?? []).map((p) => p.id));

  const catalog = useCatalog({ categoria, buscar, orden, page });

  const current: CatalogSearch = { categoria, buscar, orden, page };
  const update = (patch: Partial<CatalogSearch>) =>
    navigate({ to: "/productos", search: { ...current, page: 1, ...patch } });


  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <PageHeader
          eyebrow="Tienda"
          title="Catálogo completo"
          description={
            catalog.isLoading
              ? "Cargando productos…"
              : `${catalog.total} productos disponibles de ${catalog.totalCatalog} en total`
          }
        />

        <div className="surface-card mt-8 grid gap-4 p-5 md:grid-cols-[1fr_220px_220px]">
          <input
            type="search"
            value={buscar}
            onChange={(e) => update({ buscar: e.target.value })}
            placeholder="Buscar por nombre o descripción…"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
          <select
            value={categoria}
            onChange={(e) => update({ categoria: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          >
            <option value="">Todas las categorías</option>
            {(categoriesQuery.data ?? []).map((c) => (
              <option key={c.id} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>
          <select
            value={orden}
            onChange={(e) => update({ orden: e.target.value as SortOption })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
          >
            {ORDENES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          {catalog.isLoading ? (
            <ProductGridSkeleton count={12} />
          ) : catalog.isError ? (
            <ErrorState
              message={getApiErrorMessage(catalog.error)}
              onRetry={() => catalog.refetch()}
            />
          ) : catalog.items.length === 0 ? (
            <EmptyState
              title="No hay resultados"
              description="Prueba con otra búsqueda, categoría u orden diferente."
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {catalog.items.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} wishlisted={wishIds.has(p.id)} />
                ))}
              </div>
              <Pagination
                page={catalog.page}
                totalPages={catalog.totalPages}
                onChange={(p) => {
                  navigate({ to: "/productos", search: { ...current, page: p } });
                  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
