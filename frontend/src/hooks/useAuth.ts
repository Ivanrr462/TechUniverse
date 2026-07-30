import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { fetchCurrentUser, login, logout, register } from "@/services/auth.service";
import type { LoginPayload, RegisterPayload } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { getApiErrorMessage } from "@/lib/api";

export function useAuth() {
  const { token, user, hydrated, setSession, setUser, clear } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (meQuery.data) setUser(meQuery.data);
  }, [meQuery.data, setUser]);

  const signIn = async (payload: LoginPayload) => {
    const res = await login(payload);
    setSession(res.access_token, res.user);
    await queryClient.invalidateQueries();
    toast.success(res.mensaje ?? `Bienvenido de nuevo, ${res.user.name}`);
  };

  const signUp = async (payload: RegisterPayload) => {
    await register(payload);
    await signIn({ email: payload.email, password: payload.password });
  };

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn(getApiErrorMessage(error));
    }
    await queryClient.cancelQueries();
    queryClient.clear();
    clear();
    toast.success("Sesión cerrada");
    navigate({ to: "/", replace: true });
  };

  return {
    user,
    token,
    hydrated,
    isAuthenticated: Boolean(token),
    isLoadingUser: meQuery.isLoading,
    signIn,
    signUp,
    signOut,
  };
}
