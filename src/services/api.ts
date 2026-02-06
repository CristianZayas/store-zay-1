import { env } from "@/config/env";
import {
  getHttpErrorMessage,
  isClientError,
  isServerError,
} from "@/constants/http-status";

export class ApiError extends Error {
  public readonly isClientError: boolean;
  public readonly isServerError: boolean;

  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.isClientError = isClientError(status);
    this.isServerError = isServerError(status);
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${env.publicApiUrl}${endpoint}`;

  let res: Response;

  try {
    res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });
  } catch {
    throw new ApiError(0, "No se pudo establecer conexion con el servidor");
  }

  if (!res.ok) {
    const message = getHttpErrorMessage(res.status);
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, init?: RequestInit) =>
    request<T>(endpoint, { ...init }),

  post: <T>(endpoint: string, body: unknown, init?: RequestInit) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...init,
    }),

  put: <T>(endpoint: string, body: unknown, init?: RequestInit) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...init,
    }),

  delete: <T>(endpoint: string, init?: RequestInit) =>
    request<T>(endpoint, { method: "DELETE", ...init }),
};
