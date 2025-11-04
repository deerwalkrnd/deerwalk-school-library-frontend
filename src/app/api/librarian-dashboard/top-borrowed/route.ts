import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/librarian/tables`,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data.top_books_borrowed || []);
  } catch (error) {
    console.error("Failed to fetch top borrowed books:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch top borrowed books",
      },
      {
        status: 500,
      },
    );
  }
}
