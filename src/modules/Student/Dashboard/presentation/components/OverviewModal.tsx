"use client";
import React from "react";
import { useDashboard } from "../../application/dashboarduseCase";
import TotalComponent from "../../../../../core/presentation/components/TotalComponent/TotalComponent";
import {
  BanknoteArrowUp,
  BookCheck,
  BookCopy,
  BookMarked,
  BookUp,
  Hourglass,
} from "lucide-react";

const OverviewModal = () => {
  const { data } = useDashboard();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <TotalComponent
        title="Total Books Borrowed"
        icon={<BookCopy />}
        value={data?.totalBooksBorrowed!}
        // className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Total Returned Books"
        value={data?.totalReturnedBooks!}
        icon={<BookCheck />}
        // className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Overdue Books"
        value={data?.overdueBooks!}
        icon={<Hourglass />}
        // className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Fine Levied"
        value={data?.fineLevied!}
        icon={<BanknoteArrowUp />}
        // className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Saved Books"
        value={data?.savedBooks!}
        icon={<BookMarked />}
        // className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Most Borrowed Category"
        value={data?.mostBorrowedCategory!}
        icon={<BookUp />}
        // className="h-36 sm:h-40"
      />
    </div>
  );
};

export default OverviewModal;
