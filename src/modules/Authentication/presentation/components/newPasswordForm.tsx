import Button from "@/core/presentation/components/Button/Button";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React from "react";

const NewPasswordForm = () => {
  return (
    <div className="md:w-[50%]  ">
      <form className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-3">
          <Label>New Password</Label>
          <Input
            type="text"
            placeholder="A secure password..."
            className="w-full px-5 py-6  "
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Confirm New Password</Label>
          <Input
            type="text"
            placeholder="Re-enter password..."
            className="w-full px-5 py-6  "
          />
        </div>
        <Button>Change Password</Button>
      </form>
    </div>
  );
};

export default NewPasswordForm;
