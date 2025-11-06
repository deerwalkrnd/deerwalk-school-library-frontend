"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IUserColumns } from "../../domain/entities/IUserColumns";
import Button from "@/core/presentation/components/Button/Button";
import { SquarePen, Trash } from "lucide-react";
import { cn } from "@/core/lib/utils";

export const createUserColumns = (
  onEdit: (row: IUserColumns) => void,
  onDelete: (row: IUserColumns) => void,
): ColumnDef<IUserColumns>[] => [
  {
    accessorKey: "id",
    header: "S.N",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "roll_number",
    header: "Roll No",
    cell: ({ row }) => <div>{row.original.roll_number || "N/A"}</div>,
  },
  {
    accessorKey: "graduating_year",
    header: "Graduating Year",
    cell: ({ row }) => <div>{row.original.graduating_year || "N/A"}</div>,
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span
        className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.original.role === "STUDENT"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800",
        )}
      >
        {row.original.role}
      </span>
    ),
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-between w-36 h-8 gap-3 opacity-100">
        <Button
          className="flex items-center justify-center gap-1 h-8 w-28 text-sm rounded border border-primary"
          onClick={() => onEdit(row.original)}
        >
          <SquarePen size={14} />
          Edit
        </Button>
        <button
          className={cn(
            "flex items-center justify-center",
            "h-8 w-8",
            "rounded border border-primary",
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
