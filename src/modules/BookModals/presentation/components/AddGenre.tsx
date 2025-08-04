"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { Upload, CircleX } from "lucide-react";

interface AddGenreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddGenreModal({ open, onOpenChange }: AddGenreModalProps) {
  const [title, setTitle] = useState("");
  const [dragActive, setDragActive] = useState(false);

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
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log("Saving genre:", title);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className="relative bg-white rounded-sm shadow-lg  w-127.5 mx-4 p-4 h-137 overflow-y-auto no-scrollbar"
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
                className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
              />
            </div>

            <div className="space-y-2 w-107">
              <label className="block text-sm font-medium">Cover Image</label>
              <div
                className={`relative border-2  rounded-lg p-20 text-center bg-[#EA5D0E0D] cursor-pointer${
                  dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-6 w-6  mb-2" />
                <p className="text-xs text-[#474747] font-semibold">
                  Click to upload
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-62.5 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 w-30 button-border text-white text-sm font-medium rounded-sm"
              >
                Save
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 w-30 border text-gray-700 text-sm font-medium rounded-sm"
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
