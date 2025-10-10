"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";

interface ReturnBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  // Prefill/context (optional)
  studentName?: string;
  rollNumber?: string;
  bookTitle?: string;
  bookNumber?: number;
  returnDate?: string; // ISO "YYYY-MM-DD"
  remark?: string;
  fineAmount?: number; // display-only
  markAsPaidDefault?: boolean;

  // Dropdown options
  bookOptions?: Array<{ value: string; label: string }>;
}

type ReturnBookRequest = {
  student_name: string;
  roll_number: string;
  book_title: string;
  book_number: number;
  return_date: string; // ISO
  remark?: string;
  mark_as_paid: boolean;
};

export function ReturnBookModal({
  open,
  onOpenChange,
  studentName = "",
  rollNumber = "",
  bookTitle = "",
  bookNumber,
  returnDate,
  remark = "",
  fineAmount = 0,
  markAsPaidDefault = false,
  bookOptions = [],
}: ReturnBookModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  // form fields
  const [name, setName] = useState<string>(studentName);
  const [roll, setRoll] = useState<string>(rollNumber);
  const [title, setTitle] = useState<string>(bookTitle);
  const [number, setNumber] = useState<string>(
    typeof bookNumber === "number" ? String(bookNumber) : "",
  );
  const [date, setDate] = useState<string>("");
  const [remarkText, setRemarkText] = useState<string>(remark);
  const [markAsPaid, setMarkAsPaid] = useState<boolean>(markAsPaidDefault);

  //   const mutation = useReturnBook();
  const toast = useToast;

  // Seed today as default return date if not provided
  useEffect(() => {
    if (open) {
      const today = new Date();
      const pad = (n: number) => `${n}`.padStart(2, "0");
      const iso =
        returnDate ??
        `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
      setDate(iso);
    }
  }, [open, returnDate]);

  // Open/close animation + body scroll lock
  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
      // refresh from props when opening
      setName(studentName);
      setRoll(rollNumber);
      setTitle(bookTitle);
      setNumber(typeof bookNumber === "number" ? String(bookNumber) : "");
      setRemarkText(remark);
      setMarkAsPaid(markAsPaidDefault);
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [
    open,
    studentName,
    rollNumber,
    bookTitle,
    bookNumber,
    remark,
    markAsPaidDefault,
  ]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const formError = useMemo(() => {
    if (!name.trim()) return "Student name is required.";
    if (!roll.trim()) return "Roll number is required.";
    if (!title.trim()) return "Book title is required.";
    const n = Number(number);
    if (!number || Number.isNaN(n) || n <= 0)
      return "Book number must be a positive number.";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "Return date is invalid.";
    return "";
  }, [name, roll, title, number, date]);

  if (!showModal) return null;

  const resetForm = () => {
    setName(studentName || "");
    setRoll(rollNumber || "");
    setTitle(bookTitle || "");
    setNumber(typeof bookNumber === "number" ? String(bookNumber) : "");
    setRemarkText(remark || "");
    setMarkAsPaid(markAsPaidDefault);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formError) {
      toast("error", formError);
      return;
    }

    const payload: ReturnBookRequest = {
      student_name: name.trim(),
      roll_number: roll.trim(),
      book_title: title.trim(),
      book_number: Number(number),
      return_date: date,
      remark: remarkText?.trim() || undefined,
      mark_as_paid: markAsPaid,
    };

    // mutation.mutate(payload, {
    //   onSuccess: () => {
    //     toast("success", "Book returned successfully");
    //     resetForm();
    //     onOpenChange(false);
    //   },
    //   onError: (error: any) => {
    //     toast("error", error?.message ?? "Failed to return book");
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
          {/* Row 1: Student Name, Roll Number, Book Title */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bookTitle"
                className="block text-sm font-medium text-black"
              >
                Book Title
              </label>
              <select
                id="bookTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              >
                <option value="">Select book</option>
                {bookOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Book Number, Return Date */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>

          {/* Row 3: Remark */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] resize-y"
            />
          </div>

          {/* Row 4: Fine Amount (display only) */}
          <div className="pt-2">
            <span className="text-sm font-medium text-black">
              Fine Amount:{" "}
            </span>
            <span className="px-3 py-1 border border-gray-300 rounded-sm bg-[#EA5D0E0D]">
              {Number.isFinite(fineAmount)
                ? `₹ ${fineAmount.toFixed(2)}`
                : "₹ 0.00"}
            </span>
          </div>

          {/* Row 5: Mark as Paid */}
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

          {/* Actions */}
          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              //   disabled={mutation.isPending}
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30 disabled:opacity-70"
            >
              {/* {mutation.isPending ? "Processing..." : "Return Book"} */}
              Return Book
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
