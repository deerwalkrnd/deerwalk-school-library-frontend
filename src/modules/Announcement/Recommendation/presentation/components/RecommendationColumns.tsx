"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IRecommendationColumns } from "../../domain/entities/IRecommendationColumns";
import Button from "@/core/presentation/components/Button/Button";
import { SquarePen, Trash } from "lucide-react";
import { cn } from "@/core/lib/utils";

interface BookInfo {
  author: string;
  publication: string;
}

export const createRecommendationColumns = (
  onEdit: (row: IRecommendationColumns) => void,
  onDelete: (row: IRecommendationColumns) => void,
): ColumnDef<IRecommendationColumns>[] => [
  {
    id: "sn",
    header: "S.N",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Recommender Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.original.designation}
      </div>
    ),
  },
  {
    accessorKey: "book_title",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.book_title}</div>
    ),
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p
          className="truncate text-sm text-muted-foreground"
          title={row.original.note}
        >
          {row.original.note || "No note provided"}
        </p>
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
          onClick={() => onEdit(row.original)}
        >
          <SquarePen />
          Edit
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
