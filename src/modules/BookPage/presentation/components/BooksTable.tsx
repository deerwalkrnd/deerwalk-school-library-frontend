"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";

import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  BookPayload,
  BookRequest,
  IBooksColumns,
} from "../../domain/entities/bookModal";
import { createBookColumns } from "./BookColumns";
import { getBooks } from "../../application/bookUseCase";
import { getBookGenre } from "../../application/genreUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { ReviewModal } from "./ReviewModal/ReviewModal";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { DirectIssueModal } from "./DirectIssueModal/DirectIssueModal";

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
  searchable_field?: string;
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version: number };

export const BooksTable = ({ filterParams = {}, version }: Props) => {
  const [editBook, setEditBook] = useState<IBooksColumns | null>(null);
  const [deleteBook, setDeleteBook] = useState<any | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookRequest | null>(null);
  const [page, setPage] = useState(1);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [issueBook, setIssueBook] = useState<IBooksColumns | null>(null);

  useEffect(() => {
    setPage(1);
  }, [
    filterParams.end_date,
    filterParams.searchable_field,
    filterParams.searchable_value,
    version,
  ]);

  const handleEdit = (book: any) => {
    setEditBook(book);
  };
  const handleDelete = (book: any) => {
    setSelectedBook(book);
    setDeleteBook(true);
  };
  const handleView = (book: any) => {
    setSelectedBook(book);
    setIsReviewOpen(true);
  };
  const handleIssue = (book: IBooksColumns) => {
    setIssueBook(book);
    setIsIssueOpen(true);
  };
  const columns = useMemo(
    () =>
      createBookColumns(
        handleEdit,
        handleView,
        handleDelete,
        GenreCell,
        handleIssue,
      ),
    [handleEdit, handleDelete, handleView, handleIssue],
  );

  const { data, isLoading, isError, error } = getBooks({
    page,
    ...filterParams,
  });

  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

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
            enableSelection={false}
            enablePagination={false}
            pageSize={10}
          />
        </ScrollArea>
      </div>
      <div className="shrink-0 p-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={setPage}
        />
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
      {selectedBook && (
        <ReviewModal
          id={selectedBook?.id!}
          open={isReviewOpen}
          onOpenChange={setIsReviewOpen}
        />
      )}
      {issueBook && (
        <DirectIssueModal
          bookId={issueBook.id}
          bookTitle={issueBook.title}
          open={isIssueOpen}
          onOpenChange={(open) => {
            setIsIssueOpen(open);
            if (!open) setIssueBook(null);
          }}
        />
      )}
    </div>
  );
};
