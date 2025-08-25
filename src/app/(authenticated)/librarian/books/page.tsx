import React from "react";
import { BooksTable } from "@/modules/Book Page/presentation/components/BooksTable";
import { Calendar28 } from "@/core/presentation/components/ui/Calendar28";
import { CirclePlus, FileUp } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

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
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
    },
    {
      id: "1",
      title: "HarryPotter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      bookNumber: "dss_342",
      publication: "XYZ Publication House",
      isbn: "324737429381",
      price: "Rs. 300",
      type: "Non-Academic",
      genre: "Fantasy",
      class: "",
      available: "Yes",
      dateAdded: "20/06/2025",
      action: "hello",
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

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-5">
            <div className="mb-6">
              <Calendar28 />
            </div>
            <button
              className={cn(
                "flex items-center justify-center",
                "gap-2 cursor-pointer font-semibold text-sm leading-none tracking-tight text-shadow-sm",
                "bg-white border border-black/10 rounded px-3 py-2",
                "w-20 h-8 shadow-sm",
              )}
            >
              Apply
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className={cn(
                "ml-auto flex items-center justify-center gap-1.5",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
            >
              <CirclePlus className="w-4 h-4" />
              Add Book
            </Button>
            <button
              className={cn(
                "flex flex-wrap items-center justify-center gap-1.5 cursor-pointer border font-semibold p-3 rounded h-9 w-29",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
            >
              <CirclePlus className="w-4 h-4" /> Add Genre
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto max-h-[600px]">
        <BooksTable data={mockBooks} isLoading={false} />
      </div>
    </div>
  );
};

export default page;
