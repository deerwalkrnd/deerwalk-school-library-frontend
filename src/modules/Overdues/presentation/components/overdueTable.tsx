"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { EditFineModal } from "./EditFine";

interface OverDues {
  id: number;
  studentName: string;
  bookTitle: string;
  author: string;
  bookNumber: string;
  isbn: string;
  borrowedDate: string;
  returnDate: string;
  overdueDays: number;
  fineAmount: number;
}

interface BooksTableProps {
  data: OverDues[];
  isLoading?: boolean;
}

export const OverdueTable = ({ data, isLoading }: BooksTableProps) => {
  const [editFine, setEditFine] = useState<OverDues | null>(null);

  const handleRowClick = (book: OverDues) => {
    console.log("Book clicked:", book);
  };

  const columns: ColumnDef<OverDues>[] = [
    {
      header: "S.N.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
    },
    {
      accessorKey: "bookTitle",
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
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "borrowedDate",
      header: "Borrowed Date",
    },
    {
      accessorKey: "returnDate",
      header: " Return Date",
    },
    {
      accessorKey: "overdueDays",
      header: "Overdue Days",
    },
    {
      accessorKey: "fineAmount",
      header: "Fine Amount",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className=" max-w-[75vw]">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            enableFiltering={false}
            columns={columns}
            data={data}
            searchKey="title"
            searchPlaceholder="Search using ISBN, Title, Author..."
            isLoading={isLoading}
            onRowClick={handleRowClick}
            enableSelection={false}
            enablePagination={false}
            pageSize={6}
          />
        </ScrollArea>
      </div>
      <EditFineModal
        open={!!editFine}
        onOpenChange={(open) => {
          if (!open) setEditFine(null);
        }}
      />
    </div>
  );
};
