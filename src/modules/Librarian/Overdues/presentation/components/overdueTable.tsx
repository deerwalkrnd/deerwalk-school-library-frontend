"use client";

import { useState } from "react";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { EditFineModal } from "./EditFine";
import { overdueColumns, OverDues } from "./overdueTableColumns";

interface BooksTableProps {
  data: OverDues[];
  isLoading?: boolean;
}

export const OverdueTable = ({ data, isLoading }: BooksTableProps) => {
  const [editFine, setEditFine] = useState<OverDues | null>(null);

  const handleRowClick = (book: OverDues) => {
    console.log("Book clicked:", book);
  };

  return (
    <div className="overflow-x-auto">
      <div className="max-w-[75vw]">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            enableFiltering={false}
            columns={overdueColumns}
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
