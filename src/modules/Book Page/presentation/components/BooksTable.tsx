"use client";

import { useState, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import Button from "@/core/presentation/components/Button/Button";
import { Eye, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

import type { IBooksColumns } from "@/modules/Book Page/domain/entities/IBooksColumns";
import type { BookQueryParams } from "@/modules/Book Page/domain/entities/bookRequest";
import { BookRepository } from "@/modules/Book Page/infra/booksRepository";
import type { Paginated } from "@/core/lib/Pagination";

import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { ReviewModal } from "@/modules/ReviewModal/presentation/components/Review";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface BooksTableProps {
  queryParams?: BookQueryParams;
  onRefresh?: () => void;
}

export const BooksTable = ({ queryParams, onRefresh }: BooksTableProps) => {
  const [books, setBooks] = useState<IBooksColumns[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editBook, setEditBook] = useState<IBooksColumns | null>(null);
  const [deleteBook, setDeleteBook] = useState<IBooksColumns | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [pagination, setPagination] = useState<Paginated<IBooksColumns> | null>(
    null,
  );

  const bookRepository = new BookRepository();

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const result = await bookRepository.getBooks(queryParams);
      setBooks(result.items);
      setPagination(result);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [queryParams]);

  const handleRowClick = (book: IBooksColumns) => {
    console.log("Book clicked:", book);
  };

  const handleDelete = async (book: IBooksColumns) => {
    if (!book.id) return;

    try {
      await bookRepository.deleteBook(book.id.toString());
      await fetchBooks(); // Refresh data
      onRefresh?.();
      setDeleteBook(null);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const columns: ColumnDef<IBooksColumns>[] = [
    {
      header: "S.N.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "title",
      header: "Book Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "book_number",
      header: "Book Number",
    },
    {
      accessorKey: "publication",
      header: "Publication",
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "genre",
      header: "Genre",
    },
    {
      accessorKey: "class",
      header: "Class",
    },
    {
      accessorKey: "available",
      header: "Available",
    },
    {
      accessorKey: "created_at",
      header: "Date Added",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return date.toLocaleDateString();
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const book = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              className={cn(
                "ml-auto flex items-center justify-center gap-1.5 h-9",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
              onClick={() => setEditBook(book)}
            >
              <Pencil size={14} /> Edit
            </Button>

            <Button
              className={cn(
                "ml-auto flex items-center justify-center gap-1.5 h-9",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
              onClick={() => setIsReviewOpen(true)}
            >
              <Eye size={14} /> View Comments
            </Button>

            <button
              className={cn(
                "ml-auto flex items-center justify-center gap-2",
                "h-8 w-8",
                "rounded border border-primary",
                "px-2",
                "cursor-pointer text-sm leading-none tracking-tight",
              )}
              onClick={() => setDeleteBook(book)}
            >
              <Trash size={14} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className=" max-w-[75vw]">
        <ScrollArea className="h-full w-max min-w-full ">
          <DataTable
            enableFiltering={false}
            columns={columns}
            data={books}
            searchKey="title"
            searchPlaceholder="Search using ISBN, Title, Author..."
            isLoading={isLoading}
            onRowClick={handleRowClick}
            enableSelection={false}
            enablePagination={true}
            pageSize={queryParams?.limit || 10}
          />
        </ScrollArea>
      </div>

      <EditBookModal
        open={!!editBook}
        onOpenChange={(open) => {
          if (!open) setEditBook(null);
        }}
      />

      <DeleteBookModal
        open={!!deleteBook}
        onOpenChange={(open) => {
          if (!open) setDeleteBook(null);
        }}
      />

      <ReviewModal open={isReviewOpen} onOpenChange={setIsReviewOpen} />
    </div>
  );
};
