"use client";
import Button from "@/core/presentation/components/Button/Button";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React, { useState } from "react";
import { useForgotPassword } from "../../application/forgotPasswordUseCase";
import { useToast } from "@/core/hooks/useToast";

const ResetForm = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword({
    onSuccess: (data) => {
      useToast(
        "success",
        "Please check your email for password reset instructions.",
      );
      setEmail("");
    },
    onError: (error: any) => {
      useToast(
        "error",
        error.message || "Failed to send reset email. Please try again.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      useToast("error", "Please enter your email address.");
      return;
    }

    forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className="md:w-[50%] ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email address..."
            className="w-full px-5 py-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={forgotPasswordMutation.isPending}
          />
        </div>
        <Button
          type="submit"
          className=""
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
};

export default ResetForm;
