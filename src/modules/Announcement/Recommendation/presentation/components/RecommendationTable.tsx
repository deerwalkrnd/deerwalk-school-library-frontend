"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useState, useMemo } from "react";
import { createRecommendationColumns } from "./RecommendationColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { getRecommendations } from "../../application/recommendationUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { AddRecommendationModal } from "./AddRecommendation";
import { EditRecommendationModal } from "./EditRecommendation";
import { DeleteRecommendationModal } from "./DeleteRecommendation";
import { IRecommendationColumns } from "../../domain/entities/IRecommendationColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
// import { Label } from "@/core/presentation/components/ui/label";
// import DatePicker from "@/core/presentation/components/date-picker/date-picker";
// import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import Button from "@/core/presentation/components/Button/Button";

const RecommendationTable = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<IRecommendationColumns | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = getRecommendations({ page });
  const realData = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const handleEdit = (recommendation: IRecommendationColumns) => {
    setSelectedRecommendation(recommendation);
    setIsEditOpen(true);
  };

  const handleDelete = (recommendation: IRecommendationColumns) => {
    setSelectedRecommendation(recommendation);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () => createRecommendationColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  const filteredData = useMemo(() => {
    return realData.filter((rec) => {
      return (
        searchTerm === "" ||
        rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.designation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [realData, searchTerm]);

  if (isLoading) return <TableSkeleton />;

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center text-red-500">
          Error loading recommendations: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-row sm:flex-row gap-8 flex-1">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, book title, designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rounded-md"
            />
          </div>
        </div>

        <Button
          className="flex items-center justify-center gap-2"
          onClick={() => setIsAddOpen(true)}
        >
          <CirclePlus className="w-4 h-4" />
          Add Recommendation
        </Button>
        <AddRecommendationModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      </div>

      {/* <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
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
      </div> */}

      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          data={filteredData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      {selectedRecommendation && (
        <>
          <EditRecommendationModal
            recommendation={selectedRecommendation}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          <DeleteRecommendationModal
            id={selectedRecommendation.id}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
          />
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default RecommendationTable;
