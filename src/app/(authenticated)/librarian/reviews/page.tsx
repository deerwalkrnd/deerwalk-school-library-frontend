import React from "react";
import { CircleX, MessageCircleWarning } from "lucide-react";
import { Icon } from "@iconify/react";
import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

const page = () => {
  return (
    <div className="min-h screen bg-white px-6 py-12 max-w-7xl mx-auto font-sans">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1"></div>
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-center flex-1 ">
          View Reviews
        </h1>
        <div className="flex-1 flex justify-end">
          <CircleX className="w-6 h-6" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-30 text-sm md:text-base mt-10">
        <div className="space-y-4">
          <p className="text-gray-500">Book Ttile</p>
          <p className="font-medium">Harry Potter and the Sorcerer's Stone</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-500">ISBN</p>
          <p className="font-medium">988976655446</p>
        </div>
        <div className="space-y-5">
          <p className="text-gray-500">Publication</p>
          <p className="font-medium">Bloomsburry</p>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Reviews for this book</h2>
        <div className="flex items-center gap-4 mt-5">
          <span className="px-1 rounded text-sm"> 8 Reviews</span>
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
  );
};

export default page;
