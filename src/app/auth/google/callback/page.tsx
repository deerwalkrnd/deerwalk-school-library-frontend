"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleCallback } from "@/modules/Authentication/application/loginUseCase";
import { useAuth } from "@/core/presentation/contexts/AuthContext";
import { showToast } from "@/core/lib/showToast";
import { LoadingSpinner } from "@/core/presentation/components/ui/LoadingSpinner";

const GoogleCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const processedRef = useRef(false);

  const { mutate: handleGoogleCallback, isPending } = useGoogleCallback({
    onSuccess: async (data) => {
      if (data.token) {
        await authLogin(data.token);
        showToast("success", "Successfully logged in with Google!");
        router.replace("/");
      } else {
        showToast("error", "Google login failed. Please try again.");
        router.replace("/login");
      }
    },
    onError: (error) => {
      error;
      showToast("error", "Google login failed. Please try again.");
      router.replace("/login");
    },
  });

  useEffect(() => {
    if (!code) {
      showToast("error", "Missing authorization code.");
      router.replace("/login");
      return;
    }

    if (processedRef.current) {
      return;
    }

    processedRef.current = true;
    handleGoogleCallback(code);
  }, [code, handleGoogleCallback, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <LoadingSpinner className="w-12 h-12 animate-spin mx-auto" />
        <p className="text-lg font-medium text-gray-900">
          {isPending
            ? "Completing Google sign-in..."
            : "Finalising Google sign-in..."}
        </p>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
