"use client";

import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { QuoteRequest, Quotes } from "../../domain/entities/QuoteEntity";
import { useUpdateQuote } from "../../application/quoteUseCase";

interface EditQuoteModalProps {
  quotes: Quotes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditQuoteModal({
  quotes,
  open,
  onOpenChange,
}: EditQuoteModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");

  const mutation = useUpdateQuote();
  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";

      if (quotes) {
        setAuthor(quotes.author ?? "");
        setQuote(quotes.quote ?? "");
      }
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [open, quotes]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  if (!showModal) return null;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: QuoteRequest = {
      id: quotes.id,
      author,
      quote,
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "Quote updated successfully");
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast("error", error.message || "Failed to update quote");
      },
    });
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-lg shadow-xl w-127.5 mx-4 p-4 h-auto overflow-y-auto no-scrollbar ${animationClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 id="modal-title" className="text-2xl font-semibold text-black">
            Edit Quote
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 text-gray-400 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 w-full">
          <div className="space-y-2">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-black"
            >
              Quote by
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quote"
              className="block text-sm font-medium text-black"
            >
              Quote of the Day
            </label>
            <textarea
              id="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Enter quote text..."
              className="w-full h-52 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 resize-vertical"
            />
          </div>

          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-36"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update Quote"}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-semibold text-black bg-white w-30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
