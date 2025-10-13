"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, CircleX } from "lucide-react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { getGenres } from "@/modules/BookPage/application/genreUseCase";
import { addBooks } from "@/modules/BookPage/application/bookUseCase";
import { useToast } from "@/core/hooks/useToast";

interface AddBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Copy = { unique_identifier: string };
type FormValues = {
  title: string;
  author: string;
  publication: string;
  isbn: string;
  class?: string;
  bookCount?: string;
  copies: Copy[];
};

async function uploadImage(file: File): Promise<string> {
  // const fd = new FormData();
  // fd.append("file", file);
  // const res = await fetch(`/api/upload?type=BOOK_COVER`, {
  //   method: "POST",
  //   body: fd,
  // });
  // const { url } = await res.json();
  const url =
    "https://unsplash.com/photos/a-person-with-elaborate-beaded-dreadlocks-and-a-wide-smile-n0VYjRD6_eI";
  return url;
}

export function AddBookModal({ open, onOpenChange }: AddBookModalProps) {
  const [bookType, setBookType] = useState<
    "academic" | "non_academic" | "reference"
  >("academic");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const genreDropdownRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [genrePage, setGenrePage] = useState(1);

  const { data: genreData, isLoading } = getGenres({ page: genrePage });
  const mutation = addBooks();

  const { register, handleSubmit, control, watch, reset, setValue } =
    useForm<FormValues>({
      defaultValues: {
        bookCount: "0",
        copies: [],
      },
    });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "copies",
  });

  const watchedBookCount = watch("bookCount") || "0";
  const desiredCount = Math.max(0, Number(watchedBookCount) || 0);

  // keep copies length in sync with bookCount
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
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [open]);

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

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const category =
      bookType === "academic"
        ? "ACADEMIC"
        : bookType === "non_academic"
          ? "NON_ACADEMIC"
          : "REFERENCE";

    const genres = category === "NON_ACADEMIC" ? selectedGenres : [0];

    const grade =
      category === "ACADEMIC" || category === "REFERENCE"
        ? (data.class || "").trim()
        : "";

    let cover_image_url = "";
    if (selectedFile) cover_image_url = await uploadImage(selectedFile);

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

    console.log("Submitting payload:", payload);
    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "Book added successfully");
        reset({
          title: "",
          author: "",
          publication: "",
          isbn: "",
          class: "",
          bookCount: "0",
          copies: [],
        });
        setSelectedFile(null);
        setSelectedGenres([]);
      },
      onError: (error: any) => {
        useToast("error", error?.message || "Failed to add Book");
      },
    });
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 h-210 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
            <h2 className="text-2xl font-semibold text-black flex items-center">
              Add Book
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              type="button"
              className="text-gray-400 absolute right-6 hover:text-gray-600"
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>

          <div className="p-10 space-y-6 w-210">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-black"
                >
                  Title
                </label>
                <input
                  id="title"
                  placeholder="Title"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-black"
                >
                  Author
                </label>
                <input
                  id="author"
                  placeholder="Author"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-[#747373]"
                  {...register("author", { required: true })}
                />
              </div>
            </div>

            {/* Publication / ISBN */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="publication"
                  className="block text-sm font-medium text-black"
                >
                  Publication
                </label>
                <input
                  id="publication"
                  placeholder="Publication"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-[#747373]"
                  {...register("publication", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="isbn"
                  className="block text-sm font-medium text-black"
                >
                  ISBN
                </label>
                <input
                  id="isbn"
                  placeholder="ISBN"
                  className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-[#747373]"
                  {...register("isbn", { required: true })}
                />
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Category radios */}
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

            {/* Genre or Class */}
            <div className="grid grid-cols-2 gap-4">
              {bookType === "non_academic" && (
                <div className="space-y-2 relative" ref={genreDropdownRef}>
                  <label className="block text-sm font-medium text-black">
                    Genre
                  </label>

                  <div
                    onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                    className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium bg-[#EA5D0E0D] cursor-pointer"
                  >
                    {selectedGenres.length > 0
                      ? `${selectedGenres.length} selected`
                      : "Select genres"}
                  </div>

                  {isGenreDropdownOpen && (
                    <div className="absolute z-10 w-45 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-y-auto">
                      {isLoading && (
                        <div className="px-3 py-2 text-xs text-gray-600">
                          Loading…
                        </div>
                      )}

                      {!isLoading &&
                        genreData?.items?.map((genre: any) => (
                          <div
                            key={genre.id}
                            onClick={() => toggleGenre(genre.id)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              readOnly
                              checked={selectedGenres.includes(genre.id)}
                              className="h-4 w-4 accent-black"
                            />
                            <span className="text-sm text-black">
                              {genre.title}
                            </span>
                          </div>
                        ))}

                      {/* Footer: Prev / Next */}
                      <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGenrePage((p) => Math.max(1, p - 1));
                          }}
                          disabled={genrePage === 1}
                          className="text-xs font-medium text-black disabled:text-gray-400"
                        >
                          Previous
                        </button>
                        <span className="text-xs text-gray-600">
                          Page {genrePage}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGenrePage((p) => p + 1);
                          }}
                          disabled={!genreData?.hasNextPage}
                          className="text-xs font-medium text-black disabled:text-gray-400"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(bookType === "academic" || bookType === "reference") && (
                <div className="space-y-2">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-black"
                  >
                    Class
                  </label>
                  <input
                    id="class"
                    placeholder="1,2,...10"
                    className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-[#747373] text-sm font-medium bg-[#EA5D0E0D]"
                    {...register("class")}
                  />
                </div>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* Book count + dynamic copies */}
            <div className="space-y-4 w-190">
              <div className="flex flex-col justify-start gap-4">
                <label
                  htmlFor="book-count"
                  className="text-sm font-medium text-black"
                >
                  How many books are you uploading?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="book-count"
                    type="number"
                    min={0}
                    className="w-45 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-sm font-medium"
                    {...register("bookCount")}
                    onChange={(e) => {
                      // ensure we also normalize to string for RHF
                      const v = e.target.value;
                      // Update the RHF value
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
                      className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
                      {...register(`copies.${idx}.unique_identifier` as const)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-2 w-190 h-53">
              <label className="block text-sm font-medium text-black">
                Cover Photo
              </label>
              <div
                className={`border-2 border-gray-300 rounded-sm p-18 text-center cursor-pointer ${
                  isDragging ? "border-black bg-gray-100" : "bg-[#EA5D0E0D]"
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
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm font-medium text-black">
                      {selectedFile.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <CircleX className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-6 w-6 mb-2 text-black" />
                    <p className="text-xs font-medium text-black">
                      Click to upload photo
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 pb-10">
              <button
                className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30"
                type="submit"
              >
                Add Book
              </button>
              <button
                onClick={() => onOpenChange(false)}
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-medium text-black bg-white w-30"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
