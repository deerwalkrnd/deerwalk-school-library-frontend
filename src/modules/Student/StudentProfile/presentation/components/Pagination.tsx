"use client";

import React from "react";
import { Button } from "@/core/presentation/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  const getVisiblePages = (): (number | "...")[] => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    const rangeWithDots: (number | "...")[] = [];

    // First page
    rangeWithDots.push(1);

    // Left dots
    if (range[0] > 2) rangeWithDots.push("...");

    // Middle pages
    rangeWithDots.push(...range);

    // Right dots
    if (range[range.length - 1] < totalPages - 1) rangeWithDots.push("...");

    // Last page
    rangeWithDots.push(totalPages);

    // Filter duplicates to ensure unique keys
    return rangeWithDots.filter((v, i, a) => a.indexOf(v) === i);
  };

  if (totalPages <= 1) return null;

  const canPrev = hasPreviousPage ?? currentPage > 1;
  const canNext = hasNextPage ?? currentPage < totalPages;

  const go = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    if (clamped !== currentPage) onPageChange(clamped);
  };

  // Call once and reuse
  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => go(currentPage - 1)}
        disabled={!canPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-3 py-2 text-muted-foreground"
            >
              …
            </span>
          ) : (
            <Button
              key={`page-${page}`} // now guaranteed unique
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => go(page as number)}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => go(currentPage + 1)}
        disabled={!canNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;
