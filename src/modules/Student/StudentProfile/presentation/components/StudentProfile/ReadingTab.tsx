import React from "react";
import { BookCard } from "../BookCard";
import { EmptyState } from "../EmptyState";
import { Pagination } from "../Pagination";
import { useRouter } from "next/navigation";

interface ReadingTabProps {
  currentPage: number;
  currentlyReading: any[];
}

const BOOKS_PER_PAGE = 4;

export const ReadingTab: React.FC<ReadingTabProps> = ({
  currentPage,
  currentlyReading,
}) => {
  const router = useRouter();
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const currentReading = currentlyReading.slice(startIndex, endIndex);

  const totalReadingPages = Math.ceil(currentlyReading.length / BOOKS_PER_PAGE);
  const router = useRouter();

  if (currentlyReading.length === 0) {
    return (
      <EmptyState
        message="You aren't currently reading any books."
        buttonText="Browse Books"
        onButtonClick={() => router.push("/student/allbooks")}
      />
    );
  }

  return (
    <>
      <div
        key={`reading-${currentPage}`}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
      >
        {currentReading.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {totalReadingPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalReadingPages}
            onPageChange={() => {}}
          />
        </div>
      )}
    </>
  );
};
