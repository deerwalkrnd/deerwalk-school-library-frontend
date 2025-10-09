"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { CircleX } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

interface AddQuoteModalprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddQuoteModal({ open, onOpenChange }: AddQuoteModalprops) {
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

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

  if (!showModal) return null;

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handlePublish = () => {
    console.log("Publishing quote:", { title, quote });
    onOpenChange(false);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-sm shadow-lg w-127.5 mx-4 p-4 h-137 overflow-y-auto no-scrollbar ${animationClass} `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2 id="modal-title" className="text-2xl font-semibold text-black">
              Add Quote
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
                htmlFor="user"
                className="block text-sm font-medium text-black"
              >
                Quote by
              </label>
              <input
                id="user"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 item-text-area rounded-sm shadow-sm text-sm  resize-vertical"
              />
            </div>

            <div className="space-y-2 w-107">
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
              <div>
                <Button
                  onClick={handlePublish}
                  className={cn(
                    "flex items-center justify-center w-full mt-6",
                    "text-sm leading-none tracking-tight text-shadow-sm",
                  )}
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
