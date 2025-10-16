"use client";

import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { borrowColumns } from "./BorrowTableColumns";
import { BookData } from "../../domain/entities/studentProfileEntity";

interface BooksTableProps {
  data: BookData[];
  isLoading?: boolean;
}

export const BorrowTable = ({ data, isLoading }: BooksTableProps) => {
  const handleRowClick = (book: BookData) => {
    console.log("Book clicked:", book);
  };

  return (
    <div className="overflow-x-auto">
      <div className="max-w-[75vw]">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            enableFiltering={false}
            columns={borrowColumns}
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
    </div>
  );
};
