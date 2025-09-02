import { type NextRequest, NextResponse } from "next/server";
import type {
  BookData,
  BooksResponse,
} from "@/modules/AllBooks/domain/entities/allBooksEntity";

const mockBooks: BookData[] = [
  {
    id: "1",
    title: "Mathematics: A Comprehensive Approach",
    author: "Dr. Emily Johnson",
    imageUrl: "",
    genre: "mathematics",
    publishedYear: 2023,
    description: "A comprehensive guide to advanced mathematics concepts.",
  },
  {
    id: "2",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    imageUrl: "",
    genre: "fiction",
    publishedYear: 1954,
    description: "Epic fantasy adventure in Middle-earth.",
  },
  {
    id: "3",
    title: "Life in Science",
    author: "Dr. Sarah Wilson",
    genre: "science",
    publishedYear: 2022,
    description: "Exploring the wonders of scientific discovery.",
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "4",
    title: "Design of Books",
    author: "Creative Studio",
    genre: "non-fiction",
    publishedYear: 2021,
    description: "The art and craft of book design.",
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "5",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "fiction",
    publishedYear: 1997,
    description: "The magical journey begins.",
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "6",
    title: "The Fault in Our Stars",
    author: "John Green",
    genre: "fiction",
    publishedYear: 2012,
    description: "A touching story of love and loss.",
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "7",
    title: "Good Omens",
    author: "Terry Pratchett & Neil Gaiman",
    genre: "fiction",
    publishedYear: 1990,
    description: "A humorous take on the apocalypse.",
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "8",
    title: "The Story of a Journey",
    author: "Adventure Writer",
    genre: "biography",
    publishedYear: 2020,
    description: "An inspiring tale of personal growth.",
    imageUrl: "/placeholder.svg?height=300&width=200",
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 9}`,
    title: `Sample Book ${i + 9}`,
    author: `Author ${i + 9}`,
    genre: ["fiction", "science", "mathematics", "history"][i % 4],
    publishedYear: 2020 + (i % 4),
    description: `Description for sample book ${i + 9}.`,
    imageUrl: `/placeholder.svg?height=300&width=200&query=sample book ${i + 9} cover`,
  })),
];

export async function GET(request: NextRequest) {
  try {
    const allBooks: BookData[] = mockBooks;
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "8");
    const search = searchParams.get("search") || "";
    const genre = searchParams.get("genre") || "";
    const sortBy = searchParams.get("sortBy") || "title";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    const filteredBooks = allBooks.filter((book) => {
      const matchesSearch =
        !search ||
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesGenre = !genre || book.genre === genre;
      return matchesSearch && matchesGenre;
    });

    filteredBooks.sort((a, b) => {
      let aValue: any = a[sortBy as keyof BookData];
      let bValue: any = b[sortBy as keyof BookData];
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
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

    const totalCount = filteredBooks.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    const responseData: BooksResponse = {
      books: paginatedBooks,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { message: "Failed to fetch books" },
      { status: 500 },
    );
  }
}
