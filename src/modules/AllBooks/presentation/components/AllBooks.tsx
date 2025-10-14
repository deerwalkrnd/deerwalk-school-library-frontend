"use client";

import type React from "react";
import { useState } from "react";
import { useBooks } from "@/modules/AllBooks/application/allBooksUseCase";
import type {
  BookFilters,
  PaginationParams,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";
import Pagination from "./Pagination";
import BookGrid from "./BookGrid";
import SearchAndFilters from "./SearchAndFilter";

const BOOKS_PER_PAGE = 8;

const AllBooks: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: BOOKS_PER_PAGE,
  });

  const [filters, setFilters] = useState<BookFilters>({
    search: "",
    genre: undefined,
    sortBy: "title",
    sortOrder: "asc",
  });

  const { data, isLoading, error } = useBooks(pagination, filters);

  const handleFiltersChange = (newFilters: BookFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="lg:text-3xl md:text-28px text-2xl font-semibold mb-2">
          Browse Books
        </h1>
      </div>

      <SearchAndFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

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
        books={data?.books || []}
        isLoading={isLoading}
        onBookClick={(book) => {
          console.log("Book clicked:", book);
        }}
      />

      {data && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          hasNextPage={data.hasNextPage}
          hasPreviousPage={data.hasPreviousPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllBooks;
