"use client";

import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import { useRenewBorrowedBook } from "../../../application/IssueBookUseCase";
import { RenewRequest } from "../../../domain/entities/IssueEntity";
import { useRenewBookForm } from "../../hooks/useRenewBookForm";

interface RenewBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  borrow_id: number;
  studentName?: string;
  bookTitle?: string;
  fineAmount: number;
  bookNumber?: number;
  renewsLeft?: number;
  currentDueDate?: string;

  // Dropdown options for Book Title (Implement only if you're isolating this feature)
  bookOptions?: Array<{ value: string; label: string }>;
}

export function RenewBookModal({
  open,
  onOpenChange,
  studentName = "",
  bookTitle = "",
  bookNumber,
  borrow_id,
  renewsLeft = 0,
  currentDueDate,
  fineAmount,
  bookOptions: _bookOptions = [],
}: RenewBookModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const {
    state: { name, title, number, newReturnDate, enableFine },
    actions: {
      setName,
      setTitle,
      setNumber,
      setNewReturnDate,
      setEnableFine,
      resetForm,
    },
    derived: { formError },
  } = useRenewBookForm({
    open,
    studentName,
    bookTitle,
    bookNumber,
    currentDueDate,
    renewsLeft,
  });

  const mutation = useRenewBorrowedBook();
  const toast = useToast;

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

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formError) {
      toast("error", formError);
      return;
    }

    const payload: RenewRequest = {
      new_due_date: newReturnDate,
      fine_collected: fineAmount,
    };

    console.log("submitting payload : ", payload);
    mutation.mutate(
      { id: borrow_id, payload },
      {
        onSuccess: () => {
          toast("success", "Book renewed successfully");
          resetForm();
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast("error", error?.message ?? "Failed to renew book");
        },
      },
    );
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            Renew Book
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 absolute right-6 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 w-210">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="studentName"
                className="block text-sm font-medium text-black"
              >
                Student Name
              </label>
              <input
                id="studentName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bookTitle"
                className="block text-sm font-medium text-black"
              >
                Book Title
              </label>
              <input
                id="bookTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter student name"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="bookNumber"
                className="block text-sm font-medium text-black"
              >
                Book Number
              </label>
              <input
                id="bookNumber"
                type="number"
                min={1}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter book number"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newReturnDate"
                className="block text-sm font-medium text-black"
              >
                New Return Date
              </label>
              <input
                id="newReturnDate"
                type="date"
                value={newReturnDate}
                onChange={(e) => setNewReturnDate(e.target.value)}
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm font-medium text-black">
              <span className="px-3 py-1 border border-gray-300 rounded-sm bg-primary/5">
                Renews left: {renewsLeft}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="enableFine"
                type="checkbox"
                checked={enableFine}
                onChange={(e) => setEnableFine(e.target.checked)}
                className="h-4 w-4"
              />
              <label
                htmlFor="enableFine"
                className="text-sm font-medium text-black"
              >
                Enable Fine
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              disabled={mutation.isPending || renewsLeft <= 0}
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-36 whitespace-nowrap disabled:opacity-70"
            >
              {mutation.isPending ? "Processing..." : "Renew Book"}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm cursor-pointer text-sm font-semibold text-black bg-white w-36"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
