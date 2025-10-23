"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { useBooks } from "@/modules/AllBooks/application/allBooksUseCase";
import { useAllBookmarks } from "@/modules/AllBooks/application/bookmarkUseCase";
import type {
  BookFilters,
  PaginationParams,
  BookData,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import BookGrid from "@/modules/AllBooks/presentation/components/BookGrid";
import { useRouter } from "next/navigation";
import { Button } from "@/core/presentation/components/ui/button";
import AllBooks from "@/modules/AllBooks/presentation/components/AllBooks";

const BOOKS_PER_PAGE = 8;

export interface EnrichedBook extends BookData {
  bookmarkId: string | null;
}

const BrowseBook: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: BOOKS_PER_PAGE,
  });

  const { data, isLoading, error } = useBooks(pagination);
  const {
    data: bookmarksData,
    isLoading: isLoadingBookmarks,
    refetch: refetchBookmarks,
  } = useAllBookmarks();
  const router = useRouter();
  const bookmarkMap = useMemo(() => {
    if (!bookmarksData?.items) return new Map<string, string>();

    const map = new Map<string, string>();
    bookmarksData.items.forEach((bookmark) => {
      map.set(String(bookmark.book_id), String(bookmark.id));
    });

    return map;
  }, [bookmarksData]);

  const enrichedBooks = useMemo(() => {
    if (!data?.books) return [];

    const enriched: EnrichedBook[] = data.books.map((book) => {
      const bookIdStr = String(book.id);
      const bookmarkId = bookmarkMap.get(bookIdStr) || null;
      return {
        ...book,
        bookmarkId,
      };
    });

    return enriched;
  }, [data?.books, bookmarkMap]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive text-lg">
            Error loading books: {error.message}
          </p>
        </div>
      </div>
    );
  }

  const isLoadingData = isLoading || isLoadingBookmarks;

  return (
    <div className="px-4 py-8">
      <div className="flex items-start justify-between mb-8 lg:flex-row md:flex-row flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Browse Books
          </h1>
          <p className="text-sm font-medium">
            Start Exploring - There's Something for Everyone
          </p>
        </div>
        <Button
          className="w-[110px] md:w-[143px] lg:w-[126px] h-[33px] md:h-[37px] lg:h-[37px] button-border text-white flex items-center justify-center lg:text-sm md:text-sm text-xs font-medium  "
          onClick={() => router.push("/student/allbooks")}
        >
          Browse All Books
        </Button>
      </div>
      <div className="mx-auto container">
        <BookGrid
          books={enrichedBooks}
          isLoading={isLoadingData}
          onBookClick={(book) => {
            const targetId = encodeURIComponent(String(book.id));
            router.push(`/student/book/${targetId}`);
            refetchBookmarks();
          }}
        />
      </div>
    </div>
  );
};

export default BrowseBook;
