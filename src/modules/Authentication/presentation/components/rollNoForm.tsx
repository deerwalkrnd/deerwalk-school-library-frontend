import Button from "@/core/presentation/components/Button/Button";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React from "react";

const RollNoForm = () => {
  return (
    <div className="md:w-[50%]  ">
      <form className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-3">
          <Label>Roll Number</Label>
          <Input
            type="text"
            placeholder="Your roll number..."
            className="w-full px-5 py-6  "
          />
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default RollNoForm;
