"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import React from "react";
import TopOverDuesColumns from "./TopOverDuesColumns";

const TopOverDues = () => {
  const data: any[] = [
    {
      title: "Introduction to Algorithms",
      overdue_days: 12,
      borrowed_date: "2025-07-10",
    },
    { title: "Clean Code", overdue_days: 7, borrowed_date: "2025-08-01" },
    {
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      overdue_days: 20,
      borrowed_date: "2025-06-15",
    },
    {
      title: "JavaScript: The Good Parts",
      overdue_days: 3,
      borrowed_date: "2025-08-18",
    },
    {
      title: "Deep Learning with Python",
      overdue_days: 15,
      borrowed_date: "2025-07-25",
    },
    {
      title: "The Pragmatic Programmer",
      overdue_days: 8,
      borrowed_date: "2025-07-30",
    },
    {
      title: "Artificial Intelligence: A Modern Approach",
      overdue_days: 22,
      borrowed_date: "2025-06-20",
    },
    {
      title: "Refactoring: Improving the Design of Existing Code",
      overdue_days: 5,
      borrowed_date: "2025-08-10",
    },
    {
      title: "Operating System Concepts",
      overdue_days: 18,
      borrowed_date: "2025-07-12",
    },
    {
      title: "Database System Concepts",
      overdue_days: 10,
      borrowed_date: "2025-07-28",
    },
    {
      title: "You Don’t Know JS: Scope & Closures",
      overdue_days: 4,
      borrowed_date: "2025-08-15",
    },
    {
      title: "Programming Rust",
      overdue_days: 11,
      borrowed_date: "2025-07-21",
    },
    {
      title: "Python Crash Course",
      overdue_days: 6,
      borrowed_date: "2025-08-05",
    },
    {
      title: "Structure and Interpretation of Computer Programs",
      overdue_days: 25,
      borrowed_date: "2025-06-10",
    },
    { title: "Learning React", overdue_days: 9, borrowed_date: "2025-07-31" },
    {
      title: "Computer Networking: A Top-Down Approach",
      overdue_days: 14,
      borrowed_date: "2025-07-18",
    },
    { title: "Effective Java", overdue_days: 16, borrowed_date: "2025-07-14" },
    {
      title: "Grokking Algorithms",
      overdue_days: 2,
      borrowed_date: "2025-08-19",
    },
    {
      title: "Modern Operating Systems",
      overdue_days: 13,
      borrowed_date: "2025-07-09",
    },
    {
      title: "Head First Design Patterns",
      overdue_days: 19,
      borrowed_date: "2025-06-30",
    },
  ];
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mb-6">Top Overdues</h1>
      <div className="mt-4 h-80 w-full overflow-x-auto">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            data={data}
            columns={TopOverDuesColumns}
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

export default TopOverDues;
