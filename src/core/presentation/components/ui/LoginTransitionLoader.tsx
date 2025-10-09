"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginTransitionLoaderProps {
  show: boolean;
  message?: string;
  className?: string;
}

export function LoginTransitionLoader({
  show,
  message = "Signing you in...",
  className,
}: LoginTransitionLoaderProps) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-white/95 backdrop-blur-sm dark:bg-gray-900/95",
        "transition-all duration-300 ease-in-out",
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-4 p-8 rounded-lg">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {message}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Please wait while we redirect you
          </p>
        </div>
      </div>
    </div>
  );
}
