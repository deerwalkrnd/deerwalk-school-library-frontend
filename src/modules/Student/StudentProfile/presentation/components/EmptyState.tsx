"use client";

import Button from "@/core/presentation/components/Button/Button";
import { ArrowRight } from "lucide-react";
import { Books } from "../../../../../../public/Books";

interface EmptyStateProps {
  icon?: "Book";
  message: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export function EmptyState({
  message,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-4 lg:m-30">
      <Books className="lg:w-23 lg:h-23  md:w-19 md:h-19 w-16 h-16 " />
      <p className="text-lg text-black font-[500]">{message}</p>
      <Button
        onClick={onButtonClick}
        className="bg-primary hover:bg-primary text-white lg:text-xl md:text-lg text-sm font-medium py-2 px-4 rounded-md flex items-center gap-2"
      >
        {buttonText} <ArrowRight />
      </Button>
    </div>
  );
}
