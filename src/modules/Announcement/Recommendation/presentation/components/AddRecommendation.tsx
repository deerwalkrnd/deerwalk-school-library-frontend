"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { Upload, CircleX } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { addRecommendation } from "../../application/recommendationUseCase";
import { RecommendationRequest } from "../../domain/entities/RecommendationEntity";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddRecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Book {
  id: number;
  title: string;
}

export function AddRecommendationModal({
  open,
  onOpenChange,
}: AddRecommendationModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [note, setNote] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const addRecommendationMutation = addRecommendation();

  const { data: booksData, isLoading: loadingBooks } = useQuery({
    queryKey: ["books", "all"],
    queryFn: async () => {
      const response = await fetch("/api/books?page=1&limit=100");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      return data;
    },
    enabled: open,
  });

  const books: Book[] = booksData?.items || [];

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
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCover(e.target.files[0]);
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setCoverImageUrl(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: RecommendationRequest = {
        name,
        designation,
        note,
        book_title: bookTitle,
        cover_image_url: coverImageUrl || "",
      };

      await addRecommendationMutation.mutateAsync(payload);

      setName("");
      setDesignation("");
      setNote("");
      setBookTitle("");
      setCover(null);
      setCoverImageUrl("");

      onOpenChange(false);
      toast.success("Recommendation added successfully.");
    } catch (error) {
      console.error("Error adding recommendation:", error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className={`relative bg-white rounded-sm shadow-lg w-160 mx-4 p-10 h-183 overflow-y-auto no-scrollbar ${animationClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <CircleX size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Recommendation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Recommender's Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Designation
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-140 px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
              placeholder="Designation (Ex: Principal)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Recommender's Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder resize-vertical"
              placeholder="Your note..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Book Title</label>
            <select
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
              required
              disabled={loadingBooks}
            >
              <option value="">
                {loadingBooks ? "Loading books..." : "Select a book..."}
              </option>
              {books.map((book) => (
                <option key={book.id} value={book.title}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Image
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer bg-primary/5">
              <Upload className="h-6 w-6 text-gray-400 mb-1" />
              <span className="text-gray-500 text-sm">
                {cover ? cover.name : "Click to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </label>
            {coverImageUrl && (
              <img
                src={coverImageUrl}
                alt="Cover preview"
                className="mt-2 h-20 w-auto object-cover rounded"
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md"
            disabled={addRecommendationMutation.isPending || loadingBooks}
          >
            {addRecommendationMutation.isPending ? "Publishing..." : "Publish"}
          </Button>
        </form>
      </div>
    </div>
  );
}
