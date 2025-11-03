"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import { getDefaultDueDate } from "../../hooks/defaultDate";
import { BorrowRequest } from "../../../domain/entities/IssueEntity";
import { useBorrowBook } from "@/modules/BorrowReserve/application/BorrowUseCase";
import { useBorrowReservedBook } from "@/modules/BorrowReserve/application/ReserveUseCase";

interface IssueBookModalProps {
  book_id: number;
  open: boolean;
  book_copy_id: number;
  onOpenChange: (open: boolean) => void;
  studentId: string;
}

export function IssueBookModal({
  book_copy_id,
  book_id,
  open,
  onOpenChange,
  studentId,
}: IssueBookModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const [bookNumber, setBookNumber] = useState<string>("");
  const [renewableTimes, setRenewableTimes] = useState<string>("0");
  const [borrowedDate, setBorrowedDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>(getDefaultDueDate());

  const [enableFine, setEnableFine] = useState<boolean>(false);

  const borrowMutation = useBorrowBook();
  const reservationStatusMutation = useBorrowReservedBook();
  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      resetForm();
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const resetForm = () => {
    setBookNumber("");
    setRenewableTimes("0");
    setEnableFine(false);
    setBorrowedDate("");
    setDueDate("");
  };

  const formError = useMemo(() => {
    const r = Number(renewableTimes);
    if (Number.isNaN(r) || r < 0)
      return "Renewable times must be a non-negative number.";
    const d = new Date(dueDate);
    if (Number.isNaN(d.getTime())) return "Due date is invalid.";
    return "";
  }, [renewableTimes, borrowedDate, dueDate]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formError) {
      useToast("error", formError);
      return;
    }

    const payload: BorrowRequest = {
      times_renewable: Number(renewableTimes),
      due_date: dueDate,
      fine_enabled: enableFine,
      user_uuid: studentId,
    };

    borrowMutation.mutate(
      { id: book_copy_id, bookId: book_id, payload },
      {
        onSuccess: () => {
          reservationStatusMutation.mutate(book_id, {
            onSuccess: () => {
              useToast("success", "Book issued successfully");
              resetForm();
              onOpenChange(false);
            },
            onError: (error: any) => {
              useToast(
                "error",
                error?.message ?? "Failed to update reservation status",
              );
            },
          });
        },
        onError: (error: any) => {
          useToast("error", error?.message ?? "Failed to issue book");
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
            Issue Book
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
                htmlFor="bookNumber"
                className="block text-sm font-medium text-black"
              >
                Book Number
              </label>
              <input
                id="bookNumber"
                value={book_copy_id}
                onChange={(e) => setBookNumber(e.target.value)}
                placeholder="Enter book number"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>

            {/* Renewable Times */}
            <div className="space-y-2">
              <label
                htmlFor="renewableTimes"
                className="block text-sm font-medium text-black"
              >
                Set of Times Renewable
              </label>
              <input
                id="renewableTimes"
                type="number"
                min={0}
                value={renewableTimes}
                onChange={(e) => setRenewableTimes(e.target.value)}
                placeholder="e.g., 2"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={borrowedDate || undefined}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-primary/5 text-placeholder text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
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

          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              //   disabled={mutation.isPending}
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30 disabled:opacity-70"
            >
              {/* {mutation.isPending ? "Issuing..." : "Issue"} */}
              Issue
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
