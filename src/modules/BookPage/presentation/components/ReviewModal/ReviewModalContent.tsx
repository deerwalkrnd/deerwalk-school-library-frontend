import React from "react";
import { ReviewModalHeader } from "./ReviewModalHeader";
import { ReviewModalBookInfo } from "./ReviewModalBookInfo";
import { ReviewModalControls } from "./ReviewModalControls";
import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";

interface ReviewModalContentProps {
  bookId: number;
  sortBy: "newest" | "oldest";
  showSpam: boolean;
  openDropdownId: number | null;
  currentPage: number;
  onClose: () => void;
  onSortChange: (sort: "newest" | "oldest") => void;
  onSpamToggle: () => void;
  onPageChange: (page: number) => void;
  onMarkAsSpam: (reviewId: number) => void;
  onToggleDropdown: (reviewId: number) => void;
}

export const ReviewModalContent = ({
  bookId,
  sortBy,
  showSpam,
  openDropdownId,
  currentPage,
  onClose,
  onSortChange,
  onSpamToggle,
  onPageChange,
  onMarkAsSpam,
  onToggleDropdown,
}: ReviewModalContentProps) => {
  return (
    <div className="p-10">
      <ReviewModalHeader onClose={onClose} />
      <ReviewModalBookInfo bookId={bookId} />

      <hr className="my-10 border-gray-200" />
      <ReviewModalControls
        sortBy={sortBy}
        showSpam={showSpam}
        onSortChange={onSortChange}
        onSpamToggle={onSpamToggle}
        bookId={bookId}
      />
      <ReviewList
        bookId={bookId.toString()}
        isInModal={true}
        onMarkAsSpam={onMarkAsSpam}
        openDropdownId={openDropdownId}
        onToggleDropdown={onToggleDropdown}
        showSpam={showSpam}
        sortBy={sortBy}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
