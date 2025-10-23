"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { IIssueBookColumns } from "../../domain/entities/IIssueBookColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DeleteModal } from "./modals/DeleteIssue";
import { createIssueBookColumns } from "./columns/IssueBookColumns";
import { IssueBookModal } from "./modals/IssueModal";

interface IssueBookTableProps {
  filterParams: any; // Adjust type based on your actual filter params structure
  version: number;
}

const IssueBookTable: React.FC<IssueBookTableProps> = ({
  filterParams,
  version,
}) => {
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<IIssueBookColumns | null>(
    null,
  );
  const [openReissue, setReissueOpen] = useState<boolean>(false);
  const [deleteBookOpen, setDeleteBookOpen] = useState<boolean>(false);

  // Sample data (replace with actual data fetching logic)
  const data: IIssueBookColumns[] = [
    // ... (your existing data array)
  ];

  useEffect(() => {
    setPage(1);
  }, [filterParams, version]);

  const currentPage = 1;
  const totalPages = 5;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = true;

  //  const currentPage = data?.page ?? 1;
  // const totalPages = currentPage + 10;
  // const hasPreviousPage = currentPage > 1;
  // const hasNextPage = data?.hasNextPage;
  const handleDelete = (book: IIssueBookColumns) => {
    setSelectedBook(book);
    setDeleteBookOpen(true);
  };

  const handleReIssue = (book: IIssueBookColumns) => {
    setSelectedBook(book);
    setReissueOpen(true);
  };

  const columns = useMemo(
    () => createIssueBookColumns(handleReIssue, handleDelete),
    [handleReIssue, handleDelete],
  );

  return (
    <div>
      <h1 className="font-semibold text-2xl">Borrow Requests</h1>
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          columns={columns}
          data={data as any}
          enableSelection={false}
          enableFiltering={true} // Enable filtering if needed
          enablePagination={false}
        />
      </ScrollArea>
      {selectedBook && (
        <IssueBookModal
          book_id={selectedBook.id}
          onOpenChange={setReissueOpen}
          open={openReissue}
        />
      )}
      {selectedBook && (
        <DeleteModal
          id={selectedBook?.id}
          onOpenChange={setDeleteBookOpen}
          open={deleteBookOpen}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default IssueBookTable;
