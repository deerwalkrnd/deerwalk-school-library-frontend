import { ColumnDef } from "@tanstack/react-table";
import { IRecommendationColumns } from "../../domain/entities/IRecommendationColumns";
import { Button } from "@/core/presentation/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const createRecommendationColumns = (
  handleEdit: (recommendation: IRecommendationColumns) => void,
  handleDelete: (recommendation: IRecommendationColumns) => void,
): ColumnDef<IRecommendationColumns>[] => [
  {
    accessorKey: "id",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const recommendation = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(recommendation)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(recommendation)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
