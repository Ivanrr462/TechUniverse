import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, LogOut, Menu, ShoppingBag, User2, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Tienda" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/categorias", label: "Categorías" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const { data: cart } = useCart();
  const navigate = useNavigate();
  const count = cart?.cantidad_total ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="TechUniverse" className="h-10 w-10 rounded-xl border border-border bg-background p-1" />
          <span className="font-display text-lg font-bold tracking-tight">TechUniverse</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Heart className="size-5" />
              </Link>
              <Link
                to="/carrito"
                aria-label="Carrito"
                className="relative inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ShoppingBag className="size-5" />
                {count > 0 && (
                  <span className="gradient-accent absolute right-1 top-1 min-w-4 rounded-full px-1 text-[10px] font-bold leading-4 text-accent-foreground">
                    {count}
                  </span>
                )}
              </Link>
              <Link
                to="/cuenta"
                className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
              >
                <User2 className="size-4" />
                <span className="max-w-24 truncate">{user?.name ?? "Mi cuenta"}</span>
              </Link>
              <button
                type="button"
                aria-label="Cerrar sesión"
                onClick={() => void signOut()}
                className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="size-5" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate({ to: "/login" })}
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Iniciar sesión
              </button>
              <Link
                to="/registro"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Crear cuenta
              </Link>
            </>
          )}
          <button
            type="button"
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
