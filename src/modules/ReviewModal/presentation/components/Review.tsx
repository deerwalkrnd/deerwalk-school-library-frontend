"use client";

import React, { useEffect, useState } from "react";
import { CircleX, MessageCircleWarning } from "lucide-react";
import { Icon } from "@iconify/react";
import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReviewModal = ({ open, onOpenChange }: ReviewModalProps) => {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (open) {
      setShowModal(true);
      const timer = setTimeout(() => setAnimationClass("animate-slide-down"));
      return () => clearTimeout(timer);
    } else {
      setAnimationClass("animate-slide-up");
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] overflow-y-auto ${animationClass}`}
      >
        <div className="p-10">
          <div className="mb-6 flex items-start justify-between">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-center flex-1">
              View Reviews
            </h1>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CircleX className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-30 text-sm md:text-base mt-10">
            <div className="space-y-4">
              <p className="text-gray-500 text-base">Book Title</p>
              <p className="font-medium text-sm">
                Harry Potter and the Sorcerer's Stone
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-500 text-base">ISBN</p>
              <p className="font-medium text-sm">988976655446</p>
            </div>
            <div className="space-y-5">
              <p className="text-gray-500 text-base">Publication</p>
              <p className="font-medium text-sm">Bloomsbury</p>
            </div>
          </div>

          <hr className="my-10 border-gray-200" />
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Reviews for this book</h2>
            <div className="flex items-center gap-4 mt-5">
              <span className="px-1 rounded text-sm">8 Reviews</span>
              <div className="flex items-center gap-1 text-sm cursor-pointer hover:text-black">
                <Icon icon="mi:filter" className="w-4 h-4" />
                Sort by
              </div>
              <Button
                className={cn(
                  "ml-auto flex items-center justify-center gap-1.5 h-8",
                  "text-sm leading-none tracking-tight text-shadow-sm",
                )}
              >
                <MessageCircleWarning className="w-4 h-4" />
                View Spam
              </Button>
            </div>
          </div>
          <ReviewList />
        </div>
      </div>
    </div>
  );
};
