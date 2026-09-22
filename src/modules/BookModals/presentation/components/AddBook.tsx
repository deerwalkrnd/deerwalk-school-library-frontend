"use client";

import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useBookForm } from "../hooks/useBookForm";
import { useFileUpload } from "../hooks/useFileUpload";
import { useGenreSelection } from "../hooks/useGenreSelection";
import { BookBasicInfo } from "./addbooks/BookBasicInfo";
import { BookCategorySelector } from "./addbooks/BookCategorySelector";
import { BookGenreSelector } from "./addbooks/BookGenreSelector";
import { BookClassInput } from "./addbooks/BookClassInput";
import { BookCopiesManager } from "./addbooks/BookCopiesManager";
import { BookCoverUpload } from "./addbooks/BookCoverUpload";
import { FormActions } from "./addbooks/FormActions";
import { useCreateBook } from "../../application/useCreateBook";
import { showToast } from "@/core/lib/showToast";

interface AddBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FormValues = {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: { unique_identifier: string }[];
};

export function AddBookModal({ open, onOpenChange }: AddBookModalProps) {
  const [bookType, setBookType] = useState<
    "academic" | "non_academic" | "reference"
  >("academic");
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const bookForm = useBookForm();
  const fileUpload = useFileUpload();
  const genreSelection = useGenreSelection();
  const createBookMutation = useCreateBook();

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (createBookMutation.isPending) return;

    try {
      await createBookMutation.mutateAsync({
        bookType,
        title: data.title,
        author: data.author,
        publication: data.publication,
        isbn: data.isbn,
        class: data.class,
        copies: data.copies,
        coverImageFile: fileUpload.selectedFile || undefined,
        selectedGenres: genreSelection.selectedGenres,
      });

      showToast("success", "Book added successfully");
      handleCancel();
    } catch (error: any) {
      showToast("error", error?.message || "Failed to add book");
    }
  };

  const extractErrorMessage = (error: unknown): string | undefined => {
    if (!error) return undefined;

    if (Array.isArray(error)) {
      for (const item of error) {
        const message = extractErrorMessage(item);
        if (message) return message;
      }
      return undefined;
    }

    if (typeof error === "object") {
      const record = error as Record<string, unknown>;

      if (typeof record.message === "string" && record.message) {
        return record.message;
      }

      if (record.types && typeof record.types === "object") {
        const firstTypeMessage = Object.values(
          record.types as Record<string, unknown>,
        )[0];
        if (firstTypeMessage) return String(firstTypeMessage);
      }

      for (const value of Object.values(record)) {
        const message = extractErrorMessage(value);
        if (message) return message;
      }
    }

    return undefined;
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (errors) => {
    const message =
      extractErrorMessage(errors) ||
      "Please resolve the highlighted fields before submitting.";
    showToast("error", message);
  };

  const handleCancel = () => {
    onOpenChange(false);
    bookForm.reset({
      title: "",
      author: "",
      publication: "",
      isbn: "",
      class: "",
      bookCount: "1",
      copies: [{ unique_identifier: "" }],
    });
    fileUpload.handleRemoveFile();
    genreSelection.resetGenres();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => !createBookMutation.isPending && onOpenChange(false)}
      />
      <div
        // A4 sheet (210 × 297 mm); shrinks to the viewport on smaller screens.
        className={`relative flex w-[210mm] max-w-full h-[297mm] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] flex-col bg-white rounded-lg shadow-xl ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <form
          onSubmit={bookForm.handleSubmit(onSubmit, onInvalid)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="relative flex shrink-0 items-center justify-center px-6 pt-4 pb-2">
            <h2 className="text-2xl font-semibold text-black flex items-center">
              Add Book
            </h2>
            <button
              onClick={() =>
                !createBookMutation.isPending && onOpenChange(false)
              }
              type="button"
              aria-label="Close"
              className="text-gray-400 absolute right-5 hover:text-gray-600"
              disabled={createBookMutation.isPending}
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>

          {/* Scrolls only when the screen is shorter than the A4 sheet */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-10 py-5 space-y-6">
            <BookBasicInfo
              register={bookForm.register}
              errors={bookForm.formState.errors}
            />

            <BookCategorySelector
              bookType={bookType}
              onBookTypeChange={setBookType}
            />

            <BookCopiesManager
              register={bookForm.register}
              fields={bookForm.fields}
              setValue={bookForm.setValue}
              leading={
                bookType === "non_academic" ? (
                  <BookGenreSelector
                    isOpen={genreSelection.isGenreDropdownOpen}
                    onToggle={() =>
                      genreSelection.setIsGenreDropdownOpen(
                        !genreSelection.isGenreDropdownOpen,
                      )
                    }
                    selectedGenres={genreSelection.selectedGenres}
                    onGenreToggle={genreSelection.toggleGenre}
                    genreData={genreSelection.genreData}
                    isLoading={genreSelection.isLoading}
                    currentPage={genreSelection.genrePage}
                    onPageChange={genreSelection.handleGenrePageChange}
                  />
                ) : (
                  <BookClassInput register={bookForm.register} />
                )
              }
            />

            <BookCoverUpload
              selectedFile={fileUpload.selectedFile}
              previewUrl={fileUpload.previewUrl}
              isDragging={fileUpload.isDragging}
              onFileChange={fileUpload.handleFileChange}
              onDrop={fileUpload.handleDrop}
              onDragOver={fileUpload.handleDragOver}
              onDragLeave={fileUpload.handleDragLeave}
              onRemoveFile={fileUpload.handleRemoveFile}
              fileInputRef={fileUpload.fileInputRef}
            />
          </div>

          <div className="shrink-0 border-t border-gray-200 px-5 sm:px-10">
            <FormActions
              onCancel={handleCancel}
              isLoading={createBookMutation.isPending}
              className="py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
