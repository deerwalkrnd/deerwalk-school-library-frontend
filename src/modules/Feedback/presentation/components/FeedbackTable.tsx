"use client";
import React, { useEffect, useMemo, useState } from "react";
import { createFeedbackColumns } from "./feedbackColumns";
import { IFeedbackColumns } from "../../domain/entities/IFeedbackColumns";
import { useFeedbacks } from "../../application/feedbackUseCase";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ViewFeedbackModal } from "./ViewFeedbackModal";

const FeedbackTable = () => {
  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const data: IFeedbackColumns[] = [
    {
      id: 1,
      student_name: "Alice Johnson",
      subject: "Library Resources",
      date: "2025-01-10",
    },
    {
      id: 2,
      student_name: "Bob Smith",
      subject: "Computer Lab Access",
      date: "2025-01-12",
    },
    {
      id: 3,
      student_name: "Clara Lee",
      subject: "Study Room Booking",
      date: "2025-01-15",
    },
    {
      id: 4,
      student_name: "David Kim",
      subject: "WiFi Performance",
      date: "2025-01-18",
    },
    {
      id: 5,
      student_name: "Eva Martinez",
      subject: "Charging Ports",
      date: "2025-01-20",
    },
  ];

  //   const { data, isLoading, isError, error } = useFeedbacks();
  console.log(data);
  const handleView = (row: any) => {
    setSelectedFeedback(row);
    setViewFeedbackOpen(true);
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

  return (
    <div className="mt-4  w-full overflow-x-auto">
      <ScrollArea className="w-full min-w-[900px]">
        <DataTable
          data={data}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      <ViewFeedbackModal
        open={viewFeedbackOpen}
        onOpenChange={setViewFeedbackOpen}
      />
    </div>
  );
};

export default FeedbackTable;
