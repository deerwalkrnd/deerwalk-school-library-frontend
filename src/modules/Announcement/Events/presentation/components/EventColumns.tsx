"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IEventColumns } from "../../domain/entities/IEventColumns";
import Button from "@/core/presentation/components/Button/Button";
import { SquarePen, Trash } from "lucide-react";
import { cn } from "@/core/lib/utils";

export const createEventColumns = (
  onEdit: (row: IEventColumns) => void,
  onDelete: (row: IEventColumns) => void,
): ColumnDef<IEventColumns>[] => [
  {
    accessorKey: "id",
    header: "S.N",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Event Name",
  },
  {
    accessorKey: "event_date",
    header: "Event Date",
    cell: ({ row }) => (
      <div>
        {row.original.event_date
          ? new Date(row.original.event_date).toISOString().split("T")[0]
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.image_url ? (
          <img
            src={row.original.image_url}
            alt={row.original.name}
            className="h-10 w-10 rounded-md object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original.description}>
        {row.original.description || "N/A"}
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
            " flex items-center justify-center gap-2",
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
