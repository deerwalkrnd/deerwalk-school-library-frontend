"use client";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/core/lib/utils";
import Button from "@/core/presentation/components/Button/Button";
import { SquarePen, Trash } from "lucide-react";
import { IIssueBookColumns } from "../../../domain/entities/IIssueBookColumns";

export const createIssueBookColumns = (
  onIssue: (row: IIssueBookColumns) => void,
  onDelete: (row: IIssueBookColumns) => void,
): ColumnDef<IIssueBookColumns>[] => [
  {
    accessorKey: "id",
    header: "S.N",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "book_title",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "publication",
    header: "Publication",
    cell: ({ row }) => <div>{row.original.publication || "N/A"}</div>,
  },
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className={cn()}>{row.original.type}</span>,
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "borrowed_date",
    header: "Borrowed Date",
    cell: ({ row }) => (
      <div>
        {row.original.borrowed_date ? row.original.borrowed_date : "N/A"}
      </div>
    ),
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row justify-start items-center gap-3">
        <Button
          className="flex flex-row gap-2"
          onClick={() => onIssue(row.original)}
        >
          <SquarePen />
          Issue
        </Button>
        <button
          className={cn(
            "flex items-center justify-center gap-2",
            "h-8 w-8",
            "rounded border border-primary",
            "px-2",
            "cursor-pointer text-sm leading-none tracking-tight",
          )}
          onClick={() => onDelete(row.original)}
        >
          <Trash size={14} />
        </button>
      </div>
    ),
  },
];
