"use client";

import { useMemo } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { useProducts } from "@/hooks/use-products";
import type { IProduct } from "@/schemas/product.schema";

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
  initialProducts?: IProduct[];
}

export function ProductGrid({
  category,
  searchQuery = "",
  initialProducts,
}: ProductGridProps) {
  const { data: products, isLoading, error, mutate } = useProducts(
    category,
    !category ? initialProducts : undefined,
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) =>
      product.title.toLowerCase().includes(query),
    );
  }, [products, searchQuery]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-16" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-foreground">
            Error al cargar productos
          </p>
          <p className="text-sm text-muted-foreground">
            {error.message ?? "Algo salió mal. Por favor, inténtalo de nuevo."}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => mutate()}
          className="bg-transparent text-foreground hover:bg-secondary"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
        <p className="text-lg font-semibold text-foreground">
          No se encontraron productos
        </p>
        <p className="text-sm text-muted-foreground">
          {searchQuery
            ? `No se encontraron resultados para "${searchQuery}". Intenta una búsqueda diferente.`
            : "Intenta seleccionando una categoría diferente."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
