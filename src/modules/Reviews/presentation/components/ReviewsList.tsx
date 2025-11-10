import React, { useState, useEffect } from "react";
import { useGetReviews } from "../../application/ReviewUseCase";
import { useAuth } from "@/core/presentation/contexts/AuthContext";
import { MoreVertical, Loader2 } from "lucide-react";
import Pagination from "@/core/presentation/components/pagination/Pagination";

interface ReviewsListProps {
  bookId: string;
  isInModal?: boolean;
  onMarkAsSpam?: (reviewId: number) => void;
  openDropdownId?: number | null;
  onToggleDropdown?: (reviewId: number) => void;
  showSpam?: boolean;
  sortBy?: "newest" | "oldest";
  currentPage?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
}

const ReviewsList = ({
  bookId,
  isInModal = false,
  onMarkAsSpam,
  openDropdownId,
  onToggleDropdown,
  showSpam = false,
  sortBy = "newest",
  currentPage = 1,
  onPageChange,
  limit = 10,
}: ReviewsListProps) => {
  const { user } = useAuth();
  const [page, setPage] = useState(currentPage);

  // Update local page state when currentPage prop changes
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  console.log("showing spam for ", showSpam);
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useGetReviews(parseInt(bookId), showSpam, sortBy, page, limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 mt-10">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 p-4 text-center text-red-600 bg-red-50 rounded-md">
        <p>Failed to load reviews. Please try again later.</p>
      </div>
    );
  }

  const currentPageNum = reviewsData?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasNextPage = reviewsData?.hasNextPage ?? false;
  const hasPreviousPage = currentPageNum > 1;

  if (!reviewsData?.items || reviewsData.items.length === 0) {
    return (
      <div>
        <div className="mt-10 p-8 text-center text-gray-500">
          <p>No reviews yet. Be the first to leave a review!</p>
        </div>
        <Pagination
          currentPage={currentPageNum}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
  return (
    <>
      <div className="space-y-6 mt-10">
        {reviewsData.items.map((review) => (
          <div key={review.id} className="flex gap-3">
            {review.user.image_url ? (
              <img
                src={review.user.image_url}
                alt={review.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {review.user.name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1 border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium">{review.user.name}</p>
                {user?.role === "LIBRARIAN" && (
                  <div className="relative">
                    <MoreVertical
                      className="w-4 h-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        if (isInModal && onToggleDropdown) {
                          onToggleDropdown(review.id);
                        }
                      }}
                    />
                    {isInModal && openDropdownId === review.id && (
                      <div className="dropdown-container absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        <button
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            if (onMarkAsSpam) {
                              onMarkAsSpam(review.id);
                            }
                          }}
                        >
                          Mark as Spam
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-700 mt-1">{review.review_text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPageNum}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ReviewsList;
