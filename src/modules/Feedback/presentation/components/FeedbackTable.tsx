"use client";
import React, { useMemo, useState } from "react";
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

const FeedbackTable = () => {
  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<IFeedbackColumns | null>(null);

  const [page, setPage] = useState(1);
  const [isAckFilter, setIsAckFilter] = useState<boolean | undefined>(false);

  const { data, isLoading, isError, error } = useFeedbacks({
    page,
    is_ack: isAckFilter,
  });

  // const totalItems = data?.total ?? 0;
  // const currentPage = data?.page ?? 1;
  const totalPages = 5;
  // || Math.max(1, Math.ceil(totalItems / 10));
  // const hasPreviousPage = currentPage > 1;
  // const hasNextPage = currentPage < totalPages;

  const handleView = (row: IFeedbackColumns) => {
    setSelectedFeedback(row);
    setViewFeedbackOpen(true);
  };

  const handleCloseModal = (open: boolean) => {
    setViewFeedbackOpen(open);
    if (!open) {
      setSelectedFeedback(null);
    }
  };

  const columns = useMemo(
    () => createFeedbackColumns(handleView),
    [handleView],
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (filter: boolean | undefined) => {
    setIsAckFilter(filter);
    setPage(1);
  };

  //   const filteredData = useMemo(() => {
  //     if (!data) return [];

  //     return data?.map(
  //       (feedback) =>
  //         ({
  //           id: feedback.id,
  //           student_name: feedback.user_id,
  //           subject: feedback.subject,
  //           date: new Date().toISOString(),
  //         }) as IFeedbackColumns
  //     );
  //   }, [data]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (data == undefined) {
    return <div>Data not available</div>;
  }

  return (
    <div className="">
      <div className="flex justify-end">
        <Select
          onValueChange={(val) =>
            handleFilterChange(
              val === "true" ? true : val === "false" ? false : undefined,
            )
          }
          value={
            isAckFilter === true
              ? "true"
              : isAckFilter === false
                ? "false"
                : "all"
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Acknowledged</SelectItem>
            <SelectItem value="false">Not Acknowledged</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 w-full overflow-x-auto">
        <div className="w-72 md:w-full">
          <ScrollArea className="h-full w-max md:min-w-full">
            <DataTable
              data={data as IFeedbackColumns[]}
              columns={columns}
              enableSelection={false}
              enableFiltering={false}
              enablePagination={false}
            />
          </ScrollArea>
        </div>
      </div>
      {selectedFeedback && (
        <ViewFeedbackModal
          open={viewFeedbackOpen}
          onOpenChange={handleCloseModal}
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
