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

const OVERDUE_PER_PAGE = 6;

const Overdue: React.FC = () => {
  const [isEditFineOpen, setIsEditFineOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: OVERDUE_PER_PAGE,
  });
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useOverDues(pagination);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <div className="flex flex-row gap-24">
            <p className="text-base">Fine Amount</p>
            <div className="flex w-5 h-4.5 justify-center items-center bg-loadState gap-[4px] shrink-0 rounded-[4px] border border-white/20 shadow-[0_1px_0_0_#B14306]">
              <SquarePen
                className="w-3.5 h-3.5 text-white"
                onClick={() => setIsEditFineOpen(true)}
              />
            </div>
          </div>
          <h1 className="text-base">Rs.2</h1>
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
        <div className="flex items-center justify-between pt-4">
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
        </div>
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
