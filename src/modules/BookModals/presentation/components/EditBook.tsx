"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, CircleX } from "lucide-react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useToast } from "@/core/hooks/useToast";
import { useUpdateBook } from "../../application/useUpdateBook";
import { useGenres, useBookGenres } from "../../application/useGenres";
import { FormActions } from "./addbooks/FormActions";
import { getAvailableCopies } from "@/modules/BookPage/application/bookUseCase";

interface BookData {
  id: number;
  title: string;
  author: string;
  publication: string;
  isbn: string;
  category: string;
  grade?: string;
  copies?: { unique_identifier: string }[];
  cover_image_url?: string;
}

interface EditBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book?: BookData | null;
}

type Copy = { unique_identifier: string };
type EditFormValues = {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: Copy[];
  cover_image_url?: string;
};

export function EditBookModal({
  open,
  onOpenChange,
  book,
}: EditBookModalProps) {
  const [bookType, setBookType] = useState<
    "academic" | "non_academic" | "reference"
  >("academic");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const genreDropdownRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const updateBookMutation = useUpdateBook();
  const {
    data: allGenres,
    isLoading: genresLoading,
    error: genresError,
  } = useGenres();

  const {
    data: bookGenres,
    isLoading: bookGenresLoading,
    error: bookGenresError,
  } = useBookGenres(book?.id || 0);

  const { register, handleSubmit, control, watch, reset, setValue } =
    useForm<EditFormValues>({
      defaultValues: {
        bookCount: "0",
        copies: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "copies",
  });

  const { data: availableCopies, refetch: refetchAvailableCopies } =
    getAvailableCopies(book?.id ? { book_id: book.id } : undefined);

  const watchedBookCount = watch("bookCount") || "0";
  const currentCoverUrl = watch("cover_image_url");
  const desiredCount = Math.max(0, Number(watchedBookCount) || 0);

  useEffect(() => {
    if (desiredCount < 0) return;
    const diff = desiredCount - fields.length;
    if (diff > 0) {
      append(Array.from({ length: diff }, () => ({ unique_identifier: "" })));
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) remove(fields.length - 1 - i);
    }
  }, [desiredCount, fields.length, append, remove]);

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
      setSelectedGenres([]);
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
      setSelectedGenres([]);
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const updateCoverSelection = (file: File | null) => {
    setSelectedFile(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
    if (!file && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!book) return;

    const categoryLc = book.category?.toLowerCase();
    const inferredType =
      categoryLc === "non_academic"
        ? "non_academic"
        : categoryLc === "reference"
          ? "reference"
          : "academic";

    setBookType(inferredType);

    const normalizedCopies = (availableCopies?.items ?? book.copies ?? []).map(
      (c) => ({
        unique_identifier: c?.unique_identifier || "",
      }),
    );

    reset({
      title: book.title || "",
      author: book.author || "",
      publication: book.publication || "",
      isbn: book.isbn || "",
      class: book.grade || "",
      bookCount: normalizedCopies.length.toString(),
      copies: normalizedCopies,
      cover_image_url: book.cover_image_url || "",
    });
    updateCoverSelection(null);
  }, [book, availableCopies, reset]);

  // After bookGenres loads, set selected checkboxes (non_academic only) ---
  useEffect(() => {
    const categoryLc = book?.category?.toLowerCase();
    const isNonAcademic = categoryLc === "non_academic";

    if (!isNonAcademic) {
      setSelectedGenres([]);
      return;
    }

    if (bookGenresLoading) return;

    const ids = (bookGenres || [])
      .map((genre: any) => genre.id)
      .filter(Number.isFinite);
    setSelectedGenres(ids);
  }, [book?.category, bookGenres, bookGenresLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreDropdownOpen(false);
      }
    };
    if (isGenreDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isGenreDropdownOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) updateCoverSelection(file);
  };
  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) updateCoverSelection(file);
  };
  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const handleRemoveFile = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    updateCoverSelection(null);
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    if (updateBookMutation.isPending || !book?.id) return;

    try {
      console.log("payload copies ", data.copies);
      await updateBookMutation.mutateAsync({
        id: book!.id.toString(),
        formData: {
          bookType,
          title: data.title,
          author: data.author,
          publication: data.publication,
          isbn: data.isbn,
          class: data.class,
          copies: data.copies,
          selectedGenres: selectedGenres,
          coverImageFile: selectedFile || undefined,
          existingCoverImageUrl: data.cover_image_url,
        },
      });

      if (book?.id) {
        await refetchAvailableCopies();
      }

      useToast("success", "Book updated successfully");
      updateCoverSelection(null);
      onOpenChange(false);
    } catch (error: any) {
      useToast("error", error?.message || "Failed to update book");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => !updateBookMutation.isPending && onOpenChange(false)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 h-210 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
            <h2 className="text-2xl font-semibold text-black flex items-center">
              Edit Book
            </h2>
            <button
              onClick={() =>
                !updateBookMutation.isPending && onOpenChange(false)
              }
              type="button"
              className="text-gray-400 absolute right-6 hover:text-gray-600"
              disabled={updateBookMutation.isPending}
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>

          <div className="p-10 space-y-6 w-210">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Title
                </label>
                <input
                  placeholder="Title"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Author
                </label>
                <input
                  placeholder="Author"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder"
                  {...register("author", { required: true })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Publication
                </label>
                <input
                  placeholder="Publication"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder"
                  {...register("publication", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  ISBN
                </label>
                <input
                  placeholder="ISBN"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder"
                  {...register("isbn", { required: true })}
                />
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-3 w-190">
              <div className="flex gap-8">
                {(["academic", "non_academic", "reference"] as const).map(
                  (v) => (
                    <label key={v} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="bookType"
                        value={v}
                        checked={bookType === v}
                        onChange={(e) =>
                          setBookType(e.target.value as typeof bookType)
                        }
                        className="h-4 w-4 accent-black border-gray-300"
                      />
                      <span className="text-xs font-medium text-black">
                        {v === "non_academic"
                          ? "Non-Academic"
                          : v[0].toUpperCase() + v.slice(1)}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {bookType === "non_academic" && (
                <div className="space-y-2 relative" ref={genreDropdownRef}>
                  <label className="block text-sm font-medium text-black">
                    Genre
                  </label>

                  <div
                    onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                    className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium bg-primary/5 cursor-pointer"
                  >
                    {selectedGenres.length > 0
                      ? `${selectedGenres.length} selected`
                      : "Select genres"}
                  </div>

                  {isGenreDropdownOpen && (
                    <div className="absolute z-10 w-45 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-y-auto">
                      {genresLoading ? (
                        <div className="px-3 py-2 text-xs text-gray-600">
                          Loading genres...
                        </div>
                      ) : genresError ? (
                        <div className="px-3 py-2 text-xs text-red-600">
                          Error loading genres
                        </div>
                      ) : allGenres && allGenres.items?.length > 0 ? (
                        allGenres.items.map((genre: any) => (
                          <label
                            key={genre.id}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedGenres.includes(genre.id)}
                              onChange={() => toggleGenre(genre.id)}
                              className="h-4 w-4 accent-black border-gray-300"
                            />
                            <span className="text-xs font-medium text-black">
                              {genre.title}
                            </span>
                          </label>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-xs text-gray-600">
                          No genres available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {(bookType === "academic" || bookType === "reference") && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    Class
                  </label>
                  <input
                    placeholder="1,2,...10"
                    className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-placeholder text-sm font-medium bg-primary/5"
                    {...register("class")}
                  />
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-4 w-190">
              <div className="flex flex-col justify-start gap-4">
                <label className="text-sm font-medium text-black">
                  How many books are you uploading?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    className="w-45 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-sm font-medium"
                    {...register("bookCount")}
                    onChange={(e) => {
                      const v = e.target.value;
                      setValue("bookCount", v, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {fields.map((field, idx) => (
                  <div key={field.id} className="space-y-2">
                    <label className="block text-sm font-medium text-[#747373]">
                      Book {idx + 1}
                    </label>
                    <input
                      placeholder="dss_book_id"
                      className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5"
                      {...register(`copies.${idx}.unique_identifier` as const)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-2 w-190 h-53">
              <input type="hidden" {...register("cover_image_url")} />
              <label className="block text-sm font-medium text-black">
                Cover Photo
              </label>
              <label
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-sm h-44 cursor-pointer bg-primary/5 overflow-hidden ${
                  isDragging ? "border-black bg-gray-100" : "border-gray-300"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                {previewUrl || currentCoverUrl ? (
                  <>
                    <img
                      src={previewUrl || currentCoverUrl || ""}
                      alt="Cover preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white text-xs flex flex-col items-center justify-center px-4 text-center">
                      <span className="line-clamp-2">
                        {previewUrl ? selectedFile?.name : "Current cover"}
                      </span>
                      <span className="text-[10px] mt-1">
                        Click or drop to replace
                      </span>
                    </div>
                    {previewUrl && (
                      <button
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 bg-white/80 text-gray-700 rounded-full p-1 shadow-sm hover:bg-white"
                        aria-label="Remove cover image"
                        type="button"
                      >
                        <CircleX className="h-4 w-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 mb-2 text-gray-500" />
                    <p className="text-xs font-medium text-gray-600">
                      Click or drag an image to upload
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </>
                )}
              </label>
            </div>

            <FormActions
              edit={true}
              onCancel={handleCancel}
              isLoading={updateBookMutation.isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
