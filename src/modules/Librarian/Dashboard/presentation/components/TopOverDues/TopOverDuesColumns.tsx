"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TopOverDues } from "../../../domain/entities/TopOverdues";

const TopOverDuesColumns: ColumnDef<TopOverDues>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "book_copy.book.title",
    header: "Title",
    cell: ({ row }) => (
      <div>{row.original.book_copy?.book?.title ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "book_copy.book.author",
    header: "Author",
    cell: ({ row }) => (
      <div>{row.original.book_copy?.book?.author ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "due_date",
    header: "Overdue Days",
    cell: ({ row }) => {
      const dueDate = new Date(row.original.due_date);
      const now = new Date();
      const diffDays = Math.max(
        0,
        Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)),
      );
      return <div>{diffDays}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Borrowed Date",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];

export default TopOverDuesColumns;
