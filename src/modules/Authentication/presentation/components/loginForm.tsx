"use client";
import GoogleIcon from "@/core/presentation/assets/icons/GoogleIcon";
import Button from "@/core/presentation/components/Button/Button";
import OrDivider from "@/core/presentation/components/Divider/OrDivider";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React, { useState } from "react";
import { useLogin } from "../../application/loginUseCase";
import { UserRequest } from "../../domain/entities/userEntity";
import { useAuth } from "@/core/presentation/contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: authLogin } = useAuth();

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useLogin({
    onSuccess: async (data) => {
      await authLogin(data.token);
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

  console.log(error);
  return (
    <div className="flex flex-col ">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            className="px-5 py-6 "
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Password</Label>
          <Input
            type="text"
            placeholder="Password"
            className="px-5 py-6"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-row justify-end">
            <span className="font-medium underline text-xs md:text-sm">
              Forgot password?
            </span>
          </div>
        </div>
        {isError && (
          <div className="text-red-500 text-sm">
            {error?.message || "Login failed. Please try again."}
          </div>
        )}
        <Button className="mt-8" type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <OrDivider />
      <Button className="bg-white ring-1 p-3 rounded-md font-bold ring-gray-300 text-black ">
        <span className="flex flex-row gap-2 items-center justify-center">
          <GoogleIcon />
          Sign in with Google
        </span>
      </Button>
    </div>
  );
};

export default LoginForm;
