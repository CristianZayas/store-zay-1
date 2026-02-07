"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Store, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { ROUTES } from "@/constants/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, logout, loading } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 font-sans text-base font-bold tracking-tight text-foreground sm:text-lg"
        >
          <Store className="h-5 w-5 sm:h-6 sm:w-6" />
          <span>Store Zay</span>
        </Link>

        <nav className="hidden items-center gap-6 font-sans text-sm md:flex">
          <Link
            href={ROUTES.HOME}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </Link>
          <Link
            href={ROUTES.PRODUCTS}
            className="text-muted-foreground transition-colors hover:text-foreground hover:font-bold hover:bg-white"
          >
            Productos
          </Link>
          {loading ? (
            <Skeleton className="h-9 w-24" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <User className="mr-2 h-4 w-4" /> Perfil
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.PROFILE}>Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.USERS}>Usuarios</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="text-muted-foreground transition-colors hover:text-foreground hover:font-bold hover:bg-white"
            >
              Iniciar Sesión
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-1">
          <Link href={ROUTES.CART}>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-xs text-accent-foreground">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href={ROUTES.HOME}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href={ROUTES.PRODUCTS}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>
            {loading ? (
              <Skeleton className="h-9 w-full" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href={ROUTES.PROFILE}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  href={ROUTES.USERS}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Usuarios
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:font-bold"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link
                href={ROUTES.LOGIN}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
