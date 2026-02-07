import { api } from "./api";
import type { User, LoginRequest, LoginResponse, RegisterRequest } from "@/schemas/user.schema";

export const userService = {
  getAll: (page: number = 1, limit: number = 5, init?: RequestInit) => {
    const params = new URLSearchParams();
    params.append("_page", page.toString());
    params.append("_limit", limit.toString());
    return api.get<User[]>(`/users?${params.toString()}`, init);
  },

  getById: (id: number, init?: RequestInit) =>
    api.get<User>(`/users/${id}`, init),

  create: (user: Omit<User, "id">, init?: RequestInit) =>
    api.post<User>("/users", user, init),

  update: (id: number, user: Partial<User>, init?: RequestInit) =>
    api.put<User>(`/users/${id}`, user, init),

  delete: (id: number, init?: RequestInit) =>
    api.delete<User>(`/users/${id}`, init),

  login: (credentials: LoginRequest, init?: RequestInit) =>
    api.post<LoginResponse>("/auth/login", credentials, init),

  register: (credentials: RegisterRequest, init?: RequestInit) =>
    api.post<LoginResponse>("/users", credentials, init),
};
