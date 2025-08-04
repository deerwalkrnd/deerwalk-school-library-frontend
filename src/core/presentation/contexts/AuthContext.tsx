"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/modules/Authentication/domain/entities/userEntity";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user?: User) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await fetchUserData(token);
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (token: string) => {
    try {
      // Call your API to get user data
      const response = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  };

  const login = async (token: string, userData?: User) => {
    try {
      localStorage.setItem("authToken", token);

      await fetchUserData(token);

      // Redirect to dashboard after successful login
      router.push("/student/dashboard");
    } catch (error) {
      localStorage.removeItem("authToken");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/login");
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      await fetchUserData(token);
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be used withtin an AuthProvider");
  }
  return context;
};
