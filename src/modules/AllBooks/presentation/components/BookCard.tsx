"use client";

import { Bookmark, Loader2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import type React from "react";
import { useState } from "react";

interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl?: StaticImageData | string;
}

interface BookCardProps {
  book: BookData;
  onClick?: (book: BookData) => void;
}

type BookmarkState = "normal" | "loading" | "completed";

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const [bookmarkState, setBookmarkState] = useState<BookmarkState>("normal");

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (bookmarkState === "loading") return;

    setBookmarkState("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setBookmarkState("completed");

      setTimeout(() => {
        setBookmarkState("normal");
      }, 2000);
    } catch (error) {
      console.error("Bookmark failed:", error);
      setBookmarkState("normal");
    }
  };

  const getBookmarkIcon = () => {
    switch (bookmarkState) {
      case "loading":
        return <Loader2 className="w-4 h-4 text-white animate-spin" />;
      case "completed":
        return (
          <Bookmark
            className="w-4 h-4 text-white"
            fill="#fff"
            strokeWidth={0}
          />
        );
      default:
        return <Bookmark className="w-4 h-4 text-white" />;
    }
  };

  const getButtonStyle = () => {
    switch (bookmarkState) {
      case "loading":
        return "bg-black";
      case "completed":
        return "bg-loadState";
      default:
        return "bg-black hover:bg-gray-800";
    }
  };

  return (
    <div className="p-4 w-full max-w-85 mx-auto">
      <div className="relative">
        <div
          className="bg-white shadow-md shadow-black/10 h-73 flex justify-center items-center mb-4 rounded-lg overflow-hidden hover:shadow-lg transition-shadow p-4 cursor-pointer"
          onClick={() => onClick?.(book)}
        >
          <div className="relative w-full h-full max-w-[157px] max-h-[238px]">
            <Image
              src={
                book.imageUrl ||
                "/placeholder.svg?height=300&width=200&query=book cover" ||
                "/placeholder.svg"
              }
              alt={book.title}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-2 right-4 rounded-full p-2 shadow-lg z-10 transition-all duration-200 ${getButtonStyle()} ${
            bookmarkState === "loading"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={bookmarkState === "loading"}
        >
          {getBookmarkIcon()}
        </button>
        <div className="space-y-2">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-2 leading-tight">
            {book.title}
          </h3>
          <h4 className="text-black font-medium text-sm sm:text-base">
            {book.author}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
