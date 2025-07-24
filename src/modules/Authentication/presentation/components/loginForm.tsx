import GoogleIcon from "@/core/presentation/assets/icons/GoogleIcon";
import Button from "@/core/presentation/components/Button/Button";
import OrDivider from "@/core/presentation/components/Divider/OrDivider";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React from "react";

const LoginForm = () => {
  return (
    <div className="flex flex-col ">
      <form className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            className="px-5 py-6  bg-slate-50/50"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Password</Label>
          <Input
            type="text"
            placeholder="Password"
            className="px-5 py-6 bg-slate-50/50"
          />
          <div className="flex flex-row justify-end">
            <span className="font-medium underline text-xs">
              Forgot password?
            </span>
          </div>
        </div>
        <Button className="bg-primary mt-8 text-white font-semibold p-3 rounded-md ">
          Sign In
        </Button>
      </form>
      <OrDivider />
      <Button className="bg-white ring-1 p-3 rounded-md font-bold ring-gray-300 ">
        <span className="flex flex-row gap-2 items-center justify-center">
          <GoogleIcon />
          Sign in with Google
        </span>
      </Button>
    </div>
  );
};

export default LoginForm;
