"use client";

import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import Button from "@/core/presentation/components/Button/Button";
import { Eye, Pencil, Trash } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { mockBooks } from "../../data/bookData";

import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { ReviewModal } from "@/modules/ReviewModal/presentation/components/Review";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { IBooksColumns } from "../../domain/entities/bookModal";
import { createBookColumns } from "./BookColumns";

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

  const handleRowClick = (book: any) => {
    console.log("Book clicked:", book);
  };

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleView = () => {};
  const columns = useMemo(
    () => createBookColumns(handleEdit, handleDelete, handleView),
    [handleEdit, handleDelete, handleView],
  );

  return (
    <div className="overflow-x-auto">
      <div className=" max-w-[75vw]">
        <ScrollArea className="h-full w-max min-w-full ">
          <DataTable
            enableFiltering={false}
            columns={columns}
            data={mockBooks}
            searchKey="title"
            searchPlaceholder="Search using ISBN, Title, Author..."
            onRowClick={handleRowClick}
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
