import { BooksTable } from "@/modules/Student/Books/presentation/components/BooksTable";
import React from "react";

const page = () => {
  const mockBooks = [
    {
      id: "1",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      isbn: "978-0134494166",
      category: "Software Engineering",
      status: "available" as const,
      publishedYear: 2017,
    },
    {
      id: "2",
      title: "Design Patterns",
      author: "Gang of Four",
      isbn: "978-0201633610",
      category: "Software Engineering",
      status: "borrowed" as const,
      publishedYear: 1994,
    },
  ];
  return <BooksTable data={mockBooks} />;
};

export default page;
