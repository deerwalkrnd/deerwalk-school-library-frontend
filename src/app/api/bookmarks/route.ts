import { NextResponse } from "next/server";
import { getHeader } from "@/core/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = getHeader(request);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookmarks`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        errorData || { message: "Failed to add bookmark" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to add bookmark", error);
    return NextResponse.json(
      { message: "Failed to add bookmark" },
      { status: 500 },
    );
  }
}
