"use client";

import useSWR from "swr";
import { toast } from "sonner";
import { productService } from "@/services/product.service";
import { ApiError } from "@/services/api";
import type { IProduct } from "@/schemas/product.schema";

function handleSwrError(error: unknown) {
  const message =
    error instanceof ApiError
      ? error.message
      : "An unexpected error occurred.";
  toast.error("Error", { description: message });
}

export function useProducts(category?: string, fallbackData?: IProduct[]) {
  return useSWR(
    category ? `/products/category/${category}` : "/products",
    () =>
      category
        ? productService.getByCategory(category)
        : productService.getAll(),
    {
      fallbackData,
      onError: handleSwrError,
    },
  );
}

export function useProduct(id: number) {
  return useSWR(`/products/${id}`, () => productService.getById(id), {
    onError: handleSwrError,
  });
}

export function useCategories(fallbackData?: string[]) {
  return useSWR(
    "/products/categories",
    () => productService.getCategories(),
    {
      fallbackData,
      onError: handleSwrError,
    },
  );
}
