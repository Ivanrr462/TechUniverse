import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/api";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta | TechUniverse" },
      {
        name: "description",
        content:
          "Crea tu cuenta gratuita en TechUniverse y guarda productos en tu wishlist y tu cesta de compra.",
      },
      { property: "og:title", content: "Crear cuenta | TechUniverse" },
      { property: "og:description", content: "Regístrate en TechUniverse en menos de un minuto." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 3) next.name = "Introduce tu nombre completo";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Introduce un email válido";
    if (form.password.length < 8) next.password = "Mínimo 8 caracteres";
    if (form.password !== form.confirm) next.confirm = "Las contraseñas no coinciden";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await signUp({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.confirm,
      });
      navigate({ to: "/cuenta" });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "No se pudo completar el registro"));
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name" as const, label: "Nombre", type: "text", placeholder: "Ada Lovelace" },
    { key: "email" as const, label: "Email", type: "email", placeholder: "tu@email.com" },
    { key: "password" as const, label: "Contraseña", type: "password", placeholder: "••••••••" },
    { key: "confirm" as const, label: "Repetir contraseña", type: "password", placeholder: "••••••••" },
  ];

  return (
    <Layout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <div className="animate-rise surface-card p-8">
          <span className="gradient-accent inline-flex size-10 items-center justify-center rounded-xl text-accent-foreground">
            <Sparkles className="size-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Guarda favoritos, gestiona tu cesta y compra más rápido.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
            {fields.map((f) => (
              <div key={f.key}>
                <label htmlFor={f.key} className="text-sm font-medium">
                  {f.label}
                </label>
                <input
                  id={f.key}
                  type={f.type}
                  value={form[f.key]}
                  onChange={set(f.key)}
                  placeholder={f.placeholder}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
                {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Crear cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
