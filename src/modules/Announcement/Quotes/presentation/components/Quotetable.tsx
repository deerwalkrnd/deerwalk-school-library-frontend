"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { EditQuoteModal } from "@/modules/Announcement/Quotes/presentation/components/EditQuote";
import { DeleteModal } from "@/modules/Announcement/Quotes/presentation/components/DeleteQuote";
import { useGetQuotes } from "../../application/quoteUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { IQuoteColumns } from "../../domain/entities/IQuoteColumns";
import FilterBar from "@/core/presentation/components/FilterBar/FilterBar";
import { useServerFilters } from "@/core/hooks/useServerFilters";
import { AddQuoteModal } from "./AddQuote";

type FilterParams = {
  searchable_value?: string;
  searchable_field?: string;
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version?: number };

const QuotesTable = ({ filterParams = {}, version }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [appliedStartDate, setAppliedStartDate] = useState<Date | undefined>();
  const [appliedEndDate, setAppliedEndDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<IQuoteColumns | null>(
    null,
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [
    filterParams.searchable_value,
    filterParams.searchable_field,
    filterParams.start_date,
    filterParams.end_date,
    version,
  ]);

  const { data, isLoading, isError, error } = useGetQuotes({
    page,
    ...filterParams,
  });

  const realData = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const filteredData = useMemo(() => {
    const parse = (v?: string) => {
      if (!v) return null;
      const c = v.includes(" ") ? v.replace(" ", "T") : v;
      const d = new Date(c);
      return Number.isNaN(d.getTime()) ? null : d;
    };

    return realData.filter((quote: IQuoteColumns) => {
      const matchesSearch =
        searchTerm === "" ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase());

      const d = parse(quote.created_at);
      const withinDateRange =
        (!startDate || (d && d >= startDate)) &&
        (!endDate || (d && d <= endDate));

      return matchesSearch && withinDateRange;
    });
  }, [realData, searchTerm, appliedStartDate, appliedEndDate]);

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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <Button
          onClick={() => setIsAddQuoteOpen(true)}
          className="flex items-center gap-2"
        >
          <CirclePlus className="" />
          Add Quote
        </Button>
        <AddQuoteModal onOpenChange={setIsAddQuoteOpen} open={isAddQuoteOpen} />
      </div>
      <ScrollArea className="rounded-md max-h-[54vh] w-full min-w-[500px]">
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
          id={selectedQuote.id}
        />
      )}
    </div>
  );
};

export default QuotesTable;
