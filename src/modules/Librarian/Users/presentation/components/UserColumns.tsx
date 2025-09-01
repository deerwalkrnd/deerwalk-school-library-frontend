"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IUserColumns } from "../../domain/entities/IUserColumns";
import Button from "@/core/presentation/components/Button/Button";
import { SquarePen, Trash } from "lucide-react";

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
        <Button
          className="!bg-red-600 text-red"
          onClick={() => onDelete(row.original)}
        >
          <Trash />
        </Button>
      </div>
    ),
  },
];
