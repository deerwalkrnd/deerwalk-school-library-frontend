"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Eye, Trash } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { BookRequest, IBooksColumns } from "../../domain/entities/bookModal";

export const createBookColumns = (
  onEdit: (row: IBooksColumns) => void,
  onView: (row: IBooksColumns) => void,
  onDelete: (row: IBooksColumns) => void,
): ColumnDef<IBooksColumns>[] => [
  {
    id: "sn",
    header: "S.N.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  { accessorKey: "title", header: "Book Title" },
  { accessorKey: "author", header: "Author" },
  { accessorKey: "publication", header: "Publication" },
  { accessorKey: "isbn", header: "ISBN" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "grade", header: "Grade" },
  {
    id: "genre",
    header: "Genre",
    cell: ({ row }) => {
      const { category, genre } = row.original;
      if (category === "ACADEMIC" || category === "REFERENCE")
        return <div>-</div>;
      return <div>{genre?.trim() || "-"}</div>;
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
            className={cn("flex items-center gap-1.5 h-9 text-sm")}
            onClick={() => onEdit(book)}
          >
            <Pencil size={14} /> Edit
          </Button>
          <Button
            className={cn("flex items-center gap-1.5 h-9 text-sm")}
            onClick={() => onView(book)}
          >
            <Eye size={14} /> View
          </Button>
          <button
            className={cn(
              "flex items-center justify-center gap-2 h-8 w-8 rounded border border-primary px-2",
              "cursor-pointer text-sm",
            )}
            onClick={() => onDelete(book)}
            aria-label="Delete"
            title="Delete"
          >
            <Trash size={14} />
          </button>
        </div>
      );
    },
  },
];
