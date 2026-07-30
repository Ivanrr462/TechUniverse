import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="TechUniverse" className="h-15 w-15 rounded-xl border border-border bg-background p-1" />
            <span className="font-display text-lg font-bold">TechUniverse</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Tecnología seleccionada con criterio: smartphones, portátiles, audio y más, con envío
            rápido y garantía oficial.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Tienda</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                to="/productos"
                search={{ categoria: "", buscar: "", orden: "novedad", page: 1 }}
                className="hover:text-foreground"
              >
                Todos los productos
              </Link>

            </li>
            <li>
              <Link to="/ofertas" className="hover:text-foreground">
                Ofertas
              </Link>
            </li>
            <li>
              <Link to="/categorias" className="hover:text-foreground">
                Categorías
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Cuenta</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/login" className="hover:text-foreground">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/registro" className="hover:text-foreground">
                Registro
              </Link>
            </li>
            <li>
              <Link to="/carrito" className="hover:text-foreground">
                Mi cesta
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TechUniverse. Todos los derechos reservados.
      </div>
    </footer>
  );
}
