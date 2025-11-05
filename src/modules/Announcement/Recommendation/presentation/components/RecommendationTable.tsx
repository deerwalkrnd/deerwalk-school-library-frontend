"use client";

import React, { useState, useMemo } from "react";
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

const RecommendationTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<IRecommendationColumns | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const {
    data: recData,
    isLoading,
    isError,
    error,
  } = getRecommendations({ page, limit: 10 });
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
  const totalPages = recData?.totalPages ?? 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name, book title, or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 rounded-md"
          />
        </div>

        <Button
          className="flex items-center gap-2"
          onClick={() => setIsAddOpen(true)}
        >
          <CirclePlus className="w-4 h-4" />
          Add Recommendation
        </Button>
        <AddRecommendationModal open={isAddOpen} onOpenChange={setIsAddOpen} />
      </div>
      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable<IRecommendationColumns, unknown>
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
