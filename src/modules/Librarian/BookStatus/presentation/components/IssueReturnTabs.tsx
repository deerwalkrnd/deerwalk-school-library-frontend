"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/core/presentation/components/ui/button";
import IssueBookTable from "./IssueBookTable";
import ReturnBookTable from "./ReturnBookTable";
import IssueBook from "./IssueBook";
import ReturnBook from "./ReturnBook";

const IssueReturnTabs = () => {
  const [activeTab, setActiveTab] = useState<"issue" | "return">("issue");

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap justify-center gap-4 md:gap-16 border-b-2 border-gray-200 mt-8 mb-6 p-4">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("issue")}
          className={cn(
            "w-full sm:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
            activeTab === "issue"
              ? "border-primary bg-light hover:bg-light"
              : "hover:bg-gray-100",
          )}
        >
          Issue Book
        </Button>

        <Button
          variant="ghost"
          onClick={() => setActiveTab("return")}
          className={cn(
            "w-full sm:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
            activeTab === "return"
              ? "border-primary bg-light hover:bg-light"
              : "hover:bg-gray-100",
          )}
        >
          Return Book
        </Button>
      </div>

      <div className="px-4 w-full overflow-hidden">
        {activeTab === "issue" && <IssueBook />}

        {activeTab === "return" && <ReturnBook />}
      </div>
    </div>
  );
};

export default IssueReturnTabs;
