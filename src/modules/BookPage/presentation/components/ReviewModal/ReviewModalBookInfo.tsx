import React from "react";
import { useGetBookById } from "@/modules/BookPage/application/bookUseCase";

interface ReviewModalBookInfoProps {
  bookId: number;
}

export const ReviewModalBookInfo = ({ bookId }: ReviewModalBookInfoProps) => {
  const { data: book, isLoading, error } = useGetBookById(bookId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-30 text-sm md:text-base mt-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-30 text-sm md:text-base mt-10">
        <div className="space-y-4">
          <p className="text-gray-500 text-base">Book Title</p>
          <p className="font-medium text-sm text-red-600">
            Failed to load book info
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-30 text-sm md:text-base mt-10">
      <div className="space-y-4">
        <p className="text-gray-500 text-base">Book Title</p>
        <p className="font-medium text-sm">{book.title || "Unknown Title"}</p>
      </div>
      <div className="space-y-4">
        <p className="text-gray-500 text-base">ISBN</p>
        <p className="font-medium text-sm">{book.isbn || "N/A"}</p>
      </div>
      <div className="space-y-5">
        <p className="text-gray-500 text-base">Publication</p>
        <p className="font-medium text-sm">{book.publication || "N/A"}</p>
      </div>
    </div>
  );
};
