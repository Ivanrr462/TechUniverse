import { api } from "@/lib/api";
import type { LoginResponse, User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<{ mensaje?: string; user: User }> {
  const { data } = await api.post<{ mensaje?: string; user: User }>("/register", payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/logout");
}

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await api.get<User>("/user");
  return data;
}
