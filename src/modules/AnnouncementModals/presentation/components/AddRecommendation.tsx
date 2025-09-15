"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { Upload, CircleX } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

interface AddRecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRecommendationModal({
  open,
  onOpenChange,
}: AddRecommendationModalProps) {
  const [isVisible, setIsVisible] = useState(open);
  const [animation, setAnimation] = useState<"in" | "out" | null>(null);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [note, setNote] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [cover, setCover] = useState<File | null>(null);

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

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCover(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, designation, note, bookTitle, cover });
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
          Add Recommendation
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
            <label className="block text-sm font-medium mb-2">Book Title</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="A wonder title of a book..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Image
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer hover:bg-gray-50">
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
