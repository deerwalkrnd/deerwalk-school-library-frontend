"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoginTransitionLoader } from "../components/ui/LoginTransitionLoader";
import { PageTransitionLoader } from "../components/ui/PageTransitionLoader";
import { useAuth } from "../contexts/AuthContext";
import AuthenticatedLayout from "./AuthenticatedLayout";
import GuestLayout from "./GuestLayout";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isAuthenticated, isLoading, isLoggingIn, isLoggingOut, role } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const [isRedirecting, setIsRedirecting] = useState(false);
  const lastRedirectedPath = useRef<string | null>(null);

  const guestPrefixes = ["/login", "/auth"];
  const isGuestRoute =
    pathname === "/" ||
    guestPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated && isGuestRoute) {
      const destination =
        role === "LIBRARIAN" ? "/librarian/dashboard" : "/student/dashboard";

      if (lastRedirectedPath.current !== pathname) {
        lastRedirectedPath.current = pathname;
        if (!isRedirecting) {
          setIsRedirecting(true);
        }
        router.replace(destination);
      } else if (!isRedirecting) {
        setIsRedirecting(true);
      }
      return;
    }

    if (isRedirecting) {
      setIsRedirecting(false);
    }
    lastRedirectedPath.current = null;
  }, [
    isAuthenticated,
    isGuestRoute,
    isLoading,
    isRedirecting,
    pathname,
    role,
    router,
  ]);

  if (isLoggingIn) {
    return <LoginTransitionLoader show={true} />;
  }

  if (isLoggingOut) {
    return <LoginTransitionLoader show={true} message="Logging out...." />;
  }

  if (isLoading || isRedirecting) {
    return <PageTransitionLoader />;
  }

  return isAuthenticated ? (
    <AuthenticatedLayout>{children}</AuthenticatedLayout>
  ) : (
    <GuestLayout>{children}</GuestLayout>
  );
}
