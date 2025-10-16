"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/core/presentation/components/ui/button";
import { cn } from "@/lib/utils";
import type { StudentProfileData } from "../../domain/entities/studentProfileEntity";
import { BookCard } from "./BookCard";
import { SummaryCard } from "./SummaryCard";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/presentation/components/ui/avatar";
import {
  useBookmarks,
  transformBookmarkToBookData,
} from "@/modules/StudentProfile/application/useBookmarksUseCase";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { BorrowTable } from "./BorrowTable";
import { useStudentProfile } from "../../application/studentProfileUseCase";

interface StudentProfileProps {
  profileData: StudentProfileData;
}

const BOOKS_PER_PAGE = 4;

const StudentProfile: React.FC<StudentProfileProps> = ({ profileData }) => {
  const [activeTab, setActiveTab] = useState<
    "bookmarks" | "reading" | "history"
  >("reading");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: bookmarksData,
    isLoading: bookmarksLoading,
    error: bookmarksError,
  } = useBookmarks(currentPage, BOOKS_PER_PAGE, undefined);

  const {
    name,
    email,
    avatarUrl,
    avatarFallBack,
    currentlyReading,
    borrowedHistory,
    totalBooksBorrowed,
    totalReturnedBooks,
    fineLevied,
  } = profileData;

  const getAvatarFallback = () => {
    if (avatarFallBack) return avatarFallBack;
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0]
      ? nameParts[0].charAt(0).toUpperCase()
      : "";
    const lastNameInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const renderTabContent = () => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    const bookmarksItems = (bookmarksData?.items || []).slice(
      startIndex,
      endIndex,
    );
    const { data, isLoading, error } = useStudentProfile();

    switch (activeTab) {
      case "bookmarks":
        if (bookmarksLoading) {
          return <LoadingState />;
        }

        if (bookmarksError) {
          return <ErrorState message="Failed to load bookmarks" />;
        }

        const totalBookmarksPages = bookmarksData
          ? Math.ceil(bookmarksData.total / BOOKS_PER_PAGE)
          : 0;

        if (bookmarksItems.length === 0) {
          return (
            <EmptyState
              message="You haven't added any books to this list."
              buttonText="Browse Books"
              onButtonClick={() => console.log("Browse Books clicked")}
            />
          );
        }

        return (
          <>
            <div
              key={`${activeTab}-${currentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
            >
              {bookmarksItems.map((bookmark) => {
                const bookData = transformBookmarkToBookData(bookmark);
                return (
                  <BookCard
                    key={bookData.id}
                    book={bookData}
                    showBorrowButton
                  />
                );
              })}
            </div>
            {totalBookmarksPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalBookmarksPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        );
      case "reading":
        const totalReadingPages = Math.ceil(
          currentlyReading.length / BOOKS_PER_PAGE,
        );
        const currentReading = currentlyReading.slice(startIndex, endIndex);

        if (currentlyReading.length === 0) {
          return (
            <EmptyState
              message="You aren't currently reading any books."
              buttonText="Browse Books"
              onButtonClick={() => console.log("Browse Books clicked")}
            />
          );
        }
        return (
          <>
            <div
              key={`${activeTab}-${currentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
            >
              {currentReading.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            {totalReadingPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalReadingPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        );
      case "history":
        const totalHistoryPages = Math.ceil(
          borrowedHistory.length / BOOKS_PER_PAGE,
        );
        const currentHistory = borrowedHistory.slice(startIndex, endIndex);

        if (borrowedHistory.length === 0) {
          return (
            <>
              <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 place-items-center gap-6">
                <SummaryCard
                  icon="BookCopy"
                  title="Total Books Borrowed"
                  value={totalBooksBorrowed}
                />
                <SummaryCard
                  icon="BookCheck"
                  title="Total Returned Books"
                  value={totalReturnedBooks}
                />
                <SummaryCard
                  icon="BanknoteArrowUp"
                  title="Fine Levied"
                  value={fineLevied}
                />
              </div>
              <EmptyState
                message="You haven't borrowed any books yet."
                buttonText="Browse Books"
                onButtonClick={() => console.log("Browse Books clicked")}
              />
            </>
          );
        }
        return (
          <>
            <div className="gap-8 flex flex-col">
              <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 place-items-center gap-6 ">
                <SummaryCard
                  icon="BookCopy"
                  title="Total Books Borrowed"
                  value={totalBooksBorrowed}
                />
                <SummaryCard
                  icon="BookCheck"
                  title="Total Returned Books"
                  value={totalReturnedBooks}
                />
                <SummaryCard
                  icon="BanknoteArrowUp"
                  title="Fine Levied"
                  value={fineLevied}
                />
              </div>
              <BorrowTable data={borrowedHistory} isLoading={isLoading} />
              {totalBooksBorrowed > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalBooksBorrowed}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
            <div
              key={`${activeTab}-${currentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {currentHistory.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            {totalHistoryPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalHistoryPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-full mx-auto gap-4 p-4">
      <div className="flex flex-col w-full md:w-[489px] h-full mx-auto md:m-8 gap-4 justify-center items-start p-4">
        <div className="w-fit h-fit">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage
              src={
                avatarUrl ||
                "/placeholder.svg?height=100&width=100&query=student avatar" ||
                "/placeholder.svg"
              }
              alt={`Avatar of ${name}`}
            />
            <AvatarFallback>
              {avatarFallBack ||
                (() => {
                  const nameParts = name.split(" ");
                  const firstNameInitial = nameParts[0]
                    ? nameParts[0].charAt(0).toUpperCase()
                    : "";
                  const lastNameInitial =
                    nameParts.length > 1
                      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
                      : "";
                  return `${firstNameInitial}${lastNameInitial}`;
                })()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-row gap-4 md:gap-[48px] w-full h-full">
          <div className="flex flex-col w-full h-full">
            <h1 className="lg:text-base text-xs text-gray">Name</h1>
            <h1 className="lg:text-xl text-sm font-medium">{name}</h1>
          </div>
          <div className="flex flex-col w-full h-full">
            <h1 className="lg:text-base text-xs text-gray">StudentID/Email</h1>
            <h1 className="lg:text-xl text-sm font-medium">{email}</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 border-b-2 border-gray-200 mt-8 mb-6 p-4 overflow-x-auto flex-nowrap">
        <Button
          variant="ghost"
          onClick={() => {
            setActiveTab("bookmarks");
            setCurrentPage(1);
          }}
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
          onClick={() => {
            setActiveTab("reading");
            setCurrentPage(1);
          }}
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
          onClick={() => {
            setActiveTab("history");
            setCurrentPage(1);
          }}
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
      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default StudentProfile;
