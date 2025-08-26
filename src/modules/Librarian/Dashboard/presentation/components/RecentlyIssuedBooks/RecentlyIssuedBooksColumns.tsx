import { ColumnDef } from "@tanstack/react-table";
import { IRecentlyIssuedBooks } from "../../../domain/entities/IRecentlyIssuedBooks";

const RecentlyIssuedBooksColumns: ColumnDef<IRecentlyIssuedBooks>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "book",
    header: "Book",
  },
  {
    accessorKey: "book_number",
    header: "Book Number",
  },
  {
    accessorKey: "borrowed_date",
    header: "Borrowed Date",
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
  },
];

export default RecentlyIssuedBooksColumns;
