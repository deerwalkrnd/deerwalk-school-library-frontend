"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { Upload, CircleX, X } from "lucide-react";
import { useAddGenre } from "@/modules/BookPage/application/genreUseCase";
import { useToast } from "@/core/hooks/useToast";

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
      setPreviewUrl(null);
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
        setFile(droppedFile);
        setPreviewUrl(URL.createObjectURL(droppedFile));
        console.log("File dropped:", droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        console.log("File selected:", selectedFile);
      }
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };

  async function uploadImage(file: File): Promise<string> {
    // const fd = new FormData();
    // fd.append("file", file);
    // console.log("submitting file first");
    // const res = await fetch(`/api/upload?type=BOOK_COVER`, {
    //   method: "POST",
    //   body: fd,
    // });
    // if (!res.ok) {
    //   const msg = await res.text();
    //   throw new Error(`Upload failed: ${res.status} ${msg}`);
    // }
    // const { url } = await res.json();
    let url =
      "https://unsplash.com/photos/a-person-with-elaborate-beaded-dreadlocks-and-a-wide-smile-n0VYjRD6_eI";
    return url;
  }

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        console.warn("Title is required");
        return;
      }
      if (!file) {
        console.warn("Cover image file is required");
        return;
      }

      const image_url = await uploadImage(file);

      await mutation.mutateAsync(
        { title: title.trim(), image_url },
        {
          onSuccess: () => {
            setTitle("");
            setFile(null);
            setPreviewUrl(null);
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
      setPreviewUrl(null);
    } catch (err: any) {
      console.error("Failed to save genre:", err?.message || err);
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

              {!file ? (
                <div
                  className={`relative border-2 rounded-lg p-20 text-center bg-primary/5 cursor-pointer ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="pointer-events-none">
                    <Upload className="mx-auto h-6 w-6 mb-2" />
                    <p className="text-xs text-[#474747] font-semibold">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative border-2 border-gray-300 rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center gap-4">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 w-62.5 pt-2">
              <button
                onClick={handleSave}
                disabled={mutation.isPending}
                className="px-4 py-2 w-30 button-border text-white text-sm font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => onOpenChange(false)}
                disabled={mutation.isPending}
                className="px-4 py-2 w-30 border text-gray-700 text-sm font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
