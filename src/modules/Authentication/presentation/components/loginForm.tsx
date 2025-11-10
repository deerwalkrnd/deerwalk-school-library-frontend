"use client";
import GoogleIcon from "@/core/presentation/assets/icons/GoogleIcon";
import Button from "@/core/presentation/components/Button/Button";
import OrDivider from "@/core/presentation/components/Divider/OrDivider";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React, { useState } from "react";
import { useLogin, useSSOLogin } from "../../application/loginUseCase";
import { UserRequest } from "../../domain/entities/userEntity";
import { useAuth } from "@/core/presentation/contexts/AuthContext";
import { useToast } from "@/core/hooks/useToast";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();

  const {
    mutate: login,
    isPending,
    error,
  } = useLogin({
    onSuccess: async (data) => {
      if (data.token) {
        await authLogin(data.token);
        useToast("success", "logged in successfully");
      }
    },
    onError: (e) => {
      e;
      useToast("error", e.message);
    },
  });

  const { mutate: ssoLogin, isPending: isSSOPending } = useSSOLogin({
    onSuccess: async (data) => {
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.token) {
        try {
          await authLogin(data.token);
          useToast("success", "Successfully logged in with Google!");
        } finally {
          setIsGoogleSigningIn(false);
        }
        return;
      }
    },
    onError: (e) => {
      e;
      useToast("error", e.message);
      setIsGoogleSigningIn(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: UserRequest = {
      email: username,
      password: password,
    };
    login(credentials);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleSigningIn(true);
    ssoLogin("GOOGLE");
  };

  error;
  return (
    <div className="flex flex-col  ">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            className="px-5 py-6 selection:text-primary "
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="px-5 py-6 pr-12 selection:text-primary"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex flex-row justify-end">
            <a href="/auth/forgot-password">
              <span className="font-medium underline text-xs md:text-sm">
                Forgot password?
              </span>
            </a>
          </div>
        </div>

        <Button
          className="mt-8"
          type="submit"
          disabled={isPending || isSSOPending || isGoogleSigningIn}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <OrDivider />
      <Button
        className="bg-white ring-1 p-3 rounded-md font-bold ring-gray-300 text-black"
        onClick={handleGoogleSignIn}
        disabled={isSSOPending || isGoogleSigningIn}
      >
        <span className="flex flex-row gap-2 items-center justify-center">
          <GoogleIcon />
          {isSSOPending || isGoogleSigningIn
            ? "Signing in..."
            : "Sign in with Google"}
        </span>
      </Button>
    </div>
  );
};

export default LoginForm;
