"use client";
import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { deleteEvent } from "../../application/eventUseCase";
import { useToast } from "@/core/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteModalProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteModal({ id, open, onOpenChange }: DeleteModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const queryClient = useQueryClient();

  const mutation = deleteEvent(queryClient);

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

  if (!showModal) return null;

  const handleDelete = () => {
    mutation.mutate(id, {
      onSuccess: () => {
        useToast("success", "Quote deleted successfully");
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast("error", error.message);
      },
    });
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50 w-102.5 h-51.75"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-lg shadow-lg mx-4 p-10 animate-slide-down ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 id="modal-title" className="text-2xl font-semibold ">
            Remove quote?
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-md"
            aria-label="Close modal"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-sm font-medium text-black">
            Do you really want to remove this quote? This action cannot be
            undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-[#FB3C3C] button-redborder w-30 text-white text-sm font-semibold rounded-md "
            >
              Remove
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 w-30 text-sm font-semibold rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
