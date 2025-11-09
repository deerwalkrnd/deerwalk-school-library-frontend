import React from "react";
import { BookCard } from "../BookCard";
import { SummaryCard } from "../SummaryCard";
import { EmptyState } from "../EmptyState";
import { Pagination } from "../Pagination";
import LoadingState from "../LoadingState";
import ErrorState from "../ErrorState";
import {
  transformBookmarkToBookData,
  useBookmarks,
} from "../../../application/useBookmarksUseCase";
import { useRouter } from "next/navigation";

interface BookmarksTabProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalBooksBorrowed: number;
  totalReturnedBooks: number;
  fineLevied: number;
}

const BOOKS_PER_PAGE = 4;

export const BookmarksTab: React.FC<BookmarksTabProps> = ({
  currentPage,
  setCurrentPage,
  totalBooksBorrowed,
  totalReturnedBooks,
  fineLevied,
}) => {
  const router = useRouter();

  const {
    data: bookmarksData,
    isLoading: bookmarksLoading,
    error: bookmarksError,
  } = useBookmarks(currentPage, BOOKS_PER_PAGE, undefined);

  if (bookmarksLoading) {
    return <LoadingState />;
  }

  if (bookmarksError) {
    return <ErrorState message="Failed to load bookmarks" />;
  }

  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const bookmarksItems = (bookmarksData?.items || []).slice(
    startIndex,
    endIndex,
  );

  const totalBookmarksPages = bookmarksData
    ? Math.ceil(bookmarksData.total / BOOKS_PER_PAGE)
    : 0;

  if (bookmarksItems.length === 0) {
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
          message="You haven't added any books to this list."
          buttonText="Browse Books"
          onButtonClick={() => router.push("/student/allbooks")}
        />
      </>
    );
  }

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
      <div
        key={`bookmarks-${currentPage}`}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center pt-10"
      >
        {bookmarksItems.map((bookmark) => {
          const bookData = transformBookmarkToBookData(bookmark);
          return (
            <BookCard key={bookData.id} book={bookData} showBorrowButton />
          );
        })}
      </div>
      {totalBookmarksPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalBookmarksPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};
