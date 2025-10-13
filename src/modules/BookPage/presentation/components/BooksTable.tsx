"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { mockBooks } from "../../data/bookData";

import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { ReviewModal } from "@/modules/ReviewModal/presentation/components/Review";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { BookPayload, BookRequest } from "../../domain/entities/bookModal";
import { createBookColumns } from "./BookColumns";
import { getBooks } from "../../application/bookUseCase";
import { getBookGenre } from "../../application/genreUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";

const GenreCell = ({
  bookId,
  category,
}: {
  bookId: number;
  category: string;
}) => {
  const { data: genres, isLoading, error } = getBookGenre(bookId);
  if (category === "ACADEMIC" || category === "REFERENCE") {
    return <div>-</div>;
  }

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-sm text-red-500">Error loading genres</div>;
  }
  if (!genres || genres.length === 0) {
    return <div>-</div>;
  }

  const genreTitles = genres.map((genre: any) => genre.title).join(", ");
  return <div className="text-sm">{genreTitles}</div>;
};

type FilterParams = {
  searchable_value?: string;
  searcable_field?: "name" | "email" | "subject";
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version: number };

export const BooksTable = ({ filterParams = {}, version }: Props) => {
  const [editBook, setEditBook] = useState<BookPayload | null>(null);
  const [deleteBook, setDeleteBook] = useState<any | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookRequest | null>(null);
  const [page, setPage] = useState(1);

  const handleEdit = (book: any) => {
    setEditBook(book);
  };
  const handleDelete = (book: any) => {
    setSelectedBook(book);
    setDeleteBook(true);
  };
  const handleView = () => {};
  const columns = useMemo(
    () => createBookColumns(handleEdit, handleView, handleDelete, GenreCell),
    [handleEdit, handleDelete, handleView],
  );

  const { data, isLoading, isError, error } = getBooks({ page });

  if (isLoading) {
    return <TableSkeleton />;
  }
  if (!data) return <div>Data not available</div>;

  return (
    <div className="overflow-x-auto">
      <div className=" max-w-[75vw]">
        <ScrollArea className="h-full w-max min-w-full ">
          <DataTable
            enableFiltering={false}
            columns={columns}
            data={data.items}
            searchKey="title"
            searchPlaceholder="Search using ISBN, Title, Author..."
            enableSelection={false}
            enablePagination={false}
            pageSize={10}
          />
        </ScrollArea>
      </div>
      <EditBookModal
        open={!!editBook}
        onOpenChange={(open) => {
          if (!open) setEditBook(null);
        }}
        book={editBook}
      />
      {selectedBook && (
        <DeleteBookModal
          id={selectedBook?.id!}
          open={deleteBook}
          onOpenChange={setDeleteBook}
        />
      )}

      <ReviewModal open={isReviewOpen} onOpenChange={setIsReviewOpen} />
    </div>
  );
};
