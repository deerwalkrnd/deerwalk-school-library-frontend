"use client";

import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import { useReturnBook } from "../../../application/IssueBookUseCase";
import { ReturnRequest } from "../../../domain/entities/IssueEntity";
import { useReturnBookForm } from "../../hooks/useReturnBookForm";

interface ReturnBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  studentName?: string;
  rollNumber?: string;
  bookTitle?: string;
  bookNumber?: number;
  returnDate?: string;
  fine_rate: number;
  remark?: string;
  fineAmount?: number;
  markAsPaidDefault?: boolean;
  borrow_id: number;

  //Implement only if this feature is being isolated.
  bookOptions?: Array<{ value: string; label: string }>;
}

export function ReturnBookModal({
  open,
  onOpenChange,
  studentName = "",
  rollNumber = "",
  bookTitle = "",
  bookNumber,
  returnDate: dueDate,
  fine_rate,
  remark = "",
  borrow_id,
  fineAmount = 0,
  markAsPaidDefault = false,
  bookOptions = [],
}: ReturnBookModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const {
    state: { name, roll, number, date, remarkText, markAsPaid },
    actions: {
      setName,
      setRoll,
      setNumber,
      setDate,
      setRemarkText,
      setMarkAsPaid,
      resetForm,
    },
    derived: { overdueDays, calculatedFine, isOverdue, formError },
  } = useReturnBookForm({
    open,
    studentName,
    rollNumber,
    bookTitle,
    bookNumber,
    dueDate,
    remark,
    markAsPaidDefault,
    fineRate: fine_rate,
  });

  const mutation = useReturnBook();
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

    const payload: ReturnRequest = {
      returned_date: date,
      remark: remarkText?.trim() || "",
      fine_paid: markAsPaid,
    };
    console.log("Submitting payload ", payload);
    mutation.mutate(
      { id: borrow_id, payload },
      {
        onSuccess: () => {
          toast("success", "Book returned successfully");
          resetForm();
          onOpenChange(false);
        },
        onError: (error: any) => {
          toast("error", error?.message ?? "Failed to return book");
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
            Return Book
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
          <div className="grid grid-cols-3 gap-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rollNumber"
                className="block text-sm font-medium text-black"
              >
                Roll Number
              </label>
              <input
                id="rollNumber"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="Enter roll number"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
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
                value={bookTitle}
                disabled
                placeholder="Enter roll number"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
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
                disabled
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter book number"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-black"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate ? dueDate.split("T")[0] : ""}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="returnDate"
                className="block text-sm font-medium text-black"
              >
                Return Date
              </label>
              <input
                id="returnDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="remark"
              className="block text-sm font-medium text-black"
            >
              Remark
            </label>
            <textarea
              id="remark"
              rows={3}
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
              placeholder="Enter remark (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium resize-y"
            />
          </div>
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-black">
                Fine Amount:
              </span>
              <span
                className={`px-3 py-1 border border-gray-300 rounded-sm font-medium min-w-[90px] text-center ${
                  calculatedFine > 0 ? "text-red-700 " : ""
                }`}
              >
                Rs. {calculatedFine.toFixed(2)}
              </span>

              {isOverdue && (
                <span className="text-sm text-red-600 font-medium">
                  ({overdueDays} {overdueDays === 1 ? "day" : "days"} overdue)
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              id="markAsPaid"
              type="checkbox"
              checked={markAsPaid}
              onChange={(e) => setMarkAsPaid(e.target.checked)}
              className="h-4 w-4"
            />
            <label
              htmlFor="markAsPaid"
              className="text-sm font-medium text-black"
            >
              Mark as paid
            </label>
          </div>
          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer whitespace-nowrap disabled:opacity-70"
            >
              {mutation.isPending ? "Processing..." : "Return Book"}
            </button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-semibold text-black bg-white whitespace-nowrap"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
