import { api } from "./api";
import type { Product } from "@/schemas/product.schema";

export const productService = {
  getAll: (init?: RequestInit) => api.get<Product[]>("/products", init),

  getById: (id: number, init?: RequestInit) =>
    api.get<Product>(`/products/${id}`, init),

  getCategories: (init?: RequestInit) =>
    api.get<string[]>("/products/categories", init),

  getByCategory: (category: string, init?: RequestInit) =>
    api.get<Product[]>(`/products/category/${category}`, init),
};
