"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useState, useMemo } from "react";
import { createRecommendationColumns } from "./RecommendationColumn";
import {
  ScrollArea,
  ScrollBar,
} from "@/core/presentation/components/ui/scroll-area";
import { getRecommendations } from "../../application/recommendationUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { EditRecommendationModal } from "./EditRecommendation";
import { DeleteRecommendationModal } from "./DeleteRecommendation";
import { IRecommendationColumns } from "../../domain/entities/IRecommendationColumns";
import Pagination from "@/core/presentation/components/pagination/Pagination";

interface RecommendationTableProps {
  filterParams?: URLSearchParams;
  version?: number;
}

const RecommendationTable: React.FC<RecommendationTableProps> = ({
  filterParams,
  version,
}) => {
  const [EditRecommendationOpen, setEditRecommendationOpen] = useState(false);
  const [DeleteRecommendationOpen, setDeleteRecommendationOpen] =
    useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<IRecommendationColumns | null>(null);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = getRecommendations({
    page,
    limit: 10,
  });

  const realData = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage ?? false;

  const handleEdit = (recommendation: IRecommendationColumns) => {
    setSelectedRecommendation(recommendation);
    setEditRecommendationOpen(true);
  };

  const handleDelete = (recommendation: IRecommendationColumns) => {
    setSelectedRecommendation(recommendation);
    setDeleteRecommendationOpen(true);
  };

  const columns = useMemo(
    () => createRecommendationColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

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
    <div className="flex flex-col gap-3">
      <ScrollArea className="max-w-[75vw]">
        <DataTable
          data={realData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />

      {selectedRecommendation && (
        <>
          <EditRecommendationModal
            recommendation={selectedRecommendation}
            open={EditRecommendationOpen}
            onOpenChange={setEditRecommendationOpen}
          />
          <DeleteRecommendationModal
            id={selectedRecommendation.id}
            open={DeleteRecommendationOpen}
            onOpenChange={setDeleteRecommendationOpen}
          />
        </>
      )}
    </div>
  );
};

export default RecommendationTable;
