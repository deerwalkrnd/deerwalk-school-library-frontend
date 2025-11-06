import { ColumnDef } from "@tanstack/react-table";
import { IRecentlyIssuedBooks } from "../../../domain/entities/IRecentlyIssuedBooks";

const RecentlyIssuedBooksColumns: ColumnDef<IRecentlyIssuedBooks>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "user.name",
    header: "Student Name",
  },
  {
    accessorKey: "book_copy.book.title",
    header: "Book",
  },
  {
    accessorKey: "book_copy.book.isbn",
    header: "ISBN",
  },
  {
    accessorKey: "due",
    header: "Return Date",
    cell: ({ row }) => {
      const data = new Date(row.original.due);
      return <div>{data.toLocaleDateString()}</div>;
    },
  },
];

export default RecentlyIssuedBooksColumns;
