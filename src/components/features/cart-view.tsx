"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { ROUTES } from "@/constants/routes";

export function CartView() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-foreground">
            Tu carrito está vacío
          </h2>
          <p className="text-muted-foreground">
            Agrega algunos productos para comenzar.
          </p>
        </div>
        <Link href={ROUTES.PRODUCTS}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ver productos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={ROUTES.PRODUCTS}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue shopping
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="font-sans text-3xl font-bold text-foreground">
          Carrito
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="mr-1.5 h-4 w-4" />
          Limpiar todo
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.productId} className="border border-border bg-card">
              <CardContent className="flex gap-4 p-4">
                <Link
                  href={ROUTES.PRODUCT_DETAIL(item.productId)}
                  className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-card"
                >
                  {item.product?.image && (
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product?.title ?? "Product"}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={ROUTES.PRODUCT_DETAIL(item.productId)}>
                      <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground transition-colors hover:text-accent">
                        {item.product?.title}
                      </h3>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar item</span>
                    </Button>
                  </div>

                  <p className="text-xs capitalize text-muted-foreground">
                    {item.product?.category}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="flex h-8 w-10 items-center justify-center font-mono text-xs font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-sans font-bold text-card-foreground">
                      $
                      {((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit border border-border bg-card">
          <CardContent className="flex flex-col gap-4 p-6">
            <h2 className="font-sans text-lg font-semibold text-card-foreground">
              Resumen de la orden
            </h2>
            <Separator className="bg-border" />
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >
                  <span className="line-clamp-1 flex-1 text-muted-foreground">
                    {item.product?.title} x{item.quantity}
                  </span>
                  <span className="ml-4 text-card-foreground">
                    $
                    {((item.product?.price ?? 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="bg-border" />
            <div className="flex justify-between">
              <span className="font-semibold text-card-foreground">Total</span>
              <span className="font-sans text-xl font-bold text-card-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              size="lg"
              className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
