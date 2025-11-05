"use client";

import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { LoginTransitionLoader } from "../components/ui/LoginTransitionLoader";
import { useAuth } from "../contexts/AuthContext";
import AuthenticatedLayout from "./AuthenticatedLayout";
import GuestLayout from "./GuestLayout";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isAuthenticated, isLoading, isLoggingIn, isLoggingOut } = useAuth();

  if (isLoggingIn) {
    return <LoginTransitionLoader show={true} />;
  }

  if (isLoggingOut) {
    return <LoginTransitionLoader show={true} message="Logging out...." />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? (
    <AuthenticatedLayout>{children}</AuthenticatedLayout>
  ) : (
    <GuestLayout>{children}</GuestLayout>
  );
}
