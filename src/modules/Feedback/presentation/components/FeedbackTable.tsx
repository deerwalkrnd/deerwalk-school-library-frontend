"use client";
import React, { useMemo, useState } from "react";
import { createFeedbackColumns } from "./feedbackColumns";
import { IFeedbackColumns } from "../../domain/entities/IFeedbackColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ViewFeedbackModal } from "./ViewFeedbackModal";
import { useFeedbacks } from "../../application/feedbackUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";

const FeedbackTable = () => {
  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<IFeedbackColumns | null>(null);

  const { data, isLoading, isError, error } = useFeedbacks();

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
