import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { setStoredToken, TOKEN_KEY } from "@/lib/api";
import type { User } from "@/types";

interface AuthState {
  token: string | null;
  user: User | null;
  hydrated: boolean;
  setSession: (token: string, user: User) => void;
  setUser: (user: User | null) => void;
  clear: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,
      setSession: (token, user) => {
        setStoredToken(token);
        set({ token, user });
      },
      setUser: (user) => set({ user }),
      clear: () => {
        setStoredToken(null);
        set({ token: null, user: null });
      },
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "techuniverse_auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        // Keep the raw token key in sync for the axios interceptor.
        if (state?.token) localStorage.setItem(TOKEN_KEY, state.token);
        state?.setHydrated();
      },
    },
  ),
);

export const useIsAuthenticated = () => useAuthStore((s) => Boolean(s.token));
