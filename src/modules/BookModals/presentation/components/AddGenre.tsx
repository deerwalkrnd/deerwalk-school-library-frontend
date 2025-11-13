"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { Upload, CircleX, X } from "lucide-react";
import { useAddGenre } from "@/modules/BookPage/application/genreUseCase";
import { useToast } from "@/core/hooks/useToast";
import { uploadMediaFile } from "@/core/services/fileUpload";

interface AddGenreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddGenreModal({ open, onOpenChange }: AddGenreModalProps) {
  const [title, setTitle] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const mutation = useAddGenre();

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
      setTitle("");
      setFile(null);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setDragActive(false);
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

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

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const updateSelectedFile = (nextFile: File | null) => {
    setFile(nextFile);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return nextFile ? URL.createObjectURL(nextFile) : null;
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        updateSelectedFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        updateSelectedFile(selectedFile);
      }
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateSelectedFile(null);
  };

  const uploadImage = (file: File) =>
    uploadMediaFile(file, { type: "BOOK_COVER" });

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        useToast("error", "Please enter a genre title.");
        return;
      }
      if (!file) {
        useToast("error", "Cover image file is required");
        return;
      }

      setIsUploading(true);
      const image_url = await uploadImage(file);
      await mutation.mutateAsync(
        { title: title.trim(), image_url: image_url },
        {
          onSuccess: () => {
            setTitle("");
            setFile(null);
            setPreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return null;
            });
            useToast("success", "Genre added successfully");
            onOpenChange(false);
          },
          onError: (error: any) => {
            useToast("error", error?.message || "Failed to add genre");
          },
        },
      );

      setTitle("");
      setFile(null);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    } catch (err: any) {
      console.error("Failed to save genre:", err?.message || err);
    } finally {
      setIsUploading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-sm shadow-lg w-127.5 mx-4 p-4 h-137 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2 id="modal-title" className="text-2xl font-semibold text-black">
              Add Genre
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-sm transition-colors absolute right-6"
              aria-label="Close modal"
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 w-107">
              <label
                htmlFor="genre-title"
                className="block text-sm font-medium text-black"
              >
                Title
              </label>
              <input
                id="genre-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter genre title..."
                className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
              />
            </div>

            <div className="space-y-2 w-107">
              <label className="block text-sm font-medium">Cover Image</label>

              <label
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-44 cursor-pointer bg-primary/5 overflow-hidden ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                htmlFor="genre-cover-input"
              >
                <input
                  id="genre-cover-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white text-xs flex flex-col items-center justify-center px-4 text-center">
                      <span className="line-clamp-2">{file?.name}</span>
                      <span className="text-[10px] mt-1">
                        Click or drop to replace
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-white/80 text-gray-700 rounded-full p-1 shadow-sm hover:bg-white"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-500 mb-2" />
                    <p className="text-xs text-[#474747] font-semibold">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </label>
            </div>

            <div className="flex gap-3 w-62.5 pt-2">
              <button
                onClick={handleSave}
                disabled={mutation.isPending || isUploading}
                className="px-4 py-2 w-30 button-border cursor-pointer text-white text-sm font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending || isUploading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => onOpenChange(false)}
                disabled={mutation.isPending || isUploading}
                className="px-4 py-2 w-30 border cursor-pointer text-gray-700 text-sm font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
