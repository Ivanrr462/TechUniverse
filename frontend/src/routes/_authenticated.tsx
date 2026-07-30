import { useEffect } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Spinner } from "@/components/States";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !token) navigate({ to: "/login", replace: true });
  }, [hydrated, token, navigate]);

  if (!hydrated || !token) {
    return (
      <Layout>
        <Spinner label="Comprobando tu sesión…" />
      </Layout>
    );
  }

  return <Outlet />;
}
