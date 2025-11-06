import React from "react";
import { BookCard } from "../BookCard";
import { SummaryCard } from "../SummaryCard";
import { EmptyState } from "../EmptyState";
import { Pagination } from "../Pagination";
import { useRouter } from "next/navigation";

interface HistoryTabProps {
  currentPage: number;
  borrowedHistory: any[];
  totalBooksBorrowed: number;
  totalReturnedBooks: number;
  fineLevied: number;
}

const BOOKS_PER_PAGE = 4;

export const HistoryTab: React.FC<HistoryTabProps> = ({
  currentPage,
  borrowedHistory,
  totalBooksBorrowed,
  totalReturnedBooks,
  fineLevied,
}) => {
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const currentHistory = borrowedHistory.slice(startIndex, endIndex);

  const totalHistoryPages = Math.ceil(borrowedHistory.length / BOOKS_PER_PAGE);
  const router = useRouter();

  if (borrowedHistory.length === 0) {
    return (
      <>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 place-items-center gap-6">
          <SummaryCard
            icon="BookCopy"
            title="Total Books Borrowed"
            value={totalBooksBorrowed}
          />
          <SummaryCard
            icon="BookCheck"
            title="Total Returned Books"
            value={totalReturnedBooks}
          />
          <SummaryCard
            icon="BanknoteArrowUp"
            title="Fine Levied"
            value={fineLevied}
          />
        </div>
        <EmptyState
          message="You haven't borrowed any books yet."
          buttonText="Browse Books"
          onButtonClick={() => router.push("/student/allbooks")}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 place-items-center gap-6 ">
        <SummaryCard
          icon="BookCopy"
          title="Total Books Borrowed"
          value={totalBooksBorrowed}
        />
        <SummaryCard
          icon="BookCheck"
          title="Total Returned Books"
          value={totalReturnedBooks}
        />
        <SummaryCard
          icon="BanknoteArrowUp"
          title="Fine Levied"
          value={fineLevied}
        />
      </div>
      <div
        key={`history-${currentPage}`}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {currentHistory.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {totalHistoryPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalHistoryPages}
            onPageChange={() => {}}
          />
        </div>
      )}
    </>
  );
};
