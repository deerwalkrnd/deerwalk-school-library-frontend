"use client";

import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { useBooks } from "@/modules/AllBooks/application/allBooksUseCase";
import { useAllBookmarks } from "@/modules/AllBooks/application/bookmarkUseCase";
import type {
  PaginationParams,
  BookData,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import BookGrid from "./BookGrid";
import { useRouter } from "next/navigation";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { getSearchableFieldsForTable } from "@/core/lib/searchableFields";

const BOOKS_PER_PAGE = 8;

export interface EnrichedBook extends BookData {
  bookmarkId: string | null;
}

const AllBooks: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: BOOKS_PER_PAGE,
  });

  const { filters, setFilters, params, version, apply } = useServerFilters();
  const searchableFieldOptions = getSearchableFieldsForTable("books");

  const { data, isLoading, error } = useBooks(pagination, params);
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [params, version]);
  const {
    data: bookmarksData,
    isLoading: isLoadingBookmarks,
    refetch: refetchBookmarks,
  } = useAllBookmarks();
  const router = useRouter();

  const currentPage = pagination.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

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

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(
    pagination.page * pagination.limit,
    data?.totalCount || 0,
  );

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="lg:text-3xl md:text-28px text-2xl font-semibold mb-2">
          Browse Books
        </h1>
      </div>

      <div className="my-10">
        <FilterBar
          onChange={setFilters}
          manual
          onSubmit={apply}
          placeholder="Search books..."
          searchableFieldOptions={searchableFieldOptions}
          showSearchableFields={true}
          showDates={false}
          value={filters}
        />
      </div>

      <p className="text-gray lg:text-sm md:text-xs text-[10px]">
        {data ? (
          <>
            {start}-{end} of{" "}
            <span className="font-bold text-black">{data.totalCount}</span>{" "}
            results
          </>
        ) : (
          "Loading books..."
        )}
      </p>

      <BookGrid
        books={enrichedBooks}
        isLoading={isLoadingData}
        onBookClick={(book) => {
          const targetId = encodeURIComponent(String(book.id));
          router.push(`/student/book/${targetId}`);
          refetchBookmarks();
        }}
      />

      {data && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllBooks;
