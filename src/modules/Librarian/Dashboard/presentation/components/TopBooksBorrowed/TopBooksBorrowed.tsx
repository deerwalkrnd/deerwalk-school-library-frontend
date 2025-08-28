import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import React from "react";
import TopBooksBorrowedColumns from "./TopBooksBorrowedColumns";
import { ITopBooksBorrowed } from "../../../domain/entities/ITopBooksBorrowed";

const TopBooksBorrowed = () => {
  const data: ITopBooksBorrowed[] = [
    { book_title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
    { book_title: "Clean Code", author: "Robert C. Martin" },
    {
      book_title:
        "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Erich Gamma",
    },
    { book_title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
    { book_title: "Deep Learning with Python", author: "François Chollet" },
    { book_title: "The Pragmatic Programmer", author: "Andrew Hunt" },
    {
      book_title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
    },
    {
      book_title: "Refactoring: Improving the Design of Existing Code",
      author: "Martin Fowler",
    },
    { book_title: "Operating System Concepts", author: "Abraham Silberschatz" },
    { book_title: "Database System Concepts", author: "Henry F. Korth" },
    {
      book_title: "You Don’t Know JS: Scope & Closures",
      author: "Kyle Simpson",
    },
    { book_title: "Programming Rust", author: "Jim Blandy" },
    { book_title: "Python Crash Course", author: "Eric Matthes" },
    {
      book_title: "Structure and Interpretation of Computer Programs",
      author: "Harold Abelson",
    },
    { book_title: "Learning React", author: "Alex Banks" },
    {
      book_title: "Computer Networking: A Top-Down Approach",
      author: "James F. Kurose",
    },
    { book_title: "Effective Java", author: "Joshua Bloch" },
    { book_title: "Grokking Algorithms", author: "Aditya Bhargava" },
    { book_title: "Modern Operating Systems", author: "Andrew S. Tanenbaum" },
    { book_title: "Head First Design Patterns", author: "Eric Freeman" },
  ];
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mb-6">Top Books Borrowed</h1>
      <div className="mt-4 h-80 w-full overflow-x-auto">
        <ScrollArea className="h-full w-max min-w-full">
          <DataTable
            data={data}
            columns={TopBooksBorrowedColumns}
            enableSelection={false}
            enableFiltering={false}
            enablePagination={false}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TopBooksBorrowed;
