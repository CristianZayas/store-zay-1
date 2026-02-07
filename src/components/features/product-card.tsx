"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ROUTES } from "@/constants/routes";
import type { IProduct } from "@/schemas/product.schema";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <Card className="group flex flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-lg">
      <Link href={ROUTES.PRODUCT_DETAIL(product.id)} className="relative aspect-square overflow-hidden bg-card p-6">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <Link href={ROUTES.PRODUCT_DETAIL(product.id)}>
          <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-card-foreground transition-colors hover:text-accent">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-card-foreground">
            {product.rating.rate}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.rating.count})
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-sans text-lg font-bold text-card-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
