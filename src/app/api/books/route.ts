import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "0";
    const limit = searchParams.get("limit") || "10";
    const genre = searchParams.get("genre");
    const author = searchParams.get("author");

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/`);
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", limit);

    if (genre) backendUrl.searchParams.append("genre", genre);
    if (author) backendUrl.searchParams.append("author", author);

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
    console.log("Backend response:", data);

    // Return the full paginated response, not just items
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { message: "Failed to fetch books" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let authHeader = getHeader(req);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json", // Fixed typo
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Backend error:", errorData);
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create book:", error);
    return NextResponse.json(
      { message: "Failed to create book" },
      { status: 500 },
    );
  }
}
