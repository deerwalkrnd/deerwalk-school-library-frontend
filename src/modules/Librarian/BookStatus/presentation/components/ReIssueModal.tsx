"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";

interface IssueBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId?: string;
}

type IssueBookRequest = {
  book_number: string;
  renewable_times: number;
  borrowed_date: string; // ISO "YYYY-MM-DD"
  due_date: string; // ISO "YYYY-MM-DD"
  enable_fine: boolean;
  student_id?: string;
};

export function ReissueBookModal({
  open,
  onOpenChange,
  studentId,
}: IssueBookModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const [bookNumber, setBookNumber] = useState<string>("");
  const [renewableTimes, setRenewableTimes] = useState<string>("0");
  const [borrowedDate, setBorrowedDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [enableFine, setEnableFine] = useState<boolean>(false);

  //   const mutation = useIssueBook();
  const toast = useToast;

  // defaults: today for borrowed, +14 days for due
  useEffect(() => {
    if (!borrowedDate) {
      const today = new Date();
      const pad = (n: number) => `${n}`.padStart(2, "0");
      const iso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
      setBorrowedDate(iso);
    }
  }, [borrowedDate]);

  useEffect(() => {
    if (!dueDate && borrowedDate) {
      const base = new Date(borrowedDate);
      if (!Number.isNaN(base.getTime())) {
        const next = new Date(base);
        next.setDate(base.getDate() + 14);
        const pad = (n: number) => `${n}`.padStart(2, "0");
        const iso = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
        setDueDate(iso);
      }
    }
  }, [borrowedDate, dueDate]);

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
    if (!bookNumber.trim()) return "Book number is required.";
    const r = Number(renewableTimes);
    if (Number.isNaN(r) || r < 0)
      return "Renewable times must be a non-negative number.";
    const b = new Date(borrowedDate);
    const d = new Date(dueDate);
    if (Number.isNaN(b.getTime())) return "Borrowed date is invalid.";
    if (Number.isNaN(d.getTime())) return "Due date is invalid.";
    if (d < b) return "Due date cannot be earlier than the borrowed date.";
    return "";
  }, [bookNumber, renewableTimes, borrowedDate, dueDate]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formError) {
      toast("error", formError);
      return;
    }

    const payload: IssueBookRequest = {
      book_number: bookNumber.trim(),
      renewable_times: Number(renewableTimes),
      borrowed_date: borrowedDate,
      due_date: dueDate,
      enable_fine: enableFine,
      student_id: studentId,
    };

    // mutation.mutate(payload, {
    //   onSuccess: () => {
    //     resetForm();
    //     toast("success", "Book issued successfully");
    //     onOpenChange(false);
    //   },
    //   onError: (error: any) => {
    //     toast("error", error?.message ?? "Failed to issue book");
    //   },
    // });
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
                value={bookNumber}
                onChange={(e) => setBookNumber(e.target.value)}
                placeholder="Enter book number"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
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
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="borrowedDate"
                className="block text-sm font-medium text-black"
              >
                Borrowed Date
              </label>
              <input
                id="borrowedDate"
                type="date"
                value={borrowedDate}
                onChange={(e) => setBorrowedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={borrowedDate || undefined}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
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
