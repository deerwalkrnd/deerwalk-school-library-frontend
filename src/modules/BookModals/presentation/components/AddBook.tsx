"use client";

import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { useBookForm } from "./addbooks/useBookForm";
import { useFileUpload } from "./addbooks/useFileUpload";
import { useGenreSelection } from "./addbooks/useGenreSelection";
import { BookBasicInfo } from "./addbooks/BookBasicInfo";
import { BookCategorySelector } from "./addbooks/BookCategorySelector";
import { BookGenreSelector } from "./addbooks/BookGenreSelector";
import { BookClassInput } from "./addbooks/BookClassInput";
import { BookCopiesManager } from "./addbooks/BookCopiesManager";
import { BookCoverUpload } from "./addbooks/BookCoverUpload";
import { FormActions } from "./addbooks/FormActions";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom hooks
  const bookForm = useBookForm();
  const fileUpload = useFileUpload();
  const genreSelection = useGenreSelection();

  // Modal animation effects
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("Form submission started");

    try {
      const category =
        bookType === "academic"
          ? "ACADEMIC"
          : bookType === "non_academic"
            ? "NON_ACADEMIC"
            : "REFERENCE";

      const genres =
        category === "NON_ACADEMIC" ? genreSelection.selectedGenres : [0];

      const grade =
        category === "ACADEMIC" || category === "REFERENCE"
          ? (data.class || "").trim()
          : "";

      let cover_image_url = "";

      // Upload file if selected
      if (fileUpload.selectedFile) {
        console.log("Uploading cover image...");
        try {
          cover_image_url = await fileUpload.uploadFile();
          console.log("Cover image uploaded successfully:", cover_image_url);
        } catch (uploadError) {
          console.error("Failed to upload cover image:", uploadError);
          alert(
            `Failed to upload cover image: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`,
          );
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        title: (data.title || "").trim(),
        author: (data.author || "").trim(),
        publication: (data.publication || "").trim(),
        isbn: (data.isbn || "").trim(),
        category: category as "ACADEMIC" | "NON_ACADEMIC" | "REFERENCE",
        genres,
        grade,
        cover_image_url,
        copies: (data.copies || [])
          .map((c) => (c.unique_identifier || "").trim())
          .filter(Boolean)
          .map((unique_identifier) => ({ unique_identifier })),
      };

      console.log("Final payload:", payload);

      // Use submitBookData instead of onSubmit
      await bookForm.submitBookData(payload);

      // Reset form and close modal on success
      handleCancel();
    } catch (error) {
      console.error("Form submission error:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    bookForm.reset({
      title: "",
      author: "",
      publication: "",
      isbn: "",
      class: "",
      bookCount: "0",
      copies: [],
    });
    fileUpload.handleRemoveFile();
    genreSelection.resetGenres();
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => !isSubmitting && onOpenChange(false)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 h-210 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <form onSubmit={bookForm.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
            <h2 className="text-2xl font-semibold text-black flex items-center">
              Add Book
            </h2>
            <button
              onClick={() => !isSubmitting && onOpenChange(false)}
              type="button"
              className="text-gray-400 absolute right-6 hover:text-gray-600"
              disabled={isSubmitting}
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>

          <div className="p-10 space-y-6 w-210">
            <BookBasicInfo register={bookForm.register} />

            <hr className="border-gray-200" />

            <BookCategorySelector
              bookType={bookType}
              onBookTypeChange={setBookType}
            />

            {/* Genre or Class */}
            <div className="grid grid-cols-2 gap-4">
              {bookType === "non_academic" && (
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
              )}

              {(bookType === "academic" || bookType === "reference") && (
                <BookClassInput register={bookForm.register} />
              )}
            </div>

            <hr className="border-gray-200" />

            <BookCopiesManager
              register={bookForm.register}
              fields={bookForm.fields}
              setValue={bookForm.setValue}
            />

            <hr className="border-gray-200" />

            <BookCoverUpload
              selectedFile={fileUpload.selectedFile}
              isDragging={fileUpload.isDragging}
              onFileChange={fileUpload.handleFileChange}
              onDrop={fileUpload.handleDrop}
              onDragOver={fileUpload.handleDragOver}
              onDragLeave={fileUpload.handleDragLeave}
              onRemoveFile={fileUpload.handleRemoveFile}
            />

            <FormActions onCancel={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
}
