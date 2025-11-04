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

  if (!showModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: QuoteRequest = { id: quotes.id, author, quote };

    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "Quote updated successfully!");
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast("error", error?.message || "Failed to update quote");
      },
    });
  };

  return (
    <div className="fixed inset-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative bg-white rounded-sm shadow-lg w-[510px] mx-4 p-3 h-[530px] overflow-y-auto no-scrollbar",
          animationClass,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6 relative">
            <h2 id="modal-title" className="text-2xl font-semibold text-black">
              Edit Quote
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-sm transition-colors absolute right-0"
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 w-full">
              <label className="block text-sm font-medium text-black">
                Quote by
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                className="w-full px-3 py-2 item-text-area rounded-sm shadow-sm text-sm"
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="block text-sm font-medium text-black">
                Quote of the Day
              </label>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Enter quote..."
                className="w-full h-52 px-3 py-2 item-text-area rounded-sm shadow-sm text-sm resize-vertical"
              />
            </div>

            <Button
              type="submit"
              className="flex items-center justify-center w-full mt-6 text-sm leading-none tracking-tight"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update Quote"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
