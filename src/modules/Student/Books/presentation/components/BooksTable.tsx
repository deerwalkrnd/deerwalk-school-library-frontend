"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { useAuth } from "@/core/presentation/contexts/AuthContext";
import { Button } from "@/core/presentation/components/ui/button";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: "available" | "borrowed" | "reserved";
  publishedYear: number;
}

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "publishedYear",
    header: "Year",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        available: "bg-green-100 text-green-800",
        borrowed: "bg-red-100 text-red-800",
        reserved: "bg-yellow-100 text-yellow-800",
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[status as keyof typeof statusColors]
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="flex space-x-2">
          {book.status === "available" && (
            <Button size="sm" variant="outline">
              Borrow
            </Button>
          )}
          {book.status === "borrowed" && (
            <Button size="sm" variant="outline">
              Reserve
            </Button>
          )}
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
    // Navigate to book details or open modal
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="title"
      searchPlaceholder="Search books..."
      isLoading={isLoading}
      onRowClick={handleRowClick}
      enableSelection={true}
      pageSize={15}
    />
  );
};
