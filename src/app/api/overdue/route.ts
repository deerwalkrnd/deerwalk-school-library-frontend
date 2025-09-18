import { type NextRequest, NextResponse } from "next/server";
import {
  OverDues,
  OverdueResponse,
} from "@/modules/Overdues/domain/entities/overdueModal";

export const mockOverdues: OverDues[] = [
  {
    id: 1,
    studentName: "Aashutosh Pudasaini",
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    bookNumber: "dss_231",
    isbn: "202842525279",
    borrowedDate: "2025-06-01",
    returnDate: "2025-06-05",
    overdueDays: 2,
    fineAmount: 20,
  },
  {
    id: 2,
    studentName: "Krish Bir Jung Rana",
    bookTitle: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    bookNumber: "dss_232",
    isbn: "202842525280",
    borrowedDate: "2025-06-03",
    returnDate: "2025-06-07",
    overdueDays: 5,
    fineAmount: 50,
  },
  {
    id: 3,
    studentName: "Ramesh Shrestha",
    bookTitle: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    bookNumber: "dss_233",
    isbn: "202842525281",
    borrowedDate: "2025-06-04",
    returnDate: "2025-06-09",
    overdueDays: 3,
    fineAmount: 30,
  },
  {
    id: 4,
    studentName: "Sita Adhikari",
    bookTitle: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    bookNumber: "dss_234",
    isbn: "202842525282",
    borrowedDate: "2025-06-05",
    returnDate: "2025-06-10",
    overdueDays: 7,
    fineAmount: 70,
  },
  {
    id: 5,
    studentName: "Bikash Thapa",
    bookTitle: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    bookNumber: "dss_235",
    isbn: "202842525283",
    borrowedDate: "2025-06-06",
    returnDate: "2025-06-11",
    overdueDays: 4,
    fineAmount: 40,
  },
  {
    id: 6,
    studentName: "Anjali Koirala",
    bookTitle: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    bookNumber: "dss_236",
    isbn: "202842525284",
    borrowedDate: "2025-06-07",
    returnDate: "2025-06-12",
    overdueDays: 6,
    fineAmount: 60,
  },
  {
    id: 7,
    studentName: " Pudasaini",
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    bookNumber: "dss_231",
    isbn: "202842525279",
    borrowedDate: "2025-06-01",
    returnDate: "2025-06-05",
    overdueDays: 2,
    fineAmount: 20,
  },
  {
    id: 9,
    studentName: "Krish Bir Jung Rana",
    bookTitle: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    bookNumber: "dss_232",
    isbn: "202842525280",
    borrowedDate: "2025-06-03",
    returnDate: "2025-06-07",
    overdueDays: 5,
    fineAmount: 50,
  },
  {
    id: 9,
    studentName: "Ramesh Shrestha",
    bookTitle: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    bookNumber: "dss_233",
    isbn: "202842525281",
    borrowedDate: "2025-06-04",
    returnDate: "2025-06-09",
    overdueDays: 3,
    fineAmount: 30,
  },
  {
    id: 10,
    studentName: "Sita Adhikari",
    bookTitle: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    bookNumber: "dss_234",
    isbn: "202842525282",
    borrowedDate: "2025-06-05",
    returnDate: "2025-06-10",
    overdueDays: 7,
    fineAmount: 70,
  },
  {
    id: 11,
    studentName: "Bikash Thapa",
    bookTitle: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
    bookNumber: "dss_235",
    isbn: "202842525283",
    borrowedDate: "2025-06-06",
    returnDate: "2025-06-11",
    overdueDays: 4,
    fineAmount: 40,
  },
  {
    id: 12,
    studentName: "Anjali Koirala",
    bookTitle: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
    bookNumber: "dss_236",
    isbn: "202842525284",
    borrowedDate: "2025-06-07",
    returnDate: "2025-06-12",
    overdueDays: 6,
    fineAmount: 60,
  },
];

export async function GET(request: NextRequest) {
  try {
    const allOverdues: OverDues[] = mockOverdues;
    const { searchParams } = new URL(request.url);

    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "6");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "studentName";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    // Filtering
    const filteredOverdues = allOverdues.filter((overdue) => {
      const matchesSearch =
        !search ||
        overdue.studentName.toLowerCase().includes(search.toLowerCase()) ||
        overdue.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
        overdue.author.toLowerCase().includes(search.toLowerCase()) ||
        overdue.isbn.toLowerCase().includes(search.toLowerCase()) ||
        overdue.bookNumber.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });

    if (allOverdues.length > 0 && sortBy in allOverdues[0]) {
      filteredOverdues.sort((a, b) => {
        let aValue: any = a[sortBy as keyof OverDues];
        let bValue: any = b[sortBy as keyof OverDues];

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue === undefined || bValue === undefined) return 0;

        return sortOrder === "desc"
          ? aValue > bValue
            ? -1
            : aValue < bValue
              ? 1
              : 0
          : aValue < bValue
            ? -1
            : aValue > bValue
              ? 1
              : 0;
      });
    }
    // Pagination
    const totalCount = filteredOverdues.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOverdues = filteredOverdues.slice(startIndex, endIndex);

    const responseData: OverdueResponse = {
      overdues: paginatedOverdues,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Failed to fetch overdues:", error);
    return NextResponse.json(
      { message: "Failed to fetch overdues" },
      { status: 500 },
    );
  }
}
