"use client";
import React, { useEffect, useMemo, useState } from "react";
import { createFeedbackColumns } from "./feedbackColumns";
import { IFeedbackColumns } from "../../domain/entities/IFeedbackColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ViewFeedbackModal } from "./ViewFeedbackModal";
import { useFeedbacks } from "../../application/feedbackUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/presentation/components/ui/select";
import Pagination from "@/core/presentation/components/pagination/Pagination";

type FilterParams = {
  searchable_value?: string;
  searchable_field?: string;
  start_date?: string;
  end_date?: string;
};
type Props = { filterParams?: FilterParams; version: number };

const FeedbackTable = ({ filterParams = {}, version }: Props) => {
  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<IFeedbackColumns | null>(null);

  const [page, setPage] = useState(1);
  const [isAckFilter, setIsAckFilter] = useState<boolean | undefined>(false);

  useEffect(() => {
    setPage(1);
  }, [
    filterParams.searchable_value,
    filterParams.searchable_field,
    filterParams.start_date,
    filterParams.end_date,
    isAckFilter,
    version,
  ]);

  const { data, isLoading } = useFeedbacks(
    { page, is_ack: isAckFilter, ...filterParams },
    version,
  );

  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const columns = useMemo(
    () =>
      createFeedbackColumns((row: IFeedbackColumns) => {
        setSelectedFeedback(row);
        setViewFeedbackOpen(true);
      }),
    [],
  );

  const handleAckChange = (val: string) => {
    setIsAckFilter(val === "true" ? true : val === "false" ? false : undefined);
  };

  if (isLoading) return <TableSkeleton />;
  if (!data) return <div>Data not available</div>;

  return (
    <div className=" max-h-screen flex flex-col overflow-hidden">
      <div className="shrink-0 flex justify-end gap-3 p-2">
        <Select
          value={
            isAckFilter === true
              ? "true"
              : isAckFilter === false
                ? "false"
                : "all"
          }
          onValueChange={handleAckChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Acknowledged</SelectItem>
            <SelectItem value="false">Not Acknowledged</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" min-h-0 px-2">
        <ScrollArea className="h-[50vh] w-full">
          <div className="min-w-full">
            <DataTable
              data={data.items ?? []}
              columns={columns}
              enableSelection={false}
              enableFiltering={false}
              enablePagination={false}
            />
          </div>
        </ScrollArea>
      </div>
      <div className="shrink-0 p-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={setPage}
        />
      </div>

      {selectedFeedback && (
        <ViewFeedbackModal
          open={viewFeedbackOpen}
          onOpenChange={(open) => {
            setViewFeedbackOpen(open);
            if (!open) setSelectedFeedback(null);
          }}
          id={selectedFeedback.id!}
          initialName={selectedFeedback.user.name}
          initialStudentMail={selectedFeedback.user.email}
          initialSubject={selectedFeedback.subject}
          initialFeedback={selectedFeedback.feedback}
          initialMarkedAsFilled={selectedFeedback.is_acknowledged}
        />
      )}
    </div>
  );
};

export default FeedbackTable;
