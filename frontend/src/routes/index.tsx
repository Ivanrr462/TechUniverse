import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgePercent, ShieldCheck, Truck } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState, ErrorState, ProductGridSkeleton } from "@/components/States";
import { useCatalog, useProducts, sortProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useWishlist } from "@/hooks/useWishlist";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechUniverse — Tecnología premium con envío rápido" },
      {
        name: "description",
        content:
          "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial.",
      },
      { property: "og:title", content: "TechUniverse — Tecnología premium con envío rápido" },
      {
        property: "og:description",
        content: "Descubre el catálogo TechUniverse: smartphones, portátiles, audio y televisores con ofertas exclusivas y garantía oficial.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const productsQuery = useProducts();
  const categoriesQuery = useCategories();
  const { data: wishlist } = useWishlist();
  const wishIds = new Set((wishlist ?? []).map((p) => p.id));

  const all = productsQuery.data ?? [];
  const offers = sortProducts(
    all.filter((p) => p.descuento > 0),
    "precio_desc",
  ).slice(0, 4);
  const novedades = useCatalog({ orden: "novedad", page: 1, pageSize: 8 });

  return (
    <Layout>
      <section className="gradient-hero relative overflow-hidden text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
              Nueva temporada
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">
              Tecnología que <span className="text-accent">merece la pena</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-ink-foreground/75">
              {productsQuery.isLoading
                ? "Cargando catálogo…"
                : `${all.length} productos seleccionados`}{" "}
              entre smartphones, portátiles, audio y hogar. Precios claros, ofertas reales y entrega
              en 24/48h.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/productos"
                search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
                className="gradient-accent inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Explorar tienda <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/ofertas"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Ver ofertas
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm">
              <div>
                <dt className="text-ink-foreground/60">Productos</dt>
                <dd className="font-display text-xl font-bold">{all.length || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">En oferta</dt>
                <dd className="font-display text-xl font-bold">
                  {all.filter((p) => p.descuento > 0).length || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-ink-foreground/60">Categorías</dt>
                <dd className="font-display text-xl font-bold">
                  {categoriesQuery.data?.length ?? "—"}
                </dd>
              </div>
            </dl>
          </div>
          <div className="animate-rise relative">
            <img
              src={heroImage}
              alt="Selección de dispositivos tecnológicos de TechUniverse"
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Envío 24/48h", text: "Gratis en pedidos superiores a 50 €" },
            { icon: ShieldCheck, title: "Garantía oficial", text: "2 años en todos los productos" },
            { icon: BadgePercent, title: "Ofertas reales", text: "Descuentos aplicados al instante" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="surface-card flex items-start gap-3 p-5">
              <Icon className="mt-0.5 size-5 text-accent" />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Ofertas destacadas
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              Precios rebajados hoy
            </h2>
          </div>
          <Link
            to="/ofertas"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            Ver todas <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6">
          {productsQuery.isLoading ? (
            <ProductGridSkeleton count={4} />
          ) : productsQuery.isError ? (
            <ErrorState
              message={getApiErrorMessage(productsQuery.error)}
              onRetry={() => productsQuery.refetch()}
            />
          ) : offers.length === 0 ? (
            <EmptyState title="Sin ofertas activas" description="Vuelve pronto para nuevos descuentos." />
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {offers.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} wishlisted={wishIds.has(p.id)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Compra por categoría</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {categoriesQuery.isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-11 w-32 animate-pulse rounded-full bg-muted" />
              ))
            : (categoriesQuery.data ?? []).map((c) => (
                <Link
                  key={c.id}
                  to="/productos"
                  search={{ categoria: c.nombre, orden: "novedad", page: 1, buscar: "" }}
                  className="surface-card hover-lift px-5 py-3 text-sm font-medium"
                >
                  {c.nombre}
                </Link>
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Novedades del catálogo</h2>
          <Link
            to="/productos"
            search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            Ver catálogo <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6">
          {novedades.isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {novedades.items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} wishlisted={wishIds.has(p.id)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
