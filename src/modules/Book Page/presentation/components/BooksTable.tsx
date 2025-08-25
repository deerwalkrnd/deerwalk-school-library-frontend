"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import Button from "@/core/presentation/components/Button/Button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  bookNumber: string;
  publication: string;
  isbn: string;
  price: string;
  type: string;
  genre: string;
  class: string;
  available: string;
  dateAdded: string;
  action: string;
}

const columns: ColumnDef<Book>[] = [
  {
    header: "S.N.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "bookNumber",
    header: "Book Number",
  },
  {
    accessorKey: "publication",
    header: "Publication",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "type",
    header: " Type",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "available",
    header: "Available",
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button onClick={() => console.log("Edit", book)}>
            <Pencil size={14} /> Edit
          </Button>
          <Button onClick={() => console.log("View Comments", book)}>
            <Eye size={14} /> View Comments
          </Button>
          <Button onClick={() => console.log("Delete", book)}>
            <Trash2 size={14} />
          </Button>
        </div>
      );
    },
  },
];

interface BooksTableProps {
  data: Book[];
  isLoading?: boolean;
}

export const BooksTable = ({ data, isLoading }: BooksTableProps) => {
  const handleRowClick = (book: Book) => {
    console.log("Book clicked:", book);
  };

  return (
    <div className="w-[1100px]">
      <DataTable
        // enableFiltering={false}
        columns={columns}
        data={data}
        searchKey="title"
        searchPlaceholder="Search using ISBN, Title, Author..."
        isLoading={isLoading}
        onRowClick={handleRowClick}
        enableSelection={true}
        pageSize={10}
      />
    </div>
  );
};
