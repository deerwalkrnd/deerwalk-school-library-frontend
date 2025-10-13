"use client";

import { useState, useEffect, useCallback } from "react";
import { BooksTable } from "@/modules/Book Page/presentation/components/BooksTable";
import { CirclePlus, FileUp } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { AddBookModal } from "@/modules/BookModals/presentation/components/AddBook";
import { AddGenreModal } from "@/modules/BookModals/presentation/components/AddGenre";
import { ImportBooksModal } from "@/modules/BookModals/presentation/components/ImportBooks";
import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import type { BookQueryParams } from "@/modules/Book Page/domain/entities/bookRequest";

const BooksPage = () => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddGenreOpen, setIsAddGenreOpen] = useState(false);
  const [isImportBookOpen, setIsImportBookOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [queryParams, setQueryParams] = useState<BookQueryParams>({
    page: 1,
    limit: 10,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSearch = () => {
    const newParams: BookQueryParams = {
      page: 1,
      limit: 10,
    };

    if (search.trim()) {
      newParams.search = search.trim();
    }

    // Add date filtering when your API supports it
    if (startDate || endDate) {
      console.log("Date range:", { startDate, endDate });
      // You can add date parameters here when your backend supports them
    }

    setQueryParams(newParams);
  };

  const handleRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleModalClose = (modalSetter: (open: boolean) => void) => {
    return (open: boolean) => {
      modalSetter(open);
      if (!open) {
        // Trigger refresh when modal closes
        handleRefresh();
      }
    };
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="bg-white px-8 py-12 mx-auto font-sans">
      <div className="mb-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          Books
        </h1>
        <p className="text-gray-600 text-xs md:text-base lg:text-base">
          Search, Add, Update or Delete Books.
        </p>

        <div className="relative flex flex-row items-center mt-10 mb-4">
          <Search className="absolute left-2 text-gray-400" size={18} />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400"
            placeholder="Search using Book Title or Author"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="mb-4 flex justify-end">
          <div
            className="flex items-center gap-2 border-b border-black pb-1 cursor-pointer"
            onClick={() => setIsImportBookOpen(true)}
          >
            <FileUp className="w-3.5 h-3.5" />
            <span className="font-bold text-xs">Bulk Upload Books</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
              <div className="flex flex-col gap-2">
                <Label>Start Date</Label>
                <DatePicker selected={startDate} onSelect={setStartDate} />
              </div>

              <div className="flex flex-col gap-2">
                <Label>End Date</Label>
                <DatePicker selected={endDate} onSelect={setEndDate} />
              </div>

              <ApplyButton
                type="submit"
                onClick={handleSearch}
                className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
              >
                Apply
              </ApplyButton>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsAddBookOpen(true)}
              className={cn(
                "ml-auto flex items-center justify-center gap-1.5 h-9",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
            >
              <CirclePlus className="w-4 h-4" />
              Add Book
            </Button>

            <button
              onClick={() => setIsAddGenreOpen(true)}
              className={cn(
                "flex flex-wrap items-center justify-center gap-1.5 cursor-pointer border font-semibold p-3 rounded h-9 w-29",
                "text-sm leading-none tracking-tight",
              )}
            >
              <CirclePlus className="w-4 h-4" /> Add Genre
            </button>
          </div>
        </div>
      </div>

      <div>
        <BooksTable queryParams={queryParams} onRefresh={handleRefresh} />
      </div>

      <AddBookModal
        open={isAddBookOpen}
        onOpenChange={handleModalClose(setIsAddBookOpen)}
      />

      <AddGenreModal
        open={isAddGenreOpen}
        onOpenChange={handleModalClose(setIsAddGenreOpen)}
      />

      <ImportBooksModal
        open={isImportBookOpen}
        onOpenChange={handleModalClose(setIsImportBookOpen)}
      />
    </div>
  );
};

export default BooksPage;
