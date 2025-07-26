"use client";

import Button from "@/core/presentation/components/Button/Button";
import { Book, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: "Book";
  message: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const IconMap: Record<NonNullable<EmptyStateProps["icon"]>, LucideIcon> = {
  Book: Book,
};

export function EmptyState({
  icon = "Book",
  message,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  const IconComponent = IconMap[icon];
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center gap-4 lg:m-30">
      <IconComponent className="w-16 h-16 text-primary" />
      <p className="text-lg text-black font-[500]">{message}</p>
      <Button
        onClick={onButtonClick}
        className="bg-primary hover:bg-primary text-white text-base font-medium py-2 px-4 rounded-md flex items-center gap-2"
      >
        {buttonText} <ArrowRight />
      </Button>
    </div>
  );
}
