import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión | TechUniverse" },
      {
        name: "description",
        content: "Accede a tu cuenta TechUniverse para gestionar tu cesta, tu wishlist y tus datos.",
      },
      { property: "og:title", content: "Iniciar sesión | TechUniverse" },
      { property: "og:description", content: "Entra en tu cuenta TechUniverse." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Introduce un email válido";
    if (password.length < 6) next.password = "Mínimo 6 caracteres";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await signIn({ email, password });
      navigate({ to: "/cuenta" });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Credenciales incorrectas"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <div className="animate-rise surface-card p-8">
          <span className="gradient-accent inline-flex size-10 items-center justify-center rounded-xl text-accent-foreground">
            <Sparkles className="size-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">Bienvenido de nuevo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión para acceder a tu cesta y tu wishlist.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Iniciar sesión
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="font-medium text-accent hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
