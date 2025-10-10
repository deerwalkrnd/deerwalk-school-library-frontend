"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Eye, Trash } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { BookRequest, IBooksColumns } from "../../domain/entities/bookModal";

export const createBookColumns = (
  onEdit: (book: BookRequest) => void,
  onView: (book: any) => void,
  onDelete: (book: any) => void,
): ColumnDef<IBooksColumns>[] => [
  {
    id: "sn",
    header: "S.N.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
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
    cell: ({ row }) => <div>{row.original.available ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ row }) => {
      const rawDate = row.original.dateAdded;
      const formatted = new Date(rawDate).toLocaleDateString();
      return <div>{formatted}</div>;
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
              "flex items-center justify-center gap-1.5 h-9",
              "text-sm leading-none tracking-tight text-shadow-sm",
            )}
            onClick={() => onEdit(book)}
          >
            <Pencil size={14} /> Edit
          </Button>

          <Button
            className={cn(
              "flex items-center justify-center gap-1.5 h-9",
              "text-sm leading-none tracking-tight text-shadow-sm",
            )}
            onClick={() => onView(book)}
          >
            <Eye size={14} /> View Comments
          </Button>

          <button
            className={cn(
              "flex items-center justify-center gap-2 h-8 w-8 rounded border border-primary px-2",
              "cursor-pointer text-sm leading-none tracking-tight",
            )}
            onClick={() => onDelete(book)}
          >
            <Trash size={14} />
          </button>
        </div>
      );
    },
  },
];
