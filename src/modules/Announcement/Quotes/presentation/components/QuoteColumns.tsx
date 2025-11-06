"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IQuoteColumns } from "../../domain/entities/IQuoteColumns";
import Button from "@/core/presentation/components/Button/Button";
import { SquarePen, Trash } from "lucide-react";
import { cn } from "@/core/lib/utils";

const safeParseDate = (value?: string | null) => {
  if (!value) return null;
  const candidate = value.includes(" ") ? value.replace(" ", "T") : value;
  const d = new Date(candidate);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const createQuoteColumns = (
  onEdit: (row: IQuoteColumns) => void,
  onDelete: (row: IQuoteColumns) => void,
): ColumnDef<IQuoteColumns>[] => [
  {
    id: "sn",
    header: "S.N",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "quote",
    header: "Quote of the day",
    cell: ({ row }) => <div>{row.original.quote || "N/A"}</div>,
  },
  {
    accessorKey: "author",
    header: "Quote By",
    cell: ({ row }) => <div> {row.original.author || "N/A"}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
    cell: ({ row }) => {
      const d = safeParseDate(row.original.created_at);
      return <div>{d ? d.toLocaleDateString() : "—"}</div>;
    },
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
