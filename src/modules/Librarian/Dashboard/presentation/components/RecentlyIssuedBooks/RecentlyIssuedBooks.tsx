"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import React from "react";
import RecentlyIssuedBooksColumns from "./RecentlyIssuedBooksColumns";
import { IRecentlyIssuedBooks } from "../../../domain/entities/IRecentlyIssuedBooks";

const RecentlyIssuedBooks = () => {
  const data: IRecentlyIssuedBooks[] = [
    {
      student_name: "Krish Devkota",
      book: "Introduction to Algorithms",
      book_number: 123,
      borrowed_date: "2025-08-01",
      return_date: "2025-08-15",
    },
    {
      student_name: "Aarav Shrestha",
      book: "Clean Code",
      book_number: 456,
      borrowed_date: "2025-08-03",
      return_date: "2025-08-17",
    },
    {
      student_name: "Saanvi Gurung",
      book: "Design Patterns",
      book_number: 444,
      borrowed_date: "2025-08-05",
      return_date: "2025-08-19",
    },
    {
      student_name: "Rohan Thapa",
      book: "JavaScript: The Good Parts",
      book_number: 6656,
      borrowed_date: "2025-08-06",
      return_date: "2025-08-20",
    },
    {
      student_name: "Diya KC",
      book: "Deep Learning with Python",
      book_number: 545,
      borrowed_date: "2025-08-07",
      return_date: "2025-08-21",
    },
    {
      student_name: "Nishan Lama",
      book: "The Pragmatic Programmer",
      book_number: 545,
      borrowed_date: "2025-08-08",
      return_date: "2025-08-22",
    },
    {
      student_name: "Mira Rai",
      book: "Artificial Intelligence: A Modern Approach",
      book_number: 54545,
      borrowed_date: "2025-08-09",
      return_date: "2025-08-23",
    },
    {
      student_name: "Aditya Shahi",
      book: "Refactoring",
      book_number: 545,
      borrowed_date: "2025-08-10",
      return_date: "2025-08-24",
    },
  ];
  return (
    <div className="w-full mb-6">
      <h1 className="font-bold text-xl">Recently Issued Books</h1>
      <div className="mt-4 h-80 w-full overflow-x-auto">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            data={data}
            columns={RecentlyIssuedBooksColumns}
            // isLoading={isLoading}
            enableSelection={false}
            enableFiltering={false}
            enablePagination={false}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecentlyIssuedBooks;
