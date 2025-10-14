"use client";

import { BookIcon, Bookmark, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useGetBookById } from "@/modules/BookPage/application/bookUseCase";
import Button from "@/core/presentation/components/Button/Button";
import { Button as BookmarkButton } from "@/core/presentation/components/ui/button";
import Image from "next/image";

const Book = ({ id }: { id: string }) => {
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [borrowLoading, setBorrowLoading] = useState(false);

  const { data, isLoading } = useGetBookById(parseInt(id));
  console.log(data);
  const handleBorrow = async () => {
    if (borrowLoading) return;

    setBorrowLoading(true);
    try {
      // TODO: Implement borrow functionality
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Borrow functionality to be implemented");
    } catch (error) {
      console.error("Borrow failed:", error);
    } finally {
      setBorrowLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (bookmarkLoading) return;

    setBookmarkLoading(true);
    try {
      // TODO: Implement bookmark functionality
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Bookmark functionality to be implemented");
    } catch (error) {
      console.error("Bookmark failed:", error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading book details...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Book not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white  rounded-lg overflow-hidden">
        <div className="md:flex md:flex-col gap-5">
          <div className="md:flex">
            <div className="md:w-1/3 flex justify-center items-start">
              <div className="relative w-full">
                <div className="relative w-full rounded-lg shadow-lg py-5 px-3 h-full  mx-auto">
                  <Image
                    src={
                      data?.cover_image_url &&
                      data.cover_image_url.trim() !== ""
                        ? data.cover_image_url
                        : "/placeholder.png"
                    }
                    alt={data?.title || "Book cover"}
                    width={500}
                    height={500}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-2/3 p-6 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {data?.title}
                </h1>
                <h2 className="text-xl text-gray-700 mb-4">
                  by {data?.author}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleBorrow}
                  disabled={borrowLoading}
                  className="flex items-center justify-center gap-2 text-sm px-4 py-2 h-9"
                >
                  {borrowLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BookIcon className="w-4 h-4" />
                  )}
                  {borrowLoading ? "Processing..." : "Borrow Now"}
                </Button>

                <BookmarkButton
                  onClick={handleBookmark}
                  disabled={bookmarkLoading}
                  className="bg-white hover:bg-gray-50 text-black font-semibold shadow-md border border-gray-300 flex items-center justify-center gap-2 text-sm px-4 py-2 h-9"
                >
                  {bookmarkLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  {bookmarkLoading ? "Processing..." : "Bookmark"}
                </BookmarkButton>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="space-y-2">
                <div className="flex flex-col justify-start">
                  <span className="font-semibold text-gray-900 mb-2">ISBN</span>
                  <span className=" text-gray-800">
                    {data?.isbn || "Not available"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Publication:
                  </span>
                  <span className="ml-2 text-gray-800">
                    {data?.publication || "Not available"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Genre:</span>
                  <span className="ml-2 text-gray-800">
                    {data?.genre || "Not available"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Grade:</span>
                  <span className="ml-2 text-gray-800">
                    {data?.grade || "Not available"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Additional Information
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <span className="ml-2 text-gray-800">
                    {data?.category || "Not available"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Copies:</span>
                  <span className="ml-2 text-gray-800">
                    {data?.copies
                      ? `${data.copies.length} copies`
                      : "Not available"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Book ID:</span>
                  <span className="ml-2 text-gray-800">
                    {data?.id || "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
