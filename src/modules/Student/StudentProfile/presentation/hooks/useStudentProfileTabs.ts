import { useState } from "react";

export type TabType = "bookmarks" | "reading" | "history";

export const useStudentProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("reading");
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return {
    activeTab,
    currentPage,
    setCurrentPage,
    handleTabChange,
  };
};
