"use client";

import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { create } from "zustand";
import { toast } from "sonner";
import type { IProduct } from "@/schemas/product.schema";

interface CartItem extends IProduct {
  quantity: number;
}

const CART_KEY = "cart";

// ✅ Obtener carrito seguro desde localStorage
function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const { data: items = [], mutate } = useSWR<CartItem[]>(
    CART_KEY,
    getInitialCart,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  // ✅ Persistir carrito automáticamente
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items]);

  //--------------------------------------------

  const addItem = useCallback(
    (product: Product) => {
      mutate((current = []) => {

        const existing = current.find(
          (item) => item.productId === product.id,
        );

        // ✅ Validar stock
        if (existing && existing.quantity >= product.stock) {
          toast.error("No hay más unidades disponibles");
          return current;
        }

        // ✅ Incrementar cantidad sin duplicar
        if (existing) {
          return current.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        // ✅ Agregar nuevo producto
        return [...current, { productId: product.id, quantity: 1, product }];
      }, false);

      toast.success("Added to cart", {
        description: product.title,
      });
    },
    [mutate],
  );

  //--------------------------------------------

  const removeItem = useCallback(
    (productId: number) => {
      mutate(
        (current = []) =>
          current.filter((item) => item.productId !== productId),
        false,
      );
      toast("Item removed from cart");
    },
    [mutate],
  );

  //--------------------------------------------

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId);
        return;
      }

      mutate(
        (current = []) =>
          current.map((item) =>
            item.productId === productId
              ? { ...item, quantity }
              : item,
          ),
        false,
      );
    },
    [mutate, removeItem],
  );

  //--------------------------------------------

  const clearCart = useCallback(() => {
    mutate([], false);
    toast("Cart cleared");
  }, [mutate]);

  //--------------------------------------------

  const safeItems = items ?? [];
  const totalItems = safeItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const totalPrice = safeItems.reduce(
    (sum, item) =>
      sum + (item.product?.price ?? 0) * item.quantity,
    0,
  );

  //--------------------------------------------

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    safeItems,
    totalItems,
    totalPrice,
  };
}
