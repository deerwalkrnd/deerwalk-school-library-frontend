import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing authorization header" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const sort_by = searchParams.get("sort_by") || "created_at";
    const is_descending = searchParams.get("is_descending") || "true";
    const searchable_value = searchParams.get("searchable_value") || "";
    const searchable_field = searchParams.get("searchable_field") || "";
    const starts = searchParams.get("starts") || "";
    const ends = searchParams.get("ends") || "";

    // Build query string
    const queryParams = new URLSearchParams({
      page,
      limit,
      sort_by,
      is_descending,
      ...(searchable_value && { searchable_value }),
      ...(searchable_field && { searchable_field }),
      ...(starts && { starts }),
      ...(ends && { ends }),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/borrows/current?${queryParams.toString()}`,
      {
        method: "GET",
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch currently borrowed books:", error);
    return NextResponse.json(
      { message: "Failed to fetch currently borrowed books" },
      { status: 500 },
    );
  }
}
