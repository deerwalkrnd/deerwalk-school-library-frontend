"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { CircleX } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { QuoteRequest } from "../../domain/entities/QuoteEntity";
import { useAddQuote } from "../../application/quoteUseCase";
import { useToast } from "@/core/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

interface AddQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quoteCount?: number;
}

export function AddQuoteModal({
  open,
  onOpenChange,
  quoteCount = 0,
}: AddQuoteModalProps) {
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const mutation = useAddQuote();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      setQuote("");
      setAuthor("");
      document.body.style.overflow = "unset";
    }
  }, [open]);

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

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      useToast("error", "Please fill in both fields.");
      return;
    }

    const payload: QuoteRequest = { author, quote };

    mutation.mutate(payload, {
      onSuccess: () => {
        setQuote("");
        setAuthor("");
        useToast("success", "Quote added successfully!");
        queryClient.invalidateQueries({ queryKey: ["quotes"] });
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast(
          "error",
          error?.response?.data?.message || "Failed to add quote",
        );
      },
    });
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative bg-white rounded-sm shadow-lg w-[510px] mx-4 p-4 h-[550px] overflow-y-auto no-scrollbar",
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
              Add Quote
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-sm transition-colors absolute right-0"
              aria-label="Close modal"
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-medium">S.N.:</span> {quoteCount + 1}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 w-full">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-black"
              >
                Quote by
              </label>
              <input
                id="user"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                className="w-full px-3 py-2 item-text-area rounded-sm shadow-sm text-sm"
              />
            </div>

            <div className="space-y-2 w-full">
              <label
                htmlFor="quote-input"
                className="block text-sm font-medium"
              >
                Quote of the Day
              </label>
              <textarea
                id="quote-input"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="This is a wonderful quote..."
                className="w-full h-52 px-3 py-2 item-text-area rounded-sm shadow-sm text-sm resize-vertical"
              />
            </div>

            <Button
              type="submit"
              className={cn(
                "flex items-center justify-center w-full mt-6 text-sm leading-none tracking-tight",
              )}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Publish"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
