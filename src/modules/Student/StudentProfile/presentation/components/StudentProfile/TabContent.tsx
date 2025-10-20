import React from "react";
import { TabType } from "../../hooks/useStudentProfileTabs";
import { BookmarksTab } from "./BookmarksTab";
import { ReadingTab } from "./ReadingTab";
import { HistoryTab } from "./HistoryTab";

interface TabContentProps {
  activeTab: TabType;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentlyReading: any[];
  borrowedHistory: any[];
  totalBooksBorrowed: number;
  totalReturnedBooks: number;
  fineLevied: number;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  currentPage,
  setCurrentPage,
  currentlyReading,
  borrowedHistory,
  totalBooksBorrowed,
  totalReturnedBooks,
  fineLevied,
}) => {
  switch (activeTab) {
    case "bookmarks":
      return (
        <BookmarksTab
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalBooksBorrowed={totalBooksBorrowed}
          totalReturnedBooks={totalReturnedBooks}
          fineLevied={fineLevied}
        />
      );
    case "reading":
      return (
        <ReadingTab
          currentPage={currentPage}
          currentlyReading={currentlyReading}
        />
      );
    case "history":
      return (
        <HistoryTab
          currentPage={currentPage}
          borrowedHistory={borrowedHistory}
          totalBooksBorrowed={totalBooksBorrowed}
          totalReturnedBooks={totalReturnedBooks}
          fineLevied={fineLevied}
        />
      );
    default:
      return null;
  }
};
