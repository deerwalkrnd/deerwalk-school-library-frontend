"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/core/presentation/components/ui/button";
import { cn } from "@/lib/utils";
import { StudentProfileData } from "../../domain/entities/studentProfileEntity";
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

const StudentProfile: React.FC<StudentProfileProps> = ({ profileData }) => {
  const [activeTab, setActiveTab] = useState<
    "bookmarks" | "reading" | "history"
  >("reading");
  const [currentPage, setCurrentPage] = useState(1); // For pagination, dummy state

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
    switch (activeTab) {
      case "bookmarks":
        if (myBookmarks.length === 0) {
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
            <div className="flex lg:flex-row flex-col justify-center items-center gap-32 ">
              {myBookmarks.map((book) => (
                <BookCard key={book.id} book={book} showBorrowButton />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        );
      case "reading":
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
            <div className="flex lg:flex-row flex-col justify-center items-center gap-32">
              {currentlyReading.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        );
      case "history":
        if (borrowedHistory.length === 0) {
          return (
            <>
              <div className="flex flex-wrap justify-center gap-10 mb-8">
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
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {borrowedHistory.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
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
            <h1 className="text-base text-[#5A5858]">Name</h1>
            <h1 className="text-xl font-[500]">{name}</h1>
          </div>
          <div className="flex flex-col w-full h-full">
            <h1 className="text-base text-[#5A5858]">StudentID/Email</h1>
            <h1 className="text-xl font-[500]">{email}</h1>
          </div>
        </div>
      </div>

      <div
        className="flex justify-evenly
       border-b-2 border-gray-200 mt-8 mb-6 p-4"
      >
        <Button
          variant="ghost"
          onClick={() => setActiveTab("bookmarks")}
          className={cn(
            "rounded-none border-solid border-2 border-transparent px-4 py-2 text-base font-semibold text-black w-[250px h-[54px]",
            activeTab === "bookmarks" &&
              "border-primary text-black bg-[#FBDBC8] rounded-md w-[250px h-[54px]",
          )}
        >
          My Bookmarks
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("reading")}
          className={cn(
            "rounded-none border-solid border-2 border-transparent px-4 py-2 text-base font-semibold text-black w-[250px h-[54px]",
            activeTab === "reading" &&
              "border-primary text-black bg-[#FBDBC8] rounded-md w-[250px] h-[54px]",
          )}
        >
          Currently Reading
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("history")}
          className={cn(
            "rounded-none border-solid border-2 border-transparent px-4 py-2 text-base text-black font-semibold w-[250px] h-[54px]",
            activeTab === "history" &&
              "border-primary text-black bg-[#FBDBC8] rounded-md w-[250px] h-[54px]",
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
