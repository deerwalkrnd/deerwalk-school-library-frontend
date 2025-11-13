import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const book_id = searchParams.get("book_id");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book-copy`,
    );
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);
    backendUrl.searchParams.append("book_id", book_id!);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Failed to fetch available book copies `, error);
    return NextResponse.json(
      { message: `Failed to fetch available book copies` },
      { status: 500 },
    );
  }
}
