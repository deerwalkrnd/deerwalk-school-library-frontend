import { useCallback, useEffect, useMemo, useState } from "react";

interface UseReturnBookFormProps {
  open: boolean;
  studentName: string;
  rollNumber: string;
  bookTitle: string;
  bookNumber?: number;
  dueDate?: string;
  remark: string;
  markAsPaidDefault: boolean;
  fineRate: number;
}

export function useReturnBookForm({
  open,
  studentName,
  rollNumber,
  bookTitle,
  bookNumber,
  dueDate,
  remark,
  markAsPaidDefault,
  fineRate,
}: UseReturnBookFormProps) {
  const [name, setName] = useState<string>(studentName);
  const [roll, setRoll] = useState<string>(rollNumber);
  const [title, setTitle] = useState<string>(bookTitle);
  const [number, setNumber] = useState<string>(
    typeof bookNumber === "number" ? String(bookNumber) : "",
  );
  const [date, setDate] = useState<string>("");
  const [remarkText, setRemarkText] = useState<string>(remark);
  const [markAsPaid, setMarkAsPaid] = useState<boolean>(markAsPaidDefault);

  useEffect(() => {
    if (!open) return;

    const today = new Date();
    const pad = (value: number) => `${value}`.padStart(2, "0");
    const defaultDate =
      dueDate ??
      `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    setDate(defaultDate);
  }, [open, dueDate]);

  useEffect(() => {
    if (!open) return;

    setName(studentName);
    setRoll(rollNumber);
    setTitle(bookTitle);
    setNumber(typeof bookNumber === "number" ? String(bookNumber) : "");
    setRemarkText(remark);
    setMarkAsPaid(markAsPaidDefault);
  }, [
    open,
    studentName,
    rollNumber,
    bookTitle,
    bookNumber,
    remark,
    markAsPaidDefault,
  ]);

  const resetForm = useCallback(() => {
    setName(studentName || "");
    setRoll(rollNumber || "");
    setTitle(bookTitle || "");
    setNumber(typeof bookNumber === "number" ? String(bookNumber) : "");
    setRemarkText(remark || "");
    setMarkAsPaid(markAsPaidDefault);
  }, [
    studentName,
    rollNumber,
    bookTitle,
    bookNumber,
    remark,
    markAsPaidDefault,
  ]);

  const overdueDays = useMemo(() => {
    if (!dueDate || !date) return 0;
    const due = new Date(dueDate);
    const selected = new Date(date);

    due.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    const diff = selected.getTime() - due.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  }, [dueDate, date]);

  const calculatedFine = useMemo(() => {
    return overdueDays * fineRate;
  }, [overdueDays, fineRate]);

  const isOverdue = useMemo(() => {
    if (!dueDate || !date) return false;
    const due = new Date(dueDate);
    const selected = new Date(date);

    due.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return selected.getTime() > due.getTime();
  }, [dueDate, date]);

  const formError = useMemo(() => {
    if (!name.trim()) return "Student name is required.";
    if (!roll.trim()) return "Roll number is required.";
    if (!title.trim()) return "Book title is required.";
    const numberValue = Number(number);
    if (!number || Number.isNaN(numberValue) || numberValue <= 0) {
      return "Book number must be a positive number.";
    }
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Return date is invalid.";

    return "";
  }, [name, roll, title, number, date]);

  return {
    state: {
      name,
      roll,
      title,
      number,
      date,
      remarkText,
      markAsPaid,
    },
    actions: {
      setName,
      setRoll,
      setTitle,
      setNumber,
      setDate,
      setRemarkText,
      setMarkAsPaid,
      resetForm,
    },
    derived: {
      overdueDays,
      calculatedFine,
      isOverdue,
      formError,
    },
  };
}
