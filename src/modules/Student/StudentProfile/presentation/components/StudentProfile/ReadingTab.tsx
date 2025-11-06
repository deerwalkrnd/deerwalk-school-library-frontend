"use client";

import type React from "react";
import { useState } from "react";
import { BookCard } from "../BookCard";
import { EmptyState } from "../EmptyState";
import { Pagination } from "../Pagination";
import { useRouter } from "next/navigation";
import { useCurrentBorrows } from "../../../application/useBorrowsUseCase";
import type { BookData } from "../../../domain/entities/studentProfileEntity";

const BOOKS_PER_PAGE = 4;

export const ReadingTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const {
    data: borrowsData,
    isLoading,
    error,
  } = useCurrentBorrows({
    page: currentPage,
    limit: BOOKS_PER_PAGE,
  });

  const currentlyReading: BookData[] =
    borrowsData?.items?.map((item) => ({
      id: item.book_copy.book.id.toString(),
      title: item.book_copy.book.title,
      author: item.book_copy.book.author,
      imageUrl: item.book_copy.book.cover_image_url,
      borrowedDate: new Date(item.created_at).toLocaleDateString(),
      dueDate: new Date(item.due_date).toLocaleDateString(),
      isOverdue: new Date(item.due_date) < new Date() && !item.returned,
    })) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          Loading your currently reading books...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-red-500">
          Error loading books. Please try again.
        </div>
      </div>
    );
  }

  if (!borrowsData || currentlyReading.length === 0) {
    return (
      <EmptyState
        message="You aren't currently reading any books."
        buttonText="Browse Books"
        onButtonClick={() => router.push("/student/allbooks")}
      />
    );
  }

  const totalPages = borrowsData.total
    ? Math.ceil(borrowsData.total / BOOKS_PER_PAGE)
    : 1;

  return (
    <>
      <div
        key={`reading-${currentPage}`}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
      >
        {currentlyReading.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            hasNextPage={borrowsData.next !== null}
            hasPreviousPage={currentPage > 1}
          />
        </div>
      )}
    </>
  );
};
