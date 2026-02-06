"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Minus, Plus, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { ROUTES } from "@/constants/routes";

interface ProductDetailProps {
  productId: number;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-5 w-32" />
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-full sm:w-3/4" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-10 w-28" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-foreground">
            Producto no encontrado
          </p>
          <p className="text-sm text-muted-foreground">
            {error?.message ?? "El producto que estás buscando no existe."}
          </p>
        </div>
        <Link href={ROUTES.PRODUCTS}>
          <Button variant="outline" className="bg-transparent text-foreground hover:bg-secondary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={ROUTES.PRODUCTS}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card p-4 sm:p-8">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <Badge
            variant="secondary"
            className="w-fit capitalize bg-secondary text-secondary-foreground"
          >
            {product.category}
          </Badge>

          <h1 className="text-balance font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating.rate)
                      ? "fill-accent text-accent"
                      : "text-border"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {product.rating.rate}
            </span>
            <span className="text-sm text-muted-foreground">
              ({product.rating.count} reviews)
            </span>
          </div>

          <Separator className="bg-border" />

          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <Separator className="bg-border" />

          <div className="flex flex-col gap-4">
            <span className="font-sans text-3xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="flex h-10 w-12 items-center justify-center font-mono text-sm font-medium text-foreground">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
