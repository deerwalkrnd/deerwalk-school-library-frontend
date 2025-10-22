import React from "react";
import { Button } from "@/core/presentation/components/ui/button";
import { cn } from "@/lib/utils";
import { TabType } from "../../hooks/useStudentProfileTabs";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex justify-center gap-6 border-b-2 border-gray-200 mt-8 mb-6 p-4 overflow-x-auto flex-nowrap">
      <Button
        variant="ghost"
        onClick={() => onTabChange("bookmarks")}
        className={cn(
          "w-32 md:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
          activeTab === "bookmarks"
            ? "border-primary bg-light hover:bg-light"
            : "hover:bg-gray-100",
        )}
      >
        My Bookmarks
      </Button>
      <Button
        variant="ghost"
        onClick={() => onTabChange("reading")}
        className={cn(
          "w-32 md:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
          activeTab === "reading"
            ? "border-primary bg-light hover:bg-light"
            : "hover:bg-gray-100",
        )}
      >
        Currently Reading
      </Button>
      <Button
        variant="ghost"
        onClick={() => onTabChange("history")}
        className={cn(
          "w-32 md:w-40 lg:w-48 h-14 border-2 border-transparent font-semibold text-black text-sm md:text-base rounded-md transition-all",
          activeTab === "history"
            ? "border-primary bg-light hover:bg-light"
            : "hover:bg-gray-100",
        )}
      >
        Borrowed History
      </Button>
    </div>
  );
};
