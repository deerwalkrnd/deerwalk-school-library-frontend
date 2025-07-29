import Button from "@/core/presentation/components/Button/Button";
import { Label } from "@/core/presentation/components/ui/label";
import React from "react";

export default function Feedbackform() {
  return (
    <div className="flex flex-col ">
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label className="font-medium text-xs md:text-sm lg:text-base">
            Subject
          </Label>
          <textarea
            placeholder="Request for addition of books"
            className="w-full text-xs md:text-sm lg:text-base item-text-area rounded-lg px-5 py-4 resize-none h-12.5 md:h-14.5 lg:md:h-14.5"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-medium text-xs md:text-sm lg:text-base">
            Feedback/Suggestion
          </Label>
          <textarea
            placeholder="What do you want us to improve on?"
            className="w-full text-xs md:text-sm lg:text-base item-text-area px-5 py-4 rounded-lg resize-none h-56"
          />
        </div>
      </form>
      <Button className="ring ring-orangeCustom  mt-8 text-white text-xs md:text-sm lg:text-base font-semibold p-3 rounded-md">
        Submit
      </Button>
    </div>
  );
}
