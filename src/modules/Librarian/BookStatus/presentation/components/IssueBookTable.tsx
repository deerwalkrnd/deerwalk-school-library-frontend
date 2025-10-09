"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { createIssueBookColumns } from "./IssueBookColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { getIssueRequests } from "../../application/IssueBookUseCase";
import { Paginated } from "@/core/lib/Pagination";
import { IIssueBookColumns } from "../../domain/entities/IIssueBookColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { ReissueBookModal } from "./ReIssueModal";
import { DeleteModal } from "./DeleteIssue";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";

const IssueBookTable = () => {
  const data: IIssueBookColumns[] = [
    {
      id: "0",
      book_title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publication: "Charles Scribner's Sons",
      student_name: "Aarav Shrestha",
      type: "REFERENCE",
      class: "10A",
      borrowed_date: "2025-10-02",
    },
    {
      id: "1",
      book_title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publication: "J.B. Lippincott & Co.",
      student_name: "Sita Karki",
      type: "ISSUE",
      class: "9B",
      borrowed_date: "2025-09-25",
    },
    {
      id: "2",
      book_title: "1984",
      author: "George Orwell",
      publication: "Secker & Warburg",
      student_name: "Ramesh Thapa",
      type: "REFERENCE",
      class: "11C",
      borrowed_date: "2025-10-05",
    },
    {
      id: "3",
      book_title: "The Alchemist",
      author: "Paulo Coelho",
      publication: "HarperCollins",
      student_name: "Mina Gurung",
      type: "ISSUE",
      class: "12A",
      borrowed_date: "2025-10-05",
    },
    {
      id: "4",
      book_title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      publication: "",
      student_name: "Bikash Lama",
      type: "REFERENCE",
      class: "11B",
      borrowed_date: "2025-09-28",
    },
    {
      id: "5",
      book_title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publication: "Little, Brown and Company",
      student_name: "Laxmi Shrestha",
      type: "ISSUE",
      class: "10C",
      borrowed_date: "2025-10-06",
    },
  ];
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<IIssueBookColumns | null>(
    null,
  );
  const [openReissue, setReissueOpen] = useState<boolean>(false);
  const [openManualIssueModal, setOpenManualIssueModal] =
    useState<boolean>(false);
  const [deleteBookOpen, setDeleteBookOpen] = useState<boolean>(false);

  // const { data } = getIssueRequests();
  console.log(data);

  useEffect(() => {
    setPage(1);
  }, []);

  const currentPage = 1;
  const totalPages = 5;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = true;

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

  const { filters, setFilters, params, version, apply } = useServerFilters();

  return (
    <div>
      <div className="mb-10">
        <FilterBar
          value={filters}
          onChange={setFilters}
          manual
          onSubmit={apply}
          placeholder="Search using Student Name, ISBN, Book TItle, Author"
        />
      </div>
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          columns={columns}
          data={data as any}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      {selectedBook && (
        <ReissueBookModal onOpenChange={setReissueOpen} open={openReissue} />
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
