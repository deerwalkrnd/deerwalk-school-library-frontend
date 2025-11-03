"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { createReturnBookColumns } from "./columns/ReturnBookColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { RenewBookModal } from "./modals/RenewBookModal";
import { ReturnBookModal } from "./modals/ReturnBookModal";
import { useGetBookBorrows } from "../../application/IssueBookUseCase";
import { BorrowResponse } from "../../domain/entities/IssueEntity";
import { IIssueBookColumns } from "../../domain/entities/IIssueBookColumns";
import { IReturnBookColumns } from "../../domain/entities/IReturnBookColumns";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ReturnBookTableProps {
  filterParams: any;
  version: number;
}

const ReturnBookTable: React.FC<ReturnBookTableProps> = ({
  filterParams,
  version,
}) => {
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [openRenewModal, setOpenRenewModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [
    filterParams.searchable_value,
    filterParams.searchable_field,
    filterParams.start_date,
    filterParams.end_date,
    version,
  ]);

  const { data } = useGetBookBorrows({ page, ...filterParams });
  const handleRenew = (book: any) => {
    setSelectedBook(book);

    setOpenRenewModal(true);
  };

  const handleReturn = (book: any) => {
    setSelectedBook(book);

    setOpenReturnModal(true);
  };

  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const columns = useMemo(
    () => createReturnBookColumns(handleRenew, handleReturn),
    [handleRenew, handleReturn],
  );

  const tableData: IReturnBookColumns[] = useMemo(() => {
    return (
      data?.items?.map(
        (borrow: BorrowResponse): IReturnBookColumns => ({
          id: borrow.id,
          book_copy_id: borrow.book_copy.id,
          book_title: borrow.book_copy.book.title,
          author: borrow.book_copy.book.author,
          publication: borrow.book_copy.book.publication,
          student_name: borrow.user.name,
          type: borrow.book_copy.book.category,
          class: borrow.book_copy.book.grade,
          fine_status: borrow.fine_status,
          due_date: borrow.due_date,
          fine_accumulated: borrow.fine_accumulated,
          returned: borrow.returned,
          times_renewable: borrow.times_renewable,
          times_renewed: borrow.times_renewed,
        }),
      ) || []
    );
  }, [data]);

  return (
    <div>
      <h1 className="font-semibold text-2xl">Return</h1>

      <div className="overflow-x-scroll">
        <div className="max-w-[75vw]">
          <ScrollArea className="h-[54vh] w-max min-w-full">
            <DataTable
              columns={columns}
              data={tableData}
              enableSelection={false}
              enableFiltering={false}
              enablePagination={false}
            />
          </ScrollArea>
        </div>
      </div>
      <RenewBookModal onOpenChange={setOpenRenewModal} open={openRenewModal} />
      <ReturnBookModal
        onOpenChange={setOpenReturnModal}
        open={openReturnModal}
        studentName={selectedBook?.student_name || ""}
        rollNumber={selectedBook?.roll_number || ""}
        bookTitle={selectedBook?.book_title || ""}
        bookNumber={selectedBook?.book_copy_id || undefined}
        returnDate={selectedBook?.due_date || undefined}
        remark={selectedBook?.remark || ""}
        fineAmount={selectedBook?.fine_accumulated || 0}
        markAsPaidDefault={selectedBook?.fine_status === "yes" || false}
      />
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

export default ReturnBookTable;
