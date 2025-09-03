"use client";

import React, { useState } from "react";
import { BooksTable } from "@/modules/Book Page/presentation/components/BooksTable";
import { Calendar28 } from "@/core/presentation/components/ui/Calendar28";
import { CirclePlus, FileUp } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { AddBookModal } from "@/modules/BookModals/presentation/components/AddBook";
import { mockBooks } from "@/modules/Book Page/data/bookData";
import { AddGenreModal } from "@/modules/BookModals/presentation/components/AddGenre";
import { ImportBooksModal } from "@/modules/BookModals/presentation/components/ImportBooks";

const page = () => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
  const [isImportBookOpen, setIsImportBookOpen] = useState(false);

  return (
    <div className="bg-white px-4 py-6 sm:py-8 md:py-12 mx-auto font-sans">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          Books
        </h1>
        <p className="text-gray-600 text-xs md:text-base lg:text-base">
          Search, Add, Update or Delete Books.
        </p>
        <div className="mt-4 flex justify-end">
          <div
            className="flex items-center gap-2 border-b border-black pb-1 cursor-pointer"
            onClick={() => setIsImportBookOpen(true)}
          >
            <FileUp className="w-3.5 h-3.5" />
            <span className="font-bold text-xs">Bulk Upload Books</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <Calendar28 />
            <button
              className={cn(
                "flex items-center justify-center",
                "gap-2 cursor-pointer font-semibold text-sm leading-none tracking-tight text-shadow-sm",
                "bg-white border border-black/10 rounded px-3 py-2",
                "w-20 h-9 shadow-sm",
              )}
            >
              Apply
            </button>
          </div>
          <div className="flex flex-row gap-2 sm:gap-3 items-end">
            <Button
              onClick={() => setIsAddBookOpen(true)}
              className={cn(
                "flex items-center justify-center gap-1.5 h-9",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
            >
              <CirclePlus className="w-4 h-4" />
              Add Book
            </Button>
            <button
              onClick={() => setIsAddGenreOpen(true)}
              className={cn(
                "flex items-center justify-center gap-1.5 cursor-pointer border font-semibold px-3 rounded h-9",
                "text-sm leading-none tracking-tight",
              )}
            >
              <CirclePlus className="w-4 h-4" /> Add Genre
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <BooksTable data={mockBooks} isLoading={false} />
      </div>

      <AddBookModal
        open={isAddBookOpen}
        onOpenChange={(open) => setIsAddBookOpen(open)}
      />

      <AddGenreModal
        open={isAddGenreOpen}
        onOpenChange={(open) => setIsAddGenreOpen(open)}
      />

      <ImportBooksModal
        open={isImportBookOpen}
        onOpenChange={(open) => setIsImportBookOpen(open)}
      />
    </div>
  );
};

export default page;
