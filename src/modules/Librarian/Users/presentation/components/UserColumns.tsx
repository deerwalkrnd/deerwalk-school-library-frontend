"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IUserColumns } from "../../domain/entities/IUserColumns";
import Button from "@/core/presentation/components/Button/Button";
import { Delete, Trash } from "lucide-react";

export const UserColumns: ColumnDef<IUserColumns>[] = [
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
      <div className="flex flex-row justify-center items-center gap-3">
        <Button onClick={() => console.log(row.original)}>Edit</Button>
        <Button className="">
          <Trash />
        </Button>
      </div>
    ),
  },
];
