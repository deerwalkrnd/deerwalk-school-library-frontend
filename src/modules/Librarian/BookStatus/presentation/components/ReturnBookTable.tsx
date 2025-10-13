"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useEffect, useMemo, useState } from "react";
import { createReturnBookColumns } from "./ReturnBookColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { RenewBookModal } from "./RenewBookModal";
import { ReturnBookModal } from "./ReturnBookModal";

const ReturnBookTable = () => {
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [openRenewModal, setOpenRenewModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  useEffect(() => {
    setPage(1);
  }, []);

  const data = [
    {
      id: 0,
      book_title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      book_number: "B001",
      student_name: "Aarav Sharma",
      borrowed_date: "2025-09-20",
      return_date: "2025-10-05",
      fine_amount: 0,
      fine_status: "PAID",
    },
    {
      id: 1,
      book_title: "Clean Code",
      author: "Robert C. Martin",
      book_number: "B002",
      student_name: "Sita Khadka",
      borrowed_date: "2025-09-15",
      return_date: "2025-09-30",
      fine_amount: 50,
      fine_status: "UNPAID",
    },
    {
      id: 2,
      book_title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      book_number: "B003",
      student_name: "Ramesh Karki",
      borrowed_date: "2025-09-25",
      return_date: "2025-10-10",
      fine_amount: 0,
      fine_status: "PAID",
    },
    {
      id: 3,
      book_title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      book_number: "B004",
      student_name: "Manish Thapa",
      borrowed_date: "2025-09-10",
      return_date: "2025-09-25",
      fine_amount: 100,
      fine_status: "UNPAID",
    },
    {
      id: 4,
      book_title: "You Don’t Know JS Yet",
      author: "Kyle Simpson",
      book_number: "B005",
      student_name: "Priya Shrestha",
      borrowed_date: "2025-09-22",
      return_date: "2025-10-07",
      fine_amount: 0,
      fine_status: "PAID",
    },
    {
      id: 5,
      book_title: "Deep Learning with Python",
      author: "François Chollet",
      book_number: "B006",
      student_name: "Kiran Rai",
      borrowed_date: "2025-09-18",
      return_date: "2025-10-03",
      fine_amount: 25,
      fine_status: "UNPAID",
    },
  ];

  const handleRenew = () => {
    setOpenRenewModal(true);
  };
  const handleReturn = () => {
    setOpenReturnModal(true);
  };

  const currentPage = 1;
  const totalPages = 5;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = true;

  const columns = useMemo(
    () => createReturnBookColumns(handleRenew, handleReturn),
    [handleRenew, handleReturn],
  );
  return (
    <div>
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          columns={columns}
          data={data as any}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      <RenewBookModal onOpenChange={setOpenRenewModal} open={openRenewModal} />
      <ReturnBookModal
        onOpenChange={setOpenReturnModal}
        open={openReturnModal}
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
