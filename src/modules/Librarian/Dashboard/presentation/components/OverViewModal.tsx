"use client";
import TotalComponent from "@/core/presentation/components/TotalComponent/TotalComponent";
import React from "react";
import { useDashboard } from "../../application/dashboardUseCase";
import {
  Hourglass,
  BookCopy,
  BookText,
  BookCheck,
  User,
  BanknoteX,
} from "lucide-react";

const OverViewModal = () => {
  const { data } = useDashboard();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <TotalComponent
        title="Overdue Books"
        icon={<Hourglass />}
        value={data?.overdueBooks!}
        // className="h-40 sm:h-48"
      />
      <TotalComponent
        title="Books Currently Issued"
        icon={<BookCopy />}
        value={data?.totalBooksIssued!}
        // className="h-40 sm:h-48"
      />
      <TotalComponent
        title="Total Returned Books"
        icon={<BookCheck />}
        value={data?.totalReturnedBooks!}
        // className="h-40 sm:h-48"
      />

      <TotalComponent
        title="Total Books"
        icon={<BookText />}
        value={data?.totalBooks!}
      />
      <TotalComponent
        title="Visitors"
        icon={<User />}
        value={data?.visitors!}
      />
      <TotalComponent
        title="Pending Fines"
        icon={<BanknoteX />}
        value={data?.pendingFines!}
      />
    </div>
  );
};

export default OverViewModal;
