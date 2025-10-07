"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/modules/Authentication/domain/entities/userEntity";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingIn: boolean;
  login: (token: string, user?: User) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  role: "LIBRARIAN" | "STUDENT";
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; samesite=strict`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length == 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [role, setRole] = useState<"LIBRARIAN" | "STUDENT">("LIBRARIAN");
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = getCookie("authToken");
      if (token) {
        await fetchUserData(token);
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      deleteCookie("authToken");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setRole(userData.role);
        return userData;
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
      setIsLoggingIn(true);

      setCookie("authToken", token, 7);
      const user = await fetchUserData(token);

      // Small delay to ensure the loading state is visible
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (user.role == "LIBRARIAN") {
        router.push("/librarian/dashboard");
      } else if (user.role === "STUDENT") {
        router.push("/student/dashboard");
      }

      setTimeout(() => setIsLoggingIn(false), 500);
    } catch (error) {
      setIsLoggingIn(false);
      deleteCookie("authToken");
      throw error;
    }
  };

  const logout = () => {
    deleteCookie("authToken");
    setUser(null);
    router.push("/login");
  };

  const refreshUser = async () => {
    const token = getCookie("authToken");
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
    isLoggingIn,
    role,
    login,
    logout,
    refreshUser,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
