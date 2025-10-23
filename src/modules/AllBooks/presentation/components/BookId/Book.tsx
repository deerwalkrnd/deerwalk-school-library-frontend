"use client";

import {
  BadgeCheck,
  BookIcon,
  Bookmark,
  BookmarkCheck,
  CircleSlash,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import {
  getAvailableCopies,
  useGetBookById,
} from "@/modules/BookPage/application/bookUseCase";
import Button from "@/core/presentation/components/Button/Button";
import { Button as BookmarkButton } from "@/core/presentation/components/ui/button";
import Image from "next/image";
import {
  useCheckBookmark,
  useAddBookmark,
  useRemoveBookmark,
} from "@/modules/AllBooks/application/bookmarkUseCase";
import { useToast } from "@/core/hooks/useToast";
import { useBorrowBook } from "@/modules/Borrow/application/BorrowUseCase";
import { BorrowRequest } from "@/modules/Borrow/domain/entities/BorrowEntity";
import { BookCopy } from "@/modules/BookPage/domain/entities/bookModal";
import { useAuth } from "@/core/presentation/contexts/AuthContext";

const Book = ({ id }: { id: string }) => {
  const [borrowLoading, setBorrowLoading] = useState(false);
  const { user } = useAuth();

  const borrowMutation = useBorrowBook();
  const { data, isLoading } = useGetBookById(Number.parseInt(id));
  const { data: bookmarkId, isLoading: checkingBookmark } =
    useCheckBookmark(id);
  const { data: copies, isLoading: loadingCopies } = getAvailableCopies({
    book_id: Number.parseInt(id),
  });
  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();

  const isBookmarked = Boolean(bookmarkId) && bookmarkId !== "null";

  const bookmarkLoading =
    checkingBookmark ||
    addBookmarkMutation.isPending ||
    removeBookmarkMutation.isPending;

  const description =
    ((data as unknown as { description?: string })?.description ?? "")
      .toString()
      .trim() || undefined;

  const availabilityCount = Array.isArray(copies?.items)
    ? copies.items.length
    : 0;
  const isAvailable = availabilityCount > 0;
  const availabilityLabel = isAvailable ? "Available" : "Unavailable";
  const StatusIcon = isAvailable ? BadgeCheck : CircleSlash;

  const genreList = Array.isArray(data?.genre)
    ? data?.genre.filter((genre): genre is string => typeof genre === "string")
    : typeof data?.genre === "string"
      ? [data.genre]
      : [];

  const publicationDetails =
    typeof data?.publication === "string"
      ? data.publication
          .split(/[|,]/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const handleBorrow = async () => {
    if (borrowLoading) return;

    setBorrowLoading(true);
    try {
      const availableCopy = copies?.items?.find(
        (item: BookCopy) => item.is_available == true,
      );
      if (!availableCopy) {
        useToast("error", "No available copies to borrow");
        return;
      }

      if (!user) {
        useToast("error", "Please log in to borrow books");
        return;
      }
      const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const payload: BorrowRequest = {
        times_renewable: 3,
        fine_enabled: true,
        due_date: dueDate,
        user_uuid: user.uuid,
      };

      await borrowMutation.mutateAsync({
        id: availableCopy.id,
        bookId: Number.parseInt(id),
        payload: payload,
      });
      useToast("success", "Borrow request sent to librarian successfully");
    } catch (error) {
      console.error("Borrow failed:", error);
      useToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to send borrow request",
      );
    } finally {
      setBorrowLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (bookmarkLoading) return;

    try {
      if (isBookmarked && bookmarkId && bookmarkId !== "null") {
        await removeBookmarkMutation.mutateAsync(bookmarkId);

        useToast("success", "Bookmark removed successfully");
      } else {
        await addBookmarkMutation.mutateAsync({ book_id: id });

        useToast("success", "Bookmark added successfully");
      }
    } catch (error) {
      console.error("Bookmark operation failed:", error);
      useToast(
        "error",
        error instanceof Error ? error.message : "Failed to update bookmark",
      );
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
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="grid items-start gap-12 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="rounded-3xl bg-white p-6 shadow-[0_32px_85px_rgba(15,23,42,0.12)]">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={
                data?.cover_image_url && data.cover_image_url.trim() !== ""
                  ? data.cover_image_url
                  : "/placeholder.png"
              }
              alt={data?.title || "Book cover"}
              width={560}
              height={800}
              className="h-full w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-start space-y-8 lg:py-2">
          <span
            className={`inline-flex w-fit justify-start items-start gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
              isAvailable
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-rose-500 bg-rose-50 text-rose-600"
            }`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {availabilityLabel}
          </span>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-slate-900">
              {data?.title}
            </h1>
            <p className="text-lg font-medium text-slate-600">{data?.author}</p>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              {description ??
                "We are working on adding a description for this title. Check back soon to learn more about the story."}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              onClick={handleBorrow}
              disabled={borrowLoading}
              className="flex h-12 items-center justify-center gap-2 !rounded-lg !bg-primary !px-6 !py-0 text-sm font-semibold text-white transition hover:!bg-primary"
            >
              {borrowLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <BookIcon className="h-5 w-5" />
              )}
              {borrowLoading ? "Processing..." : "Reserve Book"}
            </Button>

            <BookmarkButton
              onClick={handleBookmark}
              disabled={bookmarkLoading}
              className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              {bookmarkLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 fill-current" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
              {bookmarkLoading
                ? "Processing..."
                : isBookmarked
                  ? "Bookmarked"
                  : "Bookmark"}
            </BookmarkButton>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-16 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase  ">ISBN</p>
          <p className="mt-4 text-lg font-medium text-slate-900">
            {data?.isbn || "Not available"}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase ">Publication</p>
          <div className="mt-4 space-y-1 text-lg font-medium text-slate-900">
            {publicationDetails.length > 0 ? (
              publicationDetails.map((item) => <p key={item}>{item}</p>)
            ) : (
              <p>{data?.publication || "Not available"}</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase ">Genre</p>
          <div className="mt-4 space-y-1 text-lg font-medium text-slate-900">
            {genreList.length > 0 ? (
              genreList.map((genre) => <p key={genre}>{genre}</p>)
            ) : (
              <p>{data?.genre || "Not available"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
