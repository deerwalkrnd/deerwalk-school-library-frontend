"use client";

import Button from "@/core/presentation/components/Button/Button";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React, { useState, useEffect } from "react";
import { useResetPassword } from "../../application/resetPasswordUseCase";
import { useToast } from "@/core/hooks/useToast";
import { useRouter, useSearchParams } from "next/navigation";

const NewPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordMutation = useResetPassword({
    onSuccess: (data) => {
      useToast(
        "success",
        "Password reset successfully! You can now log in with your new password.",
      );
      router.push("/login");
    },
    onError: (error: any) => {
      useToast(
        "error",
        error.message || "Failed to reset password. Please try again.",
      );
    },
  });

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      useToast("error", "Invalid reset link. Token is missing.");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      useToast("error", "Invalid reset link. Token is missing.");
      return;
    }

    if (!newPassword) {
      useToast("error", "Please enter a new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      useToast("error", "Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      useToast("error", "Password must be at least 8 characters long.");
      return;
    }

    resetPasswordMutation.mutate({ token, newPassword });
  };

  return (
    <div className="md:w-[50%]  ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-3">
          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="Enter a secure password..."
            className="w-full px-5 py-6"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={resetPasswordMutation.isPending}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Confirm New Password</Label>
          <Input
            type="password"
            placeholder="Re-enter your password..."
            className="w-full px-5 py-6"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={resetPasswordMutation.isPending}
          />
        </div>
        <Button
          type="submit"
          disabled={resetPasswordMutation.isPending || !token}
        >
          {resetPasswordMutation.isPending
            ? "Changing Password..."
            : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default NewPasswordForm;
