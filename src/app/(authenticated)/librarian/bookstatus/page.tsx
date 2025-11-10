import { Header } from "@/core/presentation/components/Header/Header";
import IssueReturnTabs from "@/modules/Librarian/BookStatus/presentation/components/IssueReturnTabs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-20 px-6 md:px-15 py-10 w-full">
      <Header title="Issue/Return Books" subtitle="View status of books" />
      <IssueReturnTabs />
    </div>
  );
};

export default page;
