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
    cell: ({ row }) => <div>{Number(row.index) + 1}</div>,
  },
  {
    accessorKey: "book_title",
    header: "Book Title",
  },
  {
    accessorKey: "book_copy_id",
    header: "Book Copy ID",
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
    cell: ({ row }) => <span>{row.original.type || "N/A"}</span>,
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "fine_status",
    header: "Fine Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "px-2 py-1 rounded text-xs text-center font-medium",
          row.original.fine_status === "PENDING"
            ? "bg-yellow-100 text-yellow-700"
            : row.original.fine_status === "PAID"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600",
        )}
      >
        {row.original.fine_status || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "fine_accumulated",
    header: "Fine (Rs)",
    cell: ({ row }) => (
      <div>
        {row.original.fine_accumulated
          ? `Rs. ${row.original.fine_accumulated}`
          : "0"}
      </div>
    ),
  },
  {
    accessorKey: "returned",
    header: "Returned",
    cell: ({ row }) => (
      <span
        className={cn(
          "px-2 py-1 rounded text-xs font-medium",
          row.original.returned
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700",
        )}
      >
        {row.original.returned ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => (
      <div>{row.original.due_date ? row.original.due_date : "N/A"}</div>
    ),
  },
  {
    accessorKey: "times_renewable",
    header: "Renewable",
    cell: ({ row }) => <div>{row.original.times_renewable ?? 0}</div>,
  },
  {
    accessorKey: "times_renewed",
    header: "Renewed",
    cell: ({ row }) => <div>{row.original.times_renewed ?? 0}</div>,
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row justify-start items-center gap-3">
        <Button
          className="flex flex-row gap-2 cursor-pointer"
          onClick={() => onRenew(row.original)}
        >
          <RotateCcw size={16} />
          Renew
        </Button>
        <Button
          className="flex flex-row gap-2 cursor-pointer"
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
