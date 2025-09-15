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
    accessorKey: "student_name",
    header: "Student Name",
  },
  { accessorKey: "roll_no", header: "Roll No" },
  { accessorKey: "class", header: "Class" },
  { accessorKey: "email", header: "Email" },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row justify-start items-center gap-3">
        <Button
          className="flex flex-row gap-2"
          onClick={() => onEdit(row.original)}
        >
          <SquarePen />
          Edit
        </Button>
        <button
          className={cn(
            " flex items-center justify-center gap-2",
            "h-8 w-8",
            "rounded border border-primary",
            "px-2",
            "cursor-pointer text-sm leading-none tracking-tight",
          )}
        >
          <Trash size={14} />
        </button>
      </div>
    ),
  },
];
