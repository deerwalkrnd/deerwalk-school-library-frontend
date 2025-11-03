import { getHeader } from "@/core/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id: book_copy_id } = await params;

    if (!book_copy_id) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 },
      );
    }

    const body = await request.json();
    let authHeader = getHeader(request);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/borrows/${book_copy_id}`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to borrow book : ", error);
    return NextResponse.json(
      { message: "Failed to borrow book" },
      { status: 500 },
    );
  }
}
