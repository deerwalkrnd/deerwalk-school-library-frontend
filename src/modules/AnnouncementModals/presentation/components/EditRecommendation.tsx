"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { CircleX } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

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
  const [isVisible, setIsVisible] = useState(open);
  const [animation, setAnimation] = useState<"in" | "out" | null>(null);

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
      setIsVisible(true);
      setAnimation("in");
    } else if (isVisible) {
      setAnimation("out");
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (animation === "out") {
      setIsVisible(false);
    }
    setAnimation(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, designation, note, title, author, publication, isbn });
    onOpenChange(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
        animation === "in" && "animate-fadeIn",
        animation === "out" && "animate-fadeOut",
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative",
          animation === "in" && "animate-slideIn",
          animation === "out" && "animate-slideOut",
        )}
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
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
              className="w-full border rounded-md px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Publication"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
