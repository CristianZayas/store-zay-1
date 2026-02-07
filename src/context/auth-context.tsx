"use client";

import React, {
  createContext,
  useContext,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { LoginRequest } from "@/schemas/user.schema";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  token: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { ReactNode }) {
  const { isAuthenticated, login, logout, token, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const publicRoutes = ["/login", "/register", "/"];

      if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        router.push("/login");
      } else if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
        router.push("/profile");
      }
    }
  }, [isAuthenticated, pathname, router, loading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
