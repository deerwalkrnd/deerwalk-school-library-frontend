import GoogleIcon from "@/core/presentation/assets/icons/GoogleIcon";
import Button from "@/core/presentation/components/Button/Button";
import OrDivider from "@/core/presentation/components/Divider/OrDivider";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import React from "react";

export default function Feedbackform() {
  return (
    <div className="flex flex-col ">
      <form className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Subject</Label>
          <Input
            type="text"
            placeholder="Request for addition of books"
            className="w-full max-w-md border border-[#EA5D0E1A] bg-[#EA5D0E05] px-5 py-6"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-medium">Feedback/Suggestion</Label>
          <Input
            type="text"
            placeholder="What do you want us to improve on?"
            className="w-full max-w-md h-24 border border-[#EA5D0E1A] bg-[#EA5D0E05] px-5 py-6"
          />
        </div>
        <Button className="bg-primary mt-8 text-white font-semibold p-3 rounded-md">
          Submit
        </Button>
      </form>
    </div>
  );
}
