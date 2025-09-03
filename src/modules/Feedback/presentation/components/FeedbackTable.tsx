"use client";
import React, { useMemo, useState } from "react";
import { createFeedbackColumns } from "./feedbackColumns";
import { IFeedbackColumns } from "../../domain/entities/IFeedbackColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import { ViewFeedbackModal } from "./ViewFeedbackModal";
import { useFeedbacks } from "../../application/feedbackUseCase";

const FeedbackTable = () => {
  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<IFeedbackColumns | null>(null);
  const [loading, setLoading] = useState(false);

  const data: IFeedbackColumns[] = [
    {
      id: 1,
      student_name: "Alice Johnson",
      subject: "Library Resources",
      feedback:
        "The library needs more updated reference books for computer science.",
      user_id: "user_001",
      is_acknowledged: true,
      date: "2025-01-10",
    },
    {
      id: 2,
      student_name: "Bob Smith",
      subject: "Computer Lab Access",
      feedback:
        "The computer lab should be open earlier in the morning during exam weeks.",
      user_id: "user_002",
      is_acknowledged: false,
      date: "2025-01-12",
    },
    {
      id: 3,
      student_name: "Clara Lee",
      subject: "Study Room Booking",
      feedback:
        "The booking system for study rooms is buggy and sometimes double-books slots.",
      user_id: "user_003",
      is_acknowledged: true,
      date: "2025-01-15",
    },
    {
      id: 4,
      student_name: "David Kim",
      subject: "WiFi Performance",
      feedback:
        "WiFi is slow during peak hours, making it hard to attend online classes.",
      user_id: "user_004",
      is_acknowledged: false,
      date: "2025-01-18",
    },
    {
      id: 5,
      student_name: "Eva Martinez",
      subject: "Charging Ports",
      feedback:
        "Many charging ports in the library are broken or not working properly.",
      user_id: "user_005",
      is_acknowledged: true,
      date: "2025-01-20",
    },
  ];

  // const { data, isLoading, isError, error } = useFeedbacks();
  console.log(data);

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
      {selectedFeedback && (
        <ViewFeedbackModal
          open={viewFeedbackOpen}
          onOpenChange={handleCloseModal}
          id={selectedFeedback.id!}
          initialName={selectedFeedback.student_name}
          initialStudentMail={`${selectedFeedback.student_name.toLowerCase().replace(/\s+/g, ".")}@deerwalk.edu.np`}
          initialSubject={selectedFeedback.subject}
          initialFeedback={selectedFeedback.feedback}
          initialMarkedAsFilled={selectedFeedback.is_acknowledged}
        />
      )}
    </div>
  );
};

export default FeedbackTable;
