import { api } from "./api";
import type { IProduct } from "@/schemas/product.schema";

export const productService = {
  getAll: (init?: RequestInit) => api.get<IProduct[]>("/products", init),

  getById: (id: number, init?: RequestInit) =>
    api.get<IProduct>(`/products/${id}`, init),

  getCategories: (init?: RequestInit) =>
    api.get<string[]>("/products/categories", init),

  getByCategory: (category: string, init?: RequestInit) =>
    api.get<IProduct[]>(`/products/category/${category}`, init),
};
