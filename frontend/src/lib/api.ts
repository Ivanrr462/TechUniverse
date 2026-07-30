import axios from "axios";

export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "https://ivan123.alwaysdata.net/api";

export const TOKEN_KEY = "techuniverse_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

// Attach the Bearer token automatically on every request.
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise API errors and clear invalid sessions.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      setStoredToken(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("techuniverse:unauthenticated"));
      }
    }
    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown, fallback = "Algo ha salido mal") {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; mensaje?: string; errors?: Record<string, string[]> }
      | undefined;
    const firstValidation = data?.errors ? Object.values(data.errors)[0]?.[0] : undefined;
    return firstValidation ?? data?.mensaje ?? data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
