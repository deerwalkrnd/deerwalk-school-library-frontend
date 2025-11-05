import { useCallback, useEffect, useMemo, useState } from "react";

interface UseRenewBookFormProps {
  open: boolean;
  studentName: string;
  bookTitle: string;
  bookNumber?: number;
  currentDueDate?: string;
  renewsLeft: number;
}

export function useRenewBookForm({
  open,
  studentName,
  bookTitle,
  bookNumber,
  currentDueDate,
  renewsLeft,
}: UseRenewBookFormProps) {
  const [name, setName] = useState<string>(studentName);
  const [title, setTitle] = useState<string>(bookTitle);
  const [number, setNumber] = useState<string>(
    typeof bookNumber === "number" ? String(bookNumber) : "",
  );
  const [newReturnDate, setNewReturnDate] = useState<string>("");
  const [enableFine, setEnableFine] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;

    const baseDate = currentDueDate ? new Date(currentDueDate) : new Date();
    if (Number.isNaN(baseDate.getTime())) return;

    const next = new Date(baseDate);
    next.setDate(baseDate.getDate() + 14);
    const pad = (value: number) => `${value}`.padStart(2, "0");
    const formatted = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
    setNewReturnDate(formatted);
  }, [open, currentDueDate]);

  useEffect(() => {
    if (!open) return;

    setName(studentName);
    setTitle(bookTitle);
    setNumber(typeof bookNumber === "number" ? String(bookNumber) : "");
    setEnableFine(false);
  }, [open, studentName, bookTitle, bookNumber]);

  const resetForm = useCallback(() => {
    setName(studentName || "");
    setTitle(bookTitle || "");
    setNumber(typeof bookNumber === "number" ? String(bookNumber) : "");
    setEnableFine(false);
  }, [studentName, bookTitle, bookNumber]);

  const formError = useMemo(() => {
    if (!name.trim()) return "Student name is required.";
    if (!title.trim()) return "Book title is required.";

    const parsedNumber = Number(number);
    if (!number || Number.isNaN(parsedNumber) || parsedNumber <= 0) {
      return "Book number must be a positive number.";
    }

    const parsedDate = new Date(newReturnDate);
    if (Number.isNaN(parsedDate.getTime()))
      return "New return date is invalid.";

    if (renewsLeft <= 0) return "No renewals remaining for this book.";

    return "";
  }, [name, title, number, newReturnDate, renewsLeft]);

  return {
    state: {
      name,
      title,
      number,
      newReturnDate,
      enableFine,
    },
    actions: {
      setName,
      setTitle,
      setNumber,
      setNewReturnDate,
      setEnableFine,
      resetForm,
    },
    derived: {
      formError,
    },
  };
}
