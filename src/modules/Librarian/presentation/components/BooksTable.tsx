"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";

interface Book {
  id: string;
  title: string;
  author: string;
  bookNumber: string;
  publication: string;
  isbn: string;
  price: string;
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
