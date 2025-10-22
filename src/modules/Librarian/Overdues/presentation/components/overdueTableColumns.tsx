import type { ColumnDef } from "@tanstack/react-table";

export interface OverDues {
  id: number;
  studentName: string;
  bookTitle: string;
  author: string;
  bookNumber: string;
  isbn: string;
  borrowedDate: string;
  returnDate: string;
  overdueDays: number;
  fineAmount: number;
}

export const overdueColumns: ColumnDef<OverDues>[] = [
  {
    header: "S.N.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "bookTitle",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "bookNumber",
    header: "Book Number",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "borrowedDate",
    header: "Borrowed Date",
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
  },
  {
    accessorKey: "overdueDays",
    header: "Overdue Days",
  },
  {
    accessorKey: "fineAmount",
    header: "Fine Amount",
  },
];
