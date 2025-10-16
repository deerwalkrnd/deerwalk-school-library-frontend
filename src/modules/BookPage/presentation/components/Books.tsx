"use client";
import { cn } from "@/core/lib/utils";
import Button from "@/core/presentation/components/Button/Button";
import { AddGenreModal } from "@/modules/BookModals/presentation/components/AddGenre";
import { ImportBooksModal } from "@/modules/BookModals/presentation/components/ImportBooks";
import { CirclePlus, FileUp } from "lucide-react";
import React, { useState } from "react";
import { BooksTable } from "./BooksTable";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { AddBookModal } from "@/modules/BookModals/presentation/components/AddBook";

const Books = () => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
  const [isImportBookOpen, setIsImportBookOpen] = useState(false);
  const { filters, apply, params, setFilters, version } = useServerFilters();

  return (
    <div className="flex flex-col">
      <FilterBar
        value={filters}
        onChange={setFilters}
        manual
        onSubmit={apply}
        placeholder="Search using Student Name"
      />

      <div className="flex flex-col gap-3 mb-4 items-end">
        <div
          className="flex items-center gap-2 border-b border-black pb-1 cursor-pointer"
          onClick={() => setIsImportBookOpen(true)}
        >
          <FileUp className="w-3.5 h-3.5" />
          <span className="font-bold text-xs">Bulk Upload Books</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsAddBookOpen(true)}
            className={cn(
              "inline-flex items-center gap-1.5 h-9 px-3",
              "text-sm leading-none tracking-tight text-shadow-sm",
            )}
          >
            <CirclePlus className="w-4 h-4" />
            Add Book
          </Button>

          <button
            onClick={() => setIsAddGenreOpen(true)}
            className={cn(
              "inline-flex items-center gap-1.5 cursor-pointer border font-semibold px-3 rounded h-9",
              "text-sm leading-none tracking-tight whitespace-nowrap",
            )}
          >
            <CirclePlus className="w-4 h-4" />
            Add Genre
          </button>
        </div>
      </div>

      <BooksTable filterParams={params} version={version} />

      <AddBookModal
        open={isAddBookOpen}
        onOpenChange={(open: boolean) => setIsAddBookOpen(open)}
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

export default Books;
