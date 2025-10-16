import type { ColumnDef } from "@tanstack/react-table";
import type { BookData } from "../../domain/entities/studentProfileEntity";

export const borrowColumns: ColumnDef<BookData>[] = [
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
    accessorKey: "borrowedDate",
    header: "Borrowed Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "isOverdue",
    header: "Overdue",
    cell: ({ row }) => (row.original.isOverdue === "true" ? "Yes" : "No"),
  },
];
