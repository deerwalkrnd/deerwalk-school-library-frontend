import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: bookId } = await params;

    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`,
    );
    backendUrl.searchParams.append("book_id", bookId);
    backendUrl.searchParams.append("sort_by", "created_at");

    const sortBy = searchParams.get("sort_by") || "newest";
    const isDescending = sortBy === "newest" ? "true" : "false";
    backendUrl.searchParams.append("is_descending", isDescending);

    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);

    const isSpam = searchParams.get("is_spam");
    if (isSpam !== null) {
      backendUrl.searchParams.append("is_spam", isSpam);
    } else {
      backendUrl.searchParams.append("is_spam", "false");
    }

    let authHeader = getHeader(request);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader || "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch reviews: ", error);
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: reviewId } = await params;
    if (!reviewId) {
      return NextResponse.json(
        { message: "Review ID is required" },
        { status: 400 },
      );
    }

    const body = await request.json();
    let authHeader = getHeader(request);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
      {
        method: "PUT",
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to update review: ", error);
    return NextResponse.json(
      { message: "Failed to update review" },
      { status: 500 },
    );
  }
}
