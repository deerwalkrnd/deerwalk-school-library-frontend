"use client";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/core/lib/utils";
import { RotateCcw, CornerDownLeft } from "lucide-react";
import { Button } from "@/core/presentation/components/ui/button";
import { IReturnBookColumns } from "../../../domain/entities/IReturnBookColumns";

export const createReturnBookColumns = (
  onRenew: (row: IReturnBookColumns) => void,
  onReturn: (row: IReturnBookColumns) => void,
): ColumnDef<IReturnBookColumns>[] => [
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
    accessorKey: "book_number",
    header: "Book No.",
    cell: ({ row }) => <div>{row.original.book_number || "N/A"}</div>,
  },
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "borrowed_date",
    header: "Borrowed Date",
    cell: ({ row }) => <div>{row.original.borrowed_date || "N/A"}</div>,
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
    cell: ({ row }) => <div>{row.original.return_date || "N/A"}</div>,
  },
  {
    accessorKey: "fine_amount",
    header: "Fine Amount",
    cell: ({ row }) => <div>{row.original.fine_amount ?? 0}</div>,
  },
  {
    accessorKey: "fine_status",
    header: "Fine Status",
    cell: ({ row }) => (
      <span className={cn()}>{row.original.fine_status.toLowerCase()}</span>
    ),
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row justify-start items-center gap-3">
        <Button
          className="flex flex-row gap-2"
          onClick={() => onRenew(row.original)}
        >
          <RotateCcw size={16} />
          Renew
        </Button>
        <Button
          className="flex flex-row gap-2"
          onClick={() => onReturn(row.original)}
          variant="destructive"
        >
          <CornerDownLeft size={16} />
          Return
        </Button>
      </div>
    ),
  },
];
