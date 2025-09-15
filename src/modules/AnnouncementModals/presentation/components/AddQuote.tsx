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
  const [animationClass, setAnimationClass] = useState("");
  const [showModal, setShowModal] = useState(open);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (open) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setAnimationClass("animate-slide_down");
      });
      return () => clearTimeout(timer);
    } else {
      setAnimationClass("animate-slide-up");
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300);
      return () => clearTimeout(timer);
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
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
        className={`relative bg-white rounded-sm shadow-lg  w-127.5 mx-4 p-4 h-137 overflow-y-auto no-scrollbar ${animationClass} `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal title"
        onClick={(e) => e.stopPropagation()}
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
              <label className="block text-sm font-medium">
                Quote of the Day
              </label>
              <div className="w-full h-52 px-3 py-2 item-text-area rounded-sm shadow-sm text-sm  resize-vertical">
                <input
                  id="quote-input"
                  type="text"
                  placeholder="This is a wonderful quote..."
                  className="absolute inset-0 w-full h-52 opacity-0 cursor-pointer"
                />
              </div>
              <div>
                <Button
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
