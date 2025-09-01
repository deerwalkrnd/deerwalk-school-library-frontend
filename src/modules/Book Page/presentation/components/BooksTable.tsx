"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import Button from "@/core/presentation/components/Button/Button";
import { Eye, Pencil, Trash } from "lucide-react";
import { cn } from "@/core/lib/utils";

import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { ReviewModal } from "@/modules/ReviewModal/presentation/components/Review";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Book {
  id: string;
  title: string;
  author: string;
  bookNumber: string;
  publication: string;
  isbn: string;
  price: string;
  type: string;
  genre: string;
  class: string;
  available: string;
  dateAdded: string;
  action: string;
}

interface BooksTableProps {
  data: Book[];
  isLoading?: boolean;
}

export const BooksTable = ({ data, isLoading }: BooksTableProps) => {
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleRowClick = (book: Book) => {
    console.log("Book clicked:", book);
  };

  const columns: ColumnDef<Book>[] = [
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
      accessorKey: "bookNumber",
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
      header: " Type",
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
      accessorKey: "dateAdded",
      header: "Date Added",
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
    <div className="">
      <div className=" max-w-[75vw] overflow-x-auto">
        <ScrollArea className="h-full w-max min-w-full ">
          <DataTable
            enableFiltering={false}
            columns={columns}
            data={data}
            searchKey="title"
            searchPlaceholder="Search using ISBN, Title, Author..."
            isLoading={isLoading}
            onRowClick={handleRowClick}
            enableSelection={false}
            enablePagination={true}
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
