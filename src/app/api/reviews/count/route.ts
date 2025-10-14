import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const book_id = searchParams.get("book_id");

    if (!book_id) {
      return NextResponse.json(
        { message: "book_id parameter is required" },
        { status: 400 },
      );
    }

    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/count`,
    );

    backendUrl.searchParams.append("book_id", book_id);
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch review count: ", error);
    return NextResponse.json(
      { message: "Failed to fetch review count" },
      { status: 500 },
    );
  }
}
