"use client";

import type React from "react";
import BookCard from "@/modules/AllBooks/presentation/components/BookCard";

interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
}

interface BookGridProps {
  books: BookData[];
  onBookClick?: (book: BookData) => void;
  isLoading?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({
  books = [],
  onBookClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No books found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
};

export default BookGrid;
