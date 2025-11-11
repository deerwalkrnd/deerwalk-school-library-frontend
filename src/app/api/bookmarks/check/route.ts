import { NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = getHeader(request);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { book_id } = body;

    if (!book_id) {
      return NextResponse.json(
        { message: "book_id is required" },
        { status: 422 },
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmarks/${book_id}`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id }),
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(null, { status: 200 });
      }
      return NextResponse.json(null, { status: 200 });
    }

    const data = await response.text();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 200 });
  }
}
