"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { CircleX } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";

interface EditRecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    name: string;
    designation: string;
    note: string;
    title: string;
    author: string;
    publication: string;
    isbn: string;
  };
}

export function EditRecommendationModal({
  open,
  onOpenChange,
  initialData,
}: EditRecommendationModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [designation, setDesignation] = useState(
    initialData?.designation || "",
  );
  const [note, setNote] = useState(initialData?.note || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [publication, setPublication] = useState(
    initialData?.publication || "",
  );
  const [isbn, setIsbn] = useState(initialData?.isbn || "");

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
    if (!open) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, designation, note, title, author, publication, isbn });
    onOpenChange(false);
  };

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
          Edit Recommendation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Recommender’s Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
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
              className="w-140 px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
              placeholder="Designation (Ex: Principal)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Recommender’s Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373] resize-vertical"
              placeholder="Your note..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Add Book</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
                placeholder="Author"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Publication
            </label>
            <input
              type="text"
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
              placeholder="Publication"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
              placeholder="ISBN"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md"
          >
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
}
