import React from "react";
import { BooksTable } from "@/modules/Librarian/presentation/components/BooksTable";
import { Calendar28 } from "@/core/presentation/components/ui/Calendar28";
import { Button } from "@/core/presentation/components/ui/button";
import { CirclePlus } from "lucide-react";
import { FileUp } from "lucide-react";

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
        <p className="text-gray-600 text-xs md:text-base lg:text-base">
          Search, Add, Update or Delete Books.
        </p>
        <div className="mb-4 flex justify-end ">
          <div className="flex items-center gap-2 border-b border-black pb-1">
            <FileUp className="w-3.5 h-3.5" />
            <span className="font-bold text-xs">Bulk Upload Books</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="mb-6">
              <Calendar28 />
            </div>
            <Button className="bg-white text-black border border-gray-300">
              Apply
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              <CirclePlus />
              Add Book
            </Button>
            <Button className="bg-white text-black border border-gray-300">
              <CirclePlus /> Add Genre
            </Button>
          </div>
        </div>
      </div>
      <BooksTable data={mockBooks} isLoading={false} />
    </div>
  );
};

export default page;
