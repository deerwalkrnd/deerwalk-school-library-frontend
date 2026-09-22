"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
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
import { FormSection } from "./addbooks/FormSection";
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
        className={`relative flex w-full max-w-[960px] max-h-[min(800px,calc(100dvh-1.5rem))] flex-col bg-white rounded-xl border border-gray-200 shadow-lg ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-book-title"
      >
        <form
          onSubmit={bookForm.handleSubmit(onSubmit, onInvalid)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="relative shrink-0 px-6 sm:px-8 pt-6 pb-4 text-center">
            <h2
              id="add-book-title"
              className="text-2xl font-semibold text-gray-900"
            >
              Add New Book
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the book details and upload its cover image.
            </p>
            <button
              onClick={() =>
                !createBookMutation.isPending && onOpenChange(false)
              }
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer disabled:opacity-50"
              disabled={createBookMutation.isPending}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-8 pb-6 space-y-6">
            <FormSection title="Book Information">
              <BookBasicInfo
                register={bookForm.register}
                errors={bookForm.formState.errors}
              />
            </FormSection>

            <FormSection title="Classification">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <BookCategorySelector
                  bookType={bookType}
                  onBookTypeChange={setBookType}
                />
                {bookType === "non_academic" ? (
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
                )}
              </div>
            </FormSection>

            {/* Side by side so the whole form fits a laptop screen without scrolling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              <FormSection title="Inventory">
                <BookCopiesManager
                  register={bookForm.register}
                  fields={bookForm.fields}
                  setValue={bookForm.setValue}
                  bookCount={bookForm.watchedBookCount}
                />
              </FormSection>

              <FormSection title="Cover">
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
              </FormSection>
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-200 px-6 sm:px-8">
            <FormActions
              onCancel={handleCancel}
              isLoading={createBookMutation.isPending}
              className="py-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
