"use client";
import React from "react";
import { useDashboard } from "../../application/dashboarduseCase";
import TotalComponent from "./TotalComponent";

const OverviewModal = () => {
  const { data } = useDashboard();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <TotalComponent
        title="Total Books Borrowed"
        value={data?.totalBooksBorrowed!}
        className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Total Returned Books"
        value={data?.totalReturnedBooks!}
        className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Overdue Books"
        value={data?.overdueBooks!}
        className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Fine Levied"
        value={data?.fineLevied!}
        className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Saved Books"
        value={data?.fineLevied!}
        className="h-36 sm:h-40"
      />
      <TotalComponent
        title="Most Borrowed Category"
        value={data?.mostBorrowedCategory!}
        className="h-36 sm:h-40"
      />
    </div>
  );
};

export default OverviewModal;
