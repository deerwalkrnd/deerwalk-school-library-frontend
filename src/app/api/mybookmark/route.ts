import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    // Build the URL with query parameters
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmarks/`);
    url.searchParams.set("page", page);
    url.searchParams.set("limit", limit);

    // Get the authorization token from the request headers
    const authHeader = request.headers.get("authorization");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch bookmarks" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
