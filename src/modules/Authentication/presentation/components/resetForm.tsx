import Button from "@/core/presentation/components/Button/Button";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React from "react";

const ResetForm = () => {
  return (
    <div className="md:w-[50%] ">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="Enter your parent's email..."
            className="w-full px-5 py-6  "
          />
        </div>
        <Button className="">Send Reset Link</Button>
      </form>
    </div>
  );
};

export default ResetForm;
