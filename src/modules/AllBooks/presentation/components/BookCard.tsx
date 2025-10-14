"use client";

import { Bookmark, Loader2 } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type React from "react";
import { useState, useEffect } from "react";
import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/modules/AllBooks/application/bookmarkUseCase";
import { useToast } from "@/core/hooks/useToast"; // ✅ same import style as AddBookModal

interface BookData {
  id: string;
  title: string;
  author: string;
  imageUrl?: StaticImageData | string;
  isBookmarked?: boolean;
  bookmarkId?: string;
}

interface BookCardProps {
  book: BookData;
  onClick?: (book: BookData) => void;
}

type BookmarkState = "normal" | "loading" | "completed";

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(book.isBookmarked || false);
  const [bookmarkState, setBookmarkState] = useState<BookmarkState>("normal");
  const [bookmarkId, setBookmarkId] = useState<string | null>(
    book.bookmarkId || null,
  );

  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();

  useEffect(() => {
    setIsBookmarked(book.isBookmarked || false);
  }, [book.isBookmarked]);

  useEffect(() => {
    setBookmarkId(book.bookmarkId || null);
  }, [book.bookmarkId]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkState === "loading") return;

    setBookmarkState("loading");

    try {
      if (isBookmarked && bookmarkId) {
        // Remove bookmark
        await removeBookmarkMutation.mutateAsync(bookmarkId);
        setIsBookmarked(false);
        setBookmarkId(null);
        useToast("success", "Bookmark removed successfully");
      } else {
        // Add bookmark
        const response = await addBookmarkMutation.mutateAsync({
          book_id: book.id,
        });
        setIsBookmarked(true);
        setBookmarkId(response.bookmarkId || book.id);
        useToast("success", "Bookmark added successfully");
      }

      setBookmarkState("completed");
      setTimeout(() => setBookmarkState("normal"), 2000);
    } catch (error: any) {
      console.error("Bookmark operation failed:", error);
      setBookmarkState("normal");
      useToast("error", error?.message || "Failed to update bookmark");
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
            fill={isBookmarked ? "#fff" : "none"}
            strokeWidth={isBookmarked ? 0 : 2}
          />
        );
      default:
        return (
          <Bookmark
            className="w-4 h-4 text-white"
            fill={isBookmarked ? "#fff" : "none"}
            strokeWidth={isBookmarked ? 0 : 2}
          />
        );
    }
  };

  const getButtonStyle = () => {
    switch (bookmarkState) {
      case "loading":
        return "bg-black";
      case "completed":
        return "bg-loadState";
      default:
        return isBookmarked ? "bg-loadState" : "bg-black hover:bg-gray-800";
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
                "/placeholder.svg?height=300&width=200&query=book cover"
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
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
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
