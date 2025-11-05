"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { IIssueBookColumns } from "../../domain/entities/IIssueBookColumns";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { DeleteModal } from "./modals/DeleteIssue";
import { createIssueBookColumns } from "./columns/IssueBookColumns";
import { IssueBookModal } from "./modals/IssueModal";
import { useGetBookBorrows } from "../../application/IssueBookUseCase";
import { BorrowResponse } from "../../domain/entities/IssueEntity";
import { getReservedBooks } from "@/modules/BorrowReserve/application/ReserveUseCase";

type FilterParams = {
  searchable_value?: string;
  searchable_field?: string;
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version: number };

const IssueBookTable = ({ filterParams = {}, version }: Props) => {
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<IIssueBookColumns | null>(
    null,
  );
  const [openReissue, setReissueOpen] = useState<boolean>(false);
  const [deleteBookOpen, setDeleteBookOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(1);
  }, [
    filterParams.searchable_value,
    filterParams.searchable_field,
    filterParams.start_date,
    filterParams.end_date,
    version,
  ]);

  // const { data } = useGetBookBorrows({ page, ...filterParams });
  const { data } = getReservedBooks({ page, ...filterParams });
  const tableData: IIssueBookColumns[] = useMemo(() => {
    return (
      data?.items?.map(
        (borrow: BorrowResponse): IIssueBookColumns => ({
          id: borrow.id,
          user_id: borrow.user_id,
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
  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const handleDelete = (book: IIssueBookColumns) => {
    setSelectedBook(book);
    setDeleteBookOpen(true);
  };

  const handleReIssue = (book: IIssueBookColumns) => {
    setSelectedBook(book);
    console.log(book);
    setReissueOpen(true);
  };

  const columns = useMemo(
    () => createIssueBookColumns(handleReIssue, handleDelete),
    [handleReIssue, handleDelete],
  );

  return (
    <div>
      <h1 className="font-semibold text-2xl">Borrow Requests</h1>
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
      {selectedBook && (
        <IssueBookModal
          book_id={selectedBook.id}
          book_copy_id={selectedBook.book_copy_id}
          onOpenChange={setReissueOpen}
          open={openReissue}
          studentId={selectedBook.user_id!}
        />
      )}
      {selectedBook && (
        <DeleteModal
          id={selectedBook?.id}
          onOpenChange={setDeleteBookOpen}
          open={deleteBookOpen}
        />
      )}
    </div>
  );
};

export default IssueBookTable;
