import { getHeader } from "@/core/lib/utils";
import { IIssueBookColumns } from "@/modules/Librarian/BookStatus/domain/entities/IIssueBookColumns";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // try {
  //   const { searchParams } = new URL(request.url);
  //   const page = searchParams.get("page") || "1";
  //   const limit = searchParams.get("limit") || "10";

  //   const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/`);
  //   backendUrl.searchParams.append("sort_by", "created_at");
  //   backendUrl.searchParams.append("page", page);
  //   backendUrl.searchParams.append("limit", limit);

  //   let authHeader = getHeader(request);
  //   const response = await fetch(backendUrl, {
  //     method: "GET",
  //     headers: {
  //       Authorization: authHeader || "",
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status ${response.status}`);
  //   }

  //   const data = await response.json();
  //   return NextResponse.json(data);
  // } catch (error) {
  //   return NextResponse.json(
  //     {
  //       message: "Failed to fetch issues",
  //     },
  //     {
  //       status: 500,
  //     }
  //   );
  // }

  const items: IIssueBookColumns[] = [
    {
      id: "0",
      book_title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publication: "Charles Scribner's Sons",
      student_name: "Aarav Shrestha",
      type: "REFERENCE",
      class: "10A",
      borrowed_date: "2025-10-02",
    },
    {
      id: "1",
      book_title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publication: "J.B. Lippincott & Co.",
      student_name: "Sita Karki",
      type: "ISSUE",
      class: "9B",
      borrowed_date: "2025-09-25",
    },
    {
      id: "2",
      book_title: "1984",
      author: "George Orwell",
      publication: "Secker & Warburg",
      student_name: "Ramesh Thapa",
      type: "REFERENCE",
      class: "11C",
      borrowed_date: "2025-10-05",
    },
    {
      id: "3",
      book_title: "The Alchemist",
      author: "Paulo Coelho",
      publication: "HarperCollins",
      student_name: "Mina Gurung",
      type: "ISSUE",
      class: "12A",
      borrowed_date: "2025-10-05",
    },
    {
      id: "4",
      book_title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      publication: "",
      student_name: "Bikash Lama",
      type: "REFERENCE",
      class: "11B",
      borrowed_date: "2025-09-28",
    },
    {
      id: "5",
      book_title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publication: "Little, Brown and Company",
      student_name: "Laxmi Shrestha",
      type: "ISSUE",
      class: "10C",
      borrowed_date: "2025-10-06",
    },
  ];
  console.log(items);
  return items;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to add issue: ", error);
    return NextResponse.json(
      { message: "Failed to add issue" },
      { status: 500 },
    );
  }
}
