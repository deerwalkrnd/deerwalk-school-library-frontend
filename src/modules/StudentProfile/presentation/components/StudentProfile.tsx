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
    name,
    email,
    avatarUrl,
    avatarFallBack,
    currentlyReading,
    borrowedHistory,
    myBookmarks,
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

    switch (activeTab) {
      case "bookmarks":
        const totalBookmarksPages = Math.ceil(
          myBookmarks.length / BOOKS_PER_PAGE,
        );
        const currentBookmarks = myBookmarks.slice(startIndex, endIndex);

        if (myBookmarks.length === 0) {
          return (
            <EmptyState
              message="You haven't added any books to this list."
              buttonText="Browse Books"
              onButtonClick={() => "Browse Books clicked"}
            />
          );
        }
        return (
          <>
            <div
              key={`${activeTab}-${currentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
            >
              {currentBookmarks.map((book) => (
                <BookCard key={book.id} book={book} showBorrowButton />
              ))}
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
              onButtonClick={() => "Browse Books clicked"}
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
                onButtonClick={() => "Browse Books clicked"}
              />
            </>
          );
        }
        return (
          <>
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
                "/placeholder.svg?height=100&width=100&query=student avatar"
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
      <div
        className="flex justify-evenly
        border-b-2 border-gray-200 mt-8 mb-6 p-4 overflow-x-auto flex-nowrap"
      >
        <Button
          variant="ghost"
          onClick={() => {
            setActiveTab("bookmarks");
            setCurrentPage(1);
          }}
          className={cn(
            "rounded-none border-solid border-2 border-transparent px-4 py-2 lg:text-base md:text-sm text-xs font-semibold text-black  h-14",
            activeTab === "bookmarks" &&
              "border-primary text-black bg-light rounded-md md:w-48 w-28 h-14 hover:bg-light",
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
            "rounded-none border-solid border-2 border-transparent px-4 py-2 lg:text-base md:text-sm text-xs font-semibold text-black  h-14",
            activeTab === "reading" &&
              "border-primary text-black bg-light rounded-md md:w-48 w-28 h-14 hover:bg-light",
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
            "rounded-none border-solid border-2 border-transparent px-4 py-2 lg:text-base md:text-sm text-xs text-black font-semibold  h-14",
            activeTab === "history" &&
              "border-primary text-black bg-light rounded-md md:w-48 w-28 h-14 hover:bg-light",
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
