"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ITopBooksBorrowed } from "../../../domain/entities/ITopBooksBorrowed";

const TopBooksBorrowedColumns: ColumnDef<ITopBooksBorrowed>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
];

export default TopBooksBorrowedColumns;
