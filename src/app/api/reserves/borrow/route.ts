import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const authHeader = getHeader(request);
    const backendURL = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reserves/${id}/borrow`,
    );

    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        Authorization: authHeader || "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to mark reserved book" },
      { status: 500 },
    );
  }
}
