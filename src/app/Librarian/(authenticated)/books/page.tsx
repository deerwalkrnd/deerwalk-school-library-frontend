import React from "react";
import { BooksTable } from "@/modules/Librarian/presentation/components/BooksTable";
import { Calendar28 } from "@/core/presentation/components/ui/Calendar28";

const page = () => {
  const mockBooks = [
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
    },
  ];
  return (
    <div className="min-h-screen bg-white px-8 py-12 mx-auto font-sans">
      <div className="mb-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          Books
        </h1>
        <p className="text-gray-600 mb-8 text-xs md:text-base lg:text-base">
          Search, Add, Update or Delete Books.
        </p>
        <Calendar28 />
      </div>
      <BooksTable data={mockBooks} isLoading={false} />
    </div>
  );
};

export default page;
