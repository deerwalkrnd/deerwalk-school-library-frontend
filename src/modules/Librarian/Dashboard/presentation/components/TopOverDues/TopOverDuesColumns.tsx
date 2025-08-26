"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TopOverDues } from "../../../domain/entities/TopOverdues";

const TopOverDuesColumns: ColumnDef<TopOverDues>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "overdue_days",
    header: "Overdue Days",
  },
  {
    accessorKey: "borrowed_date",
    header: "Borrowed Date",
  },
];

export default TopOverDuesColumns;
