"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/schemas/user.schema";
import { userService } from "@/services/user.service";
import { ApiError } from "@/services/api";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      setLoading(false); // Set loading to false after checking localStorage
    };
    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      const response = await userService.login(credentials);
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setIsAuthenticated(true);
      router.push("/profile");
      return { success: true };
    } catch (err) {
      if (err instanceof ApiError) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "An unexpected error occurred." };
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  return {
    token,
    isAuthenticated,
    login,
    logout,
    loading, // Expose loading state
  };
}
