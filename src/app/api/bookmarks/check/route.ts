import { NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function GET(request: Request) {
  try {
    const authHeader = getHeader(request);
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get query params from URL
    const url = new URL(request.url);
    const book_id = url.searchParams.get("book_id");

    if (!book_id) {
      return NextResponse.json(
        { message: "book_id is required" },
        { status: 422 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/bookmarks/${book_id}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      },
    );

    if (response.status === 404) {
      return NextResponse.json({ status: false }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
