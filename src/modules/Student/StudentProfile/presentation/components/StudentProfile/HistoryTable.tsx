"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@/core/presentation/components/pagination/Pagination";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { createHistoryBookColumns } from "./HistoryTableColumns";
import { IHistoryBookColumns } from "../../../domain/entities/IHistoryColumns";
import { BorrowResponse } from "@/modules/Librarian/BookStatus/domain/entities/IssueEntity";

interface HistoryBookTableProps {
  data: any;
}

const HistoryTable: React.FC<HistoryBookTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [openRenewModal, setOpenRenewModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  useEffect(() => {
    setPage(1);
  }, []);

  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const columns = useMemo(() => createHistoryBookColumns(), []);

  const tableData: IHistoryBookColumns[] = useMemo(() => {
    return (
      data?.items?.map(
        (borrow: BorrowResponse): IHistoryBookColumns => ({
          id: borrow.id,
          book_copy_id: borrow.book_copy.id,
          book_title: borrow.book_copy.book.title,
          author: borrow.book_copy.book.author,
          publication: borrow.book_copy.book.publication,
          fine_rate: borrow.fine_rate,
          student_name: borrow.user.name,
          roll_number: borrow.user.roll_number,
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
      <div className="overflow-x-scroll">
        <div className="max-w-[75vw]">
          <ScrollArea className="max-h-[54vh] w-max min-w-full">
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

export default HistoryTable;
