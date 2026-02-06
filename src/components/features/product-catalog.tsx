"use client";

import { useState } from "react";
import { CategoryFilter } from "./category-filter";
import { ProductGrid } from "./product-grid";
import { SearchBar } from "./search-bar";
import type { Product } from "@/schemas/product.schema";

interface ProductCatalogProps {
  initialProducts?: Product[];
  initialCategories?: string[];
}

export function ProductCatalog({
  initialProducts,
  initialCategories,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Productos
            </h1>
            <p className="text-muted-foreground">
              Navega por nuestra colección de productos.
            </p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          initialCategories={initialCategories}
        />
      </div>
      <ProductGrid
        category={selectedCategory}
        searchQuery={searchQuery}
        initialProducts={initialProducts}
      />
    </div>
  );
}
