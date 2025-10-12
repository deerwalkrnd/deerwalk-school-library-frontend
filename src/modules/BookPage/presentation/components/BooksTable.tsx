"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { mockBooks } from "../../data/bookData";

import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { ReviewModal } from "@/modules/ReviewModal/presentation/components/Review";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  BookModal,
  BookRequest,
  IBooksColumns,
} from "../../domain/entities/bookModal";
import { createBookColumns } from "./BookColumns";
import { getBooks } from "../../application/bookUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";

type FilterParams = {
  searchable_value?: string;
  searcable_field?: "name" | "email" | "subject";
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version: number };

export const BooksTable = ({ filterParams = {}, version }: Props) => {
  const [editBook, setEditBook] = useState<any | null>(null);
  const [deleteBook, setDeleteBook] = useState<any | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookRequest | null>(null);
  const [page, setPage] = useState(1);

  const handleEdit = () => {};
  const handleDelete = (book: any) => {
    setSelectedBook(book);
    setDeleteBook(true);
  };
  const handleView = () => {};
  const columns = useMemo(
    () => createBookColumns(handleEdit, handleView, handleDelete),
    [handleEdit, handleDelete, handleView],
  );

  const { data, isLoading, isError, error } = getBooks({ page });
  console.log(data);

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
