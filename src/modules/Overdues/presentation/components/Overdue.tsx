"use client";

import React, { useState } from "react";
import { Calendar28 } from "@/core/presentation/components/ui/Calendar28";
import { cn } from "@/core/lib/utils";
import { EditFineModal } from "@/modules/Overdues/presentation/components/EditFine";

import { Search, SquarePen } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import { OverdueTable } from "@/modules/Overdues/presentation/components/overdueTable";
import { useOverDues } from "@/modules/Overdues/application/overdueUseCase";
import { PaginationParams } from "@/modules/Overdues/domain/entities/overdueModal";
import Pagination from "@/modules/AllBooks/presentation/components/Pagination";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import { Label } from "@/core/presentation/components/ui/label";
import { Button } from "@/core/presentation/components/ui/button";

const OVERDUE_PER_PAGE = 6;

const Overdue: React.FC = () => {
  const [isEditFineOpen, setIsEditFineOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: OVERDUE_PER_PAGE,
  });
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useOverDues(pagination);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      search,
      startDate,
      endDate,
    });
  };

  return (
    <div className="bg-white px-8 py-12 mx-auto font-sans">
      <div className="mb-12 gap-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          Overdues And Fines
        </h1>
        <p className="text-gray-600 text-xs md:text-base lg:text-base">
          Track overdue books and pending fines
        </p>

        {/* Fine Section */}
        <div className="pt-8">
          <div className="flex flex-row gap-24 ">
            <p className="text-base font-semibold">Fine Amount</p>
            <div className="flex w-5 h-4.5 justify-center items-center bg-loadState gap-[4px] shrink-0 rounded-[4px] border border-white/20 shadow-[0_1px_0_0_#B14306]">
              <SquarePen
                className="w-3.5 h-3.5 text-white"
                onClick={() => setIsEditFineOpen(true)}
              />
            </div>
          </div>
          <h1 className="text-base font-medium pt-4">Rs.2</h1>
        </div>

        {/* Search */}
        <div className="relative flex flex-row items-center mt-10 mb-4">
          <Search className="absolute left-2 text-gray-400" size={18} />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400 w-110.5"
            placeholder="Search..."
          />
        </div>

        {/* Filter Buttons */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start pt-4">
            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <DatePicker selected={startDate} onSelect={setStartDate} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <DatePicker selected={endDate} onSelect={setEndDate} />
            </div>

            <Button
              type="submit"
              className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
            >
              Apply
            </Button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="">
        <OverdueTable data={data?.overdues ?? []} isLoading={isLoading} />
      </div>

      {/* Edit Fine Modal */}
      <EditFineModal
        open={isEditFineOpen}
        onOpenChange={(open) => setIsEditFineOpen(open)}
      />

      {/* Pagination */}
      {data && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          hasNextPage={data.hasNextPage}
          hasPreviousPage={data.hasPreviousPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 mt-4">
          Failed to load overdues. Please try again.
        </p>
      )}
    </div>
  );
};

export default Overdue;
