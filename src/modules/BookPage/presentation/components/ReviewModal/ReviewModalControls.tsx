import React, { useState } from "react";
import { MessageCircleWarning, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { useGetReviewCount } from "@/modules/Reviews/application/ReviewUseCase";

interface ReviewModalControlsProps {
  sortBy: "newest" | "oldest";
  showSpam: boolean;
  onSortChange: (sort: "newest" | "oldest") => void;
  onSpamToggle: () => void;
  bookId: number;
}

export const ReviewModalControls = ({
  sortBy,
  showSpam,
  onSortChange,
  onSpamToggle,
  bookId,
}: ReviewModalControlsProps) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const { data: reviewCount, isLoading: countLoading } =
    useGetReviewCount(bookId);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Reviews for this book</h2>
      <div className="flex items-center gap-4 mt-5">
        <span className="px-1 rounded text-sm">
          {countLoading ? "..." : `${reviewCount || 0} Reviews`}
        </span>
        <div className="relative">
          <div
            className="flex items-center gap-1 text-sm cursor-pointer hover:text-black"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <Icon icon="mi:filter" className="w-4 h-4" />
            Sort by {sortBy === "newest" ? "Newest" : "Oldest"}
            <ChevronDown className="w-3 h-3" />
          </div>
          {showSortDropdown && (
            <div className="sort-dropdown absolute top-6 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[100px]">
              <button
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onSortChange("newest");
                  setShowSortDropdown(false);
                }}
              >
                Newest
              </button>
              <button
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onSortChange("oldest");
                  setShowSortDropdown(false);
                }}
              >
                Oldest
              </button>
            </div>
          )}
        </div>
        <Button
          onClick={onSpamToggle}
          className={cn(
            "ml-auto flex items-center justify-center gap-1.5 h-8",
            "text-sm leading-none tracking-tight text-shadow-sm",
            showSpam
              ? "bg-red-100 text-red-700 "
              : "bg-gray-100 text-gray-700 ",
          )}
        >
          <MessageCircleWarning className="w-4 h-4" />
          {showSpam ? "Hide Spam" : "View Spam"}
        </Button>
      </div>
    </div>
  );
};
