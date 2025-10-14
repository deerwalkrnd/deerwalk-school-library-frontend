import { NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const author = searchParams.get("author");
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`);
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);

    if (search) {
      backendUrl.searchParams.append("search", search);
    }
    if (category) {
      backendUrl.searchParams.append("category", category);
    }
    if (author) {
      backendUrl.searchParams.append("author", author);
    }
    if (sortBy) {
      backendUrl.searchParams.append("sortBy", sortBy);
    }
    if (sortOrder) {
      backendUrl.searchParams.append("sortOrder", sortOrder);
    }

    const authHeader = getHeader(request);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(backendUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return NextResponse.json(
      { message: "Failed to fetch books" },
      { status: 500 },
    );
  }
}
