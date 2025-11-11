"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { IRecommendationColumns } from "../../domain/entities/IRecommendationColumns";
import { createRecommendationColumns } from "./RecommendationColumns";
import { getRecommendations } from "../../application/recommendationUseCase";
import { getBooks } from "@/modules/BookPage/application/bookUseCase";
import { Input } from "@/core/presentation/components/ui/input";
import { Search, CirclePlus } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { AddRecommendationModal } from "./AddRecommendation";
import { EditRecommendationModal } from "./EditRecommendation";
import { DeleteRecommendationModal } from "./DeleteRecommendation";

type FilterParams = {
  searchable_value?: string;
  searchable_field?: string;
  start_date?: string;
  end_date?: string;
};

type Props = { filterParams?: FilterParams; version?: number };

const RecommendationTable = ({ filterParams = {}, version }: Props) => {
  const [page, setPage] = useState(1);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<IRecommendationColumns | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  useEffect(() => {
    setPage(1);
  }, [
    filterParams.searchable_value,
    filterParams.searchable_field,
    filterParams.start_date,
    filterParams.end_date,
    version,
  ]);
  const {
    data: recData,
    isLoading,
    isError,
    error,
  } = getRecommendations({ page, ...filterParams });

  const { data: bookData } = getBooks({ page: 1, limit: 100 });
  const booksMap = useMemo(() => {
    const map = new Map<string, { author: string; publication: string }>();
    bookData?.items.forEach((book) => {
      map.set(book.title, {
        author: book.author,
        publication: book.publication,
      });
    });
    return map;
  }, [bookData]);

  const realData = recData?.items ?? [];
  const currentPage = recData?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = recData?.hasNextPage;

  const handleEdit = (rec: IRecommendationColumns) => {
    setSelectedRecommendation(rec);
    setIsEditOpen(true);
  };

  const handleDelete = (rec: IRecommendationColumns) => {
    setSelectedRecommendation(rec);
    setIsDeleteOpen(true);
  };

  const columns = useMemo(
    () => createRecommendationColumns(booksMap, handleEdit, handleDelete),
    [booksMap],
  );

  if (isLoading) return <TableSkeleton />;
  if (isError)
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center text-red-500">
          Error loading recommendations: {error?.message || "Unknown error"}
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
        <Button
          className="flex items-center gap-2 "
          onClick={() => setIsAddOpen(true)}
        >
          <CirclePlus className="" />
          Add Recommendation
        </Button>
        <AddRecommendationModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      </div>
      <ScrollArea className="rounded-md max-h-[54vh] w-full min-w-[500px]">
        <DataTable<IRecommendationColumns, unknown>
          data={realData}
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
      {selectedRecommendation && (
        <>
          <EditRecommendationModal
            recommendation={selectedRecommendation}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          <DeleteRecommendationModal
            id={selectedRecommendation.id!}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
          />
        </>
      )}
    </div>
  );
};

export default RecommendationTable;
