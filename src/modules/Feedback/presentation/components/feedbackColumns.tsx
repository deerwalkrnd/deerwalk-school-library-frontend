"use client";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Eye, Trash } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { IFeedbackColumns } from "../../domain/entities/IFeedbackColumns";

export const createFeedbackColumns = (
  onView: (row: IFeedbackColumns) => void,
): ColumnDef<IFeedbackColumns>[] => [
  {
    accessorKey: "id",
    header: "S.N",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "user.name",
    header: "Student Name",
    cell: ({ row }) => {
      return row.original.user.name.toLocaleLowerCase();
    },
  },
  {
    accessorKey: "subject",
    header: "Feedback Subject",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const rawDate = row.original.created_at;
      const formatted = new Date(rawDate).toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-row justify-start items-center gap-3">
        <Button
          className="flex flex-row gap-2"
          onClick={() => onView(row.original)}
        >
          <Eye />
          View Details
        </Button>
      </div>
    ),
  },
];
