"use client";

import React, { useState, useMemo } from "react";
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import Button from "@/core/presentation/components/Button/Button";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { cn } from "@/core/lib/utils";
import { createQuoteColumns } from "./QuoteColumns";
import { AddQuoteModal } from "@/modules/Announcement/Quotes/presentation/components/AddQuote";
import { EditQuoteModal } from "@/modules/Announcement/Quotes/presentation/components/EditQuote";
import { DeleteModal } from "@/modules/Announcement/Quotes/presentation/components/DeleteQuote";
import { useGetQuotes } from "../../application/quoteUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { IQuoteColumns } from "../../domain/entities/IQuoteColumns";

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<IQuoteColumns | null>(
    null,
  );
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useGetQuotes({ page });

  const realData = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const filteredData = useMemo(() => {
    return realData.filter((quote: IQuoteColumns) => {
      const matchesSearch =
        searchTerm === "" ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase());

      const quoteDate = new Date(quote.created_at);
      const withinDateRange =
        (!startDate || quoteDate >= startDate) &&
        (!endDate || quoteDate <= endDate);

      return matchesSearch && withinDateRange;
    });
  }, [realData, searchTerm, startDate, endDate]);

  const handleEdit = (quote: IQuoteColumns) => {
    setSelectedQuote(quote);
    setIsEditOpen(true);
  };

  const handleDelete = (quote: IQuoteColumns) => {
    setSelectedQuote(quote);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () => createQuoteColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center text-red-500">
          Error loading quotes: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-row gap-8 flex-1">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by author or quote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rounded-md"
            />
          </div>
        </div>
        <Button
          onClick={() => setIsAddQuoteOpen(true)}
          className={cn("flex items-center justify-center gap-2")}
        >
          <CirclePlus className="w-4 h-4" />
          Add Quote
        </Button>

        <AddQuoteModal open={isAddQuoteOpen} onOpenChange={setIsAddQuoteOpen} />
      </div>
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
          type="button"
          className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
        >
          Apply
        </ApplyButton>
      </div>

      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          data={filteredData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />
      {selectedQuote && (
        <EditQuoteModal
          quotes={selectedQuote}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {selectedQuote && (
        <DeleteModal
          quote={selectedQuote}
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          id={""}
        />
      )}
    </div>
  );
};

export default Quotes;
